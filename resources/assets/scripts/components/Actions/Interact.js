
export function move ({characters, tiles, structures, setAction, currentCharacter , selectedAction, inCombat}){

    const moveCharacter = (getter, setter, hex) => {

        let action = selectedAction.option
        let char = characters[currentCharacter]
        if(isNeighbour(hex.hex, char.currentHex) && !isOccupied(hex.hex, characters)){
            let cost = 1/6
            let newTile = tiles.find((el) => hex.tile.split('-')[1] == el.id)

            let mult = newTile[action.name+'_speed']/100
            if(mult != 0){
                if(char.resources.speed >= 100*cost/(mult*action.value/100) && newTile.passable == true ){

                    let tilesToChange
                    let speedLoss = inCombat ? 100*cost/(mult*action.value/100) : 0

                    tilesToChange = getter({target:char.currentHex})
                    setter(tilesToChange, '', 'character')

                    let updatedChar = char
                    updatedChar.currentHex = hex.hex
                    updatedChar.losses.speed = (char.losses.speed ? char.losses.speed : 0) + speedLoss

                    setAction( [ {type:'character', action:{ [updatedChar.name]: updatedChar } } ] )

                    tilesToChange = getter({target:hex.hex})
                    setter(tilesToChange, char.name, 'character')
                }
            }
        }
    }

    return(moveCharacter)
}
