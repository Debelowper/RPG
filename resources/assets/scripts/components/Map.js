import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern } from 'react-hexgrid';
import Tile from './Tile';
import patternList from './patternList'

export default class Map extends Component {
    constructor(props){
        super(props)

        this.state = {
            hexList: []
        }


        this.onHexClick = this.onHexClick.bind(this)
        this.onHexHover = this.onHexHover.bind(this)
        this.setRefs = this.setRefs.bind(this)

    }

    setRefs(el) {
        if(el){
            var hexList = this.state.hexList
            if(!hexList.find(i => i.props.id.x == el.props.id.x && i.props.id.y == el.props.id.y)){
                hexList.push(el)
                this.setState({hexList:hexList})
            }
        }
    }

    identificateHexagons(hexagons, gridParams){
        hexagons = hexagons.map((hex, i)=>{
            hex.id = {x:(hex.q ), y:i%gridParams.y}
            return hex
        })
        return hexagons
    }

    onHexClick(id){
        this.changeChildPattern(id, this.props.selectedPattern)
    }

    changeChildPattern(id, pattern){
        let el = this.state.hexList.find((el) => {
            return el.props.id == id
        })

        el.changePattern(pattern)
    }

    onHexHover(id){

    }


    render(){

        var hexagons = GridGenerator.orientedRectangle(this.props.gridParams.x, this.props.gridParams.y);
        hexagons = this.identificateHexagons(hexagons, this.props.gridParams)

        return(
            <div>
                <HexGrid  width={this.props.gridParams.width} height={this.props.gridParams.height} viewBox={this.props.gridParams.viewboxParams.join(' ')}>
                  <Layout ref={this.layoutRef} size={{ x: this.props.gridParams.size, y: this.props.gridParams.size }}>
                    { hexagons.map((hex, i) =>
                        <Tile
                            ref={this.setRefs}
                            key={i} hex={hex}
                            id={hex.id}
                            onHexClick={this.onHexClick}
                            onHexHover={this.onHexHover}
                        />
                    )}
                  </Layout>
                  {patternList()}
                </HexGrid>
            </div>
        )
    }

}
