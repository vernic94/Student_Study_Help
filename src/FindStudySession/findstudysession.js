/* Find page (acccessible from menu)

Responsible:	Saga
*/

import React, { Component } from "react";
import Topbar from "../Topbar/topbar"
import "./findstudysession.css";
import MapSessions from "../MapSessions/mapSessions";
import StudySessions from "../studysessions/studysessions";

class FindStudySession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
  }
  mapsHandler=()=>{
	  this.setState({status: "MAPS"});
  }
  listHandler=()=>{
	  this.setState({status: "LIST"});
  }
  render() {
	let currentView = <MapSessions />;
	let mapBtn = <button className="button btn btn-lg btn-primary" onClick={this.mapsHandler}>Map</button>
	let listBtn = <button className="button btn btn-lg  btn-primary" onClick={this.listHandler}>List</button>

	if (this.state.status==="MAPS"){
		currentView = <MapSessions/>
	}
	if (this.state.status==="LIST"){
		currentView = <StudySessions />
	}
    return (
      <div className="find-page">
         <Topbar/>
          <div className="btn-group" data-toggle="buttons">
         {mapBtn}
         {listBtn}
          </div>
          {currentView}
      </div>

    );
  }
}

export default FindStudySession;