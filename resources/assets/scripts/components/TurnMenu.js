import React, {useState, useEffect} from 'react'
import {roll} from './Actions/ActionUtils'

export default function TurnMenu ({setTurn, turn, isYourTurn, setIsYourTurn, characters, currentCharacter, setAction}){

    const isTurnOver = () => {
        let response = Object.values(characters).reduce((sum, el)=> {
            return el.myTurn ? 1 : sum + el.initiative
        }, 0)

        return response <= 0
    }

    const rollInitiative = () => {
        if(isTurnOver()){
            setTurn(turn + 1)
            let actions = [{type:'character', action:{}} ]
            Object.values(characters).forEach((char)=>{
                let initiative = char.baseStats.initiativeBonus + roll(20 )
                actions[0].action[char.name] = {...char, initiative:initiative, myTurn:false, speed:100 }
            })
            setAction(actions)
        }
    }

    const endCombat = () => {
        setTurn(0)
        let actions = [{type:'character', action:{}} ]
        Object.values(characters).forEach((char)=>{
            actions[0].action[char.name] = {...char, initiative:-1, myTurn:false, speed:100 }
        })
        setAction(actions)
    }

    const renderTurnMenu = () => {
        return(
            <div>
                <h1>Turn Counter</h1>
                <div className="flex flex-row">
                    <button className="btn-primary" onClick={rollInitiative}>
                        {turn == 0 ? 'Roll Initiative' : 'Next Turn'}
                    </button>
                    <button className="btn-primary" onClick={endCombat}>
                        Stop
                    </button>
                </div>
            </div>
        )
    }

    const renderCharacterTurnMenu = () => {
        return(
            isInCombat() ?
            <div className="flex flex-row">
                <button className="btn-primary" onClick={() => isYourTurn ? endTurn() : startTurn()} >
                    {isYourTurn == false ? (canYouStartTurn() ? 'Start Turn' : 'Others Turn') : 'End Turn'}
                </button>
            </div>
            : ''
        )
    }

    const isInCombat = () => {
        if(characters[currentCharacter]){
            return characters[currentCharacter].initiative >= 0 ? true : false
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
            let updatedChar = {...characters[currentCharacter], myTurn:false, }
            let action = [{type: 'character', action:{ [currentCharacter]: updatedChar} }]
            setAction(action)
        }
    }

    const startTurn = () => {
        if(canYouStartTurn()){
            setIsYourTurn(true)
            let updatedChar = {...characters[currentCharacter], initiative:0, myTurn:true, }
            let action = [{type: 'character', action:{ [currentCharacter]: updatedChar} }]
            setAction(action)
        }else{
            console.log('it s not your turn')
        }
    }

    return (
        <>
            {renderCharacterTurnMenu()}
            {renderTurnMenu()}
        </>
    )

}
