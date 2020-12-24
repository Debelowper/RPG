'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MapsSchema extends Schema {
  up () {
    this.create('maps', (table) => {
      table.increments()
      table.string('name')
      table.string('user_id')
      table.json('map_json')
      table.timestamps()
    })
  }

  down () {
    this.drop('maps')
  }
}

module.exports = MapsSchema
