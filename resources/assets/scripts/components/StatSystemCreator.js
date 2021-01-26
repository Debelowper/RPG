import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import StatSystemDisplay from './StatSystemDisplay'
import GameLayout from './GameLayout'
import ResourceMenu from './ResourceMenu'

export default function StatSystemCreator(){
    const [sysList, setSysList] = useState([])

    const [system, setSystem] = useState(
        {
            name: '',
            stats:[],
            resources:[],
            skills:[],
            savingThrows:[],
            damageTypes:[],
            statusEffects:[],
        }
    )

    useEffect(()=>{
        listSystems()
    }, [])


    const saveSystem = (selected) => {
        let sys = {...system, name:selected}
        console.log(sys)
        axios.post('CreateSystem/save', {sys: sys}).then((response)=>{
            listSystems()
        })
    }

    const loadSystem = (selected) => {
        let currentSys = sysList.find(el => el.name == selected)

        let parsedSys = {
            name: currentSys.name ? currentSys.name : [],
            stats: JSON.parse(currentSys.stats) ? JSON.parse(currentSys.stats) : [],
            skills: JSON.parse(currentSys.skills) ? JSON.parse(currentSys.skills) : [],
            savingThrows: JSON.parse(currentSys.saving_throws) ? JSON.parse(currentSys.saving_throws) : [],
            damageTypes: JSON.parse(currentSys.damage_types) ? JSON.parse(currentSys.damage_types) : [],
            statusEffects: JSON.parse(currentSys.status_effects) ? JSON.parse(currentSys.status_effects) : [],
            resources: JSON.parse(currentSys.resources) ? JSON.parse(currentSys.resources) : [],
        }

        setSystem(parsedSys)
    }

    const deleteSystem = (selected) => {
        axios.post('/CreateSystem/delete',{name: selected}).then(response => {
            listSystems()
        })
    }

    const listSystems = () => {
        axios.get('/CreateSystem/load').then((response) =>{
            setSysList(response.data)
        })
    }


    return(
        <GameLayout
            rightMenu={
                <ResourceMenu
                    saveResource={saveSystem}
                    loadResource={loadSystem}
                    resourceList={sysList}
                    deleteResource={deleteSystem}
                />
            }
            content={
                <StatSystemDisplay setSystem={setSystem} system={system} />
            }
        />
    )
}
