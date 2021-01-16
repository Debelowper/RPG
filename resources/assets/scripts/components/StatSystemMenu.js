import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


export default class StatSystemMenu extends Component {
    constructor(props){
        super(props)

    }

    componenDidUpdate(){
        this.props.listSystems()
    }


    render(){
        return(
            <div className="flex flex-col space-y-2">
                {this.props.sysList.map((el)=>{
                    return <button id={el.name} key={el.name} className="btn" onClick={this.props.onSysOptionClick}>{el.name}</button>
                })}
                <button className="btn-primary" onClick={this.props.saveSystem} >Save</button>
                <button className="btn-primary" onClick={this.props.loadSystem} >Load</button>
                <button className="btn-primary" onClick={this.props.deleteSystem} >Delete</button>
            </div>
        )
    }
}
