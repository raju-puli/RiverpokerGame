import React from "react";
import '../../../../../css/ui/lobby/tableDetails/tourneyDetailsPage.css';
import { withTranslation } from 'react-i18next';
import DateUtils from '../../../../utils/dateUtils';
// import bannenr from '../../../../../assets/images/lobby/VideoMP4/rightbanner.png';
// import river_top_banner from '../../../../../assets/images/lobby/VideoMP4/river_top_banner.mp4';
// import rv_banner from '../../../../../assets/images/lobby/river-top-banner.jpg';
import fileName from "../../../../../jsconfig";
import Config from '../../../../../config';

import UM from "../../../../utils/utilityMethods";

function TourneyDetailsPage(props) {
    var config = new Config();
    if (props.data.Tournament_start != undefined) {
        // data=parseInt(props.data.Tournament_start).toLocaleDateString()
        // .date = new Date(parseInt(tables[i].attr.tournamentStart)).toLocaleDateString()


        // let objDate = new Date(props.data.Tournament_start)
        // console.log(objDate.getMonth())
        //    console.log( DateUtils.formatDateFromNumber(props.data.Tournament_start,"MMM DD YYYY HH:MM"))

        // var b=formatDateFromNumber(props.data.Tournament_start,"MMM DD YYYY HH:MM")
        // console.log(b)

    }
    const singleClickhandle = (e) => {
        // if(e.target.value==="Un Register"){
        //     alert("hi")
        //     props.network.send("<UnRegisterTournamentPlayer type='BALANCE' tournamentId='22-2f7c7'/>")
        // }else{

        //     props.open("REG")
        // }
        // alert("hi
        props.network.send(`<OpenTable id="${props.data.id}" type="${props.data.type}"/>`);
        props.network.send(`<GetTableDetails id="${props.data.id}" type="${props.data.type}"/>`)
        // console.log(`<GetTableDetails id="${props.data.id}" type="${props.data.type}"/>`)
    }
    const singleClickhandle1 = (e) => {
        props.open("REG")
    }
    const DoubleClickhandle = () => {
        // alert("double")
        // props.network.send(`<GetTableDetails id="${row.dataset.id}" type="${row.dataset.type}"/>`)
    }
 
    return (
        <>
            {/* {(fileName.name == "Leader_bet" || fileName.name == "Riverpoker") && <img className="col-12 bdrgold" src={fileName.name === "Riverpoker" ? rv_banner : bannenr} style={{ padding: "0px", maxHeight: fileName.name === "Riverpoker" ? "16vh" : "12vh", position: "absolute", top: fileName.name === "Riverpoker" ? "-123px" : "-108px", left: "0px" }} />} */}

            {/* {fileName.name == "Leader_bet" && <img className="col-12 bdrgold" src={bannenr} style={{ padding: "0px", maxHeight: "12vh", position: "absolute", top: "-108px", left: "0px" }} />} */}
            {(fileName.name === "Riverpoker") &&
                <div className="banner-container" style={{ display: (window.innerWidth > 769 && window.innerWidth < 992) ? 'none' : '' }}>
                    <div className="df">
                        <div className="btn-container">
                            <div className="first-two-btns">
                                <button type="button" onClick={() => {
                                    window.open(config.URL_Environment.proxy.baseUrl + config.URL_Environment.url.gotoLivecasino)
                                }} >Live Casino</button>
                                <button type="button" onClick={() => {
                                    window.open(config.URL_Environment.proxy.baseUrl + config.URL_Environment.url.gotoDeposit)
                                }} >Cashier</button>
                            </div>
                            <div className="next-two-btns">
                                <button type="button" onClick={() => {
                                    window.open(config.URL_Environment.proxy.baseUrl + config.URL_Environment.url.gotoCrash)
                                }}>Crash</button>
                                <button type="button" onClick={() => {
                                    window.open(config.URL_Environment.proxy.baseUrl + config.URL_Environment.url.gotoSportsm)
                                }}>Sports</button>
                            </div>
                        </div>
                        <div className="img-container">
                            {/* <video autoPlay loop style={{ width: '100%', height: '100%' }}>
                                <source src={river_top_banner} type="video/mp4" />
                            </video> */}
                            {/* <img src={rv_banner} /> */}
                        </div>
                    </div>
                </div>
            }
            <div className="fd">
                <div className="df_jc_ac">
                    <h3>{props.t("Tournamants Details")}</h3>
                </div>
                <div>
                    <div className="df_jc_ac p_5">
                        <span style={{ textAlign: 'center' }}>{props.t("Name")}: </span>
                    </div>
                    <div className="df_jc_ac p_5 ">
                        <span className="col-5 df_jc_ac bb p_b_5" style={{ textAlign: 'center' }}>{props.data.name != "No Table Selected" ? props.data.name : ""}</span>
                    </div>
                    {(props.data.Tournament_start != undefined && props.data.Tournament_start != "") && <div className="df_jc_ac p_5">
                        <span style={{ textAlign: 'center' }}>{props.t("Tournamants start at")}: </span>
                    </div>}
                    {(props.data.Tournament_start != undefined && props.data.Tournament_start != "") && <div className="df_jc_ac p_5 ">
                        <span className="col-5 df_jc_ac bb p_b_5" style={{ textAlign: 'center' }}>{new DateUtils().formatDateFromNumber(props.data.Tournament_start, "MMM DD YYYY HH:MM")}</span>
                    </div>}
                    {(props.data.Tournament_cancelled != undefined && props.data.Tournament_cancelled != "") && <div className="df_jc_ac p_5">
                        <span style={{ textAlign: 'center' }}>{props.t("Tournamants Cancelled at")}: </span>
                    </div>}
                    {(props.data.Tournament_cancelled != undefined && props.data.Tournament_cancelled != "") && <div className="df_jc_ac p_5 ">
                        <span className="col-5 df_jc_ac bb p_b_5" style={{ textAlign: 'center' }}>{new DateUtils().formatDateFromNumber(props.data.Tournament_cancelled, "MMM DD YYYY HH:MM")}</span>
                    </div>}


                    <div className="df_jc_ac p_5">
                        <span className="col-6 d_flex jcs">{props.t("Buy-In")}:</span><span className="col-6 d_flex jce">{props.data.buyIn}</span>
                    </div>
                    <div className="df_jc_ac p_5">
                        <span className="col-6 d_flex jcs">{props.t("Type")}Type:</span><span className="col-6 d_flex jce">{props.data.typeText}</span>
                    </div>
                    <div className="df_jc_ac p_5">
                        <span className="col-6 d_flex jcs">{props.t("Status")}:</span><span className="col-6 d_flex jce">{props.data.status}</span>
                    </div>
                    {props.t("Cancelled") != props.data.status && <div className="df_jc_ac p_5">
                        <span className="col-6 d_flex jcs">{props.t("Players")}:</span><span className="col-6 d_flex jce">{props.data.players}</span>
                    </div>}
                    {props.t("Cancelled") != props.data.status && <div className="df_jc_ac p_5">
                        <span className="col-6 d_flex jcs">{props.t("Prize Pool")}:</span><span className="col-6 d_flex jce">{UM.numberWithCommas(props.data.prize)}</span>
                    </div>}
                </div>
                {
                    // props.t("Cancelled") != props.data.status &&props.data.Tournament_start != undefined&&
                    <div className="fd  Register_button_bottom">
                        <button className="col-4 bdrgold"
                            onClick={singleClickhandle}
                            value={props.data.status1}
                            onDoubleClick={DoubleClickhandle}
                        >{props.t("TOURNEY LOBBY")}</button>
                    </div>

                }
                {
                    ((props.t("Registering") == props.data.status || props.t("Late Registration") == props.data.status) && props.data.Tournament_start != undefined && props.data.id != undefined) &&
                    (
                        props.myTournamentsids.indexOf(props.data.id) == -1

                            ?
                            <div className="fd  Register_button_bottom">
                                <button className="col-4 bdrgold"
                                    onClick={singleClickhandle1}
                                    value={props.data.status1}
                                    onDoubleClick={DoubleClickhandle}
                                >{props.t("REGISTER")}</button>
                            </div> :
                            props.t("Registering") == props.data.status ? <div className="fd  Register_button_bottom">
                                <button className="col-4 bdrgold"
                                    onClick={() => {
                                        // props.network.send("<UnRegisterTournamentPlayer type='BALANCE' tournamentId='22-2f7c7'/>")
                                        props.network.send(`<UnRegisterTournamentPlayer  tournamentId='${props.data.id}'/>`)
                                        // setTimeout(()=>{

                                        //     props.network.send("<GetMyTournaments/>")
                                        // },100)
                                        // alert("hi")
                                    }}

                                >{props.t("UNREGISTER")}</button>
                            </div> : ""

                    )

                }
            </div>
        </>
    );
}
export default withTranslation()(TourneyDetailsPage)