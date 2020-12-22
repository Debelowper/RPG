import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern } from 'react-hexgrid';
import Tile from './Tile';
import patternList from './patternList'
import PatternMenu from './PatternMenu/PatternMenu'

export default class App extends Component {
    constructor(props){
        super(props)

        this.hexList = []
        this.setRefs = el => {
            this.hexList.push(el)
        };

        this.state = {
            selectedPattern: ''
        }

        this.onHexClick = this.onHexClick.bind(this)
        this.onHexHover = this.onHexHover.bind(this)
        this.onMenuClick = this.onMenuClick.bind(this)
    }


    calcGridParams(x, y, size){

        let kx = 0.78
        let ky = 0.88

        let spacesX = kx*2*size*x + size
        let spacesY = ky*2*size*y + size

        var viewboxParams = [-size, -size, spacesX, spacesY]

        let width = kx*x*size + 'vh'
        let height = ky*y*size + 'vh'

        return {
            x:x,
            y: y,
            width:width ,
            height:height,
            size:size,
            viewboxParams: viewboxParams
        }
    }

    identificateHexagons(hexagons, gridParams){
        hexagons = hexagons.map((hex, i)=>{
            hex.id = {x:(hex.q ), y:i%gridParams.x}
            return hex
        })
        return hexagons
    }

    onHexClick(id){
        this.changeChildPattern(id, this.state.selectedPattern)
    }

    onHexHover(id){

    }

    onMenuClick(patternId){
        this.setState({selectedPattern: patternId })
    }


    changeChildPattern(id, pattern){
        let el = this.hexList.find((el) => {
            return el.props.id == id
        })

        el.changePattern(pattern)
    }



    render(){

        let gridParams = this.calcGridParams(20,10,10)

        var hexagons = GridGenerator.orientedRectangle(gridParams.x, gridParams.y);
        hexagons = this.identificateHexagons(hexagons, gridParams)


        return (

          <div>
            <HexGrid  width={gridParams.width} height={gridParams.height} viewBox={gridParams.viewboxParams.join(' ')}>
              <Layout ref={this.layoutRef} size={{ x: gridParams.size, y: gridParams.size }}>
                { hexagons.map((hex, i) =>
                    <Tile
                        ref={this.setRefs}
                        key={i} hex={hex}
                        id={hex.id}
                        onHexClick={this.onHexClick}
                        onHexHover={this.onHexHover} />
                )}
              </Layout>
              {patternList()}
            </HexGrid>
            <PatternMenu onMenuClick={this.onMenuClick } />

          </div>
        );
    }
}
