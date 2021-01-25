import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import StatSystemMenu from './StatSystemMenu'
import StatSystemDisplay from './StatSystemDisplay'

export default function StatSystemCreator(){
    const [sysList, setSysList] = useState([])
    const [selectedSys, setSelectedSys] = useState('')

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


    const saveSystem = (e) => {
        e.preventDefault()
        axios.post('CreateSystem/save', {sys: system}).then((response)=>{
            listSystems()
        })
    }

    const loadSystem = () => {
        let currentSys = sysList.find(el => el.name == selectedSys)

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

    const deleteSystem = (e) => {
        axios.post('/CreateSystem/delete',{name: selectedSys}).then(response => {
            listSystems()
        })
    }

    const listSystems = () => {
        axios.get('/CreateSystem/load').then((response) =>{
            setSysList(response.data)
        })
    }


    return(
        <div>
            <div>
                <StatSystemDisplay setSystem={setSystem} system={system} />
            </div>
            <div>

                <StatSystemMenu
                    saveSystem={saveSystem}
                    onSysOptionClick={(e)=>setSelectedSys(e.target.id)}
                    loadSystem={loadSystem}
                    sysList={sysList}
                    selectedSys={selectedSys}
                    deleteSystem={deleteSystem}
                />
            </div>
        </div>

    )
}
