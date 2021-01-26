import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Map from './Map'
import SizeMenu from './SizeMenu'
import TilesMenu from './TilesMenu'
import axios from 'axios'
import MapCRUD from './MapCRUD'
import {calcGridParams} from './Helpers'
import GameLayout from './GameLayout'
import BrushSizeMenu from './BrushSizeMenu'

export default function MapCreator(){

    const defaultSizes = {x:10,y:8,size:10}

    const [selectedPattern, setSelectedPattern] = useState('')
    const [brushSize, setBrushSize] = useState(1)
    const [mapList, setMapList] = useState([])
    const [selectedMap, setSelectedMap] = useState('')
    const [gridParams, setGridParams] = useState(calcGridParams(defaultSizes) )
    const [hexList, setHexList] = useState([])
    const [size, setSize] = useState(defaultSizes)

    const layoutRef = React.createRef()

    useEffect(
        ()=>{
            clearLeftoverHexes(hexList, layoutRef, setHexList)
        },
        [gridParams]
    )

    const setHexRef = (el) =>{
        if(el){
            if(!hexList.find(i => i.props.id.x == el.props.id.x && i.props.id.y == el.props.id.y)){
                let list = hexList
                list.push(el)
                setHexList(list)
            }
        }
    }

    return (
        <GameLayout
            content={
                <Map
                    selectedPattern={selectedPattern}
                    setHexRefs = {setHexRef}
                    hexList = {hexList}
                    layoutRef = {layoutRef}
                    brushSize={brushSize}
                    changeChildPattern = {(id, pattern) => changeChildPattern(id, pattern, hexList, brushSize)}
                    gridParams = {gridParams}

                />
            }
            rightMenu = {
                <div>
                    <div className="flex flex-row flex-wrap space-x-2 py-3">
                        <SizeMenu  size={size} setSize={setSize} changeGridParams={() => setGridParams(calcGridParams(size))}  />
                    </div>
                    <div className="flex flex-col place-items-center space-y-2">
                        <MapCRUD
                            hexList={hexList}
                            gridParams={gridParams}
                            setGridParams={(size) => setGridParams(calcGridParams(size))}
                            setSize = {setSize}
                        />
                    </div>
                    <div>
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

function changeChildPattern (id, pattern, hexList, brush){
    let brushSize = parseInt(brush)
    let x = id.x + brushSize
    let y = id.y + brushSize
    let tiles = hexList.filter(el=>{
        return (
            el.props.id.x >= id.x
            && el.props.id.y >= id.y
            && el.props.id.x < x
            && el.props.id.y < y
        )
    })
    tiles.forEach((el)=>{
        el.changePattern(pattern)
    })
}

function clearLeftoverHexes (hexList, layoutRef, setHexList) {
    let list = hexList
    list = list.map(el => {
        if(layoutRef.current.props.children.find(i => el.props.id.x == i.props.id.x && el.props.id.y == i.props.id.y)){
            return el
        }else{
            return null
        }
    })
     setHexList(list.filter(el => el != null))
}
