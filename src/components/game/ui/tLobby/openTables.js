import { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import "../../../../css/ui/tLobby/openTables.css";

import { withTranslation } from 'react-i18next';
function OpenTables(props) {
  const [showJoinButton, setShowJoinButton] = useState(true);
  const [showButtonWatch, setshowButtonWatch] = useState(true);
  const [id, setId] = useState(undefined);
  const [type, setType] = useState(undefined);
  const [callOnce, setCallonce] = useState(true);
  const [callMyTableDetails, setcallMyTableDetails] = useState(true);
  const [gameTableIds, setGameTableIds] = useState(props.gameTableid)
  const columns = useMemo(() => {
    return [
      {
        Header: props.t("Table"),
        accessor: "table",
      },
      {
        Header: props.t("Players"),
        accessor: "players",
      },
      {
        Header: props.t("Largest"),
        accessor: "largest",
      },
      {
        Header: props.t("Smallest"),
        accessor: "smallest",
      },
    ];
  }, []);
  const data = useMemo(() => props.data, [props.data]);
  const table = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;
  const [prevRow, setPrevRow] = useState();

  useEffect(() => {
    // console.log("tableId >>>  ", props.joinTableId)
    // console.log("Open table Props >>>  ", props)
    let r = document.getElementsByTagName("tr");
    for (var i = 0; i < r.length; i++) {
      let row = r[i];
      if (props.data.length !== 0) {
        if (row.dataset.type === "TOURNAMENT_TABLE") {
          if (props.joinTableId.status !== "Unregistered") {
            if (callOnce) {
              props.network.send(`<GetTableDetails id="${row.dataset.id}" type="${row.dataset.type}"/>`);
              setCallonce(false)
            }
            if ((row.dataset.id === props.joinTableId.tableIdNo) && callMyTableDetails) {
              props.network.send(`<GetTableDetails id="${row.dataset.id}" type="${row.dataset.type}"/>`);
              setId(row.dataset.id);
              setType(row.dataset.type);
              setShowJoinButton(false);
              setcallMyTableDetails(false);
            }
            if (props.joinTableId.joinBtnStatus === "enableJoinBtn") {
              setShowJoinButton(false);
              props.callMethod(id, props.joinTableId.joinBtnStatus)
            }
          }
        }
      } else {
        setcallMyTableDetails(true)
        setShowJoinButton(true)
      }

      if (row.dataset.type === "TOURNAMENT_TABLE") {
        row.onclick = () => {
          console.log("hit from open table")
          if (prevRow !== undefined) {
            prevRow.style.backgroundColor = null;
          }

          setPrevRow(row);

          if (row.dataset.type === "TOURNAMENT_TABLE") {
            if (row.dataset.id !== undefined && row.dataset.type) {
              row.style.backgroundColor = "#0e5c63";
              props.network.send(`<GetTableDetails id="${row.dataset.id}" type="${row.dataset.type}"/>`);
            } else {
              setshowButtonWatch(true)
            }
            setId(row.dataset.id);
            setType(row.dataset.type);
            if (props.joinTableId.status === "Registered") {
              if (row.dataset.id === props.joinTableId.tableIdNo) {
                setShowJoinButton(false)
                setshowButtonWatch(true)
              } else {
                setShowJoinButton(true)
                setshowButtonWatch(false)
              }
            } else {
              setshowButtonWatch(false)
            }
          }
          // row.ondblclick = () => {
          // };
        }
      }
    }
  });
  // }, [props.name, showJoinButton, showButtonWatch, props.status]);

  const joinTable = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setShowJoinButton(true);
    }, 100);
    props.callMethod("openTableRequrest", false);
    props.network.send(`<OpenTable id='${id}' type='${type}'/>`);
    setGameTableIds(props.gameTableid)
  };

  return (
    <div className="fd">
      <div className="fd" style={{ display: rows.length !== 0 ? 'block' : 'none', border: '1px solid var(--bdr)', marginTop: '3px' }}>
        <div className="header_5">Open Tables</div>
        <table style={{ maxHeight: '115px', overflow: 'auto', }} id="openTables_table" className="table_1" cellPadding={0} cellSpacing={0} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
      </div>

      <div className="fd m_t_15 btnsRJW" style={{ display: props.status === "Completed" ? 'none' : 'flex' }}>


        {(gameTableIds.indexOf(id) == -1 && id != "") ? <button className={!showButtonWatch ? 'btn_1 glow-on-hover' : 'btn_1'} disabled={showButtonWatch} onClick={(e) => {
          e.preventDefault();
          setshowButtonWatch(true)
          props.network.send(`<OpenTable id='${id}' type='${type}'/>`);
        }}>{props.t("Watch Table")}</button> :

          <button id="" className="btn_1" data-name={props.showCashTableTabs ? "t-tables" : "c-tables"} disabled={!(props.watchorjoin == "Watch Table")}
            onClick={(e) => {
              props.toggleCashTourneyTables(e)
            }
            }>
            {props.showCashTableTabs ? "T.Tables" : props.t("Watch Table")}
          </button>
        }


        {(gameTableIds.indexOf(id) == -1 && id != "") ? <button className={!showJoinButton ? 'btn_1 m_l_10 glow-on-hover' : 'btn_1 m_l_10'} disabled={showJoinButton}
          onClick={joinTable}>{props.t("Join Table")}</button>

          :
          <button id="" className="btn_1" data-name={props.showCashTableTabs ? "t-tables" : "c-tables"} disabled={!(props.watchorjoin == "Join Table")}
            onClick={(e) => {
              props.toggleCashTourneyTables(e)
            }
            }>
            {props.showCashTableTabs ? "T.Tables" : props.t("Join Table")}
          </button>
        }




        <button style={{ display: rows.length === 0 || props.name === 'Register' ? 'block' : 'none' }} className={props.name === 'Register' ? 'btn_1 m_l_10 glow-on-hover' : 'btn_1 m_l_10'} onClick={(e) => {
          e.preventDefault();
          if (props.name === "Unregister") {
            props.network.send("<UnRegisterTournamentPlayer type='BALANCE' tournamentId='22-2f7c7'/>")
            props.open("UNREG");
          } else {
            props.open("REG");
            props.network.send("<GetPlayerInfo/>");
          }
        }}> <span className="registerTextAnimation">{props.t(props.name)}</span> </button>




      </div>
    </div>
  );
}
export default withTranslation()(OpenTables);
