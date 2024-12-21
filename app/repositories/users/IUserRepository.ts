import User from '#models/user'
import { ICreateUserDTO } from './IUserRepositoryDTO.js'

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
  findById(id: number): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
  findAll(): Promise<User[]>
  delete(user: User): Promise<void>
}
