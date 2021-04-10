import {Item} from './Inventory'

export class Equipment extends Item{
    constructor({name, actions=[], weight, buffs=[], craft={}, cost=0, durability = null, slots, equipCost={resource:'actions', cost:1}}){
        super({name, weight, cost, consumable:'no'})
        this.actions = actions
        this.buffs = buffs
        this.craft = craft
        this.durability = durability
        this.slots = slots
        this.isEquipped = false
        this.equipCost = equipCost
    }
}

export class Trinket extends Equipment{
    constructor({name, actions, weight, buffs, craft, cost, durability, slots, equipCost}){
        super({ name, actions, weight, buffs, craft, cost, durability, slots, equipCost})
    }
}

export class Armor extends Equipment{
    constructor({types, name, actions, weight, buffs, craft, cost, durability, defenses={}, defensesPercentage={}, dodge=0, slots, equipCost}){
        super({ name, actions, weight, buffs, craft, cost, durability, slots, equipCost})
        this.types = types
        this.defenses = defenses
        this.defensesPercentage = defensesPercentage
        this.dodge = dodge
    }
}

export class Weapon extends Equipment{
    constructor( {damage, types, name, actions, weight, buffs, craft, cost, durability, slots, effects=[], bonus=0, range, equipCost}){
        super({ name, actions, weight, buffs, craft, cost, durability, slots, equipCost})
        this.damage = damage
        this.bonus = bonus
        this.range = range
        this.types = types
        this.effects = effects
    }
}
