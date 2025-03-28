import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import "../../../../css/ui/popUps/myTournaments.css";
import close_1 from '../../../../assets/images/table/close_1.svg';

export const ActiveTablesList = (props) => {
    const columns = useMemo(() => {
        return [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Game",
                accessor: "game",
            },
            {
                Header: "Seats",
                accessor: "seats",
            }
        ];
    }, []);
    const data = useMemo(() => props.data, [props.data]);

    const tableInstance = useTable({
        columns,
        data,
    });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
    const [prevRow, setPrevRow] = useState();
    const [loaderState, setLoaderState] = useState(false);

    useEffect(() => {
        let r = document.getElementsByTagName("tr");
        for (var i = 0; i < r.length; i++) {
            let row = r[i];
            row.onclick = () => {
                if (prevRow !== undefined) {
                    prevRow.style.backgroundColor = null;
                }
                row.style.backgroundColor = "#0e5c63";
                setPrevRow(row);
                if (row.dataset.id !== undefined) {
                    props.network.send(`<GetTableDetails id="${row.dataset.id}" type="${row.dataset.type}"/>`)
                    props.network.send("<OpenTable id='" + row.dataset.id + "' type='" + row.dataset.type + "'/>");
                }
            }
        }
        setLoaderState(props.data.length === 0);
        // console.log(props)
    });


    return (
        <React.Fragment>
            <div className="" onClick={(e) => { e.preventDefault(); props.setAction("hideMyActiveTourCashTables") }}> </div>
            <div className="">
                <div className="popu_1_in">
                    <div className="fd p_10" >
                        {/* <table className="table_11" {...getTableProps()} id="table" style={{ borderCollapse: 'collapse' }}> */}
                        <table className="table_1" {...getTableProps()} id="table" >
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th key={column.render("Header")}>{column.render("Header")}</th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row) => {
                                    prepareRow(row);
                                    if (row.values.name !== "NoTables" && row.values.name !== "No Tables To Show") {
                                        return (
                                            <tr data-id={row.original.id} data-type={row.original.type} {...row.getRowProps()}>
                                                {row.cells.map((cell) => {
                                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                                })}
                                            </tr>
                                        );
                                    }
                                })}
                            </tbody>
                        </table>
                        {loaderState && <div className="loaderDiv"> <span className="m_l_5 loader_3"></span> </div>}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default ActiveTablesList;
