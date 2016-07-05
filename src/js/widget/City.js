/**
 * Created by john.sjostrom on 2016-07-04.
 */
import React from "react";

export default class City extends React.Component {
    constructor(config){
        super();
        this.state = {inputActive : false};
    }

    newLocation(e){
        if (e.type === "keyup" && e.keyCode !== 13){
            return;
        }

        this.props.updateLocation(e);
        this.changeInput();
    }

    changeInput(){
        this.setState({inputActive : !this.state.inputActive});
    }

    render() {

        if ( this.state.inputActive ){
            return (
                <div>
                    <p class="location">{this.props.city}</p>
                    <input
                        class="input"
                        onBlur = {this.newLocation.bind(this)}
                        onKeyUp = {this.newLocation.bind(this)}
                        onChange = {this.props.updateLocation.bind(this)}
                        defaultValue = {this.props.city}
                        autoFocus={true} />
                </div>
            );
        }
        else {
            return (
                <div>
                    <p class="location" onClick = {this.changeInput.bind(this)}>{this.props.city}</p>
                </div>
            );
        }
    }
}
