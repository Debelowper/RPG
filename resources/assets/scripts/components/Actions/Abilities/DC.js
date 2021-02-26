import {roll} from './../ActionUtils'

export function DiffClass(targetChar, bonus, dmgArr, effectArr){
    //makes attack roll
    let dodge = targetChar.dodge
    let updatedTarget = targetChar

    // let atkRoll = roll(20) + bonus
    //
    // console.log(atkRoll, dodge)

    if(true){
        dmgArr.forEach(el =>{
            if(el.constructor.name == 'Damage'){
                el.doAction(updatedTarget)
            }
        })
        effectArr.forEach(el=>{
            if(el.constructor.name == 'Effect'){
                el.putEffect(updatedTarget)
            }
        })
    }
    return updatedTarget
}
