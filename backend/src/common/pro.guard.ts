import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import type { AuthenticatedUser } from './current-user.decorator'

/**
 * Gates a route to users with an active Pro subscription OR an unexpired trial.
 * Runs AFTER `JwtAuthGuard`, which populates `req.user`.
 *
 * Returns 403 with an editorial-tone message so the frontend can render the
 * paywall copy ("The library remains open. The examiner waits beyond.").
 *
 * Uses `UsersService` rather than the User model directly so the guard can be
 * instantiated from any module that imports `UsersModule` (or `CommonModule`,
 * which re-exports it) without needing MongooseModule.forFeature on the caller.
 */
@Injectable()
export class ProGuard implements CanActivate {
  constructor(private readonly users: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{ user?: AuthenticatedUser }>()
    const u = req.user
    if (!u) throw new ForbiddenException('Not authenticated')

    const doc = await this.users.findById(u.userId)
    if (!doc) throw new ForbiddenException('User not found')

    const trialActive = doc.trialEndsAt !== null && doc.trialEndsAt > new Date()
    if (doc.isPro || trialActive) return true

    throw new ForbiddenException({
      code: 'pro_required',
      message: 'Meridian Pro continues the programme.',
    })
  }
}
