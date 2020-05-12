import React from "react";

/**
 * @author Amanda
 */

class SearchedSessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.search = this.search.bind(this);
    }


    search(event){
        //saving a copy of original sessions
        let currentSessions = this.props.sessions;
        let newSessions = [];

        //If search bar isn't empty
        if(event.target.value !== "") {
            newSessions = currentSessions.filter(session => {
                // change current session's description to lowercase, if it exists
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
        this.props.handleSearch(newSessions);
    }

    render() {
        return (
            <input type="text" className="input-search" onChange={this.search} placeholder="Search for a session" />
        );
    }
}
export default SearchedSessions;