import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern } from 'react-hexgrid';
import Tile from './Tile';
import PatternList from './PatternList'

export default class Map extends Component {
    constructor(props){
        super(props)

        this.hexList=[]
        this.layoutRef = React.createRef()

        this.clicked = false

    }

    componentDidUpdate(){
        this.clearLeftoverHexes()
    }

    clearLeftoverHexes(){
        let hexList = this.hexList
        hexList = hexList.map(el => {
            if(this.layoutRef.current.props.children.find(i => el.props.id.x == i.props.id.x && el.props.id.y == i.props.id.y)){
                return el
            }else{
                return null
            }
        })
        this.hexList = hexList.filter(el => el != null)
    }

    setHexRefs = (el) => {
        if(el){
            var hexList = this.hexList
            if(!hexList.find(i => i.props.id.x == el.props.id.x && i.props.id.y == el.props.id.y)){
                hexList.push(el)
                this.hexList = hexList
            }
        }
    }

    onHexClick = (id) => {
        this.changeChildPattern(id, this.props.selectedPattern)
    }

    changeChildPattern(id, pattern){
        let brushSize = parseInt(this.props.brushSize)
        let x = id.x + brushSize
        let y = id.y + brushSize
        let tiles = this.hexList.filter(el=>{
            return (
                el.props.id.x >= id.x
                && el.props.id.y >= id.y
                && el.props.id.x < x
                && el.props.id.y < y
            )
        })

        // let el = this.hexList.find((el) => {
        //     return el.props.id.x == id.x && el.props.id.y == id.y
        // })
        tiles.forEach((el)=>{
            el.changePattern(pattern)
        })

    }

    onHexHover = (id) => {
        if(this.clicked){
            this.changeChildPattern(id, this.props.selectedPattern)
        }
    }

    createTiles = () => {
        var hexagons = GridGenerator.orientedRectangle(this.props.gridParams.x, this.props.gridParams.y)

        let hexes = hexagons.map((hex, i) =>{
            hex.id = {x:(hex.q ), y:i%this.props.gridParams.y}
            return(
                <Tile
                    ref={this.setHexRefs}
                    key={'r'+hex.id.x+'c'+hex.id.y}
                    hex={hex}
                    id={hex.id}
                    onHexClick={this.onHexClick}
                    onHexHover={this.onHexHover}
                />
            )

        })
        return hexes
    }

    onMouseDown = () => {
        this.clicked = true
    }

    onMouseUp = () => {
        this.clicked = false
    }



    render(){

        return(
            <div onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
                <HexGrid  width={this.props.gridParams.width} height={this.props.gridParams.height} viewBox={this.props.gridParams.viewboxParams.join(' ')}>
                    <Layout  ref={this.layoutRef} size={{ x: this.props.gridParams.size, y: this.props.gridParams.size }}>
                        {this.createTiles() }
                    </Layout>
                    <PatternList />
                </HexGrid>
            </div>
        )
    }
}
