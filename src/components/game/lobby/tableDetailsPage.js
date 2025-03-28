import React, { useState, useEffect } from "react";
// import "../../../../../css/ui/lobby/tableDetails/tableDetails.css";
import "../../../css/ui/lobby/tableDetails/tableDetails.css";
// import Columns from "./tableDetailsColumns";
// import { useTable } from "react-table";

// import infoIcon from "../../../../../assets/images/lobby/Info_Icon.svg";
import TablePreview from "./tablePreview";
// import palyicon from '../../../../../assets/images/lobby/lobbyHeader/cashicon.png';
// import Subtract from '../../../../../assets/images/lobby/lobbyHeader/Subtract.png';
// import bannenr from '../../../../../assets/images/lobby/VideoMP4/rightbanner.png';
// import rv_banner from '../../../../../assets/images/tableandcarpet/river_bg.png';
// import { t } from "i18next";
// import fileName from "../../../../../jsconfig";
// import UM from "../../../../utils/utilityMethods";
import gsap from "gsap";
import UM from "../../utils/utilityMethods";

export const TableDetails = (props) => {

  // console.log(props);
  // const columns = useMemo(() => Columns, []);
  // const data = useMemo(() => props.data.data, [props.data.data]);

  // const table = useTable({ columns, data });
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;

  // const onClickJoinTable = function () {
  //   props.network.send("<OpenTable id='" + props.data.id + "' type='" + props.data.type + "'/>");
  //   props.setAction("TDpageJoinTable");
  // }

  // const onClickSeatMe = function () {
  //   props.setAction("TDpageSeatMe");
  //   setTimeout(() => {
  //     props.network.send("<OpenTable id='" + props.data.id + "' type='" + props.data.type + "'/>");
  //   }, 5)
  // }

  // const [showPreview, setShowPreview] = useState(0);

  const [showSub, setShowSub] = useState("MiniTable");
  const [showMiniTable, setShowMiniTable] = useState("");
  const [cashTableData, setCashTableData] = useState({});
  const [tourneyTableData, setTourneyTableData] = useState({});
  // const [sitGoTableData, setSitGoTableData] = useState({});
  const [loader, setLoader] = useState(true);
  const [btnLoader, setBtnLoader] = useState("");
  const [seatMeBtnState, setSeatMeBtnState] = useState(false);
  const [registerBtnState, setRegisterBtnState] = useState(false);

  const [user, setUser] = useState(props.user);
  // const [registerBtnState, setRegisterBtnState] = useState(false);

  useEffect(() => {
    // console.log(props.tableData)
    // console.log(props.user)
    // console.log(props.tableData.data)
    setCashTableData(props.tableData);
    // console.log(props);
    // console.log(props.tableData.data.length)
    setShowSub("MiniTable");
    setShowMiniTable(props.showTables);
    // props.tableData.data.find((table) => table.player === props.user ? setSeatMeBtnState(true) : setSeatMeBtnState(false));
    // props.tableData.data.find((table) => table.player === props.user ? setSeatMeBtnState(true) : setSeatMeBtnState(false));
    //  table.player === props.user ? setSeatMeBtnState(true); break; : setSeatMeBtnState(false)
    setUser(props.user);
    if (props.tableData.data.length) {
      const table = props.tableData.data.find((table) => table.player === props.user);
      if (table) {
        setSeatMeBtnState(true);
      } else {
        setSeatMeBtnState(false);
      }
    } else {
      setSeatMeBtnState(false);
    }
  }, [props.tableData, props.showTables, props.user]);

  useEffect(() => {
    // console.log(props.tourneyData)
    setTourneyTableData(props.tourneyData);
    setShowSub("MiniTable");
    setShowMiniTable(props.showTables);
    // let status = (props.tourneyData.status1 === "Register" ? false : true);
    // setRegisterBtnState(status)
  }, [props.tourneyData, props.showTables]);

  useEffect(() => {
    // console.log(props.sitGoData)
    // setSitGoTableData(props.sitGoData);
    setTourneyTableData(props.sitGoData);
    setShowSub("MiniTable");
    setShowMiniTable(props.showTables);
  }, [props.sitGoData, props.showTables]);

  useEffect(() => {
    // console.log(props.tourneyData);
    // console.log(props.showTables);
    // console.log(props.tourneyData.name)
    setLoader(false);
  }, [props.tourneyData.name]);

  useEffect(() => {
    // console.log(props.tourneyData)
    // console.log(props.sitGoData)

    if ((props.tourneyData.status === "Registering" || props.tourneyData.status === "Late Reg") || (props.sitGoData.status === "Registering" || props.sitGoData.status === "Late Reg")) {
      setRegisterBtnState(false);
    } else {
      setRegisterBtnState(true);
    }
  }, [props.tourneyData.status, props.tourneyData.status1, props.sitGoData.status, props.sitGoData.status1]);

  const onClickJoinTable = function () {
    setBtnLoader("Join_Table");
    setTimeout(() => {
      setBtnLoader("");
    }, 1000);
    props.network.send("<OpenTable id='" + cashTableData.id + "' type='" + cashTableData.type + "'/>");
  }

  const onClickTakeSeat = function () {
    setBtnLoader("Seat_Me");
    setTimeout(() => {
      setBtnLoader("");
    }, 1000);
    if (props.seatAvailble.joinWaitingList) {
      props.network.send("<LeaveWaitingList id='" + cashTableData.id + "' />");
    } else {
      props.network.send("<JoinWaitingList id='" + cashTableData.id + "' />");
    }

  };

  const onOpenTourneyLobby = function () {
    setBtnLoader("tourney_lobby");
    setTimeout(() => {
      setBtnLoader("");
    }, 1000);
    props.network.send("<OpenTable id='" + tourneyTableData.id + "' type='" + tourneyTableData.type + "'/>");
  }

  const onRegisterTourney = function (status) {
    if (status === "Unregister") {
      props.network.send(`<UnRegisterTournamentPlayer  tournamentId='${tourneyTableData.id}'/>`);
    } else {
      setBtnLoader("tourney_register");
      setTimeout(() => {
        setBtnLoader("");
      }, 1000);
      // onOpenTourneyLobby();
      props.setOpenAction("REG");
    }
  }

  const AnimationMiniTable = (data, show) => {
    const element = document.getElementById("miniTablePreview");
    setShowSub(show);
    if (showSub === show) return
    if (element) {
      if (data === "LEFT") {
        gsap.from(`#miniTablePreview`, { x: -window.innerWidth / 2, duration: 0.25, ease: "linear" });
      } else if (data === "RIGHT") {
        gsap.from(`#miniTablePreview`, { x: window.innerWidth / 2, duration: 0.25, ease: "linear" });
      } else {
        console.log("Current Table");
      }
    } else {
      console.log("Element not found");
    }
  }

  return (
    <>
      {(showMiniTable === "Tournaments" || showMiniTable === "Sit_Go") ?
        loader ? <div className="loaderDiv"><span className="loader_3"></span></div> :
          <main className="fd preview-container" >
            <section className="fd preivew-head-section">
              <div className="preview-head-btns-div bold">
                Tournament Details
              </div>
              <div className="preview-sub-head-div" >
                <div className="fd title_border df"><span className="fd text_center bold m_auto tableNameHeading">{UM.textFormat(tourneyTableData.name)}</span></div>
                {(tourneyTableData.Tournament_start && (tourneyTableData.status !== "Canceled Before Start")) &&
                  <div className="preview-sub-head-sub-div p_t_10">
                    <span>Tournament starts at :</span>
                    <span>{UM.dateFormater(tourneyTableData.Tournament_start)}</span>
                  </div>
                }
                {(tourneyTableData.Tournament_cancelled) &&
                  <div className="preview-sub-head-sub-div p_t_10">
                    <span>Tournament ends at :</span>
                    <span>{UM.dateFormater(tourneyTableData.Tournament_cancelled)}</span>
                  </div>
                }
                <div className="preview-sub-head-sub-div p_t_10">
                  <span>Buy-In Amount :</span>
                  {showMiniTable === "Tournaments" ?
                    <span>{tourneyTableData.buyIn}</span> :
                    <span>{UM.numberWithCommas(tourneyTableData.buyIn)}</span>
                  }
                </div>
                {tourneyTableData.prize &&
                  <div className="preview-sub-head-sub-div p_t_10">
                    <span>Prize Amount :</span>
                    <span>{UM.numberWithCommas(tourneyTableData.prize)}</span>
                  </div>
                }
                {tourneyTableData.players &&
                  <div className="preview-sub-head-sub-div p_t_10">
                    <span>Registered Players :</span>
                    <span>{tourneyTableData.players}</span>
                  </div>
                }
                {tourneyTableData.typeText &&
                  <div className="preview-sub-head-sub-div p_t_10">
                    <span>Tournament Type :</span>
                    <span>{tourneyTableData.typeText}</span>
                  </div>
                }
                {tourneyTableData.tableType &&
                  <div className="preview-sub-head-sub-div p_t_10">
                    <span>Table Type :</span>
                    <span>{tourneyTableData.tableType}</span>
                  </div>
                }
                {tourneyTableData.status &&
                  <div className="preview-sub-head-sub-div p_t_10">
                    {/* <span>Tournament Status :</span> */}
                    <span>Status :</span>
                    <span>{tourneyTableData.status}</span>
                  </div>
                }
              </div>
            </section>
            <section className="fd preview-table-section river_border" id="miniTablePreview" style={{ minHeight: (showMiniTable === "Tournaments" ? '10vh' : "20vh"), overflow: 'auto' }}>
              <div className="bold" style={{ position: 'sticky', top: '0' }}>Description:</div>
              {/* <span className="fd"> */}
              {tourneyTableData.description ?
                <div className="fd p_10 text_end" style={{ color: "#898989" }} dangerouslySetInnerHTML={{ __html: tourneyTableData.description.replace(/\n/g, "<br>") }}></div> :
                <span className="tourneyDescription_text">No Description</span>
              }
              {/* </span> */}
            </section>
            <section className="fd preview-footer-section">
              <button type="button" className="button-30" onClick={() => onOpenTourneyLobby()} disabled={btnLoader === "tourney_lobby"}>{btnLoader === "tourney_lobby" ? <span className="loader_3"></span> : "Tournament Lobby"}</button>
              {/* {(btnLoader !== "tourney_register" || !registerBtnState) &&
                <button type="button" className="button-30" onClick={() => onRegisterTourney(tourneyTableData.status1)} disabled={btnLoader === "tourney_register" || registerBtnState}>{btnLoader === "tourney_register" ? <span className="loader_3"></span> : tourneyTableData.status1}</button>
              } */}

              {!registerBtnState && (
                <button
                  type="button"
                  className="button-30"
                  onClick={() => onRegisterTourney(tourneyTableData.status1)}
                  disabled={btnLoader === "tourney_register" || registerBtnState}
                >
                  {btnLoader === "tourney_register" ? (
                    <span className="loader_3"></span>
                  ) : (
                    tourneyTableData.status1
                  )}
                </button>
              )}

            </section>
          </main>
        :
        <main className="fd preview-container" >
          <section className="fd preivew-head-section">

            <div className="preview-head-btns-div buttonhover">
              {/* <button type="button" className={showSub === "MiniTable" ? 'bgblueSet m_l_30 clickTransition' : 'bgblueSet m_l_30 clickTransition'} onClick={() => AnimationMiniTable("LEFT", "MiniTable")}>MINI TABLE</button>
              <button type="button " className={showSub === "TableInfo" ? 'bgredSet clickTransition' : 'bgredSet clickTransition'} onClick={() => AnimationMiniTable("RIGHT", "TableInfo")}>TABLE INFO</button> */}
              <button type="button" className={showSub === "MiniTable" ? 'active button-46 m_l_30 font_w_600 clickTransition p_l_5 p_r_5' : 'font_w_600 p_l_5 p_r_5 button-46 m_l_30 clickTransition'} onClick={() => AnimationMiniTable("LEFT", "MiniTable")}>MINI TABLE</button>
              <button type="button" className={showSub === "TableInfo" ? 'active button-46 font_w_600 clickTransition p_l_5 p_r_5' : 'font_w_600 p_l_5 p_r_5 button-46 clickTransition'} onClick={() => AnimationMiniTable("RIGHT", "TableInfo")}>TABLE INFO</button>

              {/* <button class="button-32" role="button">
                <span class="text">Button 32</span>
              </button>
              <button class="button-32" role="button">
                <span class="text">Button 32</span>
              </button> */}
            </div>

            {/* <section className="fd preview-footer-section buttonhover">
              <button type="button" onClick={() => onClickJoinTable()} disabled={btnLoader === "Join_Table"}> {btnLoader === "Join_Table" ? <span className="loader_3"></span> : "JOIN TABLE"}</button>
              <button type="button" onClick={() => onClickTakeSeat()} disabled={btnLoader === "Seat_Me" || seatMeBtnState}>{btnLoader === "Seat_Me" ? <span className="loader_3"></span> : "SEAT ME"}</button>
            </section> */}

            <div className="preview-sub-head-div " >
              <div className="fd title_border df" style={{ maxHeight: '40px' }}><span className="fd text_center bold m_auto tableNameHeading">{UM.textFormat(cashTableData.name)}</span></div>
              <div className="df m_t_10">
                <div className="tableDetailsHeadSec">
                  <span>Hands per hour :</span>
                  <span className="tableNameHeading">{cashTableData.hands_per_hour}</span>
                </div>
                <div className="tableDetailsHeadSec">
                  <span>Average pot :</span>
                  <span className="tableNameHeading">{UM.changeAmtLabel(cashTableData.average_pot)}</span>
                </div>
              </div>
            </div>
          </section>
          {showSub === "MiniTable" ?
            <section className="fd preview-table-section" id="miniTablePreview">
              <TablePreview user={user} cashTableData={cashTableData} ></TablePreview>
            </section> :
            <section className="fd preview-table-section" id="miniTablePreview">
              <table className="fd InfoTable" style={{ height: '100%' }}>
                <thead>
                  <tr>
                    <th className="clr_river text_center">Player</th>
                    <th className="clr_river text_center">Chips</th>
                  </tr>
                </thead>
                {!props.tableData.data.length ?
                  <span className="tourneyDescription_text">No Players to Show</span> :
                  <tbody>
                    {cashTableData.data?.map((playerDetails, i) => (
                      <tr key={i}>
                        <td className="text_center">{playerDetails.player}</td>
                        <td className="text_center">{playerDetails.chips}</td>
                      </tr>
                    ))}
                  </tbody>
                }
              </table>
            </section>
          }
          <section className="fd preview-footer-section">
            {/* <button type="button" onClick={() => onClickJoinTable()} disabled={btnLoader === "Join_Table"}> {btnLoader === "Join_Table" ? <span className="loader_3"></span> : "JOIN TABLE"}</button>
            <button type="button" onClick={() => onClickTakeSeat()} disabled={btnLoader === "Seat_Me" || seatMeBtnState}>{btnLoader === "Seat_Me" ? <span className="loader_3"></span> : "SEAT ME"}</button> */}


            {/* <button className="glass">
              <span className="text">Glass Button</span>
            </button> */}


            <button className="button-30" onClick={() => onClickJoinTable()} disabled={btnLoader === "Join_Table"} role="button"> {btnLoader === "Join_Table" ? <span className="loader_3"></span> : "JOIN TABLE"}</button>
            {/* <button className="button-30" onClick={() => onClickTakeSeat()} disabled={btnLoader === "Seat_Me" || seatMeBtnState} role="button"> {btnLoader === "Seat_Me" ? <span className="loader_3"></span> : "SEAT ME"}</button> */}

            {!seatMeBtnState && (
              <button
                type="button"
                className="button-30"
                onClick={() => onClickTakeSeat()}
                disabled={btnLoader === "Seat_Me" || seatMeBtnState}
              >
                {btnLoader === "Seat_Me" ? <span className="loader_3"></span> : props.seatAvailble.isSeatsAvailable ? "SEAT ME" : props.seatAvailble.joinWaitingList ? "REMOVE WAITING" : "JOIN WAITING"}

              </button>
            )}

            {/* <button class="pushable" >
              <span class="front">
                {btnLoader === "Join_Table" ? <span className="loader_3"></span> : "JOIN TABLE"}
              </span>
            </button> */}
            {/* <button class="pushable" onClick={() => onClickTakeSeat()} disabled={btnLoader === "Seat_Me" || seatMeBtnState}>
              <span class="front">
                {btnLoader === "Seat_Me" ? <span className="loader_3"></span> : "SEAT ME"}
              </span>
            </button> */}
          </section>
        </main>
      }


      {/* {fileName.name == "Leader_bet" && <img className="col-12 bdrgold" src={bannenr} alt="" style={{ padding: "0px", maxHeight: "12vh", position: "absolute", top: "-108px", left: "0px" }} />}
      {(fileName.name == "Riverpoker") &&
        <div className="banner-container" style={{ display: (window.innerWidth > 769 && window.innerWidth < 992) ? 'none' : '' }}>
          <div className="df">
            <div className="btn-container">
              <div className="first-two-btns">
                <button type="button" value="liveDealer_2" onClick={UM.redirectUrlLinks}>Live Casino</button>
                <button type="button" value="deposit" onClick={UM.redirectUrlLinks}>Cashier</button>
              </div>
              <div className="next-two-btns">
                <button type="button" value="crash" onClick={UM.redirectUrlLinks}>Crash</button>
                <button type="button" value="Sportsm" onClick={UM.redirectUrlLinks}>Sports</button>
              </div>
            </div>
          </div>
        </div>
      }


      <div className="fd  p_2">
        <div className="row p_5">
          <div className="col-6 df_jc_ac">
            <button id="btn" className="tableinfo bdrgold1  txt_clr_1 p_5 m_5 rds_15" style={{
              border: "1px solid #383838",
              background: showPreview == 0 ? (props.btn ? "#17181A" : "#1472A1") : "#17181A",
              opacity: props.btn ? '0.5' : '1'
            }} onClick={() => {
              setShowPreview(0);
            }} disabled={props.btn}>{t("MINI TABLE")}</button>
          </div>
          <div className="col-6 df_jc_ac">
            <button className="tableinfo bdrgold1  txt_clr_1 m_5 p_5 rds_15"
              style={{ border: "1px solid #383838", background: showPreview == 1 ? (props.btn ? "#17181A" : "#1472A1") : "#17181A", opacity: props.btn ? '0.5' : '1' }}
              onClick={() => {
                setShowPreview(1);

              }} disabled={props.btn}>{t("TABLE INFO")}</button>
          </div>
        </div>
      </div >
      <div div className="fd" >
        <div className="df_jc_ac p_5 bdrgold">
          <span>{props.data.name != "No Table Selected" ? props.data.name : t("No Table Selected")}</span>
        </div>
        <div className="df_jc_ac p_5">
          <span className="col-6 d_flex jcs">{t("Hands per Hour")} :</span><span className="col-6 d_flex jcc">{props.data.hands_per_hour}</span>
        </div>
        <div className="df_jc_ac p_5">
          <span className="col-6 d_flex jcs">{t("Average Pot")}:</span><span className="col-6 d_flex jcc">{UM.numberWithCommas(props.data.average_pot)}</span>
        </div>
      </div >
      <div className="tableDetails">
        <div className="containerOne fd over_hide" style={{ height: (window.innerWidth > 810 && window.innerWidth < 1124) ? '35vh' : '38pvh' }}>
          <div className={showPreview === 0 ? "tablePreviewTab tablePreviewTab_show" : "tablePreviewTab"}>
            <TablePreview seats={props.data.seats} avatarList={props.avatarList}></TablePreview>
          </div>
          <div className={showPreview === 1 ? "tableDetailsTab tableDetailsTab_show" : "tableDetailsTab"}>
            <table id="tableDetails_table" {...getTableProps()}>
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
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="tableDetailsTabsContainer">
              <img src={infoIcon} alt="" onClick={(e) => {
                e.preventDefault();
                if (showPreview === 0) {
                  setShowPreview(1);
                } else {
                  setShowPreview(0);
                }
              }} />
            </div>
          </div>
        </div>
        <div className="containerTwo fd">
          <div className="row">
            <div className="col-12">
              <button id="btn" style={{ background: props.btn ? "#2A2C38" : "linear-gradient(180deg, #3C5DC2 35%, #2348B9 100%)", display: fileName.name === "Riverpoker" ? 'flex' : '', alignItems: fileName.name === "Riverpoker" ? 'center' : '', justifyContent: fileName.name === "Riverpoker" ? 'center' : '' }} className="bdrgold jointable clr_ff" onClick={onClickJoinTable} disabled={props.btn}><img src={palyicon} alt="" style={{ marginBottom: "-3px", marginRight: "7px", opacity: props.btn ? '0.5' : '1' }} /><span>{t("JOIN TABLE")}</span></button>
            </div>

          </div>
        </div>
        <div className="containerTwo fd">
          <div className="row">
            <div className="col-12">
              <button className="bdrgold seatme clr_ff" style={{ background: props.btn2 ? "#2A2C38" : "linear-gradient(180deg, #FCD04E 35%, #C1981E 100%)" }} onClick={onClickSeatMe} disabled={props.btn2}><img src={Subtract} alt="" style={{ marginBottom: "-5px", marginRight: "7px" }} /><span>{t("SEAT ME")}</span></button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
