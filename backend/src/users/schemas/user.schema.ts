import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import type { UserProfile } from '@shared/schemas/practice'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string

  @Prop({ required: true })
  passwordHash!: string

  @Prop({ required: true })
  name!: string

  @Prop({ type: Date, default: null })
  trialEndsAt!: Date | null

  @Prop({ type: Boolean, default: false })
  isPro!: boolean

  @Prop({ type: Object, required: true })
  profile!: UserProfile

  /**
   * IANA timezone string (e.g. 'Asia/Ho_Chi_Minh'). Detected from the browser
   * on first login and stored to compute consistent "today" boundaries for
   * the SRS daily queue across devices. Defaults to UTC if detection fails.
   * Plan Decision #13.
   */
  @Prop({ type: String, default: 'UTC' })
  userTimezone!: string
}

export const UserSchema = SchemaFactory.createForClass(User)
