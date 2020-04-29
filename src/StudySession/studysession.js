/* Create or plan study session page 

Responsible: Lou 

*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./studysession.css";
import Topbar from "../Topbar/topbar";
import Map from "../MapComponent/map"
import modelInstance from "../data/Model";

class StudySession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING",
      description: null, 
      startTime: null,
      endTime: null,
      location: null
    };
  }

  choiceCreateStudySession(){
    this.setState({
      status: "CREATE"
    }); 
  }

  choicePlanStudySession(){    
    this.setState({
      status: "PLAN"
    });
  }

  /*
  * Function shall create study session based on input parameters from user
  */
  createStudySession(){
    console.log("STUDY SESSION SHOULD BE CREATED");
  }

  render() {
    let studySessionParameters = null;

    switch(this.state.status) {
      case "LOADING":
        studySessionParameters = null;
        break;
      case "CREATE":
        studySessionParameters = 
        <div className="div-parameter">
          <div className="location-parameter">
          <label for="location">Location: </label>
          <div className="location-map">
            <Map/>
          </div>
          </div>
          <div className="studysession-description">
            <p className="Note-text">Note: </p>
            <textarea  className="description-box" placeholder="Description of study session" id="description" rows="5" cols="100">
            </textarea><br/>
          </div>

          <div className="btnDiv">
            <Link to="/maps">
              <button onClick={() => this.createStudySession()} className="studysession-btn">Create a study session</button>
            </Link>
          </div>
        </div>;
        break;
      case "PLAN":
        studySessionParameters = 
          <form action="action.php">
            Start time : <input className="time-box" type="text" name="startTime" onChange={e => this.setState({startTime: e.target.value})}/><br />
            End time : <input className="time-box" type="text" name="endTime" onChange={e => this.setState({endTime: e.target.value})}/><br />
            <div className="location-map">
              <p>            Location :  </p>
            <Map/>
          </div>
              <textarea  className="description-box" placeholder="Description of study session" id="description" rows="5" cols="100">
            </textarea><br/>
            <Link to="/maps">
              <input className="studysession-btn" type="submit" value="Plan study session" />
            </Link>
          </form>;
        break;
      default:
        studySessionParameters = <p>Failed to load, please try again</p>  
        break; 
    }


    return (

        <div className="studysession-page">
        <Topbar/>
        <div className="studysession">
          <h1>CREATE STUDY SESSION PAGE</h1>
          <p>Create a current study session or plan a study session for the future!</p>
          
          <div className="choice-btns">
            <button className="choice-btn" onClick={() => this.choiceCreateStudySession()}>Create a study session</button>
            <button className="choice-btn"  onClick={() => this.choicePlanStudySession()}>Plan a study session</button>
          </div>

          <div className="studySessionParameters">
            {studySessionParameters}
          </div>
        </div>
      </div>
    );
  }
}

export default StudySession;