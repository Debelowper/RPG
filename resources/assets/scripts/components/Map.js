import React, {useState, useEffect, Component} from 'react'
import ReactDOM from 'react-dom'
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern } from 'react-hexgrid';
import Tile from './Tile';
import PatternList from './PatternList'

export function MapCallback({ setHexRefs, onHexClick, gridParams}){

    const clicked = React.useRef(false)

    var hexagons = GridGenerator.orientedRectangle(gridParams.x, gridParams.y)

    return(
        <div className="block w-full" onMouseDown={() => clicked.current = true} onMouseUp={() => clicked.current = false}>
            <HexGrid  width={gridParams.width} height={gridParams.height} viewBox={gridParams.viewboxParams.join(' ')}>
                <Layout size={{ x: gridParams.size, y: gridParams.size }}>
                    {
                        hexagons.map((hex, i) =>{
                            hex.id = {x:hex.q , y: i % gridParams.y}
                            return (
                                <Tile
                                    ref={setHexRefs}
                                    key={'r'+hex.id.x+'c'+hex.id.y}
                                    hex={hex}
                                    id={hex.id}
                                    onHexClick={
                                        onHexClick
                                    }
                                    onHexHover={() =>{
                                        if(clicked.current){
                                            onHexClick(hex)
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

export const Map = React.memo(MapCallback, (prevProps, props) => {
    if(JSON.stringify(props.gridParams) != JSON.stringify(prevProps.gridParams)  ||
        prevProps.onHexClick != props.onHexClick
){
        return false
    }else{
        return true
    }
})
