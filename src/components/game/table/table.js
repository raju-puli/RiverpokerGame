import React from "react";
import "../../../css/ui/table/table.css";
import Loader from "../login/loader";
// import { TableBg } from "../ui/table/tableBg";
import TableMain from "./tableMain";

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        console.log("the props from Table are", this.props);
        let table_id = this.getTableId();
        let sessionData = JSON.parse(sessionStorage.getItem(table_id));
        // let sid = sessionStorage.getItem(table_id).sid;
        let sid = sessionData.sid;
        // let tourneyId = sessionStorage.getItem(table_id).tourneyId;
        let tourneyId = sessionData.tourneyId;
        let isSeatMe = sessionData.isSeatMe;

        this.state = {
            tableId: table_id,
            sid: sid,
            tourneyId: tourneyId,
            isSeatMe: isSeatMe,
            showLoader: true,
            themes: {
                carpet: "carpet1",
                table: "table1",
            },
        };
        window.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });
        // setTimeout(()=>{
        //   this.setState({
        //     showLoader : false
        //   })
        // },5000)
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                showLoader: false,
            });
        }, 8000);
    }
    getTableId() {
        let name = window.name;
        let nameArray = name.split("=");
        return nameArray[1];
    }

    setThemes(data) {
        this.setState({ themes: data });
    }
    render() {
        return (
            <div className="table">
                {this.state.showLoader ? <Loader></Loader> : null}
                {/* <TableBg themes={this.state.themes}></TableBg> */}

                <TableMain tableInfo={this.state} setThemes={this.setThemes.bind(this)}></TableMain>
            </div>
        );
    }
}
