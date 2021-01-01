import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


export default class ImageMenu extends Component {
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
            console.log(response)
            this.setState({images: response.data})
        })
    }

    render(){
        return (
            <div>
                <h1>Image List</h1>
                <div className='flex flex-row space-x-2'>
                    {
                        this.state.images.map((el, i)=>{
                            return <img src={el} key={i} width={50} height={50}></img>
                        })
                    }
                </div>
            </div>
        )
    }
}
