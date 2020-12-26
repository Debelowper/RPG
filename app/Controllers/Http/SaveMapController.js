'use strict'

class SaveMapController {
    async saveMap({request}){

        //const Map = use('App/Models/Map')
        const {id, name, hexes} = request.post()

        const Map = use('App/Models/Map')

        const map = new Map

        map.user_id = id
        map.name = name
        map.map_json = JSON.stringify(hexes)

        await map.save()
        return map


    }
}

module.exports = SaveMapController
