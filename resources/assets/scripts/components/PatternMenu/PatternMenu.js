import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Image from './Image'
import axios from 'axios'

export default class PatternMenu extends Component {

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
        return(
             <div className='flex fixed inset-x-0 bottom-0 z-10 bg-gray-700 border-2 border-red-700 py-3 h-24 w-screen space-x-2'>
                 <div className='flex flex-row space-x-2'>
                     {
                         this.state.images.map((el, i)=>{
                             return <Image onMenuClick={this.props.onMenuClick} id={el.name} key={i} src={el.url} width={50} height={50}/>
                         })
                     }
                 </div>
             </div>
        )
    }
}
