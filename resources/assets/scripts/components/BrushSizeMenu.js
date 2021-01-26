import React from 'react'
import ReactDOM from 'react-dom'

export default function BrushSizeMenu({brushSize, selectBrushSize}){
    return(
        <div>
            <h3>Brush Size</h3>
            <div className="flex flex-row py-2">
                <button className={'input ' + (brushSize == 1 ? 'bg-white text-black ' : 'bg-gray-900 text-white')} onClick={selectBrushSize} value={1}>1</button>
                <button className={'input ' + (brushSize == 2 ? 'bg-white text-black ' : 'bg-gray-900 text-white')} onClick={selectBrushSize} value={2}>2</button>
                <button className={'input ' + (brushSize == 3 ? 'bg-white text-black ' : 'bg-gray-900 text-white')} onClick={selectBrushSize} value={3}>3</button>
                <button className={'input ' + (brushSize == 4 ? 'bg-white text-black ' : 'bg-gray-900 text-white')} onClick={selectBrushSize} value={4}>4</button>
            </div>
        </div>
    )
}
