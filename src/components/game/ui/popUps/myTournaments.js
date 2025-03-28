import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import "../../../../css/ui/popUps/myTournaments.css";
import close_1 from '../../../../assets/images/table/close_1.svg';
import { withTranslation } from 'react-i18next';

export const MyTournaments = (props) => {
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
        Header: props.t("Status"),
        accessor: "status",
      },
      {
        Header: props.t("Seats"),
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


  useEffect(() => {
    let r = document.getElementsByTagName("tr");
    for (var i = 0; i < r.length; i++) {
      let row = r[i];
      if (rows.length === 0) {
        setMytables(false)
      } else {
        setMytables(true)
      }
      row.onclick = () => {
        console.log("hit from mytournaments.js")
        if (prevRow !== undefined) {
          prevRow.style.backgroundColor = null;
        }

        setPrevRow(row);

        if (row.dataset.id !== undefined) {
          // props.network.send(`<GetTableDetails id="${row.dataset.id}" type="${row.dataset.type}"/>`)
          props.network.send(`<OpenTable id='${row.dataset.id}' type='${row.dataset.type}'/>`);
          row.style.backgroundColor = "#0e5c63";
        }
      }
      row.ondblclick = () => {
        console.log("am double clicked")

      }
    }

  });




  return (
    <React.Fragment>
      <div className="popCover_1" onClick={(e) => { e.preventDefault(); props.setAction("hideMyTourneys") }}> </div>
      <div className="popup_1">
        <div className="popup_1_in">
          <div className="head">  {props.t("My Tournaments")}
            <button className="close_1" onClick={(e) => { e.preventDefault(); props.setAction("hideMyTourneys") }}> <img src={close_1} alt="" /> </button>
          </div>
          <div className="fd p_10">
            <p style={{ display: `${Mytables ? 'block' : 'none'}` }}>{props.t("Please select the table below to join the tournament")} :</p>
            <table className="table_1" {...getTableProps()} id="table" style={{ display: `${Mytables ? 'inline-table' : 'none'}` }}>
              <thead key={1}>
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
                  return (
                    <tr data-id={row.original.id} data-type={row.original.type} {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ display: `${Mytables ? 'none' : 'block'}` }}>{props.t("No tournament tables to show")}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default withTranslation()(MyTournaments);
