import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {spawn, isSpawned} from './Actions/Spawn'
import Character from './Character'

export default function CharacterMenu({currentCharacter, setCurrentCharacter, setSelectedCharacter, characterList, isYourTurn, setAction, setActionFunction}){

    const damageTypes = ['piercing', 'slashing', 'blunt', 'fire', 'ice', 'radiant', 'dark', 'thunder']

    const [chars, setChars] = useState()

    const charIDs = [ 0, 1]

    useEffect(()=>{
        setChars(charIDs.map(el => new Character(el)) )
    }, [])


    return(
        <div  className="sub-menu menu-h w-full" >
            {
                characters.map((el)=>{
                    return(
                        <div  key={el.name} className="menu-v">
                            <p>{el.name}</p>
                            <img src={el.url} width={50} height={50} onClick={() =>  setSelectedCharacter(el.name)  } />
                            <button className={"btn-primary " + (currentCharacter == el.name ? 'bg-black' : '')}
                                onClick={() => isYourTurn ? console.log('finish your turn') : setCurrentCharacter(el.name) }
                            >
                                {currentCharacter == el.name ? 'locked In' : 'lock In'}
                            </button>
                            {isSpawned(characterList, el.name) ? '' :
                            <button
                                className="btn-primary"
                                onClick={() =>
                                    setActionFunction(() =>
                                        spawn(
                                            {
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
            }
        </div>
    )

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
