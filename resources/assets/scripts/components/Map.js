import React, {useState, useEffect, Component} from 'react'
import ReactDOM from 'react-dom'
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern, HexUtils } from 'react-hexgrid';
import Tile from './Tile';
import PatternList from './PatternList'

export function MapCallback({hexList, onHexClick, size}){

    const [gridParams, setGridParams] = useState(calcGridParams(size))

    useEffect(()=>{
        setGridParams(calcGridParams(size))
    }, [JSON.stringify(size)])

    const clicked = React.useRef(false)
    return(
        <div className="flex flex-grow" onMouseDown={() => clicked.current = true} onMouseUp={() => clicked.current = false}>

            <HexGrid  width={gridParams.width} height={gridParams.height} viewBox={gridParams.viewboxParams.join(' ')}>

                <Layout size={{ x: gridParams.size, y: gridParams.size }}  >
                    {
                        Object.values(hexList).map((hex, i) =>{
                            let id = HexUtils.getID(hex.hex)
                            if(hex.hex.q < gridParams.x && ( hex.hex.r - hex.hex.s)/2 < gridParams.y){
                                return (
                                    <Tile
                                        ref={hex.ref}
                                        key={id}
                                        hex={hex.hex}
                                        id={id}
                                        onHexClick={onHexClick}
                                        clicked={clicked}
                                        gridParams={gridParams}

                                    />
                                )
                            }
                        })
                    }
                </Layout>
                <PatternList size={{x:gridParams.size, y:gridParams.size}}/>
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

function calcGridParams ({x, y, size}) {

    let kx = 1.5 *size
    let ky = Math.sqrt(3)*size

    let spacesX = (kx*x + kx/2)
    let spacesY = (ky*y + ky/2)

    var viewboxParams = [-size, -size*Math.sqrt(3)/2, spacesX, spacesY]

    let width = (kx*x + kx/2) + 'vw'
    let height = (ky*y + ky/2) + 'vw'

    return {
        x:x,
        y: y,
        width:width ,
        height:height,
        size:size,
        viewboxParams: viewboxParams
    }
}
