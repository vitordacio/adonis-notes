import User from '#models/user'
import { IUserRepository } from '../IUserRepository.js'
import { ICreateUserDTO } from '../IUserRepositoryDTO.js'

class UserRepository implements IUserRepository {
  async create({ username, password, full_name }: ICreateUserDTO): Promise<User> {
    const user = await User.create({
      username,
      password,
      full_name,
    })

    return user
  }

  async save(user: User): Promise<User> {
    const newUser = await user.save()

    return newUser
  }

  async findById(id: number): Promise<User | null> {
    const user = await User.query()
      .where('id', id)
      .preload('notes', (note) => {
        note
      })
      .first()

    return user
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await User.query().where('username', username).first()

    return user
  }

  async findAll(): Promise<User[]> {
    const users = await User.all()

    return users
  }

  async delete(user: User): Promise<void> {
    await user.delete()
  }
}

export { UserRepository }
