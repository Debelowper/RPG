import {getTargetChars, roll, isInRange, setRange, hasResources, spendResources} from './ActionUtils'
import {rollAttack} from './Abilities/Attack'
import {dealDamage} from './Abilities/Damage'
import RangeUtils from './../RangeUtils'

const tags = ['damage', 'dot', 'attack', 'DC', 'buff', 'illusion', 'summon', 'inventory', 'charControl', 'transform', 'area','ranged', 'melee']
const damageTypes = ['piercing', 'slashing', 'blunt', 'fire', 'ice', 'radiant', 'dark', 'thunder', 'poison', 'acid']

export function ability ({characters, tiles, structures, rangeUtils, setAction, currentCharacter , selectedAction, inCombat}){

    const abilityCallback = (getter, setter, hex) => {

        let char = characters[currentCharacter]
        let selectedAbility = selectedAction.option

        selectedAbility.tags = selectedAbility.buildTags()
        console.log(selectedAbility)
        if(hasResources(char, selectedAbility)){

            let targetHexes = getTargets(selectedAbility, char, hex)
            if(targetHexes){
                let targets = getTargetChars(targetHexes, characters)

                let updatedChar = spendResources(char, selectedAbility)

                if(targets){
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

                        let effect = selectedAbility.tags.find(el=> el.constructor.name == 'Effect')
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
                }

                setAction( [ {type:'character', action:{ [updatedChar.name]: updatedChar, ...targets } } ] )

            }

        }

    }

    const getTargets = (selectedAbility, char, hex) => {

        let checkRange = selectedAbility.tags.find(el=>  el.constructor.name == 'Range')
        let range = 1
        if(checkRange){
            range = checkRange.doAction()
        }

        const target = rangeUtils.getRangedTarget({target:hex.hex, source: char.currentHex, range:range})

        if(target){
            let hexes = [target]

            let self = selectedAbility.tags.find(el=> el.constructor.name == 'Self')
            if(self){
                if(!self.doAction(char.currentHex, hex.hex)){
                    console.log('must select self')
                    return null
                }
            }

            let area = selectedAbility.tags.find(el=> el.constructor.name == 'Area')
            if(area){
                hexes = area.doAction({source:char.currentHex, target:target, rangeUtils: rangeUtils})
            }

            return hexes
        }else{
            console.log('not in range')
        }
    }


    return(abilityCallback)
}
