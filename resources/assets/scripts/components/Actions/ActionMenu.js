import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

export default function ActionMenu ({setSelectedAction, selectedAction, actionList}){

    const [options, setOptions] = useState(false)
    const [actions, setActions] = useState({})

    useEffect(()=>{
        let newActions = {}
        Object.entries(actionList).forEach(el =>{
            let current = ''
            switch(el[0]){
                case 'move': current = 'walk'; break
                case 'mainHand': current = 'punch'; break
            }

            newActions[el[0]] = {'current':current, options: el[1] }
        })
        setOptions(false)
        setActions(newActions)
        setSelectedAction({ name:null})

    }, [JSON.stringify(actionList)])

    const renderOptions = () => {
        return (
            <div className="sub-menu h-full ">
                <div className="grid grid-cols-12 w-full">
                    {
                        Object.values(actions[selectedAction.name].options).map((el)=>{
                            return(
                                <div key={el.name} className="col-span-3">
                                    <button className={"btn-primary " + (Object.keys(selectedAction.option)[0] == el.name ? ' bg-black' : '')}
                                        onClick = {() => {
                                            setActions(
                                                {...actions, [selectedAction.name]: {...actions[selectedAction.name], 'current': el.name }}
                                            )
                                            setSelectedAction({name: selectedAction.name, option: el })
                                            setOptions(false)
                                        }}
                                    >
                                        {el.name}
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    const renderActionMenu = () => {
        return(
            <div className="sub-menu h-full ">
                <div className="grid grid-cols-12 w-full">
                    {
                        Object.entries(actions).map((el)=>{
                            return(
                                <div key={el[0]}  className={"col-span-3 flex flex-row btn-primary h-12" + (selectedAction.name == el[0]  ? ' bg-black' : '') }
                                    onClick = {() =>
                                        {
                                            let option = el[1].options.find(act=> act.name == el[1].current)
                                            setSelectedAction({
                                                name: el[0],
                                                option:option ? option : {}
                                            })
                                        }
                                    }
                                >
                                    <button className='w-5/6'>{el[1].current}</button>
                                    {
                                        el[1].options ?
                                            <div className="btn-options h-full w-1/6 " onClick = {() => setOptions(true)} ></div> :
                                            ''
                                    }
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }

    if(options){
        return renderOptions()
    }else{
        return renderActionMenu()
    }
}
