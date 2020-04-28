import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./studysession.css";
import Topbar from "../Topbar/topbar"
import StudySessionModel from "./StudySessionModel"
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
                    console.log(doc.id, '=>', doc.data());
                })
            }).then(() => {
                this.setState({sessions: ss})
                console.log(this.state.sessions.length)
            }
        );
    }

    render() {
        return <div>

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">creator</th>
                    <th scope="col">subject</th>
                    <th scope="col">description</th>
                    <th scope="col">startTime</th>
                    <th scope="col">endTime</th>
                </tr>
                </thead>
                <tbody>




                {this.state.sessions.map((value, index) => {
                    return <tr>
                        <th scope="row">{value.creator}</th>
                        <td>{value.description}</td>
                        <td>{value.subject}</td>
                        {/*<td>{new Date(value.startTime).toISOString()}</td>*/}
                        {/*<td>{new Date(value.endTime).toISOString()}</td>*/}
                    </tr>
                })}
                </tbody>
            </table>


        </div>
    }
}

export default StudySessions;