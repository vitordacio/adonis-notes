import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator, paramIdUserValidator, updateUserValidator } from '#validators/user'
import AppException from '#exceptions/app_exception'
import { UserRepository } from '../repositories/users/implementation/UserRepository.js'

@inject()
export class UserService {
  constructor(
    private ctx: HttpContext,
    private userRepository: UserRepository
  ) {}

  create = async (): Promise<User> => {
    const payload = await this.ctx.request.validateUsing(createUserValidator)
    const { username, password, full_name } = payload

    const user = await this.userRepository.create({ username, password, full_name })

    return user
  }

  findById = async (): Promise<User> => {
    const payload = await this.ctx.request.validateUsing(paramIdUserValidator)
    const { params } = payload
    const user = await this.userRepository.findById(params.id)

    if (!user) {
      throw new AppException('User not found', {
        status: 404,
      })
    }

    return user
  }

  findAll = async (): Promise<User[]> => {
    const users = await this.userRepository.findAll()

    return users
  }

  update = async (): Promise<User> => {
    const payload = await this.ctx.request.validateUsing(updateUserValidator)
    const { username, password, full_name } = payload
    const { user } = this.ctx.auth

    if (!user) {
      throw new AppException('User not found', {
        status: 404,
      })
    }

    if (username) {
      const alreadyExists = await this.userRepository.findByUsername(username)

      if (alreadyExists && alreadyExists.id !== user.id) {
        throw new AppException('Username already exists', {
          status: 400,
        })
      }

      user.username = username
    }

    if (password) user.password = password
    user.full_name = full_name || null
    await this.userRepository.save(user)

    return user
  }

  delete = async (): Promise<void> => {
    const { user } = this.ctx.auth

    if (!user) {
      throw new AppException('User not found', {
        status: 404,
      })
    }

    await this.userRepository.delete(user)
  }
}
