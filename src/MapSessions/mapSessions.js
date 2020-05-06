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
mapboxgl.accessToken = token;

class MapSessions extends Component {

    constructor(props) {
        super(props);
        this.mapRef = React.createRef()

        this.state = {
            //map:{},
            // map: new mapboxgl.Map({
            //         container: 'map',
            //         style: 'mapbox://styles/mapbox/streets-v11',
            //         center: [18.063240, 59.334591],
            //         zoom: 12
            //         }),
            // geocoder: new mapboxgl.Geocoder({
            //     onResult: this.handleOnResult(),
            //     onViewportChange: this.handleGeocoderViewportChange(),
            //     position:'top-left'
            //     }),
            sessions: [],
            location: [],
            searchResultLayer: null,
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
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [18.063240, 59.334591],
            zoom: 12,
            });

            // map.addControl(
            //     new MapboxGeocoder({
            //     accessToken: mapboxgl.accessToken,
            //     mapboxgl: mapboxgl
            //     })
            //     );
                
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

    handleMarkers = event => {
        this.setState({
            markerLayer: new mapboxgl.Marker({
                id:"marker",
                data: event.result.geometry.coordinates,
                getFillColor: [255, 0, 0, 128],
            })
        })
    }

    // addMarkers(){

    //     // add markers to map
    //     this.state.geojson.features.forEach(function(marker) {
    //         console.log("marker in addMarkers:",marker)
    //         // create a HTML element for each feature
    //         var el = document.createElement('div');
    //         el.className = 'mapboxgl-marker';
    //         console.log("marker.geometry.coordinates",marker.geometry.coordinates)
    //         // make a marker for each feature and add to the map
    //         new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates)
    //         //.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    //         //.setHTML("<h1>Hello World!</h1>"))
    //         .addTo(this.state.map);
    //     });
    // }  

    render() {
        const { viewport, searchResultLayer, sessions, location} = this.state
        console.log("viewport: ", viewport);
        return (
            <div style={{ height: '100vh'}}>
            <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>All study sessions, click on the marker to see more details</h1>
            {/* <div className="marker"> </div> */}
           <div id ="map" {...viewport} 
                        onViewportChange={this.handleViewportChange} 
                        layers={[searchResultLayer]}
                        >
           
                {/* <MapGL 
                    ref={this.mapRef}
                    {...viewport}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    width="100%"
                    height="90%"
                    onViewportChange={this.handleViewportChange}
                    mapboxApiAccessToken={token}
                    sessionMarkers={this.handleMarkers}
                    > */}
                    {/* <Geocoder 
                    mapRef={this.mapRef}
                    onResult={this.handleOnResult}
                    onViewportChange={this.handleGeocoderViewportChange}
                    mapboxApiAccessToken={token}
                    position='top-left'
                /> */}
                {/* </MapGL> */}
                {/* <DeckGL {...viewport} layers={[searchResultLayer], [markerLayer]} /> */}
                </div>
            </div>
      )
    }


}

export default MapSessions;