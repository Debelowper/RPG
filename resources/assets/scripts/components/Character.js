import {Action, Ability, Move} from './Actions/Action'
import {Attack, Damage, Range, DC, Area, Self} from './Actions/Abilities/Tags'
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
        response.resources = this.calcResources(response.bonuses.resourceBonuses, response.losses)
        response.defenses = this.calcDefenses()
        response.dodge = this.calcDodge()
        response.defensesPercentage = this.calcDefensesPercentage()

        response.actions = this.getActions(response.bonuses)
        // response.triggers = getTriggers()
        //
        return response
    }

    getActions(bonuses){
        let actions = {}

        let abilityOptions = [...this.base.abilities]
        // console.log(this.base.abilities)
        abilityOptions = abilityOptions.map(el => el.addBonusToAbility(bonuses.actionBonuses))
        actions.move = this.base.move
        actions.mainHand = this.makeWeaponAbilities(this.base.equipmentSlots.find(el => el.name == 'mainHand').item).map(el=> el.addBonusToAbility(bonuses.actionBonuses))
        actions.offHand = this.makeWeaponAbilities(this.base.equipmentSlots.find(el => el.name == 'offHand').item).map(el=> el.addBonusToAbility(bonuses.actionBonuses))
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

    makeWeaponAbilities (weapon){

        const addAbilityBonusToWeaponDamage = (ability, weapon) => {
            let newDamage = ability.damageBonus.reduce((acc, el)=>{
                acc.damage = el.type == acc.type ? acc.damage + el.bonus : acc.damage
                return acc
            }, Object.assign({},weapon.damage.primary))
            return new Damage(newDamage)
        }

        const calcAbilityRange = (ability, weapon) => {
            let rangeTag
            if(!ability.tags.find(el => el.constructor.name == 'Range')){
                if(weapon.types.find(el => el =='melee')){
                    rangeTag = new Range({range:weapon.range, type:'melee'})
                }
                if(weapon.types.find(el => el =='ranged')){
                    rangeTag = new Range({range:weapon.range, type:'ranged'})
                }
            }
            return rangeTag
        }

        let weaponAbilities = weapon.constructor.name == 'Weapon' ? [] : [fists]
        if(weaponAbilities.length == 0){
            this.base.weaponAbilities.forEach((item, i) => {
                if(item.type == 'weaponAbility'){
                    if(!item.requirement || weapon.types.find(el => el == item.requirement)){
                        let newAbility = Object.assign({},item)

                        let newAtkBonus = weapon.bonus + item.attackBonus

                        let newDamage = []

                        newDamage.push(addAbilityBonusToWeaponDamage(item, weapon))
                        weapon.damage.extra.forEach(el => newDamage.push(el))


                        let rangeTag = calcAbilityRange(item, weapon)


                        newAbility.name = item.name
                        newAbility.cost = item.cost
                        newAbility.weapon = weapon
                        newAbility.tags = [
                            ...weapon.effects,
                            ...item.tags,
                        ]

                        rangeTag ? newAbility.tags.push(rangeTag) : null

                        let tagCount = 1
                        newAbility.tags = newAbility.tags.map((tag) =>{
                            let newTag = new newAbility.tags[0].constructor(newAbility.tags[0])
                            newTag['tagId'] = tagCount
                            tagCount +=1
                            return newTag
                        })

                        let atk = new Attack({
                            bonus: newAtkBonus,
                            refs: [],
                        })

                        newDamage.forEach(dmg => {
                            atk.refs.push(tagCount)
                            let newTag = new Damage(dmg)
                            newTag.tagId = tagCount
                            newAbility.tags.push(newTag)
                            tagCount +=1
                        })
                        atk.tagId = tagCount
                        newAbility.tags.push(atk)

                        weaponAbilities.push(new Ability(newAbility))
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
        let bonuses = {actionBonuses:{Damage:[], Attack:[], DC:[], Range:[], Area:[]}, resourceBonuses:[], defenseBonuses:{dodge:[], defenses:[], defensePercentage:[]}, skillBonuses:[]}
        Object.values(this.effects).forEach(el=>{
            el.tags.forEach(buff => {
                if(buff.constructor.name == 'Buff'){
                    if(buff.buffType == 'resourceBonus'){
                        if(bonuses.resourceBonuses[buff.buffTag]){
                            bonuses.resourceBonuses[buff.buffTag] += buff.value * el.stacks.length
                        }else{
                            bonuses.resourceBonuses[buff.buffTag] = buff.value * el.stacks.length
                        }
                    }else if(buff.buffType == 'actionBonus'){
                        bonuses.actionBonuses[buff.buffTag] = [
                            ...bonuses.actionBonuses[buff.buffTag] ,
                            {bonus:buff.value*el.stacks.length, buffAttr:buff.buffAttr, conditions:buff.conditions, damageTypes:buff.damageTypes, weaponTypes:buff.weaponTypes, abilityTypes:buff.abilityTypes }
                        ]
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

export function getChar(name){
    return characters[name]
}


const fists = new Ability({
    tags:[
        new Attack({
            tagId:1,
            bonus: 0,
            tags:[3, 5],
        }),
        new Range({tagId:2, range:1, type:'melee'}),
        new DC({
            tagId:3,
            value: 10,
            refs:[7]
        }),
        new Effect({
            refs:[6 ], id:7,
            name:'bleed', timeoutType:'turn', timeout: 3,
        }),
        new DoT({tagId:6, refs:[4] , stackable: true, maxStacks:3}),
        new Damage({tagId:4, type:'pure', damage:2, bypassDef:'both'}),
        new Damage({tagId:5, type:'blunt', damage:5, bypassDef:'none'}),
    ],
    name:'punch',
    cost:[{resource:'actions', cost:1}]
})

const atk = new Ability({
    tags:[],
    type:'weaponAbility',
    abilityClass:['weapon'],
    attackBonus:0,
    damageBonus:[{type:'slashing', bonus:1}],
    requirements:['mainHand'],
    name:'attack',
    cost:[{resource:'actions', cost:1}],
})


const fireball = new Ability({
    name:'fireball',
    abilityClass:['spell', 'fire', 'ranged'],
    tags:[
        new DC({
            tagId:1,
            value:10,
            type:'agility',
            damage:[],
            refs:[3]
        }),
        new Damage({
            tagId:3,
            type:'fire',
            damage:25,
            bypassDef:'none'
        }),
        new Area({
            tagId:2,
            radius: 3,
            shape: 'circle'
        }),
        new Range({
            tagId:4,
            range:6,
            blockable:true,
            type:'ranged',
        })
    ],
    cost:[{resource:'actions', cost:1}, /*{resource:'spellslot1', cost:1}*/]
})

const unholyRage = new Ability({
    name: 'unholyRage',
    abilityClass:['ability', 'self'],
    cost:[{resource:'actions', cost:1}],
    tags:[
        new Effect({
            tagId:1,
            name:'unholyRage', timeoutType:'turn', timeout: 3, maxStacks:2,
            refs:[3,4,5],
        }),
        new Buff({tagId:3 ,buffType: 'actionBonus', buffTag: 'Damage', buffAttr: 'damage', value:5, weaponTypes:['melee'], damageTypes:['slashing', 'blunt', 'piercing']}),
        new Buff({tagId:4 ,buffType: 'actionBonus', buffTag: 'Attack', buffAttr:'bonus', value:5, weaponTypes:['melee'], }),
        new Buff({tagId:5 ,buffType: 'resourceBonus', buffTag: 'hp', value:20}),
        new Self({tagId:2})
    ]
})

const empowerFire = new Ability({
    name: 'empowerFire',
    abilityClass:['spell', 'fire', 'self'],
    cost:[{resource:'actions', cost:1}],
    tags:[
        new Effect({
            tagId:1, name:'empowerFire', timeoutType:'turn',
            timeout: 3, maxStacks:1,  refs:[3,4,5],
        }),
        new Buff({tagId:5 ,buffType: 'actionBonus', buffTag: 'Damage', buffAttr: 'damage', value:5, damageTypes:['fire']}),
        new Buff({tagId:3 ,buffType: 'actionBonus', buffTag: 'DC', buffAttr: 'value', value:5}),
        new Buff({tagId:4 ,buffType: 'actionBonus', buffTag: 'Range', buffAttr: 'range', value:1, conditions:['ranged'] }),
        new Self({tagId:2}),
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
    damage:{primary: new Damage({type:'slashing', damage:15, bypassDef:'none'}), extra:[new Damage({type:'fire', damage:3, bypassDef:'none'})]},
    slots:['mainHand', 'offHand'],
})

const wand = new Weapon({
    name:'wand',
    types:['ranged'],
    range:5,
    bonus:4,
    weight:2,
    damage:{primary: new Damage({type:'ice', damage:10, bypassDef:'none'}), extra:[]},
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
            fireball,
            empowerFire,
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
