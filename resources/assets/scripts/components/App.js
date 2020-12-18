import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid';
import Tile from './tile';

export default class App extends Component {
    constructor(props){
        super(props)
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

    render(){

        let gridParams = this.calcGridParams(50,50,10)

        const hexagons = GridGenerator.orientedRectangle(gridParams.x, gridParams.y);



        return (
          <div>
            <HexGrid  width={gridParams.width} height={gridParams.height} viewBox={gridParams.viewboxParams.join(' ')}>
              <Layout size={{ x: gridParams.size, y: gridParams.size }}>
                { hexagons.map((hex, i) => <Tile key={i} hex={hex} />  ) }
              </Layout>
            </HexGrid>
          </div>
        );
    }
}
