import Character from './../Character'
import {Effect} from './Abilities/Effects'

export function equip({characters, currentCharacter, setAction, spawnedChars, characterLimits}){

    // equipItem({characters[currentCharacter], item})

    return
}

export function equipItem ({character, item, slot='offHand', type='weapon', setAction}){
    let newChar = new Character({...character})
    newChar.unequip({name:slot, type:type, item:item})
    newChar.equip({name:slot, type:type, item:item})

    setAction( [{type:'character', action:{[newChar.name]: newChar}  }] )
}

export function applyEquipmentEffects(equipmentSlots){
    let equipEffect = new Effect({
        name:'equipEffect',
        timeoutType:'permanent',
        timeout:0,
        tagId:9999,
    })
    equipmentSlots.forEach(el => {
        if(Object.keys(el.item).length > 0){
            el.item.buffs.forEach(buff=> equipEffect.tags.push(buff))
        }
    })
    return equipEffect
}
