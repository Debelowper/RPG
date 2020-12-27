import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid';
import PropTypes from 'prop-types';


export default class Tile extends Component {
    constructor(props, context){
        super(props)

        this.onClick = this.onClick.bind(this)
        this.onHover = this.onHover.bind(this)
        this.changePattern = this.changePattern.bind(this)

        this.state = {

        }
    }

    onClick(event){
        this.props.onHexClick(this.props.id)
    }

    onHover(){
        this.props.onHexHover(this.props.id)
    }

    changePattern(patternId){
        this.setState({pattern: patternId })
    }

    render(){
        const {hex, id} = this.props

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
