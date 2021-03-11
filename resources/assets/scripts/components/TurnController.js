import React, {useState, useEffect} from 'react'
import {roll} from './Actions/ActionUtils'
import TurnMenu from './TurnMenu'
import { ShortcutConsumer } from 'react-keybind'

export default function TurnController ({setTurn, turn, isYourTurn, setIsYourTurn, characters, currentCharacter, setAction}){

    const isTurnOver = () => {
        let response = Object.values(characters).reduce((sum, el)=> {
            return el.myTurn ? 1 : sum + el.initiative
        }, 0)

        return response <= 0
    }

    const rollInitiative = () => {
            let actions = [{type:'character', action:{}} ]
            Object.values(characters).forEach((char)=>{
                let initiative = char.base.initiativeBonus + roll(20 )
                let newChar = char
                newChar.losses.speed = 0
                newChar.initiative = initiative
                newChar.baseInitiative = initiative
                newChar.myTurn = false

                actions[0].action[char.name] = newChar
            })
            return actions
    }

    const passTurn = () => {
        let actions = []
        if(turn == 0){
            setTurn(turn + 1)
            actions = rollInitiative()
        }else{
            if(isTurnOver()){
                setTurn(turn + 1)
                actions = [{type:'character', action:{}} ]
                Object.values(characters).forEach((char)=>{
                    let newChar = char
                    let updates = newChar.passTurn()
                    newChar.effects = updates.effects
                    newChar.losses = updates.losses
                    newChar.initiative = updates.initiative

                    actions[0].action[char.name] = newChar

                })
            }
        }
        setAction(actions)
    }

    const endCombat = () => {
        setTurn(0)
        let actions = [{type:'character', action:{}} ]
        Object.values(characters).forEach((char)=>{
            let updatedChar = char
            updatedChar.initiative = -1
            updatedChar.baseInitiative = -1
            updatedChar.myTurn = false
            updatedChar.losses = {...updatedChar.losses, speed:0}
            actions[0].action[char.name] = updatedChar
        })
        setAction(actions)
    }



    const isInCombat = () => {
        if(characters[currentCharacter]){
            return characters[currentCharacter].baseInitiative >= 0 ? true : false
        }
    }

    const canYouStartTurn  = () => {
        let highestInitiative = Object.values(characters).reduce((highest, el)=>{
            return highest > el.initiative ? highest : el.initiative
        }, 0)
        if( highestInitiative == characters[currentCharacter].initiative  && highestInitiative > 0){
            return true
        }
        return false
    }

    const endTurn = () => {
        if(isYourTurn){
            setIsYourTurn(false)
            let char = characters[currentCharacter]
            char.initiative = 0
            char.myTurn = false
            let action = [{type: 'character', action:{ [currentCharacter]: char} }]
            setAction(action)
        }
    }

    const startTurn = () => {
        if(canYouStartTurn()){
            setIsYourTurn(true)
            let char = characters[currentCharacter]
            char.myTurn = true
            let action = [{type: 'character', action:{ [currentCharacter]: char} }]
            setAction(action)
        }else{
            console.log('it s not your turn')
        }
    }

    return (
        <>
            <ShortcutConsumer>
                {()=>(
                    <TurnMenu
                        turn={turn}
                        isYourTurn={isYourTurn}
                        setAction={setAction}
                        endTurn={endTurn}
                        startTurn={startTurn}
                        canYouStartTurn={canYouStartTurn}
                        isInCombat={isInCombat}
                        passTurn={passTurn}
                        endCombat={endCombat}
                    />
                )}
            </ShortcutConsumer>
        </>
    )

}
