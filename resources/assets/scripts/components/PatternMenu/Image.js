import React, {Component} from 'react'
import ReactDOM from 'react-dom'


export default class Image extends Component {
    constructor(props){
        super(props)

        this.onClick = this.onClick.bind(this)
    }

    onClick(){
        this.props.onMenuClick(this.props.id)
    }

    render(){
        return(
            <img  onClick={this.onClick} id={this.props.id} src={this.props.src} width={50} height={50}/>
        )
    }
}
