import { useState, useEffect } from "react";
import "../../../../css/ui/popUps/tourneyRegistration.css";
import { withTranslation } from 'react-i18next';

import UM from "../../../utils/utilityMethods";

function TourneyRegistration(props) {
    const [actionBtn, setActionBtn] = useState("Register");
    const [actionBtnOne, setActionBtnOne] = useState("Cancel");
    const [selectedType, setSelectedType] = useState(undefined)
    const [alert, setAlert] = useState();
    const [errorcolor, setErrorcolor] = useState()
    const [enablebtn, setEnablebtn] = useState(true)
    const onClickButtons = (e) => {
        if (selectedType !== undefined) {
            setAlert('');
            if (e === "Register") {
                props.network.send(`<RegisterTournamentPlayer type='${selectedType}' tournamentId='${props.data.id}' />`)
            }
            if (e === "Unregister") {
                props.network.send("<UnRegisterTournamentPlayer type='BALANCE' tournamentId='22-2f7c7'/>")
            }
            setSelectedType(undefined);
        } else {
            setAlert("Ooops! Please Choose one type")
        }
    };
    const onSelectType = (name, amnt, status) => {
        setAlert('');
        if (status) {
            setSelectedType(name);
            setEnablebtn(false)
        } else {
            setEnablebtn(true)
            setSelectedType(undefined)
        }
        let d = document.getElementsByClassName("makeListAlign");
        let i = 0, cnt = d.length;
        for (i; i < cnt; i++) {
            if (d[i].childNodes[0].childNodes[0].name !== name) {
                d[i].childNodes[0].childNodes[0].checked = false;
            } else {
                d[i].childNodes[0].childNodes[0].checked = true;

            }
        }
    }

    useEffect(() => {
        console.log(props.data);
    }, [])

    useEffect(() => {
        if (props.error === "You Are Succesfully registered👍") {
            setErrorcolor("clr_f00")
            setActionBtn("Unregister")
            var clearTime = setTimeout(() => {
                setAlert('');
                props.close("REG");
            }, 3000);
        } else {
            setErrorcolor("clr_f01")
            setActionBtn("Register")
        }
        setAlert(props.error)
        return () => clearTimeout(clearTime)
    }, [props.error])

    useEffect(() => {
        if (props.data.status === "Unregistered") {
            setActionBtn("Register")
            setActionBtnOne("Cancel")
        }
        else if (props.data.status === "Unregistered") {
            setActionBtn("Register")
            setActionBtnOne("Cancel")
        } else {

            setActionBtnOne("Close")
        }
    }, [props.data.status])

    const RegTypes = () => {
        let i = 0,
            cnt = props.data.types.length,
            types = [];
        return (
            <>
                <div className="row">
                    <div className="col-6 df_jc_as font_14 clr_ff">{props.t("Your balance")}:</div>
                    <div className="col-6 df_jc_ac font_14 clr_ff">{props.t("Buy In")}:</div>
                </div>

                {(() => {
                    for (i; i < cnt; i++) {
                        types.push(
                            <div className="row" key={i} >
                                <div key={i} className="fd df tr-item">
                                    <div className="makeListAlign">
                                        <div className="col-4 df_jc_as">
                                            {" "}
                                            {props.t(props.data.types[i].type)}{" "}
                                        </div>
                                        <div className="col-4">
                                            <label disabled={!props.data.types[i].enable} htmlFor={props.data.types[i].type}>{props.data.types[i].amount}</label>
                                        </div>
                                        {/* <div className="checkBox">
                                            <input
                                                type="checkbox"
                                                id={props.data.types[i].type}
                                                data-name={props.data.types[i].text}
                                                data-value={props.data.types[i].amount}
                                                disabled={!props.data.types[i].enable}
                                                checked={selectedType == props.data.types[i].text ? true : false}
                                                onChange={(event) => {
                                                    onSelectType(event.target.dataset.name, event.target.dataset.value, event.target.checked);
                                                }}
                                            ></input>
                                        </div> */}

                                        <div className="checkBox">
                                            <input
                                                type="checkbox"
                                                id={props.data.types[i].type}
                                                data-name={props.data.types[i].text}
                                                data-value={props.data.types[i].amount}
                                                disabled={!props.data.types[i].enable}
                                                checked={selectedType === props.data.types[i].text}
                                                onChange={(event) => {
                                                    onSelectType(event.target.dataset.name, event.target.dataset.value, event.target.checked);
                                                }}
                                            />
                                        </div>


                                        <div className="col-3 df_jc_as">
                                            <label disabled={!props.data.types[i].enable} htmlFor={props.data.types[i].type}>{props.data.types[i].buyAmount}</label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return types;
                })()}
            </>
        );
    };

    return (
        <div className="game_type_filter_cover" >
            <div className="game_type_filter" style={{ width: '480px', border: '1px solid #696965' }}>
                <header>
                    <span>
                        Tournament Registartion
                    </span>
                </header>
                <section className="fd p_b_10" style={{ maxHeight: 'unset' }}>
                    <table className="table_1" cellPadding="0" cellSpacing="0">
                        <tbody>
                            <tr>
                                <td>{props.t("Registration Status")}:</td>
                                <td>
                                    <span style={{ color: "#dbdbdb", marginLeft: "9px" }}>{props.t(props.data.status)}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>{props.t("Name")}:</td>
                                <td>
                                    <span style={{ color: "#dbdbdb", marginLeft: "9px" }}>{props.data.tableName}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>{props.t("Type")}:</td>
                                <td>
                                    <span style={{ color: "#dbdbdb", marginLeft: "9px" }}>{UM.textFormat(props.data.tableType)}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>{props.t("Current Balance")}:</td>
                                <td>
                                    <span style={{ color: "#dbdbdb", marginLeft: "9px" }}>{UM.numberWithCommas(props.data.balance)}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="fd clr_4 m_t_15">
                        <RegTypes></RegTypes>
                        <div className="fd text_center" style={{ fontSize: '12pxF' }}><div className={errorcolor}>{props.t(alert)}</div></div>
                    </div>
                </section>
                <div className="close_div" style={{ padding: "0px 20px" }}>

                    <button className="btn_2" style={{ width: actionBtn === "Register" ? '50%' : '70%' }}
                        onClick={(e) => {
                            e.preventDefault();
                            setAlert('');
                            props.close("REG");
                            props.network.send("<GetMyTournaments/>")
                        }}
                    >
                        {actionBtnOne}
                    </button>
                    <button className="btn_2 fd" disabled={enablebtn} style={{ width: actionBtn === "Register" ? '50%' : '70%' }}
                        onClick={(e) => { e.preventDefault(); onClickButtons(actionBtn); }}  >
                        {props.t(actionBtn)}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default withTranslation()(TourneyRegistration)