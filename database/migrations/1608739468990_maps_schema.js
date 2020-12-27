'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MapsSchema extends Schema {
  up () {
    this.create('maps', (table) => {
      table.increments()
      table.string('name', 30).notNullable()
      table.integer('user_id').notNullable()
      table.integer('width').notNullable()
      table.integer('height').notNullable()
      table.json('map_json').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('maps')
  }
}

module.exports = MapsSchema
