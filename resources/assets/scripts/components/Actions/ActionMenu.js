import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import { withShortcut } from 'react-keybind'

function ActionMenuMain ({setSelectedAction, selectedAction, actionList, shortcut}){

    const [options, setOptions] = useState(false)
    const [actions, setActions] = useState({})

    useEffect(()=>{
        let newActions = {}
        Object.entries(actionList).forEach(el =>{
            let current = ''
            switch(el[0]){
                case 'move': current = actions[el[0]] ? actions[el[0]].current : 'walk'; break
                case 'mainHand': current = actions[el[0]] ?  actions[el[0]].current : 'punch'; break
                default: current = actions[el[0]] ?  actions[el[0]].current : '' ; break
            }

            newActions[el[0]] = {'current':current, options: el[1] }
        })
        setOptions(false)
        setActions(newActions)
        setSelectedAction({ name:null})

    }, [JSON.stringify(actionList)])

    useEffect(()=>{
        unsetHotkeys()
        setHotkeys()
        if(Object.keys(actions).length == 0){
            unsetHotkeys()
        }

    },[JSON.stringify(actions), JSON.stringify(options), JSON.stringify(selectedAction)])

    const toggleOptions = () => {
        if(selectedAction){
            setOptions(!options)
        }
    }

    const setHotkeys = () => {
        if(!options){
            Object.values(hotkeys).forEach(el=>{
                let opt = Object.keys(actions).length > 0 ? actions[el.name].options.find(item => item.name == actions[el.name].current) : null
                shortcut.registerShortcut(() => setSelectedAction({
                    name:el.name, option: opt ? opt : {}  }) ,
                    [el.key], el.name, el.name
                )
            })
        }else{
            actions[selectedAction.name].options.forEach((el, i)=>{
                let index = i+1
                shortcut.registerShortcut(
                    ()=>
                        {setSelectedAction({name:selectedAction.name, option: el })
                        setOptions(false)
                        setActions({...actions, [selectedAction.name]: {...actions[selectedAction.name], 'current': el.name }})
                    } ,
                    [index], index, index
                )
            })
        }
        shortcut.registerShortcut( toggleOptions, ['tab'],'toggleOptions', 'toggleOptions' )
    }

    const unsetHotkeys = () => {
        Object.values(hotkeys).forEach(el=>{
            shortcut.unregisterShortcut([el.key])
        })
        shortcut.unregisterShortcut( ['tab'] )
    }


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

const hotkeys = {
    movement: {key: 'q', name: 'move' },
    mainHand:{key:'w', name:'mainHand'},
    offHand:{key:'e', name:'offHand'},
    ability1:{key:1, name:'ability1'},
    ability2:{key:2, name:'ability2'},
    ability3:{key:3, name:'ability3'},
    ability4:{key:4, name:'ability4'},
    ability5:{key:5, name:'ability5'},
    ability6:{key:6, name:'ability6'},
    ability7:{key:7, name:'ability7'},
    ability8:{key:8, name:'ability8'},
    // equip:{key:, name:},
    // openInventory:{key:, name:},

}

    if(options){
        return renderOptions()
    }else{
        return renderActionMenu()
    }
}

const ActionMenu = withShortcut(ActionMenuMain)

export default ActionMenu
