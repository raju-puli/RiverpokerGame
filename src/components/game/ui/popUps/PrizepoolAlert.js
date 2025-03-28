// import { useState, useEffect } from 'react';
import "../../../../css/ui/popUps/addonAlert.css";
import close_1 from '../../../../assets/images/table/close_1.svg';
import { withTranslation } from 'react-i18next';
function PrizePoolAlert(props) {
    // let [time, setTime] = useState(15);

    // useEffect(() => {
    //     let t = time;
    //     let buyChipsTimer = setInterval(() => {
    //         if (t > 0) {
    //             t = t - 1;
    //             setTime(t);
    //             // console.log("time left to buy:"+t);
    //         } else {
    //             clearInterval(buyChipsTimer);
    //             props.setAction("hideManualpoolPrizeAlert");
    //             props.network.send('<ManualSplitPrize accept="false"/>');
    //             // console.log("time out to buy chips");
    //         }
    //     }, 1000);

    // });
    return (
        <>
            {/* <div className="popCover_1" onClick={(e) => { e.preventDefault(); props.setAction("hideManualpoolPrizeAlert"); }} > </div> */}
            <div className="popup_1">
                <div className="popup_1_in">
                    <div className="head"> {props.t("Manual distribution of prizes")}
                        <button className="close_1" onClick={(e) => { e.preventDefault(); props.setAction("hideManualpoolPrizeAlert"); }} > <img src={close_1} alt="" /> </button>
                    </div>
                    <div className="fd text_center p_10">
                        {props.data} <br></br>
                        {/* Do you want to split the prize money ? */}
                        {props.t("Do You Agree to split prize pool on")} {props.manualDistributionType} {props.t("based ?")}
                        
                    </div>
                    {/* <div className="fd p_lr_10 p_tb_10 text_center clr_4 bg_3">
                        Time Left:&nbsp;<span style={{ color: "red" }}>{time}</span>&nbsp;sec
                    </div> */}
                    <div className="fd">
                        <ul className="footUl">
                            <li>
                                <button className="btn_1" onClick={(e) => {
                                    e.preventDefault();
                                    props.network.send('<ManualSplitPrize accept="true"/>');

                                    props.setAction("hideManualpoolPrizeAlert");

                                }}>{props.t("Yes")}</button>
                            </li>
                            <li>
                                <button className="btn_1" onClick={(e) => {
                                    e.preventDefault();
                                    props.network.send('<ManualSplitPrize accept="false"/>');
                                    props.setAction("hideManualpoolPrizeAlert");
                                }}>{props.t("No")}</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default withTranslation()(PrizePoolAlert);