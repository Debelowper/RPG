import React, {useState, useEffect} from 'react'
import { Pattern } from 'react-hexgrid';
import axios from 'axios'

async function loadTiles(){
    return await axios.get('Tile/loadUser')
}

export default function PatternList({size}){
    const [tiles, setTiles] =useState([])
    
    useEffect(
        async () =>{
            setTiles((await loadTiles()).data)
        },
        [JSON.stringify(tiles)]
    )

    return (
        <>
            {
                tiles.map( (el, i)=>{
                    return <Pattern key={i} id={'tile-'+ el.id.toString()} link={el.url} size={size} />
                })
            }

            <Pattern key={'elfSorcerer'} id={'character-elfSorcerer'} link={'./sorcerer-elf.png'} size={size} />
            <Pattern key={'draugr'} id={'character-draugr'} link={'./draugr.png'} size={size} />
            <Pattern key={'watchtower'} id={'structure-watchtower'} link={'./watchtower.png'} size={size} />
        </>
    )
}
