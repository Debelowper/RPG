import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import StatSystemMenu from './StatSystemMenu'

class Stat {
    constructor(id, type, name, value){
        this.id=id
        this.type = type
        this.name=name ? name : ''
        this.value=value ? value : 0
    }
}

export default class StatSystemCreator extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            nStats:0,
            stats:[],
            nResources:0,
            resources:[],
            nSkills:0,
            skills:[],
            nSavingThrows:0,
            savingThrows:[],
            nDamageTypes:0,
            damageTypes:[],
            nStatusEffects:0,
            statusEffects:[],

            sysList:[],
            selectedSys:"",
        }


    }

    componentDidMount(){
        this.listSystems()
    }

    handleNFieldsChange = (e, nFields) => {
        let max = nFields == 'nSkills' ? 20 : 20
        let value = e.target.value < 0 ? 0 : e.target.value
        value = value > max ? max : value
        this.setState({[nFields]: value})
    }

    applyNFieldsChange = (e, nFields, type) => {
        nFields = this.state[nFields]
        let stats = this.state[type]
        let maxFields = 20

        for(var i = 0;i < maxFields; i++){
            if(!stats[i] && i< nFields){
                stats.push(new Stat(i, type))
            }else if(i >= nFields){
                stats.splice(i, 10)
            }
        }

        this.setState({[type]:stats})
    }

    handleInputChange = (e, type, id) => {
        let stats = this.state[type]
        stats[id].name=e.target.value
        this.setState({[type]:stats })
    }

    addStatField = (stat) => {
        let name = stat.name

        return(
            <div key={stat.id}>
                <label >Stat {stat.id} Name: </label>
                <input  className='input' type="text"
                    value={name}
                    onChange={(e) => this.handleInputChange(e, stat.type, stat.id)}
                />
            </div>
        )
    }

    renderFormCard(fieldName, numName, statName){
        return(
            <div className='flex flex-col space-y-2 border-2 border-red-500 rounded bg-gray-500 py-3 mx-2'>
                <div>
                    <h2 className="text-2xl font-bold" >{fieldName} Fields</h2>
                    <label>Number of {fieldName} Fields</label>
                    <input  className="input" type="number" onChange={(e) => this.handleNFieldsChange(e, numName)} value={this.state[numName]} />
                    <button  className="btn-primary" onClick={(e) => this.applyNFieldsChange(e, numName, statName)}>Apply</button>
                </div>
                <form  className="flex flex-col items-center space-y-2" method='POST' onSubmit={(e) => this.saveSystem(e, statName)} encType="multipart/form-data">
                    {
                        this.state[statName].map(this.addStatField)
                    }
                    <input type="submit" className="input" value="Save" />
                </form>
            </div>
        )
    }

    saveSystem = (e, statName) => {
        e.preventDefault()
        let form = this.state[statName]

        axios.post('CreateSystem/save', {form: form, sysName: this.state.name}).then((response)=>{
            console.log(response)
            this.listSystems()
        })
    }

    handleChangeName = (e) => {
        let name = e.target.value
        this.setState({name: name})
    }

    listSystems = () => {
        axios.get('/CreateSystem/load').then((response)=>{
            this.setState({sysList: response.data})
        })
    }

    onSysOptionClick = (e) => {
        this.setState({selectedSys: e.target.id})
    }

    loadSystem = () => {
        let system = this.state.sysList.find(el => el.name == this.state.selectedSys)

        let stats = JSON.parse(system.stats)
        let skills = JSON.parse(system.skills)
        let savingThrows = JSON.parse(system.saving_throws)
        let damageTypes = JSON.parse(system.damage_types)
        let statusEffects = JSON.parse(system.status_effects)
        let resources = JSON.parse(system.resources)

        this.setState({
            name:system.name,
            stats:stats ? stats : [], nStats: stats ? stats.length : 0,
            skills: skills ? skills : [], nSkills: skills ? skills.length : 0,
            resources:resources ? resources : [], nResources: resources ? resources.length : 0,
            savingThrows: savingThrows ? savingThrows : [], nSavingThrows: savingThrows ? savingThrows.length : 0,
            damageTypes:damageTypes ? damageTypes : [], nDamageTypes: damageTypes ? damageTypes.length : 0,
            statusEffects:statusEffects ? statusEffects : [], nStatusEffects: statusEffects ? statusEffects.length : 0,
        })
    }

    deleteSystem = (e) => {
        axios.post('/CreateSystem/delete',{name: this.state.selectedSys}).then(response => {
            console.log(response)
            this.listSystems()
        })
    }


    render(){
        return(
            <div>
                <h1 className="text-3xl font-bold col-span-full">System Creator </h1>
                <input className="text-3xl input" type="text" value={this.state.name} onChange={this.handleChangeName}/>
                <div className="grid grid-cols-2 w-screen h-full">

                    {this.renderFormCard('Stat', 'nStats', 'stats')}

                    {this.renderFormCard('Resources', 'nResources', 'resources')}

                    {this.renderFormCard('Skill', 'nSkills', 'skills')}

                    {this.renderFormCard('Saving Throw', 'nSavingThrows', 'savingThrows')}

                    {this.renderFormCard('Damage Type', 'nDamageTypes', 'damageTypes')}

                    {this.renderFormCard('Status Effects', 'nStatusEffects', 'statusEffects')}

                </div>

                <StatSystemMenu
                    onSysOptionClick={this.onSysOptionClick}
                    loadSystem={this.loadSystem}
                    sysList={this.state.sysList}
                    selectedSys={this.props.selectedSys}
                    deleteSystem={this.deleteSystem}
                />
            </div>

        )
    }
}
