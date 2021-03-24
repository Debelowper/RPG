import React from 'react'
import ReactDOM from 'react-dom'
import { ShortcutProvider, ShortcutConsumer } from 'react-keybind'

export default function GameLayout({topContent, content, rightMenu, bottomMenu, backgroundURL, bottomRightSpace, bottomLeftSpace, rightTopSpace, rightBottomSpace}){

    const renderRightMenu = () => {
        if(rightMenu){
            return(
                <div className="menu grid grid-row-6 overflow-y-auto">
                    <div className="row-span-1">
                        {
                            rightTopSpace ?
                                <div className="sub-menu menu-h">
                                    {rightTopSpace}
                                </div>
                            : ''
                        }
                    </div>
                    <div className="row-span-4">
                        {rightMenu}
                    </div>
                    <div className="row-span-1">
                        {
                            rightBottomSpace ?
                                <div className="sub-menu menu-v">
                                    {rightBottomSpace}
                                </div>
                            : ''
                        }
                    </div>
                </div>
            )
        }
    }


    const renderBottomMenu = () => {
        if(bottomMenu){
            return(
                <div className="menu menu-h ">
                    <div className="grid grid-cols-12 w-full gap-2">
                        <div className="col-span-3">
                            {bottomLeftSpace ? bottomLeftSpace  : ''}
                        </div>
                        <div  className="col-span-6 flex flex-grow">
                            {bottomMenu}

                        </div>
                        <div className="col-span-3 w-full">
                            {bottomRightSpace ? bottomRightSpace  : ''}
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <ShortcutProvider>
            <div className="flex flex-col h-full " style={{ backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', backgroundImage: `url(${backgroundURL})`}}>
                <div className="flex flex-auto overflow-y-auto">
                    <div className="flex flex-grow overflow-x-auto overflow-y-auto" >
                        {content}
                    </div>
                    {renderRightMenu()}
                </div>
                {renderBottomMenu()}
            </div>
        </ShortcutProvider>
    )
}
