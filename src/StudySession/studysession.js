/* Create or plan study session page 

Responsible: Lou 

*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./studysession.css";
import Topbar from "../Topbar/topbar";
import Map from "../MapComponent/map"
import modelInstance from "../data/Model";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton} from 'react-bootstrap';

class StudySession extends Component {
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
      subject: null
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
    modelInstance.createStudySession()
  }

  submit(){
    modelInstance.createStudySession(this.state.startTime, this.state.endTime, this.state.location, this.state.description);
  }

  render() {
    let studySessionParameters = null;

    switch(this.state.status) {
      case "LOADING":
        studySessionParameters = null;
        break;
      case "CREATE":
        let startTime = new Date();

        studySessionParameters = 
        <div className="div-parameter">
            <form action="action.php">
            End time : <input className="time-box" type="text" name="endTime" onChange={e => this.setState({endTime: e.target.value, startTime: startTime})}/><br />
            <div className="location-parameter">
            <DropdownButton id="studysession-location" title="Choose location">
              <Dropdown.Item value="KTH-campus" onClick={e => this.setState({location: "KTH-campus"})}>KTH Valhallavägen</Dropdown.Item>
              <Dropdown.Item value="KTH-kista" onClick={e => this.setState({location: "KTH-kista"})}>KTH Kista</Dropdown.Item>
              <Dropdown.Item value="KTH-flemingsberg" onClick={e => this.setState({location: "KTH-flemingsberg"})}>KTH Flemingsberg</Dropdown.Item>
              <Dropdown.Item value="KTH-sodertalje" onClick={e => this.setState({location: "KTH-sodertalje"})}>KTH Södertälje</Dropdown.Item>
            </DropdownButton>
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
          </form>;
        </div>;
        break;
      case "PLAN":
        studySessionParameters = 
          <form action="action.php">
            Start time : <input className="time-box" type="text" name="startTime" onChange={e => this.setState({startTime: e.target.value})}/><br />
            End time : <input className="time-box" type="text" name="endTime" onChange={e => this.setState({endTime: e.target.value})}/><br />
            <div className="location-parameter">
            <DropdownButton id="studysession-location" title="Choose location">
              <Dropdown.Item value="KTH-campus" onClick={e => this.setState({location: "KTH-campus"})}>KTH Valhallavägen</Dropdown.Item>
              <Dropdown.Item value="KTH-kista" onClick={e => this.setState({location: "KTH-kista"})}>KTH Kista</Dropdown.Item>
              <Dropdown.Item value="KTH-flemingsberg" onClick={e => this.setState({location: "KTH-flemingsberg"})}>KTH Flemingsberg</Dropdown.Item>
              <Dropdown.Item value="KTH-sodertalje" onClick={e => this.setState({location: "KTH-sodertalje"})}>KTH Södertälje</Dropdown.Item>
            </DropdownButton>
          </div>
              <textarea  className="description-box" placeholder="Description of study session" onChange={e => this.setState({description: e.target.value})} id="description" rows="5" cols="100">
            </textarea><br/>
            <Link to="/">
              <button className="studysession-btn" type="submit" onClick={this.submit}>Plan study session</button>
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