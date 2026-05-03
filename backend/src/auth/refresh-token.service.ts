import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { createHash, randomBytes } from 'node:crypto'
import { RefreshToken, RefreshTokenDocument } from './schemas/refresh-token.schema'

const DEFAULT_TTL_SECONDS = 30 * 24 * 60 * 60 // 30d

function parseTtl(raw: string | undefined): number {
  if (!raw) return DEFAULT_TTL_SECONDS
  const m = /^(\d+)\s*([smhd])$/i.exec(raw.trim())
  if (!m) return DEFAULT_TTL_SECONDS
  const n = Number(m[1])
  const mult = { s: 1, m: 60, h: 3600, d: 86400 }[m[2]!.toLowerCase() as 's' | 'm' | 'h' | 'd']!
  return n * mult
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

export interface IssuedRefreshToken {
  token: string
  expiresAt: Date
}

@Injectable()
export class RefreshTokenService {
  private readonly ttlSeconds: number

  constructor(
    @InjectModel(RefreshToken.name)
    private readonly model: Model<RefreshTokenDocument>,
    config: ConfigService,
  ) {
    this.ttlSeconds = parseTtl(config.get<string>('JWT_REFRESH_EXPIRES_IN'))
  }

  async issue(userId: string): Promise<IssuedRefreshToken> {
    const token = randomBytes(64).toString('hex')
    const expiresAt = new Date(Date.now() + this.ttlSeconds * 1000)
    await this.model.create({
      userId: new Types.ObjectId(userId),
      tokenHash: hashToken(token),
      expiresAt,
      revokedAt: null,
      replacedByHash: null,
    })
    return { token, expiresAt }
  }

  /**
   * Rotate a presented refresh token. Returns the new token + the userId
   * the rotation belongs to. Returns null if the presented token is
   * unknown, expired, or its presentation looks like a reuse attack
   * (in which case all of the user's refresh tokens are revoked).
   */
  async rotate(presentedToken: string): Promise<{ next: IssuedRefreshToken; userId: string } | null> {
    const presentedHash = hashToken(presentedToken)
    const record = await this.model.findOne({ tokenHash: presentedHash }).exec()
    if (!record) return null

    if (record.expiresAt.getTime() < Date.now()) {
      // Expired — let TTL index sweep it eventually; treat as invalid.
      return null
    }

    if (record.revokedAt) {
      // Token was already rotated/logged out. Reuse → compromise. Burn the
      // entire family for this user.
      await this.revokeAllForUser(record.userId.toString())
      return null
    }

    const userId = record.userId.toString()
    const next = await this.issue(userId)

    record.revokedAt = new Date()
    record.replacedByHash = hashToken(next.token)
    await record.save()

    return { next, userId }
  }

  async revoke(presentedToken: string): Promise<void> {
    const presentedHash = hashToken(presentedToken)
    await this.model
      .updateOne(
        { tokenHash: presentedHash, revokedAt: null },
        { $set: { revokedAt: new Date() } },
      )
      .exec()
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await this.model
      .updateMany(
        { userId: new Types.ObjectId(userId), revokedAt: null },
        { $set: { revokedAt: new Date() } },
      )
      .exec()
  }
}
