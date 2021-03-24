import {Damage, Attack, DC, Range, Area, Summon, Self, Displace, ApplyEffect, Terrain, Illusion, Inventory} from './Abilities/Tags'

export class Action {
    constructor({type, name}){
        this.type = type
        this.name = name
    }
}

export class Ability extends Action{
    constructor({tags, name, cost, type='ability', abilityClass=[], requirement=null, damageBonus=0, attackBonus=0}){
        super({name, type})
        this.tags = tags
        this.abilityClass = abilityClass
        this.cost = cost
        this.requirement = requirement
        this.damageBonus = damageBonus
        this.attackBonus = attackBonus
    }

    buildTags(){
        const getTag = (id) => {
            return this.tags.find(el => el.tagId == id)
        }

        const isTagMorphed = (tag) => {
            return tag.refs.length == tag.tags.length
        }

        const morphRefs = (tag) => {
            let tags = tag.refs.map(ref=>{
                let x = getTag(ref)
                return isTagMorphed(x) ? x : null
            })
            tags = tags.filter(el => el != null)
            let resp = tag.constructor(tag)
            resp.tags = tags
            return resp
        }

        const areAllMorphed = (all) => {
            return all.reduce((acc, el) => {
                return isTagMorphed(el) && acc
            }, true)
        }

        const clearDuplicates = (all) => {
            let refs = []
            all.forEach(tag => {
                refs = [...refs, ...tag.refs]
            })
            let resp = all.map(tag => refs.find(el => tag.tagId == el) ? null : tag)
            return resp.filter(el => el != null)
        }

        let builtTags = [...this.tags]
        while( !areAllMorphed(builtTags)){
            builtTags = builtTags.map(tag => {
                return morphRefs(tag)
            })
        }
        builtTags = clearDuplicates(builtTags)

        return builtTags
    }

    addBonusToAbility(bonuses){

        const checkIfBonusApplies = (bonus, tag, weaponType)=>{
            const abilityClass = this.abilityClass // NOT A PURE FUNCTION
            return(
                (weaponType == null || bonus.weaponTypes.find(weapType => weapType == weaponType) )
                &&(tag.constructor.name == 'Damage' ? (bonus.damageTypes.find(el=> el == tag.type) ? true : false) : true )
                && (bonus.conditions.length == null || bonus.conditions.find(cond => abilityClass.find(item => item == cond) ? false : true) ? false : true)
            )
        }

        const addBonusToAbility = (newAbility,  weaponType=null) =>{
            let ability = Object.assign({}, newAbility)
            ability.tags = ability.tags.map(tag => {
                let bonusTags = Object.entries(bonuses).find((el) =>  el[0] == tag.constructor.name ? true : false)
                bonusTags = bonusTags ? bonusTags[1] : []

                const newTag = new tag.constructor(tag)
                Object.entries(tag).forEach(el=>{
                    let newAttr = bonusTags.reduce((acc, bonus) => {
                        if( checkIfBonusApplies(bonus, tag, weaponType, newAbility.type) ){
                            return bonus.buffAttr == el[0] ? acc + bonus.bonus : acc
                        }
                        return acc
                    }, el[1])
                    newTag[el[0]] = newAttr
                })
                return newTag
            })
            return new Ability(ability)
        }

        let newAbility = Object.assign({}, this)

        newAbility = addBonusToAbility(newAbility)
        //TODO make bonuses for non numeric values
        return new Ability(newAbility)
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
