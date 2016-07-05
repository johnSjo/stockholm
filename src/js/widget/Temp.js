/**
 * Created by john.sjostrom on 2016-07-04.
 */
import React from "react";

export default class Temp extends React.Component {

    render() {
        return (
            <p class="temperature" onClick = {this.props.changeUnit.bind(this)} >{this.props.temp}</p>
        );
    }
}
