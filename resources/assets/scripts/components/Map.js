import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern } from 'react-hexgrid';
import Tile from './Tile';
import PatternList from './PatternList'
import Helpers from './Helpers'


export default class Map extends Component {
    constructor(props){
        super(props)

        this.hexList=[]
        this.layoutRef = React.createRef()

        this.state = {
            brushSize:1,
            gridParams: Helpers.calcGridParams(10,8,10),
        }

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
        let brushSize = parseInt(this.state.brushSize)
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
        var hexagons = GridGenerator.orientedRectangle(this.state.gridParams.x, this.state.gridParams.y)

        let hexes = hexagons.map((hex, i) =>{
            hex.id = {x:(hex.q ), y:i%this.state.gridParams.y}
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

    selectBrushSize = (e) => {
        this.setState({brushSize: e.target.value})
    }

    renderRightMenu(){
        if(this.props.MapCRUD){
            return(
                <this.props.MapCRUD
                    hexList={this.hexList}
                    gridParams={this.state.gridParams}
                    selectBrushSize={this.selectBrushSize}
                    brushSize={this.state.brushSize}
                />
            )
        }
    }

    changeGridParams = (width, height, size) => {
        var gridParams = Helpers.calcGridParams(width, height, size)
        this.setState({gridParams})
    }


    render(){

        return(
            <div>
                <div className="flex w-4/5">
                    <this.props.SizeMenu changeGridParams={this.changeGridParams} />
                    <div onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
                        <HexGrid  width={this.state.gridParams.width} height={this.state.gridParams.height} viewBox={this.state.gridParams.viewboxParams.join(' ')}>
                            <Layout  ref={this.layoutRef} size={{ x: this.state.gridParams.size, y: this.state.gridParams.size }}>
                                {this.createTiles() }
                            </Layout>
                            <PatternList />
                        </HexGrid>
                    </div>
                    <div className='flex w-1/6'>
                        {this.renderRightMenu()}
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}
