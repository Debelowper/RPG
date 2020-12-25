import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Image from './Image'

export default class PatternMenu extends Component {

    constructor(props){
        super(props)
    }


    render(){
        return(
             <div className='flex bg-gray-700 border-2 border-red-700 py-3 flex-row h-24 space-x-2'>
                <Image onMenuClick={this.props.onMenuClick} id='dragon' src={"http://"+ window.location.host +"/spiked-dragon-head.png"}/>
                <Image onMenuClick={this.props.onMenuClick} id='tavern-sign ' src={"http://"+ window.location.host +"/tavern-sign.svg"}/>
             </div>
        )
    }
}
