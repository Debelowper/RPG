import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import StatSystemMenu from './StatSystemMenu'

export default class CharacterCreator extends Component {
    constructor(props){
        super(props)

        this.state = {

        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    getStatSystem = () => {
        console.log(this.state.name)
        this.setState({name: 'character'})
    }


    handleInputChange(e){
        console.log(e.target)
    }

    render(){
        return (
            <div>
                <button id="btn" className="btn-primary" onClick={this.getStatSystem} value={this.state.name}>create character</button>
            </div>
        )
    }
}
