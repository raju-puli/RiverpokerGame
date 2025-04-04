import React, { useEffect, useState } from "react";
import "../../../../../css/ui/lobby/filterTabs.css";
import DateUtils from "../../../../utils/dateUtils";
import fileName from '../../../../../jsconfig';
import Config from '../../../../../config';
import { withTranslation } from 'react-i18next';
import "../../../../../css/ui/lobby/lobbyMenu.css"
import left_sidebar from "../../../../../assets/images/lobby_icons/button_slide_panel.png";
import img_1 from "../../../../../assets/images/lobby_icons/casino.png";
import img_2 from "../../../../../assets/images/lobby_icons/instantplay.png";
import img_3 from "../../../../../assets/images/lobby_icons/m8.png";
import img_4 from "../../../../../assets/images/lobby_icons/support.png";
import img_5 from "../../../../../assets/images/lobby_icons/wallet.png";
import img_6 from "../../../../../assets/images/lobby_icons/icon_user_tables.png";
import img_7 from "../../../../../assets/images/lobby_icons/icon_sort.png";
import img_8 from "../../../../../assets/images/lobby_icons/icon_refresh.png";
import { getTournamentIcon } from "../../../../utils/global";
import bbjIcon from "../../../../../assets/images/lobby_icons/bg_jackpot_phone.png"
import "../../../../../css/media_queries/allpagesMedia.css";
import UM from "../../../../utils/utilityMethods";
import eventEmitter from "../../../../utils/eventEmitter";
// import { t } from "i18next";


