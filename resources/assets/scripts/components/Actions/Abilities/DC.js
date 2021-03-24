import {roll} from './../ActionUtils'

export function DiffClass(targetChar, bonus, tags){

    let dodge = targetChar.dodge
    let updatedTarget = targetChar

    if(true){
        tags.forEach(el =>{
            if(el.constructor.name == 'Damage'){
                el.doAction(updatedTarget)
            }
        })
        tags.forEach(el=>{
            if(el.constructor.name == 'Effect'){
                el.putEffect(updatedTarget)
            }
        })
    }
    return updatedTarget
}
