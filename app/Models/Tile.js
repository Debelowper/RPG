'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tile extends Model {
    users () {
      return this.belongsTo('App/Models/User')
    }

    images(){
        return this.belongsTo('App/Modles/Image')
    }
}

module.exports = Tile