const Filters = (props) => {
    var config = new Config();
    var date = new Date();
    var sid = JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_sid'`))?.sid;
    const [tournamentIcon, setIcon] = useState(getTournamentIcon())
    useEffect(() => {
        if (tournamentIcon !== getTournamentIcon()) {
            setIcon(getTournamentIcon());
            // refreshTables()
        }
    }, [tournamentIcon]);

    const footBtns = [
        { name: props.gametext },
        { name: props.texttorno },
        { name: props.sit_go },
        { name: props.cashier },
    ];
    const thirdhedaderdesktop = [
        { name: props.gametext },
        { name: props.texttorno },
        { name: props.sit_go },
        { name: props.cashier },
    ];
    if (fileName.name !== "Riverpoker") {
        delete footBtns[3]
        delete thirdhedaderdesktop[3]
    }

    const [lobbyFilter, setLobbyFilter] = useState("Cash_Games");
    const [gameTypeFilterSelection, setGameTypeFilterSelection] = useState("All");
    const [selectedCurrency, setSelectedCurrency] = useState("All");
    const [limitState, setLimitState] = useState("All");
    const [ativeEmptyFilter, setActiveEmptyFilter] = useState(false);
    const [ativeFullFilter, setActiveFullFilter] = useState(false);
    const [ativeTourneyFilter, setActiveTourneyFilter] = useState(false);
    const [ativeSitGoFilter, setAtiveSitGoFilter] = useState(false);
    const [seats, setSeats] = useState("All");
    const [stakesSortFilter, setStakesSortFilter] = useState("No_Sort");
    const [tourneyBuyInFilter, setTourneyBuyInFilter] = useState("No_Sort");
    const [sitgoBuyInFilter, setSitgoBuyInFilter] = useState("No_Sort");
    const [seatsSortFilter, setSeatsSortFilter] = useState("No_Sort");
    const [tourneyBuyInSortFilter, setTourneyBuyInSortFilter] = useState("No_Sort");
    const [sitgoBuyInSortFilter, setSitgoBuyInSortFilter] = useState("No_Sort");
    const [selectOption, setSelectOption] = useState("");
    const [stakeState, setStakeState] = useState("All");
    const [singleClick, setSingleClick] = useState(false);
    const [loader, setLoader] = useState(false);

    const [tourneyGameTypeFilterSelection, setTourneyGameTypeFilterSelection] = useState("All");
    const [sitgoGameTypeFilterSelection, setSitgoGameTypeFilterSelection] = useState("All");
    const [tourneyOpt, setTourneyOpt] = useState("All");

    const [sit_goOpt, setSit_GoOpt] = useState("All");
    const [mobileGameFilter, setMobileGameFilter] = useState("");

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width > 1200) {
                setSingleClick(false);
            } else {
                setSingleClick(true);
                let lobbyMiniWindow = document.getElementById("mySidenav");
                if (lobbyMiniWindow) {
                    const button = lobbyMiniWindow.querySelector("button");
                    if (button.classList.contains("closeNavBtn")) {
                        button.click();
                    }
                }
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // useEffect(() => {
    //     const gameTypeFilter = document.getElementById("game_type_filter");
    //     console.log(gameTypeFilter);

    //     const resetGameTypeFilter = () => {
    //         alert("hit");
    //     };

    //     if (gameTypeFilter) gameTypeFilter.addEventListener('click', resetGameTypeFilter);

    //     setTimeout(() => {
    //         setLoader(props.showLoader)
    //     }, 1000);

    //     return () => {
    //         if (gameTypeFilter) gameTypeFilter.removeEventListener('click', resetGameTypeFilter);
    //     };
    // }, [props]);

    const onClosetheFilterPopup = (e) => {
        e.stopPropagation();
        if (e.target) {
            if (e.target.classList[0] === "game_type_filter_cover") {
                onSetSeatsFilter();
                onSetStakeFilter();

                // if (window.innerWidth > 991) {
                let game_type_filter = document.getElementById("game_type_filter");
                let seatfiltertab = document.getElementById("game_type_filter_1");
                if (game_type_filter && game_type_filter.style.display === 'flex') {
                    setTimeout(() => {
                        setSelectOption("");
                        game_type_filter.style.display = 'none';
                    }, 200);
                }
                if (seatfiltertab && seatfiltertab.style.display === 'flex') {
                    setTimeout(() => {
                        setSelectOption("");
                        seatfiltertab.style.display = 'none';
                    }, 200);
                };
                // };
            }
        };
    }


    const gotoWebsitewithLink = (type) => {
        if (type) {
            return window.open(`${config.URL_Environment.proxy.baseUrl}/client-redirect?LANG=en&sid=${sid}&to=${type}`);
        } else {
            props.setAction('show_url_err');
        }
    };
    const [actionActive, setactionActive] = useState(false);

    const showGameLobby = (e) => {
        e.stopPropagation();
        setactionActive(true);
        let actionPlayerTimeout;
        clearTimeout(actionPlayerTimeout);
        let games_dropdown = document.getElementById("dropdown_games");
        let dropdown = document.getElementById("dropdown");
        if (dropdown) {
            let afterContent = window.getComputedStyle(dropdown, "::after").getPropertyValue("content");
            if (afterContent && afterContent !== 'none' && afterContent !== '""') {
                dropdown.click();
            }
        }
        if (games_dropdown) {
            let afterContent = window.getComputedStyle(games_dropdown, "::after").getPropertyValue("content");
            if (afterContent && afterContent !== 'none' && afterContent !== '""') {
                games_dropdown.click();
            }
        }

        switch (e.target.id) {
            case "Cash_Games_desktop":
            case "Cash_Games":
                setLobbyFilter("Cash_Games");
                props.tableRequest("Cash_Games");
                props.action("REFRESH", "", "Cash_Games");
                break;
            case "Tournaments_desktop":
            case "Tournaments":
                setLobbyFilter("Tournaments");
                props.tableRequest("Tournaments");
                props.action("REFRESH", "", "Tournaments");
                break;
            case "Sit_Go_desktop":
            case "Sit_Go":
                setLobbyFilter("Sit_Go");
                props.tableRequest("Sit_Go");
                props.action("REFRESH", "", "Sit_Go");
                break;
            default:
                setLobbyFilter("Cash_Games");
                props.tableRequest("Cash_Games");
                props.action("REFRESH", "", "Cash_Games");
                break;
        }

        actionPlayerTimeout = setTimeout(() => {
            setactionActive(false);
        }, 400);
    };

    const ShowLeftMenu = () => {

        const menu = document.getElementById("left_menu");
        const menuImg = document.getElementById("left_menu_img");
        const cover = document.getElementById("lobby_filter");
        const links = document.getElementById("lobby_link");

        if (menu && menuImg && cover && links) {
            const isMenuClosed = !menu.style.left || menu.style.left === "-310px";

            menu.style.left = isMenuClosed ? '0px' : '-310px';
            menuImg.style.left = isMenuClosed ? '-12px' : '-310px';
            cover.style.width = isMenuClosed ? '100%' : '0%';
            cover.style.zIndex = isMenuClosed ? '9' : '';
            links.style.zIndex = isMenuClosed ? '0' : '9';
        }
    };

    const onGameTypeMenuOptions = (type) => {
        const Game_Type_Filter_Tab = document.getElementById("game_type_filter");
        const Game_Type_Filter_Tab_Seats = document.getElementById("game_type_filter_1");
        if (type === "Game_Type" && Game_Type_Filter_Tab) {
            Game_Type_Filter_Tab.style.display = 'flex';
        } else if (type === "Seat_Count" && Game_Type_Filter_Tab_Seats) {
            Game_Type_Filter_Tab_Seats.style.display = 'flex';
        };
        setSelectOption(type);
    };

    const onSetGameType = (e) => {
        let Game_Dropdown_Tab = document.getElementById("dropdown_games");
        let game_type_filter = document.getElementById("game_type_filter");
        if (Game_Dropdown_Tab) {
            Game_Dropdown_Tab.click();
        };
        if (game_type_filter && game_type_filter.style.display === 'flex') {
            setTimeout(() => {
                setSelectOption("");
                game_type_filter.style.display = 'none';
            }, 200);
        }
        switch (e.target.value) {
            case "All":
                if (lobbyFilter === "Cash_Games") {
                    setGameTypeFilterSelection("All");
                } else if (lobbyFilter === "Tournaments") {
                    setTourneyGameTypeFilterSelection("All");
                } else if (lobbyFilter === "Sit_Go") {
                    setSitgoGameTypeFilterSelection("All");
                }
                break;
            case "TEXAS_HOLDEM":
                if (lobbyFilter === "Cash_Games") {
                    setGameTypeFilterSelection(e.target.value);
                } else if (lobbyFilter === "Tournaments") {
                    setTourneyGameTypeFilterSelection(e.target.value);
                } else if (lobbyFilter === "Sit_Go") {
                    setSitgoGameTypeFilterSelection(e.target.value);
                };
                break;
            case "HOLDEM_SHORT_DECK":
                if (lobbyFilter === "Cash_Games") {
                    setGameTypeFilterSelection(e.target.value);
                } else if (lobbyFilter === "Tournaments") {
                    setTourneyGameTypeFilterSelection(e.target.value);
                } else if (lobbyFilter === "Sit_Go") {
                    setSitgoGameTypeFilterSelection(e.target.value);
                };
                break;
            case "OMAHA":
                if (lobbyFilter === "Cash_Games") {
                    setGameTypeFilterSelection(e.target.value);
                } else if (lobbyFilter === "Tournaments") {
                    setTourneyGameTypeFilterSelection(e.target.value);
                } else if (lobbyFilter === "Sit_Go") {
                    setSitgoGameTypeFilterSelection(e.target.value);
                };
                break;
            case "OMAHA_FIVE_CARDS":
                if (lobbyFilter === "Cash_Games") {
                    setGameTypeFilterSelection(e.target.value);
                } else if (lobbyFilter === "Tournaments") {
                    setTourneyGameTypeFilterSelection(e.target.value);
                } else if (lobbyFilter === "Sit_Go") {
                    setSitgoGameTypeFilterSelection(e.target.value);
                };
                break;
            case "OMAHA_SIX_CARDS":
                if (lobbyFilter === "Cash_Games") {
                    setGameTypeFilterSelection(e.target.value);
                } else if (lobbyFilter === "Tournaments") {
                    setTourneyGameTypeFilterSelection(e.target.value);
                } else if (lobbyFilter === "Sit_Go") {
                    setSitgoGameTypeFilterSelection(e.target.value);
                };
                break;
            default:
                break;
        };

        onLoader();
        let game = (e.target.value === "All") ? "TEXAS_HOLDEM|HOLDEM_SHORT_DECK|OMAHA|OMAHA_HIGH_LOW|HOLDEM_BLACKJACK|REVERSE_HOLDEM|OMAHA_FIVE_CARDS|OMAHA_SIX_CARDS" : e.target.value;
        props.action("GAMES", game, lobbyFilter);
    };

    const onSetCurrencyFilter = (currency) => {
        setSelectedCurrency(currency);
        let Dropdown_Tab = document.getElementById("dropdown");
        if (Dropdown_Tab) {
            Dropdown_Tab.click();
        };
        onLoader();
        let mode = (currency === "All") ? "CASH" : currency;
        props.action("MODES", mode, lobbyFilter);
    };

    const onDropDown = (e) => {
        let games_dropdown = document.getElementById("dropdown_games");
        let _dropdown_currncy = document.getElementById("lable-dropdown-currency");
        let _dropdown_games = document.getElementById("lable-dropdown-games");
        let dropdown = document.getElementById("dropdown");


        const spanElementCurreny = _dropdown_currncy.querySelector("span.lableHead");
        const spanElement = _dropdown_games.querySelector("span.lableHead");



        if (e.target.name === "dropdown") {
            if (dropdown) {
                dropdown.click();
                if (games_dropdown) {
                    let afterContent = window.getComputedStyle(games_dropdown, "::after").getPropertyValue("content");
                    if (afterContent && afterContent !== 'none' && afterContent !== '""') {
                        games_dropdown.click();
                    }
                }
            }
            if (_dropdown_currncy.style.border === "1px solid rgb(254, 214, 38)") {
                _dropdown_currncy.style.border = "";
                if (spanElementCurreny) {
                    spanElementCurreny.style.color = "";
                } else {
                    console.log("Not found");
                }
            } else {
                if (spanElementCurreny) {
                    spanElementCurreny.style.color = "rgb(254, 214, 38)";
                } else {
                    console.log("Not found");
                }
                _dropdown_currncy.style.border = "1px solid rgb(254, 214, 38)";
            }



        } else if (e.target.name === "dropdown_for_games") {
            if (games_dropdown) {
                games_dropdown.click();
                if (dropdown) {
                    let afterContent = window.getComputedStyle(dropdown, "::after").getPropertyValue("content");
                    if (afterContent && afterContent !== 'none' && afterContent !== '""') {
                        dropdown.click();
                    }
                }
            }
            if (_dropdown_games.style.border === "1px solid rgb(254, 214, 38)") {
                _dropdown_games.style.border = "";
                if (spanElement) {
                    spanElement.style.color = "";
                } else {
                    console.log("Not found");
                }
            } else {
                if (spanElement) {
                    spanElement.style.color = "rgb(254, 214, 38)";
                } else {
                    console.log("Not found");
                }
                _dropdown_games.style.border = "1px solid rgb(254, 214, 38)";
            }
        }
    };

    const onSetLimit = (type) => {
        switch (type) {
            case "All":
                setLimitState("All");
                break;
            case "LIMIT":
                setLimitState("LIMIT");
                break;
            case "POT_LIMIT":
                setLimitState("POT_LIMIT");
                break;
            case "NO_LIMIT":
                setLimitState("NO_LIMIT");
                break;
            default:
                break;
        };
        onLoader();
        props.action("LIMITS", type, lobbyFilter);
    }

    const onSetStakes = (type) => {
        switch (type) {
            case "All":
                setStakeState("All");
                break;
            case "LOW":
                setStakeState("LOW");
                break;
            case "MEDIUM":
                setStakeState("MEDIUM");
                break;
            case "HIGH":
                setStakeState("HIGH");
                break;
            default:
                break;
        };
        onLoader();
        props.action("STAKES", type, lobbyFilter);
    };

    const onSetHideEmptyUpcomFilter = (type) => {
        switch (type) {
            case "FULL":
                setActiveFullFilter(!ativeFullFilter);
                props.action("FULL", type, lobbyFilter);
                break;
            case "EMPTY":
                setActiveEmptyFilter(!ativeEmptyFilter);
                props.action("EMPTY", type, lobbyFilter);
                break;
            case "UPCOMMING":
                if (lobbyFilter === "Sit_Go") {
                    setAtiveSitGoFilter(!ativeSitGoFilter);
                } else {
                    setActiveTourneyFilter(!ativeTourneyFilter);
                }
                props.action("UPCOMMING", type, lobbyFilter);
                break;
            default:
                break;
        };
        onLoader();
        let RequestObj = { type: type, value: type === "FULL" ? !ativeFullFilter : type === "EMPTY" ? !ativeEmptyFilter : lobbyFilter === "Sit_Go" ? !ativeSitGoFilter : !ativeTourneyFilter };
        props.action("ACTIVETABLES", RequestObj, lobbyFilter);
    }

    const onRefreshTables = () => {
        props.action("REFRESH", "", lobbyFilter);
        onLoader();
    }

    const onLoader = () => {
        setLoader(true);
        setTimeout(() => {
            switch (lobbyFilter) {
                case "Cash_Games":
                    eventEmitter.emit("reload_cash_games");
                    break;
                case "Tournaments":
                    eventEmitter.emit("reload_tournament_games");
                    break;
                case "Sit_Go":
                    eventEmitter.emit("reload_sitgo_games");
                    break;
                default:
                    break;
            };
            setTimeout(() => {
                setLoader(false);
            }, 1500);
        }, 500);
    }

    const onSetSeats = (seatCount) => {
        let seatfiltertab = document.getElementById("game_type_filter_1");
        if (seatfiltertab && seatfiltertab.style.display === 'flex') {
            setTimeout(() => {
                setSelectOption("");
                seatfiltertab.style.display = 'none';
            }, 200);
        }
        setSeats(seatCount);
        let count = "0";
        switch (seatCount) {
            case "1_on_1":
                count = "2";
                break;
            case "6_max":
                count = "2 | 3 | 4 | 5 | 6";
                break;
            case "9_to_10":
                count = "9 | 10";
                break;
            default:
                count = "All";
                break;
        };
        onLoader();
        props.action("SEATS", count, lobbyFilter);
    };

    const onSetStakeFilter = (e) => {
        setTimeout(() => {
            setMobileGameFilter("");
        }, 200);
        if (lobbyFilter === "Cash_Games") {
            if (e) {
                setStakesSortFilter(e.target.value);
            }
            let stakefiltertab = document.getElementById("Stake_Sort_Fliter");
            let stakes_filter = document.getElementById("stakes_filter");
            if (stakefiltertab) {
                setTimeout(() => {
                    stakefiltertab.style.display = 'none';
                    if (stakes_filter) {
                        stakes_filter.classList.remove('rotate_smooth');
                    }
                }, 200);
            };
        } else if (lobbyFilter === "Tournaments") {
            if (e) {
                setTourneyBuyInFilter(e.target.value);
            }
            let stakefiltertab = document.getElementById("Stake_Sort_Fliter");
            let stakes_filter = document.getElementById("tourney_stakes_filter_toggle");
            if (stakefiltertab) {
                setTimeout(() => {
                    stakefiltertab.style.display = 'none';
                    if (stakes_filter) {
                        stakes_filter.classList.remove('rotate_smooth');
                    }
                }, 200);
            };
        } else if (lobbyFilter === "Sit_Go") {
            if (e) {
                setSitgoBuyInFilter(e.target.value);
            }
            let stakefiltertab = document.getElementById("Stake_Sort_Fliter");
            let stakes_filter = document.getElementById("sitgo_stakes_filter_toggle");
            if (stakefiltertab) {
                setTimeout(() => {
                    stakefiltertab.style.display = 'none';
                    if (stakes_filter) {
                        stakes_filter.classList.remove('rotate_smooth');
                    }
                }, 200);
            };
        };
        if (e) {
            onLoader();
            props.sortTables(e.target.value, lobbyFilter);
            onRefreshTables();
        }
    }

    const onSetSeatsFilter = (e) => {
        // e.preventDefault();
        if (e) {
            e.stopPropagation();
        }
        setTimeout(() => {
            setMobileGameFilter("");
        }, 200);
        if (lobbyFilter === "Cash_Games") {
            if (e) {
                setSeatsSortFilter(e.target.value);
            }
            let seatfiltertab = document.getElementById("Seats_Sort_Fliter");
            let seats_filter = document.getElementById("seats_filter");
            if (seatfiltertab) {
                setTimeout(() => {
                    seatfiltertab.style.display = 'none';
                    if (seats_filter) {
                        seats_filter.classList.remove('rotate_smooth');
                    }
                }, 200);
            };
        } else if (lobbyFilter === "Tournaments") {
            if (e) {
                setTourneyBuyInSortFilter(e.target.value);
            }
            let seatfiltertab = document.getElementById("Seats_Sort_Fliter");
            let tourney_seats_filter_toggle = document.getElementById("tourney_seats_filter_toggle");
            if (seatfiltertab) {
                setTimeout(() => {
                    seatfiltertab.style.display = 'none';
                    if (tourney_seats_filter_toggle) {
                        tourney_seats_filter_toggle.classList.remove('rotate_smooth');
                    }
                }, 200);
            };
        } else if (lobbyFilter === "Sit_Go") {
            if (e) {
                setSitgoBuyInSortFilter(e.target.value);
            }
            let seatfiltertab = document.getElementById("Seats_Sort_Fliter");
            let sitgo_seats_filter_toggle = document.getElementById("sitgo_seats_filter_toggle");
            if (seatfiltertab) {
                setTimeout(() => {
                    seatfiltertab.style.display = 'none';
                    if (sitgo_seats_filter_toggle) {
                        sitgo_seats_filter_toggle.classList.remove('rotate_smooth');
                    }
                }, 200);
            };
        }
        if (e) {
            onLoader();
            props.sortTables(e.target.value, lobbyFilter);
            onRefreshTables();
        }
    };

    const onSetTourneyType = (type) => {
        setTourneyOpt(type);
        onLoader();
        if (type === "SATELLITES_ONLY" || type === "MAIN_EVENTS_ONLY") {
            props.action("SATTELITES", type, lobbyFilter);
        } else {
            props.action("TYPES", type, lobbyFilter);
            let seatfiltertab = document.getElementById("game_type_filter_1");
            if (seatfiltertab && seatfiltertab.style.display === 'flex') {
                setTimeout(() => {
                    setSelectOption("");
                    seatfiltertab.style.display = 'none';
                }, 200);
            }
        };
    };

    const onSetSitgoTable = (type) => {
        setSit_GoOpt(type);
        onLoader();
        if (type === "SATELLITES_ONLY") {
            props.action("SATTELITES", type, lobbyFilter);
        } else {
            props.action("TABLES", type, lobbyFilter);
            let seatfiltertab = document.getElementById("game_type_filter_1");
            if (seatfiltertab && seatfiltertab.style.display === 'flex') {
                setTimeout(() => {
                    setSelectOption("");
                    seatfiltertab.style.display = 'none';
                }, 200);
            }
        }
    }


    return (
        <main className="fd">
            <nav className="lobby-filter" id="lobby_filter" style={{ display: (props.showTourneyLobby || props.showProfile) ? 'none' : 'block' }}>
                <div className="side-menu">
                    {/* =================================================================== New - START ==================================================================== */}
                    <div id="left_menu">
                        <div className="menu_header">
                            <button type="button" id="Cash_Games" className={lobbyFilter === "Cash_Games" ? "active" : ""} onClick={(e) => showGameLobby(e)}>Games</button>
                            <button type="button" id="Tournaments" className={lobbyFilter === "Tournaments" ? "active" : ""} onClick={(e) => showGameLobby(e)}>Tournaments</button>
                            <button type="button" id="Sit_Go" className={lobbyFilter === "Sit_Go" ? "active" : ""} onClick={(e) => showGameLobby(e)}>Sit&Go</button>
                        </div>
                        <div className="menu_body">
                            <div className={selectOption === "Game_Type" ? "active game_filters" : "game_filters"} onClick={() => onGameTypeMenuOptions("Game_Type")}>
                                <span>Game Type</span>
                                <small>{UM.textFormat(lobbyFilter === "Cash_Games" ? gameTypeFilterSelection : lobbyFilter === "Tournaments" ? tourneyGameTypeFilterSelection : sitgoGameTypeFilterSelection)} </small>
                                <div className="arrow_symbol">
                                    <span> &gt; </span>
                                </div>
                            </div>
                            <div className={selectOption === "Seat_Count" ? "active game_filters" : "game_filters"} onClick={() => onGameTypeMenuOptions("Seat_Count")} >
                                <span>{lobbyFilter === "Cash_Games" ? "Seats" : lobbyFilter === "Tournaments" ? "Type" : "Tables"} </span>
                                <small>{lobbyFilter === "Cash_Games" ? (seats === "1_on_1" ? "2 (1-on-1)" : seats === "6_max" ? "6-max" : seats === "9_to_10" ? "9 - 10" : seats) : lobbyFilter === "Tournaments" ? tourneyOpt : sit_goOpt}</small>
                                <div className="arrow_symbol">
                                    <span> &gt; </span>
                                </div>
                            </div>
                            {lobbyFilter === "Cash_Games" ?
                                (<div className="active_game_filters device_media_hide_empty">
                                    <span>
                                        Hide Full <input type="checkbox" onChange={() => onSetHideEmptyUpcomFilter("FULL")} checked={ativeFullFilter} />
                                    </span>
                                    <span>
                                        Hide Empty <input type="checkbox" onChange={() => onSetHideEmptyUpcomFilter("EMPTY")} checked={ativeEmptyFilter} />
                                    </span>
                                </div>) :
                                (<div className="active_game_filters device_media_hide_empty">
                                    <span>
                                        Show Upcoming Only <input type="checkbox" onChange={() => onSetHideEmptyUpcomFilter("UPCOMMING")} checked={lobbyFilter === "Tournaments" ? ativeTourneyFilter : ativeSitGoFilter} />
                                    </span>
                                </div>)
                            }

                            <div className="active_game_filters p_5 border_river">
                                <b className="m_b_5">Currency Filter:</b>

                                {["All", "USD"].map((currency) => (
                                    <div
                                        key={currency}
                                        className="game_filters df"
                                        onClick={() => onSetCurrencyFilter(currency)}
                                    >
                                        <span>{currency}</span>
                                        <div className="arrow_symbol">
                                            <span>
                                                <input
                                                    type="checkbox"
                                                    className="fullEmpt"
                                                    checked={selectedCurrency === currency}
                                                    readOnly
                                                />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* <div className="active_game_filters p_5 border_river">
                                <b className="m_b_5"> Currency Filter : </b>

                                <div className="game_filters df" onClick={() => onSetCurrencyFilter("All")} >
                                    <span>ALL</span>
                                    <div className="arrow_symbol">
                                        <span> <input type="checkbox" className="fullEmpt" checked={selectedCurrency === "All"} style={{ left: 'unset', opacity: 'unset' }} /> </span>
                                    </div>
                                </div>

                                <div className="game_filters df" onClick={(e) => onSetCurrencyFilter("TOMAN")}>
                                    <span>TOMAN</span>
                                    <div className="arrow_symbol">
                                        <span> <input type="checkbox" className="fullEmpt" checked={selectedCurrency === "TOMAN"} style={{ left: 'unset', opacity: 'unset' }} /> </span>
                                    </div>
                                </div>
                                <div className="game_filters df" onClick={(e) => onSetCurrencyFilter("USD")}>
                                    <span>USD</span>
                                    <div className="arrow_symbol">
                                        <span> <input type="checkbox" className="fullEmpt" checked={selectedCurrency === "USD"} style={{ left: 'unset', opacity: 'unset' }} /> </span>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <img id="left_menu_img" src={left_sidebar} alt="" onClick={() => ShowLeftMenu()} />
                    {/* =================================================================== New - END ==================================================================== */}
                </div>
            </nav>


            <div className="col-12">
                {/* =================================================================== New - START ==================================================================== */}
                <nav className="lobby-top-nav_header" style={{ display: props.showTourneyLobby ? 'none' : 'flex' }}>
                    <div className="menu_header" >

                        <button type="button" id="Cash_Games_desktop" className={lobbyFilter === "Cash_Games" ? "headerBtnActive" : "position_overflow hoverClrEff"} disabled={actionActive} onClick={(e) => showGameLobby(e)}>
                            Games
                            {lobbyFilter === "Cash_Games" &&
                                <span className="spotlight" />
                            }
                        </button>
                        <button type="button" id="Tournaments_desktop" className={lobbyFilter === "Tournaments" ? "headerBtnActive " : "position_overflow hoverClrEff"} disabled={actionActive} onClick={(e) => showGameLobby(e)}>
                            Tournaments
                            {lobbyFilter === "Tournaments" &&
                                <span className="spotlight" />
                            }
                        </button>
                        <button type="button" id="Sit_Go_desktop" className={lobbyFilter === "Sit_Go" ? "headerBtnActive" : "position_overflow hoverClrEff"} disabled={actionActive} onClick={(e) => showGameLobby(e)}>
                            Sit&Go
                            {lobbyFilter === "Sit_Go" &&
                                <span className="spotlight" />
                            }
                        </button>

                        {/* {Array.from({ length: 3 }).map((_, ind) => (
                            <button className="Btn_3" key={ind}>
                                {(lobbyFilter === "Cash_Games" && ind === 0) && <span className="spotlight" />}
                            </button>
                        ))} */}


                        {/* <button class="button-13" role="button">
                            <span class="text">GAMES</span>
                            <span class="button-13-background"></span>
                            <span class="button-13-border"></span>
                            <svg width="0" height="0">
                                <filter id="remove-black-button-13" color-interpolation-filters="sRGB">
                                    <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 -1 -1 -1 0 1"
                                        result="black-pixels"></feColorMatrix>
                                    <feComposite in="SourceGraphic" in2="black-pixels" operator="out"></feComposite>
                                </filter>
                            </svg>
                        </button>

                        <button class="button-13" role="button">
                            <span class="text">TOURNAMENTS</span>
                            <span class="button-13-background"></span>
                            <span class="button-13-border"></span>
                            <svg width="0" height="0">
                                <filter id="remove-black-button-13" color-interpolation-filters="sRGB">
                                    <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 -1 -1 -1 0 1"
                                        result="black-pixels"></feColorMatrix>
                                    <feComposite in="SourceGraphic" in2="black-pixels" operator="out"></feComposite>
                                </filter>
                            </svg>
                        </button>

                        <button class="button-13" role="button">
                            <span class="text">SIT & GO'S</span>
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
                </nav>

                <nav className="lobby-top-nav device_media_margin_left" style={{ display: props.showTourneyLobby ? 'none' : 'flex', position: 'relative' }}>
                    <div className="df_al col-xl-3 col-xxl-3 col-lg-3 col-sm-2">
                        <div className="time_display mobile_time m_r_10">
                            <b className="clr_river">{Math.trunc(date.getHours()).toString().padStart(2, '0')} : {Math.trunc(date.getMinutes()).toString().padStart(2, '0')}</b>
                        </div>

                        <div className="bbj_div">
                            <img src={bbjIcon} alt="" />
                            <span>{UM.changeAmtLabel(props.userdata.bbj)}</span>
                        </div>

                        <div className="sec-center device_media" style={{ marginLeft: '-50px' }}>
                            <input className="dropdown" type="checkbox" onClick={(e) => onDropDown(e)} id="dropdown" style={{ opacity: "0" }} name="dropdown" />
                            <label className="for-dropdown filterhover" id="lable-dropdown-currency" htmlFor="dropdown" >
                                <span className="lableHead">Currency</span>
                                {/* {selectedCurrency === "All" ? "Currency (All)" : selectedCurrency} */}
                                {selectedCurrency}
                                <span className="uil uil-arrow-down emoji">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                        <path d="M417-834v466L215-570l-89 90 354 354 354-354-89-90-202 202v-466H417Z" />
                                    </svg> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                                    </svg>
                                </span>
                            </label>
                            <div className="section-dropdown" >
                                <div className="menu_body">
                                    <div className="game_filters currency_filter" onClick={() => onSetCurrencyFilter("All")}>
                                        <div className="active_game_filters fd">
                                            <span className="m_r_15">
                                                ALL <input type="checkbox" className="fullEmpt" checked={selectedCurrency === "All"} style={{ left: 'unset', opacity: 'unset' }} />
                                            </span>
                                        </div>
                                    </div>
                                    {/* <div className="game_filters currency_filter" onClick={() => onSetCurrencyFilter("TOMAN")}>
                                        <div className="active_game_filters fd">
                                            <span className="m_r_15">
                                                TOMAN <input type="checkbox" className="fullEmpt" checked={selectedCurrency === "TOMAN"} style={{ left: 'unset', opacity: 'unset' }} />
                                            </span>
                                        </div>
                                    </div> */}
                                    <div className="game_filters currency_filter" onClick={() => onSetCurrencyFilter("USD")}>
                                        <div className="active_game_filters fd" >
                                            <span className="m_r_15">
                                                USD <input type="checkbox" className="fullEmpt" checked={selectedCurrency === "USD"} style={{ left: 'unset', opacity: 'unset' }} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div>
                    <div id="lobby_link" className="col-xl-6 col-sm-8 col-xxl-6 col-lg-6" style={{ zIndex: '9', flexWrap: 'nowrap', display: 'flex', justifyContent: 'center' }}>
                        {(window.innerWidth > 665 || props.showTourneyLobby) &&
                            // {window.innerWidth > 665 &&
                            <>
                                <img src={img_1} alt="" className="hoverEff" onClick={(e) => gotoWebsitewithLink('casinoh5')} />
                                <img src={img_2} alt="" className="hoverEff" onClick={(e) => gotoWebsitewithLink('liveDealer_2')} />
                                <img src={img_3} alt="" className="hoverEff" onClick={(e) => gotoWebsitewithLink('Sportsm')} />
                                <img src={img_4} alt="" className="hoverEff" onClick={(e) => gotoWebsitewithLink('supportc')} />
                                <img src={img_5} alt="" className="hoverEff" onClick={(e) => gotoWebsitewithLink('deposit')} />
                            </>
                        }
                    </div>
                    <div className="lobby_active_icon col-xl-3 col-xxl-3 col-lg-3 col-sm-2 mousehover" style={{ justifyContent: 'flex-end' }}>
                        <div className="cashier_div" >
                            <button type="button" className="hoverEff button-46" id="optionsButton" onClick={(e) => props.setAction('showOptionsPopUp')}>Options</button>
                        </div>
                        <div className="cashier_div" >
                            <button type="button" className="hoverEff button-46" id="casheiarButton" onClick={(e) => props.setAction('showCashierPopUp')}>Cashier</button>
                        </div>

                        <img src={img_6} alt="logo1" className="hoverEff" onClick={(e) => props.setAction('showActiveTables')} title="Active Tables & Tournaments" />

                        {/* <img src={img_7} className="sort_fliter_mobile_cls" alt="logo2" onClick={() => setMobileGameFilter("show")} /> */}
                        <img src={img_7} className="max_width_992" alt="logo2" onClick={() => setMobileGameFilter("show")} title="Tables Refresh" />
                        {!loader ?
                            <img src={img_8} className="hoverEff" alt="logo3" onClick={() => onRefreshTables()} title="Tables Refresh" />
                            : <div className="loader_table_div">
                                <div className="loader_table"></div>
                            </div>}
                    </div>
                </nav >
                {/* =================================================================== New - END ==================================================================== */}
            </div>


            {!singleClick &&
                <div className="col-12 limi_filter_media_">
                    <nav className="lobby-top-nav device_media_margin_left" style={{ display: props.showTourneyLobby ? 'none' : 'flex', position: 'relative' }}>
                        <div className="df_al col-3 device_media">
                            {/* =================================================================== New - START ==================================================================== */}
                            {/* <div className="m_l_10 m_r_10 font_15 text-style-shadow">
                                Games:
                            </div> */}

                            <div className="sec-center" style={{ marginLeft: '-50px' }}>
                                <input className="dropdown" type="checkbox" onClick={(e) => onDropDown(e)} id="dropdown_games" style={{ opacity: "0" }} name="dropdown_for_games" />
                                <label className="for-dropdown filterhover" id="lable-dropdown-games" htmlFor="dropdown_games" >
                                    <span className="lableHead">Game Type</span>
                                    <span className="fd overflow_ellips">
                                        {/* {((lobbyFilter === "Cash_Games" ? (gameTypeFilterSelection === "All" ? "All Games" : UM.textFormat(gameTypeFilterSelection)) : lobbyFilter === "Tournaments" ? tourneyGameTypeFilterSelection === "All" ? "All Games" : UM.textFormat(tourneyGameTypeFilterSelection) : sitgoGameTypeFilterSelection === "All" ? "All Games" : UM.textFormat(sitgoGameTypeFilterSelection)))} */}
                                        {lobbyFilter === "Cash_Games" ? UM.textFormat(gameTypeFilterSelection) : lobbyFilter === "Tournaments" ? UM.textFormat(tourneyGameTypeFilterSelection) : UM.textFormat(sitgoGameTypeFilterSelection)}
                                    </span>
                                    <span className="uil uil-arrow-down">
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                            <path d="M417-834v466L215-570l-89 90 354 354 354-354-89-90-202 202v-466H417Z" />
                                        </svg> */}

                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                                        </svg>
                                    </span>
                                </label>
                                <div className="section-dropdown" style={{ width: 'max-content' }}>
                                    <div className="menu_body">
                                        <div className="game_type_filter game_filter_dropdown">
                                            <ul>
                                                <li>
                                                    <label >
                                                        All  <input type="radio" name={lobbyFilter === "Cash_Games" ? "game_filter_desk" : lobbyFilter === "Tournaments" ? "tourney_game_filter_desk" : "sitgo_game_filter_desk"} value="All" checked={lobbyFilter === "Cash_Games" ? gameTypeFilterSelection === "All" : lobbyFilter === "Tournaments" ? tourneyGameTypeFilterSelection === "All" : sitgoGameTypeFilterSelection === "All"} onChange={(e) => onSetGameType(e)} />
                                                    </label>
                                                </li>
                                                <li>
                                                    <label >
                                                        Texas Hold'em <input type="radio" name={lobbyFilter === "Cash_Games" ? "game_filter_desk" : lobbyFilter === "Tournaments" ? "tourney_game_filter_desk" : "sitgo_game_filter_desk"} value="TEXAS_HOLDEM" checked={lobbyFilter === "Cash_Games" ? gameTypeFilterSelection === "TEXAS_HOLDEM" : lobbyFilter === "Tournaments" ? tourneyGameTypeFilterSelection === "TEXAS_HOLDEM" : sitgoGameTypeFilterSelection === "TEXAS_HOLDEM"} onChange={(e) => onSetGameType(e)} />
                                                    </label>
                                                </li>
                                                <li>
                                                    <label >
                                                        Hold'em Short Deck <input type="radio" name={lobbyFilter === "Cash_Games" ? "game_filter_desk" : lobbyFilter === "Tournaments" ? "tourney_game_filter_desk" : "sitgo_game_filter_desk"} value="HOLDEM_SHORT_DECK" checked={lobbyFilter === "Cash_Games" ? gameTypeFilterSelection === "HOLDEM_SHORT_DECK" : lobbyFilter === "Tournaments" ? tourneyGameTypeFilterSelection === "HOLDEM_SHORT_DECK" : sitgoGameTypeFilterSelection === "HOLDEM_SHORT_DECK"} onChange={(e) => onSetGameType(e)} />
                                                    </label>
                                                </li>
                                                <li>
                                                    <label >
                                                        Omaha <input type="radio" name={lobbyFilter === "Cash_Games" ? "game_filter_desk" : lobbyFilter === "Tournaments" ? "tourney_game_filter_desk" : "sitgo_game_filter_desk"} value="OMAHA" checked={lobbyFilter === "Cash_Games" ? gameTypeFilterSelection === "OMAHA" : lobbyFilter === "Tournaments" ? tourneyGameTypeFilterSelection === "OMAHA" : sitgoGameTypeFilterSelection === "OMAHA"} onChange={(e) => onSetGameType(e)} />
                                                    </label>
                                                </li>
                                                <li>
                                                    <label >
                                                        Five Card Omaha <input type="radio" name={lobbyFilter === "Cash_Games" ? "game_filter_desk" : lobbyFilter === "Tournaments" ? "tourney_game_filter_desk" : "sitgo_game_filter_desk"} value="OMAHA_FIVE_CARDS" checked={lobbyFilter === "Cash_Games" ? gameTypeFilterSelection === "OMAHA_FIVE_CARDS" : lobbyFilter === "Tournaments" ? tourneyGameTypeFilterSelection === "OMAHA_FIVE_CARDS" : sitgoGameTypeFilterSelection === "OMAHA_FIVE_CARDS"} onChange={(e) => onSetGameType(e)} />
                                                    </label>
                                                </li>
                                                <li>
                                                    <label >
                                                        Six Card Omaha <input type="radio" name={lobbyFilter === "Cash_Games" ? "game_filter_desk" : lobbyFilter === "Tournaments" ? "tourney_game_filter_desk" : "sitgo_game_filter_desk"} value="OMAHA_SIX_CARDS" checked={lobbyFilter === "Cash_Games" ? gameTypeFilterSelection === "OMAHA_SIX_CARDS" : lobbyFilter === "Tournaments" ? tourneyGameTypeFilterSelection === "OMAHA_SIX_CARDS" : sitgoGameTypeFilterSelection === "OMAHA_SIX_CARDS"} onChange={(e) => onSetGameType(e)} />
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div >
                            {/* =================================================================== New - END ==================================================================== */}
                        </div>


                        <div className="col-lg-9 col-sm-12 col-md-12 col-xl-6 col-xxl-6 lobby_filter_tab">
                            {/* =================================================================== New - START ==================================================================== */}
                            {lobbyFilter === "Cash_Games" ?
                                <>
                                    <div className="fd filter_div" >
                                        <span>Limit :</span>

                                        <button className={limitState === "All" ? "active hoverEff" : "button-46 hoverEff"} role="button" onClick={() => onSetLimit("All")}>
                                            <span className="text">All</span>
                                        </button>

                                        <button className={limitState === "LIMIT" ? "active hoverEff" : "button-46 hoverEff"} role="button" onClick={() => onSetLimit("LIMIT")}>
                                            <span className="text">Limit</span>
                                        </button>

                                        <button className={limitState === "POT_LIMIT" ? "active hoverEff" : "button-46 hoverEff"} role="button" onClick={() => onSetLimit("POT_LIMIT")}>
                                            <span className="text">Pot Limit</span>
                                        </button>
                                        <button className={limitState === "NO_LIMIT" ? "active hoverEff" : "button-46 hoverEff"} role="button" onClick={() => onSetLimit("NO_LIMIT")}>
                                            <span className="text">No Limit</span>
                                        </button>
                                        {/* <button type="button" className={limitState === "All" ? "active hoverEff" : "hoverEff"} onClick={() => onSetLimit("All")} >All</button>
                                        <button type="button" className={limitState === "LIMIT" ? "active hoverEff" : "hoverEff"} onClick={() => onSetLimit("LIMIT")} >Limit</button>
                                        <button type="button" className={limitState === "POT_LIMIT" ? "active hoverEff" : "hoverEff"} onClick={() => onSetLimit("POT_LIMIT")}>Pot Limit</button>
                                        <button type="button" className={limitState === "NO_LIMIT" ? "active hoverEff" : "hoverEff"} onClick={() => onSetLimit("NO_LIMIT")}>No Limit</button> */}
                                    </div>
                                    <div className="fd filter_div" >
                                        <span>Stakes :</span>
                                        <button type="button" className={stakeState === "All" ? "active hoverEff" : "button-46 hoverEff"} onClick={() => onSetStakes("All")}>
                                            <span className="text">All</span>
                                        </button>
                                        <button type="button" className={stakeState === "LOW" ? "active hoverEff" : "button-46 hoverEff"} onClick={() => onSetStakes("LOW")}>
                                            <span className="text">Low</span>
                                        </button>
                                        <button type="button" className={stakeState === "MEDIUM" ? "active hoverEff" : "button-46 hoverEff"} onClick={() => onSetStakes("MEDIUM")}>
                                            <span className="text">Medium</span>
                                        </button>
                                        <button type="button" className={stakeState === "HIGH" ? "active hoverEff" : "button-46 hoverEff"} onClick={() => onSetStakes("HIGH")}>
                                            <span className="text">High</span>
                                        </button>
                                    </div>
                                </> : lobbyFilter === "Tournaments" ?
                                    <div className="fd filter_div" >
                                        <button type="button" className={tourneyOpt === "All" ? "active hoverEff" : "button-46 hoverEff"} onClick={() => onSetTourneyType("All")}>
                                            <span className="text">All</span>
                                        </button>
                                        <button type="button" className={tourneyOpt === "REGULAR" ? "active hoverEff" : "button-46 hoverEff"} onClick={() => onSetTourneyType("REGULAR")}>
                                            <span className="text">Regular</span>
                                        </button>
                                        <button type="button" className={tourneyOpt === "GUARANTEED" ? "active hoverEff" : "button-46 hoverEff"} onClick={() => onSetTourneyType("GUARANTEED")}>
                                            <span className="text">Guaranteed</span>
                                        </button>
                                        <button type="button" className={tourneyOpt === "FREEROLL" ? "active hoverEff" : "button-46 hoverEff"} onClick={() => onSetTourneyType("FREEROLL")}>
                                            <span className="text">Freeroll</span>
                                        </button>
                                        <button type="button" className={tourneyOpt === "SATELLITES_ONLY" ? "active hoverEff" : "button-46 hoverEff"} onClick={() => onSetTourneyType("SATELLITES_ONLY")}>
                                            <span className="text">Satellites</span>
                                        </button>
                                        <button type="button" className={tourneyOpt === "MAIN_EVENTS_ONLY" ? "active hoverEff" : "button-46 hoverEff"} onClick={() => onSetTourneyType("MAIN_EVENTS_ONLY")}>
                                            <span className="text">Events</span>
                                        </button>
                                    </div> :
                                    <div className="fd filter_div" >
                                        <button type="button" className={sit_goOpt === "All" ? "active hoverEff" : "button-46 hoverEff"} onClick={() => onSetSitgoTable("All")}>
                                            <span className="text">All</span>
                                        </button>
                                        <button type="button" className={sit_goOpt === "SINGLE" ? "active hoverEff" : "button-46 hoverEff"} onClick={() => onSetSitgoTable("SINGLE")}>
                                            <span className="text">Single Table</span>
                                        </button>
                                        <button type="button" className={sit_goOpt === "MULTI" ? "active hoverEff" : "button-46 hoverEff"} onClick={() => onSetSitgoTable("MULTI")}>
                                            <span className="text">Multi Table</span>
                                        </button>
                                        <button type="button" className={sit_goOpt === "HEADSUP" ? "active hoverEff" : "button-46 hoverEff"} onClick={() => onSetSitgoTable("HEADSUP")}>
                                            <span className="text">Heads Up</span>
                                        </button>
                                        <button type="button" className={sit_goOpt === "SATELLITES_ONLY" ? "active hoverEff" : "button-46 hoverEff"} onClick={() => onSetSitgoTable("SATELLITES_ONLY")}>
                                            <span className="text">Satellites</span>
                                        </button>
                                    </div>
                            }
                            {/* =================================================================== New - END ==================================================================== */}
                        </div>


                        <div className="col-3 df" style={{ justifyContent: 'flex-end' }}>
                            {/* =================================================================== New - START ==================================================================== */}
                            <div className="lobby_active_icon hide_empty_upC_div" >
                                {lobbyFilter === "Cash_Games" ?
                                    (
                                        <>
                                            <b> Hide : </b>
                                            <div className="m_l_5 active_game_filters" style={{ flexDirection: 'row' }}>
                                                <div className="df">
                                                    <label className="hide-full-cls">
                                                        Full <input type="checkbox" className="fullEmpt" checked={ativeFullFilter} style={{ left: 'unset', opacity: 'unset' }} onChange={() => onSetHideEmptyUpcomFilter("FULL")} />
                                                    </label>
                                                    <label className="">
                                                        Empty <input type="checkbox" className="fullEmpt" checked={ativeEmptyFilter} style={{ left: 'unset', opacity: 'unset' }} onChange={() => onSetHideEmptyUpcomFilter("EMPTY")} />
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                    ) :
                                    (<div className="active_game_filters">
                                        <label className="">
                                            Show Upcoming Only <input type="checkbox" className="fullEmpt" checked={lobbyFilter === "Tournaments" ? ativeTourneyFilter : ativeSitGoFilter} style={{ left: 'unset', opacity: 'unset' }} onChange={() => onSetHideEmptyUpcomFilter("UPCOMMING")} />
                                        </label>
                                    </div>)
                                }
                            </div>
                            {/* =================================================================== New - END ==================================================================== */}
                        </div>
                    </nav>
                </div>
            }

            {singleClick &&
                <>
                    <div className="game_type_filter_cover" id="game_type_filter" onClick={(e) => onClosetheFilterPopup(e)}>
                        {/* ===================================================================  NEW MOBILE - FILTER - START ==================================================================== */}
                        <div className="game_type_filter w_uset" >
                            <ul>
                                <li>
                                    <label >
                                        All  <input type="radio" name={lobbyFilter === "Cash_Games" ? "game_filter_desk" : lobbyFilter === "Tournaments" ? "tourney_game_filter_desk" : "sitgo_game_filter_desk"} value="All" checked={lobbyFilter === "Cash_Games" ? gameTypeFilterSelection === "All" : lobbyFilter === "Tournaments" ? tourneyGameTypeFilterSelection === "All" : sitgoGameTypeFilterSelection === "All"} onChange={(e) => onSetGameType(e)} />
                                    </label>
                                </li>
                                <li>
                                    <label >
                                        Texas Hold'em <input type="radio" name={lobbyFilter === "Cash_Games" ? "game_filter_desk" : lobbyFilter === "Tournaments" ? "tourney_game_filter_desk" : "sitgo_game_filter_desk"} value="TEXAS_HOLDEM" checked={lobbyFilter === "Cash_Games" ? gameTypeFilterSelection === "TEXAS_HOLDEM" : lobbyFilter === "Tournaments" ? tourneyGameTypeFilterSelection === "TEXAS_HOLDEM" : sitgoGameTypeFilterSelection === "TEXAS_HOLDEM"} onChange={(e) => onSetGameType(e)} />
                                    </label>
                                </li>
                                <li>
                                    <label >
                                        Hold'em Short Deck <input type="radio" name={lobbyFilter === "Cash_Games" ? "game_filter_desk" : lobbyFilter === "Tournaments" ? "tourney_game_filter_desk" : "sitgo_game_filter_desk"} value="HOLDEM_SHORT_DECK" checked={lobbyFilter === "Cash_Games" ? gameTypeFilterSelection === "HOLDEM_SHORT_DECK" : lobbyFilter === "Tournaments" ? tourneyGameTypeFilterSelection === "HOLDEM_SHORT_DECK" : sitgoGameTypeFilterSelection === "HOLDEM_SHORT_DECK"} onChange={(e) => onSetGameType(e)} />
                                    </label>
                                </li>
                                <li>
                                    <label >
                                        Omaha <input type="radio" name={lobbyFilter === "Cash_Games" ? "game_filter_desk" : lobbyFilter === "Tournaments" ? "tourney_game_filter_desk" : "sitgo_game_filter_desk"} value="OMAHA" checked={lobbyFilter === "Cash_Games" ? gameTypeFilterSelection === "OMAHA" : lobbyFilter === "Tournaments" ? tourneyGameTypeFilterSelection === "OMAHA" : sitgoGameTypeFilterSelection === "OMAHA"} onChange={(e) => onSetGameType(e)} />
                                    </label>
                                </li>
                                <li>
                                    <label >
                                        Five Card Omaha <input type="radio" name={lobbyFilter === "Cash_Games" ? "game_filter_desk" : lobbyFilter === "Tournaments" ? "tourney_game_filter_desk" : "sitgo_game_filter_desk"} value="OMAHA_FIVE_CARDS" checked={lobbyFilter === "Cash_Games" ? gameTypeFilterSelection === "OMAHA_FIVE_CARDS" : lobbyFilter === "Tournaments" ? tourneyGameTypeFilterSelection === "OMAHA_FIVE_CARDS" : sitgoGameTypeFilterSelection === "OMAHA_FIVE_CARDS"} onChange={(e) => onSetGameType(e)} />
                                    </label>
                                </li>
                                <li>
                                    <label >
                                        Six Card Omaha <input type="radio" name={lobbyFilter === "Cash_Games" ? "game_filter_desk" : lobbyFilter === "Tournaments" ? "tourney_game_filter_desk" : "sitgo_game_filter_desk"} value="OMAHA_SIX_CARDS" checked={lobbyFilter === "Cash_Games" ? gameTypeFilterSelection === "OMAHA_SIX_CARDS" : lobbyFilter === "Tournaments" ? tourneyGameTypeFilterSelection === "OMAHA_SIX_CARDS" : sitgoGameTypeFilterSelection === "OMAHA_SIX_CARDS"} onChange={(e) => onSetGameType(e)} />
                                    </label>
                                </li>
                            </ul>
                        </div>
                        {/* =================================================================== NEW MOBILE - FILTER - START ==================================================================== */}
                    </div>

                    <div className="game_type_filter_cover" id="sort_fliter_mobile" style={{ display: mobileGameFilter === "show" ? 'flex' : 'none' }} onClick={(e) => onClosetheFilterPopup(e)}>
                        {/* ===================================================================  NEW MOBILE - FILTER - START ==================================================================== */}
                        <div className="game_type_filter w_uset">
                            <ul>
                                <li>
                                    <label>
                                        {lobbyFilter === "Cash_Games" ? "No Sort" : "No Sort"}
                                        <input type="radio" name="sort_filter" value={"No_Sort"} checked={lobbyFilter === "Cash_Games" ? stakesSortFilter === "No_Sort" : lobbyFilter === "Tournaments" ? tourneyBuyInFilter === "No_Sort" : sitgoBuyInFilter === "No_Sort"} onChange={(e) => onSetStakeFilter(e)} />
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        {lobbyFilter === "Cash_Games" ? "Sort by Low Stakes" : "Buy-in Ascending"}
                                        <input type="radio" name="sort_filter" value={lobbyFilter === "Cash_Games" ? "Sort_by_Low_Stakes" : "Buy_in_Ascending"} checked={lobbyFilter === "Cash_Games" ? stakesSortFilter === "Sort_by_Low_Stakes" : lobbyFilter === "Tournaments" ? tourneyBuyInFilter === "Buy_in_Ascending" : sitgoBuyInFilter === "Buy_in_Ascending"} onChange={(e) => onSetStakeFilter(e)} />
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        {lobbyFilter === "Cash_Games" ? "Sort by High Stakes" : "Buy-in Descending"}
                                        <input type="radio" name="sort_filter" value={lobbyFilter === "Cash_Games" ? "Sort_by_High_Stakes" : "Buy_in_Descending"} checked={lobbyFilter === "Cash_Games" ? stakesSortFilter === "Sort_by_High_Stakes" : lobbyFilter === "Tournaments" ? tourneyBuyInFilter === "Buy_in_Descending" : sitgoBuyInFilter === "Buy_in_Descending"} onChange={(e) => onSetStakeFilter(e)} />
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        {lobbyFilter === "Cash_Games" ? "Sort by Low Seats" : "Status Ascending"}
                                        <input type="radio" name="sort_filter" value={lobbyFilter === "Cash_Games" ? "Sort_by_Low_Seats" : lobbyFilter === "Tournaments" ? "Tourney_Status_Ascending" : "Sitgo_Status_Ascending"} checked={lobbyFilter === "Cash_Games" ? seatsSortFilter === "Sort_by_Low_Seats" : lobbyFilter === "Tournaments" ? tourneyBuyInSortFilter === "Tourney_Status_Ascending" : sitgoBuyInSortFilter === "Sitgo_Status_Ascending"} onChange={(e) => onSetSeatsFilter(e)} />
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        {lobbyFilter === "Cash_Games" ? "Sort by High Seats" : "Status Descending"}
                                        <input type="radio" name="sort_filter" value={lobbyFilter === "Cash_Games" ? "Sort_by_High_Seats" : lobbyFilter === "Tournaments" ? "Tourney_Status_Descending" : "Sitgo_Status_Descending"} checked={lobbyFilter === "Cash_Games" ? seatsSortFilter === "Sort_by_High_Seats" : lobbyFilter === "Tournaments" ? tourneyBuyInSortFilter === "Tourney_Status_Descending" : sitgoBuyInSortFilter === "Sitgo_Status_Descending"} onChange={(e) => onSetSeatsFilter(e)} />
                                    </label>
                                </li>
                            </ul>
                        </div>
                        {/* ===================================================================  NEW MOBILE - FILTER - END ==================================================================== */}
                    </div>
                </>
            }


            <div className="game_type_filter_cover" id="game_type_filter_1" onClick={(e) => onClosetheFilterPopup(e)}>
                {/* ===================================================================  NEW DESCKTOP - FILTER - START ==================================================================== */}
                <div className="game_type_filter w_uset">
                    <ul>
                        <li>
                            <label>
                                All
                                <input type="radio" name="All" checked={lobbyFilter === "Cash_Games" ? seats === "All" : lobbyFilter === "Tournaments" ? tourneyOpt === "All" : sit_goOpt === "All"} onChange={() => { lobbyFilter === "Cash_Games" ? onSetSeats("All") : lobbyFilter === "Tournaments" ? onSetTourneyType("All") : onSetSitgoTable("All") }} />
                            </label>
                        </li>
                        <li>
                            <label>
                                {lobbyFilter === "Cash_Games" ? "2 (1-on-1)" : lobbyFilter === "Tournaments" ? "Regular" : "Single Table"}
                                <input type="radio" name="1_on_1" checked={lobbyFilter === "Cash_Games" ? seats === "1_on_1" : lobbyFilter === "Tournaments" ? tourneyOpt === "REGULAR" : sit_goOpt === "SINGLE"} onChange={() => { lobbyFilter === "Cash_Games" ? onSetSeats("1_on_1") : lobbyFilter === "Tournaments" ? onSetTourneyType("REGULAR") : onSetSitgoTable("SINGLE") }} />
                            </label>
                        </li>
                        <li>
                            <label>
                                {lobbyFilter === "Cash_Games" ? "6-max" : lobbyFilter === "Tournaments" ? "Guaranteed" : "Multi Table"}
                                <input type="radio" name="6_max" checked={lobbyFilter === "Cash_Games" ? seats === "6_max" : lobbyFilter === "Tournaments" ? tourneyOpt === "GUARANTEED" : sit_goOpt === "MULTI"} onChange={() => { lobbyFilter === "Cash_Games" ? onSetSeats("6_max") : lobbyFilter === "Tournaments" ? onSetTourneyType("GUARANTEED") : onSetSitgoTable("MULTI") }} />
                            </label>
                        </li>
                        <li>
                            <label>
                                {lobbyFilter === "Cash_Games" ? "9 - 10" : lobbyFilter === "Tournaments" ? "Freeroll" : "Heads Up"}
                                <input type="radio" name="9_to_10" checked={lobbyFilter === "Cash_Games" ? seats === "9_to_10" : lobbyFilter === "Tournaments" ? tourneyOpt === "FREEROLL" : sit_goOpt === "HEADSUP"} onChange={() => { lobbyFilter === "Cash_Games" ? onSetSeats("9_to_10") : lobbyFilter === "Tournaments" ? onSetTourneyType("FREEROLL") : onSetSitgoTable("HEADSUP") }} />
                            </label>
                        </li>
                    </ul>
                </div>
                {/* ===================================================================  NEW DESCKTOP - FILTER - END ==================================================================== */}
            </div>

            <div className="game_type_filter_cover" id="Stake_Sort_Fliter" onClick={(e) => onClosetheFilterPopup(e)}>
                {/* =================================================================== NEW DESCKTOP - FILTER - START ==================================================================== */}
                <div className="game_type_filter w_uset">
                    <ul>
                        <li>
                            <label>
                                {lobbyFilter === "Cash_Games" ? "No Sort" : "No Sort"}
                                <input type="radio" name={lobbyFilter === "Cash_Games" ? "stake_sort_filter" : lobbyFilter === "Tournaments" ? "tourney_buyIn_filter" : "sitgo_buyIn_filter"} value={"No_Sort"} checked={lobbyFilter === "Cash_Games" ? stakesSortFilter === "No_Sort" : lobbyFilter === "Tournaments" ? tourneyBuyInFilter === "No_Sort" : sitgoBuyInFilter === "No_Sort"} onChange={(e) => onSetStakeFilter(e)} />
                            </label>
                        </li>
                        <li>
                            <label>
                                {lobbyFilter === "Cash_Games" ? "Sort by Low Stakes" : "Buy-in Ascending"}
                                <input type="radio" name={lobbyFilter === "Cash_Games" ? "stake_sort_filter" : lobbyFilter === "Tournaments" ? "tourney_buyIn_filter" : "sitgo_buyIn_filter"} value={lobbyFilter === "Cash_Games" ? "Sort_by_Low_Stakes" : "Buy_in_Ascending"} checked={lobbyFilter === "Cash_Games" ? stakesSortFilter === "Sort_by_Low_Stakes" : lobbyFilter === "Tournaments" ? tourneyBuyInFilter === "Buy_in_Ascending" : sitgoBuyInFilter === "Buy_in_Ascending"} onChange={(e) => onSetStakeFilter(e)} />
                            </label>
                        </li>
                        <li>
                            <label>
                                {lobbyFilter === "Cash_Games" ? "Sort by High Stakes" : "Buy-in Descending"}
                                <input type="radio" name={lobbyFilter === "Cash_Games" ? "stake_sort_filter" : lobbyFilter === "Tournaments" ? "tourney_buyIn_filter" : "sitgo_buyIn_filter"} value={lobbyFilter === "Cash_Games" ? "Sort_by_High_Stakes" : "Buy_in_Descending"} checked={lobbyFilter === "Cash_Games" ? stakesSortFilter === "Sort_by_High_Stakes" : lobbyFilter === "Tournaments" ? tourneyBuyInFilter === "Buy_in_Descending" : sitgoBuyInFilter === "Buy_in_Descending"} onChange={(e) => onSetStakeFilter(e)} />
                            </label>
                        </li>
                    </ul>
                </div>
                {/* =================================================================== NEW DESCKTOP - FILTER - END ==================================================================== */}
            </div>

            <div className="game_type_filter_cover" id="Seats_Sort_Fliter" onClick={(e) => onClosetheFilterPopup(e)}>
                {/* =================================================================== NEW DESCKTOP - FILTER - START ==================================================================== */}
                <div className="game_type_filter w_uset">
                    <ul>
                        <li>
                            <label>
                                {lobbyFilter === "Cash_Games" ? "No Sort" : "No Sort"}
                                <input type="radio" name="seat_sort_filter" value="No_Sort" checked={lobbyFilter === "Cash_Games" ? seatsSortFilter === "No_Sort" : lobbyFilter === "Tournaments" ? tourneyBuyInSortFilter === "No_Sort" : sitgoBuyInSortFilter === "No_Sort"} onChange={(e) => onSetSeatsFilter(e)} />
                            </label>
                        </li>
                        <li>
                            <label>
                                {lobbyFilter === "Cash_Games" ? "Sort by Low Seats" : "Status Ascending"}
                                <input type="radio" name="seat_sort_filter" value={lobbyFilter === "Cash_Games" ? "Sort_by_Low_Seats" : lobbyFilter === "Tournaments" ? "Tourney_Status_Ascending" : "Sitgo_Status_Ascending"} checked={lobbyFilter === "Cash_Games" ? seatsSortFilter === "Sort_by_Low_Seats" : lobbyFilter === "Tournaments" ? tourneyBuyInSortFilter === "Tourney_Status_Ascending" : sitgoBuyInSortFilter === "Sitgo_Status_Ascending"} onChange={(e) => onSetSeatsFilter(e)} />
                            </label>
                        </li>
                        <li>
                            <label>
                                {lobbyFilter === "Cash_Games" ? "Sort by High Seats" : "Status Descending"}
                                <input type="radio" name="seat_sort_filter" value={lobbyFilter === "Cash_Games" ? "Sort_by_High_Seats" : lobbyFilter === "Tournaments" ? "Tourney_Status_Descending" : "Sitgo_Status_Descending"} checked={lobbyFilter === "Cash_Games" ? seatsSortFilter === "Sort_by_High_Seats" : lobbyFilter === "Tournaments" ? tourneyBuyInSortFilter === "Tourney_Status_Descending" : sitgoBuyInSortFilter === "Sitgo_Status_Descending"} onChange={(e) => onSetSeatsFilter(e)} />
                            </label>
                        </li>
                    </ul>
                </div>
                {/* =================================================================== NEW DESCKTOP - FILTER - END ==================================================================== */}
            </div>
        </main >
    );
};

class FilterTabs extends React.Component {
    constructor(props) {
        super(props);
        this._dateUtils = new DateUtils();
        this.state = {
            modes: "CASH",
            games: "TEXAS_HOLDEM|HOLDEM_SHORT_DECK|OMAHA|OMAHA_HIGH_LOW|HOLDEM_BLACKJACK|REVERSE_HOLDEM|OMAHA_FIVE_CARDS|OMAHA_SIX_CARDS",
            seats: "All",
            // seats: "2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10",
            limit: "All",
            stake: "All",
            full: false,
            empty: false,

            // tourney_games: "TEXAS_HOLDEM|OMAHA|OMAHA_HIGH_LOW|OMAHA_FIVE_CARDS|OMAHA_SIX_CARDS",
            tourney_games: "TEXAS_HOLDEM|HOLDEM_SHORT_DECK|OMAHA|OMAHA_HIGH_LOW|HOLDEM_BLACKJACK|REVERSE_HOLDEM|OMAHA_FIVE_CARDS|OMAHA_SIX_CARDS",
            tourney_types: "All",
            tourney_satellities: "HIDE",
            tourney_upcomming: false,

            sitgo_games: "TEXAS_HOLDEM|HOLDEM_SHORT_DECK|OMAHA|OMAHA_HIGH_LOW|HOLDEM_BLACKJACK|REVERSE_HOLDEM|OMAHA_FIVE_CARDS|OMAHA_SIX_CARDS",
            sitgo_tables: "All",
            sitgo_satellities: "HIDE",
            sitgo_upcomming: false,
        };
    }


    setFilters(group, action, lobbyFilter) {
        // console.log(group, action, lobbyFilter)
        let baseRequest = {
            modes: this.state.modes,
            games: this.state.games,
            id: this._dateUtils.getUniqueIdentifier()
        };

        if (lobbyFilter === "Cash_Games") {
            switch (group) {
                case "GAMES":
                    this.setState({
                        games: action
                    }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    break;
                case "MODES":
                    this.setState({
                        modes: action
                    }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    break;
                case "LIMITS":
                    this.setState({ limit: action }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    break;
                case "STAKES":
                    this.setState({ stake: action }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    break;
                case "SEATS":
                    this.setState({ seats: action }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    break;
                case "ACTIVETABLES":
                    let { type, value } = action;
                    if (type === "FULL") {
                        this.setState({ full: value }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    } else if (type === "EMPTY") {
                        this.setState({ empty: value }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    } else if (type === "UPCOMING") {
                        this.setState({ upComming: value }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    };
                    break;
                case "REFRESH":
                    this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter);
                    break;
                default:
                    break;
            }
        } else if (lobbyFilter === "Tournaments") {
            switch (group) {
                case "GAMES":
                    this.setState({
                        tourney_games: action
                    }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    break;
                case "MODES":
                    this.setState({
                        modes: action
                    }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    break;
                case "TYPES":
                    this.setState({
                        tourney_types: action,
                        tourney_satellities: "HIDE"
                    }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    break;
                case "SATTELITES":

                    this.setState({
                        tourney_satellities: action
                    }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    break;
                case "ACTIVETABLES":
                    let { value } = action;
                    this.setState({
                        tourney_upcomming: value
                    }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    break;
                case "REFRESH":
                    this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter);
                    break;
                default:
                    break;

            }
        } else if (lobbyFilter === "Sit_Go") {
            switch (group) {
                case "GAMES":
                    this.setState({
                        sitgo_games: action
                    }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    break;
                case "MODES":
                    this.setState({
                        modes: action
                    }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    break;
                case "TABLES":
                    this.setState({
                        sitgo_tables: action,
                        sitgo_satellities: "HIDE"
                    }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    break;
                case "SATTELITES":
                    this.setState({
                        sitgo_satellities: action
                    }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    break;
                case "ACTIVETABLES":
                    let { value } = action;
                    this.setState({
                        sitgo_upcomming: value
                    }, () => this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter));
                    break;
                case "REFRESH":
                    this.updateRequest({ ...baseRequest, ...this.state }, lobbyFilter);
                    break;
                default:
                    break;

            }
        }
    }

    updateRequest(params, lobbyFilter) {
        // console.log(params, lobbyFilter);
        let tablerequest;
        if (lobbyFilter === "Cash_Games") {
            const { id, modes, games, limit, stake, seats, full, empty } = params;
            let attributes = `id="${id}" modes="${modes}" games="${games}" ${limit !== 'All' ? `limits="${limit !== "All" ? limit : ""}"` : ""} ${stake !== 'All' ? `stakes="${stake === "LOW" ? "MICRO|LOW" : stake}"` : ""} ${seats !== 'All' ? `seats="${seats !== "All" ? seats : ""}"` : ""} ${full && empty ? `hide="FULL|EMPTY"` : full ? `hide="FULL"` : empty ? `hide="EMPTY"` : ""}`
            tablerequest = `<GetSingleTables ${attributes} />`;
        }
        else if (lobbyFilter === "Tournaments") {
            const { id, modes, tourney_games, tourney_types, tourney_satellities, tourney_upcomming } = params;
            // let attributes = `id="${id}" modes="${modes}" games="${tourney_games}" ${tourney_types !== 'All' ? `type="${tourney_types !== "All" ? tourney_types : ""}"` : ""}  ${tourney_upcomming ? `status="ANNOUNCED|REGISTERING|SEATING|LATE_REG"` : ""} tournament="SCHEDULED|LIVE"`
            let attributes = `id="${id}" modes="${modes}" games="${tourney_games}" ${tourney_types !== 'All' ? `type="${tourney_types !== "All" ? tourney_types : ""}"` : ""} ${tourney_satellities !== "HIDE" ? `satellitesFilter="${tourney_satellities}"` : ""}  ${tourney_upcomming ? `status="ANNOUNCED|REGISTERING|SEATING|LATE_REG"` : ""} tournament="SCHEDULED|LIVE"`
            tablerequest = `<GetTournaments ${attributes}/>`
        }
        // else if (lobbyFilter === "Tournaments") {
        //     const { id, modes, tourney_games, tourney_types, tourney_satellities, tourney_upcomming } = params;
        //     let attributes = `id="${id}" modes="${modes}" games="${tourney_games}" ${tourney_types !== 'All' ? `type="${tourney_types !== "All" ? tourney_types : ""}"` : ""} satellitesFilter="${tourney_satellities}" ${tourney_upcomming ? `status="ANNOUNCED|REGISTERING|SEATING|LATE_REG"` : ""} tournament="SCHEDULED|LIVE"`
        //     tablerequest = `<GetTournaments ${attributes}/>`
        // } 
        else if (lobbyFilter === "Sit_Go") {
            const { id, modes, sitgo_games, sitgo_tables, sitgo_satellities, sitgo_upcomming } = params;
            let attributes = `id="${id}" modes="${modes}" games="${sitgo_games}" ${sitgo_tables !== 'All' ? `tables="${sitgo_tables}"` : ""} satellitesFilter="${sitgo_satellities}" ${sitgo_upcomming ? `status="ANNOUNCED|REGISTERING|SEATING|LATE_REG"` : ""} tournament="SITANDGO"`
            tablerequest = `<GetTournaments ${attributes}/>`
        }

        if (this.props.network) {
            this.props.network.send(tablerequest);
            this.props.updateRequest(tablerequest);
        }
    }

    render() {
        return (
            <Filters action={this.setFilters.bind(this)} sortTables={this.props.sortTables} showLoader={this.props.showLoader} showProfile={this.props.showProfile} showTourneyLobby={this.props.showTourneyLobby} tableRequest={this.props.tableRequest}
                userdata={this.props} texttorno='TOURNEYS' Limittext='Limit' gametypetext='Game Type' gametext='GAMES' cashier='CASHIER' sit_go='SIT & GO' playerText='Players' tablestext='Tables'
                datas={this.props.datas} setAction={this.props.setAction} openMenu={this.props.openMenu} avtar={this.props.avtar} user={this.props.user} balance={this.props.balance} stars={this.props.stars}
            />
        );
    }
}

export default withTranslation()(FilterTabs)