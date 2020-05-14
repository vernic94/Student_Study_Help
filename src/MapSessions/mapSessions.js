import React, {Component} from "react";
import {Link, useParams} from "react-router-dom";
import "./mapSessions.css";
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import StudySessions from "../studysessions/studysessions";
import modelInstance from "../data/Model";
import Topbar from "../Topbar/topbar";
import * as mapboxConfig from '../data/mapboxConfig';

const token = mapboxConfig.REACT_APP_TOKEN;
//process.env.mapboxAPIKey;
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

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
                            firstName: "",
                            lastName:"",
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
        mapboxgl.accessToken = token;
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
               
        document.getElementById('geocoderMap').appendChild(geocoder.onAdd(map));

        let db = global.firebase.firestore();
        var study_sessions = [];

        db.collection('study_session').get().then(
            (snapshot) => {
                snapshot.forEach((doc) => {
                       study_sessions.push(doc.data());
                })
            }).then(() => {
                this.setState({sessions: study_sessions})
                const getFeatures = async () => {
                    return Promise.all(this.filterSessions().map(session => this.createFeatureFromSession(session)))
                }
                
                getFeatures().then(features => {
                    this.setState({
                        geojson: {
                        type: 'FeatureCollection',
                        features: features
                        },                        
        
                    });
                
                    // add markers to map
                    this.state.geojson.features.forEach(function(marker) {
                        
                        // create a HTML element for each feature
                        var el = document.createElement('div');
                        el.className = 'marker';

                        // make a marker for each feature and add to the map
                        new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates)
                        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML(`<div> <Strong> User: </Strong>${marker.properties.firstName} ${marker.properties.lastName}<br>
                            <Strong> Subject: </Strong>${marker.properties.subject}<br>
                            <Strong> Description: </Strong>${marker.properties.description}<br>
                            <Strong> Start Time: </Strong>${marker.properties.start}<br>
                            <Strong> End Time: </Strong>${marker.properties.end}<br>
                            </div>`))
                        .addTo(map);
                    })
                    });
                });

                }

    fetchUserData(username) {
        return modelInstance.getUser(username).then(doc => doc.data())
        
    }

    filterSessions(){
        let filteredSessions = this.state.sessions.filter(value => value.location && !(typeof value.location === 'string' || value.location instanceof String))
        filteredSessions = filteredSessions.filter(value => value.location && !(value.location.longitude == "" || value.location.latitude == ""))
        return filteredSessions;
    }

    createFeatureFromSession = async session => {
        let temp = null;
        await this.fetchUserData(session.creator).then(result => { 
            temp = {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',  
                        coordinates: [session.location.longitude, session.location.latitude]
                    },
                    properties: {
                        firstName: result.firstname,
                        lastName: result.lastname,
                        subject: session.subject,
                        start: modelInstance.formatDate(modelInstance.convertToTime(session.startTime)),
                        end: modelInstance.formatDate(modelInstance.convertToTime(session.endTime)),
                        description: session.description
                    }
                }
            });
        return temp    
    }


    
    render() {
        return (
            <div >
            <h1 className="infoText">Click on the markers to see more details</h1>
           <div id="geocoderMap" className="geocoderMap"></div>
            <div id ="map"> </div>
            </div>
      )
    }
}

export default MapSessions;