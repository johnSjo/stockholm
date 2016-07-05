/**
 * Created by john.sjostrom on 2016-07-04.
 */
import React from "react";
import Weather from "./Weather";

export default class Widgets extends React.Component {
    constructor() {
        super();
        let me = this;

        me.idCounter = 0;
        me.list = [];
        me.state = {update : true};

        //localStorage.setItem("locations", "1:Rome;2:Malmö");

        if (typeof(Storage) !== "undefined") {
            // read local storage to see if we have any stored locations
            //let storedLocations = localStorage.getItem("locations");
            let storedLocations = this.getLocations( localStorage.getItem("locations") ),
                locations = this.splitLocations(storedLocations);

            if (locations){
                // if yes, create a widget for each
                locations.forEach(function(location){
                    me.addWidget(location[1], parseInt(location[0]));
                });

                return;
            }
        }

        me.addWidget();
    }

    getCities(locationsStr) {
        let me = this,
            locationsId = this.getLocations(locationsStr),
            cities = [];

        locationsId.forEach(function(location){
            cities.push(me.getCity(location));
        });

        return cities;
    }

    getCity(str){
        return str.split(":")[1];
    }

    splitLocations(arr){
        if ( arr) {
            let length = arr.length,
                locations = [],
                i;

            for ( i = -1; ++i < length; ){
                locations.push( arr[i].split(":") );
            }

            return locations;
        }
    }

    getLocations(str){
        if (typeof str === "string"){
            return str.split(";");
        }
    }

    updateStorage(id, city){
        let storedLocations = this.getLocations( localStorage.getItem("locations") ),
            locations = [],
            newCity = true,
            newLocationsStr,
            length,
            i;

        if ( storedLocations ){
            locations = this.splitLocations(storedLocations);
        }
        length = locations.length;

        if ( city ){
            // if we have a city it's new or we should update it
            locations.forEach(function(location){
                if ( parseInt(location[0]) === id ){
                    location[1] = city;
                    newCity = false;
                }
            });

            if ( newCity ){
                locations.push([id, city]);
            }
        }
        else {
            // if we only get the id we should remove it
            for ( i = -1; ++i < length ; ){
                if ( parseInt(locations[i][0]) === id ){
                    locations.splice(i, 1);
                    break;
                }
            }
        }

        newLocationsStr = this.makeLocationsStr(locations);

        if ( newLocationsStr.length > 0 ){
            localStorage.setItem("locations", newLocationsStr);
        }
        else {
            localStorage.removeItem("locations");
        }
    }

    makeLocationsStr(locations){
        let str = "";

        locations.forEach(function(location){
            str += location[0] + ":" + location[1] + ";";
        });

        if ( str.length > 0 ){
            str = str.slice(0, -1);
        }

        return str;
    }

    getId(){
        return Date.now();
        //return ++this.idCounter;
    }

    removeWidget(e){
        let length = this.list.length,
            i;

        for ( i = -1; ++i < length; ){
            if (this.list[i].props.id === e ){
                this.list.splice(i, 1);
                this.setState({update : !this.state.update});
                this.updateStorage(e);
                break;
            }
        }
    }

    addWidget(location, oldId){
        let id = typeof oldId === "number" ? oldId : this.getId(),
            city = location || "Stockholm";

        this.list.push( <Weather
            city={city}
            removeWidget = {this.removeWidget.bind(this)}
            updateStorage = {this.updateStorage.bind(this)}
            unit={"C"}
            id = {id}
            key = {id} /> );

        this.setState({update : !this.state.update});
    }

    render() {
        return (
            <div>
                {this.list}
                <img class="plusIcon" src="images/plus_sign.svg" onClick={this.addWidget.bind(this, undefined)}></img>
            </div>
        );
    }
}
