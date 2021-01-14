'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateSystemSchema extends Schema {
  up () {
    this.create('systems', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('name').unique().notNullable()
      table.json('stats')
      table.json('resources')
      table.json('saving_throws')
      table.json('damage_types')
      table.json('skills')
      table.json('status_effects')

      table.timestamps()
    })
  }

  down () {
    this.drop('systems')
  }
}

module.exports = CreateSystemSchema
