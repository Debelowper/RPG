import React from 'react'
import ReactDOM from 'react-dom'

export default function ActionMenu (){

    return(
        <div className="sub-menu h-full ">
            <div className="grid grid-cols-12 w-full">
                <div className="col-span-3">
                    attack
                </div>
                <div className="col-span-3">
                    cast spell
                </div>
                <div className="col-span-3">
                    dash
                </div>
                <div className="col-span-3">
                    use ability
                </div>
                <div className="col-span-3">
                    grapple/escape
                </div>
                <div className="col-span-3">
                    shove
                </div>
                <div className="col-span-3">
                    dodge
                </div>
                <div className="col-span-3">
                    disengage
                </div>
                <div className="col-span-3">
                    hide
                </div>
                <div className="col-span-3">
                    use skill
                </div>
                <div className="col-span-3">
                    search
                </div>
                <div className="col-span-3">
                    use shield
                </div>
                <div className="col-span-3">
                    help
                </div>
                <div className="col-span-3">
                    ready
                </div>

            </div>

        </div>
    )

}
