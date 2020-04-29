/* Find page (acccessible from menu)

Responsible:	Saga
*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
//import "./maps.css";
import Topbar from "../Topbar/topbar"
import Maps from "../Maps/maps"

class FindStudySession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "MAPS"
    };
  }
  mapsHandler=()=>{
	  this.setState({status: "MAPS"});
  }
  listHandler=()=>{
	  this.setState({status: "LIST"});
  }
  render() {
	let currentView = null;
	let mapBtn = <button className="button" onClick={this.mapsHandler}>Map</button>
	let listBtn = <button className="button" onClick={this.listHandler}>List</button>

	if (this.state.status==="MAPS"){
		currentView = <Maps/>
		//mapBtn = <button disabled>Map</button>
		//listBtn = <button >List</button>
	}
	if (this.state.status==="LIST"){
		currentView = <h1>List</h1>
		//mapBtn = <button >Map</button>
		//listBtn = <button disabled>List</button>
	}
    return (
      <div className="find-page">
         <Topbar/>
         {currentView}
         {mapBtn}
         {listBtn}

      </div>

    );
  }
}

export default FindStudySession;