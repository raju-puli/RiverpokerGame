import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import "../../../../css/ui/popUps/findPlayer.css";
// import closeIcon from '../../../../assets/images/lobby/close_icon.svg';
// import close_1 from '../../../../assets/images/table/close_1.svg';

import { withTranslation } from 'react-i18next';

const FindPlayer = (props) => {
  const [btnState, setBtnState] = useState(true);
  const [tableId, setTableId] = useState(null);
  const [tableType, setTableType] = useState(null);
  const [msg, setMsg] = useState("");
  const [loader, setLoader] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const columns = useMemo(() => [
    { Header: props.t("Name"), accessor: "name" },
    { Header: props.t("Game"), accessor: "game" },
    {
      Header: props.t("Stakes"),
      accessor: "stakes",
      Cell: ({ value }) => (
        <span
          style={{ textAlign: "right", visibility: value !== undefined ? 'visible' : 'hidden' }}
        >
          {Number(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    { Header: props.t("Seats"), accessor: "seats" },
    { Header: props.t("Wait"), accessor: "wait" },
    { Header: props.t("P/F"), accessor: "pf" },
  ], [props]);

  const data = useMemo(() => props.data, [props.data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const [showError, setShowError] = useState(false);
  useEffect(() => {
    setLoader(false);
    if (props.data[0]?.name === "Player not found") {
      setShowError(true);
    };
  }, [props.data]);

  useEffect(() => {
    return () => {
      resetState();
    };
  }, []);

  const resetState = () => {
    setBtnState(true);
    setTableId(null);
    setTableType(null);
    setMsg("");
    setLoader(false);
    setSelectedRowId(null);
    setShowError(false);
  };

  const handleRowClick = (row) => {
    setSelectedRowId(row.id);
    setBtnState(false);
    setTableId(row.original.id);
    setTableType(row.original.type);
  };

  return (
    <React.Fragment>
      <div className="fd inpElm p_15 extra1">
        <div className="findPlr df_al_jsb fd">
          <input
            type="text"
            id="findPlayerNickName"
            name="search"
            placeholder={props.t("User nickname")}
            style={{ width: '80%' }}
          />
          <button
            className="rds_10 df_al_jsb"
            onClick={(e) => {
              e.preventDefault();
              setMsg("");
              const name = document.getElementById("findPlayerNickName").value;
              if (name) {
                setLoader(true);
                setShowError(false);
                props.network.send(`<PlayerSearch nickname="${name}"/>`);
              } else {
                setMsg("Please Enter Player Name To Search");
              }
            }}
          >
            {props.t("Find")}
            {loader && <span className="m_l_5 loader_3"></span>}
          </button>
        </div>
      </div>
      {(props.data[0]?.name === "Player not found") ? <span className="tourneyDescription_text" style={{ top: '70px' }}>{!showError ? "" : props.data[0]?.name}</span> :
        <>
          <div className="fd">{msg}</div>
          <div className="fd" style={{ display: rows.length ? "block" : "none" }}>
            <table className="table_1" {...getTableProps()} id="table">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th className="col-2" key={column.id}>{column.render("Header")}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      onClick={() => handleRowClick(row)}
                      style={{ backgroundColor: selectedRowId === row.id ? "#0e5c63" : "" }}
                    >
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <footer
            className="fd p_5"
            style={{ visibility: rows.length ? "visible" : "hidden", alignItems: "flex-end" }}
          >
            <button
              className="btn_2 wid_auto float_right m_t_20"
              disabled={btnState}
              onClick={(e) => {
                e.preventDefault();
                if (tableId) {
                  props.network.send(`<OpenTable id='${tableId}' type='${tableType}'/>`);
                }
                resetState();
              }}
            >
              {props.t("Join Table")}
            </button>
          </footer>
        </>
      }
    </React.Fragment>
  );
};

export default withTranslation()(FindPlayer);
