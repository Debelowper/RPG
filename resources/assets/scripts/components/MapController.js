import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import {HexUtils} from 'react-hexgrid';
import {Map} from './Map'
import {calcGridParams} from './Helpers'
import {GridGenerator} from 'react-hexgrid';

export default function MapController({ selectedPattern, size, setTile, brushSize, load, unsetLoad}){

    const [hexList, setHexList] = useState({})
    const maxSize = React.useRef({x:80,y:80,size:10})

    useEffect(()=>{
            let gridParams = calcGridParams(size)

            var hexagons = GridGenerator.orientedRectangle(gridParams.x, gridParams.y)
            let list = {}
            hexagons.forEach((hex, i)=>{
                hex.id = {x:hex.q , y: i % gridParams.y}
                let key= hex.id.x+'-'+hex.id.y
                if(!hexList[key]){
                    list[key] = {q:hex.q, s:hex.s, r:hex.r, id:hex.id, ref:React.createRef()}
                }
            })
            setHexList({...hexList, ...list})
    }, [JSON.stringify(size)])

    useEffect(()=>{
        if(load){
            let data = Object.entries(JSON.parse(load.map_json))
            data.forEach((arr) => {
                let key = arr[0]
                Object.entries(arr[1]).forEach((el)=>{
                    changeChildPattern([ hexList[ el[0] ] ], el[1].pattern, key)
                })
            })
            unsetLoad()
        }
    }, [load])



    const onHexClick = React.useCallback ((hex) => {
        setTile(getTilesToChange, changeChildPattern, hex)
    },[getTilesToChange, changeChildPattern, hexList, brushSize, selectedPattern, setTile])


    const getTilesToChange = React.useCallback((hex) => {
        let brush = parseInt(brushSize)
        let tilesArray = Object.values(hexList)
        let tiles = tilesArray.filter(el=>{
            if((Math.abs(hex.id.x - el.id.x) < 4) && (Math.abs(hex.id.y - el.id.y) < 4) ){
                return (
                    HexUtils.distance(hex, el) < brush
                )
            } else{
                return false
            }
        })
        return tiles
    }, [brushSize, hexList])



    const  changeChildPattern = React.useCallback((tiles, selectedPattern, type) => {
        tiles.forEach((el)=>{
            el.ref.current.changePattern(selectedPattern, type)
        })
    },[selectedPattern])



    return (
        <Map
            hexList = {hexList}
            onHexClick = {onHexClick}
            gridParams = {calcGridParams(size)}
        />
    )
}
