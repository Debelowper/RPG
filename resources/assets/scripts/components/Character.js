import {Action, Ability, Move} from './Actions/Action'
import {Attack, Damage, Ranged, Melee, ApplyEffect, DC, Area, Self} from './Actions/Abilities/Tags'
import {Effect, DoT, Buff} from './Actions/Abilities/Effects'
import {Weapon, Armor, Trinket} from './Inventory/Equipment'

export default class Character{
    constructor({name, base, effects, losses, equipments, stats, resources, defenses, defensesPercentage, bonuses, dodge, actions, triggers, myTurn, initiative, baseInitiative, currentHex, url}){
        this.name = name ? name : ''
        this.base = base
        this.effects = effects ? effects : {}
        this.losses = losses ? losses : {}
        this.equipments = equipments ? equipments : {}

        this.stats = stats ? stats : {}
        this.resources = resources ? resources : {}
        this.defenses = defenses ? defenses : {}
        this.defensesPercentage = defensesPercentage ? defensesPercentage : {}
        this.bonuses = bonuses ? bonuses : {}
        this.dodge = dodge ? dodge : 0

        this.actions = actions ? actions : {}
        this.triggers = triggers ? triggers : {}

        this.myTurn = myTurn ? myTurn : false
        this.initiative = initiative ? initiative : -1
        this.baseInitiative = baseInitiative ? baseInitiative : -1
        this.currentHex = currentHex ? currentHex : {}
        this.url = url ? url : ''
    }

    calculate(){
        let response = {...this}
        // response['stats'] = this.base.stats + this.effects.stats + this.equipments.stats
        
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
        actions.mainHand = this.makeWeaponAbilities(this.base.equipmentSlots.find(el => el.name == 'mainHand').item)
        actions.offHand = [this.base.offHand]
        actions.ability1=abilityOptions
        actions.ability2=abilityOptions
        actions.ability3=abilityOptions
        actions.ability4=abilityOptions
        actions.ability5=abilityOptions
        actions.ability6=abilityOptions
        actions.ability7=abilityOptions
        actions.ability8=abilityOptions

        actions.skill=[]

        return actions
    }

    makeWeaponAbilities  (weapon) {
        let weaponAbilities = weapon.constructor.name == 'Weapon' ? [] : [fists]
        if(weaponAbilities.length == 0){
            this.base.weaponAbilities.forEach((item, i) => {
                if(item.type == 'weaponAbility'){
                    if(!item.requirement || weapon.types.find(el => el == item.requirement)){
                        let newAbility = Object.assign({},item)

                        let atk = new Attack({
                            bonus:weapon.bonus ,
                            damage: weapon.damage,
                        })

                        let rangeTag
                        if(!item.tags.find(el => el.constructor.name == 'Ranged' ||  el.constructor.name == 'Melee')){
                            if(weapon.types.find(el => el =='melee')){
                                rangeTag = new Melee({range:weapon.range})
                            }
                            if(weapon.types.find(el => el =='ranged')){
                                rangeTag = new Ranged({range:weapon.range})
                            }
                        }

                        newAbility.name = item.name
                        newAbility.cost = item.cost
                        newAbility.tags = [
                            ...weapon.effects,
                            ...item.tags,
                            rangeTag,
                            atk,
                        ]
                        weaponAbilities.push(newAbility)
                    }
                }
            });
        }
        return weaponAbilities
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


const fists = new Ability({
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

const atk = new Ability({
    tags:[],
    type:'weaponAbility',
    name:'attack',
    cost:[{resource:'actions', cost:1}],
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
        }),
        new Self()
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

const sword = new Weapon({
    name:'sword',
    types:['melee'],
    range:1,
    bonus:2,
    weight:5,
    damage:[new Damage({type:'slashing', damage:15, bypassDef:'none'})],
    slots:['mainHand', 'offHand'],
})

const wand = new Weapon({
    name:'wand',
    types:['ranged'],
    range:5,
    bonus:4,
    weight:2,
    damage:[new Damage({type:'fire', damage:10, bypassDef:'none'})],
    slots:['mainHand', 'offHand'],
})

const characters = {
    elfSorcerer: {
        name:'elfSorcerer',
        stats:{},
        resources:{hp:50,actions:10, speed:100 },
        defenses:{piercing:0, slashing:2, blunt:0, fire:5, ice:5, radiant:0, dark:0, thunder:5, pure:0},
        defensesPercentage:{piercing:0, slashing:0, blunt:0, fire:0, ice:0, radiant:0, dark:0, thunder:0, pure:0},
        equipmentSlots:[
            {name:'mainHand', type:'weapon', item:wand }, {name:'offHand', type:'weapon', item:{} },
            {name:'armor', type:'armor', item:{} }, {name:'gloves', type:'armor', item:{} }, {name:'necklace', type:'trinket', item:{} }
        ],
        permabuffs:{},
        dodge:10,
        move:move,
        mainHand:fists,
        offHand:fists,
        weaponAbilities:[
            atk
        ],
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
        equipmentSlots:[
            {name:'mainHand', type:'weapon', item:sword }, {name:'offHand', type:'weapon', item:{} },
            {name:'armor', type:'armor', item:{} }, {name:'gloves', type:'armor', item:{} }, {name:'necklace', type:'trinket', item:{} }
        ],
        permabuffs:{},
        dodge:0,
        move:move,
        mainHand:fists,
        offHand:fists,
        weaponAbilities:[
            atk
        ],
        abilities:[
            unholyRage
        ],
        url:'/draugr.png',
        initiativeBonus:3,
    },
}
