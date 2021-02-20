import React, {useState, useEffect} from 'react'
import {roll} from './Actions/ActionUtils'
import TurnMenu from './TurnMenu'

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
                let initiative = char.baseStats.initiativeBonus + roll(20 )
                actions[0].action[char.name] = {...char, initiative:initiative, baseInitiative:initiative,  myTurn:false, speed:100 }
            })
            return actions
    }

    const passTurn = () => {
        let actions
        if(turn == 0){
            setTurn(turn + 1)
            actions = rollInitiative()
        }else{
            if(isTurnOver()){
                setTurn(turn + 1)
                actions = [{type:'character', action:{}} ]
                Object.values(characters).forEach((char)=>{
                    actions[0].action[char.name] = {...char, initiative:char.baseInitiative, resources:{...char.resources, speed:100} }
                })
            }
        }
        setAction(actions)
    }

    // const applyTimeout(char){
    //     let actions = [{type:'character', action:{}} ]
    //     actions[0].action[char.name] = {...char, initiative:char.baseInitiative, speed:100 }
    // }

    const endCombat = () => {
        setTurn(0)
        let actions = [{type:'character', action:{}} ]
        Object.values(characters).forEach((char)=>{
            actions[0].action[char.name] = {...char, initiative:-1, baseInitiative:-1, myTurn:false, resources:{...char.resources, speed:100} }
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
            let updatedChar = {...characters[currentCharacter], initiative:0, myTurn:false, }
            let action = [{type: 'character', action:{ [currentCharacter]: updatedChar} }]
            setAction(action)
        }
    }

    const startTurn = () => {
        if(canYouStartTurn()){
            setIsYourTurn(true)
            let updatedChar = {...characters[currentCharacter], myTurn:true, }
            let action = [{type: 'character', action:{ [currentCharacter]: updatedChar} }]
            setAction(action)
        }else{
            console.log('it s not your turn')
        }
    }

    return (
        <>
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
        </>
    )

}
