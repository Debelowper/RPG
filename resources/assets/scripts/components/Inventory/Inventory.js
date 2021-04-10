import {openInventory} from './InventoryPanel'

export class Item {
    constructor({type, name, cost, consumable=false, stacks=1, weight}){
        this.name = name
        this.weight = weight
        this.cost = cost
        this.type = type
        this.consumable = consumable
        this.stacks = stacks
    }
}

export function emptyItem(){
    return new Item({name:'', cost:0, weight:0, })
}

export class Inventory extends Item{
    constructor({owner = '', maxItems=60, items=[], type, name, cost, weight}){
        super({type, name, cost, weight})
        this.owner = owner
        this.maxItems = maxItems
        this.items = [...Array(maxItems).fill(emptyItem())]
        items.forEach((el, i) => this.items[i] = el)
    }

    addItem(slot, item){
        this.items[slot] = item
    }

    removeItem(slot){
        this.items[slot] = slot
    }
}

export class Bag extends Inventory {
    constructor({owner, maxItems, items}){
        super({owner,  maxItems, items})
        this.available = 'true'
    }
}

export class Stash extends Inventory {
    constructor({owner, maxItems, items}){
        super({owner,  maxItems, items})
        this.available = 'false'
    }
}
