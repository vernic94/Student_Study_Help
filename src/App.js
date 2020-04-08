import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from "react-router-dom";
import Welcome from "./Welcome/welcome";
import CreateAccount from "./CreateAccount/createaccount";
import AboutUs from "./AboutUs/aboutus";
import Profile from "./Profile/profile";
import Maps from "./Maps/maps";
import StudySession from "./StudySession/studysession";

import {Topbar} from './Topbar/topbar'

import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Topbar/>
        <Route exact path="/" component={Welcome} />
        <Route path="/aboutus" component={AboutUs}/>
        <Route path="/maps" component={Maps}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/create-study-session" component={StudySession}/>
        <Route path="/create-account" component={CreateAccount}/>

      </header>
    </div>
  );
}

export default App;
