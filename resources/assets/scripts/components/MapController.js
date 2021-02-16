import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import {HexUtils, Hex, GridGenerator} from 'react-hexgrid';
import {Map} from './Map'
import {circle, cone} from './Shapes'



export default function MapController({ selectedPattern, size, setTile, brushSize, load, unsetLoad}){

    const [hexList, setHexList] = useState({})
    const maxSize = React.useRef({x:80,y:80,size:10})

    useEffect(()=>{
            var hexagons = GridGenerator.orientedRectangle(size.x, size.y)
            let list = {}
            hexagons.forEach((hex, i)=>{
                let key=HexUtils.getID(hex)
                if(!hexList[key]){
                    list[key] = { hex:hex, ref:React.createRef()}
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
        let tilesList = circle(hex, brushSize-1)
        let tilesToChange = []
        tilesList.forEach((el)=>{
            if(hexList[HexUtils.getID(el)]){
                tilesToChange.push(hexList[HexUtils.getID(el)])
            }
        })

        return tilesToChange
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
            size = {size}
        />
    )
}
