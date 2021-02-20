export default class Character{
    constructor(id){
        this.base = getChar(id)
        this.effects = {}
        this.losses = {}
        this.equipments = {}

        this.stats = {}
        this.resources = {}
        this.defenses = {}
        this.defensesPercentage = {}
        this.bonuses = {}

        this.actions ={}
        this.triggers = {}
    }

    calculate(){
        //todo
        console.log(calculate)
        // response = {}
        // response['stats'] = this.base.stats + this.effects.stats + this.equipments.stats
        // response['resources'] = this.base.resources + this.effects.resources - this.losses
        // response['defenses'] = this.base.defenses + this.equipments.defenses + this.effects.defenses
        // response['defensesPercentage'] = this.base.defensesPercentage + this.equipments.defensesPercentage + this.effects.defensesPercentage
        // response['bonuses'] = this.base.bonuses + this.equipments.bonuses + this.effects.bonuses
        //
        // response.actions = getActions()
        // response.triggers = getTriggers()
        //
        // return response

    }

    getActions(){
        // todo
        console.log('actions')
    }

    getTriggers(){
        // todo
        console.log('triggers')
    }


}


class Defense = {
    constructor(type, value){
        this.value = value
        this.type = type
    }
}

class DefensePercentage = {
    constructor(type, value){
        this.value = value
        this.type = type
    }
}

class Loss = {
    constructor(resource, value){
        this.value = value
        this.resource = resource
    }
}

class Action = {
    constructor(cost, tags, effect){
        this.cost = cost
        this.source = source
        this.effect = effect
        this.tags = tags
    }
}

class Effect = {
    constructor(type, timeout, data){
        this.type = type
        this.timeout = timeout
        this.data = data
    }
}

class Bonus = {
    constructor(target, data){
        this.target = target
        this.data = data
    }
}


// order of checking = {
// 	equipment buffs + buffs = totalbuffs   --> if equip change or if buffs change
// 	statbuffs + baseStats = totalstats	--> if stats change
// 	base actions + equipment actions = allActions	--> if actions change
// 	baseSkills + buffToSkills = total skill
// 	calc buffs from stats + specific buffs = buffs to actions
// 	base resources + specific buffs + stat bonuses - losses = current resource --> if losses change
// 	is alive
// 	apply buffs to actions
// 	check if action is available
// 	check triggers (concentration, opportunity)
//
// }

const effectTypes = ['dot', 'transform', 'buffstat', 'bonus' ,'control']

function getChar(id){
    return characters[id]
}

const characters = [
    {
        name:'elfSorcerer',
        stats:{},
        resources:{hp:50,actions:10, speed:100 },
        defenses:{piercing:0, slashing:2, blunt:0, fire:5, ice:5, radiant:0, dark:0, thunder:5},
        defensesPercentage:{piercing:0, slashing:0, blunt:0, fire:0, ice:0, radiant:0, dark:0, thunder:0},
        permabuffs:{},
        dodge:10,
        actions:{
            move:{default: {walk:30} , options:{walk:30, fly:0, swim:10, climb:10} },
            attack:{default: {wand:{types:['ranged'], damage:[{damage:10, type:'fire'}], bonus:10, range:5, cost:[{resource:'actions', cost:1}] }},
                options:{wand:{types:['ranged'], damage:[{damage:10, type:'fire'}], bonus:10, range:5, cost:[{resource:'actions', cost:1}]} }
            },
            castSpell:{
                default: {},
                options:{magicMissile:{types:['damage', 'ranged', 'attack'], damage:[{damage:15, type:'blunt'}], bonus:999, range:6 , cost:[{resource:'spellslot1', cost:1}, {resource:'actions', cost:1}] }}
            },
        },
        url:'/sorcerer-elf.png',
        initiativeBonus:3,
    },
    {
        name:'draugr',
        resources:{hp:80,actions:10, speed:100 },
        defenses:{piercing:8, slashing:2, blunt:4, fire:-2, ice:5, radiant:-4, dark:4, thunder:0},
        defensesPercentage:{piercing:0, slashing:0, blunt:0, fire:0, ice:0, radiant:0, dark:0, thunder:0},
        dodge:0,
        actions:{
            move:{default: {walk:30} , options:{walk:30, fly:0, swim:10, climb:10} },
            attack:{default: {sword:{types:['melee'], damage:[{damage:12, type:'slashing'}], bonus: 2, cost:[{resource:'actions', cost:1}] }} ,
                options:{sword:{types:['melee'], damage:[{damage:12, type:'slashing'}], bonus: 2, cost:[{resource:'actions', cost:1}] }}
            },
        },
        url:'/draugr.png',
        initiativeBonus:3,
    },
]
