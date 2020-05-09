import React, {Component, Fragment} from "react";
import "./studysessions.css";
import SearchedSessions from "./searchedSessions";
import modelInstance from "../data/Model";
import uuid from 'react-uuid'

class StudySessions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sessions: [],
            expandedRows: [],
            userData: []
        }

        this.populateTable();

    }

    async populateTable() {
        let studySessions = [];
        let userData = []

        await modelInstance.getStudySessions()
            .then(snapshot => snapshot.forEach(doc => studySessions.push(doc.data())));

        await studySessions
            .forEach(session => this.fetchUserData(session.creator)
                .then(user => userData.push(user)).catch(() => console.log("no user.")));
        this.setState({sessions: studySessions, userData: userData});
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
            return <Fragment>
                <tr key={uuid()} className="table-secondary table-borderless">
                    <td className="tableCell" colSpan={1} key={uuid()}>Description of study session</td>
                    <td colSpan={2} key={uuid()}>{session.description}</td>
                </tr>

                <tr key={uuid()} className="table-secondary">
                    <td className="tableCell" colSpan={1} key={uuid()}>Creators information:</td>
                    <td className="tableCell" colSpan={2} key={uuid()}>
                        <div key={uuid()} className="table-responsive table-borderless ">
                            <table className="tableCellBig ">
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
                    key={uuid()}>{modelInstance.formatDate(modelInstance.convertToTime(value.startTime))}</td>
                <td className="tableCell"
                    key={uuid()}>{modelInstance.formatDate(modelInstance.convertToTime(value.endTime))}</td>
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
            const perItemRows = this.renderItem(value, index);
            allItemRows = allItemRows.concat(perItemRows);
        });

        return <div className="studySessionsContainer">
            <SearchedSessions search={this.search}/>
            <div key={uuid()} className="table-responsive ">
                <table className="table table-dark" key={uuid()}>
                    <thead>
                    <tr key={uuid()} className="table-active">
                        <th key={uuid()} className="tableCell" scope="col">Subject</th>
                        <th key={uuid()} className="tableCell" scope="col">Start Time</th>
                        <th key={uuid()} className="tableCell" scope="col">End Time</th>
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