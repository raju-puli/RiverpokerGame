import { useState, useEffect } from "react";
import "../../../../../css/ui/table/infoPanel.css";
import DetailedStatistics from "../../popUps/detailedStatistics";
import WaitListTable from "./waitListTable";
import UM from "../../../../utils/utilityMethods";
import { withTranslation } from 'react-i18next';

function InfoPanelMobile(props) {
    const [toggleState, setToggleState] = useState(2);
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
        props.action("hideTIP");
    }

    return (
        <div>
            {showStatsWindow && <DetailedStatistics data={props.stats} action={closeStatsWindow}></DetailedStatistics>}
            <div className="chatPanelContainer">
                <div className="fd">
                    <div className="TIPinfoPanel fd" id="TIPinfoPanel">
                        <div className="fd ">
                            <div className="TIPbloc-tabs fd df">
                                {/* <button className={toggleState === 1 ? "TIPtabs TIPactive-tabs" : "TIPtabs"} onClick={() => toggleTab(1)}>
                                    {props.t("Chat")}
                                </button> */}
                                <button className={toggleState === 2 ? "TIPtabs TIPactive-tabs" : "TIPtabs"} onClick={() => toggleTab(2)}>
                                    {props.t("INFO")}
                                </button>
                                <button style={{ display: props.hideStats ? 'none' : 'block' }} className={toggleState === 3 ? "TIPtabs TIPactive-tabs" : "TIPtabs"} disabled={props.hideStats} onClick={() => toggleTab(3)}>
                                    {props.t("STATS")}
                                </button>
                                {/* <button style={{ display: props.hideStats ? 'none' : 'block' }} className={toggleState === 4 ? "TIPtabs TIPactive-tabs" : "TIPtabs"} disabled={props.hideStats} onClick={() => toggleTab(4)}>
                                    {props.t("Waiting")}
                                </button> */}
                                {/* <button className="TIPtabs" onClick={() => closeChat()} style={{ color: 'red', fontWeight: '500' }}>
                                    {props.t("Close")}
                                </button> */}
                            </div>
                        </div>
                        <div className="fd">
                            <div className={toggleState === 1 ? "TIPcontent  TIPactive-content fd" : "TIPcontent fd"}>
                                <div className="chatPanel">
                                    <div className="chatContainer" id={"chatContent" + props.doc}></div>
                                    <div className="TIPinputContainer">
                                        {/* <input className="TIPchatInput" type="text" id={`tipChatMsgInput${props.doc}`} style={{ textIndent: '10px' }}
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
                                        /> */}
                                        <input
                                            className="TIPchatInput"
                                            type="text"
                                            id={`tipChatMsgInput${props.doc}`}
                                            style={{ textIndent: '10px' }}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter') {
                                                    event.preventDefault();
                                                    const msg = event.target.value;
                                                    if (msg && msg.trim() !== "") {
                                                        props.network.send(`<SendChatMessage message="${msg}"/>`);
                                                    }
                                                    event.target.value = "";
                                                }
                                            }}
                                        />

                                        <button
                                            type="button"
                                            className="TIPbtnSend"
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
                                </div>
                            </div>

                            <div className={toggleState === 2 ? "TIPcontent  TIPactive-content fd" : "TIPcontent fd"}>
                                <div className="infoBg fd p_10">
                                    <table className="table_3" cellPadding="0" cellSpacing="0">
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
                                </div>
                            </div>

                            <div className={toggleState === 3 ? "TIPcontent  TIPactive-content fd" : "TIPcontent fd"}>
                                <div className="statsBg p_lr_10 fd p_t_15">
                                    <table className="table_3" cellPadding="0" cellSpacing="0">
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
                                    <div className="fd m_t_15">
                                        <button className="btn_2 f_right"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowStatsWindow(true);
                                                // closeChat();
                                            }}
                                        >
                                            {props.t("Full Stats")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={toggleState === 4 ? "TIPcontent  TIPactive-content fd" : "TIPcontent fd"}>
                                <div className="TIPwaitListBg">
                                    <div className="fd p_tb_5">
                                        {props.t("Wait List")}: <span>{props.waitList.list.length}</span>
                                    </div>
                                    <div className="waitListTableContainer fd">
                                        <WaitListTable data={props.waitList.list}></WaitListTable>
                                    </div>
                                    <div className="TIPwaitListHeader clr_ff fd p_lr_10">

                                        <div className="fd df infoBtns p_tb_5" style={{ width: '30%', float: 'right', zIndex: '9' }}>
                                            <button
                                                // disabled={props.disableJW}
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
                                            <button
                                                // disabled={props.disableJW}
                                                disabled={props.btns.disableRemovBtn || props.disableJW || loader}
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
                                        </div>
                                    </div>
                                </div>
                                <div className="waitingPlayerLoader">
                                    {loader && <span className="m_l_5 newLoader"></span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default withTranslation()(InfoPanelMobile);
