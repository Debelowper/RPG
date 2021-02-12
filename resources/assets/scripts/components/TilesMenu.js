import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

export default function TilesMenu({selectedPattern, onMenuClick, updater}){

    const [tiles, setTiles] = useState([])

    useEffect(async ()=>{
        setTiles((await loadTiles()).data)
    }, [JSON.stringify(tiles), updater]
    )

    const onClick = ({target}) => {
        let tile = tiles.find((el)=>{
            return el.id == target.id
        })
        onMenuClick(tile, target)
    }

    return(
        <div className="sub-menu menu-v">
            <h2 className="text-xl font-bold">Tiles Menu</h2>
            <div className='menu menu-h ' style={{backgroundImage: 'url(/black-marble.jpg)'}} >
                {
                    tiles.map((el, i)=>{
                        return (
                            <div key={el.name} className="flex flex-col text-white">
                                <p>{el.name}</p>
                                <img className={selectedPattern.id == el.id ? "border-2 border-red-500" : "border-2 border-black"}
                                    onClick={onClick} name={el.name} id={el.id} key={i} src={el.url} width={50} height={50}
                                />

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

async function loadTiles(){
    return await axios.get('Tile/loadUser')

}
