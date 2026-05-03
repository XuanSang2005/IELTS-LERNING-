import { Body, Controller, Get, HttpCode, NotFoundException, Post, UseGuards, UsePipes } from '@nestjs/common'
import {
  AuthResponseSchema,
  LoginDtoSchema,
  LogoutDtoSchema,
  RefreshDtoSchema,
  RegisterDtoSchema,
  type AuthResponse,
  type AuthUser,
  type LoginDto,
  type LogoutDto,
  type RefreshDto,
  type RegisterDto,
} from '@shared/schemas/auth'
import { AuthService } from './auth.service'
import { ZodValidationPipe } from '../common/zod-validation.pipe'
import { JwtAuthGuard } from '../common/jwt-auth.guard'
import { CurrentUser, type AuthenticatedUser } from '../common/current-user.decorator'
import { UsersService } from '../users/users.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly users: UsersService,
  ) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterDtoSchema))
  async register(@Body() dto: RegisterDto): Promise<AuthResponse> {
    const res = await this.auth.register(dto)
    return AuthResponseSchema.parse(res)
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginDtoSchema))
  async login(@Body() dto: LoginDto): Promise<AuthResponse> {
    const res = await this.auth.login(dto)
    return AuthResponseSchema.parse(res)
  }

  @Post('refresh')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(RefreshDtoSchema))
  async refresh(@Body() dto: RefreshDto): Promise<AuthResponse> {
    const res = await this.auth.refresh(dto.refreshToken)
    return AuthResponseSchema.parse(res)
  }

  @Post('logout')
  @HttpCode(204)
  @UsePipes(new ZodValidationPipe(LogoutDtoSchema))
  async logout(@Body() dto: LogoutDto): Promise<void> {
    await this.auth.logout(dto.refreshToken)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() current: AuthenticatedUser): Promise<AuthUser> {
    const user = await this.users.findById(current.userId)
    if (!user) throw new NotFoundException('User not found')
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      trialEndsAt: user.trialEndsAt ? user.trialEndsAt.toISOString() : null,
      isPro: Boolean(user.isPro),
    }
  }
}
