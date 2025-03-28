import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import "../../../../css/ui/popUps/pokerhandHistory.css";
import close_1 from './../../../../assets/images/table/close_1.svg';
import history_replay_playbtn from './../../../../assets/images/table/history_replay_playbtn.png';
import Config from "../../../../config.js";
import HandhistoryReplay from "../../table/HandhistoryReplay.js"

import { withTranslation } from 'react-i18next'
var config = new Config();
function PokerHistoryPhaseTwo(props) {
    console.log(props)
    const columns = useMemo(() => {
        return [
            {
                Header: props.t("Start Date"),
                accessor: "startDate",
            },
            {
                Header: props.t("End Date"),
                accessor: "finishDate",
            },
            {
                Header: props.t("Table Id"),
                accessor: "tableId",
            },
            {
                Header: props.t("Round Id"),
                accessor: "roundNumber",
            },
            {
                Header: props.t("Players"),
                accessor: "players",
            },
            {
                Header: props.t("Balance"),
                accessor: "balance",
            },
            {
                Header: props.t("Bonus"),
                accessor: "bonusBet",
            },
            {
                Header: props.t("Bet"),
                accessor: "bet",
            },
            {
                Header: props.t("Payout"),
                accessor: "payout",
            },
            {
                Header: props.t("Pot"),
                accessor: "pot",
            },
            {
                Header: props.t("Rake"),
                accessor: "rake",
            },
        ];
    }, []);
    const data = useMemo(() => props.data, [props.data]);

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        usePagination
    );
    const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, state, rows, prepareRow } = tableInstance;
    const { pageIndex } = state;


    function getSubHandSecondPhaseHistory(rowId) {
        let s = document.getElementsByTagName('tr');
        s[rowId].style.background = '#007c32';
        let body = {
            "tableId": props.data[rowId].tableId,
            "roundId": props.data[rowId].gameRoundId,
            "startDate": props.data[rowId].startDate,
            "endDate": props.data[rowId].finishDate
        }
        console.log(body)

        var phaseTwo = config.URL_Environment.proxy.baseUrl + config.URL_Environment.apiPath.handplayNew_Api;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", phaseTwo, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("siteid", config.URL_Environment.sitIds.sitid);
        xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid);
        xhr.addEventListener("load", (e) => {
            getHiastoryPlayData(e);
        });

        if (body) {
            console.log("sending with body");
            xhr.send(JSON.stringify(body));
        } else {
            console.log("sending without body");
            xhr.send();
        }
    }
    const [gameData, setGameData] = useState([]);
    function getHiastoryPlayData(data) {
        let lastPhaseData = JSON.parse(data.target.response);
        if (lastPhaseData.success) {
            setGameData(lastPhaseData);
        }
    }
    const closeReplayTable = (e) => {
        setGameData([]);
    }

    return (
        <React.Fragment>
            <div className="popCover_1" > </div>
            <div className="popup_1 inpElm">
                <div className="popup_1_in">
                    <div className="head">  {props.t('Each Table History')}
                        <button className="close_1" onClick={(e) => {
                            e.preventDefault();
                            props.setAction("hidePokerHistoryPhaseTwo");
                        }}> <img src={close_1} alt="" />  </button>
                    </div>
                    <div className="fd p_10 extra1">
                        <p>Table Name : <span className="clr_4"> {props.table.tableName}</span></p>
                        <div className="fd" style={{ display: props.data.length === 0 ? 'none' : 'block' }}>
                            <div className="fd m_t_15" style={{ overflow: 'auto', border: '1px solid gray', maxHeight: '250px' }}>
                                <table className="table_1" cellPadding={0} cellSpacing={0} {...getTableProps()}>
                                    <thead>
                                        {headerGroups.map((headerGroup) => (
                                            <tr {...headerGroup.getHeaderGroupProps()} >
                                                {headerGroup.headers.map((column) => (
                                                    <th key={column.render("Header")}>{column.render("Header")}</th>
                                                ))}
                                                <th>Re-Play</th>
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody {...getTableBodyProps()}>
                                        {page.map((row) => {
                                            prepareRow(row);
                                            return (
                                                <tr key={row.id} >
                                                    {row.cells.map((cell) => {
                                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;

                                                    })}
                                                    <td key={row.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', display: 'table-cell' }}>
                                                        <button type="button" key={row.id} style={{ background: 'none', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                            onClick={(e) => {
                                                                getSubHandSecondPhaseHistory(row.id);
                                                            }}
                                                        ><img src={history_replay_playbtn} alt="Play" className="playHistoryImg" /></button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="fd m_t_15" >
                                <div className="fd pageNatoin">
                                    <p>
                                        <button className="back" onClick={() => previousPage()} disabled={!canPreviousPage}>‹</button>
                                    </p>
                                    <span style={{ padding: '3px' }}>
                                        {props.t('Page')}{" "}
                                        <strong>
                                            {pageIndex + 1} of {pageOptions.length}
                                        </strong>
                                    </span>
                                    <p>
                                        <button className="next" onClick={() => nextPage()} disabled={!canNextPage}>›</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>{gameData.length !== 0 && <HandhistoryReplay data={gameData} id={"gameBox1"} closeReplayTable={(e) => closeReplayTable(e)} />}</div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default withTranslation()(PokerHistoryPhaseTwo)