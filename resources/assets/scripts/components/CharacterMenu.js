import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

export default function StructureMenu({selectedPattern, onMenuClick, updater}){

    const [characters, setCharacters] = useState([])

    // useEffect(async ()=>{
    //     setCharacters((await loadStructures()).data)
    // }, [JSON.stringify(characters), updater]
    // )

    const onClick = ({target}) => {
        let tile = {id:'elfSorcerer', filename:'./sorcerer-elf.png', image_id:'elfSorcerer'}
        onMenuClick(tile, target)
    }
    // const onClick = ({target}) => {
    //     let tile = characters.find((el)=>{
    //         return el.id == target.id
    //     })
    //     onMenuClick(tile, target)
    // }

    return(
        <div className="sub-menu menu-v">
            <h2 className="text-xl font-bold">Caracter Menu</h2>
            <div className='menu menu-h ' style={{backgroundImage: 'url(/black-marble.jpg)'}} >
                {/* {
                    characters.map((el, i)=>{
                        return (
                    <div key={el.name} className="flex flex-col text-white">
                    <p>{el.name}</p>
                    <img className={selectedPattern.id == el.id ? "border-2 border-red-500" : "border-2 border-black"}
                    onClick={onClick} name={el.name} id={el.id} key={i} src={el.url} width={50} height={50}
                    />

                    </div>
                        )
                    })
                } */}
                <div key={'elfSorcerer'} className="flex flex-col text-white">
                    <p>{'elfSorcerer'}</p>
                    <img className={selectedPattern.id == 'elfSorcerer' ? "border-2 border-red-500" : "border-2 border-black"}
                        onClick={onClick} name={'elfSorcerer'} id={'elfSorcerer'} key={'elfSorcerer'} src={'./sorcerer-elf.png'} width={50} height={50}
                    />

                </div>
            </div>
        </div>
    )
}

async function loadStructures(){
    return await axios.get('Structure/load')

}
