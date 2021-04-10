import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {spawn, isSpawned} from './Actions/Spawn'
import Character from './Character'

export default function PlayerCharacterMenu({currentCharacter, setCurrentCharacter, setSelectedCharacter, characterList, isYourTurn}){

    const damageTypes = ['piercing', 'slashing', 'blunt', 'fire', 'ice', 'radiant', 'dark', 'thunder']

    const [chars, setChars] = useState()

    const charIDs = [ 0, 1]

    useEffect(()=>{
        setChars(charIDs.map(el => new Character(el)) )
    }, [])

    const myCharacters = Object.values(characterList).filter(char => {
        return char.player == 'DM' ? true : false
    })


    return(
        <div  className="sub-menu menu-h w-full" >
            {
                myCharacters.map((el)=>{
                    return(
                        <div  key={el.name} className="menu-v">
                            <p>{el.name}</p>
                            <img src={el.url} width={50} height={50} onClick={() =>  setSelectedCharacter(el.name)  } />
                            <button className={"btn-primary " + (currentCharacter == el.name ? 'bg-black' : '')}
                                onClick={() => isYourTurn ? console.log('finish your turn') : setCurrentCharacter(el.name) }
                            >
                                {currentCharacter == el.name ? 'locked In' : 'lock In'}
                            </button>

                        </div>
                    )
                })
            }
        </div>
    )

}
