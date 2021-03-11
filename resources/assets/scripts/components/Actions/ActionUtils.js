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
    if(getTargetChars([hex], characters) != null){
        console.log('it is occupied')
        return true
    }
    return false
}

export function getTargetChars(hexes, characters){
    let targets = {}
    Object.values(hexes).forEach(hex =>{
        let targ = Object.values(characters).find((el)=>{
            // console.log(el.currentHex, hex)
            return HexUtils.getID(el.currentHex) == HexUtils.getID(hex)
        })
        if(targ)(
            targets[targ.name] = targ
        )
    })
    return Object.keys(targets) == 0 ? null : targets
}

export function roll (max, min = 1) {
      return Math.floor(Math.random() * (max - min) ) + min;
}

export function isInRange(hex, character, range){
    return HexUtils.distance(character.currentHex, hex) <= range
}

export function hasResources(char, action){
    // console.log(action)
    return(
        action.cost.reduce((el)=>{
            return !(char.resources[el.resource] >= el.cost)
        }, true)
    )
}

export function spendResources(char, action){
    let resources = {}
    action.cost.forEach((el)=>{
        resources[el.resource] =  char.resources[el.resource] - el.cost
    })
    let updatedChar = char
    updatedChar.resources = {...char.resources, ...resources}
    return updatedChar
}
