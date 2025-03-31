// import river_logo from "../../../../assets/images/logo/river_logo.png";
import river_logo from "../../../../assets/images/logo/river_logo.svg";
import button_back from "../../../../assets/images/lobby_icons/menu/profile/button_back.png";
import menu from "../../../../assets/images/lobby_icons/menu.svg";
import React, { useEffect, useState } from "react";

import icon_profile from "../../../../assets/images/lobby_icons/menu/icon_profile.png";
import icon_logout from "../../../../assets/images/lobby_icons/menu/icon_logout.png";
import icon_exit from "../../../../assets/images/lobby_icons/menu/icon_exit.png";
import icon_lobby from "../../../../assets/images/lobby_icons/menu/profile/icon_lobby.png";
import eventBus from "../../../utils/eventEmitter";
import UM from "../../../utils/utilityMethods";
// import BBJ_Icon from "../../../../assets/images/lobby_icons/table_type/icon_grid_table_type_bbj.png";
import defaultAvtar from "../../../../assets/images/lobby_icons/profile/icon_avatar.png";
import star_off from "./../../../../assets/images/lobby/star_off.png";
import star from "./../../../../assets/images/lobby/star.png";
import Config from "../../../../config";
import profile_icon from "../../../../assets/images/lobby_icons/Lobby-Header-Icons/Profile.png";
import tableicon_icon from "../../../../assets/images/lobby_icons/Lobby-Header-Icons/tableicon.png";
// import cup_icon from "../../../../assets/images/lobby_icons/Lobby-Header-Icons/cup.png";
import tournoicon_icon from "../../../../assets/images/lobby_icons/Lobby-Header-Icons/tournoicon.png";
import sit_goicon_icon from "../../../../assets/images/lobby_icons/Lobby-Header-Icons/sit&goicon.png";
import refreshicon from '../../../../assets/images/lobby/lobbyHeader/refresh_icon.png';
import refreshGif from '../../../../assets/images/lobby/lobbyHeader/refresh_animate.gif';
// import eye from "../../../../assets/images/lobby/eye.svg";
import eye from "../../../../assets/images/lobby/eye.svg";

import "../../../../css/media_queries/allpagesMedia.css";

const style = {
    lobby_header_tab: {
        display: 'flex',
        height: '75px',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: "0px 10px"
    },
    river_img: {
        width: '15vw',
        minWidth: '100px'
    },
    menu_img: {
        height: '35px'
    },
    left_menu: {
        display: 'flex',
        alignItems: 'center',
    }
}

