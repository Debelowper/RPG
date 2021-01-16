import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import MapMenu from './MapMenu'
import Helpers from './Helpers'

export default class MapCRUD extends Component {
    constructor(props){
        super(props)

        this.state = {
            currentMap: '',
            mapList: [],
            brushSize:1,
        }
    }

    componentDidMount(){
        this.getMapsList()
    }

    saveMap = (selectedMap) => {
        var hexes = this.props.hexList.map(el => {
            return {id: el.props.id, pattern:el.state.pattern}
        })

        let width = this.props.gridParams.x
        let height = this.props.gridParams.y

        let saveObj = {
            width: width,
            height:height,
            name: selectedMap,
            hexes: hexes
        }

        if(confirm('Are you sure you want to save under name: '+selectedMap+ '?')){
            axios.post('/Map/save', saveObj).then((response) => {
                this.getMapsList()

            })

            this.setState({currentMap: saveObj.name})
        }
    }

    loadMap = (selectedMap) => {
        let url = '/Map/load?name=' + selectedMap
        if(confirm('Are you sure you want to load save: '+selectedMap+ '?')){
            axios.get(url).then((response) => {

                let map = JSON.parse(response.data.map_json)
                const {width, height, name} = response.data


                let gridParams = Helpers.calcGridParams(width, height, 10)

                this.setState({gridParams: gridParams, currentMap: name}, () =>{

                     this.props.hexList.forEach(el => {
                        // {id: el.props.id, pattern:el.state.pattern}
                        let hex = map.find((id) =>{
                            return id.id.x == el.props.id.x && id.id.y == el.props.id.y
                        })

                        el.changePattern(hex.pattern)
                    })
                })
            })
        }

    }



    deleteMap = (selectedMap) => {
        let url = '/Map/delete?name=' + selectedMap
        if(confirm('Are you sure you want to delete save: '+selectedMap+ '?')){
            axios.get(url).then((response) => {
                this.getMapsList()
            })
        }

    }

    getMapsList = () => {
        axios.get('/Map/list').then((response)=>{
            this.setState({mapList: response.data})
        })
    }

    render(){
        return (
              <div className="flex flex-col absolute right-0 z-10 bg-gray-700 border-2 border-red-700 h-1/2 space-y-2 rounded">
                  <MapMenu
                      saveMap={this.saveMap}
                      loadMap={this.loadMap}
                      deleteMap={this.deleteMap}
                      selectMap={this.selectMap}
                      changeMapName={this.changeMapName}
                      mapList={this.state.mapList}
                      selectBrushSize={this.props.selectBrushSize}
                      brushSize={this.props.brushSize}
                  />
              </div>
        )
    }
}
