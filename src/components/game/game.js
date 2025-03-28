import React from "react";
import Loader from "../utils/loader";
import LobbyMain from "./lobby/lobbyMain";
import TableMain from "./table/tableMain";
import TourneyLobbyMain from "./torneyLobby/tourneyLobbyMain";
import Alert from "./ui/popUps/alert";
import "../../css/game.css";
// import "../../css/ui/table/tableBg.css";
import "../../css/media_queries/allpagesMedia.css"
import moreOptions from "../../assets/images/lobby/leaber_bet_icons/moreOptions.png";
import upArrows from "../../assets/images/lobby/leaber_bet_icons/upArrows.png";
import fileName from "../../jsconfig";
import Config from "../../config";
import eventEmiter from '../utils/eventEmitter';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tablehidden: { table1: "block", table2: "block", table3: "block", table4: "block", table5: "block", table6: "block" },
            showPro: true,
            showLoader: false,
            showLobby: true,
            cashTable: -1,
            activeTable: -1,
            tourneyLobby: -1,
            activeTLobby: -1,
            showCashTableTabs: true,
            reSeating: true,
            recallTourneyLobby: false,
            showTlobbyButton: false,
            hideMiniTableTab: false,
            showMiniTableTab: true,
            showStaticTable: false,
            Tourny_lobby_menu_activated: false,
            openTL: false,
            showWonTable: false,
            tableOpned: false,
            closeTableId: {},
            showToggle: false,
            alert: {
                show: false,
                lineOne: "",
                lineTwo: "",
            },
            themes: {
                carpet: "carpet1",
                table: "table1",
            },
            openTables: {},
            openTLobbies: {},
            bottomInfoImage: moreOptions,
            tableArrays: [],
            openTLobby: [],
            playerBalance: {},
            tourneyTable: "",
            myTLobbyData: {},
            playerAvatarsList: {},
            gotoMyTable: ""
        };
        this.config = new Config();
        this.opentable = 0;
        this.tableArrays = [false, false, false, false, false, false];
        this.tourneyLobbyArray = [false, false]
        this.TableOpenOrNot = ["close", "close", "close", "close", "close", "close"];
        this.tableidArray = [];
        this.cTableOne = React.createRef();
        this.cTableTwo = React.createRef();
        this.cTableThree = React.createRef();
        this.cTableFour = React.createRef();
        this.cTableFive = React.createRef();
        this.staticTable = React.createRef();
        this.tLobbyOne = React.createRef();
        this.tLobbyTwo = React.createRef();
        this.childComponentRef = React.createRef();
        window.name = "SooperPokerMainLobby";
        window.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });
    }

    componentDidMount() {
        let promo = sessionStorage.getItem("promo")
        if (promo) {
            this.setState({ showPro: false })
        }
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        this.clearTimeout = setTimeout(() => {
            function smoothScrollToTop() {
                const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    window.scrollTo(0, currentScroll - Math.ceil(currentScroll / 8));
                    requestAnimationFrame(smoothScrollToTop);
                }
            }
            smoothScrollToTop();
        }, 5000);

    };
    componentWillUnmount() {
        clearTimeout(this.clearTimeout)
    }

    async LobbyHandler(action, data) {
        switch (action) {
            case "openCashTable":
                this.setState({ showMiniTableTab: true, tableOpned: true });
                // this.setState({ showLoader: false });
                this.toggleCashTourneyTables("", 'c-tables');
                let availability = await this.findVacantTable(this.state.openTables, 5, data?.OpenTable?.attr?.id ?? null);
                if (availability.existing) {
                    this.showCashTables(availability.index);
                    return;
                }
                if (!availability.available) {
                    this.setState({ alert: { show: true, lineOne: "You have already opened five live games, please close one", lineTwo: "" }, cashTable: -1, showLobby: true });
                    return;
                }
                this.openTheTable(data?.OpenTable?.attr?.id ?? null, null, data.isSeatMe, availability);
                break;
            case "openTournamentLobby":
                let myLobby = this.state.myTLobbyData;
                console.log(data, myLobby);
                // if (Object.values(myLobby).length) {
                console.log("is-this-new-lobby?  ", data?.OpenTournamentLobby?.attr?.id !== myLobby?.OpenTournamentLobby?.attr?.id);
                if (data?.OpenTournamentLobby?.attr?.id !== myLobby?.OpenTournamentLobby?.attr?.id) {
                    this.TourneyHandler("closeTourneyLobby", this.state.openTLobbies[0]);
                }
                this.setState({ myTLobbyData: data, showLoader: true });
                // this.setState({ showMiniTableTab: false, tableOpned: false, showLoader: true });
                this.setState({ showMiniTableTab: false, tableOpned: false });
                // this.LobbyHandler("activate_loader", true);

                // if (this.tourneyLobbyArray.indexOf(false) !== -1) {
                //     this.toggleCashTourneyTables("", 't-tables');
                // }
                eventEmiter.emit('Close_profile');
                let Tavailability = await this.findVacantTable(this.state.openTLobbies, 2, data?.OpenTournamentLobby?.attr?.id ?? null);
                console.log(Tavailability)
                if (Tavailability.existing) {
                    this.showTourneyLobby(Number(Tavailability.index));
                    return;
                }
                // if (!Tavailability.available) {
                //     this.setState({ alert: { show: true, lineOne: "you have already opened two tournament lobbies, please close one", lineTwo: "" } });
                //     return;
                // }

                this.clearTimeout = setTimeout(() => {
                    this.openTourneyLobby(data?.OpenTournamentLobby?.attr?.id, data?.OpenTournamentLobby?.attr?.tableId === undefined ? null : data?.OpenTournamentLobby?.attr?.tableId, Tavailability);
                }, 500);
                break;
            case "show_tourneyLobby":
                eventEmiter.emit('closeTourneyEmit');
                let tableData = this.state.openTLobbies[0];
                this.setState({ showLoader: true });
                this.clearTimeout = setTimeout(() => {
                    this.setState({ showLoader: false });
                    this.TourneyHandler("closeTourneyLobby", tableData);
                }, 1500);
                break;
            case "activate_loader":
                // this.setState({ showLoader: data });
                break;
            case "player_balance":
                this.setState({ playerBalance: data });
                break;
            case "playerAvatarsList":
                this.setState({ playerAvatarsList: data });
                break;
            case "Tourny_lobby_menu_activated":
                this.setState({ Tourny_lobby_menu_activated: data });
                break;
            case "clearSession":
                this.showLobby("lobby");
                break;
            default:
                break;
        }
    }

    SaveIdmainlobby(action, id) {
        switch (action) {
            case "add":
                if (this.tableidArray.indexOf(id) === -1) {
                    this.tableidArray.push(String(id));
                }
                break;
            case "remove":
                this.tableidArray = this.tableidArray.filter(function (letter) {
                    return letter !== id;
                });
                break;
            default:
                console.log(action, id);
                break;
        }
        if (this.tourneyLobbyArray[0]) {
            this.tLobbyOne.current.UpadateTableId()
        }
        if (this.tourneyLobbyArray[1]) {
            this.tLobbyTwo.current.UpadateTableId()
        }
    }

    TableHandler(action, data, Tableid) {
        console.log(action, data, Tableid)
        switch (action) {
            case "PlayerReSeating":
                this.setState({ reSeating: false });
                break;
            case "closeCashTable":
                this.closeTheTable(data);
                this.setState({ tableOpned: false });
                break;
            case "openCashTable":
                // this.setState({ showLoader: false });
                // this.LobbyHandler("activate_loader", false);
                break;
            case "SINGLE_TABLE":
                this.setState({ tableOpned: true });
                this.closeTheTable_S(data, Tableid);
                break;
            case "TOURNAMENT_TABLE":
                this.setState({ tableOpned: true });
                this.closeTheTable_T(data, Tableid);
                break;
            case "closeTourneyTable":
                this.setState({ closeTableId: data })
                break;
            case "exitApp":
                // this.LobbyHandler("activate_loader", data);
                break;
            default:
                break;
        }
    }

    async TourneyHandler(action, data) {
        switch (action) {
            case "closeTourneyLobby":
                this.showLobby("lobby");
                if (data !== undefined) {
                    this.closeTheTLobby(data);
                }
                if (Object.values(this.state.closeTableId).length) {
                    eventEmiter.emit('leave_table_emit');
                    this.closeTheTable(this.state.closeTableId);
                    // alert("close tourney table")
                    // this.closeTheTable_T(this.state.closeTableId);
                }
                break;
            case "openTourneyTable":
                console.log(action, data)
                // this.LobbyHandler("activate_loader", false);
                eventEmiter.emit('Close_profile');
                this.setState({ showMiniTableTab: true, tourneyLobby: -1, tableOpned: true, showCashTableTabs: true, reSeating: true });
                let availability = await this.findVacantTable(this.state.openTables, 5, data.tourney_table_id ?? null);
                console.log(availability)
                if (availability.existing) {
                    this.showCashTables(availability.index, data.tourney_table_id);
                    return;
                }
                if (!availability.available) {
                    this.setState({ alert: { show: true, lineOne: "You have already opened five live games, please close one", lineTwo: "", showLobby: false } });
                    return;
                }
                this.setState({ tourneyTable: data.id });
                this.openTheTable(data.tourney_table_id, data.id, false, availability);
                break;
            case "hideMiniTableTab":
                // this.LobbyHandler("activate_loader", data);
                break;
            case "setLoaderState":
                this.setState({ showLoader: false });
                break;
            case "gotoMyTable":
                this.setState({ gotoMyTable: data });
                break;
            // case "closeTTable_openTourneyLobby":
            //     this.toggleCashTourneyTables("", data, undefined)
            //     break;
            default:
                break;
        }
    }

    setThemes(data) {
        this.setState({ themes: data });
        this.cTableOne.current.setThemes("Cards", data)
        this.cTableTwo.current.setThemes("Cards", data)
        this.cTableThree.current.setThemes("Cards", data)
        this.cTableFour.current.setThemes("Cards", data)
        this.cTableFive.current.setThemes("Cards", data)
    }

    setThemesL(group, data) {
        this.cTableOne.current.setThemesL(group, data)
        this.cTableTwo.current.setThemesL(group, data)
        this.cTableThree.current.setThemesL(group, data)
        this.cTableFour.current.setThemesL(group, data)
        this.cTableFive.current.setThemesL(group, data)
        this.setState({ themes: data });
    }

    closeTheTLobby(data) {
        console.log("==== close Tourney Lobby: ", data);
        let otl = { ...this.state.openTLobbies };
        for (var index in otl) {
            if (otl[index].id == data.id) {
                this.tourneyLobbyArray[index] = false;
                delete otl[index];
            }
        }
        let at = Object.values(otl)[0]?.index ?? -1;
        this.setState({ showCashTableTabs: !(at >= 0), cashTable: -1, tourneyLobby: -1, openTLobbies: otl, activeTLobby: at });
    }
    closeTheTable(data) {
        let ot = { ...this.state.openTables };
        for (var index in ot) {
            if (ot[index].id == data.id) {
                delete ot[index];
            }
        }
        if (Object.values(this.state.closeTableId).length) {
            this.setState({ closeTableId: {}, showTlobbyButton: false })
            // this.setState({ tourneyTable: "", closeTableId: {}, })
        };
        console.log(ot)
        let at = Object.values(ot)[0]?.index ?? -1;
        if (this.state.openTables[at]?.tourneyId != null) {
            this.setState({ showTlobbyButton: true });
        } else {
            this.setState({ showTlobbyButton: false });
        }
        this.setState({ showLobby: (at >= 0), showCashTableTabs: at >= 0, cashTable: at, tourneyLobby: -1, openTables: ot, activeTable: at });
    }
    closeTheTable_S(data, Tableid) {
        console.log(data)
        let ot = { ...this.state.openTables };
        for (var index in ot) {
            if (ot[index].id == data.id) {
                this.tableArrays[index] = false;
                delete ot[index];
            }
        }
        this.opentable = ot.length
        let at = Object.values(ot)[0]?.index ?? -1;
        console.log(ot)
        console.log(at)
        eventEmiter.emit('call_activeTableEmit');
        this.setState({ showLobby: !(at >= 0), showCashTableTabs: at >= 0, cashTable: at, tourneyLobby: -1, openTables: ot, activeTable: at });

        if (this.state.openTables[at]?.tourneyId != null) {
            this.setState({ showTlobbyButton: true });
        } else {
            this.setState({ showTlobbyButton: false });
        }

        // if (Object.values(this.state.openTLobbies).length !== 0) {
        //     this.showCashTables(null);
        // } else {
        //     // eventEmiter.emit('call_activeTableEmit');
        // }
        if (this.config.URL_Environment.TableFeatures.selected === "F2") {
            this.InactiveTavleHAndle(Tableid);
        }
        if (this.tableArrays.indexOf(true) == -1) {
            this.setState({ showMiniTableTab: false })
        }
    }
    closeTheTable_T(data) {
        console.log(data)
        let ot = { ...this.state.openTables };
        for (var index in ot) {
            if (ot[index].id == data.id) {
                this.tableArrays[index] = false;
                delete ot[index];
            }
        }
        let at = Object.values(ot)[0]?.index ?? -1;
        this.setState({ showLobby: !(at >= 0), showCashTableTabs: at >= 0, cashTable: at, openTables: ot, activeTable: at });
        this.showCashTables(null);
        this.toggleCashTourneyTables("", 't-tables', undefined)
        if (this.tableArrays.indexOf(true) == -1) {
            this.setState({ showMiniTableTab: false })
        }
    }
    openTheTable(table_id, tourneyId, isSeatMe, availability) {
        console.log(table_id, tourneyId, isSeatMe, availability)
        let d = {
            tableId: table_id,
            sid: this.props.sid,
            tourneyId: tourneyId,
            isSeatMe: isSeatMe,
            // showLoader: true,
            themes: {
                carpet: "carpet1",
                table: "table1",
            },
        };
        try {
            let ot = { ...this.state.openTables };
            console.log(ot);
            ot[availability.index] = { id: table_id, index: availability.index, tourneyId: tourneyId };
            this.opentable = availability.index;
            this.tableArrays[availability.index] = true;
            if (tourneyId !== null && ot[availability.index]) {
                this.setState({ showTlobbyButton: true });
            } else {
                this.setState({ showTlobbyButton: false });
            }
            let tablehidden = { ...this.state.tablehidden }
            this.setState({ showCashTableTabs: true, showLobby: false, cashTable: availability.index, tourneyLobby: -1, openTables: ot, activeTable: availability.index });

            this.TableOrLobbbyHandle();
            switch (availability.index) {
                case 0:
                    this.cTableOne.current.initNetwork(d);
                    if (this.config.URL_Environment.TableFeatures.selected == "F2") {
                        tablehidden.table1 = "block";
                    }
                    break;
                case 1:
                    this.cTableTwo.current.initNetwork(d);
                    if (this.config.URL_Environment.TableFeatures.selected == "F2") {
                        tablehidden.table2 = "block"
                    }
                    break;
                case 2:
                    this.cTableThree.current.initNetwork(d);
                    if (this.config.URL_Environment.TableFeatures.selected == "F2") {
                        tablehidden.table3 = "block"
                    }
                    break;
                case 3:
                    this.cTableFour.current.initNetwork(d);
                    if (this.config.URL_Environment.TableFeatures.selected == "F2") {
                        tablehidden.table4 = "block"
                    }
                    break;
                case 4:
                    this.cTableFive.current.initNetwork(d);
                    if (this.config.URL_Environment.TableFeatures.selected == "F2") {
                        tablehidden.table5 = "block"
                    }
                    break;
                default:
                    console.log("====== table index not matching");
                    break;
            }
            this.setState({ tablehidden: tablehidden })
        } catch (error) {
            console.error(error);
        }
    }
    async findVacantTable(list, cnt, id) {
        if (id) {
            for (var index in list) {
                if (list[index].id == id) {
                    return { available: false, existing: true, index: index, msg: "" };
                }
            }
        }
        for (let i = 0; i < cnt; i++) {
            if (!list[i]?.id) {
                return { available: true, existing: false, index: i, msg: "" };
            }
        }

        return { available: false, existing: false, index: null, msg: "No Vacant Tables Available" };
    }
    openTourneyLobby(tourney_id, tableId, availability) {
        let openTLobby = this.state.openTLobby;
        let data = {
            tourneyId: tourney_id,
            sid: this.props.sid,
            tableId: tableId,
        };

        try {
            let otl = { ...this.state.openTLobbies };
            openTLobby.push(otl)
            otl[availability.index] = { id: tourney_id, index: availability.index };
            this.tourneyLobbyArray[availability.index] = true;

            this.setState({ showCashTableTabs: false, showLobby: true, cashTable: -1, tourneyLobby: availability.index, openTLobbies: otl, activeTLobby: availability.index });
            switch (availability.index) {
                case 0:
                    this.tLobbyOne.current.initNetwork(data);
                    break;
                case 1:
                    this.tLobbyTwo.current.initNetwork(data);
                    break;
                default:
                    console.log("====== table index not matching");
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }
    showLobby = (target) => {
        if (target === "lobby") {
            this.setState({
                showLobby: true,
                cashTable: -1,
                tourneyLobby: -1,
                bottomInfoImage: moreOptions,
                openTL: false,
            });
            eventEmiter.emit('call_activeTableEmit');
            // this.LobbyHandler("activate_loader", true);
        }
    }
    showCashTables(index, id) {
        if (this.state.showCashTableTabs) {
            let at = this.state.activeTable;
            this.setState({ showLobby: false, cashTable: index ?? at, activeTable: index ?? at, tourneyLobby: -1 });
            let direction = index == this.state.activeTable ? "EQUAL" : index < this.state.activeTable ? "LEFT" : "RIGHT";

            switch (index) {
                case 0:
                    this.cTableOne.current.TagName();
                    this.cTableOne.current.AnimationTable(direction);
                    break;
                case 1:
                    this.cTableTwo.current.TagName();
                    this.cTableTwo.current.AnimationTable(direction);
                    break;
                case 2:
                    this.cTableThree.current.TagName();
                    this.cTableThree.current.AnimationTable(direction);
                    break;
                case 3:
                    this.cTableFour.current.TagName();
                    this.cTableFour.current.AnimationTable(direction);
                    break;
                case 4:
                    this.cTableFive.current.TagName();
                    this.cTableFive.current.AnimationTable(direction);
                    break;
                case 5:
                    break;
                default:
                    break;

            }


            // if (this.tableArrays[0]) {
            //     this.cTableOne.current.TagName();
            //     this.cTableOne.current.AnimationTable(direction);
            // }
            // if (this.tableArrays[1]) {
            //     this.cTableTwo.current.TagName();
            //     this.cTableTwo.current.AnimationTable(direction);
            // }
            // if (this.tableArrays[2]) {
            //     this.cTableThree.current.TagName();
            //     this.cTableThree.current.AnimationTable(direction);
            // }
            // if (this.tableArrays[3]) {
            //     this.cTableFour.current.TagName();
            //     this.cTableFour.current.AnimationTable(direction);
            // }
            // if (this.tableArrays[4]) {
            //     this.cTableFive.current.TagName();
            //     this.cTableFive.current.AnimationTable(direction);
            // }

            // this.TableOrLobbbyHandle();

            let arr = this.state.openTables;
            // const getIndex = function (r) {
            //     for (let i = 0; i < r.length; i++) {
            //         while (r[i] === null || r[i] === undefined) {
            //             i++;
            //             if (i >= r.length) return -1;
            //         }
            //         if (r[i].tableId === id) {
            //             return i;
            //         }
            //     }
            //     return -1;
            // };

            const getIndex = function (r) {
                for (const key in r) {
                    if (r[key] && r[key].id === id) {
                        return key;
                    }
                }
                return -1;
            };

            console.log(getIndex(arr));

            if (this.state.openTables[getIndex(arr)]?.tourneyId != null) {
                this.setState({ showTlobbyButton: true });
            } else {
                this.setState({ showTlobbyButton: false });
            }

        } else {
            console.log("empty tables")
        }
        if (this.config.URL_Environment.TableFeatures.selected == "F2") {
            this.RearrageHandle()
        }

    }

    showTourneyLobby(index) {
        let at = this.state.activeTLobby;
        this.setState({ showLobby: true, tourneyLobby: index ?? at, activeTLobby: index ?? at });
    }

    async toggleCashTourneyTables(e, name, myTableId) {
        if (e !== "") {
            e.preventDefault();
        }
        if (name === "minicards") {
            setTimeout(() => {
                this.TableOrLobbbyHandle()
                console.log("ss")
            }, 3000)
            return;
        }
        var tableType = (e !== "" ? e.target.dataset.name : name);
        if (tableType == "c-tables") {
            this.setState({ showMiniTableTab: true, tableOpned: true })
            if (this.config.URL_Environment.TableFeatures.selected == "F1") {
                this.setState({ hideMiniTableTab: false })
            }
            if (this.config.URL_Environment.TableFeatures.selected == "F2") {
                this.setState({ hideMiniTableTab: true })
            }
            this.TableOrLobbbyHandle()
            let cTab = document.getElementById(`c-tables-tab`);
            if (cTab) {
                cTab.style.animation = "";
                cTab.style.background = "";
                cTab.style.color = "";
            }
            this.setState({ showCashTableTabs: true, cashTable: this.state.activeTable, openTL: false, showLobby: false, tourneyLobby: -1 });
            let openTables = Object.values(this.state.openTables);
            if (Array.isArray(openTables)) {
                if (myTableId) {
                    const index = openTables.findIndex(item => item.id === myTableId);
                    console.log(index)
                    console.log(myTableId)
                    this.setState({ showCashTableTabs: true })
                    this.clearTimeout = setTimeout(() => {
                        this.showCashTables(index, myTableId);
                    }, 400);
                }
            }

            if (this.config.URL_Environment.TableFeatures.selected == "F2") {
                this.RearrageHandle()
            }
        }
        console.log(name, myTableId)
        if (tableType == "t-tables") {
            eventEmiter.emit('Close_profile');
            if (Object.values(this.state.openTLobbies).length) {
                this.setState({ showMiniTableTab: false });
                this.setState({ hideMiniTableTab: false, tableOpned: false });
                this.setState({ showCashTableTabs: false, cashTable: -1, showLobby: true, openTL: true, tourneyLobby: this.state.activeTLobby });
            } else {
                let myLobby = this.state.myTLobbyData;
                console.log(myLobby)
                let Tavailability = await this.findVacantTable(this.state.openTLobbies, 2, myLobby?.OpenTournamentLobby?.attr?.id ?? null);
                this.openTourneyLobby(myLobby?.OpenTournamentLobby?.attr?.id, myLobby?.OpenTournamentLobby?.attr?.tableId === undefined ? null : myLobby?.OpenTournamentLobby?.attr?.tableId, Tavailability);
            }
        }
    }
    setPopUpActions(action) {
        switch (action) {
            case "hideAlert":
                this.setState({ alert: { show: false, lineOne: "", lineTwo: "" } });
                break;
            default:
                break;
        }
    }
    handleClick = (e) => {
        sessionStorage.setItem("promo", true)
        this.setState({ showPro: false });
    };
    JoinTable = (e) => {
        this.setState({ showStaticTable: true, showLobby: false })
    }

    JoinTableWon = (e) => {
        this.setState({ showWonTable: true, showLobby: false })
    }
    closeReplayTable = (e) => {
        this.setState({ showWonTable: false, showLobby: true })
    }
    ActiveTable(e) {
        switch (e) {
            case "gamebox1":
                this.TableOpenOrNot[0] = "open";
                this.activeTable = 1;
                this.setState({ activeTable: 1, tablehidden: { table1: "block", table2: "none", table3: "none", table4: "none", table5: "none", table6: "none" } })
                break;
            case "gamebox2":
                this.TableOpenOrNot[1] = "open";
                this.activeTable = 2;
                this.setState({ activeTable: 2, tablehidden: { table1: "none", table2: "block", table3: "none", table4: "none", table5: "none", table6: "none" } })
                break;
            case "gamebox3":
                this.TableOpenOrNot[2] = "open";
                this.activeTable = 3;
                this.setState({ activeTable: 3, tablehidden: { table1: "none", table2: "none", table3: "block", table4: "none", table5: "none", table6: "none" } })
                break;
            case "gamebox4":
                this.TableOpenOrNot[3] = "open"
                this.activeTable = 4;
                this.setState({ activeTable: 4, tablehidden: { table1: "none", table2: "none", table3: "none", table4: "block", table5: "none", table6: "none" } })
                break;
            case "gamebox5":
                this.TableOpenOrNot[4] = "open";
                this.activeTable = 5;
                this.setState({ activeTable: 5, tablehidden: { table1: "none", table2: "none", table3: "none", table4: "none", table5: "block", table6: "none" } })

                break;
            case "gamebox6":
                this.TableOpenOrNot[5] = "open";
                this.activeTable = 6;
                this.setState({ activeTable: 6, tablehidden: { table1: "none", table2: "none", table3: "none", table4: "none", table5: "none", table6: "block" } })
                break;
            default:
                this.setState({ activeTable: 0, tablehidden: { table1: "block", table2: "block", table3: "block", table4: "block", table5: "block", table6: "block" } })
                this.TableOpenOrNot = ["close", "close", "close", "close", "close", "close"]
                this.RearrageHandle()
                break;
        }

    }
    InactiveTavleHAndle(e) {
        switch (e) {
            case "gamebox1":
                this.setState({ activeTable: 0, tablehidden: { table1: "none", table2: "block", table3: "block", table4: "block", table5: "block", table6: "block" } })

                break;
            case "gamebox2":
                this.setState({ activeTable: 0, tablehidden: { table1: "block", table2: "none", table3: "block", table4: "block", table5: "block", table6: "block" } })

                break;
            case "gamebox3":
                this.setState({ activeTable: 0, tablehidden: { table1: "block", table2: "block", table3: "none", table4: "block", table5: "block", table6: "block" } })
                break;
            case "gamebox4":
                this.setState({ activeTable: 0, tablehidden: { table1: "block", table2: "block", table3: "block", table4: "none", table5: "block", table6: "block" } })

                break;
            case "gamebox5":
                this.setState({ activeTable: 0, tablehidden: { table1: "block", table2: "block", table3: "block", table4: "block", table5: "none", table6: "block" } })

                break;
            case "gamebox6":
                this.setState({ activeTable: 0, tablehidden: { table1: "block", table2: "block", table3: "block", table4: "block", table5: "block", table6: "none" } })
                break;
            default:

                break;
        }
        this.RearrageHandle()


    }
    BlockAndNoneHandle() {
        let tablehidden = { ...this.state.tablehidden }
        if (this.tableArrays[0]) {
            tablehidden.table1 = "block"
        }
        if (this.tableArrays[1]) {
            tablehidden.table2 = "block"
        }
        if (this.tableArrays[2]) {
            tablehidden.table3 = "block"
        }
        if (this.tableArrays[3]) {
            tablehidden.table4 = "block"
        }
        if (this.tableArrays[4]) {
            tablehidden.table5 = "block"
        }
        if (this.tableArrays[5]) {
            tablehidden.table6 = "block"
        }
        this.setState({ tablehidden: tablehidden })
    }
    RearrageHandle() {
        this.clearTimeout = setTimeout(() => {
            if (this.tableArrays[0]) {
                this.cTableOne.current.CloseTableRearrageGrid(this.state.showToggle ? 1 : (Object.values(this.state.openTables).length))
            }
            if (this.tableArrays[1]) {
                this.cTableTwo.current.CloseTableRearrageGrid(this.state.showToggle ? 2 : (Object.values(this.state.openTables).length))
            }
            if (this.tableArrays[2]) {
                this.cTableThree.current.CloseTableRearrageGrid(this.state.showToggle ? 3 : (Object.values(this.state.openTables).length))
            }
            if (this.tableArrays[3]) {
                this.cTableFour.current.CloseTableRearrageGrid(this.state.showToggle ? 4 : (Object.values(this.state.openTables).length))
            }
            if (this.tableArrays[4]) {
                this.cTableFive.current.CloseTableRearrageGrid(this.state.showToggle ? 5 : (Object.values(this.state.openTables).length))
            }
        }, this.state.showToggle ? 1000 : 0);

    }
    TableOrLobbbyHandle() {
        if (this.tableArrays[0]) {
            this.cTableOne.current.TableOrLobbby(true);
        }
        if (this.tableArrays[1]) {
            this.cTableTwo.current.TableOrLobbby(true);
        }
        if (this.tableArrays[2]) {
            this.cTableThree.current.TableOrLobbby(true);
        }
        if (this.tableArrays[3]) {
            this.cTableFour.current.TableOrLobbby(true);
        }
        if (this.tableArrays[4]) {
            this.cTableFive.current.TableOrLobbby(true);
        }
        // if (this.tableArrays[5]) {

        // }
    }

    actionButton(e) {
        let p = document.getElementsByClassName("poker-nav_lb")[0];
        p.style.transition = 'all .5s';
        if (this.state.bottomInfoImage !== moreOptions) {
            p.style.bottom = '-65px';
        } else {
            p.style.bottom = '65px';
        }
        this.setState({ bottomInfoImage: this.state.bottomInfoImage !== moreOptions ? moreOptions : upArrows });
    }

    render() {
        return (
            <div className="fd main-game">
                {(this.state.showLoader && this.state.reSeating) && <Loader></Loader>}
                <div className={this.state.showLobby ? "main_lobby" : "hide_main_lobby"}>
                    <LobbyMain data={this.props} gotoMyTable={this.state.gotoMyTable} openTL={this.state.openTL} logOutHandler={this.props.logOutHandler} LobbyHandler={this.LobbyHandler.bind(this)} activeTLobby={this.state.activeTLobby} showCashTables={this.showCashTables.bind(this)} setThemes={this.setThemes.bind(this)} setThemesL={this.setThemesL.bind(this)}></LobbyMain>
                </div>

                <div className={this.state.tourneyLobby === 0 ? "tourney_lobby" : "hide_tourney_lobby"} style={{ zIndex: this.state.Tourny_lobby_menu_activated ? "-1" : '' }}>
                    <TourneyLobbyMain idTables={this.tableidArray} ref={this.tLobbyOne} TourneyHandler={this.TourneyHandler.bind(this)} toggleCashTourneyTables={this.toggleCashTourneyTables.bind(this)} showCashTableTabs={this.state.showCashTableTabs}></TourneyLobbyMain>
                </div>

                {/* <div className={this.state.tourneyLobby === 1 ? "tourney_lobby" : "hide_tourney_lobby"}>
                    <TourneyLobbyMain idTables={this.tableidArray} ref={this.tLobbyTwo}  TourneyHandler={this.TourneyHandler.bind(this)} toggleCashTourneyTables={this.toggleCashTourneyTables.bind(this)} showCashTableTabs={this.state.showCashTableTabs}></TourneyLobbyMain>
                </div> */}

                <div className={this.state.cashTable == 0 ? "cash_table" : "hide_cash_table"}>
                    <TableMain ref={this.cTableOne} stageProperties={this.props.stageProperties} playerBalance={this.state.playerBalance} playerAvatarsList={this.state.playerAvatarsList} id={"gameBox1"} showLobby={this.showLobby.bind(this)} tableid={this.state.cashTable} closeTTable={this.closeTheTable.bind(this)} setThemes={this.setThemes.bind(this)} TableHandler={this.TableHandler.bind(this)} SaveIdmainlobby={this.SaveIdmainlobby.bind(this)} TourneyHandler={this.TourneyHandler.bind(this)}></TableMain>
                </div>
                <div className={this.state.cashTable == 1 ? "cash_table" : "hide_cash_table"}>
                    <TableMain ref={this.cTableTwo} stageProperties={this.props.stageProperties} playerBalance={this.state.playerBalance} playerAvatarsList={this.state.playerAvatarsList} id={"gameBox2"} showLobby={this.showLobby.bind(this)} tableid={this.state.cashTable} closeTTable={this.closeTheTable.bind(this)} setThemes={this.setThemes.bind(this)} TableHandler={this.TableHandler.bind(this)} SaveIdmainlobby={this.SaveIdmainlobby.bind(this)} TourneyHandler={this.TourneyHandler.bind(this)}></TableMain>
                </div>
                <div className={this.state.cashTable == 2 ? "cash_table" : "hide_cash_table"}>
                    <TableMain ref={this.cTableThree} stageProperties={this.props.stageProperties} playerBalance={this.state.playerBalance} playerAvatarsList={this.state.playerAvatarsList} id={"gameBox3"} showLobby={this.showLobby.bind(this)} tableid={this.state.cashTable} closeTTable={this.closeTheTable.bind(this)} setThemes={this.setThemes.bind(this)} TableHandler={this.TableHandler.bind(this)} SaveIdmainlobby={this.SaveIdmainlobby.bind(this)} TourneyHandler={this.TourneyHandler.bind(this)}></TableMain>
                </div>
                <div className={this.state.cashTable == 3 ? "cash_table" : "hide_cash_table"}>
                    <TableMain ref={this.cTableFour} stageProperties={this.props.stageProperties} playerBalance={this.state.playerBalance} playerAvatarsList={this.state.playerAvatarsList} id={"gameBox4"} showLobby={this.showLobby.bind(this)} tableid={this.state.cashTable} closeTTable={this.closeTheTable.bind(this)} setThemes={this.setThemes.bind(this)} TableHandler={this.TableHandler.bind(this)} SaveIdmainlobby={this.SaveIdmainlobby.bind(this)} TourneyHandler={this.TourneyHandler.bind(this)}></TableMain>
                </div>
                <div className={this.state.cashTable == 4 ? "cash_table" : "hide_cash_table"}>
                    <TableMain ref={this.cTableFive} stageProperties={this.props.stageProperties} playerBalance={this.state.playerBalance} playerAvatarsList={this.state.playerAvatarsList} id={"gameBox5"} showLobby={this.showLobby.bind(this)} tableid={this.state.cashTable} closeTTable={this.closeTheTable.bind(this)} setThemes={this.setThemes.bind(this)} TableHandler={this.TableHandler.bind(this)} SaveIdmainlobby={this.SaveIdmainlobby.bind(this)} TourneyHandler={this.TourneyHandler.bind(this)} ></TableMain>
                </div>

                {!this.state.showLobby && (
                    <div className="poker-nav">
                        <div className={!this.state.showLobby ? "left1" : "left"}>
                            {(Object.values(this.state.openTLobbies).length || this.state.tourneyTable) && Object.values(this.state.openTables).length && this.state.showTlobbyButton ? (
                                <button id="c-tables-tab" className="lb-btn" data-name={this.state.showCashTableTabs ? "t-tables" : "c-tables"} onClick={this.toggleCashTourneyTables.bind(this)}>
                                    {this.state.showCashTableTabs ? "T.Lobby" : "T.Tables"}
                                </button>
                            ) : (<button className="lb-btn" data-name="lobby" onClick={(e) => {
                                e.preventDefault();
                                this.showLobby(e.target.dataset.name);
                            }}>Lobby</button>)}
                        </div>
                        <div className={fileName.name === "Leader_bet" ? "right_lb" : "right"} style={{ visibility: this.state.showMiniTableTab ? 'visible' : 'hidden' }}>
                            <div className="icons_lb" onClick={(e) => { this.actionButton(e) }} style={{ display: fileName.name !== "Leader_bet" ? 'none' : 'flex' }}>
                                <img src={this.state.bottomInfoImage} alt="" />
                            </div>
                            <div className="next-div">
                                {this.state.showCashTableTabs && !this.state.showLobby
                                    ? Object.values(this.state.openTables).map((table, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className={table.index == this.state.activeTable ? "table-tab tt-active" : "table-tab"}
                                                id={table.id}
                                                data-index={table.index}
                                                data-isactive={table.index == this.state.activeTable ? true : false}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    this.showCashTables(table.index, table.id);
                                                }}
                                            ></div>
                                        );
                                    })
                                    : null}
                            </div>
                            {!this.state.showCashTableTabs && !this.state.showLobby
                                ? Object.values(this.state.openTLobbies).map((tLobby, i) => {
                                    return (
                                        <button
                                            key={i}
                                            className={tLobby.index == this.state.activeTLobby ? "table-tab tt-active" : "table-tab"}
                                            id={tLobby.id}
                                            data-index={tLobby.index}
                                            data-isactive={tLobby.index == this.state.activeTable ? true : false}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.showTourneyLobby(tLobby.index);
                                            }}
                                        ></button>
                                    );
                                })
                                : null}
                        </div>
                    </div>
                )}
                {this.state.alert.show && <Alert data={this.state.alert} setAction={this.setPopUpActions.bind(this)}></Alert>}
            </div >
        );
    }
}
