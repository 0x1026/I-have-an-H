import Application from '#models/v0/application'
import User from '#models/v0/user'
import { DbAccessTokensProvider, type AccessToken } from '@adonisjs/auth/access_tokens'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare applicationId: number

  @belongsTo(() => Application)
  declare application: BelongsTo<typeof Application>

  @column()
  declare metadata: Object

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static accessTokens = DbAccessTokensProvider.forModel(Account)
  currentAccessToken?: AccessToken
}
