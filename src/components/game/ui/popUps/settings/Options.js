import React, { useState } from "react";
import "../../../../../css/ui/popUps/settings/options.css";
import CardThemes from "./CardThemes";
import TableThemes from "./TableThemes";
// import closeIcon from '../../../../../assets/images/lobby/close_icon.svg';
import close_1 from '../../../../../assets/images/table/close_1.svg';
function Options(props) {
  const [activeContent, setActiveContent] = useState(2);
  const[carpetNo,setCarpetNo]=useState("carpet1")
  const[tableNo,setTableNo]=useState("table1")
  let cardThemes = {
    frontCard: "frontCard1",
    backCard: "backCard1",
  };
  let tableThemes = {
    carpet: "carpet1",
    table: "table1",
  };
  function setImages(frontN) {
    cardThemes.frontCard = frontN;
  }
  function setBackFrame(backN) {
    cardThemes.backCard = backN;
  }
  function displayDefaults() {
    document.getElementById("front1").click();
    document.getElementById("back1").click();
    document.getElementById("carpet1").click();
    document.getElementById("table1").click();
  }
  function setCarpet(carpetImg) {
    tableThemes.carpet = carpetImg;
    setCarpetNo(carpetImg)
  }
  function setTable(tableImg) {
    setTableNo(tableImg)
    tableThemes.table = tableImg;
  }
  return (
    <React.Fragment>
      <div className="popCover_1" onClick={(e) => {
      e.preventDefault();
      props.setAction("hideThemes");
    }}></div>
    <div className="options popup_500"> 
      <div className="header_1 fd">Options
      <button className="close_1" onClick={(e) => { e.preventDefault(); props.setAction("hideThemes") }}> <img src={close_1} alt=""/> </button>
      </div>
      <div className="container">
        <div className="tabList">
          {/* <button
            className={activeContent === 1 ? "tabbtnActive" : "tabbtn"}
            onClick={() => {
              setActiveContent(1);
            }}
          >
            Card Themes
          </button> */}
          <button
            className={activeContent === 2 ? "tabbtnActive" : "tabbtn"}
            onClick={() => {
              setActiveContent(2);
            }}
          >
            Table Themes
          </button>
          {/* <button
            className={activeContent === 3 ? "tabbtnActive" : "tabbtn"}
            onClick={() => {
              setActiveContent(3);
            }}
            disabled={true}
          >
            Chat
          </button>
          <button
            className={activeContent === 4 ? "tabbtnActive" : "tabbtn"}
            onClick={() => {
              setActiveContent(4);
            }}
            disabled={true}
          >
            Sounds
          </button> */}
        </div>
        <div className={activeContent === 1 ? "tabContentActive" : "tabContent"}>
          <CardThemes showCard={setImages} showBackframe={setBackFrame} />
        </div>
        <div className={activeContent === 2 ? "tabContentActive" : "tabContent"}>
          <TableThemes carpetChild={setCarpet} tableChild={setTable} />
        </div>
        <div className={activeContent === 3 ? "tabContentActive" : "tabContent"}>tab 3 content here</div>
        <div className={activeContent === 4 ? "tabContentActive" : "tabContent"}>tab 4 content here</div>
      </div>
      <div className="fd p_5"> 
        <button className="btn_1 wid_auto m_l_5 float_right" onClick={() => displayDefaults()}>
          Restore Default
        </button>
        <button
          className="btn_1 wid_auto m_l_5 float_right"
          onClick={() => {
            if (activeContent === 1) {
              props.setThemes("Cards", cardThemes);
              props.setAction("hideThemes");
            }
            if (activeContent === 2) {
              // props.setThemes("Table", tableThemes);
              props.setThemes("Table", {carpetNo,tableNo});
              props.setAction("hideThemes");
            }
          }}
        >
          SET
        </button>
      </div>
    </div>
    </React.Fragment>
  );
}

export default Options;
