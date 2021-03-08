import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import {HexUtils, Hex, GridGenerator} from 'react-hexgrid';
import {Map} from './Map'
import {circle, line, cone, ring, rectangle} from './Shapes'

export default function MapController({ visibleTiles={}, selectedPattern, size, setTile, load, unsetLoad}){

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

    useEffect(()=>{
        setTileVisibilities()
    }, [JSON.stringify(visibleTiles)])


    const onHexClick = React.useCallback ((hex) => {
        setTile(getTilesToChange, changeChildPattern, hex)
    },[getTilesToChange, changeChildPattern, hexList, selectedPattern, setTile])


    const getTilesToChange = React.useCallback(({target, shape='circle', size=1, start, angle}) => {

        let tilesList
        switch(shape){
            case 'circle':
                tilesList = circle(target, size-1)
                break
            case 'ring':
                tilesList = ring(target, size-1)
                break
            case 'line':
                tilesList = line(start, target)
                break
            case 'cone':
                tilesList = cone(start, target, angle)
                break
        }
        let tilesToChange = []
        tilesList.forEach((el)=>{
            if(hexList[HexUtils.getID(el)]){
                tilesToChange.push(hexList[HexUtils.getID(el)])
            }
        })

        return tilesToChange
    }, [ hexList])


    const  changeChildPattern = React.useCallback((tiles, selectedPattern, type) => {
        tiles.forEach((el)=>{
            el.ref.current.changePattern(selectedPattern, type)
        })
    },[selectedPattern])

    const setTileVisibilities = () => {
        if(Object.keys(visibleTiles).length > 0){
            Object.entries(hexList).forEach(arr=>{
                if(visibleTiles[arr[0]]){
                    arr[1].ref.current.setVisibility(true)
                }else{
                    arr[1].ref.current.setVisibility(false)
                }
            })
        }
    }


    return (
        <Map
            hexList= {hexList}
            onHexClick = {onHexClick}
            size={size}
        />
    )
}
