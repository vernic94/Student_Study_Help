import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./mapSessions.css";
import * as mapboxConfig from '../data/mapboxConfig';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import studySessionsInstance from "../studysessions/studysessions";

const token = mapboxConfig.REACT_APP_TOKEN;
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = token;

class MapSessions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sessions: [],
            geojson: {
                type: 'FeatureCollection',
                features: [{
                        type: 'Feature',
                        geometry: {
                        type: 'Point',
                        coordinates: [],
                        properties: {
                            user: "",
                            subject:"",
                            description: "",
                            start:"",
                            end:"",
                            }
                        },
                    }]
                },
        }
      }
    

    componentDidMount() {
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [18.063240, 59.334591],
            zoom: 12,
            })
            
            var geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            });
               
        document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

        let db = global.firebase.firestore();
        var study_sessions = [];
        db.collection('study_session').get().then(
            (snapshot) => {
                snapshot.forEach((doc) => {
                       study_sessions.push(doc.data());
                })
            }).then(() => {
                this.setState({sessions: study_sessions})
                console.log("sessions state: ", this.state.sessions)
               
                    this.displaySessionLocation();
                    // add markers to map
                    this.state.geojson.features.forEach(function(marker) {
                        // create a HTML element for each feature
                        var el = document.createElement('div');
                        el.className = 'marker';

                        // make a marker for each feature and add to the map
                        new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates)
                        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML(`<div> <Strong> User: </Strong>${marker.properties.user}<br>
                            <Strong> Subject: </Strong>${marker.properties.subject}<br>
                            <Strong> Description: </Strong>${marker.properties.description}<br>
                            <Strong> Start Time: </Strong>${marker.properties.start}<br>
                            <Strong> End Time: </Strong>${marker.properties.end}<br>
                            </div>`))
                        .addTo(map);
                    });
            });    
    }

    filterSessions(){
        const filteredSessions = this.state.sessions.filter(value => value.location && !(typeof value.location === 'string' || value.location instanceof String))
        console.log("filtered sessions: ",filteredSessions)
        return filteredSessions;
    }

    // displaySessionInfo(){
    //     const properties = this.filterSessions().map(session => {
    //         console.log("session: ",session)
    //         console.log("user:", session.creator)
    //         console.log("subject:", session.subject)
    //         console.log("description:", session.description)
    //        return{ 
    //            properties: {
    //                 user: session.creator,
    //                 subject: session.subject,
    //                 start: modelInstance.convertToTime(session.startTime),
    //                 end: studysessions.formatDate(this.props.studysessions.convertToTime(session.endTime)),
    //                 description: session.description
    //             }
    //         }
    //     });
        
    //     this.setState({
    //             properties: properties
    //     });
    // }

    displaySessionLocation(){
        const features = this.filterSessions().map(session => {
            return {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [session.location._long, session.location._lat]
                },
                properties: {
                    user: session.creator,
                    subject: session.subject,
                    start: studySessionsInstance.formatDate(studySessionsInstance.convertToTime(session.startTime)),
                    end: studySessionsInstance.formatDate(studySessionsInstance.convertToTime(session.endTime)),
                    description: session.description
                }
            }
        });
        this.setState({
            geojson: {
            type: 'FeatureCollection',
            features:  features
            }});
    }
    
    render() {
        return (
            <div style={{ height: '100vh'}}>
            <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>All study sessions, click on the markers to see more details</h1>
            <div id="geocoder" className="geocoder"></div>
            <div id ="map"> </div>
            </div>
      )
    }
}

export default MapSessions;