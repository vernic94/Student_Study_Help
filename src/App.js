import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Welcome from "./Welcome/welcome";
import CreateAccount from "./CreateAccount/createaccount";
import AboutUs from "./AboutUs/aboutus";
import Profile from "./Profile/profile";
import ProfileEditor from "./ProfileEditor/profileEditor";
import CreateStudySession from "./CreateStudySession/createStudysession";
import FindStudySession from "./FindStudySession/findstudysession";
import NewPassword from "./NewPassword/newpassword";
import StudySessions from "./studysessions/studysessions";
import MapSessions from './MapSessions/mapSessions';

function App() {
  let exactPath;
  if(localStorage.getItem("currentUser") === "null" || localStorage.getItem("currentUser") === null) {
    exactPath = <Route exact path="/" component={Welcome} />
  }else{
    exactPath = <Route exact path="/" component={Profile} />
  }

  return (
    <div className="App">
      <header className="App-header">
        {exactPath}
        <Route path="/about-us" component={AboutUs}/>
        <Route path="/find-study-session" component={FindStudySession}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/profile-editor" component={ProfileEditor}/>
        <Route path="/create-study-session" component={CreateStudySession}/>
        <Route path="/create-account" component={CreateAccount}/>
        <Route path="/change-password" component={NewPassword}/>
        <Route path="/study-sessions" component={StudySessions}/>
        <Route path="/map-sessions" component={MapSessions}/>
      </header>
    </div>
  );
}

export default App;
