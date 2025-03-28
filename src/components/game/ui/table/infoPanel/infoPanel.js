import { useState, useEffect } from "react";
import "../../../../../css/ui/table/infoPanel.css";
import icon_chat_close from '../../../../../assets/images/table/HeadIcons/icon_chat_close.png';
import icon_chat_send from '../../../../../assets/images/table/HeadIcons/icon_chat_send.png';

import { withTranslation } from 'react-i18next';
// import { getShowChatBalloon, getShowDealerMessage, getShowPlayerChat } from "../../../../utils/global";

function InfoPanel(props) {
    const [chatHidden, setChatHidden] = useState(false);
    // const [showPlayerChat, setShowPlayerChat] = useState(getShowPlayerChat());
    // const [showDealerChat, setShowDealerChat] = useState(getShowDealerMessage());
    // const [showChat, setShowChat] = useState(getShowChatBalloon());
    const [chatMessages, setChatMessages] = useState([]);

    const checkConditions = (array) => {
        if (!array || array.length === 0) return false;

        const sitInExists = array.some(item => item.name === "SitIn");
        if (sitInExists) return false;

        const hasRunItOnce = array.some(item => item.name === "Run It Once");
        const hasRunItTwice = array.some(item => item.name === "Run It Twice");

        return !(hasRunItOnce && hasRunItTwice);
    };
    const isChatHidden = checkConditions(props.options);

    useEffect(() => {
        if (props.chat === "ClearChat") {
            setChatMessages([]);
        } else if (props.chat) {
            setChatMessages((prevMessages) => [
                { text: props.chat, id: Date.now() },
                ...prevMessages,
            ]);
        }
    }, [props.chat]);

    // useEffect(() => {
    //     const updateChatSettings = () => {
    //         setShowChat(getShowChatBalloon());
    //         setShowPlayerChat(getShowPlayerChat());
    //         setShowDealerChat(getShowDealerMessage());
    //     };
    //     updateChatSettings();
    // }, []);

    const closeChat = () => {
        props.action("hideTIP");
    };

    const toggleChat = () => {
        setChatHidden((prev) => !prev);
        props.resizeScreen(!chatHidden);
    };

    return (
        <div style={{ visibility: isChatHidden ? "hidden" : "visible" }}>
            <div
                className={chatHidden ? "chatShow" : "chatHide"}
                onClick={() => {
                    if (!chatHidden) toggleChat();
                }}
            >
                <div className="TIPinputContainer">
                    <div className="row"
                        style={{
                            display: chatHidden ? "flex" : "none",
                            background: "linear-gradient(rgb(96 94 97), rgb(55 55 55))",
                        }}
                    >
                        <div className="col-2" onClick={toggleChat}>
                            <img src={icon_chat_close} alt="Close Chat" />
                        </div>
                        <input
                            className="TIPchatInput col-8"
                            type="text"
                            id={`tipChatMsgInput${props.doc}`}
                            style={{ textIndent: "10px" }}
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
                        />
                        <div
                            className="col-2 TIPbtnSend"
                            onClick={(e) => {
                                e.preventDefault();
                                const inputField = document.getElementById(`tipChatMsgInput${props.doc}`);
                                const msg = inputField?.value.trim();
                                if (msg) {
                                    props.network.send(`<SendChatMessage message="${msg}"/>`);
                                    closeChat();
                                    inputField.value = "";
                                }
                            }}

                        >
                            <img src={icon_chat_send} alt="Send" />
                        </div>
                    </div>
                </div>
                <div className={`chatContainer ${!chatHidden ? "chatMinimize" : "chatMaximize"}`} id={`chatContent${props.doc}`}>
                    {chatMessages.map((msg) => (
                        <div
                            key={msg.id}
                            style={{
                                fontSize: "12px",
                                alignItems: "center",
                                margin: "5px",
                            }}
                            dangerouslySetInnerHTML={{ __html: msg.text }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default withTranslation()(InfoPanel);
