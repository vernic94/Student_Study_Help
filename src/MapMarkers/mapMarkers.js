

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./mapMarkers.css";
import Topbar from "../Topbar/topbar"


class MapMarkers extends Component {
    constructor(props){
        super(props);
        this.state={
            //geojson: {},
        }
      }
   
    componentDidMount(){
        var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
        mapboxgl.accessToken = 'pk.eyJ1IjoidmVybmljIiwiYSI6ImNrOWltOXJ0YjAwNjQzbnA4eXlmY293eWkifQ.dA5_3vrOMVMmIEThwLQlUg';    
        
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-96, 37.8],
        zoom: 3
        });

        var geojson = {
            type: 'FeatureCollection',
            features: [{
                    type: 'Feature',
                    geometry: {
                    type: 'Point',
                    coordinates: [-77.032, 38.913]
                    },
                    properties: {
                        title: 'Mapbox',
                        description: 'KTH Kista'
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                    type: 'Point',
                    coordinates: [-122.414, 37.776]
                    },
                    properties: {
                    title: 'Mapbox',
                    description: 'KTH campus (Valhallavägen)'
                    },       
                },{
                    type: 'Feature',
                    geometry: {
                    type: 'Point',
                    coordinates: [-122.414, 37.776]
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
                    coordinates: [-122.414, 37.776]
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
                    coordinates: [-122.414, 37.776]
                    },
                    properties: {
                    title: 'Mapbox',
                    description: 'KTH Solna (Science for life laboratory)'
                    }
                }
        ]
        };
        // add markers to map
        geojson.features.forEach(function(marker) {

            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'marker';

            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
            .addTo(map);
        });
    }

  render() {
    return (
      <div className="marker">
          <Topbar/>
         <h1>map with coordinates</h1>
         <div id="map"></div>
      </div>

    );
  }
}

export default MapMarkers;

