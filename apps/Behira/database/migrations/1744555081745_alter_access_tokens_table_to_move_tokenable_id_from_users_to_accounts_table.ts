import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'auth_access_tokens'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('tokenable_id')

      table
        .foreign('tokenable_id')
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
    })
  }
}
