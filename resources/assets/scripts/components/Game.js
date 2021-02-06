import React, {useState, useEffect} from 'react'
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

export default function Game () {

    const defaultSizes = {x:16,y:8,size:10}
    const [gridParams, setGridParams] = useState(calcGridParams(defaultSizes) )

    const characters = {
        elfSorcerer: {
                name:'elf-sorcerer',
                url:'/sorcerer-elf.png'
        },
    }

    const characterMenu = () => {
        return (
            <div  className="sub-menu menu-v w-full " >
                {
                    Object.values(characters).map((el)=>{
                        return(
                            <div  key={el.name}>
                                <p>{el.name}</p>
                                <img src={el.url} width={50} height={50} />
                                </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <GameLayout
            backgroundURL='/forest.jpg'
            content={
                <MapController
                    gridParams={gridParams}
                />
            }

            rightMenu = {
                <p></p>
                // <div className="sub-menu menu-v">
                //     <MapCRUD
                //         editable={false}
                //         hexList={hexList}
                //         gridParams={gridParams}
                //         setGridParams={(size) => setGridParams(calcGridParams(size))}
                //         setSize = {setSize}
                //     />
                // </div>
            }

            bottomMenu={
                characterMenu()
            }

            bottomLeftSpace={
                <CharacterPanel />
            }

            bottomRightSpace={
                <ActionMenu />
            }
        />
    )

}
