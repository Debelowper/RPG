import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {spawn, isSpawned} from './Actions/Spawn'

export default function CharacterMenu({currentCharacter, setCurrentCharacter, setSelectedCharacter, charactersList, isYourTurn, setAction, setActionFunction}){

    const [characters, setCharacters] = useState(
        [
            {
                name:'elfSorcerer',
                url:'/sorcerer-elf.png',
                moveSpeeds:{walk:30, fly:0, swim:10, climb:10},
                initiativeBonus:3,
            },
            {
                name:'draugr',
                url:'/draugr.png',
                moveSpeeds:{walk:30, fly:0, swim:10, climb:10},
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
                            {isSpawned(charactersList, el.name) ? '' :
                            <button
                                className="btn-primary"
                                onClick={() =>
                                    setActionFunction(() =>
                                        spawn(
                                            {
                                                characters: characters,
                                                spawnedChars:charactersList ,
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
