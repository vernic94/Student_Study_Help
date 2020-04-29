import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from "react-router-dom";
import Welcome from "./Welcome/welcome";
import CreateAccount from "./CreateAccount/createaccount";
import AboutUs from "./AboutUs/aboutus";
import Profile from "./Profile/profile";
import ProfileEditor from "./ProfileEditor/profileEditor";
import Maps from "./Maps/maps";
import StudySession from "./StudySession/studysession";
import FindStudySession from "./FindStudySession/findstudysession";
import {Topbar} from './Topbar/topbar'
import { Link } from "react-router-dom";
import MapMarkers from './MapMarkers/mapMarkers';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Route exact path="/" component={Welcome} />
        <Route path="/aboutus" component={AboutUs}/>
        <Route path="/find-study-session" component={FindStudySession}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/profileEditor" component={ProfileEditor}/>
        <Route path="/create-study-session" component={StudySession}/>
        <Route path="/create-account" component={CreateAccount}/>
        <Route path="/map-markers" component={MapMarkers}/>

      </header>
    </div>
  );
}

export default App;