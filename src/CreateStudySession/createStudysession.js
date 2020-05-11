/* 

Page component for creating a study session. 

Responsible: Lou 

*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./createStudysession.css";
import Topbar from "../Topbar/topbar";
import dbHandlerInstance from "../data/dbHandler";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import modelInstance from "../data/Model";

const token = process.env.mapboxAPIKey;
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = token;

class CreateStudySession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING",
      description: "", 
      startTime: new Date("2020-05-01" + 'T' + "09:00" + ':00'),
      endTime: new Date("2020-05-01" + 'T' + "11:00" + ':00'),
      location: "", 
      subject: "",
      sessionDate: "2020-05-01",
      longitude: "",
      latitude: "",
      allSubjects: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount(){
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoidmVybmljIiwiYSI6ImNrOWltOXJ0YjAwNjQzbnA4eXlmY293eWkifQ.dA5_3vrOMVMmIEThwLQlUg';    
    
    var map = new mapboxgl.Map({
    container: 'mapSession',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [18.063240, 59.334591],
    zoom: 12
    });

      
    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
  });
     
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

    // Add geolocate control to the map.
    map.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
        })
      );
      var markSessionPosition = new mapboxgl.Marker();
      map.on('click', e=> {
          this.setState({
            longitude: e.lngLat.lng,
            latitude: e.lngLat.lat
          });

          markSessionPosition.setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(map);
      });

      //set state
      var docRef = modelInstance.getUser(localStorage.getItem("currentUser"));
      docRef.get().then(doc => {
          this.setState({
              userSubjects: doc.data().subject,
          })
      })


      // agnes metod, hämtar alla subjects
      let arrSub =[];
      modelInstance.getSubjects().get().then(
          (snapshot) => {
              snapshot.forEach((doc) => {
                  arrSub.push(doc.id);
          })
      }).then(() => {
          this.setState({allSubjects: arrSub})
      })

}

  submit(){
    dbHandlerInstance.createStudySession(this.state.subject, this.state.startTime, this.state.endTime, this.state.latitude, this.state.longitude, this.state.description);
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

  //create element with all subject options, agnes metod
  allSubjects(){
    let subjectOptions = []
    for(let i = 0; i < this.state.allSubjects.length; i++){
        subjectOptions.push(
            <option value={this.state.allSubjects[i]}>{this.state.allSubjects[i]}</option>
        )
    }
    return subjectOptions;
}

  render() {
    let allSubjects = this.allSubjects();

    return (
        <div className="studysession-page">
        <Topbar/>
        <div className="studysession">
          <h1>CREATE STUDY SESSION PAGE</h1>

          <div className="studySessionParameters">
          <div className="div-parameter">
          <form action="action.php">
            <div className="subjectDiv">
              <label for="subject">Select subject : </label><br/>
              <select name="subject" className="studySessionSubject" onChange={e => this.setState({subject: e.target.value})}>
                  <option disabled selected value></option>
                  {allSubjects}
              </select>
            </div>
            <div className="timeBoxes">
              <label for="sessionDate">Date : </label>
              <input type="date" id="sessionDate" name="sessionDate" className="sessionDate" defaultValue="2020-05-01" onChange={e => this.setState({sessionDate: e.target.value})}/> <br/>
              <label for="startTime">Start time : </label>
              <input type="time" id="appt" name="appt" className="startTimeBox"
                min="06:00" max="23:00" defaultValue="09:00" required onChange={e => this.setStartTime(e.target.value)}></input> <br/>
              <label for="endTime">End time : </label>
              <input type="time" id="appt" name="appt" className="endTimeBox"
                min="06:00" max="23:00" defaultValue="11:00" required onChange={e => this.setEndTime(e.target.value)}></input> <br/>
            </div>
            <div className="location-parameter">
            <label for="location">Location : </label>
              <div id="map-container">
              <div id="geocoder" className="geocoder"></div>
                <div id="mapSession" className="mapSession"></div>
                <pre id="info"></pre>
              </div>
          </div>
          <div className="studysession-description">
            <label for="description">Note : </label><br/>
            <textarea  className="description-box" placeholder="Decription of the study session, for example course code, group room, conference room etc." onChange={e => this.setState({description: e.target.value})} id="description" rows="5" cols="100">
            </textarea><br/>
          </div>

          <div className="btnDiv">
            <Link to="/find-study-session">
              <button onClick={() => this.submit()} className="studysession-btn">Create a study session</button>
            </Link>
          </div>
          </form>
        </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default CreateStudySession;