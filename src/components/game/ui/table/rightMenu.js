import { useEffect } from "react";
import icon_game_settings from "../../../../assets/images/table/HeadIcons/icon_game_settings.png";
import dollar from "../../../../assets/images/table/rupeeicon.png";
import menubar from "../../../../assets/images/table/HeadIcons/menubar.svg";
import "../../../../css/media_queries/allpagesMedia.css";
export const RightMenu = (props) => {
    useEffect(() => {
        // if(window.innerWidth>=330&&window.innerWidth<=764){props.SelectDevice("mobile")} else if(window.innerWidth>=768&&window.innerWidth<=1024){props.SelectDevice("tablet")}else{props.SelectDevice("desktop")}
    }, [])
    // function aspect_ratio(val, lim) {

    //     var lower = [0, 1];
    //     var upper = [1, 0];

    //     while (true) {
    //         var mediant = [lower[0] + upper[0], lower[1] + upper[1]];

    //         if (val * mediant[1] > mediant[0]) {
    //             if (lim < mediant[1]) {
    //                 return upper;
    //             }
    //             lower = mediant;
    //         } else if (val * mediant[1] == mediant[0]) {
    //             if (lim >= mediant[1]) {
    //                 return mediant;
    //             }
    //             if (lower[1] < upper[1]) {
    //                 return lower;
    //             }
    //             return upper;
    //         } else {
    //             if (lim < mediant[1]) {
    //                 return lower;
    //             }
    //             upper = mediant;
    //         }
    //     }
    // }
    window.onresize = (e) => {
        // console.log(e.target.innerWidth)
        // console.log(e.target.innerHeight)
        if (e.target.innerWidth >= 330 && e.target.innerWidth <= 764) { props.SelectDevice("mobile") } else if (e.target.innerWidth >= 768 && e.target.innerWidth <= 1024) { props.SelectDevice("tablet") } else { props.SelectDevice("desktop") }
        // console.log(aspect_ratio(e.target.innerWidth / e.target.innerHeight, 50))
    }


    return (
        <>
            {/* <div onClick={(e) => { e.preventDefault(); props.network.send("<ReBuy/>") }} style={{ visibility: props.TableType === "TOURNAMENT_TABLE" ? "hidden" : "visible" }}>
                <img style={{ width: '30px', height: '35px', marginTop: '2px' }} src={dollar} alt="" />
            </div> */}
         

            <div >
             
                <div className="df_al_js-center pointer" onClick={(e) => {
                    e.preventDefault();
                    if (props.TableType === "TOURNAMENT_TABLE") {
                        props.action("showRebuyTournament");
                        props.network.send("<GetTournamentPlayerInfo/>")
                    } else {
                        props.network.send("<ReBuy/>");
                    }
                }} >
                    <img className="rebuy_table_icon" src={dollar} alt="" />
                </div>

                {/* <div className="df_al_js-center pointer" onClick={(e) => { e.preventDefault(); props.action("showTableInfoStats"); }}> */}
                {window.innerWidth > 563 &&
                    <>
                        {props.tableOriantationLandscape &&
                            <div className="df_al_js-center pointer" onClick={(e) => { e.preventDefault(); props.action("showTIP"); }}>
                                {" "}
                                <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="45px" fill="#eaeaea">
                                    <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                                </svg>
                            </div>
                        }

                        <div className="df_al_js-center pointer" onClick={(e) => { e.preventDefault(); props.action("showCheckBox"); }}>
                            {" "}
                            <img style={{ height: "50px", width: "50px", marginTop: '4px' }} src={icon_game_settings} alt="" />{" "}
                        </div>
                    </>
                }
                <div className="pointer" onClick={(e) => { e.preventDefault(); props.setAction("LeftMenu", props.tableId ? props.tableId : null) }}>
                    <img style={{ height: "35px", width: "45px" }} src={menubar} alt="" />
                </div>

                {window.innerWidth > 563 &&
                    <button disabled={props.leaveTablebtn} style={{ cursor: props.leaveTablebtn === true ? 'no-drop' : 'pointer' }}
                        className="closeTbl" onClick={(e) => {
                            e.preventDefault();
                            props.setAction("openExitTableAlert");
                            //  props.network.send("<LeaveTable/>");
                            //  props.setAction("hideExitAlert")
                        }}>
                        X
                    </button>
                }

            </div>
        </>
    );
};
