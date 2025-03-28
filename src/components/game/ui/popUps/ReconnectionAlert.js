import React from "react";
import "../../../../css/ui/popUps/alert.css";
// import close_1 from '../../../../assets/images/table/close_1.svg';
import { withTranslation } from 'react-i18next'
// import fileName from "../../../../jsconfig";
// import recoonect from '../../../../assets/images/popUp/reconnect.svg'
function ReconnectionAlert(props) {
  return (
    <React.Fragment>
      <div className="popCover_1"
      //   onClick={(e) => { e.preventDefault(); props.setAction("hideAlert"); }}
      > </div>
      <div className="popup_1" style={{ maxWidth: "350px" }}>
        <div className="popup_1_in">
          <div className="head" style={{ borderBottom: "1px solid red" }}>
            <span className="settingsSpan">
              <div className="sprite" style={{ backgroundPositionY: "-83px" }}></div> {props.t("Connecting...")}</span>

          </div>

          <div className="fd clr_ff p_15 text_center font_15">
            <div className="centercontainer">
              <div className="progress-container">
                <div className="progress"></div>
                <div className="inner-circle"></div>
                <div className="percentage"></div>
              </div>
            </div>
            <div className="fd">{props.data.lineOne}</div>
            <div className="fd">{props.data.lineTwo}</div>
          </div>
        </div>

      </div>


    </React.Fragment>
  );
}
export default withTranslation()(ReconnectionAlert)
