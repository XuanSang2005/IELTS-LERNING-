import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import type { AuthResponse, LoginDto, RegisterDto } from '@shared/schemas/auth'
import { UsersService } from '../users/users.service'
import type { UserDocument } from '../users/schemas/user.schema'
import { RefreshTokenService } from './refresh-token.service'

const BCRYPT_COST = 12

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    private readonly refreshTokens: RefreshTokenService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existing = await this.users.findByEmail(dto.email)
    if (existing) throw new ConflictException('Email is already registered')

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_COST)
    const user = await this.users.create({
      email: dto.email,
      passwordHash,
      name: dto.name,
    })
    return this.buildResponse(user)
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.users.findByEmail(dto.email)
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const ok = await bcrypt.compare(dto.password, user.passwordHash)
    if (!ok) throw new UnauthorizedException('Invalid credentials')

    return this.buildResponse(user)
  }

  async refresh(presentedToken: string): Promise<AuthResponse> {
    const rotated = await this.refreshTokens.rotate(presentedToken)
    if (!rotated) throw new UnauthorizedException('Invalid refresh token')

    const user = await this.users.findById(rotated.userId)
    if (!user) {
      // Underlying user gone — treat as compromise.
      await this.refreshTokens.revokeAllForUser(rotated.userId)
      throw new UnauthorizedException('Invalid refresh token')
    }

    const id = user._id.toString()
    const accessToken = this.jwt.sign({ sub: id, email: user.email })
    return {
      token: accessToken,
      refreshToken: rotated.next.token,
      user: this.toAuthUser(user),
    }
  }

  async logout(presentedToken: string): Promise<void> {
    await this.refreshTokens.revoke(presentedToken)
  }

  private async buildResponse(user: UserDocument): Promise<AuthResponse> {
    const id = user._id.toString()
    const accessToken = this.jwt.sign({ sub: id, email: user.email })
    const refresh = await this.refreshTokens.issue(id)
    return {
      token: accessToken,
      refreshToken: refresh.token,
      user: this.toAuthUser(user),
    }
  }

  private toAuthUser(user: UserDocument) {
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      trialEndsAt: user.trialEndsAt ? user.trialEndsAt.toISOString() : null,
      isPro: Boolean(user.isPro),
    }
  }
}
