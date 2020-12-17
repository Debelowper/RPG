import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid';

export default class App extends Component {
    constructor(props){
        super(props)
    }

    render(){

        const hexagons = GridGenerator.orientedRectangle(20, 10);

        return (
          <div >
            <h1>Basic example of HexGrid usage.</h1>
            <HexGrid width={'100%'} height={'50vh'} viewBox={"0 -5 100 100"}>
              <Layout size={{ x: 5, y: 5 }}>
                { hexagons.map((hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} />) }
              </Layout>
            </HexGrid>
          </div>
        );
    }
}
