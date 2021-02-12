import React, {useState, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom'
import {Map} from './Map'
import SizeMenu from './SizeMenu'
import TilesMenu from './TilesMenu'
import axios from 'axios'
import MapCRUD from './MapCRUD'
import {calcGridParams} from './Helpers'
import GameLayout from './GameLayout'
import BrushSizeMenu from './BrushSizeMenu'
import MapController from './MapController'
import CharacterPanel from './CharacterPanel'
import ActionController from './Actions/ActionController'
import {HexUtils} from 'react-hexgrid';
import TurnMenu from './TurnMenu'
import CharacterMenu from './CharacterMenu'

export default function Game () {

    const defaultSizes = {x:16,y:8,size:10}
    const [size, setSize] = useState(defaultSizes)
    const [selectedCharacter, setSelectedCharacter] = useState('')
    const [selectedAction, setSelectedAction] = useState('')
    const [currentCharacter, setCurrentCharacter] = useState('')
    const [load, setLoad] = useState(null)

    const tiles = useRef({})
    const structures = useRef({})

    const [tilesList, setTilesList] = useState([])
    const [structuresList, setStructuresList] = useState([])
    const [charactersList, setCharactersList] = useState([])

    const [turn, setTurn] = useState(0)

    const [isYourTurn, setIsYourTurn] = useState(false)
    const [actionFunction, setActionFunction] = useState()
    const [action, setAction] = useState([])

    const roll = (max, min = 1) => {
          return Math.floor(Math.random() * (max - min) ) + min;
    }

    useEffect(()=>{
        let refreshedList = {}
        Object.values(charactersList).forEach((el)=>{
            refreshedList[el.name] = {...el, speed:100}
        })
        setCharactersList(refreshedList)
        // setCurrentCharacter({...currentCharacter, speed:100})
    }, [turn])

    useEffect(()=>{
        if(action.length != 0){
            action.forEach((el) => {
                characterReducer(el.action)
            })
            setAction([])
        }
    }, [JSON.stringify(action)])

    const characterReducer = (action) => {
        let newChars = action
        setCharactersList({...charactersList, ...action })
    }

    const loadIntoMap = async (data) => {

        let map = JSON.parse(data.map_json)
        const {width, height, name} = data

        await setSize({x:width, y:height, size:10})

        structures.current = map.structure
        tiles.current = map.tile

        setTilesList((await loadTilesList(map.tile)).data)
        setLoad(data)
    }

    const loadTilesList = async (map) => {
        let tileList = []
        Object.values(map).forEach((el)=>{
            if(!tileList.find((i) => i == el.pattern)){
                tileList.push(el.pattern)
            }
        })

        return await axios.post('Tile/load', {tileIDs:tileList})
    }

    return (
        <GameLayout
            backgroundURL='/forest.jpg'
            content={
                <MapController
                    size={size}
                    setTile={actionFunction}
                    selectedPattern={currentCharacter}
                    brushSize={1}
                    load={load}
                    unsetLoad = {() => setLoad(null)}
                />
            }

            rightMenu = {
                <div className="menu-v">
                    <TurnMenu
                        turn={turn} setTurn={setTurn}
                        isYourTurn={isYourTurn} setIsYourTurn={setIsYourTurn}
                        roll={roll}
                        characters={charactersList}
                        currentCharacter={currentCharacter}
                        setAction={setAction}
                    />

                    <div className="sub-menu menu-v">
                        <MapCRUD
                            editable={false}
                            loadIntoMap = {loadIntoMap}
                            mapToSave={{structures:structures, tiles:tiles}}
                            size={size}
                            setSize = {setSize}
                        />
                    </div>
                </div>
            }

            bottomMenu={
                <CharacterMenu
                    currentCharacter={currentCharacter}
                    setCurrentCharacter={setCurrentCharacter}
                    setSelectedCharacter={setSelectedCharacter}
                    charactersList={charactersList}
                    isYourTurn={isYourTurn}
                    setAction={setAction}
                    setActionFunction={setActionFunction}
                />
            }

            bottomLeftSpace={
                <CharacterPanel />
            }

            bottomRightSpace={
                <ActionController
                    setSelectedAction={setSelectedAction}
                    selectedAction={selectedAction}
                    characters={charactersList}
                    structures={structuresList}
                    tiles={tilesList}
                    currentCharacter={currentCharacter}
                    setActionFunction={setActionFunction}
                    setAction={setAction}
                    inCombat={turn > 0 ? true : false}
                    isYourTurn={isYourTurn}
                />
            }
        />
    )
}
