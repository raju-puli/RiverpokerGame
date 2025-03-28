import React from "react";
import "../../../../css/ui/popUps/alert.css";
import { withTranslation } from 'react-i18next';
import icon_dialog_level from "../../../../assets/images/lobby_icons/active_table/icon_dialog_level.png";

function Alert(props) {
  return (
    <React.Fragment>
      <div className="game_type_filter_cover" onClick={(e) => { e.preventDefault(); props.setAction("hideAlert"); }}>
        <div className="game_type_filter" style={{ width: '480px', border: '1px solid #696965' }}>
          <header style={{ borderBottom: '1px solid #b95959' }}>
            <span>
              <img src={icon_dialog_level} alt="" /> Alert
            </span>
          </header>
          <section className="fd" style={{ display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div className="text_center font_15">{props.data.lineOne}</div>
            <div className="text_center font_15">{props.data.lineTwo}</div>
          </section>
          <div className="close_div" style={{ justifyContent: 'space-around' }}>
            {props.data.lineOne === "You have an active session in another location" ?
              // <button type="button" className="close_btn" onClick={(e) => { e.preventDefault(); props.setAction("logout_yes") }}> OK</button>
              <button type="button" className="btn_2" onClick={(e) => { e.preventDefault(); props.setAction("logout_yes") }}> OK</button>
              :
              <>
                {props.data.lineOne !== "Seat is occupied" &&
                  <button style={{ display: props.data.lineTwo === 'Want to logout...!' || props.data.lineTwo === "Want to exit...!" ? 'block' : 'none' }} type="button" className="btn_2" onClick={(e) => { e.preventDefault(); props.setAction(`${props.data.lineTwo === 'Want to logout...!' ? "logout_yes" : props.data.lineTwo === "Want to exit...!" ? "exit_yes" : ""}`) }}> Yes </button>
                }
                <button type="button" className="btn_2" onClick={(e) => { e.preventDefault(); props.setAction("hideAlert"); }}> {`${props.data.lineTwo === 'Want to logout...!' || props.data.lineTwo === "Want to exit...!" ? "No" : "Ok"}`} </button>
              </>
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default withTranslation()(Alert);
