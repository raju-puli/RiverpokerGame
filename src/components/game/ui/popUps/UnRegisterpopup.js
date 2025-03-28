
import { React} from "react";

import { withTranslation } from 'react-i18next';
function UnRegisterpopUP(props) {
  

  return (
    <>
    <div className="popCover_1"  style={{top:"62px"}} onClick={(e) => {
                e.preventDefault();
                props.setAction("Unregisterpopup");
            }} > </div>
            <div className="popup_1" >
                    <div className="popup_1_in">
                        <div className="head"> {props.t("Alert")}</div>
                        <div className="fd clr_ff p_15 text_center font_15">
                            <div className="fd">{props.t(props.regAlert)}</div>
                        </div>
                        <div className="fd">
                            <ul className="footUl">
                                <li>
                                    <button className="btn_1" onClick={() => 
                                        {
                                            props.setAction("Unregisterpopup");
                                            props.network.send("<GetMyTournaments/>")
                                        }}>{props.t("Ok")}</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
 
    </>
  )
}
export default withTranslation()(UnRegisterpopUP);
