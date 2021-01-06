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

        this.onHexClick = this.onHexClick.bind(this)
        this.onHexHover = this.onHexHover.bind(this)
        this.setHexRefs = this.setHexRefs.bind(this)
        this.createTiles = this.createTiles.bind(this)

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

    setHexRefs(el) {
        if(el){
            var hexList = this.hexList
            if(!hexList.find(i => i.props.id.x == el.props.id.x && i.props.id.y == el.props.id.y)){
                hexList.push(el)
                this.hexList = hexList
            }
        }
    }

    onHexClick(id){
        this.changeChildPattern(id, this.props.selectedPattern)
    }

    changeChildPattern(id, pattern){
        let el = this.hexList.find((el) => {
            return el.props.id.x == id.x && el.props.id.y == id.y
        })

        el.changePattern(pattern)
    }

    onHexHover(id){

    }

    createTiles(){
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

    render(){

        return(
            <div>
                <HexGrid  width={this.props.gridParams.width} height={this.props.gridParams.height} viewBox={this.props.gridParams.viewboxParams.join(' ')}>
                    <Layout ref={this.layoutRef} size={{ x: this.props.gridParams.size, y: this.props.gridParams.size }}>
                        {this.createTiles() }
                    </Layout>
                    <PatternList />
                </HexGrid>
            </div>
        )
    }
}
