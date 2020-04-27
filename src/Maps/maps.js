/* Map page (acccessible from menu)

Responsible:
*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./maps.css";
import Map from "../MapComponent/map"

class Maps extends Component {

  render() {
    return (
      <div className="maps-page">
         <h1>MAPS PAGE</h1>
         <Map/>
      </div>

    );
  }
}

export default Maps;