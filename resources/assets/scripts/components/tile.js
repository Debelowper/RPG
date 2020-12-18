import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid';
import PropTypes from 'prop-types';


export default class Tile extends Component {
    constructor(props){
        super(props)
    }

    // static propTypes = {
    //     hex : this.props.object
    // }



    render(){
        const {hex} = this.props


        return(

            <Hexagon q={hex.q} r={hex.r} s={hex.s} />

        )
    }

}
