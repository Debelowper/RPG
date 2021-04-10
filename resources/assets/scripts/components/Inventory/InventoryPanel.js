import React from 'react'
import {equipItem} from './../Actions/Equip'

export default function InventoryPanel ({inventories, setInventories, character, setAction}){

    const closeInventory = (position) => {
        let newInventories = [...inventories]
        newInventories.splice(position, 1)
        setInventories(newInventories)
    }


    const renderInventory = (inventory, position) => {

        const renderSlot = (item, i) => {
            return(
                <div key={i} className='border border-black border-2 h-12 w-12 bg-yellow-900'>
                    <button onClick={() => equipItem({character, item, setAction})} className='h-12 w-12 '>{item.name}</button>
                </div>
            )
        }

        return (
            <div key={position}>
                <button className = 'btn-primary' onClick={()=>closeInventory(position)}>Close</button>
                <div className='grid grid-cols-6 gap-1'>
                    {inventory.items.map((el, i) => renderSlot(el, i))}
                </div>
            </div>
        )

    }

    return(
        <div className='menu-v flex-grow'>
            {inventories.map((el,i) => renderInventory(el, i))}
        </div>
    )
}
