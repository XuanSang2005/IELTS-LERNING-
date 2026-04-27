import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LinkingController } from './linking.controller'
import { LinkingService } from './linking.service'
import { LinkingDeviceDoc, LinkingDeviceMongooseSchema } from './schemas/linking-device.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LinkingDeviceDoc.name, schema: LinkingDeviceMongooseSchema },
    ]),
  ],
  controllers: [LinkingController],
  providers: [LinkingService],
  exports: [LinkingService],
})
export class LinkingModule {}
