import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid';
import PropTypes from 'prop-types';


export default class Tile extends Component {
    constructor(props, context){
        super(props)

        this.state = {

        }
    }

    onClick = () => {
        this.props.onHexClick(this.props.hex)
    }

    onHover = () => {
        this.props.onHexHover(this.props.hex)
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.pattern != this.state.pattern){
            return true
        }else{
            return false
        }
    }

    changePattern = (patternId) => {
        this.setState({pattern: patternId })
    }

    render(){
        console.log('tile render')
        const {hex} = this.props

        return(
            <Hexagon
                onClick={this.onClick}
                onMouseEnter={this.onHover}
                q={hex.q}
                r={hex.r}
                s={hex.s}
                fill={this.state.pattern}
            />
        )
    }
}

Tile.propTypes = {
    hex : PropTypes.object.isRequired
}
