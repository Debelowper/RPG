'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateCharacterSchema extends Schema {
  up () {
    this.create('characters', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('characters')
  }
}

module.exports = CharacterSchema
