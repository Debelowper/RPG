import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PatternMenu from './PatternMenu/PatternMenu'
import axios from 'axios'
import patternList from './patternList'

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
            },
            imageName:'',
            imageType:1,
        }


        this.fileInput = React.createRef();

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePassableChange = this.handlePassableChange.bind(this)
        this.handleBlocksSightChange = this.handleBlocksSightChange.bind(this)
        this.handleFlySpeedChange = this.handleFlySpeedChange.bind(this)
        this.handleWalkSpeedChange = this.handleWalkSpeedChange.bind(this)
        this.handleSwimSpeedChange = this.handleSwimSpeedChange.bind(this)
        this.handleSubmitImage = this.handleSubmitImage.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.handleImageNameChange = this.handleImageNameChange.bind(this)
        this.handleImageTypeChange = this.handleImageTypeChange.bind(this)
    }

    handleNameChange(e){
        let obj = this.state.formState
        obj.name = e.target.value
        this.setState({formState: obj})
    }

    handlePassableChange(e){
        let obj = this.state.formState
        e.target.checked == true ?
            obj.passable = 1 :
            obj.passable = 0

        this.setState({formState: obj})
    }

    handleBlocksSightChange(e){
        let obj = this.state.formState
        e.target.checked == true ?
            obj.blocksSight = 1 :
            obj.blocksSight = 0

        this.setState({formState: obj})

    }

    handleWalkSpeedChange(e){
        let obj = this.state.formState
        obj.walkSpeed = e.target.value
        if(e.target.value >= 0 && e.target.value <= 100){
            this.setState({formState: obj})
        }
    }
    handleFlySpeedChange(e){
        let obj = this.state.formState
        obj.flySpeed = e.target.value
        if(e.target.value >= 0 && e.target.value <= 100){
            this.setState({formState: obj})
        }
    }
    handleSwimSpeedChange(e){
        let obj = this.state.formState
        obj.swimSpeed = e.target.value
        if(e.target.value >= 0 && e.target.value <= 100){
            this.setState({formState: obj})
        }
    }

    handleImageNameChange(e){
        this.setState({imageName: e.target.value})
    }

    handleImageTypeChange(e){
        this.setState({imageType: e.target.value})
    }

    handleSubmitImage(e){
        e.preventDefault();
        let ext = this.fileInput.current.files[0].name.split('.').pop()
        let url = 'Image/save'
        var formData = new FormData()
        formData.append('file', this.fileInput.current.files[0], this.state.imageName+'.'+ext)
        formData.append('name', this.state.imageName)
        formData.append('type', this.state.imageType)
        axios.post(url, formData , {headers:{'Content-Type': 'multipart/form-data'}} ).then((response)=>{
            console.log(response)
        })
    }

    handleSubmitForm(e){
        e.preventDefault()
        let url = 'Tile/save'
        axios.post(url, this.state.formState ).then((response)=>{
            console.log(response)
        })
    }

    loadImage(){
        axios.get('Image/load').then(response =>{
            console.log(response)
        })
    }

    render(){
        return(
            <div className="flex flex-col w-screen h-full">
                <div className="flex flex-col mx-auto h-full w-1/2 place-items-center space-y-2 border-2 border-red-500 bg-gray-500 py-5 my-5">
                    <h1 className='text-3xl' >Create Tile</h1>
                    <form className="form "  method='POST' onSubmit={this.handleSubmitForm} encType="multipart/form-data">
                        <label>Name</label>
                        <input type='text' name='name' value={this.state.formState.name} onChange={this.handleNameChange} className="text-2xl border-gray-500 rounded" required ></input>

                        <div className="flex flew-row space-x-3">
                            <label>passable:</label>
                            <input type='checkbox' name='passable' onChange={this.handlePassableChange} checked={this.state.formState.passable} className="input" ></input>
                            <label>blocks Sight:</label>
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
                        <input className="input" type="submit"></input>
                    </form>
                </div>
                <div className="flex flex-col mx-auto h-full w-1/2 place-items-center space-y-2 border-2 border-red-500 bg-gray-500 py-5 my-5">
                    <form className="form "  method='POST' onSubmit={this.handleSubmitImage} encType="multipart/form-data">
                        <label>Image</label>
                        <input type='file' ref={this.fileInput} name='file' className="input" accept="image/*" ></input>
                        <label>Name</label>
                        <input type='text' name='name' value={this.state.imageName} onChange={this.handleImageNameChange} className="text-2xl border-gray-500 rounded" required ></input>
                        <label>Image Type</label>
                        <input type='text' name='type' value={this.state.imageType} onChange={this.handleImageTypeChange} className="text-2xl border-gray-500 rounded" required ></input>
                        <input className="input" type='submit' ></input>
                    </form>
                </div>
                <div className="flex flex-col mx-auto h-full w-1/2 place-items-center space-y-2 border-2 border-red-500 bg-gray-500 py-5 my-5">
                    <button onClick={this.loadImage} />
                </div>
            </div>
        )
    }
}
