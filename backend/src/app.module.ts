import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { PracticeModule } from './practice/practice.module'
import { SubmissionsModule } from './submissions/submissions.module'
import { TestsModule } from './tests/tests.module'
import { TestSubmissionsModule } from './test-submissions/test-submissions.module'
import { LessonsModule } from './lessons/lessons.module'
import { VocabularyModule } from './vocabulary/vocabulary.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    AuthModule,
    UsersModule,
    PracticeModule,
    SubmissionsModule,
    TestsModule,
    TestSubmissionsModule,
    LessonsModule,
    VocabularyModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
