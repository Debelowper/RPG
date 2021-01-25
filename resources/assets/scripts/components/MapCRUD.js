import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import MapMenu from './MapMenu'

export default function MapCRUD({hexList, gridParams, selectBrushSize, brushSize, setGridParams, setSize}){

    const [mapList, setMapList] = useState('')

    useEffect(
        async () =>{
            setMapList((await getMapList()).data )
        },
        [mapList.length]
    )

    const saveMap = (selectedMap) => {
        var hexes = hexList.map(el => {
            return {id: el.props.id, pattern:el.state.pattern}
        })

        let width = gridParams.x
        let height = gridParams.y

        let saveObj = {
            width: width,
            height:height,
            name: selectedMap,
            hexes: hexes
        }

        if(confirm('Are you sure you want to save under name: '+selectedMap+ '?')){
            axios.post('/Map/save', saveObj).then(async (response) => {
                setMapList((await getMapList()).data )
            })
        }
    }

    const loadMap = (selectedMap) => {
        let url = '/Map/load?name=' + selectedMap
        if(confirm('Are you sure you want to load save: '+selectedMap+ '?')){
            axios.get(url).then(async (response) => {

                let map = JSON.parse(response.data.map_json)
                const {width, height, name} = response.data

                await setGridParams({x:width, y:height, size:10})
                await setSize({x:width, y:height, size:10})

                hexList.forEach(el => {
                    let hex = map.find((id) =>{
                        return id.id.x == el.props.id.x && id.id.y == el.props.id.y
                    })

                    el.changePattern(hex.pattern)
                })

            })
        }
    }

    const deleteMap = (selectedMap) => {
        let url = '/Map/delete?name=' + selectedMap
        if(confirm('Are you sure you want to delete save: '+selectedMap+ '?')){
            axios.get(url).then(async (response) => {
                setMapList((await getMapList()).data )
            })
        }
    }


    return (
      <MapMenu
          saveMap={(selectedMap) => saveMap(selectedMap, hexList, gridParams, setMapList)}
          loadMap={(selectedMap) => loadMap(selectedMap, hexList, setGridParams)}
          deleteMap={(selectedMap) => deleteMap(selectedMap, setMapList)}
          mapList={mapList}
          selectBrushSize={selectBrushSize}
          brushSize={brushSize}
      />
    )
}

async function getMapList(){
    return await axios.get('/Map/list')
}
