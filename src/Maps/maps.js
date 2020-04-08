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


class CreateAccount extends Component {
  render() {
    return (
      <div className="maps-page">
          <Topbar/>
         <h1>MAPS PAGE</h1>
      </div>

    );
  }
}

export default CreateAccount;