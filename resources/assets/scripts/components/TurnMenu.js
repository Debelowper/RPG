import React from 'react'

export default function TurnMenu ({turn, isYourTurn, endTurn, startTurn, canYouStartTurn, isInCombat, passTurn, endCombat}){

    const renderTurnMenu = () => {
        return(
            <div>
                <h1>Turn Counter</h1>
                <div className="flex flex-row">
                    <button className="btn-primary" onClick={passTurn}>
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

    return (
        <>
            {renderCharacterTurnMenu()}
            {renderTurnMenu()}
        </>
    )

}
