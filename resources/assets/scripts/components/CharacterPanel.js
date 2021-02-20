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

                {renderRangeInput('hp', character.resources['hp'], character.baseStats.resources['hp'])}


            </div>
        )
    }else{
        return <div className="flex flex-col"></div>
    }
}
