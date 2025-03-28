// import { useState } from "react";
// import chatpic from "../../../../assets/images/table/chatpic.png";
import chatpic from "../../../../assets/images/table/message.svg";
// import LB_chatpic from "../../../../assets/images/table/lb-chatmessages.png";
import fileName from "../../../../jsconfig";
import Screen from "../../../utils/screen";

export default function Chat(props) {

    // const [showTIP, setShowTIP] = useState(true);
    // const [showTIPname, setShowTIPname] = useState("Hide Info Panel");

    return <div >
        <div className={(fileName.name === "Leader_bet" && Screen.getDeviceType().name === "Mobile") ? "chatPicLB" : "chatPic"} onClick={(e) => {
            // if (showTIP) {
            // setShowTIPname("Hide Info Panel");
            // setShowTIP(false);
            props.action("showChatBox");
            // } else {
            //     props.action("hideChatBox");
            //     // setShowTIPname("Show Info Panel");
            //     setShowTIP(true);
            // }
        }}> <img style={{ padding: fileName.name === "Leader_bet" ? '8px' : "" }} src={chatpic} alt="" />  </div>
    </div>
}