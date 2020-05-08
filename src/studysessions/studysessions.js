import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./studysessions.css";
import {firebaseConfig} from "../data/dbHandler";
import Topbar from "../Topbar/topbar";
import SearchedSessions from "./searchedSessions";


class StudySessions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessions: []
        };
    }

    componentWillMount() {
        let db = global.firebase.firestore();
        var study_sessions = [];
        db.collection('study_session').get().then(
            (snapshot) => {
                snapshot.forEach((doc) => {
                    study_sessions.push(doc.data());
                })
            }).then(() => {
                this.setState({sessions: study_sessions})
            }
        );
    }

    render() {
        return (
            <div className="studySessionsPage">
                <Topbar/>
                <div className="studySessionsContainer">
                    <SearchedSessions className="input-search" sessions={this.state.sessions}/>

                </div>
            </div>);
    }
}

export default StudySessions;