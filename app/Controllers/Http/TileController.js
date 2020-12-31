'use strict'
const Tile = use('App/Models/Tile')

class TileController {

    async saveTile({auth, request}){

        const {name, imageName, walkSpeed, swimSpeed, flySpeed, passable, blocksSight} = request.post()

          const tile = new Tile

          tile.name = name
          tile.fileName = imageName
          tile.swim_speed = swimSpeed
          tile.walk_speed = walkSpeed
          tile.fly_speed = flySpeed
          tile.passable = passable
          tile.blocks_sight = blocksSight

          try{
              await tile.save()
          }catch(e){
              return e.message
          }
          return 'success'
    }

    async loadTile(){

    }

    async loadTileList(){

    }

}

module.exports = TileController
