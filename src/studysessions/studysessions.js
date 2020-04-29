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


    componentDidMount() {
        let db = global.firebase.firestore();
        var ss = [];
        db.collection('study_session').get().then(
            (snapshot) => {
                snapshot.forEach((doc) => {
                    ss.push(doc.data());
                })
            }).then(() => {
                this.setState({sessions: ss})
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
                        <td>{/*value.startTime*/}</td>
                        <td>{/*{value.endTime}*/}</td>
                        <td>{value.description}</td>
                    </tr>
                })}
                </tbody>
            </table>


        </div>
    }
}

export default StudySessions;