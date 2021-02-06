import React from 'react'
import ReactDOM from 'react-dom'

export default function CharacterPanel(){


    return(
        <div className="flex flex-col">

            <label> health </label>
            <input type='range' />
            <label> mana </label>
            <input type='range'  />

        </div>
    )
}
