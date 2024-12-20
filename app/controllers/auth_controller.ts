import { AuthService } from '#services/auth_service'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  async signIn() {
    const auth = await this.authService.signIn()

    return auth
  }
}
