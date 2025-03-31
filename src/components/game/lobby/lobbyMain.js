import LobbyBase from "./lobbyBase";
import LobbyHeader from "../ui/lobby/lobbyHeader";
import { MainGrid } from "../ui/lobby/Grid/mainGrid";
import { MainGridTourney } from "../ui/lobby/Grid/mainGridTourney";
import { MainGridSitGo } from "../ui/lobby/Grid/mainGridSitGo";
import FilterTabs from "../ui/lobby/filterTabs/filterTabs";
import Alert from "../ui/popUps/alert";
import UM from "../../utils/utilityMethods";
import Config from "../../../config";
import { withTranslation } from 'react-i18next';
import fileName from "../../../jsconfig";
import MyActiveTourCashTables from "../ui/popUps/myactivetourcashtables";
import DateUtils from "../../utils/dateUtils";
import React from "react";
import Profile from "../ui/popUps/profile";
import "../../../css/ui/lobby/lobbyMenu.css";
import activeTables from "../../utils/eventEmitter";
import Close_profile from "../../utils/eventEmitter";
import { getTournamentIcon } from "../../utils/global";
// import Loader from "../../utils/loader";
import Cashier from "../ui/popUps/cashier";
import PlayerlevelInfo from "../ui/popUps/playerLevelInfo";
import { TableDetails } from "./tableDetailsPage";
import TourneyRegistration from "../ui/popUps/tourneyRegistration";
// import Options from "../ui/popUps/settings/Options";
import PokerhandHistory from "../ui/popUps/pokerhandHistory";
import Findplayer from "../ui/popUps/findPlayer";
import MyBuddies from "../ui/popUps/MyBuddies";
import AvatarPopup from "../ui/popUps/AvatarPopup";
// import arrow_icon from "../../../assets/images/lobby_icons/close_miniTable_arrow.svg";
import gsap from "gsap";
// import TableLoader from "../../utils/tablesLoader";
import TableSkeleton from "../../utils/tablesSkeleton";
import BadBeatJackpotPopup from "../ui/popUps/BadBeatJackpotPopup"


// import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


class LobbyMain extends LobbyBase {
    constructor(props) {
        super(props);
        // console.log("lobby Main props are");
        this.state = {
            BgState: {
                opacity: 1,
            },
            data: [],
            gameHistoryErrorMsg: "",
            gametableName: "",
            gametourneyName: "",
            frameCountWidth: "",
            isGetingResponse: "",
            isGetingResponse1: "",
            bbj: "0",
            user: this.props.data.user,
            sid: this.props.data.sid,
            tLobbyName: "",
            tTourneyId: "",
            optionMenu: "",
            logOutHint: false,
            lobbyMiniTableOpenState: false,
            showTopmost: true,
            showTopsecond: true,
            showTourneyLobby: false,
            showProfile: false,
            showLoader: false,
            drop_down_state: false,
            showActiveTables: false,
            showCashierPopUp: false,
            profileshow: false,
            UnRegisterpopup: false,
            showTourneyDetails: false,
            showSitnGoDetails: false,
            activeTableButton: false,
            tourneyTablesTab: false,
            cashTablesTab: false,
            seatAvailble: {
                isSeatsAvailable: true,
                joinWaitingList: false,
            },
            lobbyButton: false,
            frameContainerWidth: 0,
            jackpotData: {
                data: null,
                showPopup: false,
            },
            openLobby_Table: true,
            myLevel: "",
            showTables: "",
            sortType: "",
            stakesFilter: "Sort_by_High_Stakes",
            seatsFilter: "No_Sort",
            tourneyBuyInFilter: "No_Sort",
            tourneyStatusInFilter: "",
            dataTourney: [],
            dataSitGo: [],
            tableData: {
                name: "No Table Selected",
                id: "",
                type: "",
                hands_per_hour: "0",
                average_pot: "0",
                data: [],
                seats: [],
            },
            tourneyData: {
                name: "",
                date: "",
                buyIn: "",
                type: "",
                typeText: "",
                status: "",
                players: "",
                prize: "",
                description: "",
                id: "",
                Tournament_start: "",
                Tournament_cancelled: "",
                status1: "Register"
            },
            sitGoData: {
                name: "",
                date: "",
                buyIn: "",
                type: "",
                typeText: "",
                status: "",
                players: "",
                prize: "",
                description: "",
                id: "",
                Tournament_start: "",
                Tournament_cancelled: "",
                status1: "Register"
            },
            userLogged: "",
            userBalance: "",
            balanceInGame: "",
            playerData: {
                available: "-",
                bonus: "-",
                cashInPlay: "-",
                bonuInPlay: "-",
                tickets: "-",
                tMoney: "-",
                total: "-",
                VIPpoints: "-",
                PLAYMONEY: "-"
            },
            serverInfo: {
                TotalPlayerCount: "0",
                PlayersOnTables: "0",
                ActiveTableCount: "0",
                PlayersOnTournaments: "0",
                ActiveTournamentCount: "0",
                PlayersOnSitandgo: "0",
                ActiveSitandgoCount: "0"
            },
            showMainGridOne: true,
            showMainGridTwo: false,
            showMainGridThree: false,
            showRegistration: false,
            showTDbtn_joinMe: true,
            showTDbtn_seatMe: true,
            showTObtn: false,
            showTTbtn: false,
            showAlert: false,
            alert: {
                lineOne: "",
                lineTwo: "",
            },
            regData: {
                types: [],
                status: "-",
                statusAction: "",
                name: "-",
                balance: "-",
                type: "-",
                id: "",
                tableName: "",
                tableType: ""
            },
            showNewsBox: false,
            news: [],
            showDpSettings: false,
            dpSettings: {
                available: "-",
                left: "-",
                date: "-",
            },
            showLevelInfo: false,
            levelData: {
                level: "-",
                collection1: "-",
                collection2: "-",
                data: [],
            },
            displayStars: {
                levalZero: true,
                levelOne: true,
                levelTwo: true,
                levelThree: true,
                levelFour: true,
                levelFive: true,
                levelSix: true,
                levelSeven: true,
            },

            showOptions: false,
            showMyTables: false,
            myTables: [],
            historyData: [],
            historyDataForReplay: [],
            historyDataNext: [],
            subHistorydata: [],
            showMyTournaments: false,
            myTournaments: [],
            myTournamentsids: [],
            showFindPlayer: false,
            findPlayerData: [],
            showMyBuddies: false,
            myBuddies: [],
            showAvtar: false,
            showpokerHistory: false,
            showCashier: false,
            showOpenTableAlert: false,
            openTableData: { id: undefined, value: undefined },
            time: "00:00",
            newavatar: [],
            avtarId: [],
            Dparray: [],
            myAvatr: "-",
            showRedirectionUrlErr: false,
            avatarList: {},
            selectedTournyLobbyId: "",
            mobileView: false
        };
        this.tableListArray = [];
        this.tourneyListArray = [];
        this.cashierTourneyTables = [];
        this.playerInfo = [];
        this.tableWidth = (this.sWidth - 20) * 0.5;
        this.tableHeight = (this.sHeight - 20) * 0.6;
        this.config = new Config();
        this.DateUtils = new DateUtils();
        this.date = new Date();
        activeTables.on('call_activeTableEmit', this.emitChildMethod);
        Close_profile.on('Close_profile', this.Close_profile_emitChildMethod);
        // activeTables.on('openTourneyLobbyEmit', this.tourneyEmitChildMethod);
    }

    // componentDidMount() {
    //     const handleResize = () => {
    //         console.log("sdfsfsf")
    //         const width = window.innerWidth;
    //         if (width > 992) {
    //             this.setState({ mobileView: false });
    //         } else {
    //             this.setState({ mobileView: true });
    //         }
    //     };
    //     handleResize();
    //     window.addEventListener('resize', handleResize);
    // }

    // componentDidUpdate() {
    //     const width = window.innerWidth;
    //     if (width > 992) {
    //         this.setState({ mobileView: false });
    //     } else {
    //         this.setState({ mobileView: true });
    //     }
    // }


    onPlayerInfo(data) {
        this.playerInfo = [];
        const width = window.innerWidth;
        if (width > 992) {
            this.setState({ mobileView: true });
        } else {
            this.setState({ mobileView: false });
        }
        if (data.hasOwnProperty("PlayerInfo")) {
            let playerData = this.state.playerData;
            let displayStars = this.state.displayStars;
            if (data.PlayerInfo.hasOwnProperty("attr")) {
                this.setState({ userLogged: data.PlayerInfo.attr.nickname });

                if (data.PlayerInfo.attr.level >= 4) {
                    this.setState({ myLevel: "Platinum" });
                } else if (data.PlayerInfo.attr.level >= 3) {
                    this.setState({ myLevel: "Gold" });
                } else if (data.PlayerInfo.attr.level >= 2) {
                    this.setState({ myLevel: "Silver" });
                } else if (data.PlayerInfo.attr.level >= 1) {
                    this.setState({ myLevel: "Bronze" });
                } else if (data.PlayerInfo.attr.level >= 0) {
                    this.setState({ myLevel: "Iron" });
                }
            }
            if (data.PlayerInfo.hasOwnProperty("Balance")) {
                this.getPlayerInfo = data.PlayerInfo;
                let i = 0,
                    cnt = data.PlayerInfo.Balance.length;
                var balance = 0;
                this.playerInfo.push(data.PlayerInfo);
                for (i; i < cnt; i++) {
                    if (data.PlayerInfo.Balance[i].attr.wallet === "COMPPOINTS") {
                        playerData.VIPpoints = data.PlayerInfo.Balance[i].attr.total;
                    }
                    if (data.PlayerInfo.Balance[i].attr.wallet === "PLAYMONEY") {
                        playerData.PLAYMONEY = data.PlayerInfo.Balance[i].attr.total;
                    }
                    if (data.PlayerInfo.Balance[i].attr.wallet === "USD") {
                        this.myUSDbalance = data.PlayerInfo.Balance[i].attr.cash;
                    } else if (data.PlayerInfo.Balance[i].attr.wallet === "CHP") {
                        this.myCHPbalance = data.PlayerInfo.Balance[i].attr.cash;
                    }
                    let bal = {
                        "myCHPbalance": this.myCHPbalance,
                        "myUSDbalance": this.myUSDbalance
                    }
                    this.props.LobbyHandler("player_balance", bal);
                    if (data.PlayerInfo.Balance[i].attr.wallet === data.PlayerInfo.attr["preferred-wallet"]) {
                        localStorage.setItem("currency_symbols", data.PlayerInfo.attr["preferred-wallet"] === "USD" ? "$ " : "")
                        var playerCash = data.PlayerInfo.Balance[i].attr.cash.split(".")[0];
                        var playerBonus = data.PlayerInfo.Balance[i].attr["bonus"].split(".")[0];
                        playerData.available = Number(playerCash) + Number(playerBonus);
                        playerData.cashInPlay = data.PlayerInfo.Balance[i].attr["cash-in-play"];
                        playerData.tMoney = data.PlayerInfo.Balance[i].attr["tournament-money"];
                        playerData.bonus = data.PlayerInfo.Balance[i].attr.bonus;
                        playerData.bonuInPlay = data.PlayerInfo.Balance[i].attr["bonus-in-play"];
                        playerData.total = Number(playerData.available) + Number(playerData.cashInPlay) + Number(playerData.bonus);
                        if (balance < Number(data.PlayerInfo.Balance[i].attr["cash-in-play"])) {
                            balance = Number(data.PlayerInfo.Balance[i].attr["cash-in-play"])
                        }
                    }
                }
                if (playerData.VIPpoints >= 0 && playerData.VIPpoints < 1000) {
                    displayStars.levalZero = false
                }
                else if (playerData.VIPpoints >= 1000 && playerData.VIPpoints < 3000) {
                    displayStars.levelOne = false;
                } else if (playerData.VIPpoints >= 3000 && playerData.VIPpoints < 7000) {
                    displayStars.levelOne = false;
                    displayStars.levelTwo = false;
                } else if (playerData.VIPpoints >= 7000 && playerData.VIPpoints < 10000) {
                    displayStars.levelOne = false;
                    displayStars.levelTwo = false;
                    displayStars.levelThree = false;
                } else if (playerData.VIPpoints >= 10000 && playerData.VIPpoints < 40000) {
                    displayStars.levelOne = false;
                    displayStars.levelTwo = false;
                    displayStars.levelThree = false;
                    displayStars.levelFour = false;
                } else if (playerData.VIPpoints >= 40000 && playerData.VIPpoints < 100000) {
                    displayStars.levelOne = false;
                    displayStars.levelTwo = false;
                    displayStars.levelThree = false;
                    displayStars.levelFour = false;
                    displayStars.levelFive = false;
                } else if (playerData.VIPpoints >= 100000 && playerData.VIPpoints < 200000) {
                    displayStars.levelOne = false;
                    displayStars.levelTwo = false;
                    displayStars.levelThree = false;
                    displayStars.levelFour = false;
                    displayStars.levelFive = false;
                    displayStars.levelSix = false;
                } else if (playerData.VIPpoints >= 200000) {
                    displayStars.levelOne = false;
                    displayStars.levelTwo = false;
                    displayStars.levelThree = false;
                    displayStars.levelFour = false;
                    displayStars.levelFive = false;
                    displayStars.levelSix = false;
                    displayStars.levelSeven = false;
                }
            }
            if (data.PlayerInfo.hasOwnProperty("Tickets")) {
                playerData.tickets = data.PlayerInfo.Tickets.attr.count;
            }
            this.setState({ playerData: playerData });
            this.setState({ displayStars: displayStars });
        }
    }

