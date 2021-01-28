import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

async function loadImages(){
    return await axios.get('Image/load')
}

export default function ImagesMenu({onMenuClick, updater}){
    const [images, setImages] = useState( [] )

    useEffect(async ()=>{
        setImages(( await loadImages()).data)
    }, [JSON.stringify(images), updater])

    return(
        <div className="sub-menu menu-v">
            <h2 className="text-xl font-bold">Images Menu</h2>
            <div className='sub-menu menu-h'>
                {
                    images.map((el, i) => {
                        return <img onClick={onMenuClick} id={el.id} name={el.name} src={el.url} key={i} width={50} height={50}></img>
                    })
                }
            </div>
        </div>
    )
}
