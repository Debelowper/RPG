import {damage} from './Damage'
import {Tag} from './Tags'

export class Effect extends Tag{
    constructor( {name, timeoutType, timeout, stackType='independent', stacks=[], maxStacks=2, tagId, refs}){
        super({tagId, refs})
        this.name = name
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

    doAction(target){
        this.putEffect(target)
    }
}

export class DoT extends Tag{
    constructor({refs, stackable=false, tagId}){
        super({tagId, refs, refs})
        this.stackable = stackable
    }

    doAction(target){
        this.damage.doAction( target)
    }
}

export class Buff extends Tag{
    constructor({buffType, buffTag, buffAttr, value, weaponTypes=[], damageTypes=[], abilityTypes=[], conditions=[], tagId, refs }){
        super({tagId, refs})
        this.buffType = buffType
        this.buffTag = buffTag
        this.buffAttr = buffAttr
        this.weaponTypes = weaponTypes
        this.damageTypes = damageTypes
        this.abilityTypes = abilityTypes
        this.conditions = conditions
        this.value = value
        this.buffTypes = ['stat', 'actionBonus', 'resourceBonus']
    }
    doAction(){
        return
    }
}

export class Transform extends Tag{

}

export class Summon extends Tag{
    constructor({character, owner, tagId, refs}){
        super({tagId, refs})
        this.character = character
        this.owner = owner
    }
}

export class Illusion extends Tag{

}

export class DelayedDamage extends Tag{
    constructor(delay, tagId, refs){
        super({tagId, refs})
        this.delay = delay
    }
}
