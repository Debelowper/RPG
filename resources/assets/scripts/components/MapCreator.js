import React, {useState, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom'
import SizeMenu from './SizeMenu'
import TilesMenu from './TilesMenu'
import axios from 'axios'
import MapCRUD from './MapCRUD'
import GameLayout from './GameLayout'
import BrushSizeMenu from './BrushSizeMenu'
import MapController from './MapController'
import StructureMenu from './StructureMenu'
import CharacterMenu from './CharacterMenu'
import {HexUtils} from 'react-hexgrid'

export default function MapCreator(){

    const defaultSizes = {x:16,y:8,size:3}

    const [selectedPattern, setSelectedPattern] = useState('')
    const [brushSize, setBrushSize] = useState(1)
    const [size, setSize] = useState(defaultSizes)
    const [currentSize, setCurrentSize] = useState(defaultSizes)
    const [patternType, setPatternType] = useState('tile')

    const tiles = useRef({})
    const structures = useRef({})
    const [load, setLoad] = useState(null)

    const setTile = (getter, setter, hex) => {
        let tilesToChange = getter({target:hex.hex, size:brushSize})
        let list = {}
        tilesToChange.forEach((el)=>{
            let tile = el.ref.current.props
            list[HexUtils.getID(el.hex)] = {hex: hex, pattern: selectedPattern.id}
        })

        switch (patternType){
            case 'tile': tiles.current = {...tiles.current, ...list}; break;
            case 'structure': structures.current = {...structures.current, ...list}; break;
        }

        setter(tilesToChange, selectedPattern.id, patternType)
    }

    const loadIntoMap = async (data) => {

        let map = JSON.parse(data.map_json)
        const {width, height, name} = data

        await setSize({x:width, y:height, size:size.size})
        await setCurrentSize({x:width, y:height, size:size.size})

        structures.current = map.structure
        tiles.current = map.tile

        setLoad(data)
    }

    return(
        <GameLayout
            backgroundURL='/forest.jpg'
            content={
                <MapController
                    selectedPattern={selectedPattern}
                    load={load}
                    unsetLoad = {() => setLoad(null)}
                    size={currentSize}
                    setTile = {setTile}
                />
            }

            rightTopSpace = {
                <SizeMenu  size={size} setSize={setSize} setCurrentSize={() => setCurrentSize(size)}  />
            }

            rightBottomSpace={
                <BrushSizeMenu
                    selectBrushSize={(e) => setBrushSize(e.target.value)}
                    brushSize={brushSize}
                />
            }
            rightMenu = {
                <MapCRUD
                    editable={true}
                    mapToSave={{structures:structures, tiles:tiles}}
                    loadIntoMap = {loadIntoMap}
                    size={currentSize}
                    setSize = {setCurrentSize}
                />
            }
            bottomMenu={
                <div className="flex flex-row" >
                    <div className="sub-menu menu-v">
                        <button className='btn-primary' onClick={() => setPatternType('tile')} >Tile</button>
                        <button className='btn-primary' onClick={() => setPatternType('structure')} >structure</button>
                        {/* <button className='btn-primary' onClick={() => setPatternType('character')} >character</button> */}
                    </div>
                    {patternType == 'tile' ? <TilesMenu onMenuClick={(tile) => setSelectedPattern(tile) } selectedPattern={selectedPattern} /> : null}
                    {patternType == 'structure' ? <StructureMenu onMenuClick={(struct) => setSelectedPattern(struct) } selectedPattern={selectedPattern} /> : null}
                    {/* {patternType == 'character' ? <CharacterMenu onMenuClick={(character) => setSelectedPattern(character) } selectedPattern={selectedPattern} /> : ''} */}
                </div>
            }
        />
    )

}
