import {roll} from './../ActionUtils'

export function attack(targetChar, bonus, tags){
    //makes attack roll
    let dodge = targetChar.dodge
    let updatedTarget = targetChar

    let atkRoll = roll(20) + bonus

    console.log(atkRoll, dodge)

    if(atkRoll >= dodge ? true : false){
        tags.forEach(el =>{
            el.doAction(updatedTarget)
        })
    }
    return updatedTarget
}
