import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import patternList from './patternList'

export default class PatternMenu extends Component {
    constructor(props){
        super(props)

    }

    onClick(){
        console.log(this)
    }

    render(){
        return(
             <div className='flex flex-row space-x-2'>
                <img onClick={this.onClick}  id='dragon ' src={"http://"+ window.location.host +"/spiked-dragon-head.png"} width={50} height={50}/>
                <img onClick={this.onClick}  id='tavern-sign ' src={"http://"+ window.location.host +"/tavern-sign.svg"} width={50} height={50}/>
             </div>
        )
    }
}
