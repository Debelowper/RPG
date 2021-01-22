import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


async function loadImages(){
    return await axios.get('Image/load')
}


export default function CharacterMenu(){
    const [images, setImages] = useState( [] )

    useEffect(async ()=>{
        setImages(( await loadImages()).data)
    }, [JSON.stringify(images)])

    return(        
        <div className='flex fixed inset-x-0 bottom-0 z-10 bg-gray-700 border-2 border-red-700 py-3 h-24 w-screen px-2 space-x-2'>
            <div className='flex flex-row space-x-2'>
                {
                    images.map((el, i) => {
                        return <img src={el.url} key={i} width={50} height={50}></img>
                    })
                }
            </div>
        </div>
    )
}
