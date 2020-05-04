import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./studysessions.css";
import {firebaseConfig} from "../data/dbHandler";
import Topbar from "../Topbar/topbar";


class StudySessions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessions: []
        }
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

    render() {
        return (
            <div className="studySessionsPage">
                <Topbar/>
                <div className="studySessionsContainer">
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