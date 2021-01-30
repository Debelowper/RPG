import React, { useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

export default function ResourceMenu({loadResource, deleteResource, saveResource, resourceList}){

    const [selected, setSelected] = useState('')
    const [filterString, setFilterString] = useState('')
    const [list, setList] = useState(resourceList)
    const [page, setPage] = useState(1)


    useEffect(()=>{
        if(resourceList){
            setList(applyFilter())
        }
    }, [filterString, resourceList, page])

    const applyFilter = () =>{
        return (resourceList.filter((el)=>{
            if(filterString != null){
                return el.name.includes(filterString)
            }
            return el
        }))
    }

    const getPage = (list) => {
        return list.slice(5*(page-1), 5*page)
    }

    const makePages = () => {
        let resp = []
        for(let i=1; i <= 1+list.length/5; i++){
            resp.push(
                <button key={i} className={'input ' + (page == i ? 'bg-white text-black ' : 'bg-gray-900 text-white')} onClick={(e)=>setPage(e.target.value)} value={i}>{i}</button>
            )
        }
        return(
            <div className="flex flex-row"> {resp}</div>
        )
    }

    return(
        <>
            <div className="sub-menu menu-v">
                <input  className="input" type="text" placeholder="Name"  onChange={(e)=>setSelected(e.target.value)} value={selected}></input>
                <button onClick={() => saveResource(selected)} className="btn-primary mx-2" >Save </button>
                <button onClick={() => loadResource(selected)} className="btn-primary mx-2" >Load </button>
                <button onClick={() => deleteResource(selected)} className="btn-primary mx-2" >Delete </button>
            </div>
            <div className="sub-menu menu-v">

                <input type='text' className='input' placeholder='Filter' value={filterString} onChange={(e) => setFilterString(e.target.value)}/>

                <ol className="sub-menu menu-v w-full">
                    {
                        list ?
                            getPage(list).map((el) => {
                                return(
                                    <li className="btn-list"
                                        id={el.name} key={el.name} >
                                        <button
                                            onClick={(e) => setSelected(e.target.name)}
                                            name={el.name}
                                            className="w-full"
                                        >{el.name}
                                        </button>
                                    </li>
                                )
                            })
                        : ' '
                    }
                </ol>
                {makePages()}
            </div>
        </>
    )
}
