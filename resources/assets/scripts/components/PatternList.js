import React, {useState, useEffect} from 'react'
import { Pattern } from 'react-hexgrid';
import axios from 'axios'

async function loadImages(){
    return await axios.get('Image/load')
}

export default function PatternList(){
    const [images, setImages] =useState([])

    useEffect(
        async () =>{
            setImages((await loadImages()).data)
        },
        [JSON.stringify(images)]
    )

    return (
        <>{
            images.map((el, i)=>{
                return <Pattern key={i} id={el.name} link={el.url} />
            })
        }
        </>
    )
}
