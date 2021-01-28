import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import ImagesMenu from './ImagesMenu'
import GameLayout from './GameLayout'

export default function ImageUploader (){
    const [imageName, setImageName] = useState('')
    const [selectedImage, setSelectedImage] = useState('')
    const [imageType, setImageType] = useState('')
    const [updater, setUpdater] = useState('')

    const fileInput = React.createRef();

    const handleImageNameChange = (e) => {
        setImageName(e.target.value)
    }

    const handleImageTypeChange = (e) => {
        setImageType(e.target.value)
    }

    const handleMenuClick =(e) => {
        setSelectedImage(e.target)
    }

    const handleSubmitImage = (e) => {
        e.preventDefault();
        let ext = fileInput.current.files[0].name.split('.').pop()
        let url = 'Image/save'
        var formData = new FormData()
        formData.append('file', fileInput.current.files[0], imageName+'.'+ext)
        formData.append('name', imageName)
        formData.append('type', imageType)
        axios.post(url, formData , {headers:{'Content-Type': 'multipart/form-data'}} ).then((response)=>{
            setUpdater(updater+1)
            console.log(response)
        })
    }

    const handleDeleteImage = (e) => {
        e.preventDefault()
        axios.post('Image/delete', {imgId: selectedImage.id} ).then((response)=>{
            setUpdater(updater+1)
            console.log(response)
        })
    }

    return(
        <GameLayout
            backgroundURL="/wooden-background.jpg"
            content = {
                <div className="menu menu-v mx-auto">
                    <div className="sub-menu menu-v">
                        <h1>Upload Image</h1>
                        <form className="form "  method='POST' onSubmit={handleSubmitImage} encType="multipart/form-data">
                            <label>Image</label>
                            <input type='file' ref={fileInput} name='file' className="input" accept="image/*" ></input>
                            <label>Name</label>
                            <input type='text' name='name' value={imageName} onChange={handleImageNameChange} className="input" required ></input>
                            <label>Image Type</label>
                            <input type='text' name='type' value={imageType} onChange={handleImageTypeChange} className="text-2xl border-gray-500 rounded" required ></input>
                            <input className="input" type='submit' value="Save"></input>
                        </form>
                    </div>
                    <div className="sub-menu menu-v">
                        <h1>Delete Image</h1>
                        <form className="form "  method='POST' onSubmit={handleDeleteImage}>
                            {selectedImage ? <img  src={selectedImage.src} height={50} width={50}  ></img> : ''}
                            <input className="input" type="submit" value="Delete"></input>
                        </form>
                    </div>
                </div>
            }

            bottomMenu = {<ImagesMenu onMenuClick={handleMenuClick} updater={updater}/>}
        />
    )
}
