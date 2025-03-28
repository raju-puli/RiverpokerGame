import React, { useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import "../../../../css/ui/popUps/pokerhandPhase.css";
// import Ac from "../../../../assets/images/popUp/chatCards/Ac.png";


export default function Pokerhandphase(props) {
  // const big = "Ac";

  const columns = useMemo(() => {
    return [
      {
        Header: "Player",
        accessor: "nickName",
      },
      {
        Header: "Blind",
        accessor: "Blind",
      },
      {
        Header: "Hole Cards",
        accessor: "Cards",

      },

      {
        Header: "Pre Flop",
        accessor: "PreFlop",

      },
      {
        Header: "Flop",
        accessor: "Flop",

      },
      {
        Header: "Turn",
        accessor: "Turn",

      },
      {
        Header: "River",
        accessor: "River",

      },


    ];
  }, []);
  const data = useMemo(() => props.data, [props.data]);
  const [handNumber, setHandnumber] = useState();
  const [time, setTime] = useState();
  const [win, setWin] = useState();
  const [bet, setBet] = useState();
  const [handTable, sethandleTable] = useState(true);

  const tableInstance = useTable({
    columns,
    data,
  },
    usePagination
  );
  const { getTableProps,
    getTableBodyProps,
    headerGroups,
    // state,
    rows,
    prepareRow } = tableInstance;
  //  console.log(props);

  function gethandData(btnID) {
    console.log(props);
    console.log(btnID);
    setHandnumber(props.dataTwo[btnID].HandNumber);
    setTime(props.dataTwo[btnID].Time);
    setWin(props.dataTwo[btnID].win)
    setBet(props.dataTwo[btnID].bet)
    sethandleTable(false);
    // props.setHandnumber(props.dataTwo[btnID].HandNumber);
    //  console.log(props);
  }
  function hideDetails(c) {
    sethandleTable(!c);
  }


  return (

    // <div className="pokerhandPhaseHistory">
    <>
      <div className="close"><button onClick={(e) => { e.preventDefault(); props.setAction("hidesubHistory"); sethandleTable(true) }}>X</button></div>
      <div className="handData">
        <div className="subHanddata">
          <div className="nickName">
            <div className="nicknameLabel">
              NickName
            </div>
            <div className="nicknameField">
              {props.userName}
            </div>
          </div>
          <div className="nickName">
            <div className="nicknameLabel">
              Bet
            </div>
            <div className="nicknameField">
              {bet}
            </div>
          </div>
          <div className="nickName">
            <div className="nicknameLabel">
              Win
            </div>
            <div className="nicknameField">
              {win}
            </div>
          </div>
          {/* <div className="nickName">
             <div className="nicknameLabel">
             Returned
             </div><div className="nicknameField">
             -
             </div></div> */}
          <div className="nickName">
            <div className="nicknameLabel">
              Hand Number
            </div>
            <div className="nicknameField">
              {handNumber}
            </div>
          </div>
          <div className="nickName">
            <div className="timeLabel">
              Game Time
            </div>
            <div className="timeField">
              {time}
            </div>
          </div>
        </div>
      </div>
      <div className="belowHanddata">
        <div className="handNumbers">
          <div className="headerHand">Hand Numbers</div>
          <div className="handdata">
            {(() => {
              let newHand = props.dataTwo;
              let i = 0,
                handnumbers = [];

              for (i = 0; i < newHand.length; i++) {
                handnumbers.push(<button id={i} key={newHand[i].HandNumber} onClick={(e) => { gethandData(e.target.id); }}>{newHand[i].HandNumber}</button>);
                // handnumbers.push(<button id={i}>{newHand[i].HandNumber}</button>);
              }

              return handnumbers;
            })()}
          </div>
        </div>
        <div className="outputTables" hidden={handTable} onClick={(e) => { hideDetails(handTable) }}>
          <div className="innerputTables">
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th key={column.render("Header")}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);

                  return (
                    <tr>
                      {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}


