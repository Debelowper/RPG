import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

export default class TilesMenu extends Component {

    constructor(props){
        super(props)

        this.state={
            tiles:[],
        }

        this.loadTiles =this.loadTiles.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    componentDidMount(){
        this.loadTiles()
    }

    componentDidUpdate(props){
        if(this.props.updater != props.updater){
            this.loadTiles()
        }
    }

    loadTiles(){
        axios.get('Tile/load').then(response =>{
            this.setState({tiles: response.data})
        })
    }

    onClick(e){
        let tile = this.state.tiles.find((el)=>{
            return el.id == e.target.id
        })
        this.props.onMenuClick(e, tile)
    }


    render(){
        return(
             <div className='flex flex-row flex-wrap border border-black bg-gray-700 bg-opacity-70 space-x-2 px-2 ' style={{backgroundImage: 'url(/black-marble.jpg)'}} >
                 {
                     this.state.tiles.map((el, i)=>{
                         return (
                             <div key={el.name} className="flex flex-col text-white">
                                 <p>{el.name}</p>
                                 <img className={this.props.selectedPattern == el.name ? "border-2 border-red-500" : "border-2 border-black"}
                                     onClick={this.onClick} name={el.name} id={el.id} key={i} src={el.url} width={50} height={50}
                                 />

                             </div>
                         )
                     })
                 }
             </div>
        )
    }
}
