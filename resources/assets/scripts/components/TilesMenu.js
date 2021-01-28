import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

export default function TilesMenu({selectedPattern, onMenuClick, updater}){

    const [tiles, setTiles] = useState([])

    useEffect(async ()=>{
        setTiles((await loadTiles()).data)
    }, [JSON.stringify(tiles), updater]
    )

    const onClick = (e) => {
        let tile = tiles.find((el)=>{
            return el.id == e.target.id
        })
        onMenuClick(e, tile)
    }

    return(
        <div className="sub-menu menu-v">
            <h2 className="text-xl font-bold">Tiles Menu</h2>
            <div className='menu menu-h ' style={{backgroundImage: 'url(/black-marble.jpg)'}} >
                {
                    tiles.map((el, i)=>{
                        return (
                            <div key={el.name} className="flex flex-col text-white">
                                <p>{el.name}</p>
                                <img className={selectedPattern == el.name ? "border-2 border-red-500" : "border-2 border-black"}
                                    onClick={onClick} name={el.name} id={el.id} key={i} src={el.url} width={50} height={50}
                                />

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

async function loadTiles(){
    return await axios.get('Tile/load')

}

// export default class TilesMenu extends Component {
//
//     constructor(props){
//         super(props)
//
//         this.state={
//             tiles:[],
//         }
//
//         this.loadTiles =this.loadTiles.bind(this)
//         this.onClick = this.onClick.bind(this)
//     }
//
//     componentDidMount(){
//         this.loadTiles()
//     }
//
//     componentDidUpdate(props){
//         if(this.props.updater != props.updater){
//             this.loadTiles()
//         }
//     }
//
//     loadTiles(){
//         axios.get('Tile/load').then(response =>{
//             this.setState({tiles: response.data})
//         })
//     }
//
//     onClick(e){
//         let tile = this.state.tiles.find((el)=>{
//             return el.id == e.target.id
//         })
//         this.props.onMenuClick(e, tile)
//     }
//
//
//     render(){
//         return(
//             <div className="sub-menu menu-v">
//                 <h2 className="text-xl font-bold">Tiles Menu</h2>
//                 <div className='menu menu-h ' style={{backgroundImage: 'url(/black-marble.jpg)'}} >
//                     {
//                         this.state.tiles.map((el, i)=>{
//                             return (
//                                 <div key={el.name} className="flex flex-col text-white">
//                                     <p>{el.name}</p>
//                                     <img className={this.props.selectedPattern == el.name ? "border-2 border-red-500" : "border-2 border-black"}
//                                         onClick={this.onClick} name={el.name} id={el.id} key={i} src={el.url} width={50} height={50}
//                                     />
//
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//             </div>
//         )
//     }
// }
