import {isNeighbour, isOccupied} from './ActionUtils'

export function move ({characters, tiles, structures, setAction, currentCharacter , option, inCombat}){

    const moveCharacter = (getter, setter, hex) => {
        let char = characters[currentCharacter]
        if(isNeighbour(hex.hex, char.currentHex) && !isOccupied(hex.hex, characters)){
            let tileSize = 5;
            let newTile = tiles.find((el) => hex.tile.split('-')[1] == el.id)
            let mult = newTile[option+'_speed']/100
            if(mult != 0){
                if(char.resources.speed >= tileSize/(mult*char.actions.move.options[option]) && newTile.passable == true ){
                    let tilesToChange
                    let nextSpeed = inCombat ? char.resources.speed - 100*tileSize/(mult*char.actions.move.options[option]) : char.resources.speed
                    let updatedChar = {...char, currentHex:hex.hex, resources: {...char.resources ,speed: nextSpeed} }
                    setAction( [ {type:'character', action:{ [updatedChar.name]: updatedChar } } ] )

                    tilesToChange = getter({target:char.currentHex})
                    setter(tilesToChange, '', 'character')

                    tilesToChange = getter({target:hex.hex})
                    setter(tilesToChange, char.name, 'character')
                }
            }
        }
    }

    return(moveCharacter)
}
