import Character from './../Character'
import {Effect} from './Abilities/Effects'

export function spawn({characters, currentCharacter, setAction, spawnedChars, characterLimits}){

    const spawnCharacter = (getter, setter, hex) => {
        if(isAllowedToSpawn(spawnedChars, currentCharacter, characterLimits)){
            // let char = characters.find(el => el.name == currentCharacter)
            let tilesToChange = getter({target:hex.hex})

            let data = {}
            data.player = 'DM'
            data.base = characters[currentCharacter]
            data.name = makeCharacterName(spawnedChars, currentCharacter)
            data.currentHex = hex.hex
            data.initiative = -1
            data.myTurn = false

            let char = new Character(data)

            char = equipBaseItems(char)

            setAction( [{type:'character', action:{[char.name]: char}  }] )
            setter(tilesToChange, char.name, 'character')
        }else{
            console.log('you have already been spawned')
        }
    }

    return(spawnCharacter)
}

function equipBaseItems(char){

    let newChar = Object.values(char.base.equipmentSlots).reduce((acc, el)=>{
        return acc.equip(el)
    }, char)

    return newChar
}


export function isAllowedToSpawn(spawnedChars, currentCharacter, characterLimits){
    let count = Object.values(spawnedChars).reduce((acc, el) => el.name.split('[')[0] == currentCharacter ? acc + 1 : acc, 0)
    if(characterLimits[currentCharacter.split('[')[0]]){
        return characterLimits[currentCharacter.split('[')[0]] > count
    }
    return true
}

function makeCharacterName(spawnedChars, currentCharacter){
    const count = Object.values(spawnedChars).reduce((acc, el) => el.name.split('[')[0] == currentCharacter ? acc+1 : acc, 0)
    return currentCharacter + (count == 0 ? '' : '[' + (count) + ']')
}

export function isSpawned (spawnedChars, currentCharacter) {
    return spawnedChars[currentCharacter] ? true : false
}
