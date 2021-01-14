'use strict'
const System = use('App/Models/System')
const Database = use('Database')

class CreateSystemController {

    async saveSystem({auth, request}){
        const {form, sysName} = request.post()
        const name=auth.user.username
        let stats
        console.log(form)
        switch(form[0].type){
            case 'stats':
                stats = 'stats'
                break
            case 'resources':
                stats = 'resources'
                break
            case 'skills':
                stats = 'skills'
                break
            case 'savingThrows':
                stats = 'saving_throws'
                break
            case 'damageTypes':
                stats = 'damage_types'
                break
            case 'statusEffects':
                stats = 'status_effects'
                break
        }
        const system = new System
        system.name = name + '_'+ sysName
        system[stats] = JSON.stringify(form)
        system.user_id = auth.user.id

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

module.exports = CreateSystemController
