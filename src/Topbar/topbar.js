/* menu that should (fråga gruppen) be accessible from whereever you are on the webpage. 

ITERATION 2
Should consist of: 
- links to other pages: map, my profile, create study session
- header 
- Side/top bar 

*/


import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./topbar.css";

class Topbar extends Component {
  render() {
    return (
      <h1>TOP BAR!!</h1>
    );
  }
}

export default Topbar;