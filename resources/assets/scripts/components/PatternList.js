import React, {useState, useEffect} from 'react'
import { Pattern } from 'react-hexgrid';
import axios from 'axios'

async function loadImages(){
    return await axios.get('Image/load')
}

function getMeta(url){
    var img = new Image();
    img.onload = function(){
        return {x: this.width, y:this.height}
    };
    img.src = url;
}

export default function PatternList({gridParams}){
    const [images, setImages] =useState([])

    useEffect(
        async () =>{
            setImages((await loadImages()).data)
            console.log(images)
        },
        [JSON.stringify(images)]
    )

    return (
        <>{
            images.map( (el, i)=>{
                return <Pattern key={i} id={el.name} link={el.url} />
            })
        }

        </>
    )
}
