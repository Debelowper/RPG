import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

if(document.getElementById('root') ){
    let root = document.getElementById('root');
    ReactDOM.render(<App {...(root.dataset)} />, document.getElementById('root'))
}
