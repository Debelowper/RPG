'use strict'

class CreateCharacterController {

    async saveSystem({auth, request}){
        const {sys} = request.post()
        const name=auth.user.username

        let system = new System
        system.name = name + '_'+ sys.name
        delete sys.name
        system.user_id = auth.user.id

        const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        let entries = Object.entries(sys)
        entries.forEach( (el) => {
            system[camelToSnakeCase(el[0])] = JSON.stringify(el[1])
        })

        let prevSave = await Database.table('systems').where('name', system.name).first()
        if(prevSave == null){
            try{
                await system.save()
            }catch(e){
                return e.message
            }
        }else{
            const affectedRows = await Database
              .table('systems')
              .where('name', system.name)
              .update(stats, system[stats])
        }

        return 'saved'
    }

    async loadSystem({auth, request}){

        const systems = await Database.table('systems').where('user_id', auth.user.id)
        systems.map((el)=>{
            let name = el.name.split('_').shift()
            el.name = el.name.replace(name+'_', '')

            return el
        })

        return systems
    }

    async deleteSystem({auth, request}){

        const {name} = request.post()
        try{
            const affectedRows = await Database.table('systems').where('name', auth.user.username+'_'+name).delete()
        }catch(e){
            return e.message
        }

        return 'deleted'
    }
}

module.exports = CreateCharacterController
