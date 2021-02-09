import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

export default function StructureMenu({selectedPattern, onMenuClick, updater}){

    const [structures, setStructures] = useState([])

    // useEffect(async ()=>{
    //     setStructures((await loadStructures()).data)
    // }, [JSON.stringify(structures), updater]
    // )

    const onClick = ({target}) => {
        let tile = {id:'watchtower', filename:'./watchtower.png', image_id:'watchtower'}
        onMenuClick(tile, target)
    }
    // const onClick = ({target}) => {
    //     let tile = structures.find((el)=>{
    //         return el.id == target.id
    //     })
    //     onMenuClick(tile, target)
    // }

    return(
        <div className="sub-menu menu-v">
            <h2 className="text-xl font-bold">Structures Menu</h2>
            <div className='menu menu-h ' style={{backgroundImage: 'url(/black-marble.jpg)'}} >
                {/* {
                    structures.map((el, i)=>{
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
                <div key={'watchtower'} className="flex flex-col text-white">
                    <p>{'watchtower'}</p>
                    <img className={selectedPattern.id == 'watchtower' ? "border-2 border-red-500" : "border-2 border-black"}
                        onClick={onClick} name={'watchtower'} id={'watchtower'} key={'watchtower'} src={'./watchtower.png'} width={50} height={50}
                    />

                </div>
            </div>
        </div>
    )
}

async function loadStructures(){
    return await axios.get('Structure/load')

}
