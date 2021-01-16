import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

// export default class CharacterMenu extends Component{
//     constructor(props){
//         super(props)
//     }
//
//     loadCharacters = () => {
//         axios
//
//     }
// }

export default function CharacterMenu(){
    const [data, setData] = React.useState('notData')

    if(!data == 'data'){
        setData('data')
    }
    console.log(data)



    return(
        <p>{data}</p>
    )
}
