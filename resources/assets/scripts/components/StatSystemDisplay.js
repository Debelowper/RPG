import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Stat from './Stat'
import StatSystemCreator from './StatSystemCreator'

export default class StstSystemDisplay extends Component {
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
        }

    }

    handleNFieldsChange = (e, nFields) => {
        let max = nFields == 'nSkills' ? 40 : 40
        let value = e.target.value < 0 ? 0 : e.target.value
        value = value > max ? max : value
        this.setState({[nFields]: value})
    }

    applyNFieldsChange = (e, nFields, type) => {
        nFields = this.state[nFields]
        let stats = this.state[type]
        let maxFields = 40

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

    handleChangeName = (e) => {
        let name = e.target.value
        this.setState({name: name})
    }

    loadSystem = (system) => {

        this.setState({
            name:system.name,
            stats:system.stats ? system.stats : [], nStats: system.stats ? system.stats.length : 0,
            skills:system. skills ? system.skills : [], nSkills: system.skills ? system.skills.length : 0,
            resources:system.resources ? system.resources : [], nResources: system.resources ? system.resources.length : 0,
            savingThrows:system.savingThrows ? system.savingThrows : [], nSavingThrows: system.savingThrows ? system.savingThrows.length : 0,
            damageTypes:system.damageTypes ? system.damageTypes : [], nDamageTypes: system.damageTypes ? system.damageTypes.length : 0,
            statusEffects:system.statusEffects ? system.statusEffects : [], nStatusEffects: system.statusEffects ? system.statusEffects.length : 0,
        })
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
                <form  className="flex flex-col items-center space-y-2"
                    method='POST' encType="multipart/form-data"
                    // onSubmit={(e) => this.props.saveSystem(e, statName, this.state[statName], this.state.name) }
                >
                    {
                        this.state[statName].map(this.addStatField)
                    }
                </form>
            </div>
        )
    }

    getSystemState = () => {
        return {
            name:this.state.name,
            stats:this.state.stats,
            resources: this.state.resources,
            skills: this.state.skills,
            savingThrows:this.state.savingThrows,
            damageTypes: this.state.damageTypes,
            statusEffects: this.state.statusEffects
        }
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
                <div>
                    <StatSystemCreator getSystemState={this.getSystemState} loadSystem={this.loadSystem}  />
                </div>
            </div>
        )
    }
}
