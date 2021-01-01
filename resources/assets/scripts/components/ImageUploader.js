import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import ImageMenu from './ImageMenu'

export default class ImageUploader extends Component {
    constructor(props){
        super(props)

        this.state = {

            imageName:'',
            imageType:1,
        }


        this.fileInput = React.createRef();

        this.handleSubmitImage = this.handleSubmitImage.bind(this)
        this.handleImageNameChange = this.handleImageNameChange.bind(this)
        this.handleImageTypeChange = this.handleImageTypeChange.bind(this)
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




    render(){
        return(
            <div className="flex flex-col w-screen h-full">
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
                    <ImageMenu />
                </div>
            </div>
        )
    }
}