    onGetavtarList(data) {
        let Avatarid = [];
        if (data.hasOwnProperty("Avatars")) {
            if (Array.isArray(data.Avatars.Avatar)) {

                let con = data.Avatars.Avatar.length;
                for (let i = 0; i < con; i++) {
                    let va = data.Avatars.Avatar[i].attr.id

                    Avatarid.push(va)
                }
            }
        }
        this.setState({ Dparray: Avatarid })
        var path = this.config.URL_Environment.proxy.baseUrl + this.config.URL_Environment.apiPath.getAvatarList_Api;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", path, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("siteid", this.config.URL_Environment.sitIds.sitid);
        try {
            if (`${window.location.hostname}'_wSid'` !== null) {
                xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid);
            } else if (sessionStorage.getItem(`${window.location.hostname}'_sid'`) !== null) {
                xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_sid'`)).sid);
            }
        } catch (e) { console.error(e.message) }
        xhr.addEventListener("load", (e) => {
            this.avtarDataHandlerList(e);
        });
        xhr.send();
    }


    avtarDataHandlerList(data) {
        // let newavatar = this.state.newavatar;
        // newavatar = [];
        // let avtarId = this.state.avtarId;
        try {
            const myAvatar = JSON.parse(data.target.response);
            this.setState({ avatarList: myAvatar });
            // for (let i = 0; i < 25; i++) {
            //     newavatar[i] = myAvatar[i].imageData;
            //     avtarId[i] = myAvatar[i].id;
            // }
            // newavatar.push(myAvatar)
            this.props.LobbyHandler("playerAvatarsList", this.state.avatarList);
            this.setState({ newavatar: this.state.avatarList });
        } catch (error) { console.error(error.message) }
    }


    onServerInfo(data) {
        // console.log(data);
        let serverInfo = this.state.serverInfo;
        if (data.ServerInfo.hasOwnProperty("attr")) {
            serverInfo.TotalPlayerCount = data.ServerInfo.attr["players-count"];
            serverInfo.PlayersOnTables = data.ServerInfo.attr["players-on-tables"];
            serverInfo.ActiveTableCount = data.ServerInfo.attr["active-tables"];
            serverInfo.PlayersOnTournaments = data.ServerInfo.attr["players-in-tournaments"];
            serverInfo.ActiveTournamentCount = data.ServerInfo.attr["active-tournaments"];
            serverInfo.PlayersOnSitandgo = data.ServerInfo.attr["players-in-sitandgo"];
            serverInfo.ActiveSitandgoCount = data.ServerInfo.attr["active-sitandgo"];
            this.setState({ serverInfo: serverInfo });
        }
    }

    onServerTime(data) {
        let time = new Date(parseInt(data.ServerTime.attr.time));
        this.setState({ time: `${time.getHours()} : ${time.getMinutes()}` });
    }

    onGetBadBeatJackpot(data) {
        this.setState({ bbj: data.BadBeatJackpot.attr.amount });
    }

    // sortTables(value, type) {
    //     console.log(value, type);
    //     this.setState({ sortType: value });
    //     switch (value) {
    //         case "Cash_Games":
    //             if (value === "Sort_by_Low_Stakes" || "Sort_by_High_Stakes") {
    //                 this.setState({ stakesFilter: value });
    //             } else if (value === "Sort_by_Low_Seats" || value === "Sort_by_High_Seats") {
    //                 this.setState({ seatsFilter: value });
    //             } else {
    //                 // this.setState({ seatsFilter: value });
    //             }
    //             break;
    //         case "Tournaments":
    //             if (value === "Buy_in_Descending" || value === "Buy_in_Ascending") {
    //                 this.setState({ tourneyBuyInFilter: value });
    //             } else if (value === "Tourney_Status_Ascending" || value === "Tourney_Status_Descending") {
    //                 this.setState({ tourneyStatusInFilter: value });
    //             } else {
    //                 // this.setState({ tourneyStatusInFilter: value });
    //             }
    //             break;
    //         case "Sit_Go":

    //             break;
    //         default:
    //             break
    //     }
    // }


    sortTables(value, type) {
        // console.log(value, type);

        this.setState((prevState) => {
            const newState = { ...prevState };

            const stakeFilters = ["Sort_by_Low_Stakes", "Sort_by_High_Stakes", "No_Sort"];
            const seatFilters = ["Sort_by_Low_Seats", "Sort_by_High_Seats", "No_Sort"];
            const buyInFilters = ["Buy_in_Descending", "Buy_in_Ascending", "No_Sort"];
            const statusFilters = ["Tourney_Status_Ascending", "Tourney_Status_Descending", "No_Sort"];

            switch (type) {
                case "Cash_Games":
                    if (stakeFilters.includes(value)) {
                        newState.stakesFilter = value;

                    }
                    if (seatFilters.includes(value)) {
                        newState.seatsFilter = value;
                    }
                    break;
                case "Tournaments":
                case "Sit_Go":
                    if (buyInFilters.includes(value)) {
                        newState.tourneyBuyInFilter = value;
                    }
                    if (statusFilters.includes(value)) {
                        newState.tourneyStatusInFilter = value;
                    }
                    break;
                default:
                    break;
            }
            return newState;
        });
    }



    isGetingResponse(gameType, gameName, state) {
        // console.log(gameType, gameName, state);
        clearTimeout(this.serverResponseTime);
        this.setState({ isGetingResponse: gameType, isGetingResponse1: gameName });
        this.serverResponseTime = setTimeout(() => {
            if (this.state.isGetingResponse !== "") {
                // this.props.LobbyHandler("activate_loader", false);
                let alert = { ...this.state.alert };
                alert.lineOne = `Server is not responding to the ${this.state.isGetingResponse1} request.`;
                this.setState({ alert: alert, showAlert: true });
            }
        }, 3000);
    }

    onGetTables(data) {
        // alert("single tables");
        let tables;
        let data_arry = [];

        if (data.hasOwnProperty("SingleTables")) {
            this.setState({ showLoader: false, });
            // console.log(this.state.isGetingResponse)
            if (this.state.isGetingResponse === "GAMES" || this.state.isGetingResponse === "TABS") {
                this.setState({ isGetingResponse: "" })
                clearTimeout(this.serverResponseTime);
            }
            if (this.state.isGetingResponse === "Check1") {
                if (this.state.isGetingResponse1 === "EMPTY" || this.state.isGetingResponse1 === "FULL") {
                    this.setState({ isGetingResponse: "", isGetingResponse1: "" })
                    clearTimeout(this.serverResponseTime);
                }
            }

            // const { isGetingResponse, isGetingResponse1 } = this.state;

            // if (["GAMES", "TABS"].includes(isGetingResponse)) {
            // if (this.state.isGetingResponse !== "") {
            //     this.setState({ isGetingResponse: "" });
            //     clearTimeout(this.serverResponseTime);
            // }

            // if (isGetingResponse === "Check1" && ["EMPTY", "FULL"].includes(isGetingResponse1)) {
            //     this.setState({ isGetingResponse: "", isGetingResponse1: "" });
            //     clearTimeout(this.serverResponseTime);
            // }


            this.tableType = "SINGLE_TABLE";
            if (data.SingleTables.hasOwnProperty("Table")) {
                // this.props.LobbyHandler("activate_loader", false);
                tables = data.SingleTables.Table;
                if (Array.isArray(tables)) {
                    const { stakesFilter, seatsFilter } = this.state;
                    if (stakesFilter !== "No_Sort") {
                        const sortKey = stakesFilter;
                        tables.sort((a, b) => {
                            let valueA = 0, valueB = 0;
                            if (sortKey.includes("Stakes")) {
                                valueA = parseInt(a.attr.stakes.split("/")[1]) || 0;
                                valueB = parseInt(b.attr.stakes.split("/")[1]) || 0;
                            }
                            return sortKey.includes("Low") ? valueA - valueB : valueB - valueA;
                        });
                    };
                    if (seatsFilter !== "No_Sort") {
                        const sortKey = seatsFilter;
                        tables.sort((a, b) => {
                            let valueA = 0, valueB = 0;
                            if (sortKey.includes("Seats")) {
                                valueA = parseInt(a.attr["players-seats"].split("/")[1]) || 0;
                                valueB = parseInt(b.attr["players-seats"].split("/")[1]) || 0;
                            }
                            return sortKey.includes("Low") ? valueA - valueB : valueB - valueA;
                        });
                    }
                }

                if (Array.isArray(tables)) {
                    tables.sort((a, b) => {
                        if (a.attr.mode === "USD" && b.attr.mode !== "USD") return 1;
                        if (a.attr.mode !== "USD" && b.attr.mode === "USD") return -1;
                        return 0;
                    });
                }

                if (!Array.isArray(tables)) {
                    tables = [tables];
                }

                for (let i = 0; i < tables.length; i++) {
                    let object = {};
                    let activePlayers = Number(tables[i].attr["players-seats"].split("/")[0]);
                    let activeSeats = Number(tables[i].attr["players-seats"].split("/")[1]);
                    // console.log(tables[i].attr["average-pot"])
                    // console.log(tables[i].attr.mode === "USD" ? "$ " : "")
                    var splittedAveragePot = (tables[i].attr.mode === "USD" ? "$ " : "") + String(UM.roundToTwo(tables[i].attr["average-pot"])).split(".")[0];
                    object.id = tables[i].attr.id;
                    object.type = this.tableType;
                    object.img =
                        <div className="df_ac" style={{ height: "100%" }}>
                            <span className="lobby_table_img" style={{ minWidth: this.state.mobileView ? "50px" : '' }}>
                                {getTournamentIcon() &&
                                    <>
                                        <img style={{ height: "34px" }} src={require("../../../assets/images/lobby_icons/table_type/" + (!tables[i].attr.hasOwnProperty("jackpot") ? "icon_grid_table_type_normal" : "icon_grid_table_type_bbj") + ".png").default} alt="" />
                                        <div className="lobby_table_active_seats">
                                            <img style={{ height: "48px" }} src={require("../../../assets/images/lobby_icons/table_type/" +
                                                (activeSeats === 2 ? (activePlayers === 0 ? "itable_seats_2_empty" : (activePlayers === 1 ? "table_seats_2_onefilled" : "table_seats_2_twofilled")) :
                                                    (activeSeats === 3 ? (activePlayers === 0 ? "table_seats_3_empty" : (activePlayers === 1 ? "table_seats_3_onefilled" : (activePlayers === 2 ? "table_seats_3_twofilled" : "table_seats_3_threefilled"))) :
                                                        (activeSeats === 4 ? (activePlayers === 0 ? "table_seats_4_empty" : (activePlayers === 1 ? "icon_grid_table_seats_4_onefilled" : (activePlayers === 2 ? "table_seats_4_twofilled" : (activePlayers === 3 ? "table_seats_4_threefilled" : "table_seats_4_fourfilled")))) :
                                                            (activeSeats === 5 ? activePlayers === 0 ? "table_seats_5_empty" : activePlayers === 1 ? "table_seats_5_onefilled" : activePlayers === 2 ? "table_seats_5_twofilled" : activePlayers === 3 ? "table_seats_5_threefilled" : activePlayers === 4 ? "table_seats_5_fourfilled" : "table_seats_5_fivefilled" :
                                                                (activeSeats === 6 ? activePlayers === 0 ? "table_seats_6_empty" : activePlayers === 1 ? "table_seats_6_onefilled" : activePlayers === 2 ? "table_seats_6_twofilled" : activePlayers === 3 ? "table_seats_6_threefilled" : activePlayers === 4 ? "table_seats_6_fourfilled" : activePlayers === 5 ? "table_seats_6_fivefilled" : "table_seats_6_sixfilled" :
                                                                    (activeSeats === 7 ? activePlayers === 0 ? "table_seats_7_empty" : activePlayers === 1 ? "table_seats_7_onefilled" : activePlayers === 2 ? "table_seats_7_twofilled" : activePlayers === 3 ? "table_seats_7_threefilled" : activePlayers === 4 ? "table_seats_7_fourfilled" : activePlayers === 5 ? "table_seats_7_fivefilled" : activePlayers === 6 ? "table_seats_7_sixfilled" : "table_seats_7_sevenfilled" :
                                                                        (activeSeats === 8 ? activePlayers === 0 ? "table_seats_8_empty" : activePlayers === 1 ? "table_seats_8_onefilled" : activePlayers === 2 ? "table_seats_8_twofilled" : activePlayers === 3 ? "table_seats_8_threefilled" : activePlayers === 4 ? "table_seats_8_fourfilled" : activePlayers === 5 ? "table_seats_8_fivefilled" : activePlayers === 6 ? "table_seats_8_sixfilled" : activePlayers === 7 ? "table_seats_8_sevenfilled" : "table_seats_8_eightfilled" :
                                                                            (activeSeats === 9 ? activePlayers === 0 ? "table_seats_8_empty" : activePlayers === 1 ? "table_seats_8_onefilled" : activePlayers === 2 ? "table_seats_8_twofilled" : activePlayers === 3 ? "table_seats_8_threefilled" : activePlayers === 4 ? "table_seats_8_fourfilled" : activePlayers === 5 ? "table_seats_8_fivefilled" : activePlayers === 6 ? "table_seats_8_sixfilled" : activePlayers === 7 ? "table_seats_8_sevenfilled" : "table_seats_8_eightfilled" :
                                                                                // (activeSeats === 9 ? activePlayers === 0 ? "table_seats_9_empty" : activePlayers === 1 ? "table_seats_9_onefilled" : activePlayers === 2 ? "table_seats_9_twofilled" : activePlayers === 3 ? "table_seats_9_threefilled" : activePlayers === 4 ? "table_seats_9_fourfilled" : activePlayers === 5 ? "table_seats_9_fivefilled" : activePlayers === 6 ? "table_seats_9_sixfilled" : activePlayers === 7 ? "table_seats_9_sevenfilled" : activePlayers === 8 ? "table_seats_9_eightfilled" : "table_seats_9_ninefilled" :
                                                                                (activeSeats === 10 ? activePlayers === 0 ? "table_seats_10_empty" : activePlayers === 1 ? "table_seats_10_onefilled" : activePlayers === 2 ? "table_seats_10_twofilled" : activePlayers === 3 ? "table_seats_10_threefilled" : activePlayers === 4 ? "table_seats_10_fourfilled" : activePlayers === 5 ? "table_seats_10_fivefilled" : activePlayers === 6 ? "table_seats_10_sixfilled" : activePlayers === 7 ? "table_seats_10_sevenfilled" : activePlayers === 8 ? "table_seats_10_eightfilled" : activePlayers === 9 ? "table_seats_10_ninefilled" : "table_seats_10_tenfilled" : "itable_seats_2_empty")))))))
                                                    )) + ".png").default} alt="" />
                                        </div>
                                    </>
                                }
                            </span>
                            <div className="df min_width_992" style={{ width: '100%', alignItems: 'center' }}>
                                <div className="df col-12" style={{ color: '#ffff', margin: '0px 10px' }}>
                                    <span className="font_15 col-4 text_ellipsis">{object.name = UM.textFormat(tables[i].attr.name)}</span>
                                    <span className="font_15 col-2 text_ellipsis" style={{ color: '#979696' }}>{object.game = UM.GameName(tables[i].attr.game)}</span>
                                    <span className="font_15 col-2 text_ellipsis" style={{ color: '#979696' }}>{object.stakes = (UM.numberWithCommas(tables[i].attr.stakes.split("/")[0]) + "/" + UM.numberWithCommas(tables[i].attr.stakes.split("/")[1]))}</span>
                                    {/* <span className="font_15 col-2" style={{ color: '#979696' }}>Players: <span className="tableNameHeading">{tables[i].attr["players-seats"]}</span></span> */}
                                    <span className="font_15 col-1" style={{ color: '#979696' }}><span className="tableNameHeading">{tables[i].attr["players-seats"]}</span></span>
                                    <span className="font_15 col-1">{object.pot = UM.numberWithCommas(splittedAveragePot)}</span>
                                    <span className="font_15 col-1">{tables[i].attr["players-per-2nd-round"]}%</span>
                                    <span className="font_15 col-1">{tables[i].attr["hands-per-hour"]}</span>
                                </div>
                            </div>

                            <div className="df max_width_992" >
                                <div className="df mobile-lobby-right-div" style={{ maxWidth: (Number(splittedAveragePot) > 100 && Number(splittedAveragePot) < 999) ? "48vw" : Number(splittedAveragePot) > 1000 ? "38vw" : "56vw" }}>
                                    <span style={{ fontSize: '15px', overflow: 'hidden', textOverflow: "ellipsis" }}>{object.name = tables[i].attr.name}</span>
                                    <span style={{ fontSize: '12px', color: '#979696', marginTop: '2px', overflow: "hidden", textOverflow: "ellipsis" }}>{object.stakes = (UM.numberWithCommas(tables[i].attr.stakes.split("/")[0]) + "/" + UM.numberWithCommas(tables[i].attr.stakes.split("/")[1]))}{", "}{object.game = UM.GameName(tables[i].attr.game)}</span>
                                </div>
                                <div className="mobile-lobby-left-div">
                                    <small>{object.pot = UM.numberWithCommas(splittedAveragePot)}{" / "}{tables[i].attr["players-per-2nd-round"]}%  {" / "} {tables[i].attr["hands-per-hour"]}</small>
                                    {/* <small>{object.pot = UM.numberWithCommas(28099436)}{" / "}{"100"}%  {" / "} {"999"}</small> */}
                                    <span className="df" style={{ marginTop: '3px', color: '#979696' }}> <span className="d-none d-sm-flex"> Players: </span> <span className="tableNameHeading">{tables[i].attr["players-seats"]}</span></span>
                                </div>
                            </div>
                        </div>
                    data_arry.push(object);
                }

            } else {
                let object = {};
                object.name = "No Table Matching Your Search Criteria";
                object.game = "No Table Matching Your Search Criteria";
                object.stakes = "";
                object.seats = "";
                object.Pot = "";
                object.wait = "";
                object.pf = "";
                object.hh = "";
                object.id = "";
                object.type = "";
                data_arry.push(object);
            }
        }
        this.setState({ data: data_arry });
    }


    onGetTournaments(data) {
        // console.log(data);
        // this.props.LobbyHandler("activate_loader", false);
        const { isGetingResponse, isGetingResponse1 } = this.state;
        this.cashierTourneyTables = [];
        // if (["GAMES", "TABS", "Check2"].includes(isGetingResponse)) {
        if (isGetingResponse !== "") {
            if (isGetingResponse === "Check2" && isGetingResponse1 === "UpComingOnly") {
                this.setState({ isGetingResponse: "", isGetingResponse1: "" });
            } else if (isGetingResponse !== "Check2") {
                this.setState({ isGetingResponse: "" });
            }
            clearTimeout(this.serverResponseTime);
        }

        if (data.Tournaments.hasOwnProperty("Table")) {
            this.setState({ showLoader: false });
            let tables = data.Tournaments.Table;
            if (Array.isArray(tables)) {
                if (this.state.tourneyBuyInFilter !== "No_Sort") {
                    const sortKey = this.state.tourneyBuyInFilter;
                    tables.sort((a, b) => {
                        let valueA, valueB;
                        if (sortKey.includes("Buy_in")) {
                            valueA = Number(a.attr.buyIn);
                            valueB = Number(b.attr.buyIn);
                            if (a.attr.buyIn === "FREEROLL" && b.attr.buyIn !== "FREEROLL") return -1;
                            if (a.attr.buyIn !== "FREEROLL" && b.attr.buyIn === "FREEROLL") return 1;
                        };
                        if (sortKey.includes("Ascending")) {
                            return valueA - valueB;
                        } else {
                            return valueB - valueA;
                        }
                    });
                }
                if (this.state.tourneyStatusInFilter !== "No_Sort") {
                    const sortKey = this.state.tourneyStatusInFilter;
                    tables.sort((a, b) => {
                        let valueA, valueB;
                        if (sortKey.includes("Status")) {
                            const statusOrder = {
                                REGISTERING: 1,
                                LATE_REG: 2,
                                RUNNING: 3,
                                PAUSED: 4,
                                SEATING: 5,
                                ANNOUNCED: 6,
                                COMPLETED: 7,
                                CANCELED_BEFORE_START: 8,
                                CANCELED_AFTER_START: 9
                            };
                            valueA = statusOrder[a.attr.status];
                            valueB = statusOrder[b.attr.status];
                        };
                        if (sortKey.includes("Ascending")) {
                            return valueA - valueB;
                        } else {
                            return valueB - valueA;
                        }
                    });
                }
            }

            if (!Array.isArray(tables)) {
                tables = [tables];
            }
            this.cashierTourneyTables.push(tables);
            if (tables[0].attr.type === "SCHEDULED_TOURNAMENT") {
                this.updateTournaments(tables);
            }
            if (tables[0].attr.type === "SITANDGO_TOURNAMENT") {
                this.updateSitandGo(tables);
            }
        } else {
            this.updateSitandGo([]);
            this.updateTournaments([]);
            this.cashierTourneyTables = [];
        }
    }
    updateTournaments(tables) {
        let data_arry = [];
        if (tables.length) {
            for (var i = 0; i < tables.length; i++) {
                let object = {};
                // let status = '';
                let imgSource;
                let statuscolor;
                const startDate = new Date(parseInt(tables[i].attr.tournamentStart));
                const formattedDate = startDate.toLocaleString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    hour12: false
                });
                const formattedTime = startDate.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false
                });

                switch (tables[i].attr.status) {
                    case "CANCELED_BEFORE_START":
                        // status = "Cancelled";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_tourneycancelled.png").default;
                        statuscolor = "red";
                        break;
                    case "CANCELED_AFTER_START":
                        // status = "Cancelled";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_tourneycancelled.png").default;
                        statuscolor = "red";
                        break;
                    case "COMPLETED":
                        // status = "Completed";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_completed.png").default;
                        statuscolor = "red";
                        break;
                    case "SEATING":
                        // status = "Seating";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_registering.png").default;
                        statuscolor = "green"
                        break;
                    case "REGISTERING":
                        // status = "Registering";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_registering.png").default;
                        statuscolor = "green"
                        break;
                    case "ANNOUNCED":
                        // status = "Announced";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_anounced.png").default;
                        statuscolor = "#1E90FF"
                        break;
                    case "LATE_REG":
                        // status = "Late Registration";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_lateregister.png").default;
                        statuscolor = "green"
                        break;
                    case "RUNNING":
                        // status = "Running";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_running.png").default;
                        statuscolor = "yellow"
                        break;
                    case "PAUSED":
                        // status = "Running";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_paused.png").default;
                        statuscolor = "yellow"
                        break;
                    default:
                        // status = tables[i].attr.status;
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_anounced.png").default;
                        statuscolor = "#1E90FF"
                        break;
                }
                object.name =
                    <div className="df_ac">
                        <span className="lobby_table_img" style={{ minWidth: this.state.mobileView ? "50px" : '' }}>
                            {getTournamentIcon() && <img style={{ height: "34px" }} src={imgSource} alt="" />}
                        </span>
                        <div className="df min_width_992" style={{ width: '100%', alignItems: 'center', }}>
                            <div className="df col-12" style={{ justifyContent: 'center', color: '#ffff' }}>
                                <span className="font_15 col-2" style={{ color: '#979696' }}>{formattedDate} / {formattedTime}</span>
                                <span className="font_15 col-3 text_ellipsis">{UM.textFormat(tables[i].attr.name)}</span>
                                <span className="font_15 col-2">{UM.GameName(tables[i].attr.game)}</span>
                                {/* <span className="col-2 text_ellipsis">Buy-In: {(tables[i].attr.buyIn === 'FREEROLL' ? tables[i].attr.buyIn : UM.numberWithCommas(tables[i].attr.buyIn))}</span> */}
                                <span className="col-2 text_ellipsis">{(tables[i].attr.buyIn === 'FREEROLL' ? tables[i].attr.buyIn : UM.numberWithCommas(tables[i].attr.buyIn))}</span>
                                {/* <span className="col-2" style={{ color: '#979696' }}>Players: <span className="tableNameHeading">{tables[i].attr.players}</span></span> */}
                                <span className="col-1" style={{ color: '#979696' }}><span className="tableNameHeading">{tables[i].attr.players}</span></span>
                                <span className="font_15 col-2 text_ellipsis" style={!getTournamentIcon() ? { color: statuscolor } : {}}>{UM.textFormat(tables[i].attr.status)}</span>
                                {/* <span className="font_15 col-1" style={{ color: '#979696' }}>{formattedDate}</span>
                                <span className="font_15 col-1" style={{ color: '#979696' }}>{formattedTime}</span> */}
                            </div>
                        </div>
                        <div className="df max_width_992" style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', overflow: "auto" }}>
                            <div className="df" style={{ flexDirection: 'column', justifyContent: 'center', color: '#ffff', width: "50vw" }}>
                                <span style={{ fontSize: '15px', overflow: "hidden", textOverflow: "ellipsis" }}>{tables[i].attr.name}</span>
                                <span style={{ fontSize: '12px', color: '#979696', marginTop: '2px', overflow: "hidden", textOverflow: "ellipsis" }}>{formattedDate}{", "}{UM.GameName(tables[i].attr.game)}{", "}
                                    <span style={!getTournamentIcon() ? { fontSize: "16px", color: statuscolor } : {}}>{UM.textFormat(tables[i].attr.status)}</span>
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                                <span>{window.innerWidth > 580 && "Buy-In:"} {(tables[i].attr.buyIn === 'FREEROLL' ? tables[i].attr.buyIn : UM.numberWithCommas(tables[i].attr.buyIn))}</span>
                                <span style={{ marginTop: '3px', color: '#979696' }}>Players: <span className="tableNameHeading">{tables[i].attr.players}</span></span>
                            </div>
                        </div>
                    </div>
                object.id = tables[i].attr.id;
                object.type = tables[i].attr.type;
                object.game = UM.GameName(tables[i].attr.game);
                data_arry.push(object);
            }
        } else {
            let object = {};
            object.name = "No Tournament(s) Matching Your Search Criteria";
            data_arry.push(object);
        }
        this.setState({ dataTourney: data_arry });
    }

    updateSitandGo(tables) {
        let data_arry = [];
        if (tables.length) {
            for (var i = 0; i < tables.length; i++) {
                var object = {};
                // let status = '';
                let imgSource;
                let statuscolor;
                switch (tables[i].attr.status) {
                    case "CANCELED_BEFORE_START":
                        // status = "Cancelled";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_tourneycancelled.png").default;
                        statuscolor = "red";
                        break;
                    case "CANCELED_AFTER_START":
                        // status = "Cancelled";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_tourneycancelled.png").default;
                        statuscolor = "red";
                        break;
                    case "COMPLETED":
                        // status = "Completed";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_completed.png").default;
                        statuscolor = "red"
                        break;
                    case "SEATING":
                        // status = "Seating";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_lateregister.png").default;
                        statuscolor = "green"
                        break;
                    case "REGISTERING":
                        // status = "Registering";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_registering.png").default;
                        statuscolor = "green"
                        break;
                    case "ANNOUNCED":
                        // status = "Announced";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_anounced.png").default;
                        statuscolor = "#1E90FF"
                        break;
                    case "LATE_REG":
                        // status = "Late Registration";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_lateregister.png").default;
                        statuscolor = "green"
                        break;
                    case "RUNNING":
                        // status = "Running";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_running.png").default;
                        statuscolor = "yellow"
                        break;
                    default:
                        // status = tables[i].attr.status;
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_anounced.png").default;
                        statuscolor = "#1E90FF"
                        break;
                }
                object.name =
                    <div className="df_ac">
                        <span className="lobby_table_img" style={{ minWidth: this.state.mobileView ? "50px" : '' }}>
                            {getTournamentIcon() && <img style={{ height: "34px" }} src={imgSource} alt="" />}
                        </span>
                        <div className="df min_width_992" style={{ width: '100%', alignItems: 'center' }}>
                            <div className="df col-12" style={{ justifyContent: 'center', color: '#ffff', margin: '0px 10px' }}>
                                <span className="font_15 col-4 text_ellipsis">{UM.textFormat(tables[i].attr.name)}</span>
                                <span className="font_15 col-2" style={{ color: '#979696' }}>{UM.GameName(tables[i].attr.game)} </span>
                                {/* <span className="font_15 col-2 text_ellipsis">Buy-In: {(tables[i].attr.buyIn === 'FREEROLL' ? tables[i].attr.buyIn : UM.numberWithCommas(tables[i].attr.buyIn))}</span> */}
                                <span className="font_15 col-2 text_ellipsis">{(tables[i].attr.buyIn === 'FREEROLL' ? tables[i].attr.buyIn : UM.numberWithCommas(tables[i].attr.buyIn))}</span>
                                {/* <span className="font_15 col-2" style={{ color: '#979696' }}>Players: <span className="tableNameHeading">{tables[i].attr.players}</span></span> */}
                                <span className="font_15 col-2" style={{ color: '#979696' }}><span className="tableNameHeading">{tables[i].attr.players}</span></span>
                                <span className="font_15 col-2 text_ellipsis" style={!getTournamentIcon() ? { color: statuscolor } : {}}>{UM.textFormat(tables[i].attr.status)}</span>
                            </div>
                        </div>
                        <div className="df max_width_992" style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', overflow: "auto" }}>
                            <div className="df" style={{ flexDirection: 'column', justifyContent: 'center', color: '#ffff', width: "50vw" }}>
                                <span style={{ fontSize: '15px', overflow: "hidden", textOverflow: "ellipsis" }}>{tables[i].attr.name}</span>
                                <span style={{ fontSize: '12px', color: '#979696', marginTop: '2px', overflow: "hidden", textOverflow: "ellipsis" }}>{UM.GameName(tables[i].attr.game)}{", "}
                                    <span style={!getTournamentIcon() ? { fontSize: "16px", color: statuscolor } : {}}>{UM.textFormat(tables[i].attr.status)}</span>
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                                <span>{window.innerWidth > 580 && "Buy-In:"} {(tables[i].attr.buyIn === 'FREEROLL' ? tables[i].attr.buyIn : UM.numberWithCommas(tables[i].attr.buyIn))}</span>
                                <span style={{ marginTop: '3px', color: '#979696' }}>Players: <span className="tableNameHeading">{tables[i].attr.players}</span></span>
                            </div>
                        </div>
                    </div>
                object.id = tables[i].attr.id;
                object.type = tables[i].attr.type;
                object.game = UM.GameName(tables[i].attr.game);
                data_arry.push(object);
            }
        } else {
            let object = {};
            object.name = "No Sit&Go's Matching Your Search Criteria";
            data_arry.push(object);
        }
        this.setState({ dataSitGo: data_arry });
    }

    onGetTableDetails(data) {
        if (data.TableDetails.hasOwnProperty("ScheduledTournament")) {
            this.updateTourneyDetails(data);
        } else if (data.TableDetails.hasOwnProperty("SitAndGoTournament")) {
            this.updateSitandGoDetails(data);
        } else {
            this.updateSingleTableDetails(data);
        }
    }

    updateTourneyDetails(data) {
        // console.log(data);
        this.setState({ showTourneyDetails: true });
        let tourneyData = { ...this.state.tourneyData };
        let regData = this.state.regData;
        if (data.TableDetails.hasOwnProperty("ScheduledTournament")) {
            tourneyData.id = data.TableDetails.attr.id;
            regData.id = data.TableDetails.attr.id;
            regData.balance = this.state.playerData.available;
            tourneyData.type = data.TableDetails.attr.type;
            regData.tableType = data.TableDetails.attr.type;
            tourneyData.typeText = "Scheduled";
            // tourneyData.status1 = "Register";
            tourneyData.status1 = !this.state.myTournaments.some((item) => item.id === data.TableDetails.attr.id) ? "Register" : "Unregister";
            tourneyData.date = new Date(parseInt(data.TableDetails.ScheduledTournament.Schedule.attr.tournamentStart)).toLocaleString();
            tourneyData.description = data.TableDetails.ScheduledTournament.Description;
            tourneyData.name = data.TableDetails.attr.name;
            let buyMoney = (data.TableDetails.ScheduledTournament.Parameters.attr.buyIn - data.TableDetails.ScheduledTournament.Parameters.attr.fee)
            if (data.TableDetails.ScheduledTournament.Parameters.attr.buyIn === "FREEROLL") {
                tourneyData.buyIn = data.TableDetails.ScheduledTournament.Parameters.attr.buyIn;
            } else {
                tourneyData.buyIn = (UM.numberWithCommas(buyMoney)) + "+" + UM.numberWithCommas(data.TableDetails.ScheduledTournament.Parameters.attr.fee);
            }
            tourneyData.status = UM.textFormat(data.TableDetails.ScheduledTournament.Schedule.attr.status);
            // switch (data.TableDetails.ScheduledTournament.Schedule.attr.status) {
            //     case "CANCELED_BEFORE_START":
            //         tourneyData.status = "Cancelled";
            //         break;
            //     case "CANCELED_AFTER_START":
            //         tourneyData.status = "Cancelled";
            //         break;
            //     case "COMPLETED":
            //         tourneyData.status = "Completed";
            //         break;
            //     case "SEATING":
            //         tourneyData.status = "Seating";
            //         break;
            //     case "REGISTERING":
            //         tourneyData.status = "Registering";
            //         break;
            //     case "ANNOUNCED":
            //         tourneyData.status = "Announced";
            //         break;
            //     case "LATE_REG":
            //         tourneyData.status = "Late Registration";
            //         break;
            //     default:
            //         tourneyData.status = data.TableDetails.ScheduledTournament.Schedule.attr.status;
            //         break;
            // }
            // console.log(this.state.playerData.VIPpoints)
            // console.log(this.state.regData.compPoints)
            // console.log(data)
            if (data.TableDetails.ScheduledTournament.hasOwnProperty("RegistrationTypes")) {
                if (data.TableDetails.ScheduledTournament.RegistrationTypes.hasOwnProperty("RegistrationType")) {
                    let types = data.TableDetails.ScheduledTournament.RegistrationTypes.RegistrationType;

                    if (!Array.isArray(types)) {
                        types = [types];
                    }
                    let i = 0,
                        cnt = types.length;
                    regData.types = [];
                    for (i; i < cnt; i++) {
                        console.log(types[i]);
                        console.log(data);
                        if (types[i].hasOwnProperty("attr")) {
                            switch (types[i].attr.type) {
                                case "BALANCE":
                                    regData.types.push({
                                        // type: "Balance", text: "BALANCE", amount: UM.changeAmtLabel(this.state.playerData.available), buyAmount: (data.TableDetails.ScheduledTournament.Parameters.attr.buyIn === 'FREEROLL' ? 'FREEROLL' : UM.changeAmtLabel(data.TableDetails.ScheduledTournament.Parameters.attr.buyIn)),
                                        type: "Balance", text: "BALANCE", amount: UM.changeAmtLabel(data.TableDetails.ScheduledTournament.attr.mode === "CHP" ? this.myCHPbalance : this.myUSDbalance), buyAmount: (data.TableDetails.ScheduledTournament.Parameters.attr.buyIn === 'FREEROLL' ? 'FREEROLL' : UM.changeAmtLabel(data.TableDetails.ScheduledTournament.Parameters.attr.buyIn)),
                                        enable: (data.TableDetails.ScheduledTournament.Parameters.attr.buyIn === 'FREEROLL' ? 'FREEROLL' : Number(data.TableDetails.ScheduledTournament.attr.mode === "CHP" ? this.myCHPbalance : this.myUSDbalance) > Number(data.TableDetails.ScheduledTournament.Parameters.attr.buyIn))
                                    });
                                    break;
                                case "TOURNAMENT_MONEY":
                                    regData.types.push({
                                        type: "Tournament Money", text: "TOURNAMENT_MONEY", amount: UM.changeAmtLabel(this.state.playerData.tMoney), buyAmount: UM.changeAmtLabel(this.state.regData.TM),
                                        enable: Number(this.state.playerData.tMoney) > Number(this.state.regData.TM)
                                    });
                                    break;
                                case "TICKET":
                                    regData.types.push({
                                        type: "Tickets", text: "TICKET", amount: UM.changeAmtLabel(this.state.playerData.tickets), buyAmount: "Ticket",
                                        enable: Number(this.state.playerData.tickets) > 0
                                    });
                                    break;
                                case "COMP_POINTS":
                                    regData.types.push({
                                        // type: "VIP Points", text: "COMP_POINTS", amount: UM.changeAmtLabel(playerData.VIPpoints), buyAmount: UM.changeAmtLabel(this.state.regData.compPoints),
                                        type: "VIP Points", text: "COMP_POINTS", amount: UM.changeAmtLabel(this.state.playerData.VIPpoints), buyAmount: UM.changeAmtLabel(data.TableDetails.ScheduledTournament.Parameters.attr.compPoints),
                                        enable: Number(this.state.playerData.VIPpoints) > Number(data.TableDetails.ScheduledTournament.Parameters.attr.compPoints)
                                    });
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }
            regData.status = UM.textFormat(tourneyData.status);
            this.setState({ regData: regData });
            if (data.TableDetails.ScheduledTournament.hasOwnProperty("attr")) {
                tourneyData.players = data.TableDetails.ScheduledTournament.Participants.attr?.total;
                tourneyData.prize = data.TableDetails.ScheduledTournament.PrizeInfo.attr?.prizePool;
                if (data.TableDetails.ScheduledTournament.attr.hasOwnProperty("limit")) {
                    let type = data.TableDetails.ScheduledTournament.attr.game + "_" + data.TableDetails.ScheduledTournament.attr.limit;
                    tourneyData.tableType = UM.GameName(type);
                    regData.tableName = UM.GameName(type);
                }
            }
            if (data.TableDetails.ScheduledTournament.hasOwnProperty("Schedule")) {
                tourneyData.Tournament_start = data.TableDetails.ScheduledTournament.Schedule.attr.tournamentStart;
                tourneyData.Tournament_cancelled = data.TableDetails.ScheduledTournament.Schedule.attr.tournamentFinish;

            }
        }

        this.setState({ tourneyData: tourneyData });
    }

    updateSitandGoDetails(data) {
        this.setState({ showSitnGoDetails: true });
        let sitGoData = { ...this.state.sitGoData };
        let tourneyData = this.state.tourneyData;

        let regData = this.state.regData;
        regData.balance = this.state.playerData.available
        regData.tableType = data.TableDetails.attr.type;
        if (data.TableDetails.hasOwnProperty("SitAndGoTournament")) {
            sitGoData.id = data.TableDetails.attr.id;
            regData.id = data.TableDetails.attr.id;
            sitGoData.type = data.TableDetails.attr.type;
            sitGoData.date = new Date(parseInt(data.TableDetails.SitAndGoTournament.Schedule.attr.registrationStart)).toLocaleString();
            sitGoData.description = data.TableDetails.SitAndGoTournament.Description;
            sitGoData.name = data.TableDetails.attr.name;
            sitGoData.buyIn = data.TableDetails.SitAndGoTournament.Parameters.attr.buyIn;
            let buyMoney = (data.TableDetails.SitAndGoTournament.Parameters.attr.buyIn - data.TableDetails.SitAndGoTournament.Parameters.attr.fee)
            if (data.TableDetails.SitAndGoTournament.Parameters.attr.buyIn === "FREEROLL") {
                tourneyData.buyIn = data.TableDetails.SitAndGoTournament.Parameters.attr.buyIn;
            } else {
                tourneyData.buyIn = (UM.numberWithCommas(buyMoney)) + "+" + UM.numberWithCommas(data.TableDetails.SitAndGoTournament.Parameters.attr.fee);
            }
            sitGoData.status = UM.textFormat(data.TableDetails.SitAndGoTournament.Schedule.attr.status);
            // switch (data.TableDetails.SitAndGoTournament.Schedule.attr.status) {
            //     case "CANCELED_BEFtORE_START":
            //         sitGoData.status = "Cancelled";
            //         break;
            //     case "CANCELED_AFTER_START":
            //         sitGoData.status = "Cancelled";
            //         break;
            //     case "COMPLETED":
            //         sitGoData.status = "Completed";
            //         break;
            //     case "SEATING":
            //         sitGoData.status = "Seating";
            //         break;
            //     case "REGISTERING":
            //         sitGoData.status = "Registering";
            //         break;
            //     case "ANNOUNCED":
            //         sitGoData.status = "Announced";
            //         break;
            //     case "LATE_REG":
            //         sitGoData.status = "Late Registration";
            //         break;
            //     default:
            //         sitGoData.status = data.TableDetails.SitAndGoTournament.Schedule.attr.status;
            //         break;
            // }
            sitGoData.players = data.TableDetails.SitAndGoTournament.Participants.attr.total;
            sitGoData.prize = data.TableDetails.SitAndGoTournament.PrizeInfo.attr.prizePool;
            if (data.TableDetails.SitAndGoTournament.hasOwnProperty("RegistrationTypes")) {
                if (data.TableDetails.SitAndGoTournament.RegistrationTypes.hasOwnProperty("RegistrationType")) {
                    let types = data.TableDetails.SitAndGoTournament.RegistrationTypes.RegistrationType;
                    if (!Array.isArray(types)) {
                        types = [types];
                    }
                    let i = 0,
                        cnt = types.length;
                    regData.types = [];
                    for (i; i < cnt; i++) {
                        if (types[i].hasOwnProperty("attr")) {
                            switch (types[i].attr.type) {
                                case "BALANCE":
                                    regData.types.push({
                                        // type: "Balance", text: "BALANCE", amount: UM.changeAmtLabel(this.state.playerData.available), buyAmount: (data.TableDetails.SitAndGoTournament.Parameters.attr.buyIn === 'FREEROLL' ? 'FREEROLL' : UM.changeAmtLabel(data.TableDetails.SitAndGoTournament.Parameters.attr.buyIn)),
                                        type: "Balance", text: "BALANCE", amount: UM.changeAmtLabel(data.TableDetails.SitAndGoTournament.attr.mode === "CHP" ? this.myCHPbalance : this.myUSDbalance), buyAmount: (data.TableDetails.SitAndGoTournament.Parameters.attr.buyIn === 'FREEROLL' ? 'FREEROLL' : UM.changeAmtLabel(data.TableDetails.SitAndGoTournament.Parameters.attr.buyIn)),
                                        enable: (data.TableDetails.SitAndGoTournament.Parameters.attr.buyIn === 'FREEROLL' ? 'FREEROLL' : Number(data.TableDetails.SitAndGoTournament.attr.mode === "CHP" ? this.myCHPbalance : this.myUSDbalance) > Number(data.TableDetails.SitAndGoTournament.Parameters.attr.buyIn))
                                    });
                                    break;
                                case "TOURNAMENT_MONEY":
                                    regData.types.push({
                                        type: "Tournament Money", text: "TOURNAMENT_MONEY", amount: (UM.changeAmtLabel(this.state.playerData.tMoney)), buyAmount: UM.changeAmtLabel(this.state.regData.TM),
                                        enable: Number(this.state.playerData.tMoney) > Number(this.state.regData.TM)
                                    });
                                    break;
                                case "TICKET":
                                    regData.types.push({
                                        type: "Tickets", text: "TICKET", amount: (UM.changeAmtLabel(this.state.playerData.tickets)),
                                        enable: Number(this.state.playerData.tickets) > 0
                                    });
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }
            regData.status = UM.textFormat(sitGoData.status);
            if (data.TableDetails.SitAndGoTournament.hasOwnProperty("attr")) {
                if (data.TableDetails.SitAndGoTournament.attr.hasOwnProperty("limit")) {
                    let type = data.TableDetails.SitAndGoTournament.attr.game + "_" + data.TableDetails.SitAndGoTournament.attr.limit;
                    sitGoData.typeText = UM.GameName(type);
                    regData.tableName = UM.GameName(type);
                }
            }
            if (data.TableDetails.SitAndGoTournament.hasOwnProperty("Schedule")) {
                sitGoData.Tournament_start = data.TableDetails.SitAndGoTournament.Schedule.attr.tournamentStart;
                sitGoData.Tournament_cancelled = data.TableDetails.SitAndGoTournament.Schedule.attr.tournamentFinish;

            }
        }
        this.setState({ sitGoData: sitGoData, tourneyData: tourneyData });
    }

    updateSingleTableDetails(data) {
        console.log(data);
        console.log("===========================================");

        let isMe = false;
        let tablesItem = [];
        let previewItem = [];
        let tabel_data = {
            name: "",
            id: "",
            type: "",
            hands_per_hour: "",
            average_pot: "",
            data: [],
            seats: [],
        };
        if (data.hasOwnProperty("TableDetails")) {
            if (data.TableDetails.hasOwnProperty("attr")) {
                if (data.TableDetails.attr.hasOwnProperty("name")) {
                    tabel_data.name = data.TableDetails.attr.name;
                }
                if (data.TableDetails.attr.hasOwnProperty("id")) {
                    tabel_data.id = data.TableDetails.attr.id;
                }
                if (data.TableDetails.attr.hasOwnProperty("type")) {
                    tabel_data.type = data.TableDetails.attr.type;
                }
                if (data.TableDetails.hasOwnProperty("SingleTable")) {
                    if (data.TableDetails.SingleTable.hasOwnProperty("Statistics")) {
                        if (data.TableDetails.SingleTable.Statistics.attr.hasOwnProperty("average-pot")) {
                            tabel_data.average_pot = data.TableDetails.SingleTable.Statistics.attr["average-pot"];
                        }
                        if (data.TableDetails.SingleTable.Statistics.attr.hasOwnProperty("hands-per-hour")) {
                            tabel_data.hands_per_hour = data.TableDetails.SingleTable.Statistics.attr["hands-per-hour"];
                        }
                    }
                }
            }
            if (data.TableDetails.hasOwnProperty("SingleTable")) {
                if (data.TableDetails.SingleTable.hasOwnProperty("Seats")) {
                    if (data.TableDetails.SingleTable.Seats.hasOwnProperty("Seat")) {
                        let tables = data.TableDetails.SingleTable.Seats.Seat;
                        let isMeA = false;
                        for (const table of tables) {
                            if (table?.PlayerInfo?.attr) {
                                if (Array.isArray(table.PlayerInfo.attr)) {
                                    isMeA = table.PlayerInfo.attr.some(player => player.nickname === this.state.userLogged);
                                    console.log(isMeA);
                                } else {
                                    isMeA = table.PlayerInfo.attr.nickname === this.state.userLogged;
                                }
                            }
                            if (isMeA) break;
                        }

                        for (let i = 0; i < tables.length; i++) {
                            if (tables[i].hasOwnProperty("PlayerInfo")) {
                                let playerInfo = tables[i].PlayerInfo;
                                let obj = {
                                    player: playerInfo.attr.nickname,
                                    chips: playerInfo.Chips?.attr["stack-size"] || "0",
                                    taken: 1,
                                };
                                tablesItem.push(obj);
                                previewItem.push(obj);
                            } else {
                                previewItem.push({
                                    player: isMeA ? "Open Seat" : "Take Seat",
                                    chips: "",
                                    taken: 0,
                                    tableIds: tables[i]?.attr?.id || null,
                                });
                            }
                        }
                        if (Number(data.TableDetails.SingleTable.Seats.Seat.length) === Number(tablesItem.length)) {
                            this.setState({ seatAvailble: { isSeatsAvailable: false } });
                        } else {
                            if (Number(data.TableDetails.SingleTable.Seats.Seat.length) > Number(tablesItem.length)) {
                                this.setState({ seatAvailble: { isSeatsAvailable: true } });
                            }
                        }
                        if (data.TableDetails.SingleTable.hasOwnProperty("WaitingList")) {
                            let waitingList = data.TableDetails.SingleTable.WaitingList;
                            if (waitingList.hasOwnProperty("WaitingPlayer")) {
                                let waitingPlayers = waitingList.WaitingPlayer;

                                if (!Array.isArray(waitingPlayers)) {
                                    waitingPlayers = [waitingPlayers];
                                }

                                console.log(waitingPlayers);

                                let isUserWaiting = waitingPlayers.some(player => {
                                    let attr = player?.PlayerInfo?.attr;

                                    if (!Array.isArray(attr)) {
                                        attr = attr ? [attr] : [];
                                    }

                                    return attr.some(attrItem => attrItem.nickname === this.state.userLogged);
                                });

                                if (isUserWaiting) {
                                    this.setState({ seatAvailble: { joinWaitingList: true } });
                                } else {
                                    this.setState({ seatAvailble: { joinWaitingList: false } });
                                }
                            }
                        }

                        tabel_data.data = tablesItem;
                        tabel_data.seats = previewItem;
                    }

                }
            }
            this.setState({ tableData: tabel_data, showTDbtn_seatMe: isMe, showTDbtn_joinMe: false });
        }
    }

    onGetError(data) {
        console.log(data);
        let alert = this.state.alert;
        alert.lineOne = " ";
        alert.lineTwo = " ";
        // this.props.LobbyHandler("activate_loader", false);
        if (data.Error === 401) {
            alert.lineOne = "You have logged in from another device";
            alert.lineTwo = "logging out from here..!!!";
            this.setState({ alert: alert });
            this.setState({ showAlert: true, logOutHint: true });
            this.props.LobbyHandler("clearSession");
            // this.clearTimeOut = setTimeout(() => {
            //     this.logOutHandlerOne();
            //     // this.logOutHandler();
            // }, 4000);
            // this.clearTimeOut = setTimeout(() => {
            //     this.logOutHandler();
            // }, 1500);
        }
        if (data.Error === "ConnectionReplaced") {
            alert.lineOne = "You have an active session in another location";
            alert.lineTwo = "logging out from here..!!!";
            this.setState({ alert: alert });
            this.setState({ showAlert: true, logOutHint: true });
            this.props.LobbyHandler("clearSession");
            // this.clearTimeOut = setTimeout(() => {
            //     this.logOutHandlerOne();
            //     // this.logOutHandler();
            // }, 4000);
            // this.clearTimeOut = setTimeout(() => {
            //     this.logOutHandler();
            // }, 3000);
        }
        if (data.Error.hasOwnProperty("attr")) {
            let alert = this.state.alert;
            let regData = this.state.regData;
            let tourneyData = this.state.tourneyData;
            switch (data.Error.attr.code) {
                case "011":
                    regData.status = "Un Registered";
                    regData.statusAction = "Register";

                    this.setState({ regAlert: "Invalid action! Since you are not registered, please register now" });
                    this.setState({ regData: regData });
                    break;
                case "003":
                    alert.lineOne = "Please choose a table / tournament to open";
                    this.setState({ alert: alert });
                    this.setState({ showAlert: true });
                    break;
                case "008":
                    regData.status = "Registered";
                    tourneyData.status1 = "Unregister";
                    regData.statusAction = "Un Register";
                    this.setState({ regAlert: "You are already registered" });
                    this.setState({ regData: regData });
                    this.setState({ tourneyData });
                    break;
                case "040":
                    // console.log("hand shake error");
                    alert.lineOne = data.Error.attr.description;
                    window.location.reload();
                    this.setState({ alert: alert });
                    this.setState({ showAlert: true });
                    break;
                case "002":
                    // console.log("player session expired");
                    alert.lineOne = "Player session has expired";
                    // alert.lineOne = data.Error?.attr?.description;
                    alert.lineTwo = "logging out.......!";

                    this.setState({ alert: alert, showAlert: true, logOutHint: true });
                    setTimeout(() => {
                        this.props.data.logOutHandler();
                    }, 2000);
                    // this._lobbyNetwork.close();
                    // sessionStorage.clear();
                    // window.location.reload();
                    break;
                default:
                    alert.lineOne = data.Error.attr.description;
                    this.setState({ alert: alert });
                    this.setState({ showAlert: true });
                    break;
            }
        }
    };

    // logOutHandlerOne() {
    //     let alert = this.state.alert;
    //     alert.lineOne = "";
    //     alert.lineTwo = "";
    //     this.setState({ alert: alert, showAlert: false });

    //     var session = JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`));

    //     if (session && session.wSid) {
    //         fetch("/api/player/logout", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 siteid: this.config.URL_Environment.sitIds.sitid,
    //                 wsession: session.wSid,
    //             },
    //             body: JSON.stringify({}),
    //         })
    //             .then((resp) => resp.json())
    //             .then((resp) => {
    //                 // console.log("logout resp: ", resp);
    //                 sessionStorage.clear();
    //             })
    //             .catch((err) => {
    //                 // console.log("logout err: ", err);
    //                 sessionStorage.clear();
    //             });
    //     } else {
    //     }

    //     this.props.data.logOutHandler();
    // }


    onGetNews(data) {
        // console.log(data);
        let newsdata = [...this.state.news];
        if (data.NewsList.hasOwnProperty("News")) {
            let news = data.NewsList.News;
            if (Array.isArray(news)) {
                let i = 0,
                    cnt = news.length;
                function getText(html) {
                    var divContainer = document.createElement("div");
                    divContainer.innerHTML = html;
                    return divContainer.textContent || divContainer.innerText || "";
                }
                for (i; i < cnt; i++) {
                    newsdata.push({
                        title: new Date(parseInt(data.NewsList.News[i].attr.time)).toLocaleTimeString(),
                        content: getText(data.NewsList.News[i].ShortText),
                        id: data.NewsList.News[i].attr.id,
                    });
                    // console.log(getText(data.NewsList.News[i].ShortText));
                }
            } else {
            }


            this.setState({ news: newsdata, BgState: { opacity: 0.2, pointerEvents: "none" }, showNewsBox: true });
        }
    }
    onGetDPsettings(data) {
        let dpSettings = this.state.dpSettings;
        if (data.DpSetting.hasOwnProperty("attr")) {
            dpSettings.available = data.DpSetting.attr.protectionsLeft;
            dpSettings.left = data.DpSetting.attr.resetsLeft;
            dpSettings.date = new Date(parseInt(data.DpSetting.attr.renewDate)).toLocaleString();

            this.setState({ dpSettings: dpSettings });
            this.setState({ BgState: { opacity: 0.2, pointerEvents: "none" } });
            this.setState({ showDpSettings: true });
        }
    }
    onGetPlayerLevelInfo(data) {
        let levelData = this.state.levelData;
        levelData.level = data.PlayerLevelInfo.PlayerLevel.attr.name;
        // console.log(data);

        levelData.collection1 = data.PlayerLevelInfo.CompPointsEarned.attr.month;
        levelData.collection2 = data.PlayerLevelInfo.CompPointsEarned.attr.year;
        if (Array.isArray(data.PlayerLevelInfo.PlayerLevelStructure.PlayerLevel)) {
            let level = data.PlayerLevelInfo.PlayerLevelStructure.PlayerLevel;
            let i = 0,
                cnt = level.length;
            levelData.data = [];
            for (i; i < cnt; i++) {
                levelData.data.push({
                    level: data.PlayerLevelInfo.PlayerLevelStructure.PlayerLevel[i].attr.name,
                    earn: data.PlayerLevelInfo.PlayerLevelStructure.PlayerLevel[i].Obtain.attr.value,
                    date: new Date(parseInt(data.PlayerLevelInfo.PlayerLevelStructure.PlayerLevel[i].Obtain.attr.date)).toLocaleDateString(),
                });
            }

        }
        this.setState({ levelData: levelData });
        if (!this.state.profileshow) {
            this.setState({ BgState: { opacity: 0.2, pointerEvents: "none" } });
        }
        this.setState({ showLevelInfo: true });
    }

    onGetMyTable(data) {
        let myTables = this.state.myTables;
        if (data.MyTables.hasOwnProperty("Table")) {
            let tables = data.MyTables.Table;
            if (!Array.isArray(tables)) {
                tables = [tables];
            }
            let i = 0,
                cnt = tables.length;
            myTables = [];
            for (i; i < cnt; i++) {
                let activePlayers = Number(tables[i].attr["players-seats"].split("/")[0]);
                let activeSeats = Number(tables[i].attr["players-seats"].split("/")[1]);
                var splittedAveragePot = String(UM.roundToTwo(tables[i].attr["average-pot"])).split(".")[0];
                myTables.push({
                    name: <div className="df_al">
                        <span className="lobby_table_img">
                            <img style={{ height: "34px" }} src={require("../../../assets/images/lobby_icons/table_type/" + (!tables[i].attr.hasOwnProperty("jackpot") ? "icon_grid_table_type_normal" : "icon_grid_table_type_bbj") + ".png").default} alt="" />
                            <div className="lobby_table_active_seats">
                                <img style={{ height: "48px" }} src={require("../../../assets/images/lobby_icons/table_type/" +
                                    (activeSeats === 2 ? (activePlayers === 0 ? "itable_seats_2_empty" : (activePlayers === 1 ? "table_seats_2_onefilled" : "table_seats_2_twofilled")) :
                                        (activeSeats === 3 ? (activePlayers === 0 ? "table_seats_3_empty" : (activePlayers === 1 ? "table_seats_3_onefilled" : (activePlayers === 2 ? "table_seats_3_twofilled" : "table_seats_3_threefilled"))) :
                                            (activeSeats === 4 ? (activePlayers === 0 ? "table_seats_4_empty" : (activePlayers === 1 ? "icon_grid_table_seats_4_onefilled" : (activePlayers === 2 ? "table_seats_4_twofilled" : (activePlayers === 3 ? "table_seats_4_threefilled" : "table_seats_4_fourfilled")))) :
                                                (activeSeats === 5 ? activePlayers === 0 ? "table_seats_5_empty" : activePlayers === 1 ? "table_seats_5_onefilled" : activePlayers === 2 ? "table_seats_5_twofilled" : activePlayers === 3 ? "table_seats_5_threefilled" : activePlayers === 4 ? "table_seats_5_fourfilled" : "table_seats_5_fivefilled" :
                                                    (activeSeats === 6 ? activePlayers === 0 ? "table_seats_6_empty" : activePlayers === 1 ? "table_seats_6_onefilled" : activePlayers === 2 ? "table_seats_6_twofilled" : activePlayers === 3 ? "table_seats_6_threefilled" : activePlayers === 4 ? "table_seats_6_fourfilled" : activePlayers === 5 ? "table_seats_6_fivefilled" : "table_seats_6_sixfilled" :
                                                        (activeSeats === 7 ? activePlayers === 0 ? "table_seats_7_empty" : activePlayers === 1 ? "table_seats_7_onefilled" : activePlayers === 2 ? "table_seats_7_twofilled" : activePlayers === 3 ? "table_seats_7_threefilled" : activePlayers === 4 ? "table_seats_7_fourfilled" : activePlayers === 5 ? "table_seats_7_fivefilled" : activePlayers === 6 ? "table_seats_7_sixfilled" : "table_seats_7_sevenfilled" :
                                                            (activeSeats === 8 ? activePlayers === 0 ? "table_seats_8_empty" : activePlayers === 1 ? "table_seats_8_onefilled" : activePlayers === 2 ? "table_seats_8_twofilled" : activePlayers === 3 ? "table_seats_8_threefilled" : activePlayers === 4 ? "table_seats_8_fourfilled" : activePlayers === 5 ? "table_seats_8_fivefilled" : activePlayers === 6 ? "table_seats_8_sixfilled" : activePlayers === 7 ? "table_seats_8_sevenfilled" : "table_seats_8_eightfilled" :
                                                                (activeSeats === 9 ? activePlayers === 0 ? "table_seats_8_empty" : activePlayers === 1 ? "table_seats_8_onefilled" : activePlayers === 2 ? "table_seats_8_twofilled" : activePlayers === 3 ? "table_seats_8_threefilled" : activePlayers === 4 ? "table_seats_8_fourfilled" : activePlayers === 5 ? "table_seats_8_fivefilled" : activePlayers === 6 ? "table_seats_8_sixfilled" : activePlayers === 7 ? "table_seats_8_sevenfilled" : "table_seats_8_eightfilled" :
                                                                    // (activeSeats === 9 ? activePlayers === 0 ? "table_seats_9_empty" : activePlayers === 1 ? "table_seats_9_onefilled" : activePlayers === 2 ? "table_seats_9_twofilled" : activePlayers === 3 ? "table_seats_9_threefilled" : activePlayers === 4 ? "table_seats_9_fourfilled" : activePlayers === 5 ? "table_seats_9_fivefilled" : activePlayers === 6 ? "table_seats_9_sixfilled" : activePlayers === 7 ? "table_seats_9_sevenfilled" : activePlayers === 8 ? "table_seats_9_eightfilled" : "table_seats_9_ninefilled" :
                                                                    (activeSeats === 10 ? activePlayers === 0 ? "table_seats_10_empty" : activePlayers === 1 ? "table_seats_10_onefilled" : activePlayers === 2 ? "table_seats_10_twofilled" : activePlayers === 3 ? "table_seats_10_threefilled" : activePlayers === 4 ? "table_seats_10_fourfilled" : activePlayers === 5 ? "table_seats_10_fivefilled" : activePlayers === 6 ? "table_seats_10_sixfilled" : activePlayers === 7 ? "table_seats_10_sevenfilled" : activePlayers === 8 ? "table_seats_10_eightfilled" : activePlayers === 9 ? "table_seats_10_ninefilled" : "table_seats_10_tenfilled" : "itable_seats_2_empty")))))))
                                        )) + ".png").default} alt="" />
                            </div>
                        </span>
                        <div className="df" style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div className="df" style={{ flexDirection: 'column', justifyContent: 'center', color: '#ffff', margin: '0px 10px' }}>
                                <span style={{ fontSize: '15px' }}>{tables[i].attr.name}</span>
                                <span style={{ fontSize: '12px', color: '#979696', marginTop: '2px' }}>{(UM.numberWithCommas(tables[i].attr.stakes.split("/")[0]) + "/" + UM.numberWithCommas(tables[i].attr.stakes.split("/")[1]))}{", "}{UM.GameName(tables[i].attr.game)}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'end' }}>
                                <span>{UM.numberWithCommas(splittedAveragePot)}{" / "}{tables[i].attr["players-per-2nd-round"]}%  {" / "} {tables[i].attr["hands-per-hour"]}</span>
                                <span style={{ marginTop: '3px', color: '#979696' }}> Players:  <span className="clr_river">{tables[i].attr["players-seats"]}</span></span>
                            </div>
                        </div>
                    </div>,
                    id: tables[i].attr.id,
                    type: tables[i].attr.type,
                });
            }
            this.setState({ myTables: myTables });
            if (this.state.myTables.length && !this.state.sortType) {
                this._lobbyNetwork.send(`<GetTableDetails id="${this.state.myTables[this.state.myTables.length - 1].id}" type="${this.state.myTables[this.state.myTables.length - 1].type}"/>`)
                this.setState({ showActiveTables: true });
            }
        } else {
            myTables = [];
            this.setState({ myTables: myTables });
            if (this.state.myTournaments.length === 0) {
                if (this.state.myTournaments.length && this.state.myTables.length) {
                    this.setState({ showActiveTables: false });
                }
            }
        }
    }
    onGetMyTournaments(data) {
        let myTournaments = this.state.myTournaments;
        let myTournamentsids = this.state.myTournamentsids;
        if (data.MyTournaments.hasOwnProperty("Table")) {
            let tables = data.MyTournaments.Table;
            if (!Array.isArray(tables)) {
                tables = [tables];
            }

            let i = 0,
                cnt = tables.length;
            myTournaments = [];
            myTournamentsids = [];
            for (i; i < cnt; i++) {

                // let status = '';
                let imgSource;
                const startDate = new Date(parseInt(tables[i].attr.tournamentStart));
                const formattedDate = startDate.toLocaleString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false
                });
                switch (tables[i].attr.status) {
                    case "CANCELED_BEFORE_START":
                        // status = "Cancelled";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_tourneycancelled.png").default;
                        break;
                    case "CANCELED_AFTER_START":
                        // status = "Cancelled";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_tourneycancelled.png").default;
                        break;
                    case "COMPLETED":
                        // status = "Completed";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_completed.png").default;
                        break;
                    case "SEATING":
                        // status = "Seating";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_lateregister.png").default;
                        break;
                    case "REGISTERING":
                        // status = "Registering";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_registering.png").default;
                        break;
                    case "ANNOUNCED":
                        // status = "Announced";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_anounced.png").default;
                        break;
                    case "LATE_REG":
                        // status = "Late Registration";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_lateregister.png").default;
                        break;
                    case "RUNNING":
                        // status = "Running";
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_running.png").default;
                        break;
                    default:
                        // status = tables[i].attr.status;
                        imgSource = require("../../../assets/images/lobby_icons/table_type/table_type_anounced.png").default;
                        break;
                }

                myTournaments.push({
                    name:
                        <div className="df_al" >
                            <span className="lobby_table_img">
                                <img style={{ height: "34px" }} src={imgSource} alt="" />
                            </span>
                            <div className="df" style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div className="df" style={{ flexDirection: 'column', justifyContent: 'center', color: '#ffff', margin: '0px 10px' }}>
                                    <span style={{ fontSize: '15px' }}>{tables[i].attr.name}</span>
                                    <span style={{ fontSize: '12px', color: '#979696', marginTop: '2px' }}>{formattedDate}{", "}{UM.GameName(tables[i].attr.game)}{", "}{UM.textFormat(tables[i].attr.status)}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'end' }}>
                                    <span>Buy-In: {(tables[i].attr.buyIn === 'FREEROLL' ? tables[i].attr.buyIn : UM.numberWithCommas(tables[i].attr.buyIn))}</span>
                                    <span style={{ marginTop: '3px', color: '#979696' }}>Players: <span className="clr_river">{tables[i].attr.players}</span></span>
                                </div>
                            </div>
                        </div >,
                    id: tables[i].attr.id,
                    type: tables[i].attr.type,
                });
                myTournamentsids.push(tables[i].attr.id)
            }

            this.setState({ myTournaments: myTournaments, myTournamentsids: myTournamentsids });
            if (this.state.myTournamentsids.length && !this.state.sortType) {
                this.setState({ showActiveTables: true });
            }
        } else {
            myTournamentsids = [];
            myTournaments = [];
            this.setState({ myTournamentsids: myTournamentsids });
            if (this.state.myTables.length && this.state.myTournamentsids.length) {
                this.setState({ showActiveTables: false });
            }
        }
    }
    onGetPlayerSearchResult(data) {
        let playerTables = this.state.findPlayerData;
        if (data.PlayerSearchResult.hasOwnProperty("Result")) {
            let tables = data.PlayerSearchResult.Result;
            if (!Array.isArray(tables)) {
                tables = [tables];
            }

            let i = 0,
                cnt = tables.length;
            playerTables = [];
            for (i; i < cnt; i++) {
                if (tables[i].Table.attr.type === "SITANDGO_TOURNAMENT" || tables[i].Table.attr.type === "SCHEDULED_TOURNAMENT") {
                    playerTables.push({
                        name: tables[i].Table.attr.name,
                        game: UM.GameName(tables[i].Table.attr.game),
                        stakes: "NA",
                        seats: tables[i].Table.attr.players,
                        wait: "NA",
                        pf: "NA",
                        id: tables[i].Table.attr.id,
                        type: tables[i].Table.attr.type,
                    });
                }
                if (tables[i].Table.attr.type === "SINGLE_TABLE") {
                    playerTables.push({
                        name: tables[i].Table.attr.name,
                        game: UM.GameName(tables[i].Table.attr.game),
                        stakes: tables[i].Table.attr.stakes,
                        seats: tables[i].Table.attr["players-seats"],
                        wait: tables[i].Table.attr.wait,
                        pf: tables[i].Table.attr["players-per-2nd-round"],
                        id: tables[i].Table.attr.id,
                        type: tables[i].Table.attr.type,
                    });
                }
            }

            this.setState({ findPlayerData: playerTables });
            this.setState({ BgState: { opacity: 0.2, pointerEvents: "none" } });

            this.setState({ showFindPlayer: true });
        } else {
            this.setState({ findPlayerData: [{ name: "Player not found" }] });
            this.setState({ BgState: { opacity: 0.2, pointerEvents: "none" } });
            this.setState({ showFindPlayer: true });
        }
    }
    onTournamentPlayerRegistered(data) {
        let regData = this.state.regData;
        let tourneyData = this.state.tourneyData;

        regData.status = "Registered";
        regData.statusAction = "Un Register";
        tourneyData.status1 = "Unregister";
        this.setState({ regAlert: "You Are Succesfully registered👍" });
        this.setState({ regData: regData, tourneyData: tourneyData });
    }
    onTournamentPlayerUnregistered(data) {
        this.setState({ UnRegisterpopup: true })
        let regData = this.state.regData;
        let tourneyData = this.state.tourneyData;
        regData.status = "Un Registered";
        regData.statusAction = "Register";
        tourneyData.status1 = "Register";
        this.setState({ regAlert: "You Are Succesfully Unregistered", tourneyData: tourneyData });
    };

    onGetBuddies(data) {
        const { myBuddies } = this.state;
        let updatedBuddies = [...myBuddies];

        if (data?.Buddies?.PlayerInfo) {
            let players = data.Buddies.PlayerInfo;

            players = Array.isArray(players) ? players : [players];

            players.forEach((player) => {
                const nickname = player?.attr?.nickname;
                const countryId = player?.Location?.attr?.countryId;

                if (nickname && countryId) {
                    const isAlreadyAdded = updatedBuddies.some((obj) => obj.name === nickname);

                    if (!isAlreadyAdded) {
                        updatedBuddies.push({ id: countryId, name: nickname });
                    }
                }
            });
        } else {
            updatedBuddies = ["No buddies to show"];
        }

        this.setState({ myBuddies: updatedBuddies });
    };

    // onGetBuddies(data) {
    //     // console.log(data);
    //     let myBuddies = this.state.myBuddies;
    //     if (data.Buddies.hasOwnProperty("PlayerInfo")) {
    //         let players = data.Buddies.PlayerInfo;
    //         if (!Array.isArray(players)) {
    //             players = [players];
    //         }
    //         let i = 0,
    //             cnt = players.length;
    //         for (i; i < cnt; i++) {
    //             if (!(myBuddies.some(obj => obj.name === players[i].attr.nickname))) {
    //                 myBuddies.push({ id: players[i].Location.attr.countryId, name: players[i].attr.nickname });
    //             }
    //             // myBuddies.push({ id: players[i].Location.attr.countryId, name: players[i].attr.nickname });
    //         }
    //         this.setState({ myBuddies: myBuddies });
    //     } else {
    //         myBuddies = ["No buddies to show"];
    //         this.setState({ myBuddies: myBuddies });
    //     }
    // }
    onBuddyRemoved(data) {
        if (data.BuddyRemoved.hasOwnProperty("PlayerInfo")) {
            this._lobbyNetwork.send(`<GetBuddies/>`);
        }
    }
    changeGrid(game) {
        // console.log("====> from change grid", game);
        if (game === 'TOURNEYS') {
            this.setState({ showMainGridThree: false });
            this.setState({ showMainGridOne: false });
            this.setState({ showMainGridTwo: true });
            this.setState({ sitGoData: { name: "", date: "", buyIn: "", type: "", typeText: "", status: "", players: "", prize: "", description: "", id: "", Tournament_start: "", Tournament_cancelled: "", status1: "Register" } })
            this.setState({ tableData: { name: "No Table Selected", id: "", type: "", hands_per_hour: "", average_pot: "", data: [], seats: [], } })
        } else if (game === 'SIT & GO') {
            this.setState({ showMainGridTwo: false });
            this.setState({ showMainGridOne: false });
            this.setState({ showMainGridThree: true });
            this.setState({ tourneyData: { name: "", date: "", buyIn: "", type: "", typeText: "", status: "", players: "", prize: "", description: "", id: "", Tournament_start: "", Tournament_cancelled: "", status1: "Register" } })
            this.setState({ tableData: { name: "No Table Selected", id: "", type: "", hands_per_hour: "", average_pot: "", data: [], seats: [], } })
        } else {
            this.setState({ showMainGridTwo: false });
            this.setState({ showMainGridThree: false });
            this.setState({ showMainGridOne: true });
            this.setState({ tourneyData: { name: "", date: "", buyIn: "", type: "", typeText: "", status: "", players: "", prize: "", description: "", id: "", Tournament_start: "", Tournament_cancelled: "", status1: "Register" } })
            this.setState({ sitGoData: { name: "", date: "", buyIn: "", type: "", typeText: "", status: "", players: "", prize: "", description: "", id: "", Tournament_start: "", Tournament_cancelled: "", status1: "Register" } })
        }
    }
    changeLobbyButtonState(group) {
        switch (group) {
            case "TDpageJoinTable":
                this.setState({ showTDbtn_joinMe: true, showTDbtn_seatMe: true });
                this.isSeatMe = false;
                break;
            case "TDpageSeatMe":
                this.setState({ showTDbtn_joinMe: true, showTDbtn_seatMe: true });
                this.isSeatMe = true;
                break;
            case "mainGridDblClick":
                this.isSeatMe = false;
                this.clearTimeOut = setTimeout(() => {
                    this.setState({ showTDbtn_joinMe: true, showTDbtn_seatMe: true });
                }, 1000);
                break;
            default:
                break;
        }
    }
    setPopUpActionsOpen(action) {
        // console.log(action);
        this.setState({ BgState: { opacity: 0.2, pointerEvents: "none" } });
        switch (action) {
            case "REG":
                this.setState({ regAlert: "", showRegistration: true });
                break;
            case "INFO":
                this.setState({ showInfo: false });
                break;
            case "openSideMiniTable":
                this.openNav();
                break;
            default:
                break;
        }
    }
    setPopUpActionsClose(action, state) {
        switch (action) {
            case "REG":
                this.setState({ showRegistration: false });
                break;
            case "hideAlert":
                let alert = { ...this.state.alert };
                alert.lineOne = "";
                alert.lineTwo = "";
                // console.log(this.state.logOutHint)
                if (this.state.logOutHint) {
                    // this.props.LobbyHandler("activate_loader", true);
                    // this.clearTimeOut = setTimeout(() => {
                    // this.props.LobbyHandler("activate_loader", false);
                    this.clearTimeOut = setTimeout(() => {
                        this.logOutHandler();
                    }, 100);
                    // alert.lineTwo = "";
                    // this.setState({ logOutHint: false });
                    // this.clearTimeOut(this.clearTimeOut);
                    // }, 1000);
                }
                this.setState({ alert: alert, showAlert: !this.state.logOutHint ? false : undefined });
                if (this.state.isGetingResponse !== "") {
                    this.setState({ isGetingResponse: "", isGetingResponse1: "" })
                    clearTimeout(this.serverResponseTime);
                }
                break;
            case "hideNews":
                this.setState({ showNewsBox: false });
                break;
            case "hideDp":
                this.setState({ showDpSettings: false });
                break;
            case "hidePLI":
                this.setState({ showLevelInfo: false });
                break;
            case "hideMyTables":
                this.setState({ showMyTables: false });
                break;
            case "hideMyTourneys":
                this.setState({ showMyTournaments: false });
                break;
            case "hideFindPlayer":
                this.setState({ showFindPlayer: false });
                break;
            case "hideThemes":
                this.setState({ showOptions: false });
                break;
            case "hideAvtar":
                this.setState({ showAvtar: false });
                break;
            case "Cashier":
                this.setState({ showCashier: false });
                break;
            case "hideBuddies":
                this.setState({ showMyBuddies: false });
                break;
            case "hideHistory":
                this.state.historyData = [];
                this.state.historyDataForReplay = [];
                this.setState({ showpokerHistory: false });
                break;
            case "hideTourneyDet":
                this.setState({ showTourneyDetails: false });
                break;
            case "hideSitnGoDet":
                this.setState({ showSitnGoDetails: false });
                break;
            case "hideMyActiveTourCashTables":
                this.setState({ showActiveTables: false });
                break;
            case "Unregisterpopup":
                this.setState({ UnRegisterpopup: false })
                break;
            case "showTourneyLobby":
                // this.props.LobbyHandler("activate_loader", true);
                this.setState({ showTourneyLobby: true })
                break;
            case "logout_yes":
                // this.props.LobbyHandler("activate_loader", true);
                this.clearTimeOut = setTimeout(() => {
                    this.setState({ alert: { lineOne: "", lineTwo: "", }, showAlert: false, });
                    this.logOutHandler();
                    // }, 2000);
                }, 200);
                break;
            case "exit_yes":
                // this.props.LobbyHandler("activate_loader", true);
                // this.clearTimeOut = setTimeout(() => {
                this.setState({ alert: { lineOne: "", lineTwo: "", }, showAlert: false });
                // this.clearTimeOut = setTimeout(() => {
                //     if (window._cdvElectronIpc && window._cdvElectronIpc.exitApp) {
                //         window._cdvElectronIpc.exitApp();
                //     } else {
                //         console.error('Exit functionality is not available.');
                //     }
                // }, 100);
                this.clearTimeOut = setTimeout(() => {
                    this.handleExit();
                }, 100);

                // }, 2000);
                break;
            case "activeTables":
                // this.props.LobbyHandler("activate_loader", true);
                this.setState({ showTourneyLobby: true });
                break;
            default:
                break;
        }
    };

    handleExit = () => {
        const getDeviceInfo = () => {
            return navigator.platform;
        };
        const platform = getDeviceInfo();
        const userAgent = navigator.userAgent;

        if (platform === 'Win32') {
            window.close();
        }
        else if (platform === 'MacIntel' || userAgent.includes('Mac OS')) {
            if (window._cdvElectronIpc && window._cdvElectronIpc.exitApp) {
                window._cdvElectronIpc.exitApp();
            } else {
                console.error('Exit functionality not available on macOS.');
            }
        }
        else if (/iPhone|iPad|iPod|Android/i.test(platform)) {
            if (navigator.app && navigator.app.exitApp) {
                navigator.app.exitApp();
            } else {
                console.error('Exit functionality not available on mobile.');
            }
        }
        else {
            console.error('Unsupported platform:', platform);
        }
    };



    lobbyMenuHandler(action, to) {
        let cashier = document.getElementById("casheiarButton");
        let OptionsBtn = document.getElementById("optionsButton");
        switch (action) {
            case "News":
                this._lobbyNetwork.send("<GetNewsList/>");
                break;
            case "DP":
                this._lobbyNetwork.send("<GetDpSetting/>");
                break;
            case "Cashier":
                var sid = "";
                if (sessionStorage.getItem(`${window.location.hostname}'_wSid'`) !== null) {
                    var ws = JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid;
                    sid = (ws).split(".")[1]
                } else if (sessionStorage.getItem(`${window.location.hostname}'_sid'`) !== null) {
                    sid = JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_sid'`)).sid;
                }
                window.open(`https://${window.location.host}/client-redirect?LANG=en&sid=${sid}&to=deposit`)
                break;
            case "Options":
                this.setState({ showOptions: true });
                this.setState({ BgState: { opacity: 0.2, pointerEvents: "none" } });
                break;
            case "MyTables":
                this.state.myTables = [];
                this._lobbyNetwork.send("<GetMyTables/>");
                this.setState({ showMyTables: true });
                this.setState({ BgState: { opacity: 0.2, pointerEvents: "none" } });
                break;
            case "MyTourney":
                this.state.myTournaments = [];
                this._lobbyNetwork.send("<GetMyTournaments/>");
                this.setState({ BgState: { opacity: 0.2, pointerEvents: "none" } });
                this.setState({ showMyTournaments: true });
                break;
            case "MyBuddies":
                this._lobbyNetwork.send("<GetBuddies/>");
                this.setState({ BgState: { opacity: 0.2, pointerEvents: "none" } });
                this.setState({ showMyBuddies: true });
                break;
            case "FindPlayer":
                this.setState({ findPlayerData: [] });
                this.setState({ showFindPlayer: true });
                this.setState({ BgState: { opacity: 0.2, pointerEvents: "none" } });
                break;
            case "PLI":
                this._lobbyNetwork.send(`<GetPlayerLevelInfo/>`);
                this.setState({ BgState: { opacity: 0.2, pointerEvents: "none" } });
                break;
            case "Avtar":
                this.setState({ showAvtar: true });
                this.setState({ BgState: { opacity: 0.2, pointerEvents: "none" } });
                break;
            case "History":
                this.setState({ showpokerHistory: true });
                this.setState({ BgState: { opacity: 0.2, pointerEvents: "none" } });
                break;
            case "lobby_show":
                // this.props.LobbyHandler("activate_loader", true);
                // this.clearTimeOut = setTimeout(() => {
                this.setState({ profileshow: false, showProfile: false });
                //     this.props.LobbyHandler("activate_loader", false);
                // }, 1000);
                break;
            case "showActiveTables":
                this._lobbyNetwork.send("<GetMyTables/>");
                this._lobbyNetwork.send("<GetMyTournaments/>");
                this.setState({ showActiveTables: true });
                break;
            case "show_url_err":
                this.setState({ showRedirectionUrlErr: true });
                this.clearTimeOut = setTimeout(() => {
                    this.setState({ showRedirectionUrlErr: false });
                }, 1000);
                break;
            case "Close_table":
                // this.props.LobbyHandler("activate_loader", true);
                // this.clearTimeOut = setTimeout(() => {
                this.setState({ profileshow: false });
                //     this.props.LobbyHandler("activate_loader", false);
                // }, 1000);
                break;
            case "drop_down_state":
                this.setState({ drop_down_state: to })
                break;
            case "showCashierPopUp":
                if (cashier) {
                    cashier.classList.add('active');
                }
                this.setState({ showCashierPopUp: true });
                break;
            case "showOptionsPopUp":
                if (OptionsBtn) {
                    OptionsBtn.classList.add('active');
                }
                this.setState({ showpokerHistory: true });
                break;
            case "hideOptionsPopUp":
                if (OptionsBtn) {
                    OptionsBtn.classList.remove('active');
                }
                this.setState({ showpokerHistory: false, historyData: [], optionMenu: "", findPlayerData: [] });
                break;
            case "hideCashierPopUp":
                if (cashier) {
                    cashier.classList.remove('active');
                }
                this.setState({ showCashierPopUp: false });
                break;
            case "logOut_exit":
                this.openMenuOptions(to)
                break;
            default:
                break;
        }
    }
    setThemes(group, data) {
        // console.log("group", group)
        switch (group) {
            case "Table":
                this.props.setThemesL("Table", data);
                break;
            case "Cards":
                break;
            default:
                console.info("there is no Table and cards themes from option component")
                break;
        }
        // console.log("data", data)
    }

    logOutHandler(e) {
        clearTimeout(this.clearTimeOut)
        const session = JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`));

        if (session && session.wSid) {
            fetch(`${this.config.URL_Environment.proxy.baseUrl}${this.config.URL_Environment.apiPath.logout_Api}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    siteid: this.config.URL_Environment.sitIds.sitid,
                    wsession: session.wSid,
                },
                body: JSON.stringify({}),
            })
                .then((response) => response.json())
                .then((data) => {
                    // console.log("Logout response:", data);
                    window.location.reload();
                    this.props.data.logOutHandler();
                })
                .catch((error) => {
                    console.error("Logout error:", error.message);
                });
        } else {
            console.info("No session found or invalid session.");
            sessionStorage.clear();
        }
    }

    readXMl(event) {
        let data1 = event.target.response;
        let data = JSON.parse(data1);
        // console.log("logout data");
        if (data) {
            if (data.success === true) {
                console.log("successfully logged out");
                sessionStorage.clear();
            } else {
                console.log("could not log out");
            }
        }
    }

    handleErrorEvent(e) {
        // console.log("error fired");
        // console.log(e);
        sessionStorage.clear();
        window.location.reload();
    }
    getHandHistory(startDate, endDate) {
        this.setState({ gameHistoryErrorMsg: "" });
        this.state.historyData = [];
        this.state.historyDataForReplay = [];
        if (startDate !== null && endDate !== null) {
            var body = {
                currency: (fileName.name === "Riverpoker" ? "CHP" : "ARS"),
                startDate: startDate,
                endDate: endDate,
                types: ["POKER_HOLDEMNOLIMIT_CHP,HOLDEM,NOLIMIT", "POKER_HOLDEMLIMIT_CHP,HOLDEM,LIMIT", "POKER_OMAHANOLIMIT_CHP,OMAHA,NOLIMIT", "POKER_OMAHALIMIT_CHP,OMAHA,LIMIT"],
                limit: "100",
                index: "0",
            }; //cashout
            // var body = {
            //     currency: (fileName.name === "Riverpoker" ? "CHP" : "ARS"),
            //     startDate: startDate,
            //     endDate: endDate,
            //     "types": [
            //         "POKER_HOLDEMNOLIMIT_CHP,HOLDEM,NOLIMIT",
            //         "POKER_HOLDEMLIMIT_CHP,HOLDEM,LIMIT",
            //         "POKER_OMAHANOLIMIT_CHP,OMAHA,NOLIMIT",
            //         "POKER_OMAHALIMIT_CHP,OMAHA,LIMIT",
            //         "POKER_OMAHAPOTLIMIT_CHP,OMAHA,LIMIT",
            //         "POKER_OMAHAPOTLIMIT_CHP,OMAHA,POTLIMIT",
            //         "POKER_OMAHAFIVECARDSNOLIMIT_CHP,OMAHA,NOLIMIT",
            //         "POKER_OMAHAFIVECARDSPOTLIMIT_CHP,OMAHA,POTLIMIT"
            //     ],
            //     "limit": 100,
            //     "index": 0
            // }; //cashout

            var pathW = this.config.URL_Environment.proxy.baseUrl + this.config.URL_Environment.apiPath.handHistory_Api;

            var xhr = new XMLHttpRequest();
            xhr.open("POST", pathW, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("siteid", this.config.URL_Environment.sitIds.sitid);
            if (sessionStorage.getItem(`${window.location.hostname}'_wSid'`) !== null) {
                xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid);
            } else if (sessionStorage.getItem(`${window.location.hostname}'_sid'`) !== null) {
                xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_sid'`)).sid);
            }
            xhr.addEventListener("load", (e) => {
                this.historydata(e);
            });

            if (body) {
                // console.log("sending with body");
                xhr.send(JSON.stringify(body));
            } else {
                // console.log("sending without body");
                xhr.send();
            }
        } else {
            this.setState({ gameHistoryErrorMsg: "please enter valid dates" });
        }
    }
    historydata(data) {
        // console.log("the history response is");
        let tableDataH = JSON.parse(data.target.response);
        // console.log(tableDataH);

        let hData = this.state.historyData;
        let hrData = this.state.historyDataForReplay;

        if (tableDataH !== null) {
            // console.log(tableDataH)
            // if (tableDataH.success) {
            //     let tData = tableDataH.playSession;
            //     let i = 0,
            //         cnt = tData.length;
            //     hrData = [];
            //     for (i; i < cnt; i++) {
            //         hrData.push({
            //             startDate: tData[i].startDate,
            //             finishDate: tData[i].finishDate,
            //             tableName: tData[i].tableName,
            //             roundsCount: tData[i].roundsCount,
            //             payouts: tData[i].payouts,
            //             compPoints: tData[i].compPoints,
            //             bonusBuyIn: tData[i].bonusBuyIn,
            //             bets: tData[i].bets,
            //             buyIn: tData[i].buyIn,
            //             playSessionId: tData[i].playSessionId
            //         });
            //     }
            //     this.setState({ historyData: hrData, historyDataForReplay: hrData });
            // } else {
            //     this.setState({ gameHistoryErrorMsg: "No records found" });
            //     this.clearTimeOut = setTimeout(() => {
            //         this.setState({ gameHistoryErrorMsg: "" });
            //     }, 8000);
            // }
            let tables = tableDataH.values;
            if (tables !== undefined && tableDataH.values.length !== 0) {
                let i = 0,
                    cnt = tables.length;
                hData = [];
                for (i; i < cnt; i++) {
                    // hData.push({
                    //     time: tables[i].tableInfo.startDate,
                    //     tableName: UM.textFormat(tables[i].tableInfo.name),
                    //     name: UM.textFormat(tables[i].tableInfo.name),
                    //     hands: tables[i].sessionInfo.roundsCount,
                    //     // result: tables[i].tableInfo.casinoRevenue 
                    //     result: UM.numberWithCommas(tables[i].tableInfo.casinoRevenue)
                    // });
                    hData.push({
                        startDate: tables[i].tableInfo.startDate,
                        finishDate: tables[i].tableInfo.finishDate,
                        tableName: UM.textFormat(tables[i].tableInfo.name),
                        roundsCount: tables[i].sessionInfo.roundsCount,
                        payouts: UM.changeAmtLabel(tables[i].sessionInfo.payouts),
                        compPoints: UM.changeAmtLabel(tables[i].sessionInfo.compPoints),
                        bonusBuyIn: UM.changeAmtLabel(tables[i].sessionInfo.bonusBuyIn),
                        bets: UM.changeAmtLabel(tables[i].sessionInfo.bets),
                        buyIn: UM.changeAmtLabel(tables[i].sessionInfo.buyIn),

                        // name: UM.textFormat(tables[i].tableInfo.name),
                        // result: tables[i].tableInfo.casinoRevenue 
                        // result: UM.numberWithCommas(tables[i].tableInfo.casinoRevenue)
                    });
                }
                this.setState({ historyData: hData });
            } else {
                this.setState({ gameHistoryErrorMsg: "No records found" });
                setTimeout(() => {
                    this.setState({ gameHistoryErrorMsg: "" });
                }, 8000);
            }
        } else {
            hData.push({ time: "No Tables To Show" });
            this.setState({ historyData: hData });
            this.setState({ historyDataForReplay: hrData });
        }
        this.setState({ subHistorydata: tableDataH });
    }
    // openMenu() {
    //     var menuSide = document.getElementById("menuSide");
    //     menuSide = menuSide.classList.add("active");
    //     var menuCover = document.getElementById("menuCover");
    //     menuCover = menuCover.classList.add("active");
    // }
    // closeMenu() {
    //     var menuSide = document.getElementById("menuSide");
    //     menuSide = menuSide.classList.remove("active");
    //     var menuCover = document.getElementById("menuCover");
    //     menuCover = menuCover.classList.remove("active");
    // }

    openMenu() {
        const menuSide = document.getElementById("menuSide");
        const menuCover = document.getElementById("menuCover");

        if (menuSide) {
            menuSide.classList.add("active");
        }
        if (menuCover) {
            menuCover.classList.add("active");
        }
    }

    closeMenu() {
        const menuSide = document.getElementById("menuSide");
        const menuCover = document.getElementById("menuCover");

        if (menuSide) {
            menuSide.classList.remove("active");
        }
        if (menuCover) {
            menuCover.classList.remove("active");
        }
    }

    onOpenTable(data) {
        this.props.LobbyHandler("openCashTable", { ...data, isSeatMe: this.isSeatMe });
    }
    onOpenTournamentLobby(data) {
        this.props.LobbyHandler("openTournamentLobby", data);
    }

    FilterCheck(data) {
        this.FilterCheck(data)
    }
    ProfilePop(data) {
        this.setState({ showLevelInfo: false });
        this.setState({ profileshow: data, showProfile: true });
        // this.setAvtar();
    }
    emitChildMethod = () => {
        let myTables = this.state.myTables;
        let myTournaments = this.state.myTournaments;
        if (this._lobbyNetwork) {
            myTables = [];
            myTournaments = [];
            this.setState({ myTables: myTables, myTournaments: myTournaments });
            if (this.state.myTournaments.length && this.state.myTables.length) {
                this.setState({ showActiveTables: false });
            }
            this._lobbyNetwork.send("<GetMyTables/>");
            this._lobbyNetwork.send("<GetMyTournaments/>");
            this.setState({ showTourneyLobby: false, showProfile: false });
        }
    };

    Close_profile_emitChildMethod = () => {
        if (this._lobbyNetwork) {
            this.setState({ showTourneyLobby: true });
            this.setState({ profileshow: false });
        }
    }


    // tourneyEmitChildMethod = () => {
    //     console.log(this.props.tourneyLobbyId, this.state.selectedTournyLobbyId);
    //     if (this.props.tourneyLobbyId) {
    //         if (!this.state.selectedTournyLobbyId) {
    //             this.setState({ selectedTournyLobbyId: this.props.tourneyLobbyId });
    //         } else if (this.state.selectedTournyLobbyId !== this.props.tourneyLobbyId) {
    //             this._lobbyNetwork.send(`<GetTableDetails id="${this.props.tourneyLobbyId}" type="SCHEDULED_TOURNAMENT" />`)
    //             this._lobbyNetwork.send(`<OpenTable id="${this.props.tourneyLobbyId}" type="SCHEDULED_TOURNAMENT"/>`);
    //             alert("hit")
    //         }
    //         // console.log(this.state.selectedTournyLobbyId)
    //         // alert("hit")
    //     }
    // }



    componentWillUnmount() {
        clearTimeout(this.clearTimeOut);
        clearTimeout(this.serverResponseTime);
    }

    openMenuOptions(value, state) {
        // console.log(value, state)
        if (value === "show_lobby") {
            this.props.LobbyHandler("show_tourneyLobby", undefined);
            this.clearTimeOut = setTimeout(() => {
                this.setState({ showTourneyLobby: false });
            }, 1500);
        } else if (value === "show_profile") {
            this.setState({ openLobby_Table: true, })
            this._lobbyNetwork.send("<GetPlayerInfo/>");
            this.ProfilePop(true);
        } else if (value === "logout_player") {
            this.setState({
                alert: {
                    lineOne: "Are You Sure",
                    lineTwo: "Want to logout...!",
                },
                showAlert: true
            });
        } else if (value === "exit_player") {
            this.setState({
                alert: {
                    lineOne: "Are You Sure",
                    lineTwo: "Want to exit...!",
                },
                showAlert: true
            });
        } else if (value === "show_profile_table") {
            this.setState({ openLobby_Table: false })
            this._lobbyNetwork.send("<GetPlayerInfo/>");
            this.ProfilePop(true);
        } else if (value === "Tourny_lobby_menu_activated") {
            this.props.LobbyHandler("Tourny_lobby_menu_activated", state);
        } else if (value === "show_changeAvatar_popup") {
            this.setState({ showAvtar: true });
        }
    }
    tableRequest(table) {

        console.log(table)

        // let myTables = this.state.myTables, data = this.state.data, dataTourney = this.state.dataTourney, dataSitGo = this.state.dataSitGo;
        // data = []; myTables = []; dataTourney = []; dataSitGo = [];
        const mySidenav = document.getElementById("mySidenav");
        const isSidebarOpen = mySidenav && mySidenav.style.width === "28.846vw";
        this.closeNav();
        const delay = isSidebarOpen ? 400 : 0;
        setTimeout(() => {
            // this.setState({ data: data, myTables: myTables, dataTourney: dataTourney, dataSitGo: dataSitGo, showTables: table });
            console.log(this.state.showTables)
            // this.AnimationMiniTable((table === "Tournaments" && this.state.showTables === "Sit_Go") ? "LEFT" : "RIGHT" || table === "Sit_Go" ? "RIGHT" : "LEFT", table)
            // this.AnimationMiniTable((this.state.showTables === "" || this.state.showTables === "Cash_Games" && table === "Tournaments") ? "RIGHT" : table === "Sit_Go" ? "RIGHT" : table === "Cash_Games" ? "LEFT" : "RIGHT", table)
            this.AnimationMiniTable(
                (this.state.showTables === "" || (this.state.showTables === "Cash_Games" && table === "Tournaments"))
                    ? "RIGHT"
                    : table === "Sit_Go"
                        ? "RIGHT"
                        : table === "Cash_Games"
                            ? "LEFT"
                            : (this.state.showTables === "Sit_Go" && table === "Tournaments") ? "LEFT" : "RIGHT",
                table
            );

        }, delay);
    }

    AnimationMiniTable = (data, show) => {
        const element = document.getElementById("GridTablesList");
        if (this.state.showTables === show) return;
        this.setState({ showTables: show });
        if (element) {
            if (data === "LEFT") {
                gsap.from(`#GridTablesList`, { x: -window.innerWidth / 2, duration: 0.25, ease: "linear" });
            } else if (data === "RIGHT") {
                gsap.from(`#GridTablesList`, { x: window.innerWidth / 2, duration: 0.25, ease: "linear" });
            } else {
                console.log("Current Table");
            }
        } else {
            console.log("Element not found");
        }
    }

    openNav = () => {
        let mySidenav = document.getElementById("mySidenav");
        let main = document.getElementById("main");
        let sideMenuOpenBtn = document.getElementById("sideMenuOpenBtn");
        let showAnimation = document.getElementById("showAnimation");
        if (mySidenav) {
            // mySidenav.style.width = "450px";
            this.setState({ lobbyMiniTableOpenState: true });
            mySidenav.style.width = "28.846vw";
            showAnimation.classList.add("addAnimaion");
        }
        if (main) {
            // main.style.marginRight = "450px";
            main.style.marginRight = "28.846vw";
        }
        if (sideMenuOpenBtn) {
            sideMenuOpenBtn.style.display = 'none';
        }
    }
    closeNav = () => {
        let mySidenav = document.getElementById("mySidenav");
        let main = document.getElementById("main");
        let sideMenuOpenBtn = document.getElementById("sideMenuOpenBtn");
        let showAnimation = document.getElementById("showAnimation");

        if (mySidenav) {
            mySidenav.style.width = "0";
            showAnimation.classList.remove("addAnimaion");
            this.setState({ lobbyMiniTableOpenState: false });
        }
        if (main) {
            main.style.marginRight = "0"
        }
        if (sideMenuOpenBtn) {
            sideMenuOpenBtn.style.display = '';
        }
    };

    chooseOption = (e) => {
        this.setState({ optionMenu: e.target.value, historyData: [], findPlayerData: [] });
    };

    setAvtar(data) {
        // console.log(this.state.Dparray[data])
        this._lobbyNetwork.send(`<SetAvatar id="2-5e3"/>`);
        // this._lobbyNetwork.send(`<GetAvatars/>`)
        var xhr = new XMLHttpRequest();
        xhr.open("GET", this.config.URL_Environment.proxy.baseUrl + this.config.URL_Environment.apiPath.getAvtr_Api, true);
        xhr.setRequestHeader("Content-Type", "text/plain");

        xhr.setRequestHeader("siteid", this.config.URL_Environment.sitIds.sitid);
        if (sessionStorage.getItem(`${window.location.hostname}'_wSid'`) !== null) {
            xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid);
        } else if (sessionStorage.getItem(`${window.location.hostname}'_sid'`) !== null) {
            xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_sid'`)).sid);
        }
        xhr.addEventListener("load", (e) => {
            this.avtrDataHandler(e);
        });
        xhr.send();
    }
    avtrDataHandler(data) {
        let response = JSON.parse(data.target.response)
        const myAvatr = `data:image/jpeg;base64,${response.imageData}`;
        this.setState({ avtar: myAvatr });
    }

    onBadBeatJackpotPayout(responseData) {
        console.log(responseData)
        this.setState({
            jackpotData: {
                data: responseData,
                showPopup: true, // Open the popup when data is received
            },
        });

    }

    handleClosePopup = () => {
        this.setState({
            jackpotData: {
                data: null, // Reset data on close
                showPopup: false, // Hide popup
            },
        });
    };

    onPlayerJoinedWaitingList(data) {
        let isJoined = data?.PlayerJoinedWaitingList?.attr;
        if (isJoined && isJoined.joined === "true") {
            this.setState({ seatAvailble: { joinWaitingList: true } });
        } else {
            this.setState({ seatAvailble: { joinWaitingList: false } });
        }
    }

    render() {
        const { data, showPopup } = this.state.jackpotData;
        return (
            <>
                <div className="fd">
                    <header className="fd">
                        <section>
                            <LobbyHeader logOutHandler={this.logOutHandler.bind(this)} bbj={this.state.bbj} newsdata={this.state.news} data={this.state.serverInfo} myLevel={this.state.myLevel} showTables={this.state.showTables} playerBuyIn={this.state.tourneyData.buyIn} openTL={this.props.openTL} getPlayerInfo={this.getPlayerInfo} showTourneyLobby={this.state.showTourneyLobby} openMenu={this.openMenuOptions.bind(this)} user={this.state.userLogged}></LobbyHeader>
                            {this.state.profileshow && <Profile logOutHandler={this.props.logOutHandler} gotoMyTable={this.props.gotoMyTable} myLevel={this.state.myLevel} setThemes={this.props.setThemes} data={this.state.levelData} showCashTables={this.props.showCashTables} openLobby_Table={this.state.openLobby_Table} getPlayerInfo={this.getPlayerInfo} stars={this.state.displayStars} setAction={this.lobbyMenuHandler.bind(this)} user={this.state.userLogged} ></Profile>}
                        </section>
                        <section className="fd">
                            {/* <FilterTabs showTourneyLobby={this.state.showTourneyLobby} bbj={this.state.bbj} isGetingResponse={this.isGetingResponse.bind(this)} showLoader={this.state.showLoader} showProfile={this.state.showProfile} sortTables={this.sortTables.bind(this)} tableRequest={this.tableRequest.bind(this)} action={this.changeGrid.bind(this)} network={this._lobbyNetwork} updateRequest={this.updateGetTableRequest.bind(this)} datas={this.state.serverInfo}
                                user={this.state.userLogged} balance={this.state.playerData} stars={this.state.displayStars} setAction={this.lobbyMenuHandler.bind(this)}
                                FilterCheck={this.FilterCheck}
                            ></FilterTabs> */}
                            <FilterTabs showTourneyLobby={this.state.showTourneyLobby} bbj={this.state.bbj} isGetingResponse={this.isGetingResponse.bind(this)} showLoader={this.state.showLoader} showProfile={this.state.showProfile} sortTables={this.sortTables.bind(this)} tableRequest={this.tableRequest.bind(this)} action={this.changeGrid.bind(this)} network={this._lobbyNetwork} updateRequest={this.updateGetTableRequest.bind(this)} datas={this.state.serverInfo}
                                user={this.state.userLogged} balance={this.state.playerData} stars={this.state.displayStars} setAction={this.lobbyMenuHandler.bind(this)}
                                FilterCheck={this.FilterCheck}
                            ></FilterTabs>
                        </section>
                    </header>

                    {(!this.state.showTourneyLobby && !this.props.openTL) &&
                        <>
                            {/* <main className="fd col-lg-12 col-xl-12 col-xxl-12 lobby_main_media_tab_land" style={{ padding: '0px 12px 0px 12px', position: 'relative', zIndex: this.state.drop_down_state ? '-1' : '' }}> */}
                            <main className="fd col-lg-12 col-xl-12 col-xxl-12 lobby_main_media_tab_land" style={{ padding: '0px 12px 0px 12px', position: 'relative' }}>
                                <div className="fd">
                                    <div id="mySidenav" className="sidenav">
                                        <div className="miniTable-container">
                                            <button className="closeNavBtn" onClick={this.closeNav} title="Close mini table">
                                                <svg xmlns="http://www.w3.org/2000/svg" id="showAnimation" viewBox="0 0 48.32 23.03">
                                                    <defs>
                                                        <linearGradient id="linear-gradient" x1="32.02" y1="1.77" x2="31.09" y2="19.02" gradientUnits="userSpaceOnUse">
                                                            <stop offset="0" stopColor="rgb(255, 230, 80)" />
                                                            <stop offset="1" stopColor="rgb(180, 130, 10)" />
                                                        </linearGradient>
                                                        <linearGradient id="linear-gradient-2" x1="10.03" y1=".58" x2="9.1" y2="17.83" xlinkHref="#linear-gradient" />
                                                        <linearGradient id="linear-gradient-3" x1="31.68" y1="11.71" x2="31.68" y2=".26" gradientUnits="userSpaceOnUse">
                                                            <stop offset="0" stopColor="#fff" />
                                                            <stop offset="1" stopColor="#000" stopOpacity="0" />
                                                        </linearGradient>
                                                        <linearGradient id="linear-gradient-4" x1="9.59" y1="11.71" x2="9.59" y2=".26" xlinkHref="#linear-gradient-3" />
                                                    </defs>
                                                    <g>
                                                        <g>
                                                            <polygon className="cls-1" fill="url(#linear-gradient)" points="48.32 11.58 48.3 11.57 32.4 0 32.4 4.34 15.06 4.34 22.57 11.51 22.64 11.58 16.02 18.42 32.4 18.42 32.4 23.03 48.32 11.58" />
                                                            <polygon className="cls-3" fill="url(#linear-gradient-2)" points="19.17 11.5 12.06 4.39 0 4.39 6.97 11.44 6.94 11.47 0 18.49 12.35 18.49 19.26 11.58 19.17 11.5" />
                                                        </g>
                                                        <polygon className="cls-2" fill="url(#linear-gradient-3)" points="32.4 0 32.4 4.34 15.06 4.34 22.57 11.51 48.3 11.57 32.4 0" />
                                                        <polygon className="cls-4" fill="url(#linear-gradient-4)" points="0 4.39 6.97 11.44 6.94 11.47 19.17 11.5 12.06 4.39 0 4.39" />
                                                    </g>
                                                </svg>
                                            </button>
                                            <TableDetails id="" seatAvailble={this.state.seatAvailble} network={this._lobbyNetwork} user={this.state.userLogged} showTables={this.state.showTables} tableData={this.state.tableData} tourneyData={this.state.tourneyData} sitGoData={this.state.sitGoData} setOpenAction={this.setPopUpActionsOpen.bind(this)} />
                                        </div>
                                    </div>

                                    <div id="main">
                                        {this.state.showTables === "Tournaments" ?
                                            (<div id="GridTablesList">
                                                {this.state.dataTourney.length > 0 ?
                                                    <MainGridTourney data={this.state.dataTourney} network={this._lobbyNetwork} setOpenAction={this.setPopUpActionsOpen.bind(this)} setAction={this.setPopUpActionsClose.bind(this)} ></MainGridTourney> : <TableSkeleton />
                                                }
                                            </div>)
                                            // : !this.state.logOutHint ? <Loader /> : null)
                                            // : !this.state.logOutHint ? <div id="GridTablesList"> <TableLoader text="Please wait, Tournament tables are" /> </div> : null)
                                            : this.state.showTables === "Sit_Go" ?
                                                (<div id="GridTablesList">
                                                    {this.state.dataSitGo.length > 0 ?
                                                        <MainGridSitGo data={this.state.dataSitGo} network={this._lobbyNetwork} setOpenAction={this.setPopUpActionsOpen.bind(this)} setAction={this.setPopUpActionsClose.bind(this)}></MainGridSitGo> : <TableSkeleton />
                                                    }
                                                </div>)
                                                // : !this.state.logOutHint ? <Loader /> : null)
                                                // : !this.state.logOutHint ? <div id="GridTablesList"> <TableLoader text="Please wait, Sit & Go tables are" /></div> : null)
                                                : (
                                                    <div id="GridTablesList">
                                                        {this.state.data.length > 0 ?
                                                            <MainGrid data={this.state.data} mytables={this.state.myTables} lobbyMiniTableOpenState={this.state.lobbyMiniTableOpenState} network={this._lobbyNetwork} setOpenAction={this.setPopUpActionsOpen.bind(this)} setAction={this.changeLobbyButtonState.bind(this)}></MainGrid> : <TableSkeleton />}
                                                    </div>)
                                            // : !this.state.logOutHint ? <Loader /> : null)
                                            // : !this.state.logOutHint ? <div id="GridTablesList"> <TableLoader text="Please wait, Cash tables are" /> </div> : null)
                                        }
                                    </div>
                                </div>
                            </main>
                            {showPopup && data && <BadBeatJackpotPopup data={data} onClose={this.handleClosePopup} />}
                            {this.state.showActiveTables && <MyActiveTourCashTables data={this.state.myTables.concat(this.state.myTournaments)} network={this._lobbyNetwork} setAction={this.setPopUpActionsClose.bind(this)} ></MyActiveTourCashTables>}
                            {this.state.showCashierPopUp && <Cashier data={this.state.levelData} myLevel={this.state.myLevel} lobbyMenuHandler={this.lobbyMenuHandler.bind(this)} cashierTourneyTables={this.cashierTourneyTables} stars={this.state.displayStars} playerInfo={this.playerInfo} network={this._lobbyNetwork} ></Cashier>}
                            {this.state.showLevelInfo && <PlayerlevelInfo data={this.state.levelData} showCashier={this.state.showCashier} setAction={this.setPopUpActionsClose.bind(this)}></PlayerlevelInfo>}
                            {this.state.showRegistration && <TourneyRegistration data={this.state.regData} error={this.state.regAlert} close={this.setPopUpActionsClose.bind(this)} network={this._lobbyNetwork}></TourneyRegistration>}
                            {this.state.showAvtar && <AvatarPopup setAction={this.setPopUpActionsClose.bind(this)} setAvtar={this.setAvtar.bind(this)} newavatar={this.state.newavatar} avtarId={this.state.avtarId}></AvatarPopup>}
                            {/* {this.state.showOptionsPopUp && <Options data={this.state.historyData} user={this.state.userLogged} errorMsg={this.state.gameHistoryErrorMsg} setAction={this.setPopUpActionsClose.bind(this)} gethandHistory={this.getHandHistory.bind(this)} secondLevel={this.state.subHistorydata} ></Options>} */}
                            {this.state.showpokerHistory &&
                                <div className="game_type_filter_cover" >
                                    <div className="fd game_type_filter">
                                        <header>
                                            <span className="font_15 font_w_600 p_5" style={{ height: '100%' }}>
                                                <span className="headerIconSpan emoji">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#b79301">
                                                        <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
                                                    </svg>
                                                </span> Options
                                            </span>
                                        </header>
                                        <section className="fd" style={{ maxHeight: '80vh' }}>
                                            <div className="fd df_al_jsb p_10" style={{ paddingBottom: '5px' }}>
                                                <button type="button" className="redirectionLinks links" value="liveDealer_2" onClick={(e) => UM.redirectUrlLinks(e)}>Live Casino</button>
                                                <button type="button" className="redirectionLinks links" value="deposit" onClick={(e) => UM.redirectUrlLinks(e)}>Cashier</button>
                                                <button type="button" className="redirectionLinks links" value="crash" onClick={(e) => UM.redirectUrlLinks(e)}>Crash</button>
                                                <button type="button" className="redirectionLinks links" value="Sportsm" onClick={(e) => UM.redirectUrlLinks(e)}>Sports</button>
                                            </div>
                                            <div className="fd df_al_jsb  p_10" style={{ paddingTop: 'unset' }}>
                                                <button type="button" className={this.state.optionMenu === "game_history" ? "redirectionLinks active" : "redirectionLinks"} value="game_history" onClick={(e) => this.chooseOption(e)}>Game History</button>
                                                <button type="button" className={this.state.optionMenu === "find_player" ? "redirectionLinks active" : "redirectionLinks"} value="find_player" onClick={(e) => this.chooseOption(e)}>Find Player</button>
                                                <button type="button" className={this.state.optionMenu === "my_buddies" ? "redirectionLinks active" : "redirectionLinks"} value="my_buddies" onClick={(e) => this.chooseOption(e)}>My Buddies</button>
                                            </div>
                                            <div className="fd">
                                                <section className="fd p_10 df cashier-container river_border flex-column">
                                                    {!this.state.optionMenu ?
                                                        <span className="tourneyDescription_text">Choose Option Above</span> :
                                                        this.state.optionMenu === "game_history" ?
                                                            <PokerhandHistory user={this.state.userLogged} errorMsg={this.state.gameHistoryErrorMsg}
                                                                data={this.state.historyData}
                                                                setAction={this.setPopUpActionsClose.bind(this)} gethandHistory={this.getHandHistory.bind(this)} secondLevel={this.state.subHistorydata}></PokerhandHistory> :
                                                            this.state.optionMenu === "find_player" ?
                                                                <Findplayer data={this.state.findPlayerData} network={this._lobbyNetwork} setAction={this.setPopUpActionsClose.bind(this)}></Findplayer> :
                                                                this.state.optionMenu === "my_buddies" &&
                                                                <MyBuddies data={this.state.myBuddies} network={this._lobbyNetwork} setAction={this.setPopUpActionsClose.bind(this)}></MyBuddies>
                                                    }
                                                </section>
                                            </div>
                                        </section>
                                        <div className="close_div">
                                            <button type="button" className="btn_2" onClick={(e) => { e.preventDefault(); this.lobbyMenuHandler("hideOptionsPopUp") }}>Close</button>
                                        </div>
                                    </div >
                                </div>
                            }
                        </>
                    }
                    {this.state.showAlert && <Alert data={this.state.alert} setAction={this.setPopUpActionsClose.bind(this)}></Alert>}
                    <div className="redirection_url_err" style={{ visibility: this.state.showRedirectionUrlErr ? 'visible' : 'hidden' }}>
                        <small>Requested URL is not available</small>
                    </div>
                </div>
            </>
        );
    }
}
export default withTranslation()(LobbyMain)