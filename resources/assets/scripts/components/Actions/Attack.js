import {getTargetChar, roll, isInRange, hasResources, setRange, spendResources} from './ActionUtils'

const attackTypes = ['ranged', 'melee', 'area']
const damageTypes = ['piercing', 'slashing', 'blunt', 'fire', 'ice', 'radiant', 'dark', 'thunder']

export function attack ({characters, tiles, structures, setAction, currentCharacter , option, inCombat}){

    const attackCallback = (getter, setter, hex) => {

        let char = characters[currentCharacter]
        let selectedAttack = char.actions.attack.options[option]
        let targetChars = []

        if(hasResources(char, selectedAttack) ){

            let range = setRange(selectedAttack)
            targetChars.push(getTargetChar(hex.hex, characters))
            if(targetChars.length > 0){

                if(isInRange(hex.hex, char, range)){

                    char = spendResources(char, selectedAttack)
                    // let i =0
                    for(let i=0 ; i<targetChars.length; i++){
                        if(rollAttack(targetChars[i], selectedAttack)){
                            targetChars[i] = dealDamage(targetChars[i], selectedAttack)
                        }
                    }
                }else{
                    console.log('not in range')
                }
            }
        }
        let targets = {}
        targetChars.forEach(el => {
            targets[el.name] = el
        })
        setAction( [ {type:'character', action:{ [char.name]: char, ...targets } } ] )
    }
    return(attackCallback)
}

export function rollAttack(targetChar, selectedAttack){
    //makes attack roll
    let dodge = targetChar.dodge
    let atkRoll = roll(20) + selectedAttack.bonus

    console.log(atkRoll, dodge)

    return atkRoll >= dodge ? true : false
}

export function dealDamage(targetChar, selectedAttack){
    //calculates damage
    let damages = {}
    selectedAttack.damage.forEach(el => {
        let dmgType = el.type
        let dmg = (el.damage - targetChar.defenses[dmgType])*(1-targetChar.defensesPercentage[dmgType]/100)
        damages[dmgType] = dmg
    })

    let totalDamage = Object.values(damages).reduce((sum, el) => {return sum+el}, 0)

    //consumes action resource and sets update action
    return {...targetChar, resources:{...targetChar.resources, hp:targetChar.resources.hp - totalDamage} }
}
