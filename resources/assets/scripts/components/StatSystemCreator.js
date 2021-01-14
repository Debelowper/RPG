import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import StatSystemMenu from './StatSystemMenu'

class Stat {
    constructor(id, type, name, value){
        this.id=id
        this.type = type
        this.name=name ? name : ''
        this.value=value
    }
}

export default class StatSystemCreator extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            nStatFields:0,
            statFields:[],
            nResources:0,
            resources:[],
            nAbilities:0,
            abilities:[],
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

    handleNFieldsChange = (e) => {
        let max = e.target.id == 'nAbilities' ? 20 : 15
        let value = e.target.value < 0 ? 0 : e.target.value
        value = value > max ? max : value
        this.setState({[e.target.id]: value})
    }

    applyNFieldsChange = (e) => {
        let statFields = ''
        let nFields = ''
        let type = ''
        let maxFields = 10

        switch(e.target.id){
            case 'statFields':
                statFields = this.state.statFields
                nFields = this.state.nStatFields
                type = 'stat'
                break
            case 'resources':
                statFields = this.state.resources
                nFields = this.state.nResources
                type='resource'
                break
            case 'abilities':
                statFields = this.state.abilities
                nFields = this.state.nAbilities
                type='ability'
                maxFields = 20
                break
            case 'savingThrows':
                statFields = this.state.savingThrows
                nFields = this.state.nSavingThrows
                type='savingThrow'
                maxFields = 20
                break
            case 'damageTypes':
                statFields = this.state.damageTypes
                nFields = this.state.nDamageTypes
                type='damageType'
                break
            case 'statusEffects':
                statFields = this.state.statusEffects
                nFields = this.state.nStatusEffects
                type='statusEffect'
                break
        }

        for(var i = 0;i <= maxFields; i++){
            if(!statFields[i] && i< nFields){
                statFields.push(new Stat(i, type))
            }else if(i >= nFields){
                statFields.splice(i, 10)
            }
        }

        this.setState({[e.target.id]:statFields})
    }

    handleInputChange = (e) => {
        let statFields = []
        let group = ''

        switch(e.target.name){
            case 'stat'+'_'+e.target.name.split('_')[1]:
                statFields = this.state.statFields
                group = 'statFields'
                break
            case 'resource'+'_'+e.target.name.split('_')[1]:
                statFields = this.state.resources
                group = 'resources'
                break
            case 'ability'+'_'+e.target.name.split('_')[1]:
                statFields = this.state.abilities
                group = 'abilities'
                break
            case 'savingThrow'+'_'+e.target.name.split('_')[1]:
                statFields = this.state.savingThrows
                group = 'savingThrows'
                break
            case 'damageType'+'_'+e.target.name.split('_')[1]:
                statFields = this.state.damageTypes
                group = 'damageTypes'
                break
            case 'statusEffect'+'_'+e.target.name.split('_')[1]:
                statFields = this.state.statusEffects
                group = 'statusEffects'
                break
            default:
                return
        }
        let index = e.target.name.split('_')[1]
        statFields[index].name=e.target.value
        this.setState({[group]:statFields })
    }

    addStatField = (stat) => {
        let name = ''
        switch(stat.type){
            case 'stat':
                name = this.state.statFields[stat.id].name
                break
            case 'resource':
                name = this.state.resources[stat.id].name
                break
            case 'ability':
                name = this.state.abilities[stat.id].name
                break
            case 'savingThrow':
                name = this.state.savingThrows[stat.id].name
                break
            case 'damageType':
                name = this.state.damageTypes[stat.id].name
                break
            case 'statusEffect':
                name = this.state.statusEffects[stat.id].name
                break
            default:
                return
        }

        return(
            <div key={stat.id}>
                <label >Stat {stat.id} Name: </label>
                <input  className='input' type="text"  name={stat.type+'_'+stat.id}
                    value={name}
                    onChange={this.handleInputChange}
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
                    <input id={numName} className="input" type="number" onChange={this.handleNFieldsChange} value={this.state[numName]} />
                    <button id={statName} className="btn-primary" onClick={this.applyNFieldsChange}>Apply</button>
                </div>
                <form id={fieldName} className="flex flex-col items-center space-y-2" method='POST' onSubmit={this.handleSubmit} encType="multipart/form-data">
                    {
                        this.state[statName].map(this.addStatField)
                    }
                    <input type="submit" className="input" value="Save" />
                </form>
            </div>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let form
        switch(e.target.id){
            case 'Stat':
                form = this.state.statFields
                break
            case 'Resources':
                form = this.state.resources
                break
            case 'Ability':
                form = this.state.abilities
                break
            case 'Saving Throw':
                form = this.state.savingThrows
                break
            case 'Damage Type':
                form = this.state.damageTypes
                break
            case 'Status Effects':
                form = this.state.statusEffects
                break
        }
        axios.post('CreateSystem/save', {form: form, sysName: this.state.name}).then((response)=>{
            console.log(response)
        })
    }

    handleChangeName = (e) => {
        let name = e.target.value
        this.setState({name: name})
    }

    listSystems = (e) => {
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
        let abilities = JSON.parse(system.abilities)
        let savingThrows = JSON.parse(system.saving_throws)
        let damageTypes = JSON.parse(system.damage_types)
        let statusEffects = JSON.parse(system.status_effects)
        let resources = JSON.parse(system.resources)

        this.setState({
            name:system.name,
            statFields:stats ? stats : [], nStatFields: stats ? stats.length : 0,
            abilities: abilities ? abilities : [], nAbilities: abilities ? abilities.length : 0,
            resources:resources ? resources : [], nResources: resources ? resources.length : 0,
            savingThrows: savingThrows ? savingThrows : [], nSavingThrows: savingThrows ? savingThrows.length : 0,
            damageTypes:damageTypes ? damageTypes : [], nDamageTypes: damageTypes ? damageTypes.length : 0,
            statusEffects:statusEffects ? statusEffects : [], nStatusEffects: statusEffects ? statusEffects.length : 0,
        })
    }

    deleteSystem = (e) => {
        axios.post('/CreateSystem/delete',{name: this.state.selectedSys}).then(response => {
            console.log(response)
        })
    }


    render(){
        return(
            <div>
                <h1 className="text-3xl font-bold col-span-full">System Creator </h1>
                <input className="text-3xl input" type="text" value={this.state.name} onChange={this.handleChangeName}/>
                <div className="grid grid-cols-2 w-screen h-full">

                    {this.renderFormCard('Stat', 'nStatFields', 'statFields')}

                    {this.renderFormCard('Resources', 'nResources', 'resources')}

                    {this.renderFormCard('Ability', 'nAbilities', 'abilities')}

                    {this.renderFormCard('Saving Throw', 'nSavingThrows', 'savingThrows')}

                    {this.renderFormCard('Damage Type', 'nDamageTypes', 'damageTypes')}

                    {this.renderFormCard('Status Effects', 'nStatusEffects', 'statusEffects')}

                </div>

                <StatSystemMenu
                    onSysOptionClick={this.onSysOptionClick}
                    loadSystem={this.loadSystem}
                    listSystems={this.listSystems}
                    sysList={this.state.sysList}
                    selectedSys={this.props.selectedSys}
                    deleteSystem={this.deleteSystem}
                />
            </div>

        )
    }
}
