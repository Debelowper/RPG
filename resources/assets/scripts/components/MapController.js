import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import {HexUtils} from 'react-hexgrid';
import {Map} from './Map'

export default function MapController({ selectedPattern, gridParams, setTile}){

    const [hexList, setHexList] = useState({})

    const setHexRef = (el) =>{
        if(el){
            if(!hexList[el.props.id]){
                let list = hexList
                list[el.props.id.x + '-' + el.props.id.y] = el
                setHexList(list)
            }
        }
    }

    const onHexClick = (hex) => {
        setTile(getTilesToChange, changeChildPattern, hex)
    }

    const getTilesToChange = (hex, brushSize) => {

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
        return tiles
    }

    const  changeChildPattern = (tiles, selectedPattern) => {
        tiles.forEach((el)=>{
            el.changePattern(selectedPattern)
        })
    }

    return (
        <Map
            setHexRefs = {setHexRef}
            onHexClick = {onHexClick}
            gridParams = {gridParams}
        />
    )
}
