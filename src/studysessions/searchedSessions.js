import Topbar from "../Topbar/topbar";
import React from "react";
import StudySessions from "./studysessions";

/**
 * @author Amanda, Fariba
 */

class SearchedSessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: []
        };
        this.search = this.search.bind(this);
    }
    componentDidMount() {
        this.setState({
            filtered: this.props.sessions
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filtered: nextProps.sessions
        });
    }

    search(event){
        //saving a copy of original sessions
        let currentSessions = this.props.sessions;
        let newSessions = [];

        //If search bar isn't empty
        if(event.target.value !== "") {
            newSessions = currentSessions.filter(session => {
                // change current session's description to lowercase, if it exsists
                var sessionDescription = "";
                if(session.description!=null) {
                    sessionDescription = session.description.toLowerCase();
                }

                const sessionSubject = session.subject.toLowerCase();
                // change search value to lowercase
                const filter = event.target.value.toLowerCase();
                //Check what sessions includes the search value
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                if (sessionDescription.includes(filter)){
                    return sessionDescription.includes(filter);
                }
                return sessionSubject.includes(filter);
            });
        }
        else {
            newSessions = this.props.sessions;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newSessions
        });
    }

    /**
     * Fariba's code from here that was moved to this class
     **/
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

    render() {
        return(
            <div>
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

                    {this.state.filtered.map((value, index) => {
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
            );
    }
}
export default SearchedSessions;