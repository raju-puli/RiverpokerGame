import React from "react";
import "../../../../css/ui/popUps/checkBoxAlert.css";
import { withTranslation } from 'react-i18next';

function CheckBoxAlert(props) {
  return (
    <React.Fragment>
      <div className="popCover_1" onClick={(e) => {
        e.preventDefault();
        props.actions("No");
      }} > </div>
      <div className="popup_1">
        <div className="popup_1_in">
          <div className="fd clr_ff p_15 text_center font_15">
            <div className="fd">Please Enable Auto Post/Muck For Faster Game Actions,</div>
            <div className="fd">Do You Want To Enable Now?</div>

          </div>
          <div className="fd d_flex p_10" style={{ justifyContent: "space-between" }}>
            <button className="btn_2" onClick={(e) => {
              e.preventDefault();
              props.actions("Yes");
            }}>{props.t("Yes")}</button>
            <button className="btn_2" onClick={(e) => {
              e.preventDefault();
              props.actions("No");
            }}>{props.t("No")}</button>
          </div>
        </div>

      </div>
    </React.Fragment>
  )
}
export default withTranslation()(CheckBoxAlert);