import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class MapMenu extends Component {
    constructor(props){
        super(props)

    }



    render(){
        return(

            <>
                <button onClick={this.props.saveMap} className="bg-blue-500 hover:bg-blue-700 text-white font-bold  mx-2 py-2 px-4 rounded" >Save Map</button>
                <button onClick={this.props.loadMap} className="bg-blue-500 hover:bg-blue-700 text-white font-bold  mx-2 py-2 px-4 rounded" >Load Map</button>

                

            </>







        )
    }
}
