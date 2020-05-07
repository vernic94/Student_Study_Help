/* Create or plan study session page 

Responsible: Lou 

*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./createStudysession.css";
import Topbar from "../Topbar/topbar";
import dbHandlerInstance from "../data/dbHandler";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton} from 'react-bootstrap';

class CreateStudySession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING",
      description: null, 
      startTime: null,
      endTime: null,
      location: "", 
    /*  longitude: 18,
      latitude: 20,*/
      subject: "",
      sessionDate: null,
    };
  }

  choiceCreateStudySession(){
    this.setState({
      status: "CREATE"
    }); 
  }

  /*
  * Function shall create study session based on input parameters from user
  */
  createStudySession(){
    console.log("STUDY SESSION SHOULD BE CREATED");
    dbHandlerInstance.createStudySession()
  }

  submit(){
    dbHandlerInstance.createStudySession(this.state.subject, this.state.startTime, this.state.endTime, this.state.location, this.state.description);
  }

  setStartTime(startTime){
    let startTimeTemp = new Date(this.state.sessionDate + 'T' + startTime + ':00');
    this.setState({
      startTime: startTimeTemp
    });
  }

  setEndTime(endTime){
    let endTimeTemp = new Date(this.state.sessionDate + 'T' + endTime + ':00');
    this.setState({
      endTime: endTimeTemp
    });
  }
/*
  <DropdownButton id="studysession-location" title="Choose location">
  <Dropdown.Item value="KTH-campus" onClick={e => this.setState({location: "KTH-campus"})}>KTH Valhallavägen</Dropdown.Item>
  <Dropdown.Item value="KTH-kista" onClick={e => this.setState({location: "KTH-kista"})}>KTH Kista</Dropdown.Item>
  <Dropdown.Item value="KTH-flemingsberg" onClick={e => this.setState({location: "KTH-flemingsberg"})}>KTH Flemingsberg</Dropdown.Item>
  <Dropdown.Item value="KTH-sodertalje" onClick={e => this.setState({location: "KTH-sodertalje"})}>KTH Södertälje</Dropdown.Item>
</DropdownButton>*/
  render() {
    let studySessionParameters = null;

    studySessionParameters = 
        <div className="div-parameter">
          <form action="action.php">
            <label for="subject">Enter subject : </label>
            <input type="text" id="sessionSubject" name="sessionSubject" onChange={e => this.setState({subject: e.target.value})}/> <br/>
            <div className="timeBoxes">
              <label for="sessionDate">Date : </label>
              <input type="date" id="sessionDate" name="sessionDate" onChange={e => this.setState({sessionDate: e.target.value})}/> <br/>
              <label for="startTime">Start time : </label>
              <input type="time" id="appt" name="appt"
                min="06:00" max="23:00" required onChange={e => this.setStartTime(e.target.value)}></input> <br/>
              <label for="endTime">End time : </label>
              <input type="time" id="appt" name="appt"
                min="06:00" max="23:00" required onChange={e => this.setEndTime(e.target.value)}></input> <br/>
            </div>
            <div className="location-parameter">
            <label for="location">Location : </label>

          </div>
          <div className="studysession-description">
            <p className="Note-text">Note: </p>
            <textarea  className="description-box" placeholder="Description of study session" onChange={e => this.setState({description: e.target.value})} id="description" rows="5" cols="100">
            </textarea><br/>
          </div>

          <div className="btnDiv">
            <Link to="/">
              <button onClick={() => this.submit()} className="studysession-btn">Create a study session</button>
            </Link>
          </div>
          </form>
        </div>;

    return (
        <div className="studysession-page">
        <Topbar/>
        <div className="studysession">
          <h1>CREATE STUDY SESSION PAGE</h1>

          <div className="studySessionParameters">
            {studySessionParameters}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateStudySession;