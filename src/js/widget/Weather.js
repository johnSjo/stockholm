/**
 * Created by john.sjostrom on 2016-07-04.
 */
import React from "react";
import City from "./City";
import Temp from "./Temp";

export default class Weather extends React.Component {
    constructor(config){
        super();
        this.state = {
            city : config.city,
            temp : "-",
            code : "images/weathericons/3200.svg",
            humidity : "-",
            wind : "-",
            unit : config.unit
        };

        this.loadWeather(config.city);
    }

    loadWeather(location, woeid){
        $.simpleWeather({
            location: location,
            woeid: woeid,
            unit: this.state.unit,
            success : this.weatherLoaded.bind(this),
            error: function(error){
                $(".error").html('<p>'+error+'</p>');
            }

        });
    }

    weatherLoaded(weather){
        this.setState({
            city : weather.city,
            temp : weather.temp + '°' + weather.units.temp,
            code : "images/weathericons/" + weather.code + ".svg",
            humidity : weather.humidity,
            wind : weather.wind.direction + ' ' + weather.wind.speed + ' ' + weather.units.speed
        });

        this.props.updateStorage(this.props.id, this.state.city);
    }

    setLocation(city){
        if ( city !== this.state.city ){
            this.loadWeather(city);
        }
    }

    updateLocation(e){
        this.setLocation(e.target.value);
    }

    removeWidget(){
        this.props.removeWidget(this.props.id);
    }

    changeUnit(){
        if (this.state.unit === "C" ){
            this.state.unit = "f"
        }
        else {
            this.state.unit = "C"
        }

        this.loadWeather(this.state.city);
    }

    render() {
        return (
            <div class="container clearfix">
                <City city = {this.state.city} updateLocation = {this.updateLocation.bind(this)} />
                <Temp temp = {this.state.temp} changeUnit = {this.changeUnit.bind(this)} />
                <div class="climate_bg">
                    <img class="weathericon" src={this.state.code}></img>
                </div>
                <div class="info_bg">
                    <img class="dropicon" src="images/Droplet.svg"></img>
                    <img class="windicon" src="images/Wind.svg"></img>
                    <p class="humidity">{this.state.humidity}</p>
                    <div class="windspeed">{this.state.wind}</div>
                </div>
                <div class="minusIcon_bg">
                    <img class="minusIcon" src="images/minus_sign.svg" onClick = {this.removeWidget.bind(this)}></img>
                </div>
            </div>
        );
    }
}
