import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PatternMenu from './PatternMenu/PatternMenu'
import axios from 'axios'
import patternList from './patternList'

export default class TileCreator extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            passable:true,
            blocksSight:false,
            diffucultTerrain:false,
            terrainType: 'ground',
        }

        this.fileInput = React.createRef();

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePassableChange = this.handlePassableChange.bind(this)
        this.handleBlocksSightChange = this.handleBlocksSightChange.bind(this)
        this.handleDifficultTerrainChange = this.handleDifficultTerrainChange.bind(this)
        this.handleTerrainTypeChange = this.handleTerrainTypeChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleNameChange(e){
        this.setState({name: e.target.value})
    }

    handlePassableChange(e){
        this.setState({passable: e.target.value})
    }

    handleBlocksSightChange(e){
        this.setState({blocksSight: e.target.value})
    }

    handleDifficultTerrainChange(e){
        this.setState({difficultTerrain: e.target.value})
    }

    handleTerrainTypeChange(event) {
    this.setState({terrainType: event.target.value});
  }

    handleSubmit(e){
        e.preventDefault();
        let url = 'Tile/save'
        var formData = new FormData()
        formData.append('file', this.fileInput.current.files[0])
        formData.append('name', this.state.name)
        formData.append('passable', this.state.passable)
        formData.append('blocksSight', this.state.blocksSight)
        formData.append('diffucultTerrain', this.state.diffucultTerrain)
        formData.append('terrainType', this.state.terrainType)
        axios.post(url, formData , {}).then((response)=>{
            console.log(response)
        })
    }

    render(){
        return(
            <div className="flex flex-col w-screen h-full">
                <div className="flex flex-col mx-auto h-full w-1/2 place-items-center space-y-2 border-2 border-red-500 bg-gray-500 py-5 my-5">
                    <h1 className='text-3xl' >Create Tile</h1>
                    <form className="form "  method='POST' onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <label>Name</label>
                        <input type='text' name='name' value={this.state.name} onChange={this.handleNameChange} className="text-2xl border-gray-500 rounded" required ></input>
                        <label>Image</label>
                        <input type='file' ref={this.fileInput} name='image' className="input" accept="image/*" encType="multipart/form-data"></input>
                        <label>special effect</label>
                        <input type='text' name='specialEffect'  className="input"></input>
                        <label>terrainType</label>
                        <select id="terrainType" value={this.state.terrainType} onChange={this.handleTerrainTypeChange} name="terrainType" >
                            <option value="air">Air</option>
                            <option value="ground">Ground</option>
                            <option value="water">Water</option>
                        </select>
                        <div className="flex flew-row space-x-3">
                            <label>passable:</label>
                            <input type='checkbox' name='passable' onChange={this.handlePassableChange} value={this.state.passable} className="input" ></input>
                            <label>blocks Sight:</label>
                            <input type='checkbox' name='blocksSight' value={this.state.blocksSight} className="input" ></input>
                            <label>difficult terrain:</label>
                            <input type='checkbox' name='difficultTerrain' value={this.state.difficultTerrain} className="input" ></input>
                        </div>
                        <input className="input" type="submit"></input>
                    </form>
                </div>
            </div>

        )
    }
}
