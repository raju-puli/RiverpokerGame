import React from "react";
import "../../../../css/ui/popUps/dpSettings.css";
import closeIcon from '../../../../assets/images/lobby/close_icon.svg';
import close_1 from '../../../../assets/images/table/close_1.svg';
import fileName from "../../../../jsconfig";

import { withTranslation } from 'react-i18next';

function DpSettings(props) {
  return (
    <React.Fragment>
      <div className="popCover_1" onClick={(e) => { e.preventDefault(); props.setAction("hideDp"); }} > </div>
      <div className="popup_1">
        <div className="popup_1_in">
          <div className="head"> {props.t("Disconnection Protection Settings")}
            <button className="close_1" onClick={(e) => { e.preventDefault(); props.setAction("hideDp"); }}> <img src={close_1} alt="" /> </button>
          </div>
          <div className="fd p_10" >
            <div className="fd bg_3 p_10 rds_5 txt_clr_3 lh_20 text_center extra">
              {props.t("You have")} <span className="clr_ff">{props.data.available}</span> {props.t("Disconnect Protect(s) available, you can reset disconnect protect 2 times.")} <span className="clr_ff">{props.data.left}</span> {props.t("times")}. <br />
              <button
                type="button"
                className="btn_1 wid_auto float_right"
                onClick={(e) => {
                  e.preventDefault();
                  props.network.send("<ResetDpSetting/>");
                }}
              >
                {props.t("Reset")}
              </button>
            </div>
          </div>
          {fileName.name !== "Riverpoker" &&
            <hr style={{ marginLeft: "10%", marginRight: "10%" }}></hr>
          }
          <div className="fd p_10" style={{ border: fileName.name === "Riverpoker" ? '1px solid gray' : '', borderBottomLeftRadius: fileName.name === "Riverpoker" ? '6px' : '', borderBottomRightRadius: fileName.name === "Riverpoker" ? '6px' : '' }}>
            <div className="fd bg_3 p_10 rds_5 txt_clr_3 lh_20 text_center extra"> {props.t("Number of Disconnect Protects and number of reset will be automatically set to default values at:")}:
              <br /> <span className="clr_ff">{props.data.date}</span>

            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withTranslation()(DpSettings);
