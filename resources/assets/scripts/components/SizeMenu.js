import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            width: 10,
            height: 10,
            size: 10
        }

        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);

    }

    onClick(){
        this.props.changeGridParams(this.state.width, this.state.height, this.state.size)
    }

    handleChange(event) {
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
                <button onClick={this.onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Apply</button>
            </div>

        )
    }
}
