import React, {Component, Fragment} from "react";
import "./studysessions.css";
import SearchedSessions from "./searchedSessions";
import modelInstance from "../data/Model";
import uuid from 'react-uuid'

/**
 * @author Fariba
 */

class StudySessions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            originalSessions: [], //holds the original sessions
            expandedRows: [],
            userData: [],
            sessions: []
        }
        this.populateTable();
        this.handleSearch = this.handleSearch.bind(this);
    }

    async populateTable() {
        let studySessions = [];
        let userData = []

        await modelInstance.getStudySessions()
            .then(snapshot => snapshot.forEach(doc => studySessions.push(doc.data())));

        await studySessions
            .forEach(session => this.fetchUserData(session.creator)
                .then(user => userData.push(user)).catch((err) => console.log("no user." + err)));
        this.setState({originalSessions: studySessions, userData: userData, sessions: studySessions});
    }

    /**
     * Updates sessions with the new searched sessions
     * @param newSessions is the new sessions after the filter/search
     */
    handleSearch(newSessions){
        this.setState({sessions: newSessions});
    }

    handleRowClick(rowId) {
        const expandedRows = this.state.expandedRows;
        const isRowExpanded = expandedRows.includes(rowId);
        const newExpandedRows = isRowExpanded ? expandedRows.filter(id => id !== rowId) : expandedRows.concat(rowId);
        this.setState({expandedRows: newExpandedRows});
    }

    async fetchUserData(username) {
        let user = null;
        await modelInstance.getUser(username).then(snapshot => user = snapshot);
        return user;
    }

    getUserInfoRow(session) {
        let find = this.state.userData.find((user) => user.id === session.creator);
        if (find != null) {
            return <Fragment key={uuid()}>
                <tr key={uuid()} className="table-secondary">
                    <td className="tableCell" colSpan={1} key={uuid()}>Creators information:</td>
                    <td className="tableCell" colSpan={3} key={uuid()}>
                        <div key={uuid()} className="table-responsive table-borderless ">
                            <table className="tableCellBig ">
                                <tbody key={uuid()}>
                                <tr key={uuid()} className="table-secondary">
                                    <td className="tableCell" key={uuid()}>
                                        {find.data().firstname} {find.data().lastname}
                                    </td>
                                </tr>
                                <tr key={uuid()} className="table-secondary">
                                    <td className="tableCell" key={uuid()}>
                                        {find.data().school.toString()}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            </Fragment>
        } else {
            return <td colSpan={4} key={uuid()}>User not found!</td>
        }
    }

    renderItem(value, index) {
        const clickCallback = () => this.handleRowClick(index);
        const itemRows = [
            <tr onClick={clickCallback} className="clickable justify-content-center" key={"row-data-" + index}>
                <td className="tableCell" key={uuid()}>{value.subject}</td>
                <td className="tableCell"
                    key={uuid()}>{modelInstance.formatDay(modelInstance.convertToTime(value.startTime))}
                </td>
                <td className="tableCell"
                    key={uuid()}>{modelInstance.formatTime(modelInstance.convertToTime(value.startTime), modelInstance.convertToTime(value.endTime))}
                </td>
                <td key={uuid()}>{value.description}</td>
            </tr>
        ];

        if (this.state.expandedRows.includes(index)) {
            itemRows.push(this.getUserInfoRow(value))
        }

        return itemRows;
    }

    render() {
        let allItemRows = [];

        this.state.sessions.map((value, index) => {
            if(modelInstance.formatDate(modelInstance.convertToTime(value.endTime)) > modelInstance.formatDate(new Date())) {
                const perItemRows = this.renderItem(value, index);
                allItemRows = allItemRows.concat(perItemRows);
            }
        });

        return <div className="studySessionsContainer">
        <SearchedSessions className="input-search" sessions={this.state.originalSessions}
                          handleSearch={this.handleSearch}/>
        <div key={uuid()} className="table-responsive ">
                <table className="table table-dark" key={uuid()}>
                    <thead>
                    <tr key={uuid()} className="table-active">
                        <th key={uuid()} className="tableCell" scope="col">Subject</th>
                        <th key={uuid()} className="tableCell" scope="col">Day</th>
                        <th key={uuid()} className="tableCell" scope="col">Time</th>
                        <th key={uuid()} className="tableCell" scope="col">Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allItemRows}
                    </tbody>
                </table>
            </div>
        </div>;

    }
}

export default StudySessions;