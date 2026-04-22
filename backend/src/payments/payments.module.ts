import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CassoWebhookController, PaymentsController } from './payments.controller'
import { PaymentsService } from './payments.service'
import { Payment, PaymentMongooseSchema } from './schemas/payment.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Payment.name, schema: PaymentMongooseSchema }])],
  controllers: [PaymentsController, CassoWebhookController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
