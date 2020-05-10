import Topbar from "../Topbar/topbar";
import React from "react";
import StudySessions from "./studysessions";

class SearchedSessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: [],
            sessions: StudySessions.sessions
        }
        this.search = this.search.bind(this);
    }

    search(event){
        alert("Reached this far");
        let currentSessions = [];
        let newSessions = [];

        //If search bar isn't empty
        if(event.target.value !== "") {
            currentSessions = StudySessions.state.sessions;
            newSessions = currentSessions.filter(session => {
                // change current session's description to lowercase
                const sessionDescription = session.description.toLowerCase();
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
            sessions: newSessions
        });
    }

    render() {
        return(
            <input type="text" className="input" onChange={this.search} placeholder="Search..." />
        );
    }
}
export default SearchedSessions;