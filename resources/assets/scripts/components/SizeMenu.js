import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            width: 10,
            height: 8,
            size: 10
        }


    }

    onClick= () => {
        this.props.changeGridParams(this.state.width, this.state.height, this.state.size)
    }

    handleChange = (event) => {
        if(event.target.placeholder != 'size' && event.target.value <= 80){
            this.setState({[event.target.placeholder]: event.target.value});
        }else if(event.target.value <= 30){
            this.setState({[event.target.placeholder]: event.target.value});
        }
    }

    render(){
        return(
            <div>
                <input placeholder={'width'} value={this.state.width} onChange={this.handleChange} className="border-4 rounded" type='number' ></input>
                <input placeholder={'height'} value={this.state.height} onChange={this.handleChange} className="border-4 rounded" type='number' ></input>
                {/*<input placeholder={'size'} value={this.state.size} onChange={this.handleChange} className="border-4 rounded" type='number' ></input>*/}
                <button onClick={this.onClick} className="btn-primary">Apply</button>
            </div>

        )
    }
}
