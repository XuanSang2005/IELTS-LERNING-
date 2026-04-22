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
}

export const UserSchema = SchemaFactory.createForClass(User)
