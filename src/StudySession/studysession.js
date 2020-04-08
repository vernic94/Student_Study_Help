/* Create or plan study session page 

OFÄRDIG

ITERATION 2
Should consist of: 
- Plan session button ? (two seperate buttons or two seperate pages? One suggestion: choose between two and then depending on what you clicked, renders different stuff)
- Start session button
- header ?
- Side/top bar (?)

Must not be handled (this iteration):
- Store user in database

*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./studysession.css";
import Topbar from "../Topbar/topbar"

class StudySession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING"
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
        <div className="location-parameter">
          <label for="location">Location: </label>
          <select className="location-list" id="studysession-location">
            <option value="KTH-campus">KTH Valhallavägen</option>
            <option value="KTH-kista">KTH Kista</option>
            <option value="KTH-flemingsberg">KTH Flemingsberg</option>
            <option value="KTH-sodertalje">KTH Södertälje</option>
          </select>

          <div className="studysession-description">
            <p>Note: </p>
            <input className="description-box" type="text"></input>
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
            Start time : <input className="time-box" type="text" name="startTime" /><br />
            End time : <input className="time-box" type="text" name="endTime" /><br />
            Location :  
              <select className="location-list" id="studysession-location">
                <option value="KTH-campus">KTH Valhallavägen</option>
                <option value="KTH-kista">KTH Kista</option>
                <option value="KTH-flemingsberg">KTH Flemingsberg</option>
                <option value="KTH-sodertalje">KTH Södertälje</option>
              </select>
            <br/>Description : <input className="description-box" type="text" name="description" /><br />
            <input className="studysession-btn" type="submit" value="Plan study session" />
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
            <button onClick={() => this.choiceCreateStudySession()}>Create a study session</button>
            <button onClick={() => this.choicePlanStudySession()}>Plan a study session</button>
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