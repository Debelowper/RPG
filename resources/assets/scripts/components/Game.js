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
import ActionMenu from './ActionMenu'
import {HexUtils} from 'react-hexgrid';

export default function Game () {

    const defaultSizes = {x:16,y:8,size:10}
    const [size, setSize] = useState(defaultSizes)
    const [selectedCharacter, setSelectedCharacter] = useState('')
    const [selectedAction, setSelectedAction] = useState('')
    const [currentCharacter, setCurrentCharacter] = useState({name:'', currentHex:{}})

    const tiles = useRef({})
    const structures = useRef({})
    const [load, setLoad] = useState(null)

    const [turn, setTurn] = useState(0)

    const characters = {
        elfSorcerer: {
                name:'elfSorcerer',
                url:'/sorcerer-elf.png',
                speed:{speedLeft: 1, walk:30, fly:0, swim:10, climb:10}

        },
    }

    const characterMenu = () => {
        return (
            <div  className="sub-menu menu-v w-full " >
                {
                    Object.values(characters).map((el)=>{
                        return(
                            <div  key={el.name} >
                                <p>{el.name}</p>
                                <img src={el.url} width={50} height={50} onClick={() => {setCurrentCharacter({...el, currentHex:{}}); setSelectedCharacter(el.name)  }} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const roll = (max, min = 1) => {
          return Math.floor(Math.random() * (max - min) ) + min;
    }

    const renderTurnMenu = () => {
        return(
            <div>
                <h1>Turn Counter</h1>
                <div className="flex flex-row">
                    <button className="btn-primary" onClick={ () => setTurn(turn+1) }>
                        {turn == 0 ? 'Roll Initiative' : 'Next Turn'}
                    </button>
                    <button className="btn-primary" onClick={()=> setTurn(0)}>
                        Stop
                    </button>

                </div>
            </div>
        )
    }

    useEffect(()=>{
        setCurrentCharacter({...currentCharacter, speed:{...currentCharacter.speed, speedLeft:1}})
    }, [turn])

    const action = () => {
        switch(selectedAction.name){
            case 'move':
                return moveCharacter
                break
            default:
                return ()=>console.log('nothing selected')
        }
    }

    const moveCharacter = (getter, setter, hex) => {
        console.log(currentCharacter.speed.speedLeft)
        let tilesToChange
        let option = selectedAction.option
        if(Object.values(currentCharacter.currentHex).length != 0 ){
            let neighbours = HexUtils.neighbours(currentCharacter.currentHex)
            let destID = HexUtils.getID(hex)
            neighbours.forEach((el)=>{
                if(HexUtils.getID(el) == destID ){
                    let tileSize = 5;
                    let mult = 1
                    let speed = currentCharacter.speed

                    if(speed.speedLeft >= tileSize/(mult*speed[option]) ){
                        setCurrentCharacter({...currentCharacter, currentHex:hex, speed: {...speed, speedLeft: speed.speedLeft - tileSize/(mult*speed[option])  } })


                        tilesToChange = getter(currentCharacter.currentHex, '1')
                        setter(tilesToChange, '', 'character')

                        tilesToChange = getter(hex, '1')
                        setter(tilesToChange, currentCharacter.name, 'character')
                    }
                }
            })
        }else{
            tilesToChange = getter(hex, '1')
            setCurrentCharacter({...currentCharacter, currentHex:hex})
            setter(tilesToChange, currentCharacter.name, 'character')
        }
    }

    const loadIntoMap = async (data) => {

        let map = JSON.parse(data.map_json)
        const {width, height, name} = data

        await setSize({x:width, y:height, size:10})

        structures.current = map.structure
        tiles.current = map.tile

        setLoad(data)
    }


    return (
        <GameLayout
            backgroundURL='/forest.jpg'
            content={
                <MapController
                    size={size}
                    setTile={action()}
                    selectedPattern={selectedCharacter}
                    brushSize={1}
                    load={load}
                    unsetLoad = {() => setLoad(null)}
                />
            }

            rightMenu = {
                <div className="menu-v">
                    {renderTurnMenu()}
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
                characterMenu()
            }

            bottomLeftSpace={
                <CharacterPanel />
            }

            bottomRightSpace={
                <ActionMenu setSelectedAction={setSelectedAction} selectedAction={selectedAction} />
            }
        />
    )

}
