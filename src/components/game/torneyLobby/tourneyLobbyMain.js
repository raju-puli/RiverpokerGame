import React from "react";
import TourneyLobbyBase from "./tourneyLobbyBase";
import Participants from "../ui/tLobby/participants";
import OpenTables1 from "../ui/tLobby/openTables1";
import TournamentInfo from "../ui/popUps/tourneyInfo";
import { t } from "i18next";
import Config from "../../../config";
import img_8 from "../../../assets/images/lobby_icons/icon_refresh.png";
import left_sidebar from "../../../assets/images/lobby_icons/button_slide_panel.png";
import icon_calculator_enter from "../../../assets/images/lobby_icons/tourney_lobby_icons/icon_calculator_enter.png";
import Emitter from "../../utils/eventEmitter.js";
// import Loader from "../../utils/loader";

// import Loader from "../../utils/loader";
import Spinner from "../../utils/spinner";

import UM from "../../utils/utilityMethods.js";

import "../../../css/ui/lobby/lobbyMenu.css";
import "../../../css/media_queries/allpagesMedia.css";

export default class TourneyLobbyMain extends TourneyLobbyBase {
    constructor(props) {
        super(props);
        this.tMoney = "0";
        this.tickets = "0";
        this.balance = "0";
        this.cPoints = "0";
        this.state = {
            gameTableid: this.props.idTables,
            opentabledetails: { id: "", type: "" },
            tableLoded: true,
            showOpenTableData: false,
            registerBtnState: true,
            TournamentRegisterStatus: "",
            isTourneyRegistered: false,
            showBtnLoader: false,
            balanceCheckBox: false,
            optionsOpened: false,
            enableReEntry: false,
            ticketsCheckBox: false,
            compointCheckBox: false,
            tourneyCheckBox: false,
            joinTableBtn: false,
            btnloader: false,
            watchTableBtn: false,
            activeDropdown: null,
            showAlert: false,
            loader: false,
            openTableId: '',
            selectedTableId: '',
            selectAmountType: "",
            leftMenu: "game_info",
            tourneyStartText: "",
            tourneyEndText: "",
            tourneyStartStatus: "",
            tourneyEndStatus: "",
            BgOpacity: 1,
            playerData: {
                balance: "",
                tickets: "",
                tMoney: "",
                cPoints: "",
                playMoney: "",
            },
            participants: [],
            tableData: [],
            openTables: [],
            details: {
                buyIn: "",
                field1: "-",
                field2: "-",
                field3: "-",
                field4: "-",
                field5: "-",
                description: "",
                type: "",
                status: ""
            },
            info: {
                name: "-",
                date: "-",
                min: "-",
                max: "-",
                players: "-",
                registrationStart: "",
                registrationFinish: "",
                tournamentStart: "",
                tournamentFinish: ""
            },
            prizeInfo: {
                prizePool: "-",
                placesPaid: "-",
                entries: "-",
                rebuys: "-",
                addons: "-",
                data: [],
                payment: '',
                addonCount: "-",
                rebuyCount: "-"
            },
            regData: {
                types: [],
                status: "-",
                statusAction: "",
                name: "-",
                balance: "-",
                type: "-",
                id: "",
                tableIdNo: "",
                tableType: "",
                tableName: "",
                compPoints: "-",
                TM: "-",
                myTableId: '',
                joinBtnStatus: ''
            },
            showRegistration: false,
            showRegisteredbtn: true,
            showwatchorjoin: false,
            watchorjoin: "",
            showUnRegistration: false,
            showInfo: false,
            regAlert: "",
            infoData: {
                data: {
                    startingChips: "-",
                    blinds: "-",
                    rebuys: "",
                    addons: "",
                    text1: "",
                    text2: "",
                    text3: "",
                    minPlayers: 0,
                    maxPlayers: 0,
                    TouroStatus: ""
                },
                info: [],
                currentLevel: undefined,
                currentLevelIndex: undefined
            },
            myLevelWithStacks: "",
            myNextLevelWithStacks: "",
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
                chips: "-"
            },
            tournamentState: true,
            showSelectMoney: true,
            disableWatchBtn: false,
            largestStack: "",
            averageStack: "",
            lowestStack: "",
            nextBreakStartIn: "",
            nextLevelStartIn: "",
            myRank: "",
            isMe: false,
            selectedTournyLobbyId: "",
            reEntryTable: {
                isTourneyRetry: false,
                maxRetryCount: 0,
                noOfRetries: 0
            },
        };
        this.playerCompoints = "";
        this.addonpresent = false;
        this.config = new Config();
        this.date = new Date();
        Emitter.on('closeTourneyEmit', this.emitChildMethod);
        Emitter.on('closeTourneyTableEmit', this.emitChildMethodOne);
        Emitter.on('OpenTourneyLobby', this.emitChildMethodTwo);
        Emitter.on('Tournament_Lobby_Reload', this.emitLobbyReload);
    }

    emitChildMethod = () => {
        if (this._tourneyNetwork) {
            this.closeTLobby();
        }
    };

    emitChildMethodOne = () => {
        if (this._tourneyNetwork) {
            console.log("================================ Tourney Lobby Refresh ==================================================");
            this.refreshTables();
        }
    };

    emitChildMethodTwo = () => {
        if (this._tourneyNetwork) {
            this.setState({
                tableLoded: true, participants: [], tableData: [], openTables: [],
                infoData: {
                    data: {
                        startingChips: "-", blinds: "-", rebuys: "", addons: "", text1: "",
                        text2: "", text3: "", minPlayers: 0, maxPlayers: 0, TouroStatus: ""
                    },
                    info: [],
                    currentLevel: undefined,
                    currentLevelIndex: undefined
                },
                prizeInfo: {
                    prizePool: "-", placesPaid: "-", entries: "-", rebuys: "-", addons: "-", data: [], payment: ''
                },
                regData: {
                    types: [], status: "-", name: "-", balance: "-", type: "-", id: "", tableIdNo: "",
                    tableType: "", tableName: "", compPoints: "-", TM: "-", myTableId: '', joinBtnStatus: ''
                },
                playerData: {
                    balance: "", tickets: "", tMoney: "", cPoints: "", playMoney: "",
                },
                details: {
                    buyIn: "", field1: "-", field2: "-", field3: "-", field4: "-",
                    field5: "-", description: "", type: "", status: ""
                },
                info: {
                    name: "-", date: "-", min: "-", max: "-", players: "-", registrationStart: "",
                    registrationFinish: "", tournamentStart: "", tournamentFinish: ""
                },
                tourneyData: {
                    name: "", date: "", buyIn: "", type: "", typeText: "", chips: "-",
                    status: "", players: "", prize: "", description: "", id: ""
                }
            });
        }
    };

    emitLobbyReload = () => {
        if (this._tourneyNetwork) {
            setTimeout(() => {
                this.refreshTables();
            }, 5000);
        }
    }

    initTourneyLobby(data) {
        console.log("initTourneyLobby >>  ", data)
        // this.setState({ joinTableBtn: true, });
        this.setState({ loader: false, tableLoded: false, showBtnLoader: true });
        setTimeout(() => {
            // this.refreshTables();
            this.props.TourneyHandler("setLoaderState");
            // this.props.TourneyHandler("hideMiniTableTab", false);
        }, 1000);

        if (data.TournamentDetails.hasOwnProperty("SitAndGoTournament")) {
            this.onGetSitGodata(data);
        } else if (data.TournamentDetails.hasOwnProperty("ScheduledTournament")) {
            this.onGetScheduledData(data);
        }
        if (data.TournamentDetails.hasOwnProperty("attr")) {
            if (data.TournamentDetails.attr.hasOwnProperty("tourneyRetry")) {
                let reEntryTable = { ...this.state.reEntryTable };
                reEntryTable.maxRetryCount = data.TournamentDetails.attr?.maxRetryCount;
                console.log(data.TournamentDetails)
                if (data.TournamentDetails.attr.tourneyRetry === "true") {
                    reEntryTable.isTourneyRetry = true;
                    this.setState({ enableReEntry: true });
                } else {
                    reEntryTable.isTourneyRetry = false;
                    this.setState({ enableReEntry: false });
                }
                this.setState({ reEntryTable });
            }
        }
        this.isChecked();

    }
    async onPlayerInfo(data) {
        console.log(data);
        // alert("hit ")
        let regData = this.state.regData;
        let playerData = this.state.playerData;
        if (data.hasOwnProperty("PlayerInfo")) {
            if (data.PlayerInfo.hasOwnProperty("attr")) {
                if (data.PlayerInfo.attr.registered === "false") {
                    regData.status = "Unregistered";
                    regData.statusAction = "Register";
                    this.setState({ watchorjoin: "Watch Table" });
                } else {
                    setTimeout(() => {
                        if (!this.state.isMe) {
                            regData.status = "Registered";
                            regData.statusAction = "Unregister";
                        }
                        this.setState({ watchorjoin: "Join Table" });
                    }, 200);
                }
                if (data.PlayerInfo.attr.hasOwnProperty("noOfRetries")) {
                    let reEntryTable = { ...this.state.reEntryTable };
                    reEntryTable.noOfRetries = data.PlayerInfo.attr.noOfRetries;
                    this.setState({ reEntryTable });
                }

                regData.name = data.PlayerInfo.attr.nickname;
            }
            if (data.PlayerInfo.hasOwnProperty("Tickets")) {
                playerData.tickets = data.PlayerInfo.Tickets.attr.count;
            }
            if (data.PlayerInfo.hasOwnProperty("Balance")) {
                if (data.PlayerInfo.Balance.hasOwnProperty("attr")) {
                    this.balance = await data.PlayerInfo.Balance.attr.cash;
                    playerData.balance = data.PlayerInfo.Balance.attr.cash;
                    regData.balance = data.PlayerInfo.Balance.attr.cash;
                    this.tMoney = data.PlayerInfo.Balance.attr["tournament-money"];
                    playerData.tMoney = data.PlayerInfo.Balance.attr["tournament-money"];
                } else {
                    for (let i = 0; i < data.PlayerInfo.Balance.length; i++) {
                        if (data.PlayerInfo.Balance[i].attr.wallet === 'COMPPOINTS') {
                            playerData.cPoints = data.PlayerInfo.Balance[i].attr.total;
                            this.playerCompoints = await data.PlayerInfo.Balance[i].attr.total;
                        }
                        if (data.PlayerInfo.Balance[i].attr.wallet === 'PLAYMONEY') {
                            playerData.playMoney = data.PlayerInfo.Balance[i].attr.total
                        }
                        if (data.PlayerInfo.Balance[i].attr.wallet === 'CHP') {
                            if (data.PlayerInfo.Balance[i].attr.hasOwnProperty('total')) {
                                this.cPoints = data.PlayerInfo.Balance[i].attr.total;
                            }
                            if (data.PlayerInfo.Balance[i].attr.hasOwnProperty('cash')) {
                                playerData.balance = data.PlayerInfo.Balance[i].attr.cash;
                                regData.balance = data.PlayerInfo.Balance[i].attr.cash;
                                this.balance = data.PlayerInfo.Balance[i].attr.cash;
                            }
                        }
                        try {
                            if (data.PlayerInfo.Balance[i].attr["tournament-money"]) {
                                this.tMoney = data.PlayerInfo.Balance[i].attr["tournament-money"];
                                playerData.tMoney = data.PlayerInfo.Balance[i].attr["tournament-money"];
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            }
            this.setState({ playerData: playerData });
            this.setState({ regData: regData });
        }
    }

    onGetSitGodata(data) {
        let info = this.state.info;
        let details = this.state.details;
        let prizeInfo = this.state.prizeInfo;
        let regData = this.state.regData;
        let infoData = this.state.infoData;

        if (data.TournamentDetails.hasOwnProperty("attr")) {
            if (data.TournamentDetails.attr.hasOwnProperty("name")) {
                info.name = data.TournamentDetails.attr.name;
                details.field1 = data.TournamentDetails.attr.name;
                infoData.data.text1 = data.TournamentDetails.attr.name;
                regData.id = data.TournamentDetails.attr.id;
                details.type = data.TournamentDetails.attr.type
                regData.tableType = data.TournamentDetails.SitAndGoTournament.attr.game;
                regData.tableName = data.TournamentDetails.attr.name;
                // this.props.TourneyHandler("getTourneyTableId", data.TournamentDetails.attr.id);
            }
        }
        if (data.TournamentDetails.SitAndGoTournament.hasOwnProperty("Description")) {
            details.description = data.TournamentDetails.SitAndGoTournament.Description;
        }
        if (data.TournamentDetails.SitAndGoTournament.hasOwnProperty("Schedule")) {
            switch (data.TournamentDetails.SitAndGoTournament.Schedule.attr.status) {
                case "CANCELED_BEFORE_START":
                    details.status = "Cancelled";
                    this.setState({ watchTableBtn: false, showwatchorjoin: false })
                    break;
                case "COMPLETED":
                    details.status = "Completed";
                    this.setState({ watchTableBtn: false, showwatchorjoin: false })
                    break;
                case "SEATING":
                    details.status = "Seating";
                    this.setState({ showwatchorjoin: false })
                    break;
                case "REGISTERING":
                    details.status = "Registering";
                    this.setState({ showwatchorjoin: false })
                    break;
                case "ANNOUNCED":
                    details.status = "Announced";
                    this.setState({ showwatchorjoin: false })
                    break;
                case "LATE_REG":
                    details.status = "Late Registration";
                    this.setState({ showwatchorjoin: true })
                    break;
                case "RUNNING":
                    details.status = "Running";
                    this.setState({ showwatchorjoin: true })
                    break;
                default:
                    details.status = data.TournamentDetails.ScheduledTournament.Schedule.attr.status;
                    break;
            }

        }
        if (data.TournamentDetails.SitAndGoTournament.hasOwnProperty("attr")) {
            let limit, game;
            if (data.TournamentDetails.SitAndGoTournament.attr.hasOwnProperty("limit")) {
                limit = data.TournamentDetails.SitAndGoTournament.attr.limit;
            }
            if (data.TournamentDetails.SitAndGoTournament.attr.hasOwnProperty("game")) {
                game = data.TournamentDetails.SitAndGoTournament.attr.game;
                info.mode = data.TournamentDetails.SitAndGoTournament.attr.mode;
            }
            // details.field4 = this.GETlIMITEXT(`${limit}`) + this.getGameType(`${game}_${limit}`);
            details.field4 = this.getGameType(`${game}_${limit}`);
            details.field2 = this.getGameType(`${game}_${limit}`);
            infoData.data.text3 = this.getGameType(`${game}_${limit}`);
        }

        if (data.TournamentDetails.SitAndGoTournament.hasOwnProperty("Parameters")) {
            let buyIn, chips;
            if (data.TournamentDetails.SitAndGoTournament.Parameters.hasOwnProperty("attr")) {
                buyIn = data.TournamentDetails.SitAndGoTournament.Parameters.attr.buyIn;
                chips = data.TournamentDetails.SitAndGoTournament.Parameters.attr.chips;
                regData.compPoints = data.TournamentDetails.SitAndGoTournament.Parameters.attr.compPoints
                regData.TM = Number(data.TournamentDetails.SitAndGoTournament.Parameters.attr.fee) + Number(data.TournamentDetails.SitAndGoTournament.Parameters.attr.prizeFee)
                infoData.data.startingChips = data.TournamentDetails.SitAndGoTournament.Parameters.attr.chips;
                details.field5 = `${"Buy In"}: ${data.TournamentDetails.SitAndGoTournament.Parameters.attr.fee} + ${data.TournamentDetails.SitAndGoTournament.Parameters.attr.prizeFee}`
            }
            details.buyIn = data.TournamentDetails.SitAndGoTournament.Parameters.attr.buyIn
            details.field3 = `${"Buy In"}: ${UM.numberWithCommas(Number(buyIn))} ${"Chips"}: ${UM.numberWithCommas(Number(chips))}`;
            infoData.data.text2 = `${"Buy In"}: ${UM.numberWithCommas(Number(buyIn))} ${"Chips"}: ${UM.numberWithCommas(Number(chips))}`;

            if (data.TournamentDetails.SitAndGoTournament.Parameters.hasOwnProperty("Addon")) {
                this.addonpresent = true;
                prizeInfo.addons = data.TournamentDetails.SitAndGoTournament.Parameters.Addon.attr.count;
                infoData.data.addons = `${UM.numberWithCommas(data.TournamentDetails.SitAndGoTournament.Parameters.Addon.attr.cost)} + ${data.TournamentDetails.SitAndGoTournament.Parameters.attr.fee} for ${UM.numberWithCommas(data.TournamentDetails.SitAndGoTournament.Parameters.Addon.attr.chips)} chips (${data.TournamentDetails.SitAndGoTournament.Parameters.Addon.attr.count})`;
            }
            if (data.TournamentDetails.SitAndGoTournament.Parameters.hasOwnProperty("Rebuy")) {
                prizeInfo.rebuys = data.TournamentDetails.SitAndGoTournament.Parameters.Rebuy.attr.count;
                infoData.data.rebuys = `${UM.numberWithCommas(data.TournamentDetails.SitAndGoTournament.Parameters.Rebuy.attr.cost)} + ${data.TournamentDetails.SitAndGoTournament.Parameters.attr.fee} for ${UM.numberWithCommas(data.TournamentDetails.SitAndGoTournament.Parameters.Rebuy.attr.chips)} chips (${data.TournamentDetails.SitAndGoTournament.Parameters.Rebuy.attr.count})`;
            }
            // if (data.TournamentDetails.SitAndGoTournament.Parameters.hasOwnProperty("Entries")) {
            //     prizeInfo.entries = data.TournamentDetails.SitAndGoTournament.Parameters.Entries.attr.count;
            // }
        }
        if (data.TournamentDetails.SitAndGoTournament.hasOwnProperty("PrizeInfo")) {
            let playerRebuys = data.TournamentDetails.SitAndGoTournament.PrizeInfo.attr?.rebuys;
            let playerAddons = data.TournamentDetails.SitAndGoTournament.PrizeInfo.attr?.addons;
            prizeInfo.addonCount = playerAddons === undefined ? "0" : playerAddons;
            prizeInfo.rebuyCount = playerRebuys === undefined ? "0" : playerRebuys;
            prizeInfo.prizePool = UM.numberWithCommas(data.TournamentDetails.SitAndGoTournament.PrizeInfo.attr.prizePool);
            prizeInfo.placesPaid = data.TournamentDetails.SitAndGoTournament.PrizeInfo.attr.placesPaid;
            if (data.TournamentDetails.SitAndGoTournament.PrizeInfo.hasOwnProperty("Payment")) {
                if (Array.isArray(data.TournamentDetails.SitAndGoTournament.PrizeInfo.Payment)) {
                    prizeInfo.payment = data.TournamentDetails.SitAndGoTournament.PrizeInfo.Payment.map(payment => {
                        return `<div class="df_al_jsb"><span>${payment.attr.place}. </span> <span> ${UM.numberWithCommas(payment.attr.amount)}</span></div>`;
                    }).join('');
                } else if (data.TournamentDetails.SitAndGoTournament.PrizeInfo.Payment) {
                    const payment = data.TournamentDetails.SitAndGoTournament.PrizeInfo.Payment;
                    prizeInfo.payment = `<div class="df_al_jsb"><span>${payment.attr.place}. </span> <span>${UM.numberWithCommas(payment.attr.amount)}</span></div>`;
                }
            }
        }
        if (data.TournamentDetails.SitAndGoTournament.hasOwnProperty("Participants")) {
            infoData.data.minPlayers = UM.numberWithCommas(data.TournamentDetails.SitAndGoTournament.Participants.attr.minimum);
            infoData.data.maxPlayers = UM.numberWithCommas(data.TournamentDetails.SitAndGoTournament.Participants.attr.maximum);
            prizeInfo.entries = data.TournamentDetails.SitAndGoTournament.Participants.attr.total;
        }
        if (data.TournamentDetails.SitAndGoTournament.hasOwnProperty("Participants")) {
            if (data.TournamentDetails.SitAndGoTournament.Participants.hasOwnProperty("attr")) {
                info.min = data.TournamentDetails.SitAndGoTournament.Participants.attr.minimum;
                info.max = data.TournamentDetails.SitAndGoTournament.Participants.attr.maximum;
                info.players = data.TournamentDetails.SitAndGoTournament.Participants.attr.total;
                info.date = `When ${data.TournamentDetails.SitAndGoTournament.Participants.attr.minimum} are Registered`;
            }
        }
        if (data.TournamentDetails.SitAndGoTournament.hasOwnProperty("RegistrationTypes")) {
            if (data.TournamentDetails.SitAndGoTournament.RegistrationTypes.hasOwnProperty("RegistrationType")) {
                let types = data.TournamentDetails.SitAndGoTournament.RegistrationTypes.RegistrationType;

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
                                    type: "Balance", text: "BALANCE", amount: UM.changeAmtLabel(this.balance), buyAmount: (this.state.details.buyIn === "FREEROLL" ? 'FREEROLL' : UM.changeAmtLabel(this.state.details.buyIn)), enable: (this.state.details.buyIn === "FREEROLL" ? "FREEROLL" : Number(this.balance) > Number(this.state.details.buyIn))
                                });
                                break;
                            case "TOURNAMENT_MONEY":
                                regData.types.push({ type: "Tournament Money", text: "TOURNAMENT_MONEY", amount: UM.changeAmtLabel(this.state.playerData.tMoney), buyAmount: UM.changeAmtLabel(this.state.regData.TM), enable: Number(this.state.playerData.tMoney) > Number(this.state.regData.TM) });
                                break;
                            case "TICKET":
                                regData.types.push({ type: "Tickets", text: "TICKET", amount: UM.changeAmtLabel(this.state.playerData.tickets), buyAmount: "Ticket", enable: Number(this.state.playerData.tickets) > 0 });
                                break;
                            case "COMP_POINTS":
                                regData.types.push({ type: "VIP Points", text: "COMP_POINTS", amount: UM.changeAmtLabel(this.playerCompoints), buyAmount: UM.changeAmtLabel(this.state.regData.compPoints), enable: Number(this.playerCompoints) > Number(this.state.regData.compPoints) });
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
        this.setState({ regData: regData, info: info, infoData: infoData });
    }


    onGetScheduledData(data) {
        let info = this.state.info;
        let details = this.state.details;
        let prizeInfo = this.state.prizeInfo;
        let regData = this.state.regData;
        let infoData = this.state.infoData;
        console.log(data);
        if (data.TournamentDetails.hasOwnProperty("attr")) {
            if (data.TournamentDetails.attr.hasOwnProperty("name")) {
                info.name = data.TournamentDetails.attr.name;
                details.field1 = data.TournamentDetails.attr.name;
                infoData.data.text1 = data.TournamentDetails.attr.name;
                regData.id = data.TournamentDetails.attr.id;
                regData.tableType = data.TournamentDetails.ScheduledTournament.attr.game;
                regData.tableName = data.TournamentDetails.attr.name;
                details.type = data.TournamentDetails.attr.type;
                // this.props.TourneyHandler("getTourneyTableId", data.TournamentDetails.attr.id);
            }
        }
        if (data.TournamentDetails.ScheduledTournament.hasOwnProperty("Description")) {
            details.description = data.TournamentDetails.ScheduledTournament.Description;
        }
        if (data.TournamentDetails.ScheduledTournament.hasOwnProperty("attr")) {
            let limit, game;
            if (data.TournamentDetails.ScheduledTournament.attr.hasOwnProperty("limit")) {
                limit = data.TournamentDetails.ScheduledTournament.attr.limit;
            }
            if (data.TournamentDetails.ScheduledTournament.attr.hasOwnProperty("game")) {
                game = data.TournamentDetails.ScheduledTournament.attr.game;
            }
            // details.field4 = this.GETlIMITEXT(`${limit}`) + this.getGameType(`${game}_${limit}`);
            details.field4 = this.getGameType(`${game}_${limit}`);
            details.field2 = this.getGameType(`${game}_${limit}`);
            infoData.data.text3 = this.getGameType(`${game}_${limit}`);
            info.mode = data.TournamentDetails.ScheduledTournament.attr.mode;
        }
        if (data.TournamentDetails.ScheduledTournament.hasOwnProperty("Parameters")) {
            let buyIn, chips;
            if (data.TournamentDetails.ScheduledTournament.Parameters.hasOwnProperty("attr")) {
                buyIn = data.TournamentDetails.ScheduledTournament.Parameters.attr.buyIn;
                chips = data.TournamentDetails.ScheduledTournament.Parameters.attr.chips;
                regData.compPoints = data.TournamentDetails.ScheduledTournament.Parameters.attr.compPoints
                regData.TM = Number(data.TournamentDetails.ScheduledTournament.Parameters.attr.fee) + Number(data.TournamentDetails.ScheduledTournament.Parameters.attr.prizeFee)
                details.field5 = `${t("Buy In")}: ${data.TournamentDetails.ScheduledTournament.Parameters.attr.fee} + ${data.TournamentDetails.ScheduledTournament.Parameters.attr.prizeFee}`
                infoData.data.startingChips = data.TournamentDetails.ScheduledTournament.Parameters.attr.chips;
            }
            details.buyIn = data.TournamentDetails.ScheduledTournament.Parameters.attr.buyIn;

            details.field3 = `${t("Buy In")}: ${buyIn} ${t("Chips")}: ${chips}`;
            infoData.data.text2 = `${t("Buy In")}: ${UM.numberWithCommas(Number(buyIn))} ${t("Chips")}: ${UM.numberWithCommas(Number(chips))}`;

            if (data.TournamentDetails.ScheduledTournament.Parameters.hasOwnProperty("Addon")) {
                this.addonpresent = true;
                prizeInfo.addons = data.TournamentDetails.ScheduledTournament.Parameters.Addon.attr.count;
                infoData.data.addons = `${UM.numberWithCommas(data.TournamentDetails.ScheduledTournament.Parameters.Addon.attr.cost)} + ${data.TournamentDetails.ScheduledTournament.Parameters.attr.fee} for ${UM.numberWithCommas(data.TournamentDetails.ScheduledTournament.Parameters.Addon.attr.chips)} chips (${data.TournamentDetails.ScheduledTournament.Parameters.Addon.attr.count})`;
            }
            if (data.TournamentDetails.ScheduledTournament.Parameters.hasOwnProperty("Rebuy")) {
                prizeInfo.rebuys = data.TournamentDetails.ScheduledTournament.Parameters.Rebuy.attr.count;
                infoData.data.rebuys = `${UM.numberWithCommas(data.TournamentDetails.ScheduledTournament.Parameters.Rebuy.attr.cost)} + ${data.TournamentDetails.ScheduledTournament.Parameters.attr.fee} for ${UM.numberWithCommas(data.TournamentDetails.ScheduledTournament.Parameters.Rebuy.attr.chips)} chips (${data.TournamentDetails.ScheduledTournament.Parameters.Rebuy.attr.count})`;
            }
            // if (data.TournamentDetails.ScheduledTournament.Parameters.hasOwnProperty("Entries")) {
            //     prizeInfo.entries = data.TournamentDetails.ScheduledTournament.Parameters.Entries.attr.count;
            // }
        }
        if (data.TournamentDetails.ScheduledTournament.hasOwnProperty("PrizeInfo")) {
            let playerRebuys = data.TournamentDetails.ScheduledTournament.PrizeInfo.attr?.rebuys;
            let playerAddons = data.TournamentDetails.ScheduledTournament.PrizeInfo.attr?.addons;
            prizeInfo.addonCount = playerAddons === undefined ? "0" : playerAddons;
            prizeInfo.rebuyCount = playerRebuys === undefined ? "0" : playerRebuys;
            prizeInfo.prizePool = UM.numberWithCommas(data.TournamentDetails.ScheduledTournament.PrizeInfo.attr.prizePool);
            prizeInfo.placesPaid = data.TournamentDetails.ScheduledTournament.PrizeInfo.attr.placesPaid;
            if (data.TournamentDetails.ScheduledTournament.PrizeInfo.hasOwnProperty("Payment")) {
                if (data.TournamentDetails.ScheduledTournament.PrizeInfo.hasOwnProperty("Payment")) {
                    if (Array.isArray(data.TournamentDetails.ScheduledTournament.PrizeInfo.Payment)) {
                        prizeInfo.payment = data.TournamentDetails.ScheduledTournament.PrizeInfo.Payment.map(payment => {
                            return `<div class="df_al_jsb"><span>${payment.attr.place}. </span> <span> ${UM.numberWithCommas(payment.attr.amount)}</span></div>`;
                        }).join('');
                    } else if (data.TournamentDetails.ScheduledTournament.PrizeInfo.Payment) {
                        const payment = data.TournamentDetails.ScheduledTournament.PrizeInfo.Payment;
                        prizeInfo.payment = `<div class="df_al_jsb"> <span>${payment.attr.place}. </span> <span>${UM.numberWithCommas(payment.attr.amount)}</span></div>`;
                    }
                }
            }
        }
        if (data.TournamentDetails.ScheduledTournament.hasOwnProperty("Participants")) {

            infoData.data.minPlayers = UM.numberWithCommas(data.TournamentDetails.ScheduledTournament.Participants.attr.minimum);
            infoData.data.maxPlayers = UM.numberWithCommas(data.TournamentDetails.ScheduledTournament.Participants.attr.maximum);
        }
        if (data.TournamentDetails.ScheduledTournament.hasOwnProperty("Participants")) {
            if (data.TournamentDetails.ScheduledTournament.Participants.hasOwnProperty("attr")) {
                info.min = data.TournamentDetails.ScheduledTournament.Participants.attr.minimum;
                info.max = data.TournamentDetails.ScheduledTournament.Participants.attr.maximum;
                info.players = data.TournamentDetails.ScheduledTournament.Participants.attr.total;
                prizeInfo.entries = data.TournamentDetails.ScheduledTournament.Participants.attr.total;
            }
            if (data.TournamentDetails.ScheduledTournament.Participants.hasOwnProperty("Summary")) {
                this.setState({
                    largestStack: data.TournamentDetails.ScheduledTournament.Participants.Summary.attr.largestStack,
                    averageStack: data.TournamentDetails.ScheduledTournament.Participants.Summary.attr.averageStack,
                    lowestStack: data.TournamentDetails.ScheduledTournament.Participants.Summary.attr.lowestStack
                })
            }
        }
        if (data.TournamentDetails.ScheduledTournament.hasOwnProperty("Schedule")) {

            const registrationStart = UM.dateFormater(data.TournamentDetails.ScheduledTournament.Schedule.attr.registrationStart);
            const registrationFinish = UM.dateFormater(data.TournamentDetails.ScheduledTournament.Schedule.attr.registrationFinish);
            const tournamentStart = UM.dateFormater(data.TournamentDetails.ScheduledTournament.Schedule.attr.tournamentStart);
            const tournamentFinish = UM.dateFormater(data.TournamentDetails.ScheduledTournament.Schedule.attr.tournamentFinish);
            info.date = new Date(parseInt(data.TournamentDetails.ScheduledTournament.Schedule.attr.tournamentStart)).toLocaleString();
            info.registrationStart = registrationStart;
            info.tournamentStart = tournamentStart;
            info.registrationFinish = registrationFinish !== undefined ? registrationFinish : "00:00";
            switch (data.TournamentDetails.ScheduledTournament.Schedule.attr.status) {
                case "CANCELED_BEFORE_START":
                    details.status = "Cancelled";
                    this.setState({ joinTableBtn: false, watchTableBtn: false, showwatchorjoin: false, tourneyStartText: "Started at", tourneyEndText: "Cancelled at", tourneyStartStatus: tournamentStart, tourneyEndStatus: tournamentFinish })
                    break;
                case "COMPLETED":
                    details.status = "Completed";
                    this.setState({ joinTableBtn: false, watchTableBtn: false, showwatchorjoin: false, tourneyStartText: "Started at", tourneyEndText: "Completed at", tourneyStartStatus: tournamentStart, tourneyEndStatus: tournamentFinish })
                    break;
                case "SEATING":
                    details.status = "Seating";
                    this.setState({ showwatchorjoin: false, tourneyStartText: "Started at", tourneyEndText: "", tourneyStartStatus: tournamentStart, tourneyEndStatus: "" })
                    break;
                case "REGISTERING":
                    details.status = "Registering";
                    this.setState({ showwatchorjoin: false, tourneyStartText: "Registration will end", tourneyEndText: "Tournament will start", tourneyStartStatus: registrationFinish, tourneyEndStatus: tournamentStart })
                    break;
                case "ANNOUNCED":
                    details.status = "Announced";
                    this.setState({ showwatchorjoin: false, tourneyStartText: "Registration will start", tourneyEndText: "", tourneyStartStatus: registrationStart, tourneyEndStatus: "" })
                    break;
                case "LATE_REG":
                    details.status = "Late Registration";
                    this.setState({ showwatchorjoin: true, tourneyStartText: "Started at", tourneyEndText: "", tourneyStartStatus: tournamentStart, tourneyEndStatus: "" })
                    break;
                case "RUNNING":
                    details.status = "Running";
                    this.setState({ showwatchorjoin: true, tourneyStartText: "Started at", tourneyEndText: "", tourneyStartStatus: tournamentStart, tourneyEndStatus: "" })
                    break;
                default:
                    details.status = data.TournamentDetails.ScheduledTournament.Schedule.attr.status;
                    break;
            }
        }
        if (data.TournamentDetails.ScheduledTournament.hasOwnProperty("RegistrationTypes")) {
            if (data.TournamentDetails.ScheduledTournament.RegistrationTypes.hasOwnProperty("RegistrationType")) {
                let types = data.TournamentDetails.ScheduledTournament.RegistrationTypes.RegistrationType;
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
                                    type: "Balance", text: "BALANCE", amount: UM.changeAmtLabel(this.balance), buyAmount: (this.state.details.buyIn === 'FREEROLL' ? 'FREEROLL' : UM.changeAmtLabel(this.state.details.buyIn)),
                                    enable: (this.state.details.buyIn === 'FREEROLL' ? 'FREEROLL' : Number(this.balance) > Number(this.state.details.buyIn))
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
                                    type: "VIP Points", text: "COMP_POINTS", amount: UM.changeAmtLabel(this.playerCompoints), buyAmount: UM.changeAmtLabel(this.state.regData.compPoints),
                                    enable: Number(this.playerCompoints) > Number(this.state.regData.compPoints)
                                });
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
        this.setState({ regData: regData, info: info, infoData: infoData });
    }

    onGetPlayers(data) {
        console.log(data)
        console.log("==================== *888888888* ====================")
        let participants = [];
        let info = this.state.info;
        let prizeInfo = this.state.prizeInfo
        let playerArray;
        this.date = new Date();

        if (data.hasOwnProperty("Players")) {
            if (data.Players.attr.hasOwnProperty("total")) {
                info.players = data.Players.attr.total;
                prizeInfo.entries = data.Players.attr.total;
            }

            if (data.Players.hasOwnProperty("Player")) {
                playerArray = data.Players.Player;
                if (!Array.isArray(playerArray)) {
                    playerArray = [playerArray];
                }
                playerArray.sort((a, b) => b.attr.stack - a.attr.stack);
                playerArray.forEach((obj, index) => {
                    if (this.state.regData.name == obj.attr.nickname) {
                        console.log(`Rank ${index + 1}: ${obj.attr.nickname} - Stack: ${obj.attr.stack}`);
                        this.setState({ myRank: index + 1 });
                    }
                });

                playerArray.forEach(player => {
                    let object = {};
                    object.chips = player.attr.hasOwnProperty("stack") ? player.attr.prizeAmount : "-";
                    object.place = player.attr.hasOwnProperty("placeTo") ? player.attr.placeTo : "-";
                    object.knockoutFee = player.attr.hasOwnProperty("knockoutPrize") ? Number(player.attr.knockoutPrize) : "-";
                    console.log("player-details  ", player)
                    if (player.attr.hasOwnProperty("placeTo")) {
                        if (player.attr.nickname === this.state.regData.name) {
                            let reEntryTable = { ...this.state.reEntryTable };
                            if (this.state.enableReEntry && Number(reEntryTable.maxRetryCount) >= Number(reEntryTable.noOfRetries)) {
                                let regData = this.state.regData;
                                regData.status = "Unregistered";
                                regData.statusAction = "Register";
                                this.setState({ regData: regData });
                            } else {
                                let regData = this.state.regData;
                                regData.status = "Registered";
                                regData.statusAction = "";
                                this.setState({ regData: regData });
                            }
                            // if (this.state.regData.status !== "Registered") {
                            this.setState({ isMe: true });
                            this.setState({ isTourneyRegistered: false });

                            // }
                        } else {
                            this.setState({ isMe: false });
                        }
                    } else {
                        if (player.attr.nickname === this.state.regData.name) {
                            this.setState({ isTourneyRegistered: true });
                        }
                        this.setState({ isMe: false });
                    }
                    object.nickName = (
                        <div className="players_data_div">
                            {player.attr.hasOwnProperty("placeTo") &&
                                <span style={{ width: '15px' }}>{player.attr.placeTo}. </span>
                            }
                            <span>{player.attr.nickname}</span>
                            {player.attr.hasOwnProperty("stack") &&
                                player.attr.hasOwnProperty("placeTo") ?
                                <span>{Number(player.attr.prizeAmount) > 0 ? UM.numberWithCommas(player.attr.prizeAmount) : "0"}</span> :
                                <span>{Number(player.attr.stack) > 0 ? UM.numberWithCommas(player.attr.stack) : "0"}</span>
                            }
                            {player.attr.hasOwnProperty("knockoutPrize") &&
                                <span>{Number(player.attr.knockoutPrize) > 0 ? UM.numberWithCommas(player.attr.knockoutPrize) : "0"}</span>
                            }

                            {/* <table>
                                <thead>
                                    <tr>
                                        <td>Place</td>
                                        <td>Name</td>
                                        <td>Stakes</td>
                                        <td>PrizeAmount</td>
                                        <td>knockoutPrize</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {player.attr.map((place, i) => {
                                        <tr key={i}>
                                            <td>{place.placeTo}</td>
                                            <td>{place.nickname}</td>
                                            <td>{place.stack}</td>
                                            <td>{place.prizeAmount}</td>
                                            <td>{place.knockoutPrize}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table> */}
                        </div>
                    );
                    participants.push(object);
                    if (this.state.regData.name === player.attr.nickname) {
                        // console.log("tableId  ", player.attr.tableId)
                        this.setState({ openTableId: player.attr.tableId });
                    }
                });
            } else {
                this.setState({ isTourneyRegistered: false });
            }

            if (data.Players.attr.total === 0) {
                participants = [{ nickName: "", chips: "No Players Registered Currently", place: "" }];
            } else {
                let tourneyData = { ...this.state.tourneyData, players: data.Players.attr.total };
                this.setState({ tourneyData });
            }
            this.setState({ participants, info, prizeInfo: prizeInfo, showBtnLoader: false });
        }
    }




    onGetTables(data) {
        let openTables = this.state.openTables;
        let tabledata = [];
        openTables = [];
        if (data.hasOwnProperty("Tables")) {
            if (data.Tables.hasOwnProperty("Table")) {
                this.setState({ tableLoded: false, disableWatchBtn: false });
                if (Array.isArray(data.Tables.Table)) {
                    tabledata = data.Tables.Table;
                } else {
                    tabledata = [data.Tables.Table];
                }
                let i = 0,
                    cnt = tabledata.length;

                for (i; i < cnt; i++) {
                    let object = {};
                    object.table = <div className="df_al_jsb">
                        <div className="first-two-btns" style={{ textAlign: 'start' }}>
                            <span style={{ fontSize: '15px', color: '#fff' }}>{tabledata[i].attr.name} </span>
                            <span style={{ color: 'gray' }}>Stakes:</span>
                        </div>
                        <div className="first-two-btns" style={{ textAlign: 'end' }}>
                            <span style={{ fontSize: '15px', color: '#fff' }}>Players: <span className="clr_river">{tabledata[i].attr.players}</span></span>
                            <span style={{ color: 'gray' }}>{UM.numberWithCommas(tabledata[i].attr.lowestStack)}{" / "}{UM.numberWithCommas(tabledata[i].attr.highestStack)}</span>
                        </div>
                    </div>;
                    object.id = tabledata[i].attr.id;
                    object.type = "TOURNAMENT_TABLE";
                    openTables.push(object);
                }
            } else {
                this.setState({ disableWatchBtn: true });
            }
            if (data.Tables.attr.total === 0) {
                let object = {};
                openTables = [{ table: "There are no Tables", largest: "", smallest: "" }];
                object.table = "There are no Tables";
                openTables.push(object);
                this.setState({ openTables: openTables });
            }

            this.setState({
                openTables: openTables,
            });
        }
        this.TourneylobbyNetworkReady = true;
    }
    onGetTournyDetails(data) {
        console.log("======================onGetTournyDetails================================")
        this.setState({ tableLoded: true });
        let tourneyData = this.state.tourneyData;
        if (data.TournamentDetails.hasOwnProperty("ScheduledTournament")) {
            tourneyData.id = data.TournamentDetails.attr.id;
            tourneyData.type = data.TournamentDetails.attr.type;
            tourneyData.typeText = "Scheduled";
            tourneyData.date = new Date(parseInt(data.TournamentDetails.ScheduledTournament.Schedule.attr.tournamentStart)).toLocaleString("en");
            tourneyData.description = data.TournamentDetails.ScheduledTournament.Description;
            tourneyData.name = data.TournamentDetails.attr.name;
            tourneyData.buyIn = data.TournamentDetails.ScheduledTournament.Parameters.attr.buyIn;
            tourneyData.chips = data.TournamentDetails.ScheduledTournament.Parameters.attr.chips;
            tourneyData.players = data.TournamentDetails.ScheduledTournament.Participants.attr.total;
            tourneyData.prize = data.TournamentDetails.ScheduledTournament.PrizeInfo.attr.prizePool;

            switch (data.TournamentDetails.ScheduledTournament.Schedule.attr.status) {
                case "CANCELED_BEFORE_START":
                    tourneyData.status = "Cancelled";
                    this.setState({ joinTableBtn: false, watchTableBtn: false, });
                    break;
                case "COMPLETED":
                    tourneyData.status = "Completed";
                    this.setState({ joinTableBtn: false, watchTableBtn: false, });
                    break;
                case "SEATING":
                    tourneyData.status = "Seating";
                    break;
                case "REGISTERING":
                    tourneyData.status = "Registering";
                    break;
                case "ANNOUNCED":
                    tourneyData.status = "Announced";
                    break;
                case "LATE_REG":
                    tourneyData.status = "Late Registration";
                    break;
                default:
                    tourneyData.status = data.TournamentDetails.ScheduledTournament.Schedule.attr.status;
                    break;
            }
            this.setState({ tourneyData: tourneyData });
            if (data.TournamentDetails.ScheduledTournament.hasOwnProperty("Schedule")) {
                if (data.TournamentDetails.ScheduledTournament.Schedule.attr.status === "CANCELLING" || data.TournamentDetails.ScheduledTournament.Schedule.attr.status === "CANCELED_BEFORE_START") {
                    this.setState({ showOpenTableData: true })
                }
            }

        }
        if (data.TournamentDetails.hasOwnProperty("SitAndGoTournament")) {
            tourneyData.id = data.TournamentDetails.attr.id;
            tourneyData.type = data.TournamentDetails.attr.type;
            tourneyData.typeText = "Scheduled";
            tourneyData.date = new Date(parseInt(data.TournamentDetails.SitAndGoTournament.Schedule.attr.tournamentStart)).toLocaleString("en");
            tourneyData.description = data.TournamentDetails.SitAndGoTournament.Description;
            tourneyData.name = data.TournamentDetails.attr.name;
            tourneyData.buyIn = data.TournamentDetails.SitAndGoTournament.Parameters.attr.buyIn;
            tourneyData.players = data.TournamentDetails.SitAndGoTournament.Participants.attr.total;
            tourneyData.prize = data.TournamentDetails.SitAndGoTournament.PrizeInfo.attr.prizePool;
            switch (data.TournamentDetails.SitAndGoTournament.Schedule.attr.status) {
                case "CANCELED_BEFORE_START":
                    tourneyData.status = "Cancelled";
                    this.setState({ watchTableBtn: false, joinTableBtn: false });
                    break;
                case "COMPLETED":
                    tourneyData.status = "Completed";
                    this.setState({ watchTableBtn: false, joinTableBtn: false });
                    break;
                case "SEATING":
                    tourneyData.status = "Seating";
                    break;
                case "REGISTERING":
                    tourneyData.status = "Registering";
                    break;
                case "ANNOUNCED":
                    tourneyData.status = "Announced";
                    break;
                case "LATE_REG":
                    tourneyData.status = "Late Registration";
                    break;
                default:
                    tourneyData.status = data.TournamentDetails.SitAndGoTournament.Schedule.attr.status;
                    break;
            }
            this.setState({ tourneyData: tourneyData });
        }
    }

    onGetTableDetails(data) {
        if (!data?.TableDetails) return;
        this.toggleDropdown(null);
        this.setState({
            opentabledetails: {
                id: data.TableDetails?.attr?.id,
                type: data.TableDetails?.attr?.type
            }
        });

        const tables = data.TableDetails?.TournamentTable?.Seats?.Seat;
        if (!Array.isArray(tables) || tables.length === 0) return;

        let tableData = tables.map((table) => {
            const player = table?.PlayerInfo?.attr;
            if (!player) return null;

            if (this.state.regData.name === player.nickname) {
                if (this.state.regData.tableIdNo !== table?.PlayerInfo?.Table?.attr?.id) {
                    this.setState({
                        regData: {
                            ...this.state.regData,
                            tableIdNo: table?.PlayerInfo?.Table?.attr?.id
                        },
                        showRegisteredbtn: false
                    });
                }
            }

            return {
                players: player.nickname,
                chips: Number(table?.PlayerInfo?.Chips?.attr?.["stack-size"]).toLocaleString("en-US")
            };
        }).filter(Boolean);

        this.setState({ tableData });
    }

    onTournamentPlayerRegistered(data) {
        let regData = this.state.regData;
        regData.status = "Registered";
        regData.statusAction = "Unregister";
        this.setState({ showAlert: true });
        setTimeout(() => { this.setState({ showAlert: false }); }, 4000);
        this.setState({ regAlert: "You have successfully registered for the tournament" });
        this.setState({ regData: regData });
        this._tourneyNetwork.send(`<GetPlayers/>`);
    };

    onTournamentPlayerUnregistered(data) {
        let regData = this.state.regData;
        regData.status = "Unregistered";
        regData.statusAction = "Register";
        this.setState({ showAlert: true });
        setTimeout(() => { this.setState({ showAlert: false }); }, 4000);
        this.setState({ regAlert: "You have successfully unregistered for the tournament" });
        this.setState({ regData: regData });
        this._tourneyNetwork.send(`<GetPlayers/>`);
    }

    getTournamentTimeInfo(tournamentStart) {
        const now = new Date().getTime();
        const startTime = parseInt(tournamentStart, 10);

        if (startTime <= now) {
            return "The tournament has already started.";
        } else {
            const timeDiff = startTime - now;
            // const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            // const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            return {
                minutes,
                seconds
            };
        }
    }




    onGetSchedule(data) {
        let infoData = this.state.infoData;
        let details = this.state.details;
        if (data.Schedule.hasOwnProperty("attr")) {
            if (data.Schedule.attr.hasOwnProperty("currentLevel")) {
                infoData.currentLevel = data.Schedule.attr.currentLevel;
            }
            if (data.Schedule.attr.status === "CANCELLING" || data.Schedule.attr.status.status === "CANCELED_BEFORE_START") {
                this.setState({ showOpenTableData: true })
            }

            this.setState({ TournamentRegisterStatus: data.Schedule.attr.status });

            infoData.data.TouroStatus = data.Schedule.attr.status;
            const registrationStart = UM.dateFormater(data.Schedule.attr?.registrationStart);
            const registrationFinish = UM.dateFormater(data.Schedule.attr?.registrationFinish);
            const tournamentStart = UM.dateFormater(data.Schedule.attr?.tournamentStart);
            const tournamentFinish = UM.dateFormater(data.Schedule.attr?.tournamentFinish);

            const remainingTime = this.getTournamentTimeInfo(data.Schedule.attr?.tournamentStart);
            let registerTime;
            if (typeof remainingTime === "string") {
                this.setState({ tournamentState: false });
            } else {
                this.setState({ tournamentState: true });
                registerTime = (remainingTime !== undefined ? `${remainingTime.minutes} minutes, ${remainingTime.seconds} seconds.` : "00:00");
            }
            const nextBreakStart = this.getTournamentTimeInfo(data.Schedule.attr.nextBreakStart);
            const nextLevelStart = this.getTournamentTimeInfo(data.Schedule.attr.nextLevelStart);
            let nextBreak = nextBreakStart.minutes === undefined ? 'Break' : `in ${Number(nextBreakStart.minutes) == 0 ? "< 1" : nextBreakStart.minutes} m`
            let nextLevel = nextLevelStart.minutes === undefined ? 'Break' : `in ${Number(nextLevelStart.minutes) == 0 ? "< 1" : nextLevelStart.minutes} m`
            this.setState({ nextBreakStartIn: nextBreak, nextLevelStartIn: nextLevel })

            switch (data.Schedule.attr.status) {
                case "CANCELED_BEFORE_START":
                    details.status = "Cancelled";
                    this.setState({ showRegisteredbtn: false, enableReEntry: false, joinTableBtn: false, watchTableBtn: false, tourneyStartText: "Started at", tourneyEndText: "Cancelled at", tourneyStartStatus: tournamentStart, tourneyEndStatus: tournamentFinish })
                    break;
                case "CANCELED_AFTER_START":
                    details.status = "Cancelled";
                    this.setState({ showRegisteredbtn: false, enableReEntry: false, joinTableBtn: false, watchTableBtn: false, tourneyStartText: "Started at", tourneyEndText: "Cancelled at", tourneyStartStatus: tournamentStart, tourneyEndStatus: tournamentFinish })
                    break;
                case "COMPLETED":
                    details.status = "Completed";
                    this.setState({ showRegisteredbtn: false, enableReEntry: false, joinTableBtn: false, watchTableBtn: false, tourneyStartText: "Started at", tourneyEndText: "Completed at", tourneyStartStatus: tournamentStart, tourneyEndStatus: tournamentFinish })
                    break;
                case "SEATING":
                    details.status = "Seating";
                    this.setState({ showSelectMoney: false, enableReEntry: false, showRegisteredbtn: false, tourneyStartText: "Started at", tourneyEndText: "", tourneyStartStatus: tournamentStart, tourneyEndStatus: "" })
                    break;
                case "REGISTERING":
                    details.status = "Registering";
                    this.setState({
                        showSelectMoney: true, showRegisteredbtn: true, tourneyStartText: this.state.details.type !== "SITANDGO_TOURNAMENT" ? "Registration will end" : "", tourneyEndText: this.state.details.type !== "SITANDGO_TOURNAMENT" ? "Tournament will start" : "", tourneyStartStatus: this.state.details.type !== "SITANDGO_TOURNAMENT" ? registrationFinish : "", tourneyEndStatus: this.state.details.type !== "SITANDGO_TOURNAMENT" ? `${tournamentStart} ${registerTime ? `(${registerTime})` : ""}` : ""
                    })
                    break;
                case "ANNOUNCED":
                    details.status = "Announced";
                    this.setState({ showSelectMoney: false, tourneyStartText: "Registration will start", tourneyEndText: "", tourneyStartStatus: registrationStart, tourneyEndStatus: "" })
                    break;
                case "LATE_REG":
                    details.status = "Late Registration";
                    this.setState({ showSelectMoney: this.state.regData.status === "Registered" ? (this.state.enableReEntry && (Number(this.state.reEntryTable.noOfRetries) <= Number(this.state.reEntryTable.maxRetryCount)) ? true : false) : true, showRegisteredbtn: true, tourneyStartText: "Started at", tourneyEndText: "", tourneyStartStatus: tournamentStart, tourneyEndStatus: "" })
                    break;
                case "RUNNING":
                    details.status = "Running";
                    this.setState({ showSelectMoney: false, showRegisteredbtn: true, tourneyStartText: "Started at", tourneyEndText: "", tourneyStartStatus: tournamentStart, tourneyEndStatus: "" })
                    break;
                default:
                    details.status = data.Schedule.attr.status;
                    break;
            }
        }
        if (data.Schedule.hasOwnProperty("Item")) {
            let i = 0,
                cnt = data.Schedule.Item.length;
            infoData.info = [];
            let boolean = this.addonpresent;
            for (i; i < cnt; i++) {

                if (data.Schedule.attr.hasOwnProperty("currentLevel")) {
                    if (data.Schedule.attr.hasOwnProperty("onBreak") && data.Schedule.attr?.onBreak === "true") {
                        if (data.Schedule.attr.currentLevel === data.Schedule.Item[i - 1]?.attr?.number) {
                            infoData.currentLevelIndex = i;
                            Emitter.emit("tableOnBreak", this.state.openTables);
                        }
                    } else {
                        if (data.Schedule.attr.currentLevel === data.Schedule.Item[i].attr.number) {
                            infoData.currentLevelIndex = i;
                        }
                    }
                }


                if (Number(data.Schedule.Item[i].attr.number) === Number(data.Schedule.attr.currentLevel)) {
                    let currentLevel = `${`${UM.numberWithCommas(data.Schedule.Item[i].attr.lowStake)}/${UM.numberWithCommas(data.Schedule.Item[i].attr.highStake)}`} ${data.Schedule.Item[i].attr.hasOwnProperty("ante") ? "+" + data.Schedule.Item[i].attr.ante : ""} `
                    this.setState({ myLevelWithStacks: currentLevel });
                }
                if (Number(data.Schedule.Item[i].attr.number) === (Number(data.Schedule.attr.currentLevel) + 1)) {
                    let nextLevel = `${`${UM.numberWithCommas(data.Schedule.Item[i].attr.lowStake)}/${UM.numberWithCommas(data.Schedule.Item[i].attr.highStake)}`} ${data.Schedule.Item[i].attr.hasOwnProperty("ante") ? "+" + data.Schedule.Item[i].attr.ante : ""} `
                    this.setState({ myNextLevelWithStacks: nextLevel });
                }
                if (data.Schedule.Item[i].attr.type === "LEVEL") {
                    let time = (Number(data.Schedule.Item[i].attr.periodTo) - Number(data.Schedule.Item[i].attr.periodFrom)) / 1000 / 60;
                    infoData.info.push({
                        level: <div className="tourney_info_level">
                            <span>{data.Schedule.Item[i].attr.number}{". "} {`${UM.numberWithCommas(data.Schedule.Item[i].attr.lowStake)} /${UM.numberWithCommas(data.Schedule.Item[i].attr.highStake)}`} {data.Schedule.Item[i].attr.hasOwnProperty("ante") ? "+" + data.Schedule.Item[i].attr.ante : ""}</span >
                        </div >,
                        stakes:
                            <div className="tourney_info_level">
                                <span>{`${time}m`}</span>
                            </div>

                    })
                } else {
                    let time = (Number(data.Schedule.Item[i].attr.periodTo) - Number(data.Schedule.Item[i].attr.periodFrom)) / 1000 / 60;
                    infoData.info.push({
                        level: <div className="tourney_info_level" style={{ color: '#ffff' }}>
                            <span>{boolean ? "Add on Break" : "Break"}</span>
                        </div>,
                        stakes: <div className="tourney_info_level" style={{ color: '#ffff' }}>
                            <span>{`${time}m`}</span>
                        </div>,
                    });
                    boolean = false;
                }
            }
        }
        this.setState({ details: details, infoData: infoData })
    }

    onGetError(data) {
        if (data.Error.hasOwnProperty("attr")) {
            if (data.Error.attr.hasOwnProperty("code")) {
                switch (data.Error.attr.code) {
                    case "010":
                        this.setState({ regAlert: "You don't have enough money to register" });
                        break;
                    case "005":
                        this.setState({ regAlert: "The tournament is not in registration status now" });
                        break;
                    default:
                        break;
                }
            }
        }
    }

    getGameType(game) {
        let gameType = "";
        switch (game) {
            case "TEXAS_HOLDEM_LIMIT":
                gameType = "FL Hold'em";
                break;
            case "TEXAS_HOLDEM_NO_LIMIT":
                gameType = "NL Hold'em";
                break;
            case "TEXAS_HOLDEM_POT_LIMIT":
                gameType = "PL Hold'em";
                break;
            case "OMAHA_LIMIT":
                gameType = "FL Omaha";
                break;
            case "OMAHA_NO_LIMIT":
                gameType = "NL Omaha";
                break;
            case "OMAHA_POT_LIMIT":
                gameType = "PL Omaha";
                break;
            case "OMAHA_FIVE_CARDS_LIMIT":
                gameType = "FL Omaha 5card";
                break;
            case "OMAHA_FIVE_CARDS_NO_LIMIT":
                gameType = "NL Omaha 5card";
                break;
            case "OMAHA_FIVE_CARDS_POT_LIMIT":
                gameType = "PL Omaha 5card";
                break;
            case "OMAHA_SIX_CARDS_LIMIT":
                gameType = "FL Omaha 6card";
                break;
            case "OMAHA_SIX_CARDS_NO_LIMIT":
                gameType = "NL Omaha 6card";
                break;
            case "OMAHA_SIX_CARDS_POT_LIMIT":
                gameType = "PL Omaha 6card";
                break;
            case "OMAHA_HIGH_LOW_NO_LIMIT":
                gameType = "NL Omaha Hi-Lo";
                break;
            case "OMAHA_HIGH_LOW_POT_LIMIT":
                gameType = "PL Omaha Hi-Lo";
                break;
            case "OMAHA_HIGH_LOW_LIMIT":
                gameType = "FL Omaha Hi-Lo";
                break;
            default:
                gameType = "Not In List";
                console.log("game type is:.. " + game);
                break;
        }
        return gameType;
    }
    GETlIMITEXT(game) {
        let gameType = "";
        switch (game) {
            case "NO_LIMIT":
                gameType = "No Limit ";
                break;
            case "POT_LIMIT":
                gameType = "Pot Limit ";
                break;
            case "LIMIT":
                gameType = "Limit ";
                break;
            case "OMAHA_LIMIT":
                gameType = "FL Omaha";
                break;
            case "OMAHA_NO_LIMIT":
                gameType = "NL Omaha";
                break;
            case "OMAHA_POT_LIMIT":
                gameType = "PL Omaha";
                break;
            case "OMAHA_FIVE_CARDS_LIMIT":
                gameType = "FL Omaha 5card";
                break;
            case "OMAHA_FIVE_CARDS_NO_LIMIT":
                gameType = "NL Omaha 5card";
                break;
            case "OMAHA_FIVE_CARDS_POT_LIMIT":
                gameType = "PL Omaha 5card";
                break;
            case "OMAHA_SIX_CARDS_LIMIT":
                gameType = "FL Omaha 6card";
                break;
            case "OMAHA_SIX_CARDS_NO_LIMIT":
                gameType = "NL Omaha 6card";
                break;
            case "OMAHA_SIX_CARDS_POT_LIMIT":
                gameType = "PL Omaha 6card";
                break;
            case "OMAHA_HIGH_LOW_NO_LIMIT":
                gameType = "NL Omaha Hi-Lo";
                break;
            case "OMAHA_HIGH_LOW_POT_LIMIT":
                gameType = "PL Omaha Hi-Lo";
                break;
            case "OMAHA_HIGH_LOW_LIMIT":
                gameType = "FL Omaha Hi-Lo";
                break;
            default:
                gameType = "Not In List";
                console.log("game type is:.. " + game);
                break;
        }
        return gameType;
    }

    setPopUpActionsOpen(action) {
        switch (action) {
            case "REG":
                // this._tourneyNetwork.send("<GetTournamentDetails/>");
                this.refreshTables();
                this.setState({ showRegistration: true, BgOpacity: 0.2, regAlert: "" });
                break;
            case "INFO":
                this.setState({ showInfo: true, BgOpacity: 0.2 });
                break;
            case "UNREG":
                this.setState({ showUnRegistration: true });
                setTimeout(() => {
                    this.setState({ showUnRegistration: false });
                    this.setState({ BgOpacity: 1 });
                }, 4000);
                break;
            case "closeTourneyLobby":
                this._tourneyNetwork.send("<CloseTournamentLobby/>");
                this._tourneyNetwork.close(false);
                this.first = true;
                break;
            default:
                break;
        }
    }
    setPopUpActionsClose(action) {
        this.setState({ BgOpacity: 1 });
        switch (action) {
            case "REG":
                this._tourneyNetwork.send("<GetPlayerInfo/>");
                this.setState({ showRegistration: false, regAlert: "" });
                break;
            case "INFO":
                this._tourneyNetwork.send("<GetPlayerInfo/>");
                this.setState({ showInfo: false });
                break;
            case "UNREG":
                this._tourneyNetwork.send("<GetPlayerInfo/>");
                this.setState({ showUnRegistration: false });
                break;
            default:
                break;
        }
    }

    onGetOpenTournamentTable(data) {
        console.log("onGetOpenTournamentTable  ", data);
        console.log(this.tourneyData);

        if (this.state.regData.status === "Registered") {
            this.setState({ joinTableBtn: true });
        }
        // this.props.TourneyHandler("closeTourneyLobby");
        this.setState({ showBtnLoader: true });

        setTimeout(() => {
            this._tourneyNetwork.send(`<GetTables/>`);
            this.props.TourneyHandler("openTourneyTable", { tourney_table_id: data?.OpenTournamentTable?.attr?.id ?? null, id: this.tourneyData.tourneyId });
            this.setState({ showRegistration: false, showInfo: false, BgOpacity: 1, showLoader: false });
            setTimeout(() => {
                // this._tourneyNetwork.send("<GetTournamentDetails/>");
                this.refreshTables();
            }, 1000);
        }, 2000)
    }
    onGetConnectionReplaced() {
        alert("connection replaced ...!")
    }

    clearTourneyLobby(tourneyId) {
        console.log("clearing tourneylobby ");
        setTimeout(() => {
            this.setState({ activeDropdown: null });
            this.props.TourneyHandler("closeTourneyLobby", { id: tourneyId });
        }, 1500);


        this.setState({
            infoData: {
                data: {
                    startingChips: "-",
                    blinds: "-",
                    rebuys: "",
                    addons: "",
                    text1: "",
                    text2: "",
                    text3: "",
                    minPlayers: 0,
                    maxPlayers: 0,
                    TouroStatus: ""
                },
                info: [],
                currentLevel: undefined,
                currentLevelIndex: undefined
            }
        })
    }

    UpadateTableId() {
        console.log(this.props.idTables);
        this.setState({ gameTableid: this.props.idTables });
    }

    closeLeftMenu = () => {
        const sideMenu = document.getElementById("tourney_side_menu");
        const menu = document.getElementById("tourney_left_menu");
        const menuImg = document.getElementById("tourney_left_menu_img");
        const cover = document.getElementById("tourney_lobby_filter");

        sideMenu.style.cssText = "";
        menu.style.left = "-438px";
        menuImg.style.left = "-424px";
        cover.style.width = "0%";
    };

    showLeftMenu = () => {
        const sideMenu = document.getElementById("tourney_side_menu");
        const menu = document.getElementById("tourney_left_menu");
        const menuImg = document.getElementById("tourney_left_menu_img");
        const cover = document.getElementById("tourney_lobby_filter");

        const isMenuHidden = menu.style.left === "" || menu.style.left === "-438px";

        if (isMenuHidden) {
            menu.style.left = "0px";
            menuImg.style.left = "-12px";
            cover.style.width = "100%";

            sideMenu.style.cssText = `
                float: left;
                width: 100%;
                height: 100%;
                position: absolute;
                z-index: 9;
            `;
            console.log("Menu shown");
        } else {
            this.closeLeftMenu();
            console.log("Menu hidden");
        }
    };


    onClickButtons = (e) => {
        this.setState({ tourneyCheckBox: false, compointCheckBox: false, ticketsCheckBox: false, balanceCheckBox: false, btnloader: true });
        switch (e.target.value) {
            case "Register":
                this.setState({ showSelectMoney: false, isMe: false });
                this._tourneyNetwork.send(`<RegisterTournamentPlayer type='${this.state.selectAmountType}' tournamentId='${this.state.regData.id}' />`);
                break;
            case "Unregister":
                this.setState({ registerBtnState: true });
                this._tourneyNetwork.send(`<UnRegisterTournamentPlayer type='${this.state.selectAmountType}' tournamentId='${this.state.regData.id}'/>`);
                break;
            case "Join_Table":
                if (!this.state.joinTableBtn) {
                    // this.props.TourneyHandler("hideMiniTableTab", true);
                    if (this.state.openTableId) {
                        this.setState({ joinTableBtn: true, showLoader: true });
                        this._tourneyNetwork.send(`<OpenTable id="${this.state.openTableId}" type="${this.state.openTables[0].type}"/>`);
                        this.props.toggleCashTourneyTables("", 'minicards', "");
                    }
                } else {
                    if (this.props.idTables.indexOf(this.state.openTableId) != -1) {
                        this.props.toggleCashTourneyTables("", 'c-tables', this.state.openTableId);
                    } else {
                        // this.props.TourneyHandler("hideMiniTableTab", true);
                        this.setState({ joinTableBtn: true, showLoader: true });
                        this._tourneyNetwork.send(`<OpenTable id="${this.state.openTableId}" type="${this.state.openTables[0].type}"/>`);
                    }
                }
                break;
            case "Watch_Table":
                console.log(this.state.openTables[0].id);
                console.log(!this.state.watchTableBtn);
                if (!this.state.watchTableBtn) {
                    // this.props.TourneyHandler("hideMiniTableTab", true);
                    this.setState({ watchTableBtn: true, showLoader: true });
                    this._tourneyNetwork.send(`<OpenTable id="${this.state.selectedTableId ? this.state.selectedTableId : this.state.openTables[0].id}" type="${this.state.openTables[0].type}"/>`);
                } else {
                    if (this.props.idTables.indexOf(this.state.openTableId) != -1) {
                        this.props.toggleCashTourneyTables("", 'c-tables', (this.state.selectedTableId ? this.state.selectedTableId : this.state.openTables[0].id));
                    } else {
                        // this.props.TourneyHandler("hideMiniTableTab", true);
                        this.setState({ watchTableBtn: true, showLoader: true });
                        this._tourneyNetwork.send(`<OpenTable id="${this.state.selectedTableId ? this.state.selectedTableId : this.state.openTables[0].id}" type="${this.state.openTables[0].type}"/>`);
                    }
                }
                break;
            default:
                // console.log(e.target.value);
                break;
        }
        setTimeout(() => {
            this.setState({ btnloader: false });
        }, 2000);
    };

    // showTourneyMenu = (e) => {
    //     let top_tab1 = document.getElementById("game_info");
    //     let top_tab2 = document.getElementById("game_tables");
    //     let top_tab3 = document.getElementById("game_players");

    //     let afterContent = window.getComputedStyle(top_tab1, "::after").getPropertyValue("content");
    //     let afterContent1 = window.getComputedStyle(top_tab2, "::after").getPropertyValue("content");
    //     let afterContent2 = window.getComputedStyle(top_tab3, "::after").getPropertyValue("content");

    //     if (
    //         (afterContent && afterContent !== 'none' && afterContent !== '""') ||
    //         (afterContent1 && afterContent1 !== 'none' && afterContent1 !== '""') ||
    //         (afterContent2 && afterContent2 !== 'none' && afterContent2 !== '""')
    //     ) {
    //         this.setState({ optionsOpened: true });
    //     } else {
    //         this.setState({ optionsOpened: false });
    //     }

    //     this.setState({ leftMenu: e.target.id });
    //     if (e.target.id === "game_tables") {
    //         this._tourneyNetwork.send(`<GetTables/>`)
    //     } else if (e.target.id === "game_players") {
    //         this._tourneyNetwork.send(`<GetPlayers/>`)
    //     }
    // }

    showTourneyMenu = (e) => {
        let top_tab1 = document.getElementById("game_info");
        let top_tab2 = document.getElementById("game_tables");
        let top_tab3 = document.getElementById("game_players");

        // Initialize variables outside the if blocks to avoid scope issues
        let afterContent = null;
        let afterContent1 = null;
        let afterContent2 = null;

        if (top_tab1) {
            afterContent = window.getComputedStyle(top_tab1, "::after").getPropertyValue("content");
        }
        if (top_tab2) {
            afterContent1 = window.getComputedStyle(top_tab2, "::after").getPropertyValue("content");
        }
        if (top_tab3) {
            afterContent2 = window.getComputedStyle(top_tab3, "::after").getPropertyValue("content");
        }

        if (
            (afterContent && afterContent !== 'none' && afterContent !== '""') ||
            (afterContent1 && afterContent1 !== 'none' && afterContent1 !== '""') ||
            (afterContent2 && afterContent2 !== 'none' && afterContent2 !== '""')
        ) {
            this.setState({ optionsOpened: true });
        } else {
            this.setState({ optionsOpened: false });
        }

        this.setState({ leftMenu: e.target.id });
        if (e.target.id === "game_tables") {
            this._tourneyNetwork.send(`<GetTables/>`);
        } else if (e.target.id === "game_players") {
            this._tourneyNetwork.send(`<GetPlayers/>`);
        }
    };



    refreshTables = () => {
        this._tourneyNetwork.send("<GetTournamentDetails/>");
        this.setState({ loader: true, registerBtnState: true });
        setTimeout(() => {
            this.setState({ loader: false });
        }, 3000);
    }
    updateTableId(id) {
        console.log(id)
        if (id === this.state.openTableId) {
            this.setState({ selectedTableId: "" });
        } else {
            this.setState({ selectedTableId: id });
        }
    }
    closeTLobby() {
        this.clearTourneyLobby(this.state.regData.id)
        this._tourneyNetwork.send("<CloseTournamentLobby/>")
        this._tourneyNetwork.close(false);
        this.first = true;
    }

    getTypeLabel = (type) => {
        switch (type) {
            case "Balance":
                return "Real Money";
            case "Tickets":
                return "Ticket(s)";
            case "VIP Points":
                return "VIP Points";
            case "Tournament Money":
                return "Tournament Money";
            default:
                return "Unknown Type";
        }
    }

    isChecked = (type) => {
        switch (type) {
            case "Balance":
                return this.state.balanceCheckBox;
            case "Tickets":
                return this.state.ticketsCheckBox;
            case "VIP Points":
                return this.state.compointCheckBox;
            case "Tournament Money":
                return this.state.tourneyCheckBox;
            default:
                return false;
        }
    }
    selectAmount = (e, type) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            this.setState({ registerBtnState: false });
        } else {
            this.setState({ registerBtnState: true });
        }
        const typeToStateUpdate = {
            "Balance": { balanceCheckBox: isChecked, selectAmountType: "BALANCE", ticketsCheckBox: false, compointCheckBox: false, tourneyCheckBox: false },
            "Tickets": { ticketsCheckBox: isChecked, selectAmountType: "TICKET", balanceCheckBox: false, compointCheckBox: false, tourneyCheckBox: false },
            "VIP Points": { compointCheckBox: isChecked, selectAmountType: "COMP_POINTS", balanceCheckBox: false, ticketsCheckBox: false, tourneyCheckBox: false },
            "Tournament Money": { tourneyCheckBox: isChecked, selectAmountType: "TOURNAMENT_MONEY", balanceCheckBox: false, ticketsCheckBox: false, compointCheckBox: false }
        };

        if (typeToStateUpdate.hasOwnProperty(type)) {
            console.log(typeToStateUpdate[type]);
            this.setState(typeToStateUpdate[type]);
        } else {
            console.log("Unknown type:", type);
        }
    }

    toggleDropdown(id) {
        this.setState((prevState) => ({
            activeDropdown: prevState.activeDropdown === id ? null : id,
        }));
    }


    render() {
        const { activeDropdown } = this.state;
        return (
            <>

                {this.state.showLoader &&
                    <div className="popCover_1">
                        <Spinner />
                    </div>
                }
                <main className="tourney_lobby_container">
                    <div id="tourney_side_menu" onClick={(e) => this.closeLeftMenu(e)}></div>
                    <nav className="lobby-filter" id="tourney_lobby_filter" >
                        <div className="side-menu" style={{ left: '-20px' }} >
                            <div id="tourney_left_menu">
                                <div className="menu_header">
                                    <button type="button" id="game_info" className={this.state.leftMenu === "game_info" ? "active" : ""} onClick={(e) => this.showTourneyMenu(e)}>Info</button>
                                    <button type="button" id="tables" className={this.state.leftMenu === "tables" ? "active" : ""} onClick={(e) => this.showTourneyMenu(e)}>Tables</button>
                                    <button type="button" id="players" className={this.state.leftMenu === "players" ? "active" : ""} onClick={(e) => this.showTourneyMenu(e)}>Players</button>
                                </div>
                                <div className="menu_body" style={{ overflow: this.state.leftMenu === "game_info" ? "unset" : "" }}>
                                    {this.state.leftMenu === "game_info" ?
                                        <TournamentInfo data={this.state.infoData} prizeInfo={this.state.prizeInfo} reEntryTable={this.state.reEntryTable} close={this.setPopUpActionsClose.bind(this)}></TournamentInfo> :
                                        this.state.leftMenu === "tables" ?
                                            <OpenTables1 gameTableid={this.props.idTables} data={this.state.openTables} updateTableId={this.updateTableId.bind(this)} network={this._tourneyNetwork}></OpenTables1> :
                                            this.state.leftMenu === "players" &&
                                            <Participants data={this.state.participants} playerName={this.state.regData.name} network={this._tourneyNetwork} featear={false}></Participants>}
                                </div>
                            </div>
                            <img id="tourney_left_menu_img" style={{ left: '-424px' }} src={left_sidebar} alt="" onClick={(e) => this.showLeftMenu(e)} />
                        </div>
                    </nav>

                    <nav className="lobby-top-nav_header" style={{ left: '200px', right: '200px', position: 'absolute', top: '0px' }}>
                        <div className="menu_header" style={{ margin: 'auto', background: 'none' }}>
                            <div className="sec-center">
                                {/* <input
                                className="dropdown filterCheck_box_"
                                type="checkbox"
                                id="game_info"
                                name="game_info"
                                checked={activeDropdown === "game_info"}
                                readOnly
                                onChange={() => this.toggleDropdown("game_info")}
                            /> */}
                                <input
                                    className="dropdown filterCheck_box_"
                                    type="checkbox"
                                    id="game_info"
                                    name="game_info"
                                    checked={activeDropdown === "game_info"}
                                    onChange={() => this.toggleDropdown("game_info")}
                                />

                                <label
                                    className="for-dropdown clr_river"
                                    htmlFor="game_info"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(rgba(79, 79, 79, 0.79), rgba(0, 0, 0, 0.745))",
                                        zIndex: activeDropdown === "game_info" ? "9" : "",
                                        border: activeDropdown === "game_info" ? "1px solid rgb(254, 214, 38)" : "",
                                        color: activeDropdown === "game_info" ? "rgb(254, 214, 38)" : ""
                                    }}

                                    onClick={() => this.toggleDropdown(null)}
                                >
                                    Info
                                    <span className="uil uil-arrow-down emoji">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={activeDropdown === "game_info" ? "rgb(254, 214, 38)" : "#e8eaed"}>
                                            <path d="M417-834v466L215-570l-89 90 354 354 354-354-89-90-202 202v-466H417Z" />
                                        </svg>
                                        {/* ⮟ */}
                                        {/* &#11167; */}
                                    </span>
                                </label>
                                {activeDropdown === "game_info" && (
                                    <>
                                        <div className="popCover_1" style={{ zIndex: "1" }} onClick={() => this.toggleDropdown(null)}></div>
                                        <div className="section-dropdown for_tourneyLobby" style={{ width: "unset" }}>
                                            <TournamentInfo
                                                data={this.state.infoData}
                                                prizeInfo={this.state.prizeInfo}
                                                reEntryTable={this.state.reEntryTable}
                                                close={() => this.toggleDropdown(null)}
                                            ></TournamentInfo>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Tables Dropdown */}
                            <div className="sec-center">
                                <input
                                    className="dropdown filterCheck_box_"
                                    type="checkbox"
                                    id="game_tables"
                                    name="tables"
                                    checked={activeDropdown === "game_tables"}
                                    onChange={() => this.toggleDropdown("game_tables")}
                                />

                                <label
                                    className="for-dropdown clr_river"
                                    htmlFor="game_tables"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(rgba(79, 79, 79, 0.79), rgba(0, 0, 0, 0.747))",
                                        zIndex: activeDropdown === "game_tables" ? "9" : "",
                                        border: activeDropdown === "game_tables" ? "1px solid rgb(254, 214, 38)" : "",
                                        color: activeDropdown === "game_tables" ? "rgb(254, 214, 38)" : ""
                                    }}
                                >
                                    Tables
                                    <span className="uil uil-arrow-down emoji">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={activeDropdown === "game_tables" ? "rgb(254, 214, 38)" : "#e8eaed"}>
                                            <path d="M417-834v466L215-570l-89 90 354 354 354-354-89-90-202 202v-466H417Z" />
                                        </svg>
                                    </span>
                                </label>
                                {activeDropdown === "game_tables" && (
                                    <>
                                        <div className="popCover_1" style={{ zIndex: "1" }} onClick={() => this.toggleDropdown(null)}></div>
                                        <div className="section-dropdown for_tourneyLobby">
                                            <OpenTables1
                                                // gameTableid={this.props.idTables}
                                                gameTableid={this.state.openTableId}
                                                data={this.state.openTables}
                                                updateTableId={this.updateTableId.bind(this)}
                                                network={this._tourneyNetwork}
                                            ></OpenTables1>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Players Dropdown */}
                            <div className="sec-center">
                                {/* <input
                                className="dropdown filterCheck_box_"
                                type="checkbox"
                                id="game_players"
                                name="players"
                                checked={activeDropdown === "game_players"}
                                readOnly
                                onClick={() => this.toggleDropdown("game_players")}
                            /> */}
                                <input
                                    className="dropdown filterCheck_box_"
                                    type="checkbox"
                                    id="game_players"
                                    name="players"
                                    checked={activeDropdown === "game_players"}
                                    onChange={() => this.toggleDropdown("game_players")}
                                />

                                <label
                                    className="for-dropdown clr_river"
                                    htmlFor="game_players"
                                    style={{
                                        background:
                                            "linear-gradient(rgba(79, 79, 79, 0.79), rgba(0, 0, 0, 0.747))",
                                        zIndex: activeDropdown === "game_players" ? "9" : "",
                                        border: activeDropdown === "game_players" ? "1px solid rgb(254, 214, 38)" : "",
                                        color: activeDropdown === "game_players" ? "rgb(254, 214, 38)" : ""
                                    }}
                                >
                                    Players
                                    <span className="uil uil-arrow-down emoji">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={activeDropdown === "game_players" ? "rgb(254, 214, 38)" : "#e8eaed"} >
                                            <path d="M417-834v466L215-570l-89 90 354 354 354-354-89-90-202 202v-466H417Z" />
                                        </svg>
                                        {/* ⮟ */}
                                        {/* &#11167; */}
                                    </span>
                                </label>
                                {activeDropdown === "game_players" && (
                                    <>
                                        <div className="popCover_1" style={{ zIndex: "1" }} onClick={() => this.toggleDropdown(null)}></div>
                                        <div className="section-dropdown for_tourneyLobby">
                                            <Participants
                                                data={this.state.participants}
                                                playerName={this.state.regData.name}
                                                network={this._tourneyNetwork}
                                                featear={false}
                                            ></Participants>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                    <nav className="lobby-top-nav" style={{ marginRight: '5px' }}>
                        <div className="time_display">
                            <b className="clr_river">{Math.trunc(this.date.getHours()).toString().padStart(2, '0')} : {Math.trunc(this.date.getMinutes()).toString().padStart(2, '0')}</b>
                        </div>
                        <div className="lobby_active_icon">
                            {!this.state.loader ?
                                <img src={img_8} className="pointer" alt="logo3" onClick={(e) => this.refreshTables(e)} />
                                : <div className="loader_table_div">
                                    <div className="loader_table"></div>
                                </div>}
                        </div>
                    </nav>

                    {/* {!this.state.tableLoded ? <Spinner /> : */}
                    {/* {this.state.tableLoded ? <Loader /> : */}
                    {this.state.tableLoded ? "" :
                        <div className="tourney_lobby_continer" style={{ position: 'relative', zIndex: this.state.optionsOpened ? '-1' : '' }}>
                            <section className="tourney_lobby_section">
                                <span style={{ textTransform: 'uppercase' }}>{this.state.info.name}</span>
                                <span>{this.state.details.field4} -  {this.state.info.mode}</span>
                            </section>
                            {/* <div className="df tourney-lobby-section-container"> */}
                            <section className="tourney_lobby_section_two">
                                <div className="left_section">
                                    {this.state.details.type !== "SITANDGO_TOURNAMENT" &&
                                        <>
                                            <span>{this.state.tourneyStartText}</span>
                                            <span>{this.state.tourneyEndText}</span>
                                        </>
                                    }
                                    <span>Status:</span>
                                    <span>Players:</span>
                                    <br />
                                    {((this.state.details.status === "Running" || this.state.details.status === "Late Registration") && this.state.regData.status === "Registered") &&
                                        <>
                                            <span>Next break: </span>
                                            <span>Level: </span>
                                            <span>Next level: </span>
                                            <span>Stakes: </span>
                                            <span>Your Rank: </span>
                                        </>
                                    }
                                    {this.state.reEntryTable.isTourneyRetry &&
                                        <span>
                                            Number of Re-Entries:
                                        </span>
                                    }
                                    <span className="m_t_20" style={{ display: this.state.details.description ? 'flex' : 'none' }}>
                                        Description:
                                        {/* <div className="df_al_jsb p_5 clr_river" style={{ textAlign: 'end', lineHeight: '30px' }} dangerouslySetInnerHTML={{ __html: this.state.details.description.replace(/\n/g, "<br>") }}></div> */}
                                    </span>
                                </div>
                                <div className="right_section">
                                    {this.state.details.type !== "SITANDGO_TOURNAMENT" &&
                                        <>
                                            <span>{this.state.tourneyStartStatus}</span>
                                            <span>{this.state.tourneyEndStatus}</span>
                                        </>
                                    }
                                    <span style={{ color: (this.state.details.status === "Cancelled" || this.state.details.status === "Completed") ? "rgb(255 63 63)" : this.state.details.status === "Running" ? "#b79301" : '#02d902' }}>{this.state.details.status} </span>
                                    {(this.state.details.status === "Running" || this.state.details.status === "Late Registration") && this.state.regData.status === "Registered" ?
                                        <span>{this.state.info.players} <span className="clr_river m_l_5"> (currently </span>{this.state.info.players}<span className="clr_river"> on </span>{this.state.openTables.length}<span className="clr_river"> tables)</span> </span> :
                                        <span>{this.state.info.players} of {this.state.info.max} <span className="clr_river"> (minimum {this.state.info.min})</span> </span>
                                    }
                                    <br />

                                    <section className="first-two-btns" style={{ display: (this.state.details.status === "Running" || this.state.details.status === "Late Registration") && this.state.regData.status === "Registered" ? 'flex' : 'none', textAlign: 'end' }}>
                                        <span> {this.state.nextBreakStartIn}</span>
                                        <span> {this.state.infoData.currentLevel} <span className="clr_river m_l_5"> ({this.state.myLevelWithStacks})</span></span>
                                        <span> {this.state.nextLevelStartIn}{", "} {Number(this.state.infoData.currentLevel) + 1} <span className="clr_river m_l_5">({this.state.myNextLevelWithStacks}) </span></span>
                                        <span><span className="clr_river"> largest: </span> {UM.numberWithCommas(this.state.largestStack)} <span className="clr_river m_l_5">  average: </span> {UM.numberWithCommas(this.state.averageStack)}<span className="clr_river m_l_5"> smallest:</span> {UM.numberWithCommas(this.state.lowestStack)}</span>
                                        <span>{this.state.myRank} of {this.state.prizeInfo.entries}</span>
                                    </section>

                                    {this.state.reEntryTable.isTourneyRetry &&
                                        <span>
                                            Max <span className="clr_river"> {this.state.reEntryTable.maxRetryCount} </span>, Tries <span className="clr_river"> {this.state.reEntryTable.noOfRetries} </span>
                                        </span>
                                    }
                                    <span className="clr_river m_t_20">
                                        <div className="df_al_jsb p_5" style={{ textAlign: 'end', lineHeight: '30px' }} dangerouslySetInnerHTML={{ __html: this.state.details.description.replace(/\n/g, "<br>") }}></div>
                                    </span>
                                </div>
                            </section>

                            {this.state.showRegisteredbtn &&
                                <>
                                    <section className="tourney_buy_section" >
                                        <div className="tourney_buy_section_type" style={{ display: (this.state.showSelectMoney && this.state.regData.status !== "Registered") ? "block" : "none" }}>
                                            {this.state.regData.types.map((type, index) => (
                                                <div className="df_al_jsb" key={index}>
                                                    <span className="df">{this.getTypeLabel(type.type)}: <span className="clr_river_green">{type.amount}</span></span>
                                                    <span className="df" style={{ color: !type.enable ? "#ffffff73" : "#fff" }}>
                                                        {type.buyAmount}
                                                        <input
                                                            type="checkbox"
                                                            value={type.type}
                                                            name="payMethod"
                                                            disabled={!type.enable}
                                                            checked={type.enable ? this.isChecked(type.type) : false}
                                                            onChange={(e) => this.selectAmount(e, type.type)}
                                                        />

                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="tourney-lobby-buttons-container">
                                            <>
                                                {this.state.TournamentRegisterStatus === "REGISTERING" && (
                                                    // this.state.isTourneyRegistered ?
                                                    (this.state.showSelectMoney && this.state.regData.status !== "Registered") ?
                                                        (<button type="submit" className="close_btn" value={"Register"} onClick={this.onClickButtons} disabled={this.state.registerBtnState}>
                                                            Register
                                                        </button>) :
                                                        (<button type="submit" className="close_btn" value={"Unregister"} onClick={this.onClickButtons}>
                                                            Unregister
                                                        </button>)
                                                )}

                                                {(this.state.TournamentRegisterStatus === "LATE_REG" || this.state.TournamentRegisterStatus === "RUNNING") && (
                                                    this.state.isTourneyRegistered && (this.state.selectedTableId === "") ? (
                                                        this.state.showBtnLoader ? (
                                                            <span className="m_l_5 loader_3"></span>
                                                        ) : (
                                                            <button type="submit" className="close_btn" value="Join_Table" onClick={this.onClickButtons}>
                                                                Join Table
                                                            </button>
                                                        )
                                                    ) : ((
                                                        this.state.showBtnLoader ? (
                                                            <span className="m_l_5 loader_3"></span>
                                                        ) :
                                                            (<button type="submit" className="close_btn" value="Watch_Table" onClick={this.onClickButtons}>
                                                                Watch Table
                                                            </button>)
                                                    )
                                                    )
                                                )}
                                                {/* {(this.state.TournamentRegisterStatus === "LATE_REG" || this.state.TournamentRegisterStatus === "RUNNING") && (
                                                        (this.state.isTourneyRegistered && this.state.selectedTableId !== "") && ((
                                                            this.state.showBtnLoader ? (
                                                                <span className="m_l_5 loader_3"></span>
                                                            ) :
                                                                (<button type="submit" className="close_btn" value="Watch_Table" onClick={this.onClickButtons}>
                                                                    Watch Table
                                                                </button>)
                                                        )
                                                        )
                                                    )} */}


                                                {(this.state.TournamentRegisterStatus === "LATE_REG" || this.state.TournamentRegisterStatus === "RUNNING") && (
                                                    (this.state.showSelectMoney && this.state.regData.status !== "Registered") && (
                                                        <button type="submit" className="close_btn" value="Register" onClick={this.onClickButtons} disabled={this.state.registerBtnState}>
                                                            Late Register
                                                        </button>
                                                    )
                                                )}

                                            </>
                                        </div>



                                        {/* <div className="fd" style={{ textAlign: 'end', padding: '0px 5px', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                                {(this.state.details.status === "Registering" && this.state.tournamentState) &&
                                                    <button type="submit" className="close_btn" value={this.state.regData.statusAction}
                                                        style={{
                                                            width: '30%', minWidth: "180px", maxWidth: "300px", border: !this.state.registerBtnState ? '1px solid #a98903a3' : '', borderRadius: '0px',
                                                            opacity: this.state.regData.statusAction === "Register" ? !this.state.registerBtnState ? '1' : '0.7' : '1',
                                                            color: this.state.regData.statusAction === "Register" ? !this.state.registerBtnState ? '#fff' : 'gray' : '#fff'
                                                        }}
                                                        disabled={this.state.regData.statusAction === "Register" ? this.state.registerBtnState : false}
                                                        onClick={this.onClickButtons}
                                                    >
                                                        {this.state.regData.statusAction}
                                                    </button>
                                                }

                                                {(!this.state.tournamentState) && (
                                                    this.state.regData.status === "Registered" && !this.state.isMe ? (
                                                        <button type="submit" className="close_btn" index="0" value="Join_Table"
                                                            style={{
                                                                width: '30%', minWidth: "180px", maxWidth: "300px", border: this.state.openTableId ? '1px solid #a98903a3' : '',
                                                                borderRadius: '0px', opacity: this.state.openTableId ? '1' : '0.7',
                                                                color: this.state.openTableId ? '#fff' : 'gray'
                                                            }}

                                                            onClick={this.onClickButtons} disabled={!this.state.openTableId && this.state.btnloader}>

                                                            {!this.state.openTableId ?
                                                                <span className="m_l_5 loader_3"></span> :
                                                                "Join Table"
                                                            }

                                                        </button>
                                                    ) : (
                                                        <>
                                                            <button type="submit" className="close_btn" index="0" value="Watch_Table"
                                                                style={{
                                                                    width: '30%', minWidth: "180px", maxWidth: "300px", border: !this.state.disableWatchBtn ? '1px solid #a98903a3' : '', borderRadius: '0px',
                                                                    opacity: !this.state.disableWatchBtn ? '1' : '0.7',
                                                                    color: !this.state.disableWatchBtn ? '#fff' : 'gray'
                                                                }}
                                                                onClick={this.onClickButtons} disabled={this.state.disableWatchBtn}>

                                                                {this.state.disableWatchBtn ?
                                                                    <span className="m_l_5 loader_3"></span> :
                                                                    "Watch Table"
                                                                }
                                                            </button>

                                                            {this.state.showSelectMoney &&
                                                                <button type="submit" className="close_btn" value={this.state.regData.statusAction}
                                                                    style={{
                                                                        width: '30%', minWidth: "180px", maxWidth: "300px", border: !this.state.registerBtnState ? '1px solid #a98903a3' : '', borderRadius: '0px',
                                                                        opacity: !this.state.registerBtnState ? '1' : '0.7',
                                                                        color: !this.state.registerBtnState ? '#fff' : 'gray',
                                                                        marginLeft: '20px'
                                                                    }}
                                                                    disabled={this.state.registerBtnState}
                                                                    onClick={this.onClickButtons}
                                                                >
                                                                    {this.state.regData.statusAction}
                                                                </button>
                                                            }
                                                        </>
                                                    )
                                                )}
                                            </div> */}
                                    </section>
                                </>
                            }
                            {/* </div> */}
                        </div>
                    }

                    {this.state.showAlert &&
                        <div className="game_type_filter_cover">
                            <div className="game_type_filter" style={{ width: '300px', border: 'none', display: 'flex', alignItems: 'center', padding: '10px', background: 'linear-gradient(rgb(144 136 130) 50%, rgb(100 97 90) 58%)', color: '#f9e083' }}>
                                <div className="">
                                    <img src={icon_calculator_enter} alt="" />
                                </div>
                                <div className="m_l_10 font_15">
                                    <span>{this.state.regAlert}</span>
                                </div>
                            </div>
                        </div>
                    }
                </main>
            </>
        );
    }
}
