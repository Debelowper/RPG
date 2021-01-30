import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import {Map} from './Map'
import SizeMenu from './SizeMenu'
import TilesMenu from './TilesMenu'
import axios from 'axios'
import MapCRUD from './MapCRUD'
import {calcGridParams} from './Helpers'
import GameLayout from './GameLayout'
import BrushSizeMenu from './BrushSizeMenu'
import {HexUtils} from 'react-hexgrid';

export default function MapCreator(){

    const defaultSizes = {x:16,y:8,size:10}

    const [selectedPattern, setSelectedPattern] = useState('')
    const [brushSize, setBrushSize] = useState(1)
    const [mapList, setMapList] = useState([])
    const [selectedMap, setSelectedMap] = useState('')
    const [gridParams, setGridParams] = useState(calcGridParams(defaultSizes) )
    const [hexList, setHexList] = useState({})
    const [size, setSize] = useState(defaultSizes)


    const setHexRef = (el) =>{
        if(el){
            if(!hexList[el.props.id]){
                let list = hexList
                list[el.props.id.x + '-' + el.props.id.y] = el
                setHexList(list)
            }
        }
    }

    const  changeChildPattern = React.useCallback(
        (hex) => {
            let brush = parseInt(brushSize)

            let tilesArray = Object.values(hexList)
            let tiles = tilesArray.filter(el=>{
                if((Math.abs(hex.id.x - el.props.hex.id.x) < 4) && (Math.abs(hex.id.y - el.props.hex.id.y) < 4) ){
                    return (
                        HexUtils.distance(hex, el.props.hex) < brush
                    )
                } else{
                    return false
                }
            })
            tiles.forEach((el)=>{
                el.changePattern(selectedPattern)
            })
        }, [selectedPattern, brushSize]
    )





    return (
        <GameLayout
            backgroundURL='/forest.jpg'
            content={
                <Map
                    setHexRefs = {setHexRef}
                    selectedPattern= {selectedPattern}
                    changeChildPattern = {changeChildPattern}
                    gridParams = {gridParams}
                />
            }
            rightMenu = {
                <div className="overflow-y-auto">
                    <div className="sub-menu menu-h">
                        <SizeMenu  size={size} setSize={setSize} changeGridParams={() => setGridParams(calcGridParams(size))}  />
                    </div>
                    <div className="sub-menu menu-v">
                        <MapCRUD
                            hexList={hexList}
                            gridParams={gridParams}
                            setGridParams={(size) => setGridParams(calcGridParams(size))}
                            setSize = {setSize}
                        />
                    </div>
                    <div className="sub-menu menu-v">
                        <BrushSizeMenu
                            selectBrushSize={(e) => setBrushSize(e.target.value)}
                            brushSize={brushSize}
                        />
                    </div>
                </div>
            }

            bottomMenu={
                <TilesMenu onMenuClick={(e) => setSelectedPattern(e.target.name) } selectedPattern={selectedPattern} />
            }
        />
    )
}
