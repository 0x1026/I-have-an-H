import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL') // no delete account when user is deleted
      table
        .integer('application_id')
        .notNullable()
        .unsigned()
        .references('applications.id')
        .onDelete('CASCADE') // delete account when application is deleted

      table.json('metadata')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
