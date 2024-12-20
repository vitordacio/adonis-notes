import { inject } from '@adonisjs/core'
import { UserService } from '#services/user_service'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async index() {
    const users = await this.userService.findAll()

    return users
  }

  async store() {
    const user = await this.userService.create()

    return user
  }

  async show() {
    const user = await this.userService.findById()

    return user
  }

  async update() {
    const user = await this.userService.update()

    return user
  }

  async destroy() {
    await this.userService.delete()
  }
}
