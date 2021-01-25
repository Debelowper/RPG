import React, { useState} from 'react'
import ReactDOM from 'react-dom'

export default function MapMenu({loadMap, deleteMap, saveMap, mapList, brushSize, selectBrushSize}){

    const [selectedMap, setSelectedMap] = useState('')

    return(
        <>
            <label className="text-white" >Map name</label>
            <input  className="mx-1 py-2 mb-2  rounded" type="text" name={'mapName'}  onChange={(e)=>setSelectedMap(e.target.value)} value={selectedMap}></input>
            <button onClick={() => loadMap(selectedMap)} className="btn-primary mx-2" >Load Map</button>
            <button onClick={() =>deleteMap(selectedMap)} className="btn-primary mx-2" >Delete Map</button>
            <button onClick={() => saveMap(selectedMap)} className="btn-primary mx-2" >Save Map</button>
            <div className="flex justify-center">
                <ol >
                    {
                        mapList ?
                            mapList.map((el) => {
                                return(
                                    <li
                                        id={el.name} key={el.name} >
                                        <button
                                            onClick={(e) => setSelectedMap(e.target.name)}
                                            name={el.name}
                                        className="bg-gray-100 hover:bg-blue-300 border-2 border-red-500 py-2 px-4 rounded">
                                            {el.name}
                                        </button>
                                    </li>
                                )
                            })
                        : ' '
                    }
                </ol>
            </div>
            <div>
                <h3>Brush Size</h3>
                <div className="flex flex-row py-2">
                    <button className={'input ' + (brushSize == 1 ? 'bg-white text-black ' : 'bg-gray-900 text-white')} onClick={selectBrushSize} value={1}>1</button>
                    <button className={'input ' + (brushSize == 2 ? 'bg-white text-black ' : 'bg-gray-900 text-white')} onClick={selectBrushSize} value={2}>2</button>
                    <button className={'input ' + (brushSize == 3 ? 'bg-white text-black ' : 'bg-gray-900 text-white')} onClick={selectBrushSize} value={3}>3</button>
                    <button className={'input ' + (brushSize == 4 ? 'bg-white text-black ' : 'bg-gray-900 text-white')} onClick={selectBrushSize} value={4}>4</button>
                </div>
            </div>
        </>
    )
}
