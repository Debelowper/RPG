import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Stat from './Stat'

export default function StatSystemDisplay({system, setSystem}){

    const [nFields, setNFields] = useState(
        {
            nStats:0,
            nResources:0,
            nSkills:0,
            nSavingThrows:0,
            nDamageTypes:0,
            nStatusEffects:0,
        }
    )

    const handleNFieldsChange = (e, numName) => {
        let max = numName == 'nSkills' ? 40 : 40
        let value = e.target.value < 0 ? 0 : e.target.value
        value = value > max ? max : value
        setNFields({...nFields, [numName]: value})
    }

    const applyNFieldsChange = (e, numName, type) => {
        let number = nFields[numName]
        let stats = system[type]
        let maxFields = 40

        for(var i = 0;i < maxFields; i++){
            if(!stats[i] && i< number){
                stats.push(new Stat(i, type))
            }else if(i >= number){
                stats.splice(i, 10)
            }
        }

        setSystem({...system, [type]:stats})
    }

    const handleInputChange = (e, type, id) => {
        let stats = system[type]
        stats[id].name=e.target.value
        setSystem({...system, [type]:stats })
    }

    const addStatField = (stat) => {
        let name = stat.name

        return(
            <div key={stat.id}>
                <label >Stat {stat.id} Name: </label>
                <input  className='input' type="text"
                    value={name}
                    onChange={(e) => handleInputChange(e, stat.type, stat.id)}
                />
            </div>
        )
    }

    const renderFormCard = (fieldName, numName, statName) => {
        return(
            <div className='flex flex-col space-y-2 border-2 border-black rounded bg-gray-900 bg-opacity-30 py-3 mx-2'>
                <div >
                    <h2 className="text-2xl font-bold" >{fieldName} Fields</h2>
                    <label>Number of {fieldName} Fields</label>
                    <input  className="input" type="number" onChange={(e) => handleNFieldsChange(e, numName)} value={nFields[numName]} />
                    <button  className="btn-primary" onClick={(e) => applyNFieldsChange(e, numName, statName)}>Apply</button>
                </div>
                <form  className="flex flex-col items-center space-y-2"
                    method='POST' encType="multipart/form-data"
                >
                    {
                        system[statName].map(addStatField)
                    }
                </form>
            </div>
        )
    }

    return(
        <div className="text-white" >
            <h1 className="text-3xl  font-bold col-span-full">System Creator </h1>
            <div className="grid grid-cols-2 w-full h-full">
                {renderFormCard('Stat', 'nStats', 'stats')}
                {renderFormCard('Resources', 'nResources', 'resources')}
                {renderFormCard('Skill', 'nSkills', 'skills')}
                {renderFormCard('Saving Throw', 'nSavingThrows', 'savingThrows')}
                {renderFormCard('Damage Type', 'nDamageTypes', 'damageTypes')}
                {renderFormCard('Status Effects', 'nStatusEffects', 'statusEffects')}
            </div>
        </div>
    )
}
