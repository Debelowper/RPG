import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default function SizeMenu({size, setSize, changeGridParams }){

    const onClick = () => {
        changeGridParams()
    }

    const handleChange = ({target}) => {
        if(target.placeholder != 'size' && target.value <= 80){
            setSize({...size, [target.placeholder]: parseInt(target.value)})
        }else if(target.value <= 30){
            setSize(...size, {[target.placeholder]: parseInt(target.value)})
        }
    }

    return(
        <>
            <div className="text-sm">
                <div >
                    <label >width  </label>
                    <input placeholder={'x'} value={size.x} onChange={handleChange} className="input w-12" type='number' ></input>
                </div>
                <div>
                    <label>height </label>
                    <input placeholder={'y'} value={size.y} onChange={handleChange} className="input w-12" type='number' ></input>
                </div>
            </div>
            {/*<input placeholder={'size'} value={size.size} onChange={handleChange} className="border-4 rounded" type='number' ></input>*/}
            <button onClick={onClick} className="btn-primary">Apply</button>
        </>

    )

}
