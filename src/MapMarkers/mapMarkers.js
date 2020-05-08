

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./mapMarkers.css";
import Topbar from "../Topbar/topbar"
import * as mapboxConfig from '../data/mapboxConfig'

const TOKEN = mapboxConfig.REACT_APP_TOKEN;

class MapMarkers extends Component {
    constructor(props){
        super(props);
      }
   
    componentDidMount(){
        var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
        mapboxgl.accessToken = TOKEN;

        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [18.063240, 59.334591],
        zoom: 12
        });

        var geojson = {
            type: 'FeatureCollection',
            features: [{
                    type: 'Feature',
                    geometry: {
                    type: 'Point',
                    coordinates: [17.949388635580192, 59.40483317212755]
                    },
                    properties: {
                        title: 'KTH-campuses',
                        description: 'KTH Kista'
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                    type: 'Point',
                    coordinates: [18.07222775, 59.3464415]
                    },
                    properties: {
                    title: 'KTH-campuses',
                    description: 'KTH campus (Valhallavägen)'
                    },       
                },{
                    type: 'Feature',
                    geometry: {
                    type: 'Point',
                    coordinates: [ 17.939299780423454, 59.21897400230449]
                    },
                    properties: {
                    title: 'Mapbox',
                    description: 'KTH Flemingsberg'
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                    type: 'Point',
                    coordinates: [17.620576, 59.201889]
                    },
                    properties: {
                    title: 'Mapbox',
                    description: 'KTH Södertälje'
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                    type: 'Point',
                    coordinates: [18.023689876335794, 59.35055597960692]
                    },
                    properties: {
                    title: 'Mapbox',
                    description: 'KTH Solna (Science for life laboratory)'
                    }
                }
        ]
        };
        console.log(geojson)
        // add markers to map
        geojson.features.forEach(function(marker) {

            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'marker';

            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML("<h1>Hello World!</h1>"))
            .addTo(map);
        });
    }

  render() {
    return (
        <div>
            <Topbar/>
        <div>
         <div className="marker"> </div>  
         <div id="map"></div>
         </div>
         </div>
    );
  }
}

export default MapMarkers;

