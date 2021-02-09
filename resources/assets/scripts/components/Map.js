import React, {useState, useEffect, Component} from 'react'
import ReactDOM from 'react-dom'
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern } from 'react-hexgrid';
import Tile from './Tile';
import PatternList from './PatternList'

export function MapCallback({hexList, onHexClick, gridParams}){

    const clicked = React.useRef(false)
    return(
        <div className="block w-full" onMouseDown={() => clicked.current = true} onMouseUp={() => clicked.current = false}>

            <HexGrid  width={gridParams.width} height={gridParams.height} viewBox={gridParams.viewboxParams.join(' ')}>

                <Layout size={{ x: gridParams.size, y: gridParams.size }}>
                    {
                        Object.values(hexList).map((hex, i) =>{
                            if(hex.id.x < gridParams.x && hex.id.y < gridParams.y){
                                return (
                                    <Tile
                                        ref={hex.ref}
                                        key={'r'+hex.id.x+'c'+hex.id.y}
                                        hex={{q:hex.q, s:hex.s, r:hex.r, id:hex.id}}
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
                            }
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
