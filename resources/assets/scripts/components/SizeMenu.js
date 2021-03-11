import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import {withShortcut} from 'react-keybind'

function SizeMenuMain({size, setSize, setCurrentSize, edit , shortcut}){

    const onClick = () => {
        setCurrentSize()
    }

    const handleChange = ({target}) => {
        if(target.placeholder != 'size' && target.value <= 50){
            setSize({...size, [target.placeholder]: parseInt(target.value)})
        }else if(target.value <= 30){
            setSize({...size, [target.placeholder]: parseInt(target.value)})
        }
    }

    useEffect(()=>{

        shortcut.unregisterShortcut(['+'] )
        shortcut.unregisterShortcut(['-'] )
        shortcut.registerShortcut( (e) => {e.preventDefault() ;setSize(size.size < 8 ? {...size, size:size.size+1 }: size)}, ['+'], 'moreZoom', 'moreZoom' )
        shortcut.registerShortcut( (e) => {e.preventDefault() ;setSize(size.size > 1 ? {...size, size:size.size-1 } : size)}, ['-'], 'lessZoom', 'lessZoom' )
    },[size])

    return(
        <>
            <div className="text-sm">
                {edit ?
                    <>
                        <div>
                            <label >width  </label>
                            <input placeholder={'x'} value={size.x} onChange={handleChange} className="input  w-16" type='number' ></input>
                        </div>
                        <div>
                            <label>height </label>
                            <input placeholder={'y'} value={size.y} onChange={handleChange} className="input w-16" type='number' ></input>
                        </div>
                    </>
                :
                    ''
                }
                <div>
                    <label>size </label>
                    <input placeholder={'size'} value={size.size} onChange={handleChange} className="input w-16" type='number' ></input>
                </div>
            </div>
            {
                edit ?
                    <button onClick={onClick} className="btn-primary">Apply</button>
                :
                ''
            }
        </>
    )
}

const SizeMenu = withShortcut(SizeMenuMain)

export default SizeMenu
