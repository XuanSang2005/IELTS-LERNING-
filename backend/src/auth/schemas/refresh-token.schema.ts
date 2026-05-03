import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type RefreshTokenDocument = HydratedDocument<RefreshToken>

@Schema({ timestamps: true })
export class RefreshToken {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  userId!: Types.ObjectId

  // SHA-256 of the opaque refresh token. The token itself is never persisted.
  @Prop({ required: true, unique: true, index: true })
  tokenHash!: string

  @Prop({ type: Date, required: true })
  expiresAt!: Date

  @Prop({ type: Date, default: null })
  revokedAt!: Date | null

  // When this token is rotated, points to the new token's hash. Used to
  // detect reuse: presenting a revoked token whose replacement already
  // exists means the family is compromised → revoke all of user's tokens.
  @Prop({ type: String, default: null })
  replacedByHash!: string | null
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken)

// TTL index — Mongo prunes expired tokens automatically.
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })
