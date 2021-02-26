import {Action, Ability, Move} from './Actions/Action'
import {Attack, Damage, Ranged, Melee, ApplyEffect, DC, Area} from './Actions/Abilities/Tags'
import {Effect, DoT, Buff} from './Actions/Abilities/Effects'

export default class Character{
    constructor(data){
        this.name = data.name ? data.name : ''
        this.base = data.base
        this.effects = data.effects ? data.effects : {}
        this.losses = data.losses ? data.losses : {}
        this.equipments = data.equipments ? data.equipments : {}

        this.stats = data.stats ? data.stats : {}
        this.resources = data.resources ? data.resources : {}
        this.defenses = data.defenses ? data.defenses : {}
        this.defensesPercentage = data.defensesPercentage ? data.defensesPercentage : {}
        this.bonuses = data.bonuses ? data.bonuses : {}
        this.dodge = data.dodge ? data.dodge : 0

        this.actions = data.actions ? data.actions : {}
        this.triggers = data.triggers ? data.triggers : {}

        this.myTurn = data.myTurn ? data.myTurn : false
        this.initiative = data.initiative ? data.initiative : -1
        this.baseInitiative = data.baseInitiative ? data.baseInitiative : -1
        this.currentHex = data.currentHex ? data.currentHex : {}
        this.url = data.url ? data.url : ''
    }

    calculate(){
        let response = {...this}
        // response['stats'] = this.base.stats + this.effects.stats + this.equipments.stats
        // response['bonuses'] = this.base.bonuses + this.equipments.bonuses + this.effects.bonuses
        response.bonuses = this.calcBonuses()
        response.url = this.base.url
        response.losses = this.calcLosses()
        response.resources = this.calcResources(response.bonuses, response.losses)
        response.defenses = this.calcDefenses()
        response.dodge = this.calcDodge()
        response.defensesPercentage = this.calcDefensesPercentage()

        response.actions = this.getActions()
        //add bonuses to actions
        // response.triggers = getTriggers()
        //
        return response
    }

    getActions(){
        let actions = {}

        let abilityOptions = this.base.abilities
        actions.move = this.base.move
        actions.mainHand = [this.base.mainHand]
        actions.offHand = [this.base.offHand]
        actions.ability1=abilityOptions
        actions.ability2=abilityOptions
        actions.ability3=abilityOptions
        actions.ability4=abilityOptions
        actions.ability5=abilityOptions
        actions.ability6=abilityOptions
        actions.ability7=abilityOptions
        actions.ability8=abilityOptions

        // actions.equip={options:{mainHand:{}, offhand:{}, armor:{}, trinkets:{}}}
        actions.skill=[]

        return actions
    }

    getTriggers(){
        // todo
        console.log('triggers')
    }

    calcBonuses(){
        let bonuses = {}
        Object.values(this.effects).forEach(el=>{
            el.effect.forEach(buff => {
                if(buff.constructor.name == 'Buff'){
                    if(buff.buffType == 'bonus'){
                        if(bonuses[buff.buffTarget]){
                            bonuses[buff.buffTarget] += buff.value * el.stacks.length
                        }else{
                            bonuses[buff.buffTarget] = buff.value * el.stacks.length
                        }
                    }
                }
            })
        })
        return bonuses
    }

    calcDodge(){
        let dodge = this.base.dodge +
            (this.effects.dodge ? this.effects.dodge : 0 ) +
            (this.equipments.dodge ? this.equipments.dodge : 0)
        return dodge
    }

    calcDefenses(){
        let defenses = {...this.base.defenses}
        if(this.effects.defenses){
            Object.entries(this.effects.defenses).forEach( el => {
                defenses[el[0]]= defenses[el[0]] + el[1]
            })
        }
        if(this.equipments.defenses){
            Object.entries(this.equipments.defenses).forEach( el => {
                defenses[el[0]] = defenses[el[0]] - el[1]
            })
        }
        return defenses
    }

    calcDefensesPercentage(){
        let defensesPercentage = {...this.base.defensesPercentage}
        if(this.effects.defensesPercentage){
            Object.entries(this.effects.defensesPercentage).forEach( el => {
                defensesPercentage[el[0]]= defensesPercentage[el[0]] + el[1]
            })
        }
        if(this.equipments.defensesPercentage){
            Object.entries(this.equipments.defensesPercentage).forEach( el => {
                defensesPercentage[el[0]] = defensesPercentage[el[0]] - el[1]
            })
        }
        return defensesPercentage
    }

    calcResources(bonuses, losses){
        let resources = {...this.base.resources}
        Object.entries(resources).forEach(el=>{
            if(bonuses[el[0]]){
                resources[el[0]] += bonuses[el[0]]
            }
            if(losses[el[0]]){
                resources[el[0]] -= losses[el[0]]
            }
        })
        // console.log(resources, bonuses, losses)

        return resources
    }

    calcLosses(){
        let losses = {}
        if(Object.keys(this.base.resources ).length > 0){
            if(Object.keys(this.losses).length == 0){
                Object.keys(this.base.resources).forEach(el=>{
                    losses[el] = 0
                })
                return losses
            }else{
                return this.losses
            }
        }
        return losses

    }

    passTurn(){
        let resp = {}
        resp.effects = {}

        Object.entries(this.effects).forEach(effect=>{
            effect[1].timeout -= 1

            effect[1].effect.forEach(el => {
                effect[1].stacks.forEach(stack=>{
                    el.doEffect(this)
                })
            })

            effect[1].stacks = effect[1].stacks.map(el=>{
                return el-1
            })
            effect[1].stacks = effect[1].stacks.filter(el => el > 0)

            if(effect[1].timeout > 0){
                resp.effects[effect[0]] = effect[1]
            }
        })

        resp.initiative = this.baseInitiative
        resp.losses = {...this.losses, speed:0}

        return resp
    }
}

const actionTypes = [ 'attack', 'DC', 'buff', 'illusion', 'summon', 'inventory', 'charControl', 'transform', 'ranged', 'melee', 'self', 'area', 'targeted', 'move']

const effectTypes = ['dot', 'transform', 'buffstat', 'bonus' ,'control', 'summon', 'illusion', 'inventory']

export function getChar(name){
    return characters[name]
}

const equipments = {
    sword:{types:['melee', 'targeted', 'attack'], damage:[{damage:12, type:'slashing'}], effect:{}},
    wand:{types:['ranged', 'targeted', 'attack'], damage:[{damage:10, type:'fire'}], effect:{}}
}

const fists = new Ability({
    name:'fists',
    tags:[
        new Attack({
            bonus: 0,
            damage:[new Damage({type:'blunt', damage:5, bypassDef:'none'})],
            effects:[new DC(
                {
                    value: 10,
                    effects: [
                        new Effect({
                            effects:[new DoT({damage: new Damage({type:'pure', damage:2, bypassDef:'both'}), stackable: true, maxStacks:3}) ],
                            name:'bleed', timeoutType:'turn', timeout: 3
                        })
                    ],
                    damage:[],
                }
            )]
        }),
        new Melee({range:1})
    ],
    name:'punch',
    cost:[{resource:'actions', cost:1}]
})

const fireball = new Ability({
    name:'fireball',
    tags:[
        new DC({
            value:10,
            type:'agility',
            damage:[new Damage({
                type:'fire',
                damage:25,
                bypassDef:'none'
            })],
        }),
        new Area({
            radius: 3,
            shape: 'circle'
        }),
        new Ranged({
            range:6,
            blockable:true
        })
    ],
    name:'fireball',
    cost:[{resource:'actions', cost:1}, /*{resource:'spellslot1', cost:1}*/]
})

const unholyRage = new Ability({
    name: 'unholyRage',
    cost:[{resource:'actions', cost:1}],
    tags:[
        new ApplyEffect({
            effect: new Effect({
                name:'unholyRage', timeoutType:'turn', timeout: 3, stackable:true,
                effects:[
                    new Buff({buffType: 'bonus', buffTarget: 'damage', value:5}),
                    new Buff({buffType: 'bonus', buffTarget: 'hp', value:20}),
                ],
            })
        })
    ]
})

let walk = new Move({
    type:'move', name:'walk', value: 100,
})
let fly = new Move({
    type:'move', name:'fly', value: 0,
})
let swim = new Move({
    type:'move', name:'swim', value: 50,
})
let climb = new Move({
    type:'move', name:'climb', value: 25,
})
let move = [walk, fly, swim, climb]

const characters = {
    elfSorcerer: {
        name:'elfSorcerer',
        stats:{},
        resources:{hp:50,actions:10, speed:100 },
        defenses:{piercing:0, slashing:2, blunt:0, fire:5, ice:5, radiant:0, dark:0, thunder:5, pure:0},
        defensesPercentage:{piercing:0, slashing:0, blunt:0, fire:0, ice:0, radiant:0, dark:0, thunder:0, pure:0},
        permabuffs:{},
        dodge:10,
        move:move,
        mainHand:fists,
        offHand:fists,
        abilities:[
            fireball
            // magicMissile:{types:['damage', 'ranged', 'attack'], damage:[{damage:15, type:'blunt'}], bonus:999, range:6 , cost:[{resource:'spellslot1', cost:1}, {resource:'actions', cost:1}] },
        ],

        url:'/sorcerer-elf.png',
        initiativeBonus:3,
    },
    draugr:{
        name:'draugr',
        resources:{hp:80,actions:10, speed:100 },
        defenses:{piercing:8, slashing:2, blunt:4, fire:-2, ice:5, radiant:-4, dark:4, thunder:0},
        defensesPercentage:{piercing:0, slashing:0, blunt:0, fire:0, ice:0, radiant:0, dark:0, thunder:0},
        dodge:0,
        move:move,
        mainHand:fists,
        offHand:fists,
        abilities:[
            unholyRage
        ],
        url:'/draugr.png',
        initiativeBonus:3,
    },
}
