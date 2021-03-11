export class Equipment {
    constructor({name, actions=[], weight, buffs=[], craft={}, cost=0, durability = null}){
        this.name = name
        this.actions = actions
        this.weight = weight
        this.buffs = buffs
        this.craft = craft
        this.cost = cost
        this.durability = durability
    }

}

export class Trinket extends Equipment{
    constructor({name, actions, weight, buffs, craft, cost, durability}){
        super({ name:name, actions:actions, weight:weight, buffs:buffs, craft:craft, cost:cost, durability:durability})
        this.equipCost = {resource:'actions', cost:1}

    }
}

export class Armor extends Equipment{
    constructor({types, name, actions, weight, buffs, craft, cost, durability}){
        super({ name:name, actions:actions, weight:weight, buffs:buffs, craft:craft, cost:cost, durability:durability})
        this.types = types
        this.equipCost = {resource:'actions', cost:1}
    }
}

export class Weapon extends Equipment{
    constructor( {damage, types, name, actions, weight, buffs, craft, cost, durability}){
        super({ name:name, actions:actions, weight:weight, buffs:buffs, craft:craft, cost:cost, durability:durability})
        this.damage = damage
        this.types = types
        this.equipCost = {resource:'actions', cost:1}
    }
}
