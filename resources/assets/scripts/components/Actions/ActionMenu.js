import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

export default function ActionMenu ({setSelectedAction, selectedAction, actionList}){

    const [options, setOptions] = useState(false)
    const [actions, setActions] = useState({
        'move':{current:'walk', options: ['walk', 'fly', 'swim', 'climb']},
        'attack':{current:'attack'},
        'castSpell':{current:'castSpell'},
        'dash':{current: 'dash'},
        'useAbility':{current: 'useAbility'},
        'grapple':{current: 'grapple'},
        'shove':{current: 'shove'},
        'dodge':{current: 'dodge'},
        'disengage':{current: 'disengage'},
        'useSkill':{current: 'useSkill'},
        'search':{current: 'search'},
        'useShield':{current: 'useShield'},
        'help':{current: 'help'},
        'ready':{current: 'ready'},
    })

    useEffect(()=>{
        let newActions = {}
        Object.entries(actionList).forEach(el =>{
            newActions[el[0]] = {'current':Object.keys(el[1].default)[0], options: Object.keys(el[1].options) }
        })
        setActions(newActions)
        setSelectedAction({...selectedAction, name:null})

    }, [JSON.stringify(actionList)])

    const renderOptions = () => {
        return (
            <div className="sub-menu h-full ">
                <div className="grid grid-cols-12 w-full">
                    {
                        actions[selectedAction.name].options.map((el)=>{
                            return(
                                <div key={el} className="col-span-3">
                                    <button className={"btn-primary " + (selectedAction.option == el ? ' bg-black' : '')}
                                        onClick = {() => {
                                            setActions(
                                                {...actions, [selectedAction.name]: {...actions[selectedAction.name], 'current': el }}
                                            )
                                            setSelectedAction({name: selectedAction.name, option:el})
                                            setOptions(false)
                                        }}
                                    >
                                        {el}
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
                                <div key={el[0]}  className={"col-span-3 flex flex-row btn-primary h-full" + (selectedAction.name == el[0] ? ' bg-black' : '')}
                                    onClick = {() => setSelectedAction({name: el[0], option:el[1].current})}
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
