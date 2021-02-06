import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import SizeMenu from './SizeMenu'
import TilesMenu from './TilesMenu'
import axios from 'axios'
import MapCRUD from './MapCRUD'
import {calcGridParams} from './Helpers'
import GameLayout from './GameLayout'
import BrushSizeMenu from './BrushSizeMenu'
import MapController from './MapController'


export default function MapCreator(){

    const defaultSizes = {x:16,y:8,size:10}

    const [selectedPattern, setSelectedPattern] = useState('')
    const [brushSize, setBrushSize] = useState(1)
    const [size, setSize] = useState(defaultSizes)
    const [gridParams, setGridParams] = useState(calcGridParams(size) )

    const [tiles, setTiles] = useState({})
    const [structures, setStructures] = useState({})

    const placeTile = (getter, setter, hex) => {
        let tilesToChange = getter(hex, brushSize)
        let list = {}
        tilesToChange.forEach((el)=>{
            list[el.props.id.x+'-'+el.props.id.y] = {hex: el.props.id, pattern: selectedPattern.id}
        })

        setTiles({...tiles, ...list})

        setter(tilesToChange, selectedPattern.image_id)
    }

    const placeStructure = (getter, setter, hex) => {
        let tilesToChange = getter(hex, brushSize)
        let list = {}
        tilesToChange.forEach((el)=>{
            list[el.props.id.x+'-'+el.props.id.y] = {hex: el.props.id, pattern: selectedPattern.id}
        })

        setStructures({...tiles, ...list})

        setter(tilesToChange, selectedPattern.image_id)
    }

    return(
        <GameLayout
            backgroundURL='/forest.jpg'
            content={
                <MapController
                    selectedPattern={selectedPattern}
                    brushSize={brushSize}
                    gridParams={gridParams}
                    setTile = {placeTile}
                />
            }

            rightTopSpace = {
                <SizeMenu  size={size} setSize={setSize} changeGridParams={() => setGridParams(calcGridParams(size))}  />
            }

            rightBottomSpace={
                <BrushSizeMenu
                    selectBrushSize={(e) => setBrushSize(e.target.value)}
                    brushSize={brushSize}
                />
            }
            rightMenu = {
                <MapCRUD
                    editable={true}
                    // hexList={hexList}
                    gridParams={gridParams}
                    setGridParams={(size) => setGridParams(calcGridParams(size))}
                    setSize = {setSize}
                />
            }

            bottomMenu={
                <TilesMenu onMenuClick={(tile) => setSelectedPattern(tile) } selectedPattern={selectedPattern} />
            }
        />
    )

}
