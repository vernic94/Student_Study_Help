/* Map page (acccessible from menu)

ITERATION 2

Responsible:
*/

import React, { Component } from "react";
import "./map.css";

class MapComponent extends Component {
  componentDidMount(){
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

    mapboxgl.accessToken = 'pk.eyJ1IjoibG91am9ucyIsImEiOiJjazk4YWFqMngwMHFsM2ptbmFjaXc0M3ZqIn0.LoaiIt1kyXpMu6IdfcMikQ';
    var map = new mapboxgl.Map({
      container: 'map-comp',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [18.063240, 59.334591], // starting position
      zoom: 10
    });
  }
  render() {



    return (

         <div className="map-comp" id="map-comp"></div>

    );
  }
}

export default MapComponent;