import React from 'react'
import ReactDOM from 'react-dom'
import GameLayout from './GameLayout'
import Map from './Map'

export default function Game () {

    return(
        <GameLayout
            content={
                <div>
                    <Map />
                </div>
            }
        />
    )
}
