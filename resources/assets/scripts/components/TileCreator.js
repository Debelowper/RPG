import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import ImagesMenu from './ImagesMenu'
import axios from 'axios'
import TilesMenu from './TilesMenu'
import GameLayout from './GameLayout'

export default function TileCreator(){

    const [formState, setFormState] = useState(
        {
            id:0,
            name: '',
            passable:1,
            blocksSight:0,
            swimSpeed:0,
            flySpeed:100,
            walkSpeed:100,
            climbSpeed:0,
            imageId: '',
        }
    )

    const [selectedImage, setSelectedImage] = useState('')
    const [updater, setUpdater] = useState(0)

    const renderRangeInput = (label, key) => {
        return(
            <div>
                <label>{label} Speed: </label>
                <input type='range' value={formState[key]} onChange={({target})=>{setFormState({...formState, [key]:target.value})}} required></input>
                <output>{formState[key]}</output>
            </div>
        )
    }

    const renderCheckboxInput = (label, key) => {
        return(
            <div>
                <label>{label}: </label>
                <input type='checkbox' name={key}
                    onChange={({target})=>{setFormState({...formState, [key]:!formState[key]})}}
                    checked={formState[key]} className="input"
                />
            </div>
        )
    }

    const saveTile = (e) => {
        e.preventDefault()
        let url = 'Tile/save'
        axios.post(url, formState ).then((response)=>{
            setUpdater(updater+1)
            console.log(response)
        })
    }

    const DeleteTile = () => {
        let url = 'Tile/delete'
        axios.post(url, {name: formState.name} ).then((response)=>{
            setUpdater(updater+1)
            console.log(response)
        })
    }

    const loadSelectTile = (props, img) => {
        let formState = {
            id:props.id,
            name:props.name,
            passable: props.passable,
            blocksSight: props.blocks_sight,
            swimSpeed:props.swim_speed,
            flySpeed:props.fly_speed,
            walkSpeed:props.walk_speed,
            climbSpeed:0,
            imageId:props.image_id
        }
        setFormState(formState)
        setSelectedImage(img.src)
    }


    return(
        <GameLayout
            backgroundURL={'/tile.jpg'}
            content={
                <div className="menu menu-v  mx-auto">
                    <h1 className='text-3xl font-bold' >Create Tile</h1>
                    <form className="form "  method='POST' onSubmit={saveTile} encType="multipart/form-data">
                        <label>Name</label>
                        <input type='text' name='name' value={formState.name}
                            onChange={({target})=>{setFormState({...formState, name:target.value})}}
                            className="input" required
                        />
                        {selectedImage ? <img  src={selectedImage} height={50} width={50}  ></img> : ''}

                        <div className="flex flew-row space-x-3">
                            {renderCheckboxInput('Blocks Sight', 'blocksSight')}
                            {renderCheckboxInput('Passable', 'passable')}
                        </div>

                        {renderRangeInput('Walk', 'walkSpeed')}
                        {renderRangeInput('Fly', 'flySpeed')}
                        {renderRangeInput('Climb', 'climbSpeed')}
                        {renderRangeInput('swim', 'swimSpeed')}

                        <div className="flex flex-row">
                            <input className="input" type="submit" value="Save"></input>
                            <input className="input" type="button" value="Delete" onClick={DeleteTile}></input>
                        </div>
                    </form>
                    <TilesMenu selectedPattern={formState} onMenuClick={loadSelectTile} updater={updater}/>
                </div>
            }
            bottomMenu={
                <ImagesMenu onMenuClick={({target})=>{setSelectedImage(target.src); setFormState({...formState, imageId:target.id})}}/>
            }
        />

    )
}
