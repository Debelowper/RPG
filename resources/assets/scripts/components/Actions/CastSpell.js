import {getTargetChar, roll, isInRange, setRange, hasResources, spendResources} from './ActionUtils'
import {rollAttack, dealDamage} from './Attack'

const spellTypes = ['damage', 'dot', 'attack', 'DC', 'buff', 'illusion', 'summon', 'inventory', 'charControl', 'transform', 'area','ranged', 'melee']
const damageTypes = ['piercing', 'slashing', 'blunt', 'fire', 'ice', 'radiant', 'dark', 'thunder', 'poison', 'acid']

export function castSpell ({characters, tiles, structures, setAction, currentCharacter , option, inCombat}){

    const castSpellCallback = (getter, setter, hex) => {

        let char = characters[currentCharacter]
        let selectedSpell = char.actions.castSpell.options[option]

        if(hasResources(char, selectedSpell)){

            let range = setRange(selectedSpell)

            if(isInRange(hex.hex, char, range)){

                let updatedChar = spendResources(char, selectedSpell)

                if(selectedSpell.types.find(el=> el == 'attack')){
                    let targetChar = getTargetChar(hex.hex, characters)
                    if(targetChar){
                        let updatedTarget = targetChar
                        if(rollAttack(updatedTarget, selectedSpell)){
                            updatedTarget = dealDamage(updatedTarget, selectedSpell)
                        }
                        setAction( [ {type:'character', action:{ [updatedChar.name]: updatedChar, [updatedTarget.name]: updatedTarget } } ] )
                    }
                }

            }else{
                console.log('not in range')
            }
        }

    }

    return(castSpellCallback)
}
