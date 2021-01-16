import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class ExpressionBuilder extends Component {
    constructor(props){
        super(props)
    }


    dropdown = () => {
        return(
            <select>
                {
                    this.props.stats.map((el)=>{
                        return (
                            <option key={el.name} value={el.name}> {el.name} </option>
                        )
                    })
                }
            </select>
        )
    }

    render(){

    }
}
