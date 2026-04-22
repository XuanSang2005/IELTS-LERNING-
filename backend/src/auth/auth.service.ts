import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import type { AuthResponse, LoginDto, RegisterDto } from '@shared/schemas/auth'
import { UsersService } from '../users/users.service'
import type { UserDocument } from '../users/schemas/user.schema'

const BCRYPT_COST = 12

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existing = await this.users.findByEmail(dto.email)
    if (existing) throw new ConflictException('Email is already registered')

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_COST)
    const user = await this.users.create({
      email: dto.email,
      passwordHash,
      name: dto.name,
    })
    return this.buildResponse(user)
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.users.findByEmail(dto.email)
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const ok = await bcrypt.compare(dto.password, user.passwordHash)
    if (!ok) throw new UnauthorizedException('Invalid credentials')

    return this.buildResponse(user)
  }

  private buildResponse(user: UserDocument): AuthResponse {
    const id = user._id.toString()
    const token = this.jwt.sign({ sub: id, email: user.email })
    return {
      token,
      user: {
        id,
        email: user.email,
        name: user.name,
        trialEndsAt: user.trialEndsAt ? user.trialEndsAt.toISOString() : null,
        isPro: Boolean(user.isPro),
      },
    }
  }
}
