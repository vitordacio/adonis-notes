import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import hash from '@adonisjs/core/services/hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare username: string

  @column()
  declare password: string

  @column()
  declare full_name: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  public serialize() {
    const serialized = super.serialize()
    delete serialized.password
    return serialized
  }

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }
}
