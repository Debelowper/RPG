import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {spawn, isSpawned, isAllowedToSpawn} from './Actions/Spawn'
import Character from './Character'
import PlayerCharacterMenu from './PlayerCharacterMenu'

import {Action, Ability, Move} from './Actions/Action'
import {Attack, Damage, Range, DC, Area, Self} from './Actions/Abilities/Tags'
import {Effect, DoT, Buff} from './Actions/Abilities/Effects'
import {Weapon, Armor, Trinket} from './Inventory/Equipment'
import {Bag, Stash} from './Inventory/Inventory'

export default function CharacterMenu({currentCharacter, setCurrentCharacter, setSelectedCharacter, characterList, isYourTurn, setAction, setActionFunction, characterLimits}){

    const damageTypes = ['piercing', 'slashing', 'blunt', 'fire', 'ice', 'radiant', 'dark', 'thunder']

    const [chars, setChars] = useState()
    const [mode, setMode] = useState('spawn')

    const charIDs = [ 0, 1]

    useEffect(()=>{
        setChars(charIDs.map(el => new Character(el)) )
    }, [])

    return(
        <div  className="sub-menu menu-h w-full" >
            <button className='btn-primary' onClick={e => mode == 'spawn' ? setMode('play') : setMode('spawn')}>Switch</button>
            {
                mode == 'spawn' ?
                    Object.values(characters).map((el)=>{
                        return(
                            <div  key={el.name} className="menu-v">
                                <p>{el.name}</p>
                                <img src={el.url} width={50} height={50} onClick={() =>  setSelectedCharacter(el.name)  } />
                                <button className={"btn-primary " + (currentCharacter == el.name ? 'bg-black' : '')}
                                    onClick={() => isYourTurn ? console.log('finish your turn') : setCurrentCharacter(el.name) }
                                >
                                    {currentCharacter == el.name ? 'locked In' : 'lock In'}
                                </button>
                                {!isAllowedToSpawn(characterList, el.name, characterLimits) ? '' :
                                <button
                                    className="btn-primary"
                                    onClick={() =>
                                        setActionFunction(() =>
                                            spawn(
                                                {
                                                        characterLimits: characterLimits,
                                                        characters: characters,
                                                        spawnedChars:characterList ,
                                                        currentCharacter: currentCharacter,
                                                        setAction: setAction
                                                }
                                            )
                                        )
                                    }
                                >
                                    spawn
                                </button>
                                }
                            </div>
                        )
                    })
                :
                <PlayerCharacterMenu
                    currentCharacter={currentCharacter}
                    setCurrentCharacter={setCurrentCharacter}
                    setSelectedCharacter={setSelectedCharacter}
                    characterList={characterList}
                    isYourTurn={isYourTurn}
                    setAction={setAction}
                    setActionFunction={setActionFunction}
                />
            }
        </div>
    )
}

const fists = new Ability({
    tags:[
        new Attack({
            tagId:1,
            bonus: 0,
            refs:[3, 5],
        }),
        new Range({tagId:2, range:1, type:'melee'}),
        new DC({
            tagId:3,
            value: 10,
            refs:[7]
        }),
        new Effect({
            tagId:7, refs:[6 ], id:7,
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

const leatherJacket = new Armor({
    name:'leatherJacket',
    types:['medium'],
    weight:5,
    buffs:[
        new Buff({tagId:0 ,buffType: 'defenseBonus', buffTag: 'defensePercentage', buffAttr: 'thunder', value:20,}),
        new Buff({tagId:0 ,buffType: 'defenseBonus', buffTag: 'defenses', buffAttr: 'thunder', value:1,}),
    ],
    defenses:{
        slashing:3,
        blunt:1,
        piercing:3,
    },
    defensesPercentage:{
        fire:10,
        ice:10,
    }
})

const leatherGloves = new Armor({
    name:'leatherGloves',
    types:['medium'],
    weight:1,
    dodge:1,
    buffs:[
        new Buff({tagId:0 ,buffType: 'defenseBonus', buffTag: 'defensePercentage', buffAttr: 'thunder', value:20,}),
        new Buff({tagId:0 ,buffType: 'defenseBonus', buffTag: 'defenses', buffAttr: 'thunder', value:1,}),
    ],
    defenses:{
        slashing:1,
    },
    defensesPercentage:{}
})

const elfSorcererBag= new Bag({
    owner:'elfSorcerer',
    maxItems:24,
    items:[wand],
})

const fireAmulet = new Trinket({
    name:'fireAmulet',
    weight:0.5,
    buffs:[
        new Buff({tagId:0 ,buffType: 'actionBonus', buffTag: 'Damage', buffAttr: 'damage', value:3, damageTypes:['fire']}),
    ],
})



const characters = {
    elfSorcerer: {
        name:'elfSorcerer',
        stats:{},
        resources:{hp:50,actions:10, speed:100, carryWeight:100 },
        defenses:{piercing:0, slashing:2, blunt:0, fire:5, ice:5, radiant:0, dark:0, thunder:5, pure:0},
        defensesPercentage:{piercing:0, slashing:0, blunt:0, fire:0, ice:0, radiant:0, dark:0, thunder:0, pure:0},
        bonuses:{actionBonuses:{Damage:[], Attack:[], DC:[], Range:[], Area:[]}, resourceBonuses:[], defenseBonuses:{dodge:[], defenses:[], defensePercentage:[]}, skillBonuses:[]},
        equipmentSlots:{
            mainHand:{name:'mainHand', type:'weapon', item:wand }, offHand:{name:'offHand', type:'weapon', item:{} },
            armor:{name:'armor', type:'armor', item:leatherJacket }, gloves:{name:'gloves', type:'armor', item:leatherGloves },
            amulet:{name:'amulet', type:'trinket', item:fireAmulet },bag:{name:'bag', type:'inventory', item:elfSorcererBag}
        },
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
        bonuses:{actionBonuses:{Damage:[], Attack:[], DC:[], Range:[], Area:[]}, resourceBonuses:[], defenseBonuses:{dodge:[], defenses:[], defensePercentage:[]}, skillBonuses:[]},
        equipmentSlots:{
            mainHand:{name:'mainHand', type:'weapon', item:sword }, offHand:{name:'offHand', type:'weapon', item:{} },
            armor:{name:'armor', type:'armor', item:{} }, gloves:{name:'gloves', type:'armor', item:{} },
            amulet:{name:'amulet', type:'trinket', item:{} },bag:{name:'bag', type:'inventory', item:{}}
        },
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
