import Topbar from "../Topbar/topbar";
import React from "react";

class SearchedSessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: []
        }
        this.search = this.search.bind(this);
    }

    search(event) {
        let currentSessions = [];
        let newSessions = [];

        //If search bar isn't empty
        if (event.target.value !== "") {
            currentSessions = this.props.items;
            newSessions = currentSessions.filter(item => {
                // change current item to lowercase
                const lowerCase = item.toLowerCase();
                // change search term to lowercase
                const filter = event.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lowerCase.includes(filter);
            });
        } else {
            newSessions = this.props.items;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            sessions: newSessions
        });

    }
    render() {
        return(
            <div className="studySessionsPage">
                <Topbar/>
                <div className="studySessionsContainer">
                    <input type="text" className="input" onChange={this.search} placeholder="Search..." />
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
            </div>
        );
    }
}