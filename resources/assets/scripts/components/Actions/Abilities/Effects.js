import {damage} from './Damage'

export class Effect {
    constructor( {effects, name, timeoutType, timeout, stackType='independent', stacks=[], maxStacks=2}){
        this.name = name
        this.effect = effects
        this.timeoutType = timeoutType
        this.timeout = timeout
        this.stackType = stackType
        this.stacks = stacks
        this.maxStacks = maxStacks
    }

    putEffect(char){
        this.stacks = [this.timeout]
        if(char.effects[this.name]){
            if(this.stackType == 'independent'){
                this.stacks = char.effects[this.name].stacks
                this.stacks.push(this.timeout)
                if(this.stacks.length > this.maxStacks){
                    let smallest = this.stacks.reduce((smallest, el)=> smallest < el ? smallest : el , this.timeout )
                    const index = this.stacks.indexOf(smallest)
                    this.stacks.splice(index, 1)
                }
            }
            if(this.stackType == 'refreshing'){
                if(!this.stacks.length > this.maxStacks){
                    this.stacks.push(this.timeout)
                }
                this.stacks = this.stacks.map(el=> this.timeout)
            }
        }

        let updatedChar = char
        char.effects[this.name] = this
        return updatedChar
    }
}

export class DoT {
    constructor({damage, stackable=false}){
        this.damage = damage
        this.stackable = stackable
    }

    doEffect(target){
        this.damage.doAction( target)
    }
}

export class Buff {
    constructor({buffType, buffTarget, value, weaponTypes=[], damageTypes=[]}){
        this.buffType = buffType
        this.buffTarget = buffTarget
        this.weaponTypes = weaponTypes
        this.damageTypes = damageTypes
        this.value = value
        this.buffTypes = ['stat', 'actionBonus', 'resourceBonus']
    }
    doEffect(){
        return
    }
}

export class Transform {

}

export class Summon {
    constructor({character, owner}){
        this.character = character
        this.owner = owner
    }
}

export class Illusion {

}

export class DelayedDamage {
    constructor(damage){
        this.damage = damage
    }
}
