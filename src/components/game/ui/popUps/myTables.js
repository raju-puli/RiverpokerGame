import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import "../../../../css/ui/popUps/myTables.css";
import close_1 from '../../../../assets/images/table/close_1.svg';
import { withTranslation } from 'react-i18next'

export const MyTables = (props) => {
  // const [btnState, setBtnState] = useState(true);
  // const [tableId, setTableId] = useState(undefined);
  // const [tableType, setTableType] = useState(undefined);
  const [Mytables, setMytables] = useState(false);
  const columns = useMemo(() => {
    return [
      {
        Header: props.t("Name"),
        accessor: "name",
      },
      {
        Header: props.t("Game"),
        accessor: "game",
      },
      {
        Header: props.t("Stakes"),
        accessor: "stakes",
      },
      {
        Header: props.t("Seats"),
        accessor: "seats",
      },
      {
        Header: props.t("Wait"),
        accessor: "wait",
      },
      {
        Header: props.t("P/F"),
        accessor: "pf",
      },
    ];
  }, []);
  const data = useMemo(() => props.data, [props.data]);

  const tableInstance = useTable({
    columns,
    data,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;


  const [prevRow, setPrevRow] = useState();


  useEffect(() => {
    let r = document.getElementsByTagName("tr");

    for (var i = 0; i < r.length; i++) {
      let row = r[i];
      // if (row.innerText.includes("NoTables")) {
      if (rows.length === 0) {
        setMytables(false)
      } else {
        setMytables(true)
      }
      row.onclick = () => {
        if (prevRow !== undefined) {
          prevRow.style.backgroundColor = null;
        }
        row.style.backgroundColor = "#0e5c63";
        setPrevRow(row);

        if (row.dataset.id !== undefined) {
          props.network.send(`<GetTableDetails id="${row.dataset.id}" type="${row.dataset.type}"/>`)
          props.network.send(`<OpenTable id="${row.dataset.id}" type="${row.dataset.type}"/>`)
          // setBtnState(false);
          // setTableId(row.dataset.id);
          // setTableType(row.dataset.type);
        }
      }

      row.ondblclick = () => {
        console.log("am double clicked")
        // console.log(row.innerText);
      }

    }

  }, [rows.length, prevRow, props.network]);




  return (
    <React.Fragment>
      <div className="popCover_1" onClick={(e) => { e.preventDefault(); props.setAction("hideMyTables") }}> </div>
      <div className="popup_1">
        <div className="popup_1_in">
          <div className="head">{props.t("My Tables")}
            <button className="close_1" onClick={(e) => { e.preventDefault(); props.setAction("hideMyTables") }}> <img src={close_1} alt="" /> </button>
          </div>
          <div className="fd p_10">
            <table className="table_1" {...getTableProps()} id="table" style={{ display: `${Mytables ? 'inline-table' : 'none'}` }}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th  key={column.render("Header")}>{column.render("Header")}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr data-id={row.original.id} data-type={row.original.type} {...row.getRowProps()} style={{ cursor: 'pointer' }}>
                      {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;

                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ display: `${Mytables ? 'none' : 'block'}` }}>{props.t("There are no tables to show")}</div>
          </div>
          {/* <div className="fd p_5">
            <button className="btn_1 wid_auto float_right" disabled={btnState} onClick={(e) => {
              e.preventDefault();
              if (tableId !== undefined) {
                props.network.send("<OpenTable id='" + tableId + "' type='" + tableType + "'/>");
              }
              setTableId(undefined);
              setTableType(undefined);
              setBtnState(true);
              props.setAction("hideMyTables")
            }}>Join Table</button>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};
export default withTranslation()(MyTables);
