import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Map from './Map'
import SizeMenu from './SizeMenu'
import TilesMenu from './TilesMenu'
import axios from 'axios'
import MapCRUD from './MapCRUD'
import {calcGridParams} from './Helpers'

export default function MapCreator(){

    const [selectedPattern, setSelectedPattern] = useState('')
    const [brushSize, setBrushSize] = useState(1)
    const [mapList, setMapList] = useState([])
    const [selectedMap, setSelectedMap] = useState('')
    const [gridParams, setGridParams] = useState(calcGridParams(10,8,10) )
    const [hexList, setHexList] = useState([])

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
          <div className="flex h-screen w-full" >
              <Map
                  selectedPattern={selectedPattern}

                  setHexRefs = {setHexRef}

                  hexList = {hexList}
                  layoutRef = {layoutRef}
                  brushSize={brushSize}
                  changeChildPattern = {(id, pattern) => changeChildPattern(id, pattern, hexList, brushSize)}
                  gridParams = {gridParams}

                  rightMenu = {
                      <MapCRUD
                          hexList={hexList}
                          gridParams={gridParams}
                          selectBrushSize={(e) => setBrushSize(e.target.value)}
                          brushSize={brushSize}
                          setGridParams={(width, height, size) => setGridParams(calcGridParams(width, height, size))}
                      />
                  }
                  bottomMenu = {
                      <div className='flex fixed inset-x-0 bottom-0 z-10 bg-gray-700 border-2 border-red-700 py-3 h-24 w-screen px-2 space-x-2'>
                          <TilesMenu onMenuClick={(e) => setSelectedPattern(e.target.name) } selectedPattern={selectedPattern} />
                      </div>
                  }
                  sizeMenu = {
                      <SizeMenu changeGridParams={(width, height, size) => setGridParams(calcGridParams(width, height, size))}  />
                  }
              />
          </div>
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
