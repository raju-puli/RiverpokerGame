import React, { useState, useEffect } from "react";
import "../../../../../css/ui/table/infoPanel.css";
import DetailedStatistics from "../../popUps/detailedStatistics";
import WaitListTable from "./waitListTable";
import UM from "../../../../utils/utilityMethods";
import { withTranslation } from 'react-i18next';

function InfoPanelMobilePortrait(props) {
    const [toggleState, setToggleState] = useState(1);
    const [showStatsWindow, setShowStatsWindow] = useState(false);
    const [loader, setLoader] = useState(false);
    // const [lasthand, setLastHand] = useState(Number(props.info.CH) - 1);
    const toggleTab = (index) => {
        setToggleState(index);
    };
    // const [chat, setChat] = useState("hi");

    const { chat, doc } = props;

    useEffect(() => {
        let content = document.getElementById("chatContent" + doc);
        if (!content) return;
        // setChat(props.chat);
        if (chat === "ClearChat") {
            while (content.firstChild) {
                content.removeChild(content.firstChild);
            }
        } else {
            let div = document.createElement("div");
            div.innerHTML = `${props.chat}`;
            content.appendChild(div);
        }
        content.scrollTop = content.scrollHeight;
    }, [chat]);

    const closeStatsWindow = () => {
        setShowStatsWindow(false);
    };


    function closeChat() {
        props.action("hideChatBox");
    }

    return (
        <div>
            {showStatsWindow && <DetailedStatistics data={props.stats} action={closeStatsWindow}></DetailedStatistics>}
            <div style={{ display: `${props.show}` }} className="chatBox-container fd">
                <div className="fd">
                    <div className=" fd" id="TIPinfoPanel">
                        <div className="fd top-nav-btns-container">
                            <button className={toggleState === 1 ? "active" : ""} onClick={() => toggleTab(1)}>
                                {props.t("Chat")}
                            </button> |
                            <button className={toggleState === 2 ? "active" : ""} onClick={() => toggleTab(2)}>
                                {props.t("Info")}
                            </button> |
                            <button style={{ display: props.hideStats ? 'none' : 'block' }} className={toggleState === 3 ? "active" : ""} disabled={props.hideStats} onClick={() => toggleTab(3)}>
                                {props.t("Stats")}
                            </button> |
                            <button style={{ display: props.hideStats ? 'none' : 'block' }} className={toggleState === 4 ? "active" : ""} disabled={props.hideStats} onClick={() => toggleTab(4)}>
                                {props.t("Waiting")}
                            </button> |
                            <button className="TIPtabs" onClick={() => closeChat()} style={{ color: 'red', fontWeight: '500' }}>
                                {props.t("Close")}
                            </button>
                        </div>
                        <div className="fd content-section">
                            {toggleState === 1 ?
                                <div className="fd" style={{ height: "100%" }}>
                                    <div className="chat-messages-section" id={"chatContent" + props.doc}></div>
                                    <div className="chat-btns-section">
                                        <input className="" type="text" id={`tipChatMsgInput${props.doc}`} style={{ textIndent: '10px' }}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter') {
                                                    event.preventDefault();  // Prevent default action (e.g., form submission)
                                                    let msg = document.getElementById(`tipChatMsgInput${props.doc}`).value;
                                                    if (msg !== undefined && msg !== "") {
                                                        props.network.send(`<SendChatMessage message="${msg}"/>`);
                                                        // closeChat()
                                                    }
                                                    document.getElementById(`tipChatMsgInput${props.doc}`).value = "";
                                                }
                                            }}
                                        ></input>
                                        <button
                                            type="button"
                                            className="btn_2"
                                            onClick={(e) => {
                                                e.preventDefault();

                                                let msg = document.getElementById(`tipChatMsgInput${props.doc}`).value;
                                                if (msg !== undefined && msg !== "") {
                                                    props.network.send(`<SendChatMessage message="${msg}"/>`);
                                                    closeChat()
                                                }
                                                document.getElementById(`tipChatMsgInput${props.doc}`).value = "";
                                            }}

                                        >
                                            {props.t("Send")}
                                        </button>
                                    </div>
                                </div> :
                                toggleState === 2 ?
                                    <div className="fd p_5">
                                        <table className="fd" border={1} cellPadding="1" cellSpacing="1">
                                            <tbody>
                                                <tr>
                                                    <td> {props.t("Table Name")} </td>
                                                    <td> {props.info.name} </td>
                                                </tr>
                                                <tr>
                                                    <td> {props.t("Game Type")}</td>
                                                    <td> {props.info.type} </td>
                                                </tr>
                                                <tr>
                                                    <td> {props.t("Stakes")}  </td>
                                                    <td>{props.info.stakes}  </td>
                                                </tr>
                                                <tr>
                                                    <td>{props.t("Last Hand")} </td>
                                                    <td> {(Number(props.info.CH) <= 0) ? 0 : UM.numberWithCommas(Number(props.info.CH) - 1)} </td>
                                                </tr>
                                                <tr>
                                                    <td>{props.t("Current Hand")}  </td>
                                                    <td> {UM.numberWithCommas(props.info.CH)} </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div> :
                                    toggleState === 3 ?
                                        <div className="fd p_5">
                                            <table className="fd" border={1} cellPadding="1" cellSpacing="1">
                                                <tbody>
                                                    <tr>
                                                        <td>{props.t("Hands Played")}:</td>
                                                        <td>{props.stats.played}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{props.t("Hands Won")}:</td>
                                                        <td>{props.stats.won}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{props.t("Bets")}:</td>
                                                        <td>{props.stats.bets}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{props.t("Win Bets")}:</td>
                                                        <td>{props.stats.winBets}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="fd m_t_20">
                                                <button className="btn_2 f_right"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setShowStatsWindow(true);
                                                        closeChat();
                                                    }}
                                                >
                                                    {props.t("Full Stats")}
                                                </button>
                                            </div>
                                        </div> :
                                        toggleState === 4 &&
                                        <div className="fd p_5">
                                            <div className="fd">
                                                {props.t("Wait List")}: <span>{props.waitList.list.length}</span>
                                            </div>
                                            <div className="fd">
                                                <WaitListTable data={props.waitList.list}></WaitListTable>
                                            </div>
                                            <div className="fd df m_t_20">
                                                {!(props.btns.disableJoinBtn || props.disableJW) &&
                                                    <button
                                                        // disabled={props.disableJW}
                                                        style={{ backgroundPositionY: (props.btns.disableJoinBtn || props.disableJW || loader) ? "-77px" : "", backgroundSize: "unset" }}
                                                        className="btn_2"
                                                        disabled={props.btns.disableJoinBtn || props.disableJW || loader}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            // console.log("======================Join==waiting==list======================");
                                                            props.network.send("<JoinWaitingList/>");
                                                            setLoader(true)
                                                            setTimeout(() => {
                                                                setLoader(false)
                                                            }, 1000);
                                                        }}
                                                    >
                                                        {props.t("Join Waiting")}
                                                    </button>
                                                }
                                                {!(props.btns.disableRemovBtn || props.disableJW) &&
                                                    <button
                                                        // disabled={props.disableJW}
                                                        style={{ backgroundPositionY: (props.btns.disableRemovBtn || props.disableJW || loader) ? "-77px" : "", backgroundSize: "unset" }}
                                                        className="btn_2"
                                                        disabled={props.disableJW || loader}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            // console.log("======================leave==waiting==list======================");
                                                            props.network.send("<LeaveWaitingList/>");
                                                            setLoader(true)
                                                            setTimeout(() => {
                                                                setLoader(false)
                                                            }, 1000);
                                                        }}
                                                    >
                                                        {props.t("Leave waiting")}
                                                    </button>
                                                }
                                            </div>
                                            <div className="">
                                                {loader && <span className="m_l_5 newLoader"></span>}
                                            </div>
                                        </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default withTranslation()(InfoPanelMobilePortrait);
