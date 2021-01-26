import React from 'react'
import ReactDOM from 'react-dom'

export default function GameLayout({topContent, content, rightMenu, bottomMenu}){

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    var headerHeight = document.getElementById('head').clientHeight;
    let height = vh - headerHeight
    let width = vw - 5

    return (
        <div style={{height:height, width: width, backgroundImage: 'url(/forest.jpg)'}}>

            <div className="grid grid-cols-12 overflow-y-auto w-screen " style={{height:height*0.875}}>
                <div className=" col-span-10  overflow-x-auto" >
                    {content}
                </div>

                <div className="col-span-2 flex flex-col bg-opacity-50 bg-gray-700 bg-leather border-2 border-red-700 space-y-2 rounded" >
                    {rightMenu}
                </div>
            </div>

            <div className='flex bg-gray-700 border-2 bg-opacity-50 border-red-700 py-3 w-screen px-2 space-x-2' style={{height:height*0.125}}>
                {bottomMenu}
            </div>
        </div>
    )
}
