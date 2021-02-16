import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {spawn, isSpawned} from './Actions/Spawn'

export default function CharacterMenu({currentCharacter, setCurrentCharacter, setSelectedCharacter, characterList, isYourTurn, setAction, setActionFunction}){

    const [characters, setCharacters] = useState(
        [
            {
                name:'elfSorcerer',
                hp:50,
                defense:3,
                dodge:10,
                actionsPerTurn:10,
                actions:{
                    move:{default: {walk:30} , options:{walk:30, fly:0, swim:10, climb:10} },
                    attack:{default: {wand:{damage:10, bonus:10, range:5, type:'ranged'}} , options:{wand:{damage:10, bonus:10, range:5, type:'ranged'} } },

                },
                url:'/sorcerer-elf.png',
                initiativeBonus:3,
            },
            {
                name:'draugr',
                hp:80,
                defense:6,
                dodge:0,
                actionsPerTurn:10,
                actions:{
                    move:{default: {walk:30} , options:{walk:30, fly:0, swim:10, climb:10} },
                    attack:{default: {sword:{damage:8, bonus: 2, range:1, type:'melee'}} , options:{sword:{damage:8, bonus: 2, range:1, type:'melee'} } }  ,
                },
                url:'/draugr.png',
                initiativeBonus:3,
            },
        ]
    )

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

async function loadStructures(){
    return await axios.get('Structure/load')

}
