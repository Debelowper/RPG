import React, {Component} from 'react'
import { Pattern } from 'react-hexgrid';
import axios from 'axios'

export default class PatternList extends Component{

    constructor(props){
        super(props)

        this.state={
            images:[],
        }

        this.loadImages =this.loadImages.bind(this)
    }

    componentDidMount(){
        this.loadImages()
    }

    loadImages(){
        axios.get('Image/load').then(response =>{
            this.setState({images: response.data})
        })
    }

    render(){
        return (
            <>{
                this.state.images.map((el, i)=>{
                    return <Pattern key={i} id={el.name} link={el.url} />
                })
            }
            </>
        )
    }
}
