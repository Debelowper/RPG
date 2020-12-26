import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Map from './Map'
import SizeMenu from './SizeMenu'
import PatternMenu from './PatternMenu/PatternMenu'
import axios from 'axios'

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
        let saveObj = {
            id: this.props.user,
            name: 'test',
            hexes: hexes
        }

        axios.post('/saveMap', saveObj).then(function (response) {
        console.log(response);
      })
    }

    loadMap(){

    }



    render(){
        return (
          <div className='h-screen w-full'>
            <SizeMenu changeGridParams={this.changeGridParams} />
            <button onClick={this.saveMap} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Save Map</button>
            <div className="h-2/3 w-full" >
                <Map ref={this.mapRef} gridParams={this.state.gridParams} selectedPattern={this.state.selectedPattern} />
            </div>
            <PatternMenu onMenuClick={this.onMenuClick } />
          </div>
        )
    }
}
