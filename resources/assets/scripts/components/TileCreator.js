import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ImagesMenu from './ImagesMenu'
import axios from 'axios'
import TilesMenu from './TilesMenu'

export default class TileCreator extends Component {
    constructor(props){
        super(props)

        this.state = {
            formState: {
                name: '',
                passable:1,
                blocksSight:0,
                swimSpeed:0,
                flySpeed:100,
                walkSpeed:100,
                imageId: '',
            },
            selectedImage:'',
            updater:0
        }


        this.fileInput = React.createRef();

    }

    handleNameChange = (e) => {
        let obj = this.state.formState
        obj.name = e.target.value
        this.setState({formState: obj})
    }

    handlePassableChange = (e) => {
        let obj = this.state.formState
        e.target.checked == true ?
            obj.passable = 1 :
            obj.passable = 0

        this.setState({formState: obj})
    }

    handleBlocksSightChange = (e) => {
        let obj = this.state.formState
        e.target.checked == true ?
            obj.blocksSight = 1 :
            obj.blocksSight = 0

        this.setState({formState: obj})

    }

    handleWalkSpeedChange = (e) => {
        let obj = this.state.formState
        obj.walkSpeed = e.target.value
        if(e.target.value >= 0 && e.target.value <= 100){
            this.setState({formState: obj})
        }
    }
    handleFlySpeedChange = (e) => {
        let obj = this.state.formState
        obj.flySpeed = e.target.value
        if(e.target.value >= 0 && e.target.value <= 100){
            this.setState({formState: obj})
        }
    }
    handleSwimSpeedChange = (e) => {
        let obj = this.state.formState
        obj.swimSpeed = e.target.value
        if(e.target.value >= 0 && e.target.value <= 100){
            this.setState({formState: obj})
        }
    }

    handleSaveTile = (e) => {
        e.preventDefault()
        let url = 'Tile/save'
        axios.post(url, this.state.formState ).then((response)=>{
            this.setState({updater: this.state.updater + 1})
            console.log(response)
        })
    }

    handleDeleteTile = () => {
        let url = 'Tile/delete'
        axios.post(url, {name: this.state.formState.name} ).then((response)=>{
            this.setState({updater: this.state.updater + 1})
            console.log(response)
        })
    }

    handleSelectImage = (e) => {
        let formState = this.state.formState
        formState.imageId = e.target.id
        this.setState({selectedImage: e.target.src,formState:formState })

    }

    handleSelectTile = (e, props) => {
        let formState = {
            name:props.name,
            passable: props.passable,
            blocksSight: props.blocks_sight,
            swimSpeed:props.swim_speed,
            flySpeed:props.fly_speed,
            walkSpeed:props.walk_speed,
            imageId:props.image_id
        }
        this.setState({formState:formState, selectedImage: e.target.src})
    }



    render(){
        return(
            <div className="flex flex-col w-screen h-full">
                <div className="flex flex-col mx-auto h-full w-1/2 place-items-center space-y-2 border-2 border-red-500 bg-gray-500 py-5 my-5">
                    <h1 className='text-3xl' >Create Tile</h1>
                    <form className="form "  method='POST' onSubmit={this.handleSaveTile} encType="multipart/form-data">
                        <label>Name</label>
                        <input type='text' name='name' value={this.state.formState.name} onChange={this.handleNameChange} className="text-2xl border-gray-500 rounded" required ></input>
                        {this.state.selectedImage ? <img  src={this.state.selectedImage} height={50} width={50}  ></img> : ''}

                        <div className="flex flew-row space-x-3">
                            <label>Passable:</label>
                            <input type='checkbox' name='passable' onChange={this.handlePassableChange} checked={this.state.formState.passable} className="input" ></input>
                            <label>Blocks Sight:</label>
                            <input type='checkbox' name='blocksSight' onChange={this.handleBlocksSightChange} checked={this.state.formState.blocksSight} className="input" ></input>
                        </div>
                        <div>
                            <label>Walk Speed: </label>
                            <input type='range' name='walkSpeed' value={this.state.formState.walkSpeed} onChange={this.handleWalkSpeedChange} required></input>
                            <output>{this.state.formState.walkSpeed}</output>
                        </div>
                        <div>
                            <label>Fly Speed: </label>
                            <input type='range' name='flySpeed' value={this.state.formState.flySpeed} onChange={this.handleFlySpeedChange} required></input>
                            <output>{this.state.formState.flySpeed}</output>
                        </div>
                        <div>
                            <label>Swim Speed: </label>
                            <input type='range' name='swimSpeed' value={this.state.formState.swimSpeed} onChange={this.handleSwimSpeedChange} required></input>
                            <output>{this.state.formState.swimSpeed}</output>
                        </div>
                        <div className="flex flex-row">
                            <input className="input" type="submit" value="Save"></input>
                            <input className="input" type="button" value="Delete" onClick={this.handleDeleteTile}></input>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col mx-auto h-full w-1/2 place-items-center space-y-2 border-2 border-red-500 bg-gray-500 py-5 my-5">
                    <TilesMenu  onMenuClick={this.handleSelectTile} updater={this.state.updater}/>
                </div>
                <ImagesMenu onMenuClick={this.handleSelectImage}/>


            </div>
        )
    }
}
