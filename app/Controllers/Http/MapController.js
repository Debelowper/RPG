'use strict'

class MapController {
    async saveMap({request}){

        //const Map = use('App/Models/Map')
        const {id, name, hexes, width, height} = request.post()

        const Map = use('App/Models/Map')

        const map = new Map

        map.user_id = id
        map.height = height
        map.width = width
        map.name = name
        map.map_json = JSON.stringify(hexes)

        await map.save()
        return 'Map saved successfully'

    }

    async loadMap({request}){

        const {id} = request.get()

        const Database = use('Database')
        let map = await Database
                            .table('maps')
                            .where('id', id)
                            .first()

        return map

    }

}

module.exports = MapController
