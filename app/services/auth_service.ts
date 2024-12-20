import AppException from '#exceptions/app_exception'
import User from '#models/user'
import { signInValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

@inject()
export class AuthService {
  constructor(private ctx: HttpContext) {}

  signIn = async (): Promise<{ user: User; token: string }> => {
    const payload = await this.ctx.request.validateUsing(signInValidator)
    const { username, password } = payload

    const user = await User.findBy('username', username)

    if (!user) {
      throw new AppException('Invalid email or password', {
        status: 401,
      })
    }

    const allowed = await hash.verify(user.password, password)

    if (!allowed) {
      throw new AppException('Invalid email or password', {
        status: 401,
      })
    }

    const token = await User.accessTokens.create(user)

    return {
      user,
      token: token.value!.release(),
    }
  }
}
