import User from '#models/v0/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class UserConnection extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare provider: string

  @column()
  declare externalId: string

  @column()
  declare accessToken: string

  @column()
  declare refreshToken: string | null

  @column.dateTime()
  declare expiresAt: DateTime

  @column()
  declare metadata: JSON

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
