import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Pattern } from 'react-hexgrid';

export default function patternList(){
    return (
        [
            <Pattern id="dragon" link={"http://"+ window.location.host +"/spiked-dragon-head.png"} />,
            <Pattern id="tavern-sign" link={"http://"+ window.location.host +"/tavern-sign.svg"} />
        ]
    )
}
