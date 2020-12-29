import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class MapMenu extends Component {
    constructor(props){
        super(props)

        this.props.getMapsList()
    }

    componentDidUpdate(){
        this.props.getMapsList()
    }

    render(){

        return(

            <>
                <label className="text-white" >Map name</label>
                <input  className="mx-1 py-2 mb-2  rounded" type="text" name={'mapName'}  onChange={this.props.changeMapName} value={this.props.selectedMap}></input>
                <button onClick={this.props.saveMap} className="btn-primary mx-2" >Save Map</button>
                <button onClick={this.props.loadMap} className="btn-primary mx-2" >Load Map</button>
                <button onClick={this.props.deleteMap} className="btn-primary mx-2" >Delete Map</button>
                <div className="flex justify-center">
                    <ol >
                        {
                            this.props.mapList ?
                                this.props.mapList.map((el) => {
                                    return(
                                        <li
                                            id={el.name} key={el.name} >
                                            <button
                                                onClick={this.props.selectMap}
                                                name={el.name}
                                                className="bg-gray-100 hover:bg-blue-300 border-2 border-red-500 py-2 px-4 rounded">
                                                {el.name}
                                            </button>
                                        </li>
                                    )
                                })
                            : ' '
                        }
                    </ol>
                </div>

            </>
        )
    }
}
