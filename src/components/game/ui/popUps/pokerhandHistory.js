import React, { useMemo, useState, useEffect, useRef } from "react";
import moment from "moment";
import { useTable, usePagination } from "react-table";
import "../../../../css/ui/popUps/pokerhandHistory.css";
import Pokerhandphase from "./PokerHandphase.js";

import { withTranslation } from 'react-i18next'
function PokerhandHistory(props) {
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
        Header: props.t("Table Name"),
        accessor: "tableName",
      },
      {
        Header: props.t("Hands"),
        accessor: "roundsCount",
      },
      {
        Header: props.t("Payouts"),
        accessor: "payouts",
      },
      {
        Header: props.t("Compoints"),
        accessor: "compPoints",
      },
      {
        Header: props.t("Bonus"),
        accessor: "bonusBuyIn",
      },
      {
        Header: props.t("Bets"),
        accessor: "bets",
      },
      {
        Header: props.t("Buy-In"),
        accessor: "buyIn",
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
  const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, pageCount, gotoPage, state, prepareRow } = tableInstance;

  const { pageIndex } = state;

  const [startDate, setStartdate] = useState(null);
  const [endDate, setEnddate] = useState(null);
  const [showBtn, setShowbtn] = useState(true);
  const [historyDataNext, setHDnext] = useState([]);
  const [newhanddata, setnewhanddata] = useState([]);
  const [thirdData, setThird] = useState([]);
  const [showSubpokerHistory, setShowSubpokerHistory] = useState(false);
  const [userName, setUsername] = useState(props.user);
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [props.data, pageIndex]);

  function handlestartDate() {
    setStartdate(moment(document.getElementById("startDate").value).format("DD-MM-YYYY"));
    setShowbtn(false);
    setShowbtn1('block')
  }


  function handleendDate() {
    setEnddate(moment(document.getElementById("endDate").value).format("DD-MM-YYYY"));
    setShowbtn(false);
    setShowbtn1('block')
  }

  function getSubHandHistory(rowId) {
    let shData = props.secondLevel;
    let subData = historyDataNext;
    let subTables = shData.values[rowId].roundInfo;

    let i = 0,
      cnt = subTables.length;

    for (i; i < cnt; i++) {
      subData.push({
        Time: subTables[i].gameRoundInfo.startDate,
        HandNumber: subTables[i].gameRoundInfo.num,
        Result: subTables[i].gameRoundInfo.pot,
        win: subTables[i].playerRoundInfo.payout,
        bet: subTables[i].playerRoundInfo.bet,
        rowId: rowId,
      });
    }

    subData = [];

    setHDnext(subData);
    setnewhanddata(historyDataNext);
    setUsername(props.user);
  }

  function thirdlevel(hnumber) {
    let forThird = props.secondLevel;
    var id = hnumber;
    let j = 0,
      cntOne = newhanddata.length,
      players = [];

    for (j = 0; j < cntOne; j++) {
      if (newhanddata[j].HandNumber === id) {
        players = forThird.values[newhanddata[j].rowId].roundInfo;
      }
    }

    let i = 0,
      cnt = players.length,
      handData = [];

    for (i; i < cnt; i++) {
      if (players[i].gameRoundInfo.num === id) {
        if (players[i].gameRoundDataInfos.length !== 0) {
          try {
            handData = JSON.parse(players[i].gameRoundDataInfos[0].gameDa.replace(/\\/g, ""));
          } catch (e) { console.error(e) }
        } else {
          return;
        }
      }
    }

    let playerNick = [];
    let playerInfo = handData.data.playersInfo;
    if (handData !== undefined) {
      if (handData.data.flop !== undefined && handData.data.turn !== undefined && handData.data.river !== undefined) {
        playerNick.push({
          nickName: "Community cards",
          Flop: (
            <div>
              <img src={require(`../../../../assets/images/popUp/chatCards/${handData.data.flop.slice(0, 2)}.png`).default} width={20} alt="Player" />
              <img src={require(`../../../../assets/images/popUp/chatCards/${handData.data.flop.slice(3, 5)}.png`).default} width={20} alt="Player" />
              <img src={require(`../../../../assets/images/popUp/chatCards/${handData.data.flop.slice(6, 8)}.png`).default} width={20} alt="Player" />
            </div>
          ),
          Turn: <img src={require(`../../../../assets/images/popUp/chatCards/${handData.data.turn}.png`).default} width={20} alt="Player" />,
          River: <img src={require(`../../../../assets/images/popUp/chatCards/${handData.data.river}.png`).default} width={20} alt="Player" />,
        });
      } else if (handData.data.flop !== undefined && handData.data.turn !== undefined && handData.data.river === undefined) {
        playerNick.push({
          nickName: "Community cards",
          Flop: (
            <div>
              <img src={require(`../../../../assets/images/popUp/chatCards/${handData.data.flop.slice(0, 2)}.png`).default} width={20} alt="Player" />
              <img src={require(`../../../../assets/images/popUp/chatCards/${handData.data.flop.slice(3, 5)}.png`).default} width={20} alt="Player" />
              <img src={require(`../../../../assets/images/popUp/chatCards/${handData.data.flop.slice(6, 8)}.png`).default} width={20} alt="Player" />
            </div>
          ),
          Turn: <img src={require(`../../../../assets/images/popUp/chatCards/${handData.data.turn}.png`).default} width={20} alt="Player" />,
          River: handData.data.river,
        });
      } else if (handData.data.flop !== undefined && handData.data.turn === undefined && handData.data.river === undefined) {
        playerNick.push({
          nickName: "Community cards",
          Flop: (
            <div>
              <img src={require(`../../../../assets/images/popUp/chatCards/${handData.data.flop.slice(0, 2)}.png`).default} width={20} alt="Player" />
              <img src={require(`../../../../assets/images/popUp/chatCards/${handData.data.flop.slice(3, 5)}.png`).default} width={20} alt="Player" />
              <img src={require(`../../../../assets/images/popUp/chatCards/${handData.data.flop.slice(6, 8)}.png`).default} width={20} alt="Player" />
            </div>
          ),
          Turn: handData.data.turn,
          River: handData.data.river,
        });
      } else {
        playerNick.push({
          nickName: "Community cards",
          Flop: handData.data.flop,
          Turn: handData.data.turn,
          River: handData.data.river,
        });
      }
    } else {
    }
    let playersCnt = Object.keys(playerInfo).length;

    for (var k = 0; k < playersCnt; k++) {
      var firstKey = Object.keys(playerInfo)[k];
      if (playerInfo[firstKey].cards !== undefined) {
        if (playerInfo[firstKey].dealer === true) {
          playerNick.push({
            nickName: `${playerInfo[firstKey].nickName}  🅳 `,
            Cards: (
              <div>
                <img src={require(`../../../../assets/images/popUp/chatCards/${playerInfo[firstKey].cards[0].slice(0, 2)}.png`).default} width={20} alt="Player" />
                <img src={require(`../../../../assets/images/popUp/chatCards/${playerInfo[firstKey].cards[0].slice(3, 5)}.png`).default} width={20} alt="Player" />
              </div>
            ),
            Blind: playerInfo[firstKey].commonData[0],
            PreFlop: playerInfo[firstKey].commonData[1],
            Flop: playerInfo[firstKey].commonData[2],
            Turn: playerInfo[firstKey].commonData[3],
            River: playerInfo[firstKey].commonData[4],
          });
        } else {
          playerNick.push({
            nickName: playerInfo[firstKey].nickName,
            Cards: (
              <div>
                <img src={require(`../../../../assets/images/popUp/chatCards/${playerInfo[firstKey].cards[0].slice(0, 2)}.png`).default} width={20} alt="Player" />
                <img src={require(`../../../../assets/images/popUp/chatCards/${playerInfo[firstKey].cards[0].slice(3, 5)}.png`).default} width={20} alt="Player" />
              </div>
            ),
            Blind: playerInfo[firstKey].commonData[0],
            PreFlop: playerInfo[firstKey].commonData[1],
            Flop: playerInfo[firstKey].commonData[2],
            Turn: playerInfo[firstKey].commonData[3],
            River: playerInfo[firstKey].commonData[4],
          });
        }
      } else {
        return;
      }
    }

    let cntTwo = Object.keys(handData.data.potByPhase).length;

    if (cntTwo !== 0) {
      if (cntTwo === 1) {
        playerNick.push({
          nickName: "Pot",
          PreFlop: handData.data.potByPhase[0].potsSum._value,
        });
      } else if (cntTwo === 2) {
        playerNick.push({
          nickName: "Pot",
          PreFlop: handData.data.potByPhase[0].potsSum._value,
          Flop: handData.data.potByPhase[1].potsSum._value,
        });
      } else if (cntTwo === 3) {
        playerNick.push({
          nickName: "Pot",
          PreFlop: handData.data.potByPhase[0].potsSum._value,
          Flop: handData.data.potByPhase[1].potsSum._value,
          Turn: handData.data.potByPhase[2].potsSum._value,
        });
      } else {
        playerNick.push({
          nickName: "Pot",
          PreFlop: handData.data.potByPhase[0].potsSum._value,
          Flop: handData.data.potByPhase[1].potsSum._value,
          Turn: handData.data.potByPhase[2].potsSum._value,
          River: handData.data.potByPhase[3].potsSum._value,
        });
      }
    } else {
      return;
    }
    setThird(playerNick);

    setPopUpActionsOpen("opensubHistory");
  }

  function setPopUpActionsOpen(action) {
    switch (action) {
      case "opensubHistory":
        setShowSubpokerHistory(true);
        break;
      default:
        break;
    }
  }

  function setPopUpActionsClose(action) {
    switch (action) {
      case "hidesubHistory":
        setShowSubpokerHistory(false);
        break;
      case "hidePokerHistoryPhaseTwo":
        // setPhaseTwoData([]);
        break;

      default:
        break;
    }
  }
  const getCurrentDateInput1 = () => {
    setTimeout(() => {
      setShowbtn(false);
      if (document.getElementById("startDate") !== null) {
        try {
          setStartdate(moment(document.getElementById("startDate").value).format("DD-MM-YYYY"));
        } catch (e) { console.error(e) }
      }
    }, 3000);
    const dateObj = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + (dateObj.getDate())).slice(-2);
    const year = dateObj.getFullYear();

    const startDate = `${year}-${month}-${day}`;

    return startDate;
  };
  const getCurrentDateInput = () => {
    setTimeout(() => {
      setShowbtn(false);
      if (document.getElementById("endDate") !== null) {
        setEnddate(moment(document.getElementById("endDate").value).format("DD-MM-YYYY"));
      }
    }, 3000);

    const dateObj = new Date();
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();

    const endDate = `${year}-${month}-${day}`;

    return endDate;
  };
  // useEffect(() => {
  //   return () => {
  //     setShowbtn(true);
  //     setStartdate('');
  //     setStartdate('');
  //     props.data = [];
  //   }
  // }, [])

  useEffect(() => {
    return () => {
      setShowbtn(true);
      setStartdate('');
      setEnddate('');
    }
  }, []);


  const [shonbtn1, setShowbtn1] = useState('block')
  useEffect(() => {
    if (props.data.length) {
      setShowbtn1('none')
      setLoading(false)
    }
    if (props.errorMsg !== "") {
      setLoading(false)
    }

  }, [props.data.length, props.errorMsg])

  const [inputPage, setInputPage] = useState(page + 1);


  const handlePageChange = (e) => {
    const newPage = Number(e.target.value);
    if (newPage <= 0) {
      setInputPage('');
      return;
    }

    setInputPage(newPage);
    if (newPage >= 0 && newPage <= pageCount) {
      gotoPage(newPage - 1);
    }
  };


  return (
    <React.Fragment>

      <div className="fd extra">
        <div className="row">
          {/* <div className="fd df_al">
            <label className="col-4" htmlFor="starDate">{props.t('Start Date')}:</label>
            <input
              className="col-8 lh_35"
              type="date"
              id="startDate"
              name="startDate"
              style={{ height: '100%' }}
              max={getCurrentDateInput()}
              defaultValue={getCurrentDateInput1()}
              onChange={() => {
                handlestartDate();
              }}
            />
          </div>
          <div className="fd df_al m_t_15">
            <label className="col-4" htmlFor="endDate">{props.t('End Date')}:</label>
            <input
              className="col-8 lh_35"
              type="date"
              id="endDate"
              name="endDate"
              style={{ height: '100%' }}
              max={getCurrentDateInput()}
              defaultValue={getCurrentDateInput()}
              onChange={() => {
                handleendDate();
              }}
            />
          </div>
          <div className="fd m_t_15 lh_35 df_al" style={{ display: shonbtn1 === 'none' ? 'flex' : 'none' }}>
            <label className="col-4">{props.t('Page No')}  </label>
            <input
              className="col-8"
              type="number"
              min={1}
              max={pageCount}
              value={inputPage}
              onChange={handlePageChange}
              style={{ color: !(0 < inputPage && pageCount + 1 > inputPage) ? "red" : "black", height: '100%' }}
            />
          </div> */}

          <div className="fd df_al">
            <label className="col-4" htmlFor="startDate">{props.t('Start Date')}:</label>
            <input
              className="col-8 lh_35"
              type="date"
              id="startDate"
              name="startDate"
              style={{ height: '100%' }}
              max={getCurrentDateInput()}
              defaultValue={getCurrentDateInput1()}
              onChange={handlestartDate} // Removed redundant function definition
            />
          </div>

          <div className="fd df_al m_t_15">
            <label className="col-4" htmlFor="endDate">{props.t('End Date')}:</label>
            <input
              className="col-8 lh_35"
              type="date"
              id="endDate"
              name="endDate"
              style={{ height: '100%' }}
              max={getCurrentDateInput()}
              defaultValue={getCurrentDateInput()}
              onChange={handleendDate} // Removed redundant function definition
            />
          </div>

          <div className="fd m_t_15 lh_35 df_al" style={{ display: shonbtn1 === 'none' ? 'flex' : 'none' }}>
            <label className="col-4">{props.t('Page No')}</label>
            <input
              className="col-8"
              type="number"
              min={1}
              max={pageCount}
              value={inputPage}
              onChange={handlePageChange}
              style={{
                color: !(inputPage > 0 && inputPage <= pageCount) ? "red" : "black",
                height: '100%',
              }}
            />
          </div>


          <div className="fd">
            <p style={{ color: 'red' }}>{(startDate === "Invalid date" || endDate === "Invalid date") ? "Invalid date" : props.errorMsg}</p>
          </div>
          <div className="fd" style={{ display: shonbtn1 }} >
            <button
              className="btn_2 fd float_right"
              onClick={(e) => {
                props.gethandHistory(startDate, endDate);
                setShowbtn(true);
                setLoading(true)
                setInputPage(1);
                console.log(startDate, endDate)
              }}
              disabled={showBtn}
            >
              {props.t('Show')}
              {showBtn && <span className="m_l_5 loader_3"></span>}
            </button>
          </div>
        </div>
      </div>
      {loading && <div style={{ padding: "45%" }}>
        {/* <p>Loading.....</p> */}
        <span className="m_l_5 m_t_10 loader_3"></span>
      </div>}
      <div className="fd" style={{ display: !props.data.length ? 'none' : 'block' }}>
        <div className="fd m_t_15" ref={scrollContainerRef} style={{ overflow: 'auto', border: '1px solid gray', maxHeight: '250px' }}>
          <table className="table_1" cellPadding={0} cellSpacing={0} {...getTableProps()}>
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
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    key={row.id}
                    onClick={(e) => {
                      getSubHandHistory(row.id);
                      // setPopUpActionsOpen("opensubHistory");
                    }}
                  // style={{ background: row.id ? 'red' : '' }}
                  >
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* <div className="secondlevel" id="secondLevel">
     
        </div> */}
        </div>
        <div className="fd m_t_15" >
          <div className="fd pageNatoin">
            <span>
              <button className="back" onClick={() => {
                setInputPage(Number(inputPage) - 1)
                previousPage()
              }} disabled={!canPreviousPage}>‹</button>
            </span>
            <span style={{ padding: '3px 10px' }}>
              {props.t('Page')}{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <span>
              <button className="next" onClick={() => {
                setInputPage(Number(inputPage) + 1)
                nextPage()
              }} disabled={!canNextPage}>›</button>
            </span>
          </div>
        </div>
      </div>
      <div>{showSubpokerHistory && <Pokerhandphase data={thirdData} userName={userName} dataTwo={newhanddata} setAction={setPopUpActionsClose.bind(this)} setHandnumber={thirdlevel.bind(this)}></Pokerhandphase>}</div>
      {/* <div>{phaseTwoData.length !== 0 && <PokerHistoryPhaseTwo data={phaseTwoData} table={openTableData} setAction={setPopUpActionsClose.bind(this)}></PokerHistoryPhaseTwo>}</div> */}

    </React.Fragment>
  );
}
export default withTranslation()(PokerhandHistory)