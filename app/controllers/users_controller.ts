import { inject } from '@adonisjs/core'
import { UserService } from '#services/user_service'
// import type { HttpContext } from '@adonisjs/core/http'

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
    // const { username, password, full_name } = request.body()
    // const user = await this.userService.create({
    //   username,
    //   password,
    //   full_name,
    // })

    // return user
  }

  async show() {
    const user = await this.userService.findById()

    return user
  }

  // async update({ params, request }: HttpContext) {}

  // async destroy({ params }: HttpContext) {}
}
