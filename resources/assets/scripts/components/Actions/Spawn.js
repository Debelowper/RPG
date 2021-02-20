export function spawn({characters, spawnedChars, currentCharacter, setAction}){

    const spawnCharacter = (getter, setter, hex) => {
        if(!isSpawned(spawnedChars, currentCharacter)){
            let char = characters.find((el) => el.name == currentCharacter)
            let tilesToChange = getter({target:hex.hex})
            setAction( [{type:'character', action:{
                [char.name]: {
                    ...char,
                    baseStats:char,
                    currentHex:hex.hex,
                    initiative:-1,
                    myTurn:false,
                }
            }  }] )
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
