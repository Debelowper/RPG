import {Action, Ability, Move} from './Actions/Action'
import {Attack, Damage, Range, DC, Area, Self} from './Actions/Abilities/Tags'
import {Effect, DoT, Buff} from './Actions/Abilities/Effects'
import {Weapon, Armor, Trinket} from './Inventory/Equipment'


export default class Character{
    constructor({player, name, base, effects, losses, equipments, stats, resources, defenses, defensesPercentage, bonuses, dodge, actions, triggers, myTurn, initiative, baseInitiative, currentHex, url}){
        this.player = player
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
        response.defenses = this.calcDefenses(response.bonuses)
        response.dodge = this.calcDodge()
        response.defensesPercentage = this.calcDefensesPercentage(response.bonuses)

        response.actions = this.getActions(response.bonuses)
        // response.triggers = getTriggers()

        console.log(response)
        return response
    }

    getActions(bonuses){
        let actions = {}

        let abilityOptions = [...this.base.abilities]
        abilityOptions = abilityOptions.map(el => el.addBonusToAbility(bonuses.actionBonuses))
        actions.move = this.base.move

        const mainHandWeapon = Object.values(this.equipments).find(el => el.name == 'mainHand').item
        const offHandWeapon = Object.values(this.equipments).find(el => el.name == 'offHand').item
        actions.mainHand = Object.keys(mainHandWeapon).length > 0
            ? this.makeWeaponAbilities(Object.values(this.equipments).find(el => el.name == 'mainHand').item).map(el=> el.addBonusToAbility(bonuses.actionBonuses))
            : [this.base.mainHand]
        actions.offHand = Object.keys(offHandWeapon).length > 0
            ? this.makeWeaponAbilities(Object.values(this.equipments).find(el => el.name == 'offHand').item).map(el=> el.addBonusToAbility(bonuses.actionBonuses))
            : [this.base.offHand]

        actions.ability1=abilityOptions
        actions.ability2=abilityOptions
        actions.ability3=abilityOptions
        actions.ability4=abilityOptions
        actions.ability5=abilityOptions
        actions.ability6=abilityOptions
        actions.ability7=abilityOptions
        actions.ability8=abilityOptions

        actions.skill=[]
        console.log(actions.offHand)
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

        let weaponAbilities = []
        if(weapon.constructor.name == 'Weapon'){
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
        // bonuses = {actionBonuses:{Damage:[], Attack:[], DC:[], Range:[], Area:[]}, resourceBonuses:[], defenseBonuses:{dodge:[], defenses:[], defensePercentage:[]}, skillBonuses:[]}
        let bonuses = this.base.bonuses
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
                            ...bonuses.actionBonuses[buff.buffTag],
                            {bonus:buff.value*el.stacks.length, buffAttr:buff.buffAttr, conditions:buff.conditions, damageTypes:buff.damageTypes, weaponTypes:buff.weaponTypes, abilityTypes:buff.abilityTypes }
                        ]
                    }else if(buff.buffType == 'defenseBonus'){
                        bonuses.defenseBonuses[buff.buffTag] = [...bonuses.defenseBonuses[buff.buffTag], {[buff.buffAttr]:buff.value}]
                    }
                }
            })
        })
        return bonuses
    }

    calcDodge(){
        let dodge = this.base.dodge
        const armors = Object.values(this.equipments).filter(el => el.type == 'armor' ).map(el=> el.item).filter(el=> Object.keys(el).length > 0)
        armors.forEach(el => {
            dodge += el.dodge
        })

        return dodge
    }

    calcDefenses(bonuses){
        let defenses = {...this.base.defenses}
        const armors = Object.values(this.equipments).filter(el => el.type == 'armor' ).map(el=> el.item).filter(el=> Object.keys(el).length > 0)

        armors.forEach(el => {
            Object.entries(el.defenses).forEach(def => defenses[def[0]] += def[1])
        })

        bonuses.defenseBonuses.defenses.forEach(el => defenses[Object.keys(el)[0]] += Object.values(el)[0] )

        return defenses
    }

    calcDefensesPercentage(bonuses){
        let defensesPercentage = {...this.base.defensesPercentage}
        const armors = Object.values(this.equipments).filter(el => el.type == 'armor' ).map(el=> el.item).filter(el=> Object.keys(el).length > 0)

        armors.forEach(el => {
            Object.entries(el.defensesPercentage).forEach(def => defensesPercentage[def[0]] += def[1])
        })
        bonuses.defenseBonuses.defensePercentage.forEach(el => defensesPercentage[Object.keys(el)[0]] += Object.values(el)[0] )

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

    equip(equipment){

        const applyEquipmentBuffs = (equipment) => {

            let equipEffect = new Effect({
                name:'equipEffect',
                timeoutType:'permanent',
                timeout:0,
                tagId:9999,
            })

            if(Object.keys(equipment.item).length > 0){
                if(equipment.item.buffs){
                    equipment.item.buffs.forEach(buff=> equipEffect.tags.push(buff))
                }
            }
            return equipEffect
        }

        const name = equipment.name

        if(this.equipments[name] ){
            if(Object.keys(this.equipments[name].item).length > 0){
                console.log('you already have an equipped item');
                return
            }
        }

        const itemEffects = applyEquipmentBuffs(equipment)
        this.effects[name + '_buffs'] = itemEffects
        this.equipments[name] = equipment
        return this
    }

    unequip(equipment){

        const name = equipment.name
        delete this[name + '_buffs']
        this.equipments[name].item = {}
        return this
    }

    passTurn(){
        let resp = {}
        resp.effects = {}

        Object.entries(this.effects).forEach(effect=>{
            if(effect.timeoutType != 'permanent'){
                effect[1].timeout -= 1

                effect[1].tags.forEach(el => {
                    effect[1].stacks.forEach(stack=>{
                        el.doAction(this)
                    })
                })

                effect[1].stacks = effect[1].stacks.map(el=>{
                    return el-1
                })
                effect[1].stacks = effect[1].stacks.filter(el => el > 0)

                if(effect[1].timeout > 0){
                    resp.effects[effect[0]] = effect[1]
                }
            }

            resp.initiative = this.baseInitiative
            resp.losses = {...this.losses, speed:0}
        })

        return resp
    }

}
