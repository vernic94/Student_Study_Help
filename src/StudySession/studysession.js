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

class StudySession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING"
    };
  }

  createStudySession(){
    this.setState({
      status: "CREATE"
    }); 
  }

  planStudySession(){
    console.log("hrjgkdfbb");
    
    this.setState({
      status: "PLAN"
    });
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
          <p>Location:</p>
          <div className="btnDiv">
            <button onClick={() => this.function()}>Create a study session</button>
          </div>
        </div>;
        break;
      case "PLAN":
        studySessionParameters = 
        <form action="action.php">
        mkojuW id : <input type="text" name="email" /><br />
        Password : <input type="text" name="passw" /><br />
        <input type="submit" value="Submit" />
        </form>;
        break;
      default:
        studySessionParameters = <p>Failed to load, please try again</p>  
        break; 
    }


    return (
      <div className="studysession">
        <h1>CREATE STUDY SESSION PAGE</h1>
        <p>Create a current study session or plan a study session in the future!</p>
        <button onClick={() => this.createStudySession()}>Create a study session</button>
        <button onClick={() => this.planStudySession()}>Plan a study session</button>
        <div className="studySessionParameters">
          {studySessionParameters}
        </div>
      </div>
    );
  }
}

export default StudySession;