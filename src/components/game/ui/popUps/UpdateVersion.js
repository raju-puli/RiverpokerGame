import React from "react";

const UpdateVersion = (props) => {

    return (
        <>
            <div className="popCover_1" onClick={(e) => { e.preventDefault(); }} > </div>
            <div className="popup_1" >
                <div className="popup_1_in">
                    <div className="head">Version Update</div>
                    <div className="fd clr_ff p_15 text_center font_15">
                        {/* <div className="fd"><p>{props.versionControler.currentGameVersion < props.versionControler.currentVersion ? `You need to Update your Version. Click on Ok to download new version and install it manually` : "Do  you want to update your version?"}</p> */}
                        <div className="fd"><p>{props.versionControler.enabled ? `You need to Update your Version. Click on Ok to download new version and install it manually` : "Do  you want to update your version?"}</p>
                            <p>{`\n Current Version : ${props.versionControler.currentGameVersion}`}</p>
                            <p>{`\n Required Version : ${props.versionControler.currentVersion}`}</p>
                            <p>{`\n Minimum Version : ${props.versionControler.criticalVersion}`}</p>
                        </div>

                    </div>
                    <div className="fd">
                        <ul className="footUl">
                            <li>
                                <button className="btn_1" onClick={() => {
                                    props.action("download")
                                }}>{"Ok"}</button>
                            </li>
                            {/* {!props.versionControler.enabled && */}
                            <li> <button className="btn_1" onClick={() => {
                                props.action("close")
                            }}>{"cancel"}</button>
                            </li>
                            {/* } */}
                        </ul>
                    </div>
                </div>
            </div>
        </>)
}

export default UpdateVersion