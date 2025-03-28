import "../../../../css/ui/popUps/privateTableAlert.css";
// import closeIcon from '../../../../assets/images/lobby/close_icon.svg';
// import close_1 from './../../../../assets/images/table/close_1.svg';

export default function PrivateTableAlert(props) {
    return (
        <>
            {/* <div className="popCover_1" onClick={(e)=>{
                    e.preventDefault();
                    props.setAction("hidePvtAlert");
                }}> </div> */}
            <div className="popup_1">
                <div className="popup_1_in">
                    <div className="head">Private Table
                        {/* <button className="close_1" onClick={(e) => {
                            e.preventDefault();
                            props.setAction("hidePvtAlert");
                        }}> <img src={close_1} alt="" /> </button> */}
                    </div>
                    <div className="dataAlert fd">
                        <div className="fd p_15 text_center">Please Enter The Password To Continue</div>
                        <div className="fd inpElm p_lr_10 df">
                            <input id="pvtTableKey" className="passKeyField"></input>
                            <button
                                type="submit"
                                className="btn_1 wid_auto rds_0"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // props.setAction("hideAlert");
                                    let pw = document.getElementById("pvtTableKey").value;
                                    props.network.send(`<JoinTable password='${pw}'/>`);
                                    props.setAction("hidePvtAlert");

                                }}>Join</button>
                        </div>

                        <div className="fd p_10 clr_f01">{props.data}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
