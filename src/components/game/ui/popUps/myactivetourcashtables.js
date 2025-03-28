import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import "../../../../css/ui/popUps/myTournaments.css";
import icon_dialog_level from "../../../../assets/images/lobby_icons/active_table/icon_dialog_level.png";

import eventBus from "../../../utils/eventEmitter";

export const MyActiveTourCashTables = (props) => {
    const columns = useMemo(() => [
        { Header: "Name", accessor: "name" },
        // { Header: "Game", accessor: "game" },
        // { Header: "Status", accessor: "status" },
        // { Header: "Seats", accessor: "seats" }
    ], []);

    const data = useMemo(() => props.data, [props.data]);

    const tableInstance = useTable({
        columns,
        data,
    });

    const { getTableProps, getTableBodyProps, rows, prepareRow } = tableInstance;

    const [selectedRow, setSelectedRow] = useState(null);
    const [loaderState, setLoaderState] = useState(props.data.length === 0);
    const [messageState, setMessageState] = useState("");

    useEffect(() => {
        setLoaderState(props.data.length === 0);
        setMessageState("No Active Tables");
    }, [props.data]);

    const handleRowClick = (row) => {
        setSelectedRow(row);
        props.setAction("activeTables", row.original.type);
        eventBus.emit('OpenTourneyLobby');
        setTimeout(() => {
            eventBus.emit('closeTourneyTableEmit');
        }, 500);
        if (row.original.id && row.original.type) {
            console.log("test-myactiveTables");
            props.network.send(`<GetTableDetails id="${row.original.id}" type="${row.original.type}"/>`);
            props.network.send(`<OpenTable id="${row.original.id}" type="${row.original.type}"/>`);
        }
    };


    return (
        <React.Fragment>
            <div className="game_type_filter_cover" onClick={(e) => { e.preventDefault(); props.setAction("hideMyActiveTourCashTables") }}>
                <div className="game_type_filter" style={{ width: '480px', border: '1px solid #696965' }}>
                    <header>
                        <span>
                            <img src={icon_dialog_level} alt="" /> My Tables & Tournaments
                        </span>
                    </header>
                    <section className="fd">
                        <table className="table_1" {...getTableProps()} id="table">
                            <tbody {...getTableBodyProps()} style={{ borderLeft: 'none' }}>
                                {rows.map((row) => {
                                    prepareRow(row);
                                    if (row.values.name !== "NoTables" && row.values.name !== "No Tables To Show") {
                                        return (
                                            // <tr key={row.id} onClick={() => handleRowClick(row)} style={{ backgroundColor: selectedRow === row ? "#0e5c63" : null, height: '65px' }} data-id={row.original.id} data-type={row.original.type} {...row.getRowProps()}>
                                            <tr key={row.id} onClick={() => handleRowClick(row)} style={{ backgroundColor: selectedRow === row ? "#0e5c63" : null, height: '65px' }} {...row.getRowProps()}>
                                                {
                                                    row.cells.map((cell) => {
                                                        return <td style={{ border: 'none' }} key={cell.id} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                                    })
                                                }
                                            </tr>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </tbody>
                        </table>
                        {loaderState && <div className="loaderDiv"> {messageState ? <span className="tourneyDescription_text">{messageState}</span> : <span className="m_l_5 loader_3"></span>} </div>}
                    </section>
                    <div className="close_div">
                        <button type="button" className="btn_2" onClick={(e) => { e.preventDefault(); props.setAction("hideMyActiveTourCashTables") }}> close </button>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
};

export default MyActiveTourCashTables;
