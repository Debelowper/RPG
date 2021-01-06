import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

export default class ImagesMenu extends Component {

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

    componentDidUpdate(props){
        if(props.updater != this.props.updater){
            this.loadImages()
        }
    }

    loadImages(){
        axios.get('Image/load').then(response =>{
            this.setState({images: response.data})
        })
    }




    render(){
        return(
             <div className='flex fixed inset-x-0 bottom-0 z-10 bg-gray-700 border-2 border-red-700 py-3 h-24 w-screen px-2 space-x-2'>
                 <div className='flex flex-row space-x-2'>
                     {
                         this.state.images.map((el, i)=>{
                             return <img onClick={this.props.onMenuClick} name={el.name} id={el.id} key={i} src={el.url} width={50} height={50}/>
                         })
                     }
                 </div>
             </div>
        )
    }
}
