import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { RefreshToken, RefreshTokenSchema } from './schemas/refresh-token.schema'
import { RefreshTokenService } from './refresh-token.service'

@Module({
  imports: [
    PassportModule,
    UsersModule,
    MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // Prefer the new key; fall back to the legacy `JWT_EXPIRES_IN` so
        // existing .env files keep working. Default 15m for fresh setups.
        const expiresIn = (config.get<string>('JWT_ACCESS_EXPIRES_IN') ??
          config.get<string>('JWT_EXPIRES_IN') ??
          '15m') as `${number}${'s' | 'm' | 'h' | 'd'}`
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn },
        }
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshTokenService],
  exports: [AuthService],
})
export class AuthModule {}
