class Inventory {
    constructor({owner='any', maxItems=100, items=[]}){
        this.owner = owner
        this.maxItems
        this.items = items
    }
}

class Bag extends Invenotry (
    constructor({owner, maxItems, items){
        super({owner:owner, maxItems: maxItems, items:items})
        this.available = 'true'
    }
)

class Stash extends Invenotry (
    constructor({owner, maxItems, items){
        super({owner:owner, maxItems: maxItems, items:items})
        this.available = 'false'
    }
)

class Item {
    constructor({type, name, cost, consumable, stacks, weight, data}){
        this.type = type
        this.name = name
        this.consumable = consumable
        this.stacks = stacks
        this.weight = weight
        this.data = data
    }
}
