import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern } from 'react-hexgrid';
import Tile from './Tile';
import PatternList from './PatternList'

export default function({selectedPattern, setHexRefs, layoutRef, changeChildPattern, gridParams, rightMenu, bottomMenu, sizeMenu}){

    const [clicked, setClicked] = useState(false)

    var hexagons = GridGenerator.orientedRectangle(gridParams.x, gridParams.y)

    return(
        <div className="block w-full" onMouseDown={() => setClicked(true)} onMouseUp={() => setClicked(false)}>
            <HexGrid  width={gridParams.width} height={gridParams.height} viewBox={gridParams.viewboxParams.join(' ')}>
                <Layout  ref={layoutRef} size={{ x: gridParams.size, y: gridParams.size }}>
                    {
                        hexagons.map((hex, i) =>{
                            hex.id = {x:hex.q , y: i % gridParams.y}
                            return(
                                <Tile
                                    ref={setHexRefs}
                                    key={'r'+hex.id.x+'c'+hex.id.y}
                                    hex={hex}
                                    id={hex.id}
                                    onHexClick={(id) => {
                                        changeChildPattern(id, selectedPattern)
                                    }}
                                    onHexHover={(id) => {
                                        if(clicked){
                                            changeChildPattern(id, selectedPattern)
                                        }
                                    }}
                                />
                            )
                        })
                    }
                </Layout>
                <PatternList />
            </HexGrid>
        </div>

    )
}
