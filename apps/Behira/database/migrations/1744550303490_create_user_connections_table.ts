import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_connections'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE') // delete connection when user is deleted
      table.string('provider').notNullable()
      table.string('external_id').notNullable()
      table.string('access_token').notNullable()
      table.string('refresh_token').nullable()

      table.json('metadata')

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('expires_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
