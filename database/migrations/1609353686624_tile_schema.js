'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TileSchema extends Schema {
  up () {
    this.create('tiles', (table) => {
      table.increments()
      table.string('name', 50).notNullable().unique()
      table.integer('image_id').notNullable()
      table.integer('user_id').notNullable()
      table.boolean('passable',1).notNullable()
      table.boolean('blocks_sight',1).notNullable()
      table.integer('walk_speed').notNullable()
      table.integer('swim_speed').notNullable()
      table.integer('fly_speed').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tiles')
  }
}

module.exports = TileSchema
