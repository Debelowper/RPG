'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.increments()
      table.string('name',50).notNullable()
      table.string('filename',55).notNullable().unique()
      table.integer('user_id').notNullable()
      table.integer('image_type_id').notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImageSchema
