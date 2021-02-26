import {getTargetChars, roll, isInRange, setRange, hasResources, spendResources} from './ActionUtils'
import {rollAttack} from './Abilities/Attack'
import {dealDamage} from './Abilities/Damage'

const tags = ['damage', 'dot', 'attack', 'DC', 'buff', 'illusion', 'summon', 'inventory', 'charControl', 'transform', 'area','ranged', 'melee']
const damageTypes = ['piercing', 'slashing', 'blunt', 'fire', 'ice', 'radiant', 'dark', 'thunder', 'poison', 'acid']

export function ability ({characters, tiles, structures, setAction, currentCharacter , selectedAction, inCombat}){

    const abilityCallback = (getter, setter, hex) => {

        let char = characters[currentCharacter]
        let selectedAbility = selectedAction.option

        if(hasResources(char, selectedAbility)){

            let hexes = [hex.hex]
            let area = selectedAbility.tags.find(el=> el.constructor.name == 'Area')
            if(area){
                hexes = area.doAction({start:char.currentHex, end:hex.hex})
            }

            let self = selectedAbility.tags.find(el=>constructor.name == 'Self')
            if(self){
                if(!self.doAction(char, target)){
                    console.log('must select self')
                    return
                }
            }
            let range = 1
            let checkRange = selectedAbility.tags.find(el=> el.constructor.name == 'Melee' || el.constructor.name == 'Ranged')
            if(checkRange){
                range = checkRange.doAction()
            }

            if(isInRange(hex.hex, char, range)){

                let updatedChar = spendResources(char, selectedAbility)

                //TODO check if path to target is blocked. Must wait until blocking structures are added
                let targets = getTargetChars(hexes, characters)

                Object.values(targets).forEach(targ => {
                    let updatedTarget = targ
                    let atk = selectedAbility.tags.find(el=> el.constructor.name == 'Attack')
                    if(atk){
                        atk.doAction(updatedTarget)
                    }

                    let spell = selectedAbility.tags.find(el=> el.constructor.name == 'DC')
                    if(spell){
                        spell.doAction(updatedTarget)
                    }

                    let effect = selectedAbility.tags.find(el=> el.constructor.name == 'ApplyEffect')
                    if(effect){
                        effect.doAction(updatedTarget)
                    }

                    // if(selectedAbility.types.find(el=> el == 'inventory')){
                    //     console.log('inventory')
                    // }
                    //
                    // if(selectedAbility.types.find(el=> el == 'Illusion')){
                    //     console.log('Illusion')
                    // }
                    //
                    // if(selectedAbility.types.find(el=> el == 'Summon')){
                    //     console.log('Summon')
                    // }
                    targets[updatedTarget.name] = updatedTarget
                })


                setAction( [ {type:'character', action:{ [updatedChar.name]: updatedChar, ...targets } } ] )
            }else{
                console.log('not in range')
            }

        }

    }

    return(abilityCallback)
}
