import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

export default function StatSystemMenu({saveSystem, loadSystem, deleteSystem, onSysOptionClick, sysList }){


    return(
        <div className="flex flex-col space-y-2">
            {sysList.map((el)=>{
                return <button id={el.name} key={el.name} className="btn" onClick={onSysOptionClick}>{el.name}</button>
            })}
            <button className="btn-primary" onClick={saveSystem} >Save</button>
            <button className="btn-primary" onClick={loadSystem} >Load</button>
            <button className="btn-primary" onClick={deleteSystem} >Delete</button>
        </div>
    )

}
