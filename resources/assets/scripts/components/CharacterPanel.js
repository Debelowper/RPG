import React from 'react'
import ReactDOM from 'react-dom'


export default function CharacterPanel({character, openInventory}){

    const renderRangeInput = (label, resource, resourceMax) => {
        return(
            <div>
                <div className='flex flex-row border-2 border-black w-5/6 h-8 rounded mx-auto'>
                    <output className='flex flex-row absolute'>{label} : {resource + '/' + resourceMax}</output>
                    <div className='bg-red-700' style={{width:(100*resource/resourceMax)+'%'}}></div>
                </div>
            </div>
        )
    }

    const renderButton = (label, func) => {
        // console.log(label)
        return(
            <button onClick={func} className='border h-10 w-10 overflow-hidden bg-black'>
                {label}
            </button>
        )
    }

    const renderItemSlots = (equipmentSlots) => {
        return(
            <div className = 'flex flex-row place-content-around '>
                {Object.values(equipmentSlots).map((el, i) => {
                    let func = el.type == 'inventory' ? () => openInventory(el.item) : () => console.log('function')
                    return(
                        <div key={i}>
                            {renderButton(el.name, func)}
                        </div>
                    )
                } )}
            </div>
        )
    }

    if(character){
        return(
            <div className="flex flex-col">
                {renderRangeInput('HP', character.resources['hp'], character.base.resources['hp'])}
                {renderItemSlots(character.equipments)}
            </div>
        )
    }else{
        return <div className="flex flex-col"></div>
    }
}
