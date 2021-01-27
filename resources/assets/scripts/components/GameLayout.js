import React from 'react'
import ReactDOM from 'react-dom'

export default function GameLayout({topContent, content, rightMenu, bottomMenu, backgroundURL}){


    return (
        <div className="flex flex-col h-full " style={{ backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', backgroundImage: `url(${backgroundURL})`}}>

            <div className="flex flex-auto overflow-y-auto">
                <div className="flex flex-grow overflow-x-auto overflow-y-auto" >
                    {content}
                </div>

                <div className="menu menu-v overflow-y-auto" >
                    {rightMenu}
                </div>
            </div>
            <div className='menu menu-h'>
                {bottomMenu}
            </div>
        </div>
    )
}
