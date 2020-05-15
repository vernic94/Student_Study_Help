import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./sessionEditor.css";
import Topbar from "../Topbar/topbar"
import "firebase/firestore";
import modelInstance from "../data/Model";
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

class SessionEditor extends Component {

    // Constructor
    constructor(props){
        super(props);
        this.state = {
            subject: "",
            sessionDate: "",
            startTime: "",
            endTime: "",
            longitude: "",
            latitude: "",
            description: "",
            allSubjects: [],
            startTimeClock: ""
        }
    }

    componentDidMount(){

        // Set state
        let docRef = modelInstance.getCurrentSession();

        console.log(docRef);
            docRef.get().then(doc => {
            this.setState({
                subject: doc.data().subject,
                startTime: doc.data().startTime,
                endTime: doc.data().endTime,
                longitude: doc.data().location.longitude,
                latitude: doc.data().location.latitude,
                description: doc.data().description,
                sessionDate: modelInstance.dateFromTimestamp(doc.data().startTime)
            })
        })

        var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
        mapboxgl.accessToken = 'pk.eyJ1IjoidmVybmljIiwiYSI6ImNrOWltOXJ0YjAwNjQzbnA4eXlmY293eWkifQ.dA5_3vrOMVMmIEThwLQlUg';    
        
        var map = new mapboxgl.Map({
        container: 'mapSession',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [18.063240, 59.334591],
        zoom: 12
        });
    
        map.addControl(
          new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
            })
          );
    
    
        // Add geolocate control to the map.
        map.addControl(
          new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true
            })
          );
          const currentPos: Project = {
            longitude: this.state.longitude,
			latitude: this.state.latitude
		  }
          var markSessionPosition = new mapboxgl.Marker();
          map.on('click', e=> {
              this.setState({
                longitude: e.lngLat.lng,
                latitude: e.lngLat.lat
              });

              console.log(this.state.longitude + "<state e> " + e.lngLat.lng);
    
              markSessionPosition.setLngLat([e.lngLat.lng, e.lngLat.lat])
              .addTo(map);
          });

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

    //handles form submission
    submitHandler = (event) => {
        
    event.preventDefault();

    const docRef = modelInstance.getCurrentSession();

    docRef.update({
        subject: this.state.subject,
        description: this.state.description,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        longitude: this.state.longitude,
        latitude: this.state.latitude
    }).then(function() {
        console.log("Document successfully updated!");
    });

    //navigates back to the profile page
    this.props.history.push('/');
}

    removeSession(){
        console.log("here");
        modelInstance.removeSession(modelInstance.getCurrentSession());
        this.props.history.push('/');
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

        getDateOfToday(){
            let today = new Date();
            let date;
            console.log(today);
            if((today.getMonth()+1) > 9 && today.getDate() > 9){
            date = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
            }
            else if((today.getMonth()+1) < 10){
              date = today.getFullYear() + "-0" + (today.getMonth()+1) + "-" + today.getDate();
            }
            else if(today.getDate() < 10){
              date = today.getFullYear() + "-0" + (today.getMonth()+1) + "-0" + today.getDate();
            }
          
            return date;
          }

          getStartTime(){
              console.log(this.state.startTime + "LOU");
              return modelInstance.timeFromTimestamp(this.state.startTime);
          }

          setStartTime(startTime){
            let startTimeTemp = new Date(this.state.sessionDate + 'T' + startTime + ':00');
            this.setState({
              startTime: startTimeTemp,
              startTimeClock: startTime
            });
          }
        
          setEndTime(endTime){
            let endTimeTemp = new Date(this.state.sessionDate + 'T' + endTime + ':00');
            this.setState({
              endTime: endTimeTemp
            });
          }
	
	render(){
        let allSubjects = this.allSubjects();
        let today = this.getDateOfToday();
        console.log(this.state.startTime);


		return(
            <div className="sessionEditor-page">
                <Topbar/>
                <form className="SessionEditorContainer" onSubmit={this.submitHandler}>
                    <h1>Edit study session</h1>
                    <p>Please just edit the property/properties you want to change.</p>
                    
                    <div className="subject-div">
                        <label for="subject">Select subject : </label><br/>
                        <select name="subject" className="editSubject" onChange={e => this.setState({subject: e.target.value})}>
                            <option>{this.state.subject}</option>
                            {allSubjects}
                        </select>

                        <div className="timeBoxes">
                             <label for="sessionDate">Date : </label>
                            <input type="date" id="sessionDate" name="sessionDate" className="sessionDate" min={today} max="2020-12-31" onChange={e => this.setState({sessionDate: e.target.value})}/> <br/>
                            <label for="startTime">Start time : </label>
                            <input type="time" id="appt" name="appt" className="startTimeBox"
                                min="06:00" max="23:00" onChange={e => this.setStartTime(e.target.value)}></input> <br/>
                            <label for="endTime">End time : </label>
                            <input type="time" id="appt" name="appt" className="endTimeBox"
                            min = "09:00" max="23:00" onChange={e => this.setEndTime(e.target.value)}></input> <br/>
                        </div>
                    </div>
                    <div className="location-parameterEditor">
                        <label for="location">Location : </label>
                        <div id="mapEditor-container" className="map-containerEditor">
                        <div id="geocoderEdit" className="geocoder"></div>
                            <div id="mapSession" className="mapSessionEditor"></div>
                            <pre id="info"></pre>
                        </div>
                    </div>
                    <div className="descriptionEditor">
                        <label>Description :
                            <br></br>
                            <textarea type="text" className="descriptionTextArea" name="description" value={this.state.description} rows="4" cols="50" onChange={e => this.setState({description: e.target.value})}></textarea>
                        </label>
                    </div>

                    <br/>
                    <div className="SaveCancel">
                        <button className="ButtonSave" type="submit" onClick={this.submitHandler}>Save</button>
                        <Link to="/">
                            <button className="ButtonCancel" type="reset">Cancel</button>
                        </Link>
                    </div>
                </form>
                <div className="RemoveSession">
                    <button className="BtnRemoveSession" onClick={this.removeSession}>Delete study session</button>
                </div>
            </div>
        );
    }
}

export default SessionEditor;