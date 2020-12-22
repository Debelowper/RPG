import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Image from './Image'

export default class PatternMenu extends Component {
    constructor(props){
        super(props)
    }


    render(){
        return(
             <div className='flex flex-row space-x-2'>
                <Image  onMenuClick={this.props.onMenuClick} id='dragon' src={"http://"+ window.location.host +"/spiked-dragon-head.png"} width={50} height={50}/>
                <Image  onMenuClick={this.props.onMenuClick} id='tavern-sign ' src={"http://"+ window.location.host +"/tavern-sign.svg"} width={50} height={50}/>
             </div>
        )
    }
}
