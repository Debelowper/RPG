import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import ResourceMenu from './ResourceMenu'

export default function MapCRUD({mapToSave, size, loadIntoMap, setSize, editable}){

    const [mapList, setMapList] = useState('')

    useEffect(
        async () =>{
            setMapList((await getMapList()).data )
        },
        [mapList.length]
    )

    const saveMap = (selectedMap) => {

        let width = size.x
        let height = size.y

        let hexes = {tile: mapToSave.tiles.current, structure: mapToSave.structures.current}

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
            axios.get(url).then((response) => {
                loadIntoMap(response.data)

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
      <ResourceMenu
          editable = {editable}
          saveResource={(selectedMap) => saveMap(selectedMap)}
          loadResource={(selectedMap) => loadMap(selectedMap)}
          deleteResource={(selectedMap) => deleteMap(selectedMap)}
          resourceList={mapList}
      />
    )
}

async function getMapList(){
    return await axios.get('/Map/list')
}
