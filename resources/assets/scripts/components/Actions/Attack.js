import {HexUtils, Hex} from 'react-hexgrid'
import {getTargetChar, roll, isInRange} from './ActionUtils'

export function attack ({characters, tiles, structures, setAction, currentCharacter , option, inCombat}){

    const attackCallback = (getter, setter, hex) => {
        let char = characters[currentCharacter]
        if(char.actionsPerTurn >= 1){

            let targetChar = getTargetChar(hex.hex, characters)
            if(targetChar){

                let selectedAttack = char.actions.attack.options[option]

                if(isInRange(hex.hex, char, selectedAttack.range)){

                    let dodge = targetChar.dodge
                    let atkRoll = roll(20) + selectedAttack.bonus

                    console.log(atkRoll, dodge)

                    if(atkRoll >= dodge){

                        let action = [ {type:'character', action:{}} ]
                        let updatedChar = { ...char, actionsPerTurn:char.actionsPerTurn-1 }
                        let updatedTarget = {...targetChar, hp:targetChar.hp - selectedAttack.damage}
                        setAction( [ {type:'character', action:{ [updatedChar.name]: updatedChar, [updatedTarget.name]: updatedTarget } } ] )
                    }

                }else{
                    console.log('not in range')
                }

            }

        }

    }

    return(attackCallback)
}

// function circle(hex, radius){
//
// }

// const DIRECTIONS = [
//     new Hex(1, 0, -1), new Hex(1, -1, 0), new Hex(0, -1, 1),
//     new Hex(-1, 0, 1), new Hex(-1, 1, 0), new Hex(0, 1, -1)
//   ];

// function ring(){
//
// }