const LobbyHeader = (props) => {
    var date = new Date();
    var config = new Config();
    const storeData = JSON.parse(sessionStorage.getItem("DeviceOrientation"));
    // const [lobbyIcons, setLobbyIcons] = useState((storeData.device === "mobile" && storeData.Orientation === "landscape") ? true : false);
    const [lobbyIcons, setLobbyIcons] = useState(window.innerWidth < 700 ? true : false);

    const { openMenu } = props;
    useEffect(() => {
        const handleHideEvent = () => {
            // props.openMenu("show_profile_table")
            openMenu("show_profile_table")
        };

        const handleResize = () => {
            if (storeData) {
                // if (storeData.device === "mobile" && storeData.Orientation === "landscape") {
                if (window.innerWidth < 880) {
                    setLobbyIcons(true);
                } else {
                    setLobbyIcons(false);
                }
            }

        };

        window.addEventListener("resize", handleResize)
        eventBus.on('ProfileShow', handleHideEvent);
        return () => {
            eventBus.off('ProfileShow', handleHideEvent);
        };
    }, [openMenu]);

    useEffect(() => {
        const handleHideEvent = () => {
            getAvatar();
        };
        eventBus.on('update_avatar', handleHideEvent);
        return () => {
            eventBus.off('update_avatar', handleHideEvent);
        };
    }, []);

    const [mode, setMode] = useState("Cash_Games");

    useEffect(() => {
        setMode(props.showTables === "" ? "Cash_Games" : props.showTables);
    }, [props.showTables]);

    const [options, setOptionns] = useState(false)


    const menuOptions = (name, action) => {
        switch (name) {
            case "menu":
                setOptionns(true);
                // if (props.showTourneyLobby) {
                //     props.openMenu("Tourny_lobby_menu_activated", true)
                // }
                break;
            case "profile":
                props.openMenu("show_profile");
                break;
            case "logout":
                props.openMenu("logout_player");
                setOptionns(false);
                break;
            case "exit":
                props.openMenu("exit_player");
                setOptionns(false);
                break;
            case "close_menu":
                setOptionns(false);
                // if (props.showTourneyLobby) {
                //     props.openMenu("Tourny_lobby_menu_activated", false)
                // }
                break;
            case "lobby":
                props.openMenu("show_lobby");
                break;
            default:
                console.log(name);
                break;
        }
    }
    useEffect(() => {
        let hour = document.getElementById("hour");
        let min = document.getElementById("min");
        let sec = document.getElementById("sec");

        function displayTime() {
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            let hRotate = 30 * h + m / 2;
            let mRotate = 6 * m;
            let sRotate = 6 * s;
            if (hour) {
                hour.style.transform = `rotate(${hRotate}deg)`;
            };
            if (min) {
                min.style.transform = `rotate(${mRotate}deg)`;
            }
            if (sec) {
                sec.style.transform = `rotate(${sRotate}deg)`;
            }
        }

        setInterval(displayTime, 1000)
    }, [!props.showTourneyLobby])

    useEffect(() => {
        const backgrounds = [
            "linear-gradient(to bottom right, #009245, #FCEE21)",
            "linear-gradient(to bottom right, #FDABDD, #a2bbcf)",
            "linear-gradient(to bottom right, #adadad, #FEE715)",
            "linear-gradient(to bottom right,rgb(250, 0, 29), #FCF6F5)",
            "linear-gradient(to bottom right, #8AAAE5, #FFFFFF)",
            "linear-gradient(to bottom right, #86afff, #CADCFC)",
            "linear-gradient(to bottom right, #89ABE3, #EA738D)",
            "linear-gradient(to bottom right, #CC313D, #F7C5CC)",
            "linear-gradient(to bottom right, #a1e3a2, #97BC62)",
            "linear-gradient(to bottom right, #A1BE95, #F98866)",
            "linear-gradient(to bottom right, #b89afb, #D3C5E5)",
            "linear-gradient(to bottom right, #F98866, #FFF2D7)",
            "linear-gradient(to bottom right, #C4DFE6, #66A5AD)",
            "linear-gradient(to bottom right, #e66465, #babbc7)",
            "linear-gradient(to bottom right, #00933c, #EDF4F2)",
            "linear-gradient(to bottom right, #F52549, #FA6775)",
            "linear-gradient(to bottom right, #e58a76, #F1D3B2)"
        ];

        const profileElement = document.querySelector(".profileName");
        console.log(`profileBackground_${props.user}`)
        // if (props.user) {
        const storedBackground = localStorage.getItem(`profileBackground_${props.user}`);
        if (profileElement) {
            if (storedBackground) {
                profileElement.style.backgroundImage = storedBackground;
            } else {
                const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
                profileElement.style.backgroundImage = randomBackground;
                localStorage.setItem(`profileBackground_${props.user}`, randomBackground);
            }
        }
        // }
        // }, [props.user]);
    }, [props.user, !props.showTourneyLobby]);



    const [levelZero, setLevelZero] = useState(false);
    const [levelOne, setLevelOne] = useState(false);
    const [levelTwo, setLevelTwo] = useState(false);
    const [levelThree, setLevelThree] = useState(false);
    const [levelFour, setLevelFour] = useState(false);
    useEffect(() => {
        const levelMap = {
            "Iron": [false, true, true, true, true],
            "Bronze": [false, false, true, true, true],
            "Silver": [false, false, false, true, true],
            "Gold": [false, false, false, false, true],
            "Platinum": [false, false, false, false, false]
        };

        const [zero, one, two, three, four] = levelMap[props.myLevel] || [false, false, false, false, false];

        setLevelZero(zero);
        setLevelOne(one);
        setLevelTwo(two);
        setLevelThree(three);
        setLevelFour(four);
    }, [props.myLevel]);


    useEffect(() => {
        getAvatar();
    }, []);

    const [myAvatar, setMyAvatar] = useState(defaultAvtar);
    const getAvatar = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", config.URL_Environment.proxy.baseUrl + config.URL_Environment.apiPath.getAvtr_Api, true);
        xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.setRequestHeader("siteid", config.URL_Environment.sitIds.sitid);
        if (sessionStorage.getItem(`${window.location.hostname}'_wSid'`) !== null) {
            xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid);
        } else if (sessionStorage.getItem(`${window.location.hostname}'_sid'`) !== null) {
            xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_sid'`)).sid);
        }
        xhr.addEventListener("load", (e) => {
            avtrDataHandler(e);
        });
        xhr.send();
    }
    const avtrDataHandler = (data) => {
        let response = JSON.parse(data.target.response);
        const myAvatr = `data:image/jpeg;base64,${response.imageData}`;
        setMyAvatar(myAvatr);
    }
    const [activeRefresh, setActiveRefresh] = useState(false);
    const RefreshHandle = () => {
        setActiveRefresh(true);
        setTimeout(() => {
            setActiveRefresh(false);
            window.location.reload();
        }, 800)
    };

    const [moneyShow, setMoneyShow] = useState(true);
    const handleClick = () => {
        setMoneyShow(!moneyShow);
    }

    const digitCount = (money) => {
        let count = (UM.changeAmtLabel(money)).toString().split("").length;
        return ("* ").repeat(count)
    }

    // const [showAvatarList, setShowAvatarList] = useState(false);
    // const getAvatarList = () => {
    //     setShowAvatarList(true);

    //     var path = config.URL_Environment.proxy.baseUrl + config.URL_Environment.apiPath.getAvatarList_Api;
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("GET", path, true);
    //     xhr.setRequestHeader("Content-Type", "application/json");
    //     xhr.setRequestHeader("siteid", config.URL_Environment.sitIds.sitid);
    //     try {
    //         if (`${window.location.hostname}'_wSid'` !== null) {
    //             xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid);
    //         } else if (sessionStorage.getItem(`${window.location.hostname}'_sid'`) !== null) {
    //             xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_sid'`)).sid);
    //         }
    //     } catch (e) { console.log(e) }
    //     xhr.addEventListener("load", (e) => {
    //         avatarDataHandlerList(e);
    //     });
    //     xhr.send();
    // }

    // useEffect(() => {
    //     let getBody = document.getElementsByClassName('river_cover')[0];
    //     if (getBody && showAvatarList) {
    //         getBody.style.overflow = 'unset';
    //     } else {
    //         getBody.style.overflow = 'auto';
    //     }
    //     setAvatarSetMessage("");
    //     setPerviewImage(myAvatar);
    // }, [showAvatarList])

    // const [avatarList, setAvatarList] = useState([]);
    // const avatarDataHandlerList = (data) => {
    //     const parsedResponse = JSON.parse(data.target.response);
    //     const list = Array.isArray(parsedResponse) ? parsedResponse : [parsedResponse];
    //     setAvatarList(list);
    // };

    // const [selectAvtar, setSelectAvatar] = useState("");
    // const [avatarLoader, setAvatarLoader] = useState(false);
    // const [previewImage, setPerviewImage] = useState(myAvatar);
    // const [avatarSetMessage, setAvatarSetMessage] = useState("");

    // const setSelectAvatarMethod = (id) => {
    //     setSelectAvatar(id)
    //     setAvatarSetMessage("");
    //     avatarList.find((avatarId) => avatarId.id === id && setPerviewImage(`data:image/jpeg;base64,${avatarId.imageData}`));
    // };


    // const setAvatar = () => {
    //     setAvatarLoader(true);
    //     setAvatarSetMessage("");
    //     let setAvatarApi = `${config.URL_Environment.proxy.baseUrl}${config.URL_Environment.apiPath.setAvatar_Api}`;
    //     var body = { "avatar_id": selectAvtar };
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("POST", setAvatarApi, true);
    //     xhr.setRequestHeader("Content-Type", "text/plain");
    //     xhr.setRequestHeader("SiteId", config.URL_Environment.sitIds.sitid);
    //     xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid);
    //     xhr.addEventListener("load", (e) => {
    //         setavtarHandler(e);
    //     });
    //     xhr.addEventListener("error", (error) => {
    //         setAvatarSetMessage("Avatar set failed. Technical error.");
    //         setAvatarLoader(false);
    //     })
    //     if (body) {
    //         xhr.send(JSON.stringify(body));
    //     } else {
    //         xhr.send();
    //     }
    // }

    // const setavtarHandler = (data) => {
    //     let resp = JSON.parse(data.target.response);
    //     setAvatarLoader(false);
    //     if (resp.code === 200) {
    //         setAvatarSetMessage(resp.status);
    //         setTimeout(() => {
    //             getAvatar();
    //             // setShowAvatarList(false);
    //         }, 100);
    //     } else {
    //         setAvatarSetMessage("Avatar set faild");
    //     }
    // }

    const compPointsItem = props?.getPlayerInfo?.Balance.find(type => type.attr.wallet === "COMPPOINTS");
    const balanceItems = props?.getPlayerInfo?.Balance.filter(type => type.attr.wallet === "USD" || type.attr.wallet === "CHP");

    // const [visibleTooltips, setVisibleTooltips] = useState({});
    // const handleMouseEnter = (key) => {
    //     setVisibleTooltips((prev) => ({ ...prev, [key]: true }));
    // };

    // const handleMouseLeave = (key) => {
    //     setVisibleTooltips((prev) => ({ ...prev, [key]: false }));
    // };

    return (
        <>
            {/* <nav style={style.lobby_header_tab}> */}
            {!props.showTourneyLobby && !props.openTL &&
                <div className="fd desktop_dashboard_container">
                    <div className="desktop_dashboard fd">
                        <div className="dashboard_table_details df fd">
                            <div className="container">
                                <div className="clock">
                                    <div className="hand" id="hour" style={{ "--clr": "#17dc0d", "--h": "8px" }} >
                                        <i></i>
                                    </div>
                                    <div className="hand" id="min" style={{ "--clr": "#ddcb04", "--h": "12px" }} >
                                        <i></i>
                                    </div>
                                    <div className="hand" id="sec" style={{ "--clr": "#ffffff", "--h": "12px" }} >
                                        <i></i>
                                    </div>

                                    <span style={{ "--i": 1 }}>
                                        <b>1</b>
                                    </span>
                                    <span style={{ "--i": 2 }}>
                                        <b>2</b>
                                    </span>
                                    <span style={{ "--i": 3 }}>
                                        <b>3</b>
                                    </span>
                                    <span style={{ "--i": 4 }}>
                                        <b>4</b>
                                    </span>
                                    <span style={{ "--i": 5 }}>
                                        <b>5</b>
                                    </span>
                                    <span style={{ "--i": 6 }}>
                                        <b>6</b>
                                    </span>
                                    <span style={{ "--i": 7 }}>
                                        <b>7</b>
                                    </span>
                                    <span style={{ "--i": 8 }}>
                                        <b>8</b>
                                    </span>
                                    <span style={{ "--i": 9 }}>
                                        <b>9</b>
                                    </span>
                                    <span style={{ "--i": 10 }}>
                                        <b>10</b>
                                    </span>
                                    <span style={{ "--i": 11 }}>
                                        <b>11</b>
                                    </span>
                                    <span style={{ "--i": 12 }}>
                                        <b>12</b>
                                    </span>
                                </div>
                            </div>
                            <div className="time_display m_r_10 top_time_dashboard">
                                <b className="clr_river white_space_no">{Math.trunc(date.getHours()).toString().padStart(2, '0')} : {Math.trunc(date.getMinutes()).toString().padStart(2, '0')}</b>
                            </div>
                            <div className="top_time_dashboard m_r_10" style={{ marginTop: '-3px' }}>
                                <b>|</b>
                            </div>

                            <div className="time_display m_r_10 top_time_dashboard white_space_no" style={{ marginTop: '-3px' }}>
                                <>
                                    <b className="m_r_10 font_15 m_b_15"> <span className="tableNameHeading">{props.data.TotalPlayerCount}</span> - <span className="font_14"> Players Online </span>
                                        <i className="pulse green"></i>
                                    </b>
                                    <b className="m_r_10">|</b>
                                    {mode === "Tournaments" ?
                                        <>
                                            <b className="m_r_10 font_15 m_b_15"><span className="tableNameHeading"> {props.data.PlayersOnTournaments} </span> - <span className="font_14"> Players on Tournaments </span></b>
                                            <b className="m_r_10">|</b>
                                            <b className="m_r_10 font_15 m_b_15"><span className="tableNameHeading"> {props.data.ActiveTournamentCount} </span> -<span className="font_14"> Active Tournaments </span></b>
                                        </> :
                                        mode === "Sit_Go" ?
                                            <>
                                                <b className="m_r_10 font_15 m_b_15"><span className="tableNameHeading"> {props.data.PlayersOnSitandgo} </span> -<span className="font_14"> Players on Sit&Go's </span></b>
                                                <b className="m_r_10">|</b>
                                                <b className="m_r_10 font_15 m_b_15"><span className="tableNameHeading"> {props.data.ActiveSitandgoCount} </span> -<span className="font_14"> Active Sit&Go's </span></b>
                                            </> :
                                            mode === "Cash_Games" &&
                                            <>
                                                <b className="m_r_10 font_15 m_b_15"> <span className="tableNameHeading"> {props.data.PlayersOnTables} </span> -<span className="font_14"> Players on Tables</span> </b>
                                                <b className="m_r_10">|</b>
                                                <b className="m_r_10 font_15 m_b_15"><span className="tableNameHeading"> {props.data.ActiveTableCount} </span> -<span className="font_14"> Active Tables </span></b>
                                            </>
                                    }
                                </>
                            </div>
                        </div>

                        <div className="dashboard_player_details df">
                            <div className="fd df_jc_ae">
                                {compPointsItem && (
                                    <>
                                        <div className="profile_sections m_r_10" key="compPoints">
                                            <span className="top_time_dashboard df_al " >
                                                <span className="white_space_no m_r_5 font_12"> VIP Points : </span> <b className="">{UM.numberWithCommas(compPointsItem.attr.total)}</b></span>
                                        </div>
                                        <b className="m_r_10">|</b>
                                    </>
                                )}
                                {/* <p className="df_al m_r_10 m_l_10"> <b className="white_space_no">Logged as :</b> <span className="m_5 bold font_16 profileName">{" "}{props.user}</span></p> */}
                                <p className="df_al m_r_10 m_l_10">
                                    <b className="white_space_no font_12">Logged as :</b>
                                    <span className="m_5 bold font_16 profileName"> {props.user} </span>
                                </p>
                                <div className="dashboard_profile_img m_r_20">
                                    <div className="dashboard_userlevel">
                                        <div className="dashboard_stars">
                                            {[levelZero, levelOne, levelTwo, levelThree, levelFour].map((level, index) => (
                                                <div key={index}>
                                                    <img src={!level ? star : star_off} alt={`Level ${index}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* <img className="m_l_10 m_t_15 m_r_10 profile_image" style={{ borderRadius: '50%' }} src={myAvatar} alt="" /> */}
                                    <div className="m_l_10 m_t_15 m_r_10">
                                        <img className="profile_image" style={{ borderRadius: '50%' }} src={myAvatar} alt="" />
                                        <button className="avtar_change_btn button-33  hoverEff" type="button" onClick={() => props.openMenu("show_changeAvatar_popup")}><b>Change</b></button>
                                        {/* <button class="avtar_change_btn button-13" role="button">
                                            <span class="text">CHANGE</span>
                                            <span class="button-13-background"></span>
                                            <span class="button-13-border"></span>
                                            <svg width="0" height="0">
                                                <filter id="remove-black-button-13" color-interpolation-filters="sRGB">
                                                    <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 -1 -1 -1 0 1"
                                                        result="black-pixels"></feColorMatrix>
                                                    <feComposite in="SourceGraphic" in2="black-pixels" operator="out"></feComposite>
                                                </filter>
                                            </svg>
                                        </button> */}
                                    </div>
                                </div>
                                <div className="userMenu pointer mousehover">
                                    <img className="winow-refresh-button" onClick={() => {
                                        RefreshHandle()
                                    }} src={activeRefresh ? refreshGif : refreshicon} alt="" title="Window Reload" />
                                </div>
                                {/* <button type="button" className="m_l_5 active chenge_avatar_btn" onClick={() => props.openMenu("show_changeAvatar_popup")}>Change Avatar</button> */}
                            </div>
                        </div>
                    </div>
                </div >
            }
            <nav className="header_menu">
                {/* <div>
                    {!props.showTourneyLobby && !props.openTL ?
                        <img style={style.river_img} src={river_logo} alt="not found" /> :
                        <img className="pointer" style={style.river_img} src={button_back} alt="not found" onClick={() => menuOptions("lobby")} />
                    }
                </div> */}
                <nav className="header_menu">
                    <div className="returnLogo">
                        {!props.showTourneyLobby && !props.openTL ?

                            <img className="pointer logo" style={{ position: 'unset' }} src={river_logo} alt="not found" />
                            // <img style={style.river_img} src={river_logo} alt="not found" /> :
                            :
                            <img className="pointer tourneyLobby_logo" src={button_back} alt="not found" onClick={() => menuOptions("lobby")} />
                        }
                    </div>
                    {/* <div className="returnLogo">
                        <img className="logo" style={{ position: 'unset' }} src={logo} alt="logo not found" />
                    </div>
                    <div className="left_menu">
                        <p className="df_al"> Logged as: <span className="clr_river m_5 bold font_16">{" "}{props.user}</span> <img className="m_l_10 m_r_10" style={{ height: "50px", borderRadius: '5px', cursor: 'pointer', border: '1px solid gray' }} onClick={() => getAvatarList()} src={myAvatar} alt="" /></p>
                        <div className="m_l_10 pointer">
                            <img className="menu" src={menu} alt="menu" onClick={() => menuOptions("menu")} />
                        </div>
                    </div> */}
                </nav>
                <div style={style.left_menu} >

                    {/* <div className="badbitJackpot_div">
                        <img src={BBJ_Icon} alt="" /> <span>{UM.changeAmtLabel(props.bbj)}</span>
                    </div> */}

                    {/* {!props.showTourneyLobby &&
                        <div className="news_div">
                            <b>News :</b>
                            <marquee>
                                {props.newsdata.map((data, index) => (
                                    <span key={index}>
                                        <small> <i>{data.title} :</i> </small> <span>{data.content}{", "} </span>
                                    </span>
                                ))}
                            </marquee>
                        </div>
                    } */}

                    {!props.showTourneyLobby && (
                        <div className="news_div">
                            <b>News :</b>
                            <div className="marquee">
                                <div className="news-marquee">
                                    {props.newsdata.map((data, index) => (
                                        <span key={index}>
                                            <small><i>{data.title} :</i></small>
                                            <span>{data.content}{", "}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}


                    {!props.showTourneyLobby && !props.openTL ?
                        <>
                            {window.innerWidth <= 1200 ?
                                <>
                                    <b className="m_r_5 font_15 m_b_15"> <span className="clr_river m_r_2">{props.data.TotalPlayerCount}</span> {lobbyIcons ? <img src={profile_icon} width="20px" alt="" /> : "- Players Online"} <i className="pulse green"></i></b>
                                    {mode === "Tournaments" ?
                                        <>
                                            <b className="m_r_5 font_15 m_b_15"><span className="clr_river m_r_2"> {props.data.PlayersOnTournaments} </span>{lobbyIcons ? <img src={profile_icon} width="20px" alt="" /> : "- Players on Tournaments"}</b>
                                            <b className="m_r_5 font_15 m_b_15"><span className="clr_river m_r_2"> {props.data.ActiveTournamentCount} </span>{lobbyIcons ? <img src={tournoicon_icon} width="20px" alt="" /> : "- Active Tournaments"}</b>
                                        </> :
                                        mode === "Sit_Go" ?
                                            <>
                                                <b className="m_r_5 font_15 m_b_15"><span className="clr_river m_r_2"> {props.data.PlayersOnSitandgo} </span>{lobbyIcons ? <img src={profile_icon} width="20px" alt="" /> : "- Players on Sit&Go's"}</b>
                                                <b className="m_r_5 font_15 m_b_15"><span className="clr_river m_r_2"> {props.data.ActiveSitandgoCount} </span>{lobbyIcons ? <img src={sit_goicon_icon} width="20px" alt="" /> : "- Active Sit&Go's"}</b>
                                            </> :
                                            mode === "Cash_Games" &&
                                            <>
                                                <b className="m_r_5 font_15 m_b_15"> <span className="clr_river m_r_5"> {props.data.PlayersOnTables} </span>{lobbyIcons ? <img src={profile_icon} width="20px" alt="" /> : "- Players on Tables"}</b>
                                                <b className="m_r_5 font_15 m_b_15"><span className="clr_river m_r_5"> {props.data.ActiveTableCount} </span>{lobbyIcons ? <img src={tableicon_icon} width="20px" alt="" /> : "- Active Tables"}</b>
                                            </>
                                    }
                                </> :
                                <div className="df m_r_100 m_b_20 fd eyehover">
                                    <div className="eyeToggleDiv" onClick={() => { handleClick() }}>
                                        <img src={eye} id="eyes" className={moneyShow ? "eyeToggleHide" : "eyeToggleShow"} alt="Not Found" />
                                    </div>
                                    {balanceItems?.map((type, index) => (
                                        <div className="profile_sections_lobby addScreen tooltip-container"
                                            key={index}
                                        // onMouseEnter={() => handleMouseEnter(index)}
                                        // onMouseLeave={() => handleMouseLeave(index)}
                                        >
                                            <span>{type.attr.wallet} <b className="clr_river">{type.attr.wallet === "USD" ? "$ " : ""}{moneyShow ? <span title={UM.numberWithCommas(type.attr.cash)}> {digitCount(type.attr.cash)}</span> : UM.changeAmtLabel(type.attr.cash)}</b></span>
                                            {/* {visibleTooltips[index] && <div className="tooltip-text">{Number(type.attr.cash).toFixed(2)}</div>} */}

                                            {/* <span>{type.attr.wallet} <b className="clr_river">{type.attr.wallet === "USD" ? "$ " : ""}{UM.changeAmtLabel(type.attr.cash)}</b> T.Money: <b className="clr_river">{UM.changeAmtLabel(type.attr["tournament-money"])}</b></span>
                                            <span>Avl. : {UM.changeAmtLabel(type.attr.cash)} In Play: {UM.changeAmtLabel(type.attr["cash-in-play"])}  Bonus: {UM.changeAmtLabel(type.attr["bonus-in-play"])}</span> */}
                                        </div>
                                    ))}

                                    {/* {balanceItems?.map((type, index) => (
                                        <div className="profile_sections_lobby addScreen" key={index}
                                        
                                        >
                                            <span>{type.attr.wallet} <b className="clr_river">{type.attr.wallet === "USD" ? "$ " : ""}{moneyShow ? digitCount(type.attr.cash) : UM.changeAmtLabel(type.attr.cash)}</b></span>
                                            </div>
                                    ))} */}
                                </div>
                            }
                        </> :
                        <span className="clr_river font_16 m_r_10">Buy-In: {props.playerBuyIn}</span>
                    }
                    <div className={`m_l_5 lobby-menu-icon pointer ${options ? "Menu_Avtive" : ""}`} style={{ zIndex: '999' }}>
                        <img style={style.menu_img} src={menu} alt="menu" onClick={() => menuOptions("menu")} title="Menu" />
                    </div>
                </div>
            </nav>
            {
                options &&
                <div className="show_menu_popup" onClick={() => menuOptions("close_menu")}>
                    <div className="sub_menu" >
                        {props.showTourneyLobby &&
                            <div className="options" onClick={() => menuOptions("lobby")}>
                                <img src={icon_lobby} alt=" " />
                                <label className="text">Lobby</label>
                            </div>
                        }
                        {window.innerWidth <= 1200 ?
                            <div className="options" onClick={() => menuOptions("profile")}>
                                <img src={defaultAvtar} alt=" " style={{ height: '40px' }} />
                                <label className="text">Profile</label>
                            </div> :
                            <div className="options" onClick={() => menuOptions("profile",)}>
                                <img src={icon_profile} alt=" " />
                                <label className="text">Settings</label>
                            </div>
                        }
                        <div className="options" onClick={() => menuOptions('logout')}>
                            <img src={icon_logout} alt=" " />
                            <label className="text">Logout</label>
                        </div>
                        <div className="options" onClick={() => menuOptions('exit')}>
                            <img src={icon_exit} alt=" " />
                            <label className="text">Exit</label>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default LobbyHeader;