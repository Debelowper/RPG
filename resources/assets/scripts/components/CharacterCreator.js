import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import CharacterMenu from './CharacterMenu'

export default class CharacterCreator extends Component {
    constructor(props){
        super(props)

        this.state = {
            stats: [],
            resources: [],
            skills: [],
            savingThrows:[],
            damageTypes:[],
            statusEffects:[],
            name:'',
        }

    }

    componentDidMount(){
        this.getStatSystem()
    }

    getStatSystem = () => {
        axios.get('CreateSystem/load').then((response)=> {
            response = response.data[0]
            this.setState({
                stats:response.stats ?  JSON.parse(response.stats) : [],
                resources:response.resources ?  JSON.parse(response.resources) : [],
                skills:response.skills ?  JSON.parse(response.skills) : [],
                savingThrows:response.saving_throws ? JSON.parse(response.saving_throws) : [],
                damageTypes:response.damageTypes ? JSON.parse(response.damageTypes) : [],
                statusEffects:response.statusEffects ? JSON.parse(response.statusEffects) : [],
            })
        })
    }

    handleStatsChange = (e, field, key) =>{
        let stats = this.state[field]
        stats[key].value = e.target.value

        this.setState({[stats]: stats})
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
                                className="input mx-auto"
                                name={field} type='number'
                                value={this.state[field][key].value ? this.state[field][key].value : 0}
                                onChange={(e) => this.handleStatsChange(e, field, key)}
                            />

                        </div>
                    )
                })}
            </div>
        )
    }

    handleNameChange = (e) => {
        let name = e.target.value
        this.setState({name: e.target.value})
    }


    render(){
        return (
            <div>
                <h2 className="text-2xl font-bold">Character Name</h2>
                <input className="input text-2xl" value={this.state.name} onChange={this.handleNameChange}/>
                <div className="flex flex-row flex-wrap w-2/3" >
                    <div className="flex flex-col space-y-1 w-1/2 border border-black">
                        <h2 className="text-2xl font-bold" >Character Stats</h2>
                        {this.state.stats.map((el, key)=>{
                            return(
                                <div  key={el.id}>
                                    <label>{el.name} :  </label>
                                    <input
                                        className="input mx-auto"
                                        type='number'
                                        value={this.state.stats[key].value ? this.state.stats[key].value : 0}
                                        onChange={(e) => this.handleStatsChange(e, 'stats' ,key)} />
                                </div>
                            )
                        })}
                    </div>

                    {this.renderFields('resources')}

                    {this.renderFields('skills')}

                    {this.renderFields('savingThrows')}

                </div>

                {/* <CharacterMenu /> */}
            </div>
        )
    }
}
