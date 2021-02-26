import Character, {getChar} from './../Character'

export function spawn({characters, currentCharacter, setAction}){

    const spawnCharacter = (getter, setter, hex) => {
        if(!isSpawned(characters, currentCharacter)){
            // let char = characters.find(el => el.name == currentCharacter)
            let tilesToChange = getter({target:hex.hex})

            let data = {}
            data.base = getChar(currentCharacter)
            data.name = data.base.name
            data.currentHex = hex.hex
            data.initiative = -1
            data.myTurn = false

            let char = new Character(data)

            setAction( [{type:'character', action:{[char.name]: char}  }] )
            setter(tilesToChange, char.name, 'character')
        }else{
            console.log('you have already been spawned')
        }
    }

    return(spawnCharacter)
}

export function isSpawned (spawnedChars, currentCharacter) {
    return spawnedChars[currentCharacter] ? true : false
}
