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
            <label className="text-white" > name</label>
            <input  className="mx-1 py-2 mb-2  rounded" type="text"   onChange={(e)=>setSelected(e.target.value)} value={selected}></input>
            <button onClick={() => saveResource(selected)} className="btn-primary mx-2" >Save </button>
            <button onClick={() => loadResource(selected)} className="btn-primary mx-2" >Load </button>
            <button onClick={() => deleteResource(selected)} className="btn-primary mx-2" >Delete </button>
            <div className="flex flex-col place-items-center space-y-2">

                <input type='text' className='input text-sm' placeholder='filter' value={filterString} onChange={(e) => setFilterString(e.target.value)}/>

                <ol >
                    {
                        list ?
                            getPage(list).map((el) => {
                                return(
                                    <li
                                        id={el.name} key={el.name} >
                                        <button
                                            onClick={(e) => setSelected(e.target.name)}
                                            name={el.name}
                                            className="bg-gray-100 hover:bg-blue-300 border-2 border-red-500 py-2 px-4 rounded"
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
