import React, { useEffect, useState } from "react";
import "../../../../css/ui/popUps/cashier.css";
// import paymentOne from "../../../../assets/images/popUp/paymentMethods/shetab.jpg";
// import paymentTwo from "../../../../assets/images/popUp/paymentMethods/bitcoin.png";
// import paymentThree from "../../../../assets/images/popUp/paymentMethods/perfect-money.jpg";
// import paymentFour from "../../../../assets/images/popUp/paymentMethods/tether_bitcoin.png";
// import close_1 from '../../../../assets/images/table/close_1.svg';
// import Config from "../../../../config";
// import fileName from "../../../../jsconfig";

import UM from "../../../utils/utilityMethods";
// import logo from "../../../../assets/images/lobby/Untitled-4.png";
// import logo from "../../../../assets/images/logo/river_logo.png";
import logo from "../../../../assets/images/logo/river_logo.svg";
import star from "../../../../assets/images/lobby/star.png";
import star_off from "../../../../assets/images/lobby/star_off.png";
// import duble_down_arrow from "../../../../assets/images/logo/duble-down-arrow.svg";

function Cashier(props) {
  // var config = new Config();
  // var sid = JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_sid'`)).sid;

  const [usdMoney, setUsdMoney] = useState("");
  const [usdBonus, setUsdBonus] = useState("");
  const [usdInplay, setUsdInplay] = useState("");
  const [usdTourneyMoney, setUsdTourneyMoney] = useState("");


  const [chpMoney, setChpMoney] = useState("");
  const [chpBonus, setChpBonus] = useState("");
  const [chpInplay, setChpInplay] = useState("");
  const [chpTourneyMoney, setChpTourneyMoney] = useState("");

  const [compoints, setCompoints] = useState("");
  const [tickets, setTickets] = useState([]);

  const [levelZero, setLevelZero] = useState(false);
  const [levelOne, setLevelOne] = useState(false);
  const [levelTwo, setLevelTwo] = useState(false);
  const [levelThree, setLevelThree] = useState(false);
  const [levelFour, setLevelFour] = useState(false);

  // const [loader, setLoader] = useState(false);
  const [ticketsPop, setTicketsPop] = useState(false);
  const [tournamentsPop, setTournamentsPop] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [myTable, setTable] = useState([]);

  const [enableFindButton, setEnableFindButton] = useState(false);



  useEffect(() => {
    const balance = props?.playerInfo?.[0]?.Balance;
    if (balance && Array.isArray(balance)) {
      const usdBalance = balance.find(item => item.attr && item.attr.wallet === "USD");
      const chpBalance = balance.find(item => item.attr && item.attr.wallet === "CHP");
      const compoints = balance.find(item => item.attr && item.attr.wallet === "COMPPOINTS");

      if (usdBalance) {
        setUsdMoney(Number(usdBalance.attr.cash).toFixed(2));
        setUsdBonus(Number(usdBalance.attr.bonus).toFixed(2))
        setUsdInplay(Number(usdBalance.attr["cash-in-play"]) + Number(usdBalance.attr["bonus-in-play"]));
        setUsdTourneyMoney(Number(usdBalance.attr["tournament-money"]));
      }

      if (chpBalance) {
        setChpMoney(Number(chpBalance.attr.cash).toFixed(2));
        setChpBonus(Number(chpBalance.attr.bonus).toFixed(2));
        setChpInplay(Number(chpBalance.attr["cash-in-play"]) + Number(chpBalance.attr["bonus-in-play"]));
        setChpTourneyMoney(Number(chpBalance.attr["tournament-money"]));
      }

      if (compoints) {
        setCompoints(Number(compoints.attr.total).toFixed(2));
      }
    }
    const tickets = props?.playerInfo?.[0]?.Tickets;
    if (tickets) {
      if (tickets.attr.count > 0) {
        setTickets(tickets.Ticket)
      }
    }


    const levelMap = {
      "Iron": [false, true, true, true, true],
      "Bronze": [false, false, true, true, true],
      "Silver": [false, false, false, true, true],
      "Gold": [false, false, false, false, true],
      "Platinum": [false, false, false, false, false]
    };

    const [zero, one, two, three, four] = levelMap[props.myLevel] || [false, false, false, false, false];

    setLevelZero(zero);
    setLevelOne(one);
    setLevelTwo(two);
    setLevelThree(three);
    setLevelFour(four);

  }, [props]);


  const getStatus = (status) => {

    var tableStatus = ""
    switch (status) {
      case "CANCELED_BEFORE_START":
        tableStatus = "Canceled";
        break;
      case "CANCELED_AFTER_START":
        tableStatus = "Canceled";
        break;
      case "CANCELLING":
        tableStatus = "Canceling";
        break;
      case "COMPLETED":
        tableStatus = "Completed";
        break;
      case "SEATING":
        tableStatus = "Seating";
        break;
      case "REGISTERING":
        tableStatus = "Registering";
        break;
      case "ANNOUNCED":
        tableStatus = "Anounced";
        break;
      case "LATE_REG":
        tableStatus = "Late register";
        break;
      case "RUNNING":
        tableStatus = "Running";
        break;
      default:
        // console.log("status  >>  ", status)
        break;
    }
    return tableStatus;
  }
  const UserLevel = () => {
    return (
      <div className="userlevel">
        <div className="stars">
          <div className="singleStar0" >
            <img src={!levelZero ? star : star_off} alt="" />
          </div>
          <div className="singleStar0" >
            <img src={!levelOne ? star : star_off} alt="" />
          </div>
          <div className="singleStar1" >
            <img src={!levelTwo ? star : star_off} alt="" />
          </div>
          <div className="singleStar2">
            <img src={!levelThree ? star : star_off} alt="" />
          </div>
          <div className="singleStar3" >
            <img src={!levelFour ? star : star_off} alt="" />
          </div>
        </div>
      </div>
    );
  }

  // const getPlayerInfo = (e) => {
  //   setLoader(true);
  //   // e.preventDefault(); props.setAction("getPlayerInfo");
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 1000);
  // }
  const onShowTickets = () => {
    setTicketsPop(!ticketsPop)
    setEnableFindButton(false);
  }


  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const onSelectrow = (row, index) => {
    if (selectedRowIndex !== null) {
      let previousRow = document.getElementById(`_MyTickets_tables_${selectedRowIndex}`);
      if (previousRow) {
        previousRow.classList.remove("background_color");
      }
    };

    let t = document.getElementById(`_MyTickets_tables_${index}`);
    if (t) {
      t.classList.add("background_color");
    };

    setSelectedRowIndex(index);
    let id = row.attr.tournamentSettingsId;
    setEnableFindButton(true);
    props.network.send(`<GetTournamentsBySettings id="${index}" settingsId="${id}" />`)
  };

  const onFindTournament = (name) => {
    if (name === "openTorunamentPop") {
      setTournamentsPop(true);
    } else if (name === "closeTorunamentPop") {
      setTournamentsPop(false);
    } else if (name === "openTournameLobby") {
      let id = myTable.attr.id;
      let type = myTable.attr.type;
      // let mode = myTable.attr.mode;
      setCheckBox(false);
      setTournamentsPop(false);
      props.network.send(`<OpenTable id="${id}" type="${type}"/>`);
      // props.network.send(`<OpenTournamentLobby mode="${mode}" id="${id}"/>`);
    }
  }
  const oncheckBoxSelection = (table) => {
    setTable(table)
    setCheckBox(!checkBox);
  }

  // const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const container = document.getElementsByClassName('cashier-container')[0];

    const handleScroll = () => {
      if ((container.scrollTop + 14) + container.clientHeight >= container.scrollHeight) {
        // setShowIndicator(false);
      } else {
        // setShowIndicator(true);
      }
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <React.Fragment>
      {/* <div className="popCover_1" style={{ zIndex: '999' }} onClick={(e) => { e.preventDefault(); props.lobbyMenuHandler("hideCashierPopUp"); }}></div> */}
      <div className="game_type_filter_cover" >
        <div className="fd game_type_filter">
          <header>
            <span className="font_15 font_w_600 p_5" style={{ height: '100%' }}>
              {/* <span className="headerIconSpan">💰</span> Cashier */}
              <span className="headerIconSpan emoji">&#x1F4B0;</span> Cashier
            </span>
          </header>
          <section className="fd" style={{ minHeight: 'unset', maxHeight: 'unset', overflow: 'hidden', }}>
            <div className="fd df_al_jsb  p_10" >
              <div className="">
                <img src={logo} alt="logo" className="cashier_page_logo" />
              </div>
              <button className="playerLevel-btn" onClick={(e) => { e.preventDefault(); props.lobbyMenuHandler("PLI"); }}>
                <span className="df">VIP Level : <span className="m_l_5 m_r_5">{props.myLevel}</span> <span> <UserLevel></UserLevel></span></span>
              </button>
            </div>
            <div className="fd">
              <span className="m_l_10 font_15">
                Balance
              </span>
              <section className="fd p_10 df cashier-container">
                <div className="cashier-box">
                  <table className="fd">
                    <thead>
                      <tr>
                        <th className="text_start">Cash In :</th>
                        <th className="text_start">CHP</th>
                        <th className="text_start">USD</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Available :</td>
                        <td className="text_end">{UM.changeAmtLabel(chpMoney)}</td>
                        <td className="text_end">{UM.changeAmtLabel(usdMoney)}</td>
                      </tr>
                      <tr>
                        <td>Bonus :</td>
                        <td className="text_end">{UM.changeAmtLabel(chpBonus)}</td>
                        <td className="text_end">{UM.changeAmtLabel(usdBonus)}</td>
                      </tr>
                      <tr>
                        <td>In Play :</td>
                        <td className="text_end">{UM.changeAmtLabel(chpInplay)}</td>
                        <td className="text_end">{UM.changeAmtLabel(usdInplay)}</td>
                      </tr>
                      <tr style={{ color: 'lime', fontWeight: '500', marginBottom: '20px' }}>
                        <td>Total :</td>
                        <td className="text_end">{UM.changeAmtLabel(Number(chpMoney) + Number(chpBonus) + Number(chpInplay))}</td>

                        <td className="text_end">{UM.changeAmtLabel(Number(usdMoney) + Number(usdBonus) + Number(usdInplay))}</td>
                      </tr>
                      <tr>
                        <td>Tourney Money :</td>
                        <td className="text_end">{UM.changeAmtLabel(chpTourneyMoney)}</td>
                        <td className="text_end">{UM.changeAmtLabel(usdTourneyMoney)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="sec-div">
                    <span>Tickets</span>
                    <span>
                      <button type="button" disabled={Number(props?.playerInfo[0]?.Tickets?.attr?.count) === 0} style={{ opacity: Number(props?.playerInfo[0]?.Tickets?.attr?.count) === 0 ? '.5' : '1' }} onClick={onShowTickets}>VIEW TICKETS</button>
                    </span>
                  </div>
                  <div className="sec-div">
                    <span>Tourney Tickets</span>
                    <span> {UM.changeAmtLabel(props?.playerInfo[0]?.Tickets?.attr?.count)}</span>
                  </div>

                  <div className="sec-div">
                    <span>Rake Back Points</span>
                    <span>
                      {/* <button type="button" value="vip-points-exchange" onClick={UM.redirectUrlLinks}>RAKE BACK EXCHANGE</button> */}
                      <button type="button" value="vip-points-exchange" onClick={UM.redirectUrlLinks}>RAKE BACK</button>
                    </span>
                  </div>
                  <div className="sec-div">
                    <span>Total</span>
                    <span className="text_end"> {UM.changeAmtLabel(compoints)} </span>
                  </div>
                </div>
                {/* {showIndicator &&
                  <div id="cashier-pagedown-indicater">
                    <img src={duble_down_arrow} alt="" />
                  </div>
                } */}
                <div className="logoBoxLoader cashier-link-box" style={{ justifyContent: "unset" }}>
                  <button type="submit" value="deposit" onClick={UM.redirectUrlLinks}>DEPOSIT</button>
                  <button type="submit" value="p2p-transfer" onClick={UM.redirectUrlLinks}>P2P TRANSFER</button>
                  <button type="submit" value="balance" onClick={UM.redirectUrlLinks}>BALANCE</button>
                  <button type="submit" value="cashout" onClick={UM.redirectUrlLinks}>CASHOUT</button>
                  <button type="submit" value="transactions" onClick={UM.redirectUrlLinks}>TRANSACTIONS</button>
                  <button type="submit" value="profile" onClick={UM.redirectUrlLinks}>MY PROFILE</button>
                  <button type="submit" value="exchangeCurrency" onClick={UM.redirectUrlLinks}>EXCHANGE</button>
                </div>

              </section>
            </div>
          </section>
          <div className="close_div">
            <button type="button" className="btn_2" onClick={(e) => { e.preventDefault(); props.lobbyMenuHandler("hideCashierPopUp"); }}>Close</button>
          </div>




          {ticketsPop &&
            <div className="ticket-popup">
              <div className="sub-tickt-div">
                <header>
                  My tickets
                  <span onClick={onShowTickets}>x</span>
                </header>
                <div className="fd p_10">
                  <table>
                    <thead>
                      <tr>
                        <td>Tournament</td>
                        <td>Cost</td>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((table, index) => (
                        <tr key={index} id={`_MyTickets_tables_${index}`} onClick={() => onSelectrow(table, index)}>
                          <td>{table.attr.to}</td>
                          <td>{UM.changeAmtLabel(table.attr.cost)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="close_div">
                  <button type="button" className="btn_2" disabled={!enableFindButton} style={{ opacity: !enableFindButton ? '.5' : '1' }} onClick={() => onFindTournament("openTorunamentPop")}>Find Tournament</button>
                  <button type="button" className="btn_2" onClick={onShowTickets}>Close</button>
                </div>
              </div>
            </div>
          }

          {tournamentsPop &&
            <div className="ticket-popup">
              <div className="sub-tickt-div" style={{ width: '100%' }}>
                <header>
                  Tournaments
                  <span onClick={() => onFindTournament("closeTorunamentPop")}>x</span>
                </header>
                <div className="fd p_10">
                  <table className="tournamentshowTable" >
                    <thead>
                      <tr>
                        <td ></td>
                        <td></td>
                        <td>Name</td>
                        <td>Game</td>
                        <td>Buy-In</td>
                        <td>Players</td>
                        <td>Stauts</td>
                      </tr>
                    </thead>
                    <tbody>
                      {props.cashierTourneyTables.length &&
                        props.cashierTourneyTables[0].map((table, index) => (
                          <tr key={index} onClick={() => onSelectrow(table, index)}>
                            <td >
                              <input type="checkbox" onChange={() => oncheckBoxSelection(table)} />
                            </td>
                            <td>{table.attr.type === "SITANDGO_TOURNAMENT" ? "Sit & Go" : "Tournament"}</td>
                            <td>{table.attr.name}</td>
                            <td>{UM.GameName(table.attr.game)}</td>
                            <td>{UM.changeAmtLabel(table.attr.buyIn)}</td>
                            <td>{table.attr.players}</td>
                            <td>{getStatus(table.attr.status)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <div className="close_div">
                  {/* <button type="button" className="btn_2" disabled={!enableFindButton} style={{ opacity: !enableFindButton ? '.5' : '1' }} onClick={() => onFindTournament("openTorunamentPop")}>Find Tournament</button>
                  <button type="button" className="btn_2" onClick={onShowTickets}>Close</button> */}
                  <button type="button" className="btn_2" disabled={!checkBox} style={{ opacity: !checkBox ? '.5' : '1' }} onClick={() => onFindTournament("openTournameLobby")}>Open Tournament</button>
                  <button type="button" className="btn_2" onClick={() => onFindTournament("closeTorunamentPop")}>Close</button>
                </div>
                {/* <footer className="fd text_end p_10">
                  <button type="button" className="button-bg" disabled={!checkBox} style={{ opacity: !checkBox ? '.5' : '1' }} onClick={() => onFindTournament("openTournameLobby")}>Open Tournament</button>
                  <button type="button" onClick={() => onFindTournament("closeTorunamentPop")}>Close</button>
                </footer> */}
              </div>
            </div>
          }
        </div >
      </div>
      {/* <div className="popCover_1" ></div> */}
      {/* <div className="newCashier popup_1" >
        <div className="newCashier popup_1_in">
          <div className="head"> 💰 Cashier
            <button className="close_1" onClick={(e) => { e.preventDefault(); props.setAction("Cashier"); }}> <img src={close_1} alt="" /> </button>
          </div>

          <section className="fd df_al_jsb  p_10">
            <div className="">
              <img src={logo} alt="logo" style={{ height: '45px' }} />
            </div>
            <button className="playerLevel-btn" onClick={(e) => { e.preventDefault(); props.lobbyMenuHandler("PLI"); }}>
              <span className="df">VIP Level : <span className="m_l_5 m_r_5">{props.myLevel}</span> <span> <UserLevel></UserLevel></span></span>
            </button>
          </section>
          <header className="fd m_l_10">
            Balance
          </header>
          <section className="fd p_10 df cashier-container">
            <div className="cashier-box">
              <table className="fd">
                <thead>
                  <tr>
                    <th>Cash In :</th>
                    <th className="text_center">CHP</th>
                    <th className="text_center">USD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Available :</td>
                    <td className="text_end">{UM.changeAmtLabel(chpMoney)}</td>
                    <td className="text_end">{UM.changeAmtLabel(usdMoney)}</td>
                  </tr>
                  <tr>
                    <td>Bonus :</td>
                    <td className="text_end">{UM.changeAmtLabel(chpBonus)}</td>
                    <td className="text_end">{UM.changeAmtLabel(usdBonus)}</td>
                  </tr>
                  <tr>
                    <td>In Play :</td>
                    <td className="text_end">{UM.changeAmtLabel(chpInplay)}</td>
                    <td className="text_end">{UM.changeAmtLabel(usdInplay)}</td>
                  </tr>
                  <tr style={{ color: 'lime', fontWeight: '500', marginBottom: '20px' }}>
                    <td>Total :</td>
                    <td className="text_end">{UM.changeAmtLabel(Number(chpMoney) + Number(chpBonus) + Number(chpInplay))}</td>

                    <td className="text_end">{UM.changeAmtLabel(Number(usdMoney) + Number(usdBonus) + Number(usdInplay))}</td>
                  </tr>
                  <tr>
                    <td>Tourney Money :</td>
                    <td className="text_end">{UM.changeAmtLabel(chpTourneyMoney)}</td>
                    <td className="text_end">{UM.changeAmtLabel(usdTourneyMoney)}</td>
                  </tr>
                </tbody>
              </table>
              <div className="fd">
                <div className="sec-div">
                  <span>Tickets</span>
                  <span>
                    <button type="button" disabled={Number(props?.playerInfo[0]?.Tickets?.attr?.count) === 0} style={{ opacity: Number(props?.playerInfo[0]?.Tickets?.attr?.count) === 0 ? '.5' : '1' }} onClick={onShowTickets}>VIEW TICKETS</button>
                  </span>
                </div>
                <div className="sec-div">
                  <span>Tourney Tickets</span>
                  <span> {UM.changeAmtLabel(props?.playerInfo[0]?.Tickets?.attr?.count)}</span>
                </div>

                <div className="sec-div">
                  <span>Rake Back Points</span>
                  <span>
                    <button type="button" value="vip-points-exchange" onClick={UM.redirectUrlLinks}>RAKE BACK EXCHANGE</button>
                  </span>
                </div>
                <div className="sec-div">
                  <span>Total</span>
                  <span className="text_end"> {UM.changeAmtLabel(compoints)} </span>
                </div>
              </div>
            </div>
            <div className="logoBoxLoader cashier-link-box">
              <button type="submit" value="deposit" onClick={UM.redirectUrlLinks}>DEPOSIT</button>
              <button type="submit" value="p2p-transfer" onClick={UM.redirectUrlLinks}>P2P TRANSFER</button>
              <button type="submit" value="balance" onClick={UM.redirectUrlLinks}>BALANCE</button>
              <button type="submit" value="cashout" onClick={UM.redirectUrlLinks}>CASHOUT</button>
              <button type="submit" value="transactions" onClick={UM.redirectUrlLinks}>TRANSACTIONS</button>
              <button type="submit" value="profile" onClick={UM.redirectUrlLinks}>MY PROFILE</button>
              <button type="submit" value="exchangeCurrency" onClick={UM.redirectUrlLinks}>EXCHANGE</button>
            </div>
            {showIndicator &&
              <div id="cashier-pagedown-indicater">
                <img src={duble_down_arrow} alt="" />
              </div>
            }
          </section>
          <footer className="fd text_end p_10">
            <button type="button" onClick={getPlayerInfo}>Refresh {loader && <span className="m_l_5 loader_3" style={{ width: '12px', height: '12px' }}></span>}</button>
            <button type="button" onClick={(e) => { e.preventDefault(); props.setAction("Cashier"); }}>Close </button>
          </footer>

          {ticketsPop &&
            <div className="ticket-popup">
              <div className="sub-tickt-div">
                <header>
                  My tickets
                  <span onClick={onShowTickets}>x</span>
                </header>
                <div className="fd p_10">
                  <table>
                    <thead>
                      <tr>
                        <td>Tournament</td>
                        <td>Cost</td>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((table, index) => (
                        <tr key={index} id={`_MyTickets_tables_${index}`} onClick={() => onSelectrow(table, index)}>
                          <td>{table.attr.to}</td>
                          <td>{UM.changeAmtLabel(table.attr.cost)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <footer className="fd text_end p_10">
                  <button type="button" className="button-bg" disabled={!enableFindButton} style={{ opacity: !enableFindButton ? '.5' : '1' }} onClick={() => onFindTournament("openTorunamentPop")}>Find Tournament</button>
                  <button type="button" onClick={onShowTickets}>Close</button>
                </footer>
              </div>
            </div>
          }

          {tournamentsPop &&
            <div className="ticket-popup">
              <div className="sub-tickt-div" style={{ width: '100%' }}>
                <header>
                  Tournaments
                  <span onClick={() => onFindTournament("closeTorunamentPop")}>x</span>
                </header>
                <div className="fd p_10">
                  <table className="tournamentshowTable" >
                    <thead>
                      <tr>
                        <td ></td>
                        <td></td>
                        <td>Name</td>
                        <td>Game</td>
                        <td>Buy-In</td>
                        <td>Players</td>
                        <td>Stauts</td>
                      </tr>
                    </thead>
                    <tbody>
                      {props.cashierTourneyTables.length &&
                        props.cashierTourneyTables[0].map((table, index) => (
                          <tr key={index} onClick={() => onSelectrow(table, index)}>
                            <td >
                              <input type="checkbox" onClick={() => oncheckBoxSelection(table)} />
                            </td>
                            <td>{table.attr.type === "SITANDGO_TOURNAMENT" ? "Sit & Go" : "Tournament"}</td>
                            <td>{table.attr.name}</td>
                            <td>{UM.GameName(table.attr.game)}</td>
                            <td>{UM.changeAmtLabel(table.attr.buyIn)}</td>
                            <td>{table.attr.players}</td>
                            <td>{getStatus(table.attr.status)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <footer className="fd text_end p_10">
                  <button type="button" className="button-bg" disabled={!checkBox} style={{ opacity: !checkBox ? '.5' : '1' }} onClick={() => onFindTournament("openTournameLobby")}>Open Tournament</button>
                  <button type="button" onClick={() => onFindTournament("closeTorunamentPop")}>Close</button>
                </footer>
              </div>
            </div>
          }
        </div> 
      </div>*/}
    </React.Fragment >
  );
}

export default Cashier;
