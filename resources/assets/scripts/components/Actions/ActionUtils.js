import {HexUtils} from 'react-hexgrid'

export function isNeighbour (hex, currentHex) {
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

export function isOccupied  (hex, characters)  {
    if(getTargetChar(hex, characters) != null){
        console.log('it is occupied')
        return true
    }
    return false
}

export function getTargetChar(hex, characters){
    return(
        Object.values(characters).find((el)=>{
            return HexUtils.getID(el.currentHex) == HexUtils.getID(hex)
        })
    )
}

export function roll (max, min = 1) {
      return Math.floor(Math.random() * (max - min) ) + min;
}

export function isInRange(hex, character, range){
    return HexUtils.distance(character.currentHex, hex) <= range
}
