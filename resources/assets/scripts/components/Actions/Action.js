export class Action {
    constructor({type, name}){
        this.type = type
        this.name = name
    }
}

export class Ability extends Action{
    constructor({tags = [], name, cost}){
        super({name, type: 'ability'})
        this.tags = tags
        this.cost = cost
    }
}


export class Move extends Action{
    constructor({ value, name}){
        super({type:'move', name})
        this.value = value
    }
}

export class Equip extends Action{
    constructor({name, item, cost}){
        super({name, type:'equip'})
        this.name = name
        this.item = item
        this.cost = cost
    }
}

export class Skill extends Action{
    constructor({name, value}){
        this.name = name
        this.value = value
    }
}

export class Spawn{
    constructor({char, hex}){
        this.char = char
        this.hex = hex
    }
}
