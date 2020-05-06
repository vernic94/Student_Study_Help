import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./studysessions.css";
import {firebaseConfig} from "../data/firebaseConfig";
import Topbar from "../Topbar/topbar";


class StudySessions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessions: [],
            filtered: []
        }
        this.search = this.search.bind(this);

    }


    convertToTime(firebaseTimeStamp) {
        try {
            if (firebaseTimeStamp != undefined) {
                return firebaseTimeStamp.toDate();
            }
        } catch (error) {
            return "";
        }
    }

    formatDate(date) {
        try {
            if (date != "") {
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDay() + " kl " + date.getHours() + ":" + date.getMinutes();
            }
        } catch (error) {
            return "";
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
            }
        );
    }

    search(event){
        let currentSessions = [];
        let newSessions = [];

        //If search bar isn't empty
        if(event.target.value !== "") {
            currentSessions = this.state.sessions;
            newSessions = currentSessions.filter(session => {
                alert(session.description);
                // change current session's description to lowercase
                const sessionDescription = session.description.toLowerCase();
                const sessionSubject = session.subject.toLowerCase();
                // change search value to lowercase
                const filter = event.target.value.toLowerCase();
                //Check what sessions includes the search value
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                const test = sessionDescription.includes(filter);
                return test;
            });
        }
        else {
            newSessions = this.props.sessions;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            sessions: newSessions
        });
    }

    render() {
        return (
            <div className="studySessionsPage">
                <Topbar/>
                <div className="studySessionsContainer">
                    <input type="text" className="input" onChange={this.search} placeholder="Search for sessions" />
                    <div>
                        <table className="table table-dark">
                            <thead>
                            <tr>
                                <th scope="col">Creator</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Start Time</th>
                                <th scope="col">End Time</th>
                                <th scope="col">Description</th>
                            </tr>
                            </thead>
                            <tbody>

                            {this.state.sessions.map((value, index) => {
                                return <tr key={index}>
                                    <td>{value.creator}</td>
                                    <td>{value.subject}</td>
                                    <td>{this.formatDate(this.convertToTime(value.startTime))}</td>
                                    <td>{this.formatDate(this.convertToTime(value.endTime))}</td>
                                    <td>{value.description}</td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>);
    }
}

export default StudySessions;