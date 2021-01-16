import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import StatSystemMenu from './StatSystemMenu'


export default class StatSystemCreator extends Component {
    constructor(props){
        super(props)

        this.state = {

            sysList:[],
            selectedSys:"",
        }
    }

    componentDidMount(){
        this.listSystems()
    }


    listSystems = () => {
        axios.get('/CreateSystem/load').then((response)=>{
            this.setState({sysList: response.data})
        })
    }

    onSysOptionClick = (e) => {
        this.setState({selectedSys: e.target.id})
    }

    saveSystem = (e) => {
        e.preventDefault()

        let sysState = this.props.getSystemState()

        axios.post('CreateSystem/save', {sys: sysState}).then((response)=>{
            console.log(response)
            this.listSystems()
        })
    }

    loadSystem = () => {
        let system = this.state.sysList.find(el => el.name == this.state.selectedSys)

        let parsedSys = {
            name: system.name,
            stats: JSON.parse(system.stats),
            skills: JSON.parse(system.skills),
            savingThrows: JSON.parse(system.saving_throws),
            damageTypes: JSON.parse(system.damage_types),
            statusEffects: JSON.parse(system.status_effects),
            resources: JSON.parse(system.resources),
        }

        this.props.loadSystem(parsedSys)
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
                <StatSystemMenu
                    saveSystem={this.saveSystem}
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
