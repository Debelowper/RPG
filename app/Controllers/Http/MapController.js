'use strict'
const Database = use('Database')

class MapController {
    async saveMap({request, auth}){

        const { name, hexes, width, height} = request.post()

        const Map = use('App/Models/Map')

        const map = new Map

        map.user_id = auth.user.id
        map.height = height
        map.width = width
        map.name = name
        map.map_json = JSON.stringify(hexes)

        let existingMap = await Database
            .table('maps')
            .where('user_id', map.user_id)
            .where('name', map.name)
            .first()


        if(existingMap){
            const affectedRows = await Database
              .table('maps')
              .where('user_id', map.user_id)
              .where('name', map.name)
              .update('height', map.height)
              .update('width', map.width)
              .update('map_json', map.map_json)

            return affectedRows

        }else{
            try{
                await map.save()

                return map

            }catch (err){
                return err
            }
        }

    }

    async loadMap({request}){

        const {name} = request.get()

        let map = await Database
            .table('maps')
            .where('name', name)
            .first()

        return map

    }

    async listMaps({auth}){

        let maps = await Database
            .select('name')
            .from('maps')
            .where('user_id', auth.user.id)

        return maps

    }

    async deleteMap({request}){
        const {name} = request.all()

        const affectedRows = await Database
          .table('maps')
          .where('name', name)
          .delete()

          return affectedRows
    }
}


module.exports = MapController
