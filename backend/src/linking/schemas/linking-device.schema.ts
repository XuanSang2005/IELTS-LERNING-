import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import type { LinkingFunction, LinkingPosition } from '@shared/schemas/linking-device'

export type LinkingDeviceDocument = HydratedDocument<LinkingDeviceDoc>

const FUNCTIONS: readonly LinkingFunction[] = [
  'addition',
  'contrast',
  'cause',
  'effect',
  'concession',
  'exemplification',
  'sequence',
  'summary',
] as const

const POSITIONS: readonly LinkingPosition[] = ['initial', 'medial', 'final'] as const

@Schema({ timestamps: true, collection: 'linking_devices' })
export class LinkingDeviceDoc {
  @Prop({ required: true, unique: true, index: true })
  slug!: string

  @Prop({ required: true, index: true })
  phrase!: string

  @Prop({ type: String, required: true, enum: FUNCTIONS, index: true })
  function!: LinkingFunction

  @Prop({ type: String, required: true, enum: ['B1', 'B2', 'C1'], index: true })
  register!: 'B1' | 'B2' | 'C1'

  @Prop({ type: [String], required: true, enum: POSITIONS })
  positions!: LinkingPosition[]

  @Prop({ required: true })
  example!: string

  @Prop()
  note?: string
}

export const LinkingDeviceMongooseSchema = SchemaFactory.createForClass(LinkingDeviceDoc)
