import React, { useMemo, useState } from "react";
// import "../../../../../css/ui/lobby/tableDetails/tableDetails.css";
import Columns from "./tableDetailsColumns";
import { useTable } from "react-table";

// import previewIcon from "../../../../../assets/images/lobby/Preview_icon.png";
import infoIcon from "../../../../../assets/images/lobby/Info_Icon.svg";
import TablePreview from "./tablePreview";
import palyicon from '../../../../../assets/images/lobby/lobbyHeader/cashicon.png';
import Subtract from '../../../../../assets/images/lobby/lobbyHeader/Subtract.png';
// import bannenr from '../../../../../assets/images/lobby/VideoMP4/rightbanner.png';
// import river_top_banner from '../../../../../assets/images/lobby/VideoMP4/river_top_banner.mp4';
// import rv_banner from '../../../../../assets/images/lobby/river-top-banner.jpg';
import { t } from "i18next";
import fileName from "../../../../../jsconfig";
import Config from "../../../../../config";

import UM from "../../../../utils/utilityMethods";

export const TableDetails = (props) => {
  var config = new Config();
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => props.data.data, [props.data.data]);

  const table = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;

  const onClickJoinTable = function () {
    console.log("open table with id: " + props.data.id + " and type: " + props.data.type);
    props.network.send("<OpenTable id='" + props.data.id + "' type='" + props.data.type + "'/>");
    props.setAction("TDpageJoinTable");

  }
  const onClickSeatMe = function () {
    // data.id;
    // data.type;
    props.setAction("TDpageSeatMe");
    // alert('action not defined');
    setTimeout(() => {
      console.log("onClickSeatMe")
      props.network.send("<OpenTable id='" + props.data.id + "' type='" + props.data.type + "'/>");
    }, 5)
  }




  const previewStyle = {
    width: "100%",
    height: "100%",
    // backgroundImage: `url(${previewIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    cursor: "pointer",
  }
  const infoStyle = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${infoIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    cursor: "pointer",
  }
  const [showPreview, setShowPreview] = useState(0);
  const [showIcon, setShowIcon] = useState(infoStyle);

  return (
    <>
      {/* {fileName.name == "Leader_bet" && <img className="col-12 bdrgold" src={bannenr} style={{ padding: "0px", maxHeight: "12vh", position: "absolute", top: "-108px", left: "0px" }} />} */}
      {(fileName.name === "Riverpoker") &&
        <div className="banner-container" style={{ display: (window.innerWidth > 769 && window.innerWidth < 992) ? 'none' : '' }}>
          <div className="df">
            <div className="btn-container">
              <div className="first-two-btns">
                <button type="button" onClick={() => {
                  window.open(config.URL_Environment.proxy.baseUrl + config.URL_Environment.url.gotoLivecasino);
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


      {/* {props.data.name != "No Table Selected" && ( */}
      <div className="fd  p_2">
        <div className="row p_5">
          <div className="col-6 df_jc_ac">
            <button id="btn" className="tableinfo bdrgold1  txt_clr_1 p_5 m_5 rds_15" style={{
              border: "1px solid #383838",
              background: showPreview == 0 ? (props.btn ? "#17181A" : "#1472A1") : "#17181A",
              opacity: props.btn ? '0.5' : '1'
              // background: props.btn ? "#17181A" : "#17181A"
            }} onClick={() => {
              setShowIcon(infoStyle);
              setShowPreview(0);
            }} disabled={props.btn}>{t("MINI TABLE")}</button>
          </div>
          <div className="col-6 df_jc_ac">
            <button className="tableinfo bdrgold1  txt_clr_1 m_5 p_5 rds_15"
              style={{ border: "1px solid #383838", background: showPreview == 1 ? (props.btn ? "#17181A" : "#1472A1") : "#17181A", opacity: props.btn ? '0.5' : '1' }}
              onClick={() => {
                setShowIcon(previewStyle);
                setShowPreview(1);

              }} disabled={props.btn}>{t("TABLE INFO")}</button>
          </div>
        </div>
      </div >
      {/* )} */}
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
            <TablePreview seats={props.data.seats}></TablePreview>
            {/* <div className="tableDetailsTabsContainer">
              <img src={infoIcon} onClick={(e) => {
                e.preventDefault();
                if (showPreview === 0) {
                  setShowIcon(previewStyle);
                  setShowPreview(1);
                } else {
                  setShowIcon(infoStyle);
                  setShowPreview(0);
                }
              }} />
            </div> */}
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
              <img src={infoIcon} onClick={(e) => {
                e.preventDefault();
                if (showPreview === 0) {
                  setShowIcon(previewStyle);
                  setShowPreview(1);
                } else {
                  setShowIcon(infoStyle);
                  setShowPreview(0);
                }
              }} />
            </div>
          </div>
        </div>
        {/* <div className="containerThree fd">
          <label>{props.data.name}</label>
        </div> */}
        <div className="containerTwo fd">
          <div className="row">
            <div className="col-12">
              <button id="btn" style={{ background: props.btn ? "#2A2C38" : "linear-gradient(180deg, #3C5DC2 35%, #2348B9 100%)", display: fileName.name === "Riverpoker" ? 'flex' : '', alignItems: fileName.name === "Riverpoker" ? 'center' : '', justifyContent: fileName.name === "Riverpoker" ? 'center' : '' }} className="bdrgold jointable clr_ff" onClick={onClickJoinTable} disabled={props.btn}><img src={palyicon} style={{ marginBottom: "-3px", marginRight: "7px", opacity: props.btn ? '0.5' : '1' }} /><span>{t("JOIN TABLE")}</span></button>
            </div>

          </div>
        </div>
        <div className="containerTwo fd">
          <div className="row">

            <div className="col-12">
              <button className="bdrgold seatme clr_ff" style={{ background: props.btn2 ? "#2A2C38" : "linear-gradient(180deg, #FCD04E 35%, #C1981E 100%)" }} onClick={onClickSeatMe} disabled={props.btn2}><img src={Subtract} style={{ marginBottom: "-5px", marginRight: "7px" }} /><span>{t("SEAT ME")}</span></button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
