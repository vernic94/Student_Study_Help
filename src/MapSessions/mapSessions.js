import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./mapSessions.css";
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const token = process.env.mapboxAPIKey;
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = token;

class MapSessions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sessions: [],
            location: [],
            geojson: {
                type: 'FeatureCollection',
                features: [{
                        type: 'Feature',
                        geometry: {
                        type: 'Point',
                        coordinates: []
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
                    console.log("marker in addMarkers:",marker)
                    // create a HTML element for each feature
                    var el = document.createElement('div');
                    el.className = 'marker';
                    console.log("marker.geometry.coordinates",marker.geometry.coordinates)
                    // make a marker for each feature and add to the map
                    new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates)
                    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML("<h1>Hello World!</h1>"))
                    .addTo(map);
                });
            }
        );      
      
    }

    displaySessionLocation(){
        const features = this.state.sessions.map(session => {
            console.log(session)
            return {
                type: 'Feature',
                geometry: {
                type: 'Point',
                coordinates: [session.location._long, session.location._lat]
                }
            }
        });
        this.setState({
            geojson: {
            type: 'FeatureCollection',
            features: features
            }});
        console.log("geoJSN state: ",this.state.geojson)
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