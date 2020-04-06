/* Create or plan study session page 

OFÄRDIG

ITERATION 2
Should consist of: 
- Plan session button ? (two seperate buttons or two seperate pages? One suggestion: choose between two and then depending on what you clicked, renders different stuff)
- Start session button
- header ?
- Side/top bar (?)

Must not be handled (this iteration):
- Store user in database

*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./studysession.css";

class StudySession extends Component {
  render() {
    return (
      <h1>CREATE STUDY SESSION PAGE</h1>
    );
  }
}

export default StudySession;