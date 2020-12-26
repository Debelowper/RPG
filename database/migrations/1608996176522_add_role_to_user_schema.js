'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddRoleToUserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.integer('role')
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('role')
    })
  }
}

module.exports = AddRoleToUserSchema
