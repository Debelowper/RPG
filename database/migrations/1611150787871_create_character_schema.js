'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateCharacterSchema extends Schema {
  up () {
    this.create('characters', (table) => {
      table.increments()
      table.string('name')
      table.json('stats')
      table.json('resources')
      table.json('saving_throws')
      table.json('skills')
      table.json('status_effects_resistances')
      table.json('damage_resistances')
      table.int('system_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('characters')
  }
}

module.exports = CharacterSchema
