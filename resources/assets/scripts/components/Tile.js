import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid';
import PropTypes from 'prop-types';


export default class Tile extends Component {
    constructor(props, context){
        super(props)

        this.state = {
            character:'',
            structure:'',
            tile:'',
        }
    }

    onClick = () => {
        this.props.onHexClick({hex: this.props.hex,tile: this.state.tile, structure: this.state.structure,character: this.state.character})
    }

    onHover = () => {
        if(this.props.clicked.current){
            this.props.onHexClick({hex: this.props.hex,tile: this.state.tile, structure: this.state.structure,character: this.state.character})
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.tile != this.state.tile || nextState.structure != this.state.structure ||  nextState.character != this.state.character){
            return true
        }else{
            return false
        }
    }

    changePattern = (pattern, type) => {
        this.setState({[type]: type + '-' + pattern.toString() })
    }

    render(){

        const {hex} = this.props
        return(
        <>
            <Hexagon
                onClick={this.onClick}
                onMouseLeave={this.onHover}
                q={hex.q}
                r={hex.r}
                s={hex.s}
                fill={this.state.tile}
            />
            {
                this.state.structure ?

                    <Hexagon
                        onClick={this.onClick}
                        onMouseLeave={this.onHover}
                        q={hex.q}
                        r={hex.r}
                        s={hex.s}
                        fill={this.state.structure}
                    />
                : ''
            }
            {
                this.state.character ?
                    <Hexagon
                        onClick={this.onClick}
                        onMouseLeave={this.onHover}
                        q={hex.q}
                        r={hex.r}
                        s={hex.s}
                        fill={this.state.character}
                    />
                : ''
            }
        </>
        )
    }
}

Tile.propTypes = {
    hex : PropTypes.object.isRequired
}
