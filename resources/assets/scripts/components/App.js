import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern } from 'react-hexgrid';
import Tile from './Tile';
import patternList from './patternList'
import PatternMenu from './PatternMenu'

export default class App extends Component {
    constructor(props){
        super(props)

        this.hexList = []
        this.setRefs = el => {
            this.hexList.push(el)
        };

        this.state = {

        }


        this.onChildClick = this.onChildClick.bind(this)
        this.onChildHover = this.onChildHover.bind(this)
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

    onChildClick(id){
        this.changeChildPattern(id, "tavern-sign")
    }

    onChildHover(id){

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
                { hexagons.map((hex, i) => <Tile ref={this.setRefs} key={i} hex={hex} id={hex.id} onChildClick={this.onChildClick} onChildHover={this.onChildHover} />  ) }
              </Layout>
              {patternList()}
            </HexGrid>
            <PatternMenu />

          </div>
        );
    }
}
