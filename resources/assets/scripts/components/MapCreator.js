import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Map from './Map'
import SizeMenu from './SizeMenu'
import TilesMenu from './TilesMenu'
import axios from 'axios'
import MapMenu from './MapMenu'
import MapCRUD from './MapCRUD'



export default class MapCreator extends Component {
    constructor(props){
        super(props)

        this.state = {
            selectedPattern: '',
            currentMap: '',
            selectedMap: '',
            mapList: [],

        }

        this.mapRef = React.createRef()

    }


    onMenuClick = (e) => {
        this.setState({selectedPattern: e.target.name })
    }



    render(){
        return (
              <div className="flex h-screen w-full" >
                  <Map
                      ref={this.mapRef}
                      SizeMenu={SizeMenu}
                      selectedPattern={this.state.selectedPattern}
                      MapCRUD = {MapCRUD }
                  >
                      <div className='flex fixed inset-x-0 bottom-0 z-10 bg-gray-700 border-2 border-red-700 py-3 h-24 w-screen px-2 space-x-2'>
                          <TilesMenu onMenuClick={this.onMenuClick } selectedPattern={this.state.selectedPattern} />
                      </div>
                  </Map>
              </div>
        )
    }
}
