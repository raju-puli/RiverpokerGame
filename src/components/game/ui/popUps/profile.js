
import React, { useEffect, useState } from "react";
import star from "./../../../../assets/images/lobby/star.png";
import star_off from "./../../../../assets/images/lobby/star_off.png";
import { withTranslation } from 'react-i18next';

import logo from "../../../../assets/images/lobby_icons/menu/profile/button_back.png";
import menu from "../../../../assets/images/lobby_icons/menu.svg";
import icon_lobby from "../../../../assets/images/lobby_icons/menu/profile/icon_lobby.png";
import icon_back from "../../../../assets/images/lobby_icons/menu/profile/icon_calculator_back.png";
import icon_logout from "../../../../assets/images/lobby_icons/menu/icon_logout.png";
import icon_exit from "../../../../assets/images/lobby_icons/menu/icon_exit.png";
import * as settings from "../../../utils/global";
import "../../../../css/ui/lobby/userLabel.css";
import "../../../../css/media_queries/allpagesMedia.css";
import Config from "../../../../config";
import defaultAvtar from "../../../../assets/images/lobby_icons/profile/icon_avatar.png";

import UM from "../../../utils/utilityMethods";

export const Profile = (props) => {
    // const [levepercetage, setLevepercetage] = useState(null)
    var config = new Config();
    const [levelZero, setLevelZero] = useState(false);
    const [levelOne, setLevelOne] = useState(false);
    const [levelTwo, setLevelTwo] = useState(false);
    const [levelThree, setLevelThree] = useState(false);
    const [levelFour, setLevelFour] = useState(false);


    const [stateSettings, setStateSettings] = useState({
        fourColouredCards: settings.getFourColouredCards(),
        volumeMute: settings.getMuteValue(),
        showPlayerChat: settings.getShowPlayerChat(),
        showChatBalloon: settings.getShowChatBalloon(),
        showOpenSeat: settings.getOpenSeat(),
        showHandStrength: settings.getHandStrength(),
        showAvatars: settings.getShowAvatars(),
        useRaiseTo: settings.getUseRaiseTo(),
        showDealerMessage: settings.getShowDealerMessage(),
        showAutoPostBlind: settings.getAutoPostBlind(),
        autoMuckCards: settings.getAutoMuckCards(),
        waitBigBlind: settings.getWaitBigBlind()
    })

    const [performance, setPerformance] = useState({
        smoothAnimation: settings.getSmoothAnimation(),
        dealerCardAnimation: settings.getDealerCardAnimation(),
        playerCardAnimation: settings.getPlayerCardAnimation(),
        chipAnimation: settings.getChipAnimation(),
        tournamentIcon: settings.getTournamentIcon()
    })

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

    // useEffect(() => {
    //     for (let i = 0; i < props.data.data.length - 1; i++) {
    //         if (props.data.level === "Iron") {
    //             // setLevepercetage(props.balance.VIPpoints / (props.data.data[0].earn))

    //         } else if (props.data.data[i].level == props.t(props.data.level)) {
    //             // setLevepercetage(props.balance.VIPpoints / (props.data.data[i + 1].earn - props.data.data[i].earn))
    //         }
    //     }
    // }, [props.data.data.length !== 0]);
    useEffect(() => {
        if (stateSettings.volumeMute !== settings.getMuteValue())
            setStateSettings({ ...stateSettings, volumeMute: settings.getMuteValue() })
        if (stateSettings.autoMuckCards !== settings.getAutoMuckCards())
            setStateSettings({ ...stateSettings, autoMuckCards: settings.getAutoMuckCards() })
        if (stateSettings.showAutoPostBlind !== settings.getAutoPostBlind())
            setStateSettings({ ...stateSettings, showAutoPostBlind: settings.getAutoPostBlind() })
        if (stateSettings.waitBigBlind !== settings.getWaitBigBlind())
            setStateSettings({ ...stateSettings, waitBigBlind: settings.getWaitBigBlind() })
    });

    const UserLevel = () => {
        return (
            <div className="userlevel">
                <div className="stars">
                    <div className="singleStar0" >
                        <img src={!levelZero ? star : star_off} alt="" />
                    </div>
                    <div className="singleStar0" >
                        <img src={!levelOne ? star : star_off} alt="" />
                    </div>
                    <div className="singleStar1" >
                        <img src={!levelTwo ? star : star_off} alt="" />
                    </div>
                    <div className="singleStar2">
                        <img src={!levelThree ? star : star_off} alt="" />
                    </div>
                    <div className="singleStar3" >
                        <img src={!levelFour ? star : star_off} alt="" />
                    </div>
                </div>
            </div>
        );
    }

    const [version, setVersion] = useState("");
    const [buildDate, setBuildDate] = useState("");

    useEffect(() => {
        getAvatar();
        console.log(props)
        // const manifestUrl = `${process.env.PUBLIC_URL}/manifest.json`;
        const manifestUrl = `${config.URL_Environment.proxy.baseUrl}/pokerh5v4/manifest.json`;
        console.log(manifestUrl);
        fetch(manifestUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch manifest.json");
                }
                return response.json();
            })
            .then(data => {
                if (data && data.buildTime) {
                    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    const [year, month, day] = data.buildTime.split(" ")[0].split("-");
                    const [hours, minutes] = data.buildTime.split(" ")[1].split(":");
                    const formattedMonth = monthNames[parseInt(month, 10) - 1];
                    setVersion(`${year}.${month}.${day}`);
                    setBuildDate(`${formattedMonth} ${day} ${year} ${hours}:${minutes}`);
                }
            })
            .catch(error => {
                console.error("Error fetching manifest.json:", error);
            });

    }, [])
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


    const [showAvatarList, setShowAvatarList] = useState(false);
    const getAvatarList = () => {
        setShowAvatarList(true);

        var path = config.URL_Environment.proxy.baseUrl + config.URL_Environment.apiPath.getAvatarList_Api;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", path, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("siteid", config.URL_Environment.sitIds.sitid);
        try {
            if (`${window.location.hostname}'_wSid'` !== null) {
                xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid);
            } else if (sessionStorage.getItem(`${window.location.hostname}'_sid'`) !== null) {
                xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_sid'`)).sid);
            }
        } catch (e) { console.log(e) }
        xhr.addEventListener("load", (e) => {
            avatarDataHandlerList(e);
        });
        xhr.send();
    }

    useEffect(() => {
        let getBody = document.getElementsByClassName('river_cover')[0];
        if (getBody && showAvatarList) {
            getBody.style.overflow = 'unset';
        } else {
            getBody.style.overflow = 'auto';
        }
        setAvatarSetMessage("");
        setPerviewImage(myAvatar);
    }, [showAvatarList])

    const [avatarList, setAvatarList] = useState([]);
    const avatarDataHandlerList = (data) => {
        const parsedResponse = JSON.parse(data.target.response);
        const list = Array.isArray(parsedResponse) ? parsedResponse : [parsedResponse];
        setAvatarList(list);
    };

    const [selectAvtar, setSelectAvatar] = useState("");
    const [avatarLoader, setAvatarLoader] = useState(false);
    const [previewImage, setPerviewImage] = useState(myAvatar);
    const [avatarSetMessage, setAvatarSetMessage] = useState("");

    const setSelectAvatarMethod = (id) => {
        setSelectAvatar(id)
        setAvatarSetMessage("");
        avatarList.find((avatarId) => avatarId.id === id && setPerviewImage(`data:image/jpeg;base64,${avatarId.imageData}`));
    };


    const setAvatar = () => {
        setAvatarLoader(true);
        setAvatarSetMessage("");
        let setAvatarApi = `${config.URL_Environment.proxy.baseUrl}${config.URL_Environment.apiPath.setAvatar_Api}`;
        var body = { "avatar_id": selectAvtar };
        var xhr = new XMLHttpRequest();
        xhr.open("POST", setAvatarApi, true);
        xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.setRequestHeader("SiteId", config.URL_Environment.sitIds.sitid);
        xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid);
        xhr.addEventListener("load", (e) => {
            setavtarHandler(e);
        });
        xhr.addEventListener("error", (error) => {
            setAvatarSetMessage("Avatar set failed. Technical error.");
            setAvatarLoader(false);
        })
        if (body) {
            xhr.send(JSON.stringify(body));
        } else {
            xhr.send();
        }
    }

    const setavtarHandler = (data) => {
        let resp = JSON.parse(data.target.response);
        setAvatarLoader(false);
        if (resp.code === 200) {
            setAvatarSetMessage(resp.status);
            setTimeout(() => {
                getAvatar();
                // setShowAvatarList(false);
            }, 100);
        } else {
            setAvatarSetMessage("Avatar set faild");
        }
    }

    // const setAvatar = (e) => {
    //     e.preventDefault();
    //     setAvatarLoader(true);
    //     let setAvatarApi = `${config.URL_Environment.proxy.baseUrl}${config.URL_Environment.apiPath.setAvatar_Api}`;
    //     fetch(setAvatarApi, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //             siteid: config.URL_Environment.sitIds.sitid
    //         },
    //         body: JSON.stringify({ "avatar_id": selectAvtar })
    //     }).then((resp) => resp.json())
    //         .then(res => {
    //             setAvatarLoader(false);
    //             console.log(res)
    //         })
    //         .catch((err) => {
    //             setAvatarLoader(false);
    //             console.error(err)
    //         }
    //         )
    // }

    useEffect(() => {
        const backgrounds = [
            "linear-gradient(to bottom right, #009245, #FCEE21)",
            "linear-gradient(to bottom right, #FDABDD, #a2bbcf)",
            "linear-gradient(to bottom right, #adadad, #FEE715)",
            "linear-gradient(to bottom right, #990011, #FCF6F5)",
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

        const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        const profileElement = document.querySelector(".profileName_1");

        if (profileElement) {
            profileElement.style.backgroundImage = randomBackground;
        }
    }, []);


    const [options, setOptionns] = useState(false)
    const menuOptions = (name) => {
        switch (name) {
            case "gotolobby":
                props.setAction("lobby_show");
                break;
            case "gototable":
                props.setAction("Close_table");
                // props.setAction("lobby_show");
                if (!props.openLobby_Table) {
                    props.showCashTables(null, props.gotoMyTable);
                }
                break;
            case "menu":
                setOptionns(true)
                break;
            case "logout":
                props.setAction("lobby_show");
                setTimeout(() => {
                    props.setAction("logOut_exit", "logout_player");
                    setOptionns(false);
                }, 100);
                break;
            case "exit":
                props.setAction("lobby_show");
                setTimeout(() => {
                    props.setAction("logOut_exit", "exit_player");
                    setOptionns(false);
                }, 100);
                break;
            case "close_menu":
                setOptionns(false);
                break;
            default:
                console.log(name);
                break;
        }
    }

    const settingOptions = (event) => {
        switch (event.target.id) {
            case "showAvatars":
                settings.setShowAvatars(event.target.checked)
                setStateSettings({ ...stateSettings, showAvatars: event.target.checked });
                break;
            case "useRaiseTo":
                settings.setUseRaiseTo(event.target.checked)
                setStateSettings({ ...stateSettings, useRaiseTo: event.target.checked });
                break;
            case "volumeMute":
                settings.setMuteValue(event.target.checked)
                setStateSettings({ ...stateSettings, volumeMute: event.target.checked });
                break;
            case "playerChatBalloon":
                setStateSettings({ ...stateSettings, showChatBalloon: event.target.checked });
                settings.setShowChatBalloon(event.target.checked)
                break;
            case "showPlayerChat":
                setStateSettings({ ...stateSettings, showPlayerChat: event.target.checked });
                settings.setShowPlayerChat(event.target.checked)
                break;
            case "showOpenSeat":
                settings.setOpenSeat(event.target.checked)
                setStateSettings({ ...stateSettings, showOpenSeat: event.target.checked });
                break;
            case "showHandStrength":
                settings.setHandStrength(event.target.checked)
                setStateSettings({ ...stateSettings, showHandStrength: event.target.checked });
                break;
            case "showDealerMessage":
                settings.setShowDealerMessage(event.target.checked)
                setStateSettings({ ...stateSettings, showDealerMessage: event.target.checked });
                break;
            case "autoPostBlind":
                settings.setAutoPostBlind(event.target.checked)
                setStateSettings({ ...stateSettings, autoPostBlind: event.target.checked });
                break;
            case "autoMuckCards":
                settings.setAutoMuckCards(event.target.checked)
                setStateSettings({ ...stateSettings, autoMuckCards: event.target.checked });
                break;
            case "waitBigBlind":
                settings.setWaitBigBlind(event.target.checked)
                setStateSettings({ ...stateSettings, waitBigBlind: event.target.checked });
                break;
            case "fourColouredCards":
                if (event.target.checked) {
                    props.setThemes({ "frontCard": "frontCard1", "backCard": "default" });
                }
                else {
                    props.setThemes({ "frontCard": "default", "backCard": "default" });
                }
                settings.setFourColouredCards(event.target.checked)
                setStateSettings({ ...stateSettings, fourColouredCards: event.target.checked });
                break;
            default:
                console.log(event.target.id);
                break;
        }
    }
    const performanceSettings = (event) => {
        switch (event.target.id) {
            case "smoothAnimation":
                settings.setSmoothAnimation(event.target.checked)
                setPerformance({ ...performance, smoothAnimation: event.target.checked });
                break;
            case "dealerCardAnimation":
                settings.setDealerCardAnimation(event.target.checked)
                setPerformance({ ...performance, dealerCardAnimation: event.target.checked });
                break;
            case "playerCardAnimation":
                settings.setPlayerCardAnimation(event.target.checked)
                setPerformance({ ...performance, playerCardAnimation: event.target.checked });
                break;
            case "chipAnimation":
                settings.setChipAnimation(event.target.checked)
                setPerformance({ ...performance, chipAnimation: event.target.checked });
                break;
            case "tournamentIcon":
                settings.setTournamentIcon(event.target.checked)
                setPerformance({ ...performance, tournamentIcon: event.target.checked });
                break;
            default:
                console.log(event.target.id);
                break;
        }
    }
    const avtarsList = (avatar) => {
        if (!avatar || !avatar.imageData) {
            console.error("Invalid avatar data:", avatar);
            return '';
        }
        return `data:image/png;base64,${avatar.imageData}`;
    };

    const compPointsItem = props.getPlayerInfo?.Balance.find(type => type.attr.wallet === "COMPPOINTS");
    const balanceItems = props.getPlayerInfo?.Balance.filter(type => type.attr.wallet === "USD" || type.attr.wallet === "CHP");
    return (
        <React.Fragment>
            <div className="river_cover" style={{ padding: '0px 10px' }}>
                <nav className="header_menu">
                    <div className="returnLogo" onClick={() => menuOptions(!props.openLobby_Table ? "gototable" : "gotolobby")}>
                        <img className="logo" style={{ position: 'unset' }} src={logo} alt="logo not found" />
                    </div>
                    <div className="left_menu">
                        {/* <p className="df_al"> Logged as: <p className="clr_river m_5 bold font_16 profileName_1">{" "}{props.user}</p> <img className="m_l_10 m_r_10 profile_image" onClick={() => getAvatarList()} src={myAvatar} alt="" /></p> */}
                        <p className="df_al">
                            Logged as:
                            <span className="m_5 bold font_16 profileName_1">
                                {" "}{props.user}
                            </span>
                            <img
                                className="m_l_10 m_r_10 profile_image"
                                onClick={() => {
                                    if (window.innerWidth <= 1200) {
                                        getAvatarList();
                                    }
                                }}
                                src={myAvatar}
                                alt=""
                            />
                        </p>

                        <div className="m_l_10 pointer">
                            <img className="menu" src={menu} alt="menu" onClick={() => menuOptions("menu")} title="Menu" />
                        </div>
                    </div>
                </nav>
                {window.innerWidth <= 1200 &&
                    <section className="df" style={{ flexDirection: 'column' }}>
                        <header className="profile_head">Balance Status</header>
                        {balanceItems.map((type, index) => (
                            <div className="profile_sections" key={index}>
                                <span>{type.attr.wallet} <b className="clr_river">{type.attr.wallet === "USD" ? "$ " : ""}{UM.numberWithCommas(type.attr.cash)}</b> Tournament Money: <b className="clr_river">{UM.numberWithCommas(type.attr["tournament-money"])}</b></span>
                                <span>Available: {UM.numberWithCommas(type.attr.cash)} In Play: {UM.numberWithCommas(type.attr["cash-in-play"])}  Bonus: {UM.numberWithCommas(type.attr["bonus-in-play"])}</span>
                            </div>
                        ))}
                        {compPointsItem && (
                            <div className="profile_sections" key="compPoints">
                                <span>VIP Points <b className="clr_river">{UM.numberWithCommas(compPointsItem.attr.total)}</b></span>
                                {/* <span>VIP Level: {props.data.level}{" "} <UserLevel></UserLevel></span> */}
                                <span>VIP Level: {props.myLevel}{" "} <UserLevel></UserLevel></span>
                            </div>
                        )}

                        <div className="profile_sections">
                            <div className="m_b_5">
                                <span>Tournament tickets: <span className="clr_river_green">{UM.numberWithCommas(props.getPlayerInfo.Tickets.attr.count)}</span></span>
                            </div>
                            {props.getPlayerInfo.Tickets.attr.count > 0 &&
                                props.getPlayerInfo.Tickets.Ticket.map((table, index) => (
                                    <div className="profile_sections" style={{ padding: '2px' }} key={index}>
                                        <small> <span style={{ color: '#ffff' }}>{index + 1}.</span> {table.attr.to}</small>
                                    </div>
                                ))
                            }
                        </div>
                    </section>
                }

                <section className="df" style={{ flexDirection: 'column' }}>
                    <header className="profile_head">Settings</header>

                    <div className="profile_sections_two">
                        <label htmlFor="showAvatars">Show Avatars</label>
                        <input
                            type="checkbox"
                            id="showAvatars"
                            checked={stateSettings?.showAvatars || false}
                            onChange={(e) => settingOptions(e)}
                        />
                    </div>

                    <div className="profile_sections_two">
                        <label htmlFor="showOpenSeat">Show 'Open seat' balloons</label>
                        <input
                            type="checkbox"
                            id="showOpenSeat"
                            checked={stateSettings?.showOpenSeat || false}
                            onChange={(e) => settingOptions(e)}
                        />
                    </div>

                    <div className="profile_sections_two">
                        <label htmlFor="useRaiseTo">Use 'Raise to' Instead of 'Raise'</label>
                        <input
                            type="checkbox"
                            id="useRaiseTo"
                            checked={stateSettings?.useRaiseTo || false}
                            onChange={(e) => settingOptions(e)}
                        />
                    </div>

                    <div className="profile_sections_two">
                        <label htmlFor="showHandStrength">Show Hand Strength</label>
                        <input
                            type="checkbox"
                            id="showHandStrength"
                            checked={stateSettings?.showHandStrength || false}
                            onChange={(e) => settingOptions(e)}
                        />
                    </div>

                    <div className="profile_sections_two">
                        <label htmlFor="waitBigBlind">Wait For Big/Over Blind</label>
                        <input
                            type="checkbox"
                            id="waitBigBlind"
                            checked={stateSettings?.waitBigBlind || false}
                            onChange={(e) => settingOptions(e)}
                        />
                    </div>

                    <div className="profile_sections_two">
                        <label htmlFor="autoPostBlind">Auto Post Blind</label>
                        <input
                            type="checkbox"
                            id="autoPostBlind"
                            checked={stateSettings?.showAutoPostBlind || false}
                            onChange={(e) => settingOptions(e)}
                        />
                    </div>

                    <div className="profile_sections_two">
                        <label htmlFor="autoMuckCards">Auto Muck Cards</label>
                        <input
                            type="checkbox"
                            id="autoMuckCards"
                            checked={stateSettings?.autoMuckCards || false}
                            onChange={(e) => settingOptions(e)}
                        />
                    </div>

                    <div className="profile_sections_two">
                        <label htmlFor="volumeMute">Volume Mute</label>
                        <input
                            type="checkbox"
                            id="volumeMute"
                            checked={stateSettings?.volumeMute || false}
                            onChange={(e) => settingOptions(e)}
                        />
                    </div>

                    <div className="profile_sections_two">
                        <label htmlFor="playerChatBalloon">Draw Player Chat Balloons</label>
                        <input
                            type="checkbox"
                            id="playerChatBalloon"
                            checked={stateSettings?.showChatBalloon || false}
                            onChange={(e) => settingOptions(e)}
                        />
                    </div>

                    <div className="profile_sections_two">
                        <label htmlFor="showPlayerChat">Show Player Chat</label>
                        <input
                            type="checkbox"
                            id="showPlayerChat"
                            checked={stateSettings?.showPlayerChat || false}
                            onChange={(e) => settingOptions(e)}
                        />
                    </div>

                    <div className="profile_sections_two">
                        <label htmlFor="showDealerMessage">Show Dealer Messages</label>
                        <input
                            type="checkbox"
                            id="showDealerMessage"
                            checked={stateSettings?.showDealerMessage || false}
                            onChange={(e) => settingOptions(e)}
                        />
                    </div>
                </section>

                <section className="df" style={{ flexDirection: 'column' }}>
                    <header className="profile_head">Performance</header>

                    <div className="profile_sections_two">
                        <label htmlFor="dealerCardAnimation">Enable dealing cards animation</label>
                        <input
                            type="checkbox"
                            id="dealerCardAnimation"
                            checked={performance?.dealerCardAnimation || false}
                            onChange={(e) => performanceSettings(e)}
                        />
                    </div>

                    <div className="profile_sections_two">
                        <label htmlFor="playerCardAnimation">Enable player cards animation</label>
                        <input
                            type="checkbox"
                            id="playerCardAnimation"
                            checked={performance?.playerCardAnimation || false}
                            onChange={(e) => performanceSettings(e)}
                        />
                    </div>

                    <div className="profile_sections_two">
                        <label htmlFor="chipAnimation">Enable chip animation</label>
                        <input
                            type="checkbox"
                            id="chipAnimation"
                            checked={performance?.chipAnimation || false}
                            onChange={(e) => performanceSettings(e)}
                        />
                    </div>

                    <div className="profile_sections_two">
                        <label htmlFor="tournamentIcon">Show tables and tournaments icons</label>
                        <input
                            type="checkbox"
                            id="tournamentIcon"
                            checked={performance?.tournamentIcon || false}
                            onChange={(e) => performanceSettings(e)}
                        />
                    </div>
                </section>


                {/* <section className="df" style={{ flexDirection: 'column' }}>
                    <header className="profile_head">Settings</header>
                    <div className="profile_sections_two">
                        <label htmlFor="showAvatars">Show Avatars</label>
                        <input type="checkbox" id="showAvatars" checked={stateSettings.showAvatars} onChange={(e) => { settingOptions(e) }} />
                    </div>
                    <div className="profile_sections_two">
                        <label htmlFor="showOpenSeat">Show 'Open seat' balloons</label>
                        <input type="checkbox" id="showOpenSeat" checked={stateSettings.showOpenSeat} onChange={(e) => { settingOptions(e) }} />
                    </div>
                    <div className="profile_sections_two">
                        <label htmlFor="useRaiseTo">Use 'Raise to' Instead of 'Raise'</label>
                        <input type="checkbox" id="useRaiseTo" checked={stateSettings.useRaiseTo} onChange={(e) => { settingOptions(e) }} />
                    </div>

                    <div className="profile_sections_two">
                        <label htmlFor="showHandStrength">Show Hand Strength</label>
                        <input type="checkbox" id="showHandStrength" checked={stateSettings.showHandStrength} onChange={(e) => { settingOptions(e) }} />
                    </div>
                    <div className="profile_sections_two">
                        <label htmlFor="waitBigBlind">Wait For Big/Over Blind</label>
                        <input type="checkbox" id="waitBigBlind" checked={stateSettings.waitBigBlind} onChange={(e) => settingOptions(e)} />
                    </div>
                    <div className="profile_sections_two">
                        <label htmlFor="autoPostBlind">Auto Post Blind</label>
                        <input type="checkbox" id="autoPostBlind" checked={stateSettings.showAutoPostBlind} onChange={(e) => { settingOptions(e) }} />
                    </div>
                    <div className="profile_sections_two">
                        <label htmlFor="autoMuckCards">Auto Muck Cards</label>
                        <input type="checkbox" id="autoMuckCards" checked={stateSettings.autoMuckCards} onChange={(e) => { settingOptions(e) }} />
                    </div>
                    <div className="profile_sections_two">
                        <label htmlFor="volumeMute">Volume Mute</label>
                        <input type="checkbox" id="volumeMute" checked={stateSettings.volumeMute} onChange={(e) => { settingOptions(e) }} />
                    </div>
                    <div className="profile_sections_two">
                        <label htmlFor="playerChatBalloon">Draw Player Chat Balloons</label>
                        <input type="checkbox" id="playerChatBalloon" checked={stateSettings.showChatBalloon} onChange={(e) => settingOptions(e)} />
                    </div>
                    <div className="profile_sections_two">
                        <label htmlFor="showPlayerChat">Show Player Chat</label>
                        <input type="checkbox" id="showPlayerChat" checked={stateSettings.showPlayerChat} onChange={(e) => { settingOptions(e) }} />
                    </div>
                    <div className="profile_sections_two">
                        <label htmlFor="showDealerMessage">Show Dealer Messages</label>
                        <input type="checkbox" id="showDealerMessage" checked={stateSettings.showDealerMessage} onChange={(e) => { settingOptions(e) }} />
                    </div>
                </section>

                <section className="df" style={{ flexDirection: 'column' }}>
                    <header className="profile_head">Performance</header>
                    <div className="profile_sections_two">
                        <label htmlFor="dealerCardAnimation">Enable dealling cards animation</label>
                        <input type="checkbox" id="dealerCardAnimation" checked={performance.dealerCardAnimation} onChange={(e) => { performanceSettings(e) }} />
                    </div>
                    <div className="profile_sections_two">
                        <label htmlFor="playerCardAnimation">Enable player cards animation</label>
                        <input type="checkbox" id="playerCardAnimation" checked={performance.playerCardAnimation} onChange={(e) => { performanceSettings(e) }} />
                    </div>
                    <div className="profile_sections_two">
                        <label htmlFor="chipAnimation">Enable chip animation</label>
                        <input type="checkbox" id="chipAnimation" checked={performance.chipAnimation} onChange={(e) => { performanceSettings(e) }} />
                    </div>
                    <div className="profile_sections_two">
                        <label htmlFor="tournamentIcon">Show tables and tournaments icons</label>
                        <input type="checkbox" id="tournamentIcon" checked={performance.tournamentIcon} onChange={(e) => { performanceSettings(e) }} />
                    </div>
                </section> */}

                <section className="df" style={{ flexDirection: 'column' }}>
                    <header className="profile_head">Client</header>
                    <div className="profile_sections">
                        {/* <span>Version: <b className="clr_river">25.01.16b</b></span> */}
                        {/* <span>Version: <b className="clr_river">{version}b</b></span> */}
                        {/* <span>Version: <b className="clr_river">{version !== "" ? version : "25.01.16"}b</b></span> */}
                        <span>Version: <b className="clr_river">{version}b</b></span>
                    </div>
                    <div className="profile_sections">
                        {/* <span>Build Date: <b className="clr_river">Sep 25 2024 17:20</b></span> */}
                        {/* <span>Build Date: <b className="clr_river">Jan 16 2025 10:45</b></span> */}
                        {/* <span>Build Date: <b className="clr_river">{buildDate !== "" ? buildDate : "Jan 16 2025 17:25"}</b></span> */}
                        <span>Build Date: <b className="clr_river">{buildDate}</b></span>
                    </div>
                </section>
                {options &&
                    <div className="show_menu_popup" onClick={() => menuOptions("close_menu")}>
                        <div className="sub_menu" >
                            {!props.openLobby_Table &&
                                <div className="options" onClick={() => menuOptions("gototable")}>
                                    <img src={icon_back} alt=" " />
                                    <label className="text">Table</label>
                                </div>
                            }

                            <div className="options" onClick={() => menuOptions("gotolobby")}>
                                <img src={icon_lobby} alt=" " />
                                <label className="text" >Lobby</label>
                            </div>

                            <div className="options" onClick={() => menuOptions('logout')}>
                                <img src={icon_logout} alt=" " />
                                <label className="text" >Logout</label>
                            </div>
                            <button className="options" onClick={() => menuOptions('exit')}>
                                <img src={icon_exit} alt=" " />
                                <label className="text" >Exit</label>
                            </button>
                        </div>
                    </div>
                }

                {showAvatarList &&
                    <div className="game_type_filter_cover" >
                        <div className="game_type_filter">
                            <header>
                                <span>
                                    <img className="m_l_10 m_r_10" style={{ borderRadius: '5px' }} src={myAvatar} alt="" />  Avatar List
                                </span>
                            </header>
                            <section className="fd avatar_section m_t_10 m_b_10" style={{ maxHeight: '255px' }}>

                                {avatarList.map((list) => {
                                    return (
                                        <div key={list.id} className="imageLablediv">
                                            <img
                                                key={list.id}
                                                className="m_l_10 m_r_10"
                                                style={{ borderRadius: '5px' }}
                                                src={avtarsList(list)}
                                                alt=""
                                                onClick={() => setSelectAvatarMethod(list.id)}
                                            />
                                        </div>
                                    );
                                })}


                                {!avatarList.length && <div className="loaderDiv"><span className="loader_3"></span></div>}
                            </section>
                            <span className="fd clr_river text_center">{UM.textFormat(avatarSetMessage)}</span>
                            <div className="close_div p_10 col-12" style={{ height: 'unset' }}>
                                <div className="df_al_js-center previewDiv col-6">
                                    {/* Preview : <div className="setPerviewDiv"> {avatarLoader ? <div className="loaderDiv"><span className="loader_3"></span></div> : <img className="m_l_10 m_r_10" style={{ borderRadius: '5px' }} src={props.avtar} alt="" />} </div> */}
                                    Preview : <div className="setPerviewDiv"> {avatarLoader ? <div className="loaderDiv"><span className="loader_3"></span></div> : <img className="m_l_10 m_r_10" style={{ borderRadius: '5px', width: '100%' }} src={previewImage} alt="" />} </div>
                                </div>
                                <span className="col-6">
                                    <button type="button" className="btn_2" style={{ width: '90%' }} onClick={(e) => { setAvatar(e); }} disabled={avatarLoader}> Set Avatar </button>
                                    <button type="button" className="btn_2" style={{ width: '90%', marginTop: '10px' }} onClick={(e) => { setShowAvatarList(false); }}> close </button>
                                </span>
                            </div>
                        </div>
                    </div>
                }
            </div >
        </React.Fragment >
    );
};
export default withTranslation()(Profile);
