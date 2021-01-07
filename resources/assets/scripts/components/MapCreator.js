import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Map from './Map'
import SizeMenu from './SizeMenu'
import TilesMenu from './TilesMenu'
import axios from 'axios'
import MapMenu from './MapMenu'

export default class MapCreator extends Component {
    constructor(props){
        super(props)

        this.state = {
            selectedPattern: '',
            gridParams: this.calcGridParams(10,8,10),
            currentMap: '',
            selectedMap: '',
            mapList: [],
            brushSize:1,
        }

        this.mapRef = React.createRef()

        this.onMenuClick = this.onMenuClick.bind(this)
        this.saveMap = this.saveMap.bind(this)
        this.deleteMap = this.deleteMap.bind(this)
        this.loadMap = this.loadMap.bind(this)
        this.changeGridParams = this.changeGridParams.bind(this)
        this.selectMap = this.selectMap.bind(this)
        this.changeMapName = this.changeMapName.bind(this)
        this.getMapsList = this.getMapsList.bind(this)
        this.selectBrushSize = this.selectBrushSize.bind(this)

    }


    calcGridParams(x, y, size){

        let kx = 0.77
        let ky = 0.88

        let spacesX = kx*2*size*x + size
        let spacesY = ky*2*size*y + size

        var viewboxParams = [-size, -size, spacesX, spacesY]

        let width = kx*x*size + 'vh'
        let height = ky*y*size + 'vh'

        return {
            x:x,
            y: y,
            width:width ,
            height:height,
            size:size,
            viewboxParams: viewboxParams
        }
    }

    onMenuClick(e){
        this.setState({selectedPattern: e.target.name })
    }

    changeGridParams(width, height, size){
        var gridParams = this.calcGridParams(width, height, size)
        this.setState({gridParams})
    }

    saveMap(){
        // console.log(this.mapRef)
        var hexes = this.mapRef.current.hexList.map(el => {
            return {id: el.props.id, pattern:el.state.pattern}
        })

        let width = this.mapRef.current.props.gridParams.x
        let height = this.mapRef.current.props.gridParams.y

        let saveObj = {
            width: width,
            height:height,
            name: this.state.selectedMap,
            hexes: hexes
        }

        if(confirm('Are you sure you want to save under name: '+this.state.selectedMap+ '?')){
            axios.post('/Map/save', saveObj).then((response) => {
                this.setState({selectedMap: saveObj.name})

            })

            this.setState({currentMap: saveObj.name})
        }
    }

    loadMap(){
        let url = '/Map/load?name=' + this.state.selectedMap
        if(confirm('Are you sure you want to load save: '+this.state.selectedMap+ '?')){
            axios.get(url).then((response) => {

                let map = JSON.parse(response.data.map_json)
                const {width, height, name} = response.data
                // console.log(this.mapRef.current)

                let gridParams = this.calcGridParams(width, height, 10)

                this.setState({gridParams: gridParams, currentMap: name}, () =>{

                     this.mapRef.current.hexList.forEach(el => {
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

    selectMap(event){
        this.setState({selectedMap: event.target.name})
    }

    changeMapName(e){
        this.setState({selectedMap: e.target.value})
    }

    deleteMap(){
        let url = '/Map/delete?name=' + this.state.selectedMap
        if(confirm('Are you sure you want to delete save: '+this.state.selectedMap+ '?')){
            axios.get(url).then((response) => {
                this.setState({selectedMap: ''})
            })
        }

    }

    getMapsList(){
        axios.get('/Map/list').then((response)=>{
            if(!this.isUpToDate(this.state.mapList,response.data)){
                this.setState({mapList: response.data})
            }
        })
    }

    isUpToDate(currentList,newList){
        if(currentList.length != newList.length){
            return false
        }

        newList.forEach((el)=>{
            if(
                currentList.find((i) => {
                    return i.name == el.name
                })
                == undefined
            ){
                return false
            }
        })
        return true
    }

    selectBrushSize(e){
        this.setState({brushSize: e.target.value})
    }


    render(){
        return (
          <div className='h-screen w-full'>
              <SizeMenu changeGridParams={this.changeGridParams} />
              <div className="flex h-2/3 w-full" >
                  <Map
                      ref={this.mapRef}
                      gridParams={this.state.gridParams}
                      selectedPattern={this.state.selectedPattern}
                      brushSize={this.state.brushSize}
                  />
                  <div className="flex flex-col absolute right-0 z-10 bg-gray-700 border-2 border-red-700 h-1/2 space-y-2 rounded">
                      <MapMenu
                          saveMap={this.saveMap}
                          loadMap={this.loadMap}
                          deleteMap={this.deleteMap}
                          selectMap={this.selectMap}
                          changeMapName={this.changeMapName}
                          selectedMap={this.state.selectedMap}
                          getMapsList={this.getMapsList}
                          mapList={this.state.mapList}
                          selectBrushSize={this.selectBrushSize}
                          brushSize={this.state.brushSize}
                      />
                  </div>
              </div>
              <div className='flex fixed inset-x-0 bottom-0 z-10 bg-gray-700 border-2 border-red-700 py-3 h-24 w-screen px-2 space-x-2'>
                  <TilesMenu onMenuClick={this.onMenuClick } selectedPattern={this.state.selectedPattern} />
              </div>
          </div>
        )
    }
}
