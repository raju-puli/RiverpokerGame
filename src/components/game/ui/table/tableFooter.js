import { useState } from "react";
import "../../../../css/ui/table/tableFooter.css";

export default function TableFooter(props){

    const [showTIP, setShowTIP] = useState(true);
    const [showTIPname, setShowTIPname] = useState("Hide Info Panel");
    const [showCB, setShowCB] = useState(true);
    const [showCBname, setShowCBname] = useState("Show Options");
    const [showMenu, setShowMenu] = useState(true);

//   function  componentDidMount() {
//         document.getElementById("button").click()
//       }


    return(
        <div className="gameTableFooter">
            <div className="leftButtons">
            <button id="button" onClick={(e)=>{
                if(showTIP){
                    setShowTIPname("Hide Info Panel");
                    setShowTIP(false);
                    props.action("showTIP");
                }else{
                    props.action("hideTIP");
                    setShowTIPname("Show Info Panel");
                    setShowTIP(true);
                }
                }}>{showTIPname}</button>
            {/* <button disabled ={!props.optionsBtnState} onClick={(e)=>{
                e.preventDefault();
                if(showCB){
                    setShowCBname("Hide Options");
                    setShowCB(false);
                    props.action("showCheckBox");
                }else{
                    props.action("hideCheckBox");
                    setShowCBname("Show Options");
                    setShowCB(true);
                }
                }}>{showCBname}</button> */}
            </div>
            <div className="rightButtons">
            <div className = "ganeTableMenu" onClick={(e)=>{
                if(showMenu){
                    props.action("showMenu");
                }else{
                    props.action("hideMenu");
                }
                setShowMenu(!showMenu);
            }}></div>
            </div>
        </div>
    )
} 