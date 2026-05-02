import { Module } from '@nestjs/common'
import { CommonModule } from '../common/common.module'
import { SubmissionsModule } from '../submissions/submissions.module'
import { UsersModule } from '../users/users.module'
import { DiagnosticController } from './diagnostic.controller'
import { DiagnosticService } from './diagnostic.service'

@Module({
  imports: [CommonModule, UsersModule, SubmissionsModule],
  controllers: [DiagnosticController],
  providers: [DiagnosticService],
})
export class DiagnosticModule {}
