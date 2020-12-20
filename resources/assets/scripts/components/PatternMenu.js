import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import patternList from './patternList'

export default class PatternMenu extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
             <div className='grid-container'>
                <img  className='grid-item' id='dragon' src={"http://"+ window.location.host +"/spiked-dragon-head.png"} width={50} height={50}/>
                <img  className='grid-item' id='tavern-sign' src={"http://"+ window.location.host +"/tavern-sign.svg"} width={50} height={50}/>
             </div>
        )
    }
}
