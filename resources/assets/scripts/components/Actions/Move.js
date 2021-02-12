import {HexUtils} from 'react-hexgrid'

export function move ({characters, tiles, structures, setAction, currentCharacter , option, inCombat}){

    const isNeighbour = (hex, currentHex) => {
        let neighbours = HexUtils.neighbours(currentHex)
        let destID = HexUtils.getID(hex)
        let response = false
        neighbours.forEach((el)=>{
            if(HexUtils.getID(el) == destID ){
                response = true
            }
        })
        response ? null : console.log('it is not a neighbour')
        return response
    }

    const isOccupied = (hex) => {
        let resp = false
        Object.values(characters).forEach((el)=>{
            if(el.currentHex.id == hex.id ){
                resp = true
            }
        })
        resp ? console.log('it is occupied') : null
        return resp
    }

    const moveCharacter = (getter, setter, hex) => {
        let char = characters[currentCharacter]
        // console.log(characters)
        if(isNeighbour(hex.hex, char.currentHex) && !isOccupied(hex.hex)){
            let tileSize = 5;
            let newTile = tiles.find((el) => hex.tile.split('-')[1] == el.id)
            let mult = newTile[option+'_speed']/100
            if(mult != 0){
                if(char.speed >= tileSize/(mult*char.moveSpeeds[option]) && newTile.passable == true ){
                    let tilesToChange
                    let nextSpeed = inCombat ? char.speed - 100*tileSize/(mult*char.moveSpeeds[option]) : char.speed
                    let updatedChar = {...char, currentHex:hex.hex, speed: nextSpeed }
                    setAction( [ {type:'character', action:{ [updatedChar.name]: updatedChar } } ] )
                    // setCharactersList({...characters, [updatedChar.name]: updatedChar})

                    tilesToChange = getter(char.currentHex, '1')
                    setter(tilesToChange, '', 'character')

                    tilesToChange = getter(hex.hex, '1')
                    setter(tilesToChange, char.name, 'character')
                }
            }
        }
    }

    return(moveCharacter)
}
