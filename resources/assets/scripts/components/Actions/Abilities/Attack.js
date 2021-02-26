import {roll} from './../ActionUtils'

export function attack(targetChar, bonus, dmgArr, effectArr){
    //makes attack roll
    let dodge = targetChar.dodge
    let updatedTarget = targetChar

    let atkRoll = roll(20) + bonus

    console.log(atkRoll, dodge)
    // console.log(dmgArr, effectArr)

    if(atkRoll >= dodge ? true : false){
        dmgArr.forEach(el =>{
            if(el.constructor.name == 'Damage'){
                el.doAction(updatedTarget)
            }
        })
        effectArr.forEach(el=>{
            if(el.constructor.name == 'DC'){
                el.doAction(updatedTarget)
            }
            if(el.constructor.name == 'Effect'){
                console.log(el)
                el.putEffect(updatedTarget)
            }
        })
    }
    return updatedTarget
}
