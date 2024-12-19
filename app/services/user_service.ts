import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator, findByIdUserValidator } from '#validators/user'
import AppException from '#exceptions/app_exception'

@inject()
export class UserService {
  constructor(private ctx: HttpContext) {}

  create = async (): Promise<User> => {
    const { request } = this.ctx
    const payload = await request.validateUsing(createUserValidator)
    const { username, password, full_name } = payload

    const user = await User.create({
      username,
      password,
      full_name,
    })

    return user
  }

  findAll = async (): Promise<User[]> => {
    const users = await User.all()

    return users
  }

  findById = async (): Promise<User> => {
    const { request } = this.ctx
    const payload = await request.validateUsing(findByIdUserValidator)
    const { params } = payload
    const user = await User.find(params.id)

    if (!user) {
      throw new AppException('User not found', {
        status: 404,
      })
    }

    return user
  }
}
