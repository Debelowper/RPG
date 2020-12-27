import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Map from './Map'
import SizeMenu from './SizeMenu'
import PatternMenu from './PatternMenu/PatternMenu'
import axios from 'axios'
import MapMenu from './SaveMenu/MapMenu'

export default class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            selectedPattern: '',
            gridParams: this.calcGridParams(10,8,10)
        }

        this.mapRef = React.createRef()

        this.onMenuClick = this.onMenuClick.bind(this)
        this.saveMap = this.saveMap.bind(this)
        this.loadMap = this.loadMap.bind(this)
        this.changeGridParams = this.changeGridParams.bind(this)
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

    onMenuClick(patternId){
        this.setState({selectedPattern: patternId })
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
            id: this.props.user,
            width: width,
            height:height,
            name: 'test',
            hexes: hexes
        }


        axios.post('/saveMap', saveObj).then(function (response) {
            console.log(response);
        })
    }

    loadMap(){
        let id = 1
        let url = '/loadMap?id=' + id
        axios.get(url).then((response) => {

            let map = JSON.parse(response.data.map_json)
            const {width, height, name} = response.data
            // console.log(this.mapRef.current)

            let gridParams = this.calcGridParams(width, height, 10)

            this.setState({gridParams: gridParams}, () =>{

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



    render(){
        return (
          <div className='h-screen w-full'>
            <SizeMenu changeGridParams={this.changeGridParams} />
            <div className="flex h-2/3 w-full" >
                <Map ref={this.mapRef} gridParams={this.state.gridParams} selectedPattern={this.state.selectedPattern} />
                <div className="flex flex-col absolute right-0 z-10 bg-gray-700 border-2 border-red-700 h-1/2 space-y-2">
                    <MapMenu saveMap={this.saveMap} loadMap={this.loadMap} />
                </div>
            </div>
            <PatternMenu onMenuClick={this.onMenuClick } />
          </div>
        )
    }
}
