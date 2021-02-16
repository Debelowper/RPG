import React from 'react'
import ReactDOM from 'react-dom'

export default function CharacterPanel({character}){
    const renderRangeInput = (label, resource, resourceMax) => {
        return(
            <div>
                <label>{label} </label>
                <input type='range' value={resource} min={0} max={resourceMax} ></input>
                <output>{resource}</output>
            </div>
        )
    }

    if(character){
        return(
            <div className="flex flex-col">

                {renderRangeInput('hp', character.hp, character.baseStats.hp)}
                <label> mana </label>
                <input type='range'  />

            </div>
        )
    }else{
        return <div className="flex flex-col"></div>
    }
}
