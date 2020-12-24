import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Pattern } from 'react-hexgrid';

export default function patternList(){
    return (
        [
            <Pattern key={1} id="dragon" link={"http://"+ window.location.host +"/spiked-dragon-head.png"} />,
            <Pattern key={2} id="tavern-sign" link={"http://"+ window.location.host +"/tavern-sign.svg"} />
        ]
    )
}
