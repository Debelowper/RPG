const tags = ['damage', 'dot', 'attack', 'DC', 'buff', 'illusion', 'summon', 'inventory', 'charControl', 'transform', 'area','ranged', 'melee']
import {circle, ring, line, cone} from './../../Shapes'
import {damage} from './Damage'
import {attack} from './Attack'
import {DiffClass} from './DC'

export class Attack{
    constructor({bonus, damage=[], effects=[]}){
        this.bonus = bonus
        this.damage = damage
        this.effects = effects
    }

    doAction(targetChar){
        return attack(targetChar, this.bonus, this.damage, this.effects)
    }
}

export class Damage{
    constructor({type, damage, bypassDef='none'}){
        this.type = type
        this.damage = damage
        this.bypassDef = bypassDef
        this.bypassDefTypes = ['none', 'both', 'def', 'percent']
    }

    doAction(target){
        damage(this.damage, this.type, this.bypassDef, target)
    }
}

export class Ranged{
    constructor({range, blockable=true}){
        this.range = range
        this.blockable = blockable
    }
    doAction(){
        return this.range
    }
}

export class Melee{
    constructor({range}){
        this.range = range
    }
    doAction(){
        return this.range
    }
}

export class Area{
    constructor({ shape, radius=1, angle=1}){
        this.radius = radius
        this.shape = shape
        this.angle = angle
    }

    doAction({source, target, rangeUtils, self=true}){

        return rangeUtils.getAreaTargets({target:target, shape:this.shape, source:source, radius:this.radius, angle:this.angle, self:self})
    }
}

export class DC{
    constructor({value, type, damage=[], effects=[]}){
        this.value = value
        this.type = type
        this.damage = damage
        this.effects = effects
    }

    doAction(targetChar){
        return DiffClass(targetChar, this.value, this.damage, this.effects)
    }
}

export class Self{
    constructor(){
    }
    doAction(self, target){
        return JSON.stringify(self) == JSON.stringify(target)
    }
}

export class ApplyEffect{
    constructor({effect}){
        this.effect = effect
    }
    doAction(target){

        this.effect.putEffect(target)
    }
}

export class Summon{
    constructor({effect}){
        this.effect = effect
    }
    doAction(target){
        this.effect.putEffect(target)
    }
}

export class Terrain{
    constructor({terrain}){
        this.terrain = terrain
    }
}

export class Illusion{
    constructor({effect}){
        this.effect = effect
    }
    doAction(target){
        this.effect.putEffect(target)
    }
}

export class Inventory{
    constructor({items}){
        this.items = items
    }
    doAction(target){
        this.effect.putEffect(target)
    }
}
