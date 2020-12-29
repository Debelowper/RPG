'use strict'

class TileController {

    async saveTile({auth, request}){

        const {name, passable, blocksSight, diffucultTerrain, terrainType } = request.post()

        const file =  request.file(
            'file',{
                types: ['image'],
                size: '2mb'
            }
        )

        return file

        // const Helpers = use('Helpers')
        //
        // await file.move(Helpers.tmpPath('uploads'), {
        //     name: 'custom-name.jpg',
        //     overwrite: true
        // })
        //
        // if (!file.moved()) {
        // return file.error()
        // }
        //
        // return 'File Mved'



    }


}

module.exports = TileController
