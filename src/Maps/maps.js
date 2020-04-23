/* Map page (acccessible from menu)

ITERATION 2
Should consist of: 
- map from API ?
- being able to see current user's location?
- header ?
- Side/top bar (?)

Must not be handled (this iteration):
- Other user's location
- Filter function (where you choose different parammeters)

*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./maps.css";
import Topbar from "../Topbar/topbar"


class Maps extends Component {
  componentDidMount(){
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

    mapboxgl.accessToken = 'pk.eyJ1IjoibG91am9ucyIsImEiOiJjazk4YWFqMngwMHFsM2ptbmFjaXc0M3ZqIn0.LoaiIt1kyXpMu6IdfcMikQ';
    var map = new mapboxgl.Map({
      container: 'test',
      style: 'mapbox://styles/mapbox/streets-v11'
    });
  }
  render() {



    return (
      <div className="maps-page">
          <Topbar/>
         <h1>MAPS PAGE</h1>
         <div id="test"></div>
      </div>

    );
  }
}

export default Maps;