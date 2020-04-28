import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./studysessions.css";
import Topbar from "../Topbar/topbar"
import {firebaseConfig} from "../data/firebaseConfig";


class StudySessions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessions: []
        }
    }


    convertToTime(firebaseTimeStamp) {
        if (firebaseTimeStamp != undefined) {
            return firebaseTimeStamp.toDate();

        }
        return "";
    }

    formatDate(date) {
        if (date != "") {
         return  date.getFullYear()+"-"+ (date.getMonth()+1)+"-"+ date.getDay()+" kl "+date.getHours()+ ":"+ date.getMinutes();
        }
        return "";
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
        return <div>

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
                        <th scope="row">{value.creator}</th>
                        <td>{value.subject}</td>
                        <td>{this.formatDate(this.convertToTime(value.startTime))}</td>
                        <td>{this.formatDate(this.convertToTime(value.endTime))}</td>
                        <td>{value.description}</td>
                    </tr>
                })}
                </tbody>
            </table>


        </div>
    }
}

export default StudySessions;