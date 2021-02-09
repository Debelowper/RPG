import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

export default function StructureDisplay({structure, setStructure, saveStructure}){

    const [selectedImage, setSelectedImage] = useState('')

    const renderRangeInput = (label, key) => {
        return(
            <div>
                <label>{label} Speed: </label>
                <input type='range' value={structure[key]} onChange={({target})=>{setStructure({...structure, [key]:target.value})}} required></input>
                <output>{structure[key]}</output>
            </div>
        )
    }

    const renderCheckboxInput = (label, key) => {
        return(
            <div>
                <label>{label}: </label>
                <input type='checkbox' name={key}
                    onChange={({target})=>{setStructure({...structure, [key]:!structure[key]})}}
                    checked={structure[key]} className="input"
                />
            </div>
        )
    }

    const renderNumberInput = (lable, key) =>{
        return(
            <div>
                <lable>{lable}: </lable>
                <input type='number' value={structure.distanceToClimb} className='input'/>
            </div>
        )
    }

    // {
    //     name: '',
    //     image:'',
    //     climbable:false,
    //     distanceToClimb:0,
    //     enterable:false,
    //     whereToGoWhenEnter:'',
    //     destructible: false,
    //     destructResource:'',
    //     destructResourceAmount:0,
    //     destructResistances:{},
    //     destructSkill:'',
    //     destructSkillDC:0,
    // }

    return(
        <div>
            <div>
                <div className="menu menu-v  mx-auto">
                    <h1 className='text-3xl font-bold' >Create Tile</h1>
                    <form className="form "  method='POST' onSubmit={saveStructure} encType="multipart/form-data">
                        <label>Name</label>
                        <input type='text' name='name' value={structure.name}
                            onChange={({target})=>{setStructure({...structure, name:target.value})}}
                            className="input" required
                        />
                        {selectedImage ? <img  src={selectedImage} height={50} width={50}  ></img> : ''}

                        <div className="flex flew-row space-x-3">
                            {renderCheckboxInput('climbable', 'climbable')}
                            {renderCheckboxInput('enterable', 'enterable')}
                            {renderCheckboxInput('destructible', 'destructible')}
                        </div>
                        {structure.climbable ? renderNumberInput('Distance To Climb', 'distanceToClimb') : '' }
                        {/* {climbable ? {renderRangeInput('Climb Distance', 'climbDistance')} : '' } */}

                        <div className="flex flex-row">
                            {/* <input className="input" type="submit" value="Save"></input>
                            <input className="input" type="button" value="Delete" onClick={DeleteTile}></input> */}
                        </div>
                    </form>
                    {/* <StructureMenu  onMenuClick={loadSelectTile} updater={updater}/> */}
                </div>
            </div>
        </div>
    )

}
