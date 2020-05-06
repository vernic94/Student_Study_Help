import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./mapSessions.css";
import {firebaseConfig} from "../data/firebaseConfig";
import Topbar from "../Topbar/topbar";
import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import * as mapboxConfig from '../data/mapboxConfig';

const token = mapboxConfig.REACT_APP_TOKEN;
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

class MapSessions extends Component {

    constructor(props) {
        super(props);
        this.mapRef = React.createRef()
        this.state = {
            sessions: [],
            location: [],
            searchResultLayer: null,
            marker: {
                color: 'orange'
                },
            viewport :{
                latitude: 59.334591,
                longitude:  18.063240,
                zoom: 10,
            },
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
        let db = global.firebase.firestore();
        var study_sessions = [];
        db.collection('study_session').get().then(
            (snapshot) => {
                snapshot.forEach((doc) => {
                    study_sessions.push(doc.data());
                })
            }).then(() => {
                this.setState({sessions: study_sessions})
                console.log(this.state.sessions)
                this.displaySessionLocation()
            }
        );
    }

    displaySessionLocation(){
        this.setState({
            geojson: {
            type: 'FeatureCollection',
            features: [{
                    type: 'Feature',
                    geometry: {
                    type: 'Point',
                    coordinates: [this.state.sessions[5].location._long, this.state.sessions[5].location._lat]
                    },
                }]
            }})
        console.log(this.state.geojson)
        
        this.addMarkers(); 
    }
    
    handleViewportChange = viewport => {
        this.setState({
          viewport: { ...this.state.viewport, ...viewport }
        })
      }
    
    handleGeocoderViewportChange = viewport => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };

        return this.handleViewportChange({
            ...viewport,
            ...geocoderDefaultOverrides
        });
    };

    handleOnResult = event => {
        this.setState({
            searchResultLayer: new GeoJsonLayer({
            id: "search-result",
            data: event.result.geometry,
            getFillColor: [255, 0, 0, 128],
            getRadius: 1000,
            pointRadiusMinPixels: 10,
            pointRadiusMaxPixels: 10
            })
        })
    }

    getSessionLocation(){

    }

    addMarkers(){
    // add markers to map
        this.state.geojson.features.forEach(function(marker) {
            console.log(marker)
            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'marker';
            console.log(marker.geometry.coordinates)
            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates)
            //.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            //.setHTML("<h1>Hello World!</h1>"))
            //.addTo(<MapGL ref={this.mapRef} />);
        });
    
    }  

    render() {
        const { viewport, searchResultLayer, sessions, location} = this.state
        return (
            <div style={{ height: '100vh'}}>
            <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>All study sessions, click on the marker to see more details</h1>
            <MapGL 
                ref={this.mapRef}
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                width="100%"
                height="90%"
                onViewportChange={this.handleViewportChange}
                mapboxApiAccessToken={token}
                sessionMarkers={this.addMarkers}
                >
                 <Geocoder 
                mapRef={this.mapRef}
                onResult={this.handleOnResult}
                onViewportChange={this.handleGeocoderViewportChange}
                mapboxApiAccessToken={token}
                position='top-left'
              />
            </MapGL>
            <DeckGL {...viewport} layers={[searchResultLayer]} />
            </div>
      )
    }


}

export default MapSessions;