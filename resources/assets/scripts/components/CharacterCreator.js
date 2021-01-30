import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import CharacterMenu from './CharacterMenu'
import GameLayout from './GameLayout'
import ResourceMenu from './ResourceMenu'

export default function CharacterCreator (){

    const [fields, setFields] = useState({
        stats: [],
        resources: [],
        skills: [],
        savingThrows:[],
        damageTypes:[],
        statusEffects:[],
        name:'',
    })

    useEffect(()=>{
        getStatSystem()
    }, [])

    const getStatSystem = () => {
        axios.get('CreateSystem/load').then((response)=> {
            response = response.data[0]
            setFields({
                stats:response.stats ?  JSON.parse(response.stats) : [],
                resources:response.resources ?  JSON.parse(response.resources) : [],
                skills:response.skills ?  JSON.parse(response.skills) : [],
                savingThrows:response.saving_throws ? JSON.parse(response.saving_throws) : [],
                damageTypes:response.damageTypes ? JSON.parse(response.damageTypes) : [],
                statusEffects:response.statusEffects ? JSON.parse(response.statusEffects) : [],
            })
        })
    }

    const handleStatsChange = (e, field, key) =>{
        let stats = fields[field]
        stats[key].value = e.target.value

        setFields({...fields, [stats]: stats})
    }

    const renderFields = (field) => {
        return(
            <div className="sub-menu menu-v" >
                <h2 className="text-2xl font-bold">{field}</h2>
                {fields[field].map((el, key)=>{
                    return(
                        <div  key={el.id}>
                            <label>{el.name} :  </label>
                            <input
                                className="input mx-auto"
                                name={field} type='number'
                                value={fields[field][key].value ? fields[field][key].value : 0}
                                onChange={(e) => handleStatsChange(e, field, key)}
                            />

                        </div>
                    )
                })}
            </div>
        )
    }

    const saveCharacter = () => {

    }

    const loadCharacters = () => {

    }

    const deleteCharacter = () => {

    }

    return (
        <GameLayout
            backgroundURL={'/warrior-hall.jpg'}
            content={
                <div className="menu menu-v overflow-y-auto" >
                    <div className="sub-menu">
                        <h2 className="text-2xl font-bold ">Character Name</h2>
                        <input className="input text-2xl space-x-4" value={fields.name} onChange={(e) => setFields({...fields, name:e.target.value}) }/>
                    </div>
                    <div className="menu menu-h flex-wrap" >
                        <div className="sub-menu menu-v" >
                            <h2 className="text-2xl font-bold" >Character Stats</h2>
                            {fields.stats.map((el, key)=>{
                                return(
                                    <div  key={el.id}>
                                        <label>{el.name} :  </label>
                                        <input
                                            className="input mx-auto"
                                            type='number'
                                            value={fields.stats[key].value ? fields.stats[key].value : 0}
                                            onChange={(e) => handleStatsChange(e, 'stats' ,key)}
                                        />
                                    </div>
                                )
                            })}
                        </div>

                        {renderFields('resources')}

                        {renderFields('skills')}

                        {renderFields('savingThrows')}

                    </div>

                </div>
            }
            // rightMenu = {
            //     <ResourceMenu loadResource={loadCharacters} deleteResource={deleteCharacter} saveResource={saveCharacter} resourceList={} />
            // }

        />

    )
}
