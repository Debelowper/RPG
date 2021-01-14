import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import StatSystemMenu from './StatSystemMenu'

export default class CharacterCreator extends Component {
    constructor(props){
        super(props)

        this.state = {
            stats: [],
            resources: [],
            abilities: [],
            savingThrows:[],
            damageTypes:[],
            statusEffects:[],
        }


    }

    componentDidMount(){
        this.getStatSystem()
    }

    getStatSystem = () => {
        axios.get('CreateSystem/load').then((response)=> {
            console.log(response)
            response = response.data[0]
            this.setState({
                stats:response.stats ?  JSON.parse(response.stats) : [],
                resources:response.resources ?  JSON.parse(response.resources) : [],
                abilities:response.abilities ?  JSON.parse(response.abilities) : [],
                savingThrows:response.saving_throws ? JSON.parse(response.saving_throws) : [],
                damageTypes:response.damageTypes ? JSON.parse(response.damageTypes) : [],
                statusEffects:response.statusEffects ? JSON.parse(response.statusEffects) : [],
            })
        })
    }

    handleStatsChange = (e) =>{
        let stats = this.state[e.target.name]
        stats[e.target.id].value = e.target.value

        this.setState({[stats]: stats})
    }

    addFactor = (e) =>{
        return(
            <input className="input"  value={0} />
        )
    }

    dropdown = () => {
        return(
            <select>
                {
                    this.state.stats.map((el)=>{
                        return (
                            <option key={el.name} value={el.name}> {el.name} </option>
                        )
                    })
                }
            </select>
        )
    }

    renderFields = (field) => {
        return(
            <div className="flex flex-col space-y-1 w-1/2 border border-black">
                <h2 className="text-2xl font-bold">{field}</h2>
                {this.state[field].map((el, key)=>{
                    return(
                        <div  key={el.id}>
                            <label>{el.name} :  </label>
                            <input
                                className="input mx-auto" id={key}
                                name={field} type='number'
                                value={this.state[field][key].value ? this.state[field][key].value : 0}
                                onChange={this.handleStatsChange}
                            />
                            {this.dropdown()}
                        </div>
                    )
                })}
            </div>
        )
    }




    render(){
        return (
            <div>
                <div className="flex flex-row flex-wrap" >
                    <div className="flex flex-col space-y-1 w-1/2 border border-black">
                        <h2 className="text-2xl font-bold" >Character Stats</h2>
                        {this.state.stats.map((el, key)=>{
                            return(
                                <div  key={el.id}>
                                    <label>{el.name} :  </label>
                                    <input
                                        className="input mx-auto" id={key}
                                        name='stats' type='number'
                                        value={this.state.stats[key].value ? this.state.stats[key].value : 0}
                                        onChange={this.handleStatsChange} />
                                </div>
                            )
                        })}
                    </div>

                    {this.renderFields('resources')}

                    {this.renderFields('abilities')}

                    {this.renderFields('savingThrows')}

                </div>


                <button id="btn" className="btn-primary" onClick={this.getStatSystem} value={this.state.name}>create character</button>
            </div>
        )
    }
}
