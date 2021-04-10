const tags = ['damage', 'dot', 'attack', 'DC', 'buff', 'illusion', 'summon', 'inventory', 'charControl', 'transform', 'area','ranged', 'melee']
import {circle, ring, line, cone} from './../../Shapes'
import {damage} from './Damage'
import {attack} from './Attack'
import {DiffClass} from './DC'

export class Tag{
    constructor({tagId=0, refs=[], tags =[]}){
        this.tagId = tagId
        this.refs = refs
        this.tags = tags
    }
}

export class Attack extends Tag{
    constructor({bonus, refs=[], tagId}){
        super({tagId, refs})
        this.bonus = bonus
    }

    doAction(targetChar){
        return attack(targetChar, this.bonus, this.tags)
    }
}

export class Damage extends Tag{
    constructor({type, damage, bypassDef='none', tagId, refs}){
        super({tagId})
        this.type = type
        this.damage = damage
        this.bypassDef = bypassDef
        this.bypassDefTypes = ['none', 'both', 'def', 'percent']
    }

    doAction(target){
        damage(this.damage, this.type, this.bypassDef, target)
    }
}

export class Range extends Tag{
    constructor({range, blockable=true, type , tagId, refs}){
        super({tagId})
        this.type = type
        this.range = range
        this.blockable = blockable
    }
    doAction(){
        return this.range
    }
}

export class Area extends Tag{
    constructor({ shape, radius=1, angle=1 , tagId, refs}){
        super({tagId})
        this.radius = radius
        this.shape = shape
        this.angle = angle
    }

    doAction({source, target, rangeUtils, self=true}){

        return rangeUtils.getAreaTargets({target:target, shape:this.shape, source:source, radius:this.radius, angle:this.angle, self:self})
    }
}

export class DC extends Tag{
    constructor({value, type, damage=[], effects=[], tagId, refs}){
        super({tagId, refs})
        this.value = value
        this.type = type
    }

    doAction(targetChar){
        return DiffClass(targetChar, this.value, this.tags)
    }
}

export class Displace extends Tag{
    constructor({tagId, refs}){
        super({tagId, refs})
        //TODO
    }
}

export class Self extends Tag{
    constructor( tagId, refs){
        super({tagId, refs})
    }
    doAction(self, target){
        return JSON.stringify(self) == JSON.stringify(target)
    }
}

export class Summon extends Tag{
    constructor({effect, tagId, refs}){
        super({tagId, refs})
        this.effect = effect
    }
    doAction(target){
        this.effect.putEffect(target)
    }
}

export class Terrain extends Tag{
    constructor({terrain, tagId, refs}){
        super({tagId, refs})
        this.terrain = terrain
    }
}

export class Illusion extends Tag{
    constructor({effect, tagId, refs}){
        super({tagId, refs})
        this.effect = effect
    }
    doAction(target){
        this.effect.putEffect(target)
    }
}

export class Inventory extends Tag{
    constructor({items, tagId, refs}){
        super({tagId, refs})
        this.items = items
    }
    doAction(target){
        this.effect.putEffect(target)
    }
}
