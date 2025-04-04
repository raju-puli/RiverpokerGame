import TableBase from "./tableBase";
// import AlignGrid from "../../utils/alignGrid.js";

// import dIcon from "../../../assets/images/table/dealerIcon2.png";
// import screen from "../../../assets/images/table/screen.png";
import target from '../../../assets/images/table/target.png'
// import { FastLayer, Stage, Layer } from "react-konva";
import { Stage } from "react-konva";
import NewTable from "../../../assets/images/lobby/tableIcons/tableBg/NewTable.png";
// import NewTable1 from '../../../assets/images/table/tables/table4.png'
// import NewTable1 from '../../../assets/images/tableandcarpet/table_1.png'
import NewTable1 from '../../../assets/images/tableandcarpet/bg_table.png'
// import carpet from '../../../assets/images/tableandcarpet/carpet_1.png';
import river_carpet from '../../../assets/images/tableandcarpet/river_bg_old.png';
import { LeftMenu } from "../ui/table/leftMenu";
import { RightMenu } from "../ui/table/rightMenu";
import InfoPanel from "../ui/table/infoPanel/infoPanel";
import InfoPanelMobile from "../ui/table/infoPanel/infoPanelMobile.js";
import InfoPanelMobilePortrait from "../ui/table/infoPanel/infoPanelMobilePortrait.js";
import GameController from "../ui/table/gameController/gameController";
import GameControllerPortrait from "../ui/table/gameController/gameControllerPortrait.js";
import { Seats } from "../ui/table/seats";
import BoardCards from "../ui/table/boardCards/boardCards";
import RitBoardCards from "../ui/table/boardCards/ritBordCards";
// import Combination from "../ui/table/combination";
import { CountDownTimer } from "../ui/table/seat/cDtimer";
// import close_1 from '../../../../assets/images/table/close_1.svg';
import close_1 from '../../../assets/images/table/close_1.svg';
// import DateUtils from "../../utils/dateUtils.js";
// import { CountdownForce } from '../ui/popUps/timeforcebreaktimer'

import Chat from "../ui/table/chat.js";
// import Rebuy from "../ui/table/rebuy";


import table1 from '../../../assets/images/table/tables/tablePreview_1.png'
import table2 from '../../../assets/images/table/tables/tablePreview_2.png'
import table3 from '../../../assets/images/table/tables/tablePreview_3.png'
import table4 from '../../../assets/images/table/tables/tablePreview_4.png'
import table5 from '../../../assets/images/table/tables/tablePreview_5.png'

import Alert from "../ui/popUps/alert";
import ReconnectionAlert from '../ui/popUps/ReconnectionAlert.js'
import ExitAlert from "../ui/popUps/exitAlert";
import BreakAlert from "../ui/popUps/breakAlert";
import BuyChips from "../ui/popUps/buyChips";
import WaitForRebuy from "../ui/popUps/waitForRebuy";
import WaitRebuyAlert from "../ui/popUps/waitRebuyAlert";
import PrivateTableAlert from "../ui/popUps/privateTableAlert";
import TourneyPlayerRanking from "../ui/popUps/tourneyPlayerRanking";
import TourneyInfoBoard from "../ui/popUps/tourneyInfoBoard";
import Options from "../ui/popUps/settings/Options";
import ChipsRebuyAlert from "../ui/popUps/chipsRebuyAlert";
// import AddonAlert from "../ui/popUps/AddonAlert";
import InviteBuddies from "../ui/popUps/InviteBuddies";
import { Breaktime } from "../ui/table/sitandtournate";
import PrizePoolAlert from "../ui/popUps/PrizepoolAlert";
import ShowKnoutbustedAlert from "../ui/popUps/showKnoutbustedAlert";

import timerTick from "../../../assets/audio/timer.mp3";
import React from "react";
import UM from "../../utils/utilityMethods";
import Spinner from "../../utils/spinner";
import Bombpot from "../ui/popUps/bombpotAnimation";
import jackpot from '../../../assets/images/table/jackpot.png'
// import iconmutlitable from '../../../assets/images/table/IconmuttiTable.svg'
// import { t } from "i18next";
// import CountdownForce1 from "../ui/popUps/timeforcebreaktimer1.js";


import Screen from '../../utils/screen.js';
import fileName from "../../../jsconfig.js";
import Config from "../../../config.js";
import gsap from 'gsap';
import { getShowChatBalloon, getShowDealerMessage, getShowPlayerChat } from "../../utils/global.js";
// import Loader from "../../utils/loader.js";
import TournamentRebuy from "../ui/table/TournamentRebuy.js";
import RebuyTournamentAlert from "../ui/popUps/RebuyTournamentAlert.js";
import CountdownTimer1 from "../../utils/CountdownTimer.js";

import Emitter from "../../utils/eventEmitter.js";
import eventEmitter from "../../utils/eventEmitter.js";
// import BbjLabel from "../ui/table/bbjLabel.js";
import FallingChips from "../ui/popUps/FallingChips.js";
// import { Layer } from "konva/types/Layer.js";

import "../../../css/ui/table/tableMain.css";

export default class TableMain extends TableBase {
    constructor(props) {
        super(props);

        // playerAvatarsList
        // this.sWidth = window.screen.width;
        // this.sHeight = window.screen.height;

        // this.tableWidth = (this.sWidth - 20) * 0.5;
        // this.tableHeight = (this.sHeight - 20) * 0.65;

        // this.stageWidth = 500;
        // this.stageHeight = 880;

        this.state = {
            mychips: 0,
            CheckRitBox: true,
            leaveTablebtn: false,
            loader: false,
            senderid: null,
            dragdetails: {
                index: null,
                name: '',

                senderidboolean: false
            },
            TournamentRebuy: {
                Rebuybtn: true,
                Popup: false,
                count: '-',
                cost: '-',
                fee: '-',
                chips: '-'
            },
            TournamentAlertData: {
                lineOne: '-',
                lineTwo: '-'

            },
            AddonBreak: { mins: 0, secs: 0 },
            showbigblind: {
                show: false,
                bigblindvalue: 0,
            },
            senderidboolean1: false,
            showAniStage: false,
            knoutdetailsboolean: false,
            textvariable: false,
            manualPrizePoolshwow: false,
            manualDistributionType: "-",
            callRitOnce: false,
            callRitTwice: false,
            rittwicestatus: false,
            reSeatingPop: false,
            // showScreenRotationIndicater: false,
            showRitBox: false,
            showAddonAlert: false,
            gameStateIsUpdated: false,
            tournamentIsOnBreak: false,
            isTimeForcedPaused: false,
            isTimeForcedPaused1: false,
            changetourno_sitandgo: true,
            timeForced: { isTimeForcedPaused: false, force_duration: 0 },
            bombpotanimation: false,
            settingsAddonNrebuy: false,
            chat_is_focused: false,
            leftmenu: false,
            //knock_Table: false,
            welcomeText: "",
            showChatBox: false,
            mySeatId: "",
            tableLoded: false,
            usdTable: false,
            nexthand: "",
            nexthand_t: "",
            nexthandshow: true,
            nexthandshow_t: true,
            resizeScreen: true,
            playersCountforJoinWait: 0,

            nametextdealerid: "",
            addonsetting: "show",
            addrebuysetting: undefined,
            originSeat: null,
            showTimerBreak: false,
            checkTableBrekMsg: false,
            BgState: {
                opacity: 1,
                background: "#000",
                tableimage: NewTable
            },
            BgState1: {
                opacity: 1,
                // background: "#000",
                // tableimage: NewTable,
                backgroundImage: `url(${river_carpet})`,
                backgroundRepeat: "round"
            },
            seatCnt: 0,
            seats: {
                Seat: [
                    {
                        name: "",
                    },
                    {
                        name: "",
                    },
                    {
                        name: "",
                    },
                    {
                        name: "",
                    },
                    {
                        name: "",
                    },
                    {
                        name: "",
                    },
                    {
                        name: "",
                    },
                    {
                        name: "",
                    },
                    {
                        name: "",
                    },
                    {
                        name: "",
                    },
                ],
                cnt: 0,
            },

            timer: [
                { show: false, value: 0 },
                { show: false, value: 0 },
                { show: false, value: 0 },
                { show: false, value: 0 },
                { show: false, value: 0 },
                { show: false, value: 0 },
                { show: false, value: 0 },
                { show: false, value: 0 },
                { show: false, value: 0 },
                { show: false, value: 0 },
            ],

            combinationStyle: "21vh",
            dealerSeat: "-1",
            // boardCardPositions: Screen.getDeviceType().boardCardPositions,
            // boardCardXSpace: Screen.getDeviceType().boardCardXSpace,
            // ritBoardCardPositions: Screen.getDeviceType().ritBoardCardPositions,
            boardCardPositions: {
                width: 53,
                height: 73,
                top: 295,
                cardScale: 0.7,
            },
            JackpotPayout: { HAND_WINNER: false, BAD_BEAT: false, amount: 0 },
            boardCardXSpace: 38,
            ritBoardCardPositions: {
                width: "190px",
                height: "63px",
                top: "335px",
                cardScale: 0.7,
            },
            ritFlop: {
                cardOne: "",
                cardTwo: "",
                cardThree: "",
                cardTurn: "",
                cardRiver: "",
            },
            infoChat: "",
            tipInfo: {
                name: "-",
                type: "-",
                stakes: "-",
                LH: "-",
                CH: "-",
            },
            tipStats: {},
            winStrength: "",
            showcombpercent: false,
            waitList: {
                present: "-",
                list: [],
            },
            showTipStats: false,
            disableJW: true,
            btns: {
                disableJoinBtn: false,
                disableRemovBtn: true,
            },
            showInfoPanel: false,
            playerCombination: "",
            balance: { available: 0, min: 0, max: 0, time: 0, runTimer: false },
            reserveAmount: "",
            options: {
                action: [],
                quickAction: [],
                showQuickBets: false,
                cnt: 0,
                time: "",
                seatId: "",
                showSlider: false,
                show2x: false,
                show3x: false,
                show1by3: false,
                show1by2: false,
                show2by3: false,
                showpot: false,
                value2x: null,
                value3x: null,
                value1by3: null,
                value1by2: null,
                value2by3: null,
                valuepot: null,
                showFold: false,
                showCheck: false,
                showBet: false,
                showCall: false,
                showRaise: false,
                showgamecontr: "-",
                RunITTwice: true,
                rangeMin: 0,
                rangeMax: 0,
                showChecks: true,
                bigblindValue: ""
            },
            showCheckBox: "none",
            settingAccess: true,
            showTournamentRebuy: false,
            showTournamentAlert: false,
            showCheckAlert: false,
            showCheckAlertCount: true,
            cDtimer: { show: false, value: 0, per: 0.25, tb: 0 },
            showBuyChips: false,
            showWaitForRebuy: false,
            showChipsRebuyAlert: false,
            chipsRebuyAlertData: {
                lineOne: "",
                lineTwo: "Keep Playing 👍",
            },
            knoutdetails: {},
            addonData: "",
            waitForRebuy: {
                time: 30000,
                name: "",
                chips: "",
                cost: "",
                count: "",
            },
            waitRebuyAlert: {
                show: false,
                time: "",
                name: "",
            },
            showAlert: false,
            ReconnectionAlert: false,
            showBreakAlert: false,
            alert: {
                lineOne: "",
                lineTwo: "",
            },
            infopanelalert: {
                lineOne: "",
                lineTwo: "",
            },
            breakalert: {
                lineOne: "",
                timeTwo: null,
                timeOne: null,
            },
            showPvtTableAlert: false,
            privateTableAlertText: "",
            showTplayerRankAlert: false,
            showKnoutbustedAlert: false,
            tplayerRankAlert: {
                lineOne: "",
                lineTwo: "",
                time: null,
            },
            tshowKnoutbustedAlert: {
                lineOne: "",
                lineTwo: "",
            },
            showInvitePlayer: false,
            showExitAlert: false,
            buddyData: [],
            tableData: {},
            onMoneyExchangeInfo: {},
            showTourneyInfoBoard: false,
            isTournamentTable: false,
            tourneyInfoBoard: {
                cLevel: "10",
                cStakes: "10000/20000",
                nLevel: "10",
                nStakes: "100/200",
                breakTime: "",
            },
            showOptions: false,
            showBBJ: false,
            bbj: 0,
            time: "00:00",
            // seatProperties: Screen.getDeviceType().seatProperties,
            cardStyle: Screen.getDeviceType().cardStyle,

            seatProperties: {
                width: 90,
                height: 12.5,
                profileRadius: 28,
                panelWidth: 130,
                panelHeight: 40,
                padddings: { x1: 13, y1: 18, x2: 19, y2: 6, x3: 12, y3: 6, x4: 16, y4: 18 },
                padddingsNew: { x1: 35, y1: -30.75, p1: 1.13, w1: 75, h1: 12.5, x2: 35, y2: -18.25, x3: 37.5, y3: -1.5, x4: 35, y4: -10.75, x5: 31, y5: -30.75, w5: 78, h5: 28, f5: 14, x6: 80, y6: -2.5, w: 45, h: 12.5, f6: 10 },
                // ------------Name-------------------------------------------------Chips-----------------leavel    Stars----------KOB------------------------action && Time Life----------------------timeforec-------------->
                cardScale: 0.65,
                cardY: 53,
                cardXpadding: 18,
                dealerAdjustment: 5,
                delaerSize: 15,
                blindsTextOne: "SB",
                blindsTextTwo: "BB",
            },
            // seatProperties: {
            //     width: 90,
            //     height: 12.5,
            //     profileRadius: 28,
            //     panelWidth: 130,
            //     panelHeight: 40,
            //     padddings: {
            //         x1: 13, y1: 18,
            //         x2: 19, y2: 6,
            //         x3: 12, y3: 6,
            //         x4: 16, y4: 18
            //     },
            //     padddingsNew: {
            //         x1: 35, y1: -30.75, w1: 75,
            //         x2: 35, y2: -18.25,
            //         x3: 37.5, y3: -1.5,
            //         x4: 35, y4: -10.75,
            //         x5: 31, y5: -30.75, w5: 78, h5: 28, f5: 14,
            //         x6: 80, y6: -2.5, w: 45, h: 12.5, f6: 10
            //     },
            //     // ------------Name-------------------------------------------------Chips-----------------leavel    Stars----------KOB------------------------action && Time Life----------------------timeforec-------------->
            //     cardScale: 0.65,
            //     cardY: 53,
            //     cardXpadding: 18,
            //     dealerAdjustment: 5,
            //     delaerSize: 15,
            //     blindsTextOne: "SB",
            //     blindsTextTwo: "BB",
            // },
            cardStyle: {
                frontCardStyle: "CardDefault",
                backCardStyle: [689, 0, 53, 73],
            },
            // stageWidth: 500,
            // stageHeight: 880,
            isGetingResponse: ""
        };
        this.config = new Config();
        this.Once_Call_buyIN_popup = true;
        this.BigBlindValue = ''
        this.CheckRitBox = null;
        this.player = { name: "", id: "" };
        this.players = {};
        this.activeSeatCount = 0;
        this.cards = [];
        this.playerCards = [];
        this.state_autoPost = false;
        this.state_autoMuck = false;
        this.timeForced = { isTimeForcedPaused: false, force_duration: 0 }
        this.timerTick = new Audio(timerTick);

        this.seatsRef = React.createRef();
        this.boardCardsRef = React.createRef();
        this.ritBoardCardsRef = React.createRef();
        this.myRef = React.createRef();
        this.timeforceRef = React.createRef();
        this.isTourney = false;

        this.changeOptionTournment = false;

        this.showTourneyInfoBoard = false;
        this.knock_Table = false;
        // this.stageWidth = 800;
        // this.stageHeight = 480;

        // the following are cleared on closeTable
        // this.activeSeatCount = 0;
        // this.isTourney = false;
        // this.players = {};
        // this.player = { name: "", id: "" };
        this.messagestyle = {
            position: 'absolute',
            // left: `calc(10% + ${(window.innerWidth-880)/2}px)`,
            top: `calc(50% - 45px)`,
            width: "100%",

            // You can add other styles here
        };
        this.TableType = '';
        this.watchstack = false;
        this.watchNickname = false;
        this.rearrangeSeat = false;
        Emitter.on("tableOnBreak", this.checkTableBrek.bind(this))
    }

    // leaveTableEmitMethod() {
    //     // this.setPopUpActions("hideTplayerAlert");
    //     console.log("asdffffffffffffffffffffffffffffffffffffjfljasdlkfffffffffffffffffffff");
    // }


    // componentDidMount() {
    //     this.cardsDataInterval = setInterval(() => {
    //         let tab = document.getElementById(this.tableId);
    //         if (tab !== null) {
    //             if (this.playerCards.length != 0) {
    //                 tab.innerHTML = this.getLastcards(this.playerCards);
    //             }
    //         }
    //     }, 1000);
    // }
    // componentWillUnmount() {
    //     clearInterval(this.cardsDataInterval);
    // }


    onGetTableDetails(data) {
        // console.log(data.TableDetails.attr.hasOwnProperty("type"))
        console.log(data);

        this.props.TableHandler("openCashTable");
        // if ((window.innerWidth > 769 && window.innerWidth < 992)) {
        //     this.setState({ showScreenRotationIndicater: true });
        // } else {
        //     this.setState({ showScreenRotationIndicater: false });
        // }
        if (data.TableDetails.attr.hasOwnProperty("type")) {
            this.TableType = data.TableDetails.attr.type
        };
        this.setState({ showAlert: false, tableLoded: true });
        if (data.TableDetails.hasOwnProperty("TournamentTable")) {

            this.changeOptionTournment = true
            this.isTourney = true;
            this.tableName = data.TableDetails.attr.name;
            this.tableId = data.TableDetails.attr.id;
            this.props.SaveIdmainlobby("add", data.TableDetails.attr.id)
            this.setState({ changetourno_sitandgo: false });

            this.setState({ settingsAddonNrebuy: false, showTipStats: true, isTournamentTable: true });
            // if (this.config.URL_Environment.TableFeatures.selected == "F2") {
            //     this.props.TourneyHandler("hideMiniTableTab", true);
            // }
            let seats = this.state.seats;
            if (data.TableDetails.TournamentTable.hasOwnProperty("Parameters")) {
                this.stakes = Number(data.TableDetails.TournamentTable.Parameters.attr.lowStake).toLocaleString("en-US") + "/" + Number(data.TableDetails.TournamentTable.Parameters.attr.highStake).toLocaleString("en-US");
                // this.setState({showbigblind:{bigblindvalue:Number(data.TableDetails.TournamentTable.Parameters.attr.highStake)}})
                this.BigBlindValue = Number(data.TableDetails.TournamentTable.Parameters.attr.highStake)
            }
            if (data.TableDetails.TournamentTable.hasOwnProperty("Seats")) {
                if (data.TableDetails.TournamentTable.Seats.hasOwnProperty("attr")) {
                    if (data.TableDetails.TournamentTable.Seats.attr.hasOwnProperty("number")) {
                        let cnt = data.TableDetails.TournamentTable.Seats.attr.number,
                            i = 0;
                        this.setState({ seatCnt: cnt });
                        if (data.TableDetails.TournamentTable.Seats.hasOwnProperty("Seat")) {
                            for (i; i < cnt; i++) {
                                if (data.TableDetails.TournamentTable.Seats.Seat[i].hasOwnProperty("PlayerInfo")) {
                                    seats.Seat[i].name = data.TableDetails.TournamentTable.Seats.Seat[i].PlayerInfo.attr.nickname;
                                    this.players[data.TableDetails.TournamentTable.Seats.Seat[i].PlayerInfo.attr.nickname] = i;
                                    if (data.TableDetails.TournamentTable.Seats.Seat[i].PlayerInfo.hasOwnProperty("attr")) {
                                        if (data.TableDetails.TournamentTable.Seats.Seat[i].PlayerInfo.attr.hasOwnProperty("knockOutFee")) {
                                            if (Number(data.TableDetails.TournamentTable.Seats.Seat[i].PlayerInfo.attr.knockOutFee) !== 0) {
                                                this.setState({ knock_Table: true })
                                                this.knock_Table = true
                                            } else {
                                                this.setState({ knock_Table: false })
                                                this.knock_Table = false
                                            }
                                        }
                                    }
                                } else {
                                    seats.Seat[i].name = "Take Seat";
                                }
                            }
                        }
                    }
                }
                this.setState({ seats: seats });
            }

            if (data.TableDetails.TournamentTable.hasOwnProperty("attr")) {
                if (data.TableDetails.TournamentTable.attr.hasOwnProperty("jackpot")) {
                    if (data.TableDetails.TournamentTable.attr.jackpot === "true") {
                        this.setState({ showBBJ: true });
                    }
                }
                if (data.TableDetails.TournamentTable.attr.hasOwnProperty("limit")) {
                    let type = data.TableDetails.TournamentTable.attr.game + "_" + data.TableDetails.TournamentTable.attr.limit;
                    this.gameType = UM.GameName(type);

                }
            }

            // // if this tourney table, change the lobby btn to T-Lobby
            // let tab = window.parent.document.getElementById("lobbyBtn");
            // console.log("the tab is: ", tab);

            // if (tab && tab.dataset.name == "lobby") {
            //     tab.dataset.name = "tLobby";
            //     //     tab.style.animation = "loadImgs 0.5s infinite";
            //     //     tab.style.background = "aqua";
            //     //     // let id = tab.id;
            //     tab.innerHTML = "T Lobby";
            // }
            this.showTourneyInfoBoard = true
        }

        if (data.TableDetails.hasOwnProperty("SingleTable")) {
            this.setState({ changetourno_sitandgo: true });
            this.changeOptionTournment = false;
            if (this.reconnectcount == 0) {
                this.rearrangeSeat = true;
            } else {
                this.rearrangeSeat = false;
            }
            if (data.TableDetails.SingleTable.attr.hasOwnProperty("noOfHandsToHidePlayerData")) {

                this.watchNickname = data.TableDetails.SingleTable.attr.noOfHandsToHidePlayerData != "0" ? true : false
            }
            if (data.TableDetails.SingleTable.attr.hasOwnProperty("noOfHandsToHidePlayerStack")) {
                this.watchstack = data.TableDetails.SingleTable.attr.noOfHandsToHidePlayerStack != "0" ? true : false
            }
            if (fileName.name === "Riverpoker") {
                if (data.TableDetails.SingleTable.attr.mode === "USD") {
                    this.setState({ usdTable: true });
                } else {
                    this.setState({ usdTable: false });
                }
            }
            this.tableName = data.TableDetails.attr.name;
            this.setState({ settingsAddonNrebuy: true });
            this.setState({ showTipStats: false });
            window.name = data.TableDetails.attr.id;
            this.tableId = data.TableDetails.attr.id;
            // this.props.SaveIdmainlobby("add",data.TableDetails.attr.id)

            let seats = this.state.seats;
            if (data.TableDetails.SingleTable.hasOwnProperty("Parameters")) {
                this.stakes = Number(data.TableDetails.SingleTable.Parameters.attr["stakes-low"]).toLocaleString("en-US") + "/" + Number(data.TableDetails.SingleTable.Parameters.attr["stakes-high"]).toLocaleString("en-US");
                // this.setState({showbigblind:{bigblindvalue:Number(data.TableDetails.SingleTable.Parameters.attr["stakes-high"])}})
                this.BigBlindValue = Number(data.TableDetails.SingleTable.Parameters.attr["stakes-high"])
                // console.log(data.TableDetails.SingleTable.Parameters.attr["stakes-high"])
            }
            if (data.TableDetails.SingleTable.hasOwnProperty("Seats")) {
                if (data.TableDetails.SingleTable.Seats.hasOwnProperty("attr")) {
                    if (data.TableDetails.SingleTable.Seats.attr.hasOwnProperty("number")) {
                        let cnt = data.TableDetails.SingleTable.Seats.attr.number,
                            i = 0;
                        this.setState({ seatCnt: cnt });
                        if (data.TableDetails.SingleTable.Seats.hasOwnProperty("Seat")) {
                            for (i; i < cnt; i++) {
                                if (data.TableDetails.SingleTable.Seats.Seat[i].hasOwnProperty("PlayerInfo")) {
                                    seats.Seat[i].name = data.TableDetails.SingleTable.Seats.Seat[i].PlayerInfo.attr.nickname;
                                    this.players[data.TableDetails.SingleTable.Seats.Seat[i].PlayerInfo.attr.nickname] = i;
                                } else {
                                    seats.Seat[i].name = "Take Seat";
                                }
                            }
                        }
                    }
                }
                this.setState({ seats: seats });
            }

            if (data.TableDetails.SingleTable.hasOwnProperty("attr")) {
                if (data.TableDetails.SingleTable.attr.hasOwnProperty("jackpot")) {
                    if (data.TableDetails.SingleTable.attr.jackpot === "true") {
                        this.setState({ showBBJ: true });
                    }
                }
                if (data.TableDetails.SingleTable.attr.hasOwnProperty("limit")) {
                    let type = data.TableDetails.SingleTable.attr.game + "_" + data.TableDetails.SingleTable.attr.limit;
                    this.gameType = UM.GameName(type);
                }
            }

            if (data.TableDetails.SingleTable.hasOwnProperty("Statistics")) {
                let tableData = {
                    name: this.tableName,
                    game: this.gameType,
                    stakes: this.stakes,
                    pf: data.TableDetails.SingleTable.Statistics.attr["players-per-2nd-round"],
                    tID: data.TableDetails.attr["id"],
                };
                this.setState({ tableData: tableData });
            }
            if (data.TableDetails.SingleTable.attr.hasOwnProperty("runTwice")) {
                this.setState({ showRitBox: true })
            } else {
                this.setState({ showRitBox: false })
            }
            this.showTourneyInfoBoard = false

        }

        if (data.TableDetails.hasOwnProperty("TournamentTable")) {
            let tab = document.getElementById(this.tableId);
            let type = data.TableDetails.TournamentTable.attr.game + "_" + data.TableDetails.TournamentTable.attr.limit;

            let playerCards = []
            for (let i = 0; i < UM.cardsLength(type); i++) {
                playerCards.push("xx");
            }

            try {
                if (tab != null) {
                    tab.innerHTML = this.getLastcards(playerCards);
                }
            } catch (e) { console.log(e) }
            this.playerCards = playerCards;

        } else {
            let tab = document.getElementById(this.tableId);
            let type = data.TableDetails.SingleTable.attr.game + "_" + data.TableDetails.SingleTable.attr.limit;

            let playerCards = [];
            for (let i = 0; i < UM.cardsLength(type); i++) {
                playerCards.push("xx");
            }

            try {
                if (tab != null) {
                    tab.innerHTML = this.getLastcards(playerCards);
                }
            } catch (e) { console.log(e) }
            this.playerCards = playerCards;

            // <===============================test-with-boardcards - start=============================>
            // this.getBackgroundTimer(30);

            // setTimeout(() => {
            //     let cards = "3c";
            //     for (let i = 0; i < 10; i++) {
            //         switch (i) {
            //             case 0:
            //                 this.boardCardsRef.current.addCards("flopZero", cards, 0);
            //                 break;
            //             case 1:
            //                 this.boardCardsRef.current.addCards("flopOne", cards, i * 150);
            //                 break;
            //             case 2:
            //                 this.boardCardsRef.current.addCards("flopTwo", cards, i * 150);
            //                 break;
            //             case 3:
            //                 this.boardCardsRef.current.addCards("turn", cards, i * 150);
            //                 break;
            //             case 4:
            //                 this.boardCardsRef.current.addCards("river", cards, i * 150);
            //                 break;
            //             case 5:
            //                 this.ritBoardCardsRef.current.addCards("flopZero", cards, i * 150);
            //                 break;
            //             case 6:
            //                 this.ritBoardCardsRef.current.addCards("flopOne", cards, i * 150);
            //                 break;
            //             case 7:
            //                 this.ritBoardCardsRef.current.addCards("flopTwo", cards, i * 150);
            //                 break;
            //             case 8:
            //                 this.ritBoardCardsRef.current.addCards("turn", cards, i * 150);
            //                 break;
            //             case 9:
            //                 this.ritBoardCardsRef.current.addCards("river", cards, i * 150);
            //                 break;
            //             case 10:
            //                 this.ritBoardCardsRef.current.addCards("river", cards, i * 150);
            //                 break;
            //             default:
            //                 break;
            //         }
            //     }
            // }, 1000);
            // <===============================test-with-boardcards- end=============================>
        }
    }
    joinWaitingListFunction(playerOnseat, seatsCount) {
        // console.log(playerOnseat, seatsCount, this.player.id)
        if (Number(playerOnseat) !== Number(seatsCount)) {
            this.setState({
                btns: {
                    disableJoinBtn: true,
                    disableRemovBtn: true
                }
            })

        } else {
            if (this.player.id != "") {
                this.setState({
                    btns: {
                        disableJoinBtn: true,
                        disableRemovBtn: true
                    }
                })
            } else {
                this.setState({
                    btns: {
                        disableJoinBtn: false,
                        disableRemovBtn: true
                    }
                })
            }
        }
    }


    // getPlayersAvatars(playerAvatar) {
    //     if (playerAvatar) {
    //         const lastThreeChars = playerAvatar.slice(-3);
    //         const totalAvatars = this.props.playerAvatarsList;

    //         for (const avatar of totalAvatars) {
    //             const avatarIdLastThreeChars = avatar.id.slice(-3);
    //             if (lastThreeChars === avatarIdLastThreeChars) {
    //                 return avatar.imageData;
    //             }
    //         }
    //     }
    //     return null;
    // }

    updateGamestate(data, timerSynchroniser) {
        // console.log("updateGamestate >>  ", data)

        if (!this.seatsRef.current) {
            setTimeout(() => {
                this.updateGamestate(data, timerSynchroniser);
            }, 1000);
            return;
        }
        this.timerSynchroniser = timerSynchroniser;
        this.setState({ playerCombination: "" });
        if (data.GameState.hasOwnProperty("attr")) {
            this.setState({ tipInfo: { name: this.tableName, type: this.gameType, stakes: this.stakes, CH: data.GameState.attr.hand } });
        }
        this.setState({ addonData: "" });
        let playersCount = 0;
        if (data.GameState.hasOwnProperty("Seats")) {
            this.seatsRef.current.CallTimeTableDetails(data.GameState.Seats, "updateGamestate");

            if (data.GameState.Seats.hasOwnProperty("attr")) {
                // let seats = this.state.seats;
                let cnt = data.GameState.Seats.attr.number
                // i = 0;
                if (data.GameState.Seats.attr.hasOwnProperty("me")) {
                    this.player.id = data.GameState.Seats.attr.me;
                    this.seatsRef.current.thisPlayerid(this.player.id);
                    this.player.name = data.GameState.Seats.Seat[this.player.id].PlayerInfo.attr.nickname;
                    this.setState({ mychips: data.GameState.Seats.Seat[this.player.id].PlayerInfo.Chips?.attr["stack-size"] })
                    var leavebtn;
                    if (data.GameState.Seats.Seat[this.player.id].attr.hasOwnProperty("timeLeft")) {
                        // console.log(data.GameState.Seats.Seat[this.player.id])
                        // leavebtn = data.GameState.Seats.Seat[this.player.id].attr.timeLeft == "-1" ? false : data.GameState.Seats.Seat[this.player.id].attr.timeLeft == "0" ? false : true;
                        // console.log(data.GameState.Seats.Seat[this.player.id].attr.isTimeForcedPaused)
                        // console.log(data.GameState.Seats.Seat[this.player.id].attr.timeLeft)
                        // console.log(data.GameState.Seats.Seat[this.player.id].PlayerInfo.attr.duration)
                        const isTimeForcedPaused = data.GameState.Seats.Seat[this.player.id].attr.isTimeForcedPaused;
                        const timeLeft = data.GameState.Seats.Seat[this.player.id].attr.timeLeft;
                        const duration = data.GameState.Seats.Seat[this.player.id].PlayerInfo.attr.duration;
                        // console.log(timeLeft)
                        // console.log(typeof timeLeft)
                        // console.log(typeof Number(timeLeft))
                        // leavebtn = (Number(this.state.activePlayers) > 1 ? (timeLeft == duration ? false : isTimeForcedPaused == 'false' ? Number(timeLeft) <= 0 ? false : true : Number(timeLeft) <= 0 ? false : true) : false)

                        // leavebtn = (Number(this.state.activePlayers) > 1 && (timeLeft == duration ? false : isTimeForcedPaused == 'false' ? (Number(timeLeft) <= 0 ? false : true) : false))
                        leavebtn = (timeLeft == duration ? false : isTimeForcedPaused == 'false' ? (Number(timeLeft) <= 0 ? false : true) : false)
                        // console.log("update gamestate timeforced conditon  ", leavebtn);
                    }
                    this.setState({ textvariable: true, leaveTablebtn: leavebtn, settingAccess: false });
                    if (data.GameState.Seats.Seat[this.player.id].PlayerInfo.attr.enableTwoX === "false") {
                        this.seatsRef.current.enableTwoX(false);
                        this.CheckRitBox = false;
                        this.setState({ CheckRitBox: false });
                    }
                    if (data.GameState.Seats.Seat[this.player.id].PlayerInfo.attr.enableTwoX === "true") {
                        this.seatsRef.current.enableTwoX(true);
                        this.setState({ CheckRitBox: true });
                        this.CheckRitBox = true;
                    }
                    this.setState({
                        btns: {
                            disableJoinBtn: true,
                            disableRemovBtn: true
                        }
                    })

                } else {
                    let playersCountforJoinWait = this.state.playersCountforJoinWait;
                    // console.log(playersCountforJoinWait)
                    if (Number(data.GameState.Seats.attr.number) === Number(playersCountforJoinWait)) {
                        // console.log(!this.state.btns.disableJoinBtn) // false
                        // console.log(this.state.btns.disableRemovBtn) // true
                        this.setState({
                            btns: {
                                disableJoinBtn: false,
                                disableRemovBtn: true
                            }
                        })
                    }
                    this.player.id = "";
                    this.player.name = "";
                    this.setState({ textvariable: false, settingAccess: true })
                }

                if (data.GameState.Seats.attr.hasOwnProperty("dealer")) {
                    this.setState({ dealerSeat: data.GameState.Seats.attr.dealer });
                    this.seatsRef.current.onDealer(cnt, data.GameState.Seats.attr.dealer);
                }
            }

            if (data.GameState.Seats.hasOwnProperty("Seat")) {

                let seats = this.state.seats;
                let cnt = data.GameState.Seats.attr.number,
                    i = 0;
                this.gameState_seat = [];
                for (i; i < cnt; i++) {
                    if (data.GameState.Seats.Seat[i].hasOwnProperty("Combination")) {
                        this.setState({ playerCombination: data.GameState.Seats.Seat[i].Combination.attr.strength });
                    }
                    // console.log(data.GameState.Seats.Seat[i])
                    if (data.GameState.Seats.Seat[i].hasOwnProperty("PlayerInfo")) {
                        playersCount += 1;
                        this.setState({ playersCountforJoinWait: playersCount })
                        this.joinWaitingListFunction(playersCount, cnt);

                        // const playerAvatar = data.GameState?.Seats?.Seat[i]?.PlayerInfo?.attr?.avatar;
                        // const avatar = this.getPlayersAvatars(playerAvatar);
                        console.log(data.GameState.Seats.Seat[i].PlayerInfo.attr.uuid)

                        this.gameState = {
                            name: (data.GameState.Seats.Seat[i].PlayerInfo.attr.hideName == "true" ? "????" : this.state.textvariable ? data.GameState.Seats.Seat[i].PlayerInfo.attr.nickname : this.watchNickname ? "????" : data.GameState.Seats.Seat[i].PlayerInfo.attr.nickname),
                            chips: (data.GameState.Seats.Seat[i].PlayerInfo.attr.hideStack == "true" ? "####" : this.state.textvariable ? data.GameState.Seats.Seat[i].PlayerInfo.hasOwnProperty("Chips") ? data.GameState.Seats.Seat[i].PlayerInfo.Chips.attr["stack-size"] : 0 : this.watchstack ? "####" : data.GameState.Seats.Seat[i].PlayerInfo.hasOwnProperty("Chips") ? data.GameState.Seats.Seat[i].PlayerInfo.Chips.attr["stack-size"] : 0),
                            status: "takenActive",
                            seat: i,
                            action: "",
                            knockoutBounty: "KOB  " + ((Number(data.GameState.Seats.Seat[i].PlayerInfo.attr.knockOutFee)) + Number(data.GameState.Seats.Seat[i].PlayerInfo.attr.knockOutAmount)),
                            enableTwoX: (data.GameState.Seats.Seat[i].PlayerInfo.attr.enableTwoX === "true" ? true : false),
                            NoofBB: data.GameState.Seats.Seat[i].attr.hasOwnProperty("noOfBB") ? data.GameState.Seats.Seat[i].attr.noOfBB : "",
                            me: this.player,
                            level: Number(data.GameState.Seats.Seat[i].PlayerInfo.attr.level),
                            avatar: data.GameState.Seats.Seat[i].PlayerInfo.attr.hasOwnProperty("avatar") ? data.GameState.Seats.Seat[i].PlayerInfo.attr.avatar : "",
                            uuid: data.GameState.Seats.Seat[i].PlayerInfo.attr.uuid
                        }

                        // this.setState({ rittwicestatus: data.GameState.Seats.Seat[i].PlayerInfo.attr.enableTwoX === "true" ? true : false })
                        if (data.GameState.Seats.Seat[i].PlayerInfo.hasOwnProperty("Chips")) {
                            if (data.GameState.Seats.Seat[i].PlayerInfo.Chips.attr.hasOwnProperty("bet")) {
                                if (Number(data.GameState.Seats.Seat[i].PlayerInfo.Chips.attr.bet) !== 0) {
                                    this.seatsRef.current.updateGameState_onSeatPots(i, data.GameState.Seats.Seat[i].PlayerInfo.Chips.attr.bet);
                                }
                            }
                        }

                        let options = this.state.options;

                        seats.Seat[i].name = data.GameState.Seats.Seat[i].PlayerInfo.attr.nickname;
                        if (this.player.id === data.GameState.Seats.Seat[i].attr.id) {
                            options.showChecks = true;
                            this.setState({ options: options });
                        }
                        // <---------------------------------------time_force_table start----------------------------------->
                        if (Number(this.player.id) === Number(data.GameState.Seats.Seat[i].attr.id)) {

                            this.setState({ rittwicestatus: data.GameState.Seats.Seat[i].PlayerInfo.attr.enableTwoX === "true" ? true : false })
                            // if (data.GameState.Seats.Seat[i].attr.isTimeForcedPaused === "false" && data.GameState.Seats.Seat[i].attr.timeLeft !== data.GameState.Seats.Seat[i].PlayerInfo.attr.duration) {
                            //     if (Number(data.GameState.Seats.Seat[i].attr.timeLeft) > 0) {
                            //         this.setState({ isTimeForcedPaused1: false, isTimeForcedPaused: true })
                            //         this.setState({
                            //             timeForced: {
                            //                 isTimeForcedPaused: false,
                            //                 force_duration: (Number(data.GameState.Seats.Seat[i].attr.timeLeft) / 1000).toFixed(0)
                            //             }
                            //         })

                            //         // this.timeforceRef.current.childMethod((Number(data.GameState.Seats.Seat[i].attr.timeLeft) / 1000).toFixed(0))

                            //     }
                            // } else if (data.GameState.Seats.Seat[i].attr.isTimeForcedPaused === "false" && data.GameState.Seats.Seat[i].attr.timeLeft === data.GameState.Seats.Seat[i].PlayerInfo.attr.duration) {
                            //     this.setState({ isTimeForcedPaused1: true })
                            //     this.setState({
                            //         isTimeForcedPaused: false, timeForced: {
                            //             isTimeForcedPaused: true,
                            //             force_duration: (Number(data.GameState.Seats.Seat[i].attr.timeLeft) / 1000).toFixed(0)
                            //         }
                            //     })

                            // }
                            // else if (data.GameState.Seats.Seat[i].attr.isTimeForcedPaused === "true") {
                            //     if (Number(data.GameState.Seats.Seat[i].attr.timeLeft) > 0) {
                            //         this.setState({ isTimeForcedPaused1: true })
                            //         this.setState({
                            //             isTimeForcedPaused: false, timeForced: {
                            //                 isTimeForcedPaused: true,
                            //                 force_duration: (Number(data.GameState.Seats.Seat[i].attr.timeLeft) / 1000).toFixed(0)
                            //             }
                            //         })
                            //         // console.log((Number(data.GameState.Seats.Seat[i].attr.timeLeft) / 1000).toFixed(0))
                            //         // this.timeforceRef.current.childMethod((Number(data.GameState.Seats.Seat[i].attr.timeLeft) / 1000).toFixed(0))

                            //     }
                            //     else if (data.GameState.Seats.Seat[i].attr.timeLeft === "-1") {
                            //         this.setState({ isTimeForcedPaused: false })

                            //     }
                            //     else if (data.GameState.Seats.Seat[i].attr.timeLeft === "0") {
                            //         this.setState({ isTimeForcedPaused: false })

                            //     }

                            // }

                        }
                        // <---------------------------------------time_force_table end----------------------------------->
                        this.activeSeatCount++;
                    } else {
                        this.joinWaitingListFunction(0, cnt, this.player)
                        if (data.GameState.hasOwnProperty("TournamentInfo")) {
                            this.gameState = {
                                name: (this.state.textvariable === true ? "Open Seat" : ""),
                                chips: "",
                                status: (this.state.textvariable === true ? "onlyMe" : "takenInactive"),
                                seat: i,
                                action: "",
                            };
                            seats.Seat[i].name = (this.state.textvariable === true ? "" : "Take Seat")
                        } else {
                            this.gameState = {
                                name: (this.state.textvariable === true ? "Open Seat" : "Take Seat"),
                                chips: "",
                                status: (this.state.textvariable === true ? "onlyMe" : "readyToTake"),
                                seat: i,
                                action: "",
                            };
                            seats.Seat[i].name = (this.state.textvariable === true ? "" : "Take Seat")
                        }
                    }
                    if (data.GameState.Seats.Seat[i].hasOwnProperty("Timer")) {
                        if (Number(this.player.id) === Number(i)) {
                            // console.log("Timer  >  ", data)
                            let time
                            try {
                                // time = (Number(data.GameState.Seats.Seat[i].Timer.attr?.time) - Number(data.Message.GameState.Seats.Seat[i].Timer.attr?.elapsed)) / 1000;
                                time = (Number(data.GameState.Seats.Seat[i].Timer.attr?.time) - Number(data.GameState.Seats.Seat[i].Timer.attr?.elapsed)) / 1000;
                                let balanceObj = {
                                    available: data.GameState.Seats.Seat[i].Timer.BuyChips?.attr?.available,
                                    min: data.GameState.Seats.Seat[i].Timer.BuyChips.attr?.min,
                                    max: data.GameState.Seats.Seat[i].Timer.BuyChips.attr?.max,
                                    newAvlBal: data.GameState.Seats.Seat[i].Timer.BuyChips?.attr?.available,
                                    newMinBal: data.GameState.Seats.Seat[i].Timer.BuyChips.attr?.min,
                                    newMaxBal: data.GameState.Seats.Seat[i].Timer.BuyChips.attr?.max,
                                    time: time,
                                    runTimer: true,
                                };
                                this.setState({ balance: balanceObj, showBuyChips: true, showTourneyInfoBoard: false });
                                // console.log("showBuyChips1")
                            } catch (e) { console.log(e) }
                        }

                        if (data.GameState.Seats.Seat[i].Timer.hasOwnProperty("TakeSeat")) {
                            this.setState({ mySeatId: data.GameState.Seats.Seat[i].Timer?.TakeSeat?.attr?.seat })
                            this.onGetTakeSeat("", "take_seat");
                        }
                    }
                    if (data.GameState.Seats.Seat[i].hasOwnProperty("LastAction")) {
                        if (data.GameState.Seats.Seat[i].LastAction.hasOwnProperty("SitOut")) {
                            this.gameState.status = "takenInactive";
                            if (Number(this.player.id) === Number(i)) {
                                let options = this.state.options;
                                options.showgamecontr = "hidden";
                                options.action = [{ name: "SitIn", amount: "" }];
                                options.cnt = 1;
                                options.showSlider = false;
                                this.setState({ options: options });
                            }
                        }
                        if (data.GameState.Seats.Seat[i].LastAction.hasOwnProperty("Fold")) {
                            this.gameState.action = "Fold";
                            if (data.GameState.Seats.Seat[i].hasOwnProperty("attr")) {
                                if (data.GameState.Seats.Seat[i].attr.hasOwnProperty("timedOut")) {
                                    let options = this.state.options;
                                    options.showSlider = false;
                                    this.setState({ options: options });
                                }
                            }
                        }
                        if (data.GameState.Seats.Seat[i].LastAction.hasOwnProperty("Check")) {
                            this.gameState.action = "Check";
                            if (data.GameState.Seats.Seat[i].hasOwnProperty("attr")) {
                                if (data.GameState.Seats.Seat[i].attr.hasOwnProperty("timedOut")) {
                                    let options = this.state.options;
                                    options.showSlider = false;
                                    this.setState({ options: options });
                                }
                            }
                        }
                        if (data.GameState.Seats.Seat[i].LastAction.hasOwnProperty("Raise")) {
                            this.gameState.action = `Raise ${data.GameState.Seats.Seat[i].LastAction.Raise.attr.amount}`;
                        }
                        if (data.GameState.Seats.Seat[i].LastAction.hasOwnProperty("Bet")) {
                            this.gameState.action = `Bet ${data.GameState.Seats.Seat[i].LastAction.Bet.attr.amount}`;
                        }
                        if (data.GameState.Seats.Seat[i].LastAction.hasOwnProperty("Call")) {
                            this.gameState.action = `Call ${data.GameState.Seats.Seat[i].LastAction.Call.attr.amount}`;
                        }
                        if (data.GameState.Seats.Seat[i].LastAction.hasOwnProperty("PostSmallBlind")) {
                            this.gameState.action = `SB ${data.GameState.Seats.Seat[i].LastAction.PostSmallBlind.attr.amount}`;
                        }
                        if (data.GameState.Seats.Seat[i].LastAction.hasOwnProperty("PostBigBlind")) {
                            this.gameState.action = `BB ${data.GameState.Seats.Seat[i].LastAction.PostBigBlind.attr.amount}`;
                        }
                        if (data.GameState.Seats.Seat[i].LastAction.hasOwnProperty("PostThirdBlind")) {
                            this.gameState.action = `TB ${data.GameState.Seats.Seat[i].LastAction.PostThirdBlind.attr.amount}`;
                        }
                    }
                    this.seatsRef.current.updateGameState(this.gameState);
                    // if (this.rearrangeSeat && this.state.textvariable) {
                    //     if (fileName.name === "Leader_bet") {
                    //         this.seatsRef.current.RearrageSeat(this.gameState);
                    //     }
                    // }
                    if (this.state.textvariable) {
                        this.rearrangeSeat = false;
                    } else {
                        this.rearrangeSeat = true;
                    }

                    if (data.GameState.Seats.Seat[i].hasOwnProperty("Cards")) {
                        if (Number(this.player.id) === Number(i)) {
                            this.cards = [];
                            this.playerCards = [];
                            for (let j = 0; j < data.GameState.Seats.Seat[i].Cards.Card.length; j++) {
                                let card = fileName.name !== "Riverpoker" ? data.GameState.Seats.Seat[i].Cards.Card[j]['#text'] : this.decryptCards(data.GameState.Seats.Seat[i].Cards.Card[j]['#text']) == '' ? "xx" : this.decryptCards(data.GameState.Seats.Seat[i].Cards.Card[j]['#text']);
                                this.cards.push(card);
                                this.playerCards.push(card);
                            }

                            let tab = document.getElementById(this.tableId);
                            try {
                                if (tab != null) {
                                    tab.innerHTML = this.getLastcards(this.playerCards);
                                }
                            } catch (e) { console.log(e) }

                            getShowDealerMessage() && this.setState({ infoChat: this.getLastcards(this.cards) });
                        }

                        this.seatsRef.current.updateGameState_seatCards({ Cards: data.GameState.Seats.Seat[i].Cards }, i);
                    } else {
                        this.seatsRef.current.removeCardsSelf(i);
                    }


                    this.gameState_seat.push(this.gameState);
                }
                this.setState({ seats: seats });
                // this.seatsRef.current.updateStateSeats(data.GameState.Seats)
            }
            // showBuyChips
            if (this.tableData.isSeatMe && this.Once_Call_buyIN_popup) {
                this.takeSeat(data.GameState.Seats);
            }
        }


        if (data.GameState.hasOwnProperty("Board")) {
            let boardCards = this.state.boardCards;
            boardCards = [];
            if (data.GameState.Board.hasOwnProperty("Card")) {
                let cards = data.GameState.Board.Card;
                let i = 0,
                    cnt = cards.length;
                for (i; i < cnt; i++) {
                    boardCards.push(cards[i]["#text"]);
                    switch (i) {
                        case 0:
                            this.boardCardsRef.current.addCards("flopZero", cards[i]["#text"], 0);
                            break;
                        case 1:
                            this.boardCardsRef.current.addCards("flopOne", cards[i]["#text"], 150);
                            break;
                        case 2:
                            this.boardCardsRef.current.addCards("flopTwo", cards[i]["#text"], 300);
                            break;
                        case 3:
                            this.boardCardsRef.current.addCards("turn", cards[i]["#text"], 450);
                            break;
                        case 4:
                            this.boardCardsRef.current.addCards("river", cards[i]["#text"], 600);
                            break;
                        default:
                            break;
                    }
                }
            }
            this.setState({ boardCards: boardCards });
        } else {
            this.boardCardsRef.current.removeCards();
        }

        if (data.GameState.hasOwnProperty("RitBoard")) {
            let ritBoardCards = this.state.ritBoardCards;
            ritBoardCards = [];
            if (data.GameState.RitBoard.hasOwnProperty("Card")) {
                let cards = data.GameState.RitBoard.Card;
                let i = 0,
                    cnt = cards.length;
                for (i; i < cnt; i++) {
                    ritBoardCards.push(cards[i]["#text"]);
                }
            }
            this.setState({ ritBoardCards: ritBoardCards });
        } else {
            this.ritBoardCardsRef.current.removeCards();
        }

        if (data.GameState.hasOwnProperty("Pots")) {
            if (data.GameState.Pots.hasOwnProperty("rake")) {
                this.seatsRef.current.updateGameState_onTablePotsChange(data.GameState.Pots.Pot, data.GameState.Pots.attr.rake);
            } else {
                this.seatsRef.current.updateGameState_onTablePotsChange(data.GameState.Pots.Pot, 0);

            }
        } else {
            // if (!this.changeOptionTournment) {
            //     this.seatsRef.current.noTablePot();
            // }
            this.seatsRef.current.noTablePot();
        }

        if (data.GameState.hasOwnProperty("Active")) {
            this.startTimer(data.GameState.Active.attr.seat, Number(data.GameState.Active.attr.startTime), Number(data.GameState.Active.attr.time), Number(data.GameState.Active.attr.timeBank));
            if (data.GameState.hasOwnProperty("Actions")) {
                let options = this.state.options;
                if (Number(this.player.id) === Number(data.GameState.Active.attr.seat)) {
                    options.showgamecontr = "visible";

                    let actions = Object.keys(data.GameState.Actions);
                    let cnt = actions.length,
                        i = 0;
                    options.cnt = cnt;
                    options.seatId = data.GameState.Active.attr.seat;
                    if (data.GameState.Actions.hasOwnProperty("Bet") || data.GameState.Actions.hasOwnProperty("Raise")) {
                        options.showSlider = true;
                    } else {
                        options.showSlider = false;
                    }
                    options.action = [];

                    for (i; i < cnt; i++) {
                        if (data.GameState.Actions[actions[i]].hasOwnProperty("attr")) {
                            if (data.GameState.Actions[actions[i]].attr.hasOwnProperty("amount")) {
                                options.action.push({ name: actions[i], amount: data.GameState.Actions[actions[i]].attr.amount });
                            } else if (data.GameState.Actions[actions[i]].attr.hasOwnProperty("max")) {
                                options.rangeMax = data.GameState.Actions[actions[i]].attr.max;
                                if (data.GameState.Actions[actions[i]].attr.hasOwnProperty("min")) {
                                    options.rangeMin = data.GameState.Actions[actions[i]].attr.min;
                                    console.log("Allin", data.GameState.Seats.Seat[this.player.id].PlayerInfo.Chips.attr["stack-size"])
                                    options.action.push({ name: actions[i], amount: data.GameState.Actions[actions[i]].attr.min });
                                }
                            } else {
                                options.rangeMax = 0;
                                options.rangeMin = 0;
                            }
                        } else {
                            options.action.push({ name: actions[i], amount: "" });
                        }
                    }
                }
                this.setState({ options: options });
            }
        }


        if (data.GameState.hasOwnProperty("TournamentInfo")) {
            console.log(data.GameState.TournamentInfo)
            // alert("hit")
            this.state.welcomeText = "";
            let waitForRebuy = this.state.waitForRebuy;
            let tourneyInfoBoard = this.state.tourneyInfoBoard;

            // if (data.GameState.Seats.attr.hasOwnProperty("me")) {

            // } else {

            // }

            if (data.GameState.TournamentInfo.hasOwnProperty("Break")) {
                // this.setState({ showBreakAlert: false });
                this.setState({ gameStateIsUpdated: true });
                let t = data.GameState.TournamentInfo.Break.attr.periodFrom;
                // let t2 = Math.abs(Number(Date.now()) - Number(t)) / 1000;
                let t2 = Math.abs(Date.now() - new Date(t).getTime()) / 1000;
                let sec = Math.trunc(t2 % 60);
                let min = Math.trunc(t2 / 60);

                tourneyInfoBoard.breakTime = `${min} min ${sec} sec`;
                // console.log(`${min} min ${sec} sec`)
                this.setState({ tourneyInfoBoard: tourneyInfoBoard });
            };


            if (data.GameState.TournamentInfo.hasOwnProperty("CurrentLevel")) {
                tourneyInfoBoard.cStakes = UM.numberWithCommas(data.GameState.TournamentInfo.CurrentLevel.attr.lowStake) + "/" + UM.numberWithCommas(data.GameState.TournamentInfo.CurrentLevel.attr.highStake);
                tourneyInfoBoard.cLevel = data.GameState.TournamentInfo.CurrentLevel.attr.number;
                this.stakes = UM.numberWithCommas(data.GameState.TournamentInfo.CurrentLevel.attr.lowStake) + "/" + UM.numberWithCommas(data.GameState.TournamentInfo.CurrentLevel.attr.highStake);
                this.setState({ tipInfo: { name: this.tableName, type: this.gameType, stakes: this.stakes, CH: data.GameState.attr.hand } });
            }
            if (!(data.GameState.TournamentInfo.hasOwnProperty("CurrentLevel"))) {
                if (data.GameState.TournamentInfo.hasOwnProperty("NextLevel")) {
                    console.log("NextLevel")
                    if (data.GameState.TournamentInfo.NextLevel.attr.periodFrom != data.GameState.TournamentInfo.attr.startTime) {
                        let t = data.GameState.TournamentInfo.NextLevel.attr.periodFrom;
                        // let t2 = Math.abs(Number(t) - Number(Date.now())) / 1000;
                        let t2 = Math.abs(Number(t) - Number(data.GameState?.attr?.serverTime)) / 1000;
                        t2 = t2?.toFixed(0)
                        this.setState({ showTimerBreak: true })
                        this.myRef.current?.childMethod(t2)
                        // this.breaktime = setTimeout(() => {
                        //     clearTimeout(this.breaktime)
                        //     this.setState({ showTimerBreak: false })
                        // }, (t2) * 1000);
                    }

                }
            }
            if (data.GameState.TournamentInfo.hasOwnProperty("NextLevel")) {
                tourneyInfoBoard.nLevel = data.GameState.TournamentInfo.NextLevel.attr.number;
                tourneyInfoBoard.nStakes = UM.numberWithCommas(data.GameState.TournamentInfo.NextLevel.attr.lowStake) + "/" + UM.numberWithCommas(data.GameState.TournamentInfo.NextLevel.attr.highStake);
                this.setState({ tourneyInfoBoard: tourneyInfoBoard });
            }
            let TournamentRebuys = this.state.TournamentRebuy
            if (data.GameState.TournamentInfo.hasOwnProperty("Rebuy")) {
                TournamentRebuys.Popup = true;
                TournamentRebuys.Rebuybtn = true;
                TournamentRebuys.count = data.GameState.TournamentInfo.Rebuy.attr.count;
                TournamentRebuys.cost = data.GameState.TournamentInfo.Rebuy.attr.cost;
                TournamentRebuys.fee = data.GameState.TournamentInfo.Rebuy.attr.fee;
                TournamentRebuys.chips = data.GameState.TournamentInfo.Rebuy.attr.chips;
            } else {
                TournamentRebuys.Popup = false;
                this.setState({ showTournamentRebuy: false })
            }
            if (data.GameState.TournamentInfo.hasOwnProperty("Addon")) {
                TournamentRebuys.Rebuybtn = false;
                TournamentRebuys.count = data.GameState.TournamentInfo.Addon.attr.count;
                TournamentRebuys.cost = data.GameState.TournamentInfo.Addon.attr.cost;
                TournamentRebuys.fee = data.GameState.TournamentInfo.Addon.attr.fee;
                TournamentRebuys.chips = data.GameState.TournamentInfo.Addon.attr.chips;
            }
            this.setState({ TournamentRebuy: TournamentRebuys })

            if (data.GameState.TournamentInfo.hasOwnProperty("attr")) {
                if (data.GameState.TournamentInfo.attr.status === "COMPLETED") {
                    clearTimeout(this.breaktime);
                    this.setState({ welcomeText: "Tournament Completed" });
                    this.props.TableHandler("closeTourneyTable", { id: this.tableId });
                    this.breaktime = setTimeout(() => {
                        this._tableNetwork.send("<LeaveTable/>");
                        this.setPopUpActions("hideExitAlert");
                        this.setState({ showTplayerRankAlert: false });
                    }, 5000)
                }
                if (data.GameState.TournamentInfo.attr.status === "PAUSED") {
                    this.setState({ welcomeText: data.GameState.TournamentInfo.attr.statusDescription });
                }
            }

            if (this.state.textvariable) {
                if (data.GameState.TournamentInfo.hasOwnProperty("Rebuy")) {
                    waitForRebuy.count = data.GameState.TournamentInfo.Rebuy.attr.count;
                    waitForRebuy.chips = data.GameState.TournamentInfo.Rebuy.attr.chips;
                    waitForRebuy.cost = data.GameState.TournamentInfo.Rebuy.attr.cost;
                }
                this.setState({ waitForRebuy: waitForRebuy });

                if (data.GameState.TournamentInfo.hasOwnProperty("Addon")) {
                    // console.log(data.GameState.TournamentInfo)
                    if (Number(data.GameState.TournamentInfo.Addon.attr.count) > 0) {
                        // if (Number(this.player.id) === Number(data.GameState.TournamentInfo.Active.attr.seat)) {
                        switch (this.state.addonsetting) {
                            case "hide":
                                this._tableNetwork.send('<ReBuy/>');
                                this.setState({ showAddonAlert: false });
                                break;
                            case "show":
                                this.setState({ addonData: `You can add ${UM.changeAmtLabel(data.GameState.TournamentInfo.Addon.attr.chips)} at the cost of ${UM.changeAmtLabel(data.GameState.TournamentInfo.Addon.attr.cost)}` })
                                this.setState({ showAddonAlert: true });
                                break;
                            default:
                                break;
                        }
                        // }
                    }
                }
            }
        }
        if (this.activeSeatCount >= Number(this.state.seatCnt)) {
            this.setState({ disableJW: false });
        } else {
            this.setState({ disableJW: true });
        }

        this.BuddiesData();
    }

    BuddiesData() {
        this.setState({ buddyData: "raju" });
    }

    onWaitingList(data) {
        console.log("++++++++++++++++onWaitingList++++++++++++++++++++++++")
        // console.log(data)
        let waitList = this.state.waitList;
        waitList.list = [];
        waitList.present = data.WaitingList.attr.size;
        if (data.WaitingList.hasOwnProperty("WaitingPlayer")) {
            let wPlayer = data.WaitingList.WaitingPlayer
            if (!Array.isArray(wPlayer)) {
                wPlayer = [wPlayer];
            }
            let i = 0, cnt = wPlayer.length;
            for (i; i < cnt; i++) {
                waitList.list.push({ id: wPlayer[i].attr.id, name: wPlayer[i].PlayerInfo.attr.nickname })
            }
            if (data.WaitingList.attr.hasOwnProperty("me")) {
                this.setState({
                    btns: {
                        disableJoinBtn: true,
                        disableRemovBtn: false
                    }
                })
            }
            this.setState({ waitList: waitList });
        }
    }


    takeSeat(data) {
        let seats = data.Seat;
        let i = 0,
            cnt = seats.length;
        for (i = 0; i < cnt; i++) {
            if (seats[i].attr.available) {
                this._tableNetwork.send(`<TakeSeat seat='${seats[i].attr.id}'/>`);
                break;
            }
        }
    }

    onGetPlayerInfo(data) {
        if (data.PlayerInfo.hasOwnProperty("attr")) {
            let player = data.PlayerInfo.attr.nickname;
            this.windowTitle = "User: " + player + " || " + this.tableName + " || " + this.gameType + " " + this.stakes;
            document.getElementsByTagName("title")[0].innerHTML = this.windowTitle;
        }
    }
    TagName() {
        document.getElementsByTagName("title")[0].innerHTML = this.windowTitle;
    }


    AnimationTable(data) {
        const element = document.querySelector(`#${this.props.id}`);

        if (element) {
            if (data === "LEFT") {
                gsap.from(`#${this.props.id}`, { x: -window.innerWidth / 2, duration: 0.25, ease: "linear" });
            } else if (data === "RIGHT") {
                gsap.from(`#${this.props.id}`, { x: window.innerWidth / 2, duration: 0.25, ease: "linear" });
            } else {
                console.log("Current Table");
            }
        } else {
            console.log("Element not found");
        }
    }

    // AnimationTable(data) {
    //     console.log(data)
    //     console.log(this.props.id)
    //     const element = document.querySelector(this.props.id);
    //     console.log(element)
    //     if (element) {
    //         if (data === "LEFT") {
    //             gsap.from(`.${this.props.id}`, { x: -window.innerWidth / 2, duration: 0.25, ease: "linear" })
    //         } else if (data === "RIGHT") {
    //             gsap.from(`.${this.props.id}`, { x: window.innerWidth / 2, duration: 0.25, ease: "linear" })
    //         } else {
    //             console.log("Current Table")
    //         };
    //     }
    // }

    onGetBalanceInfo(data) {
        let options = this.state.options;
        let time, runTimer;
        if (data.BalanceInfo.attr.hasOwnProperty("time")) {
            time = data.BalanceInfo.attr.time / 1000;
            runTimer = true;
        } else {
            time = 0;
            runTimer = false;
        }
        // var AvailableBalance = data.BalanceInfo.attr.available.split(".")[0];
        // var MinBalance = data.BalanceInfo.attr.min.split(".")[0];
        // var MaxBalance = data.BalanceInfo.attr.max.split(".")[0];

        // let newAvlBal = UM.changeAmtLabel(AvailableBalance);
        // let newMinBal = UM.changeAmtLabel(MinBalance);
        // let newMaxBal = UM.changeAmtLabel(MaxBalance);

        let balanceObj = {
            available: data.BalanceInfo.attr.available,
            min: data.BalanceInfo.attr.min,
            max: data.BalanceInfo.attr.max,
            // available: AvailableBalance,
            // min: MinBalance,
            // max: MaxBalance,
            // newAvlBal: newAvlBal,

            // newAvlBal: ((typeof newAvlBal === "string" ? (newAvlBal.includes('.') ? `${UM.numberWithCommas(newAvlBal.substring(0, newAvlBal.length - 1).split(".")[0])}.${UM.numberWithCommas(newAvlBal.substring(0, newAvlBal.length - 1).split(".")[1])}${newAvlBal.charAt(newAvlBal.length - 1)}` : `${UM.numberWithCommas(newAvlBal.substring(0, newAvlBal.length - 1))}${newAvlBal.charAt(newAvlBal.length - 1)}`) : newAvlBal)),
            newAvlBal: data.BalanceInfo.attr.available,

            // newMinBal: newMinBal,

            // newMinBal: ((typeof newMinBal === "string" ? (newMinBal.includes('.') ? `${UM.numberWithCommas(newMinBal.substring(0, newMinBal.length - 1).split(".")[0])}.${UM.numberWithCommas(newMinBal.substring(0, newMinBal.length - 1).split(".")[1])}${newMinBal.charAt(newMinBal.length - 1)}` : `${UM.numberWithCommas(newMinBal.substring(0, newMinBal.length - 1))}${newMinBal.charAt(newMinBal.length - 1)}`) : newMinBal)),
            newMinBal: data.BalanceInfo.attr.min,

            // newMaxBal: newMaxBal,

            // newMaxBal: ((typeof newMaxBal === "string" ? (newMaxBal.includes('.') ? `${UM.numberWithCommas(newMaxBal.substring(0, newMaxBal.length - 1).split(".")[0])}.${UM.numberWithCommas(newMaxBal.substring(0, newMaxBal.length - 1).split(".")[1])}${newMaxBal.charAt(newMaxBal.length - 1)}` : `${UM.numberWithCommas(newMaxBal.substring(0, newMaxBal.length - 1))}${newMaxBal.charAt(newMaxBal.length - 1)}`) : newMaxBal)),
            newMaxBal: data.BalanceInfo.attr.max,
            time: time,
            runTimer: runTimer,
        };
        this.setState({ balance: balanceObj });
        if (data.BalanceInfo.hasOwnProperty("ContinueAction")) {
            if (data.BalanceInfo.ContinueAction.hasOwnProperty("SitIn")) {
                this.gameState.status = "takenInactive";
                options.showgamecontr = "hidden";
                options.action.push({ name: "SitIn", amount: "" });
            }
            this.setState({ options: options });
        }
        this.setState({ showBuyChips: true, showInfoPanel: false, showTourneyInfoBoard: false });
    }
    onMoneyExchangeInfo(data) {
        // console.log(data)
        let wallet = data.MoneyExchangeInfo.attr.wallet;
        let alert = { ...this.state.alert };
        this.setState({ isGetingResponse: "" });
        clearTimeout(this.serverResponseTime);
        if (alert.lineOne === "Server is not responding to the exchange request.") {
            alert.lineOne = "";
            this.setState({ alert: alert, showAlert: false });
        }

        if (wallet === "CHP") {
            this.props.playerBalance['myCHPbalance'] = data.MoneyExchangeInfo.attr.cash;
        } else if (wallet === "USD") {
            this.props.playerBalance['myUSDbalance'] = data.MoneyExchangeInfo.attr.cash;
        }
        this.setState({ onMoneyExchangeInfo: data.MoneyExchangeInfo, tableLoded: true, showBuyChips: true });
    }

    onGetServerTime(data) {
        this.time = new Date(parseInt(data.ServerTime.attr.time)).toLocaleTimeString();
        let time = new Date(parseInt(data.ServerTime.attr.time));
        this.serverTime = data.ServerTime.attr.time;
        this.setState({ time: `${time.getHours()}: ${time.getMinutes()}` });
    }

    onActiveSeats(data) {
        this.seatsRef.current.onAciveSeats(data);
        this.seatsRef.current.CallTimeTableDetails(data.ActiveSeats, "onActiveSeats");
        if (data.ActiveSeats.hasOwnProperty("Seat")) {
            this.activeSeatCount = Number(data.ActiveSeats.Seat.length);
            // if (data.ActiveSeats.Seat.length < 2) {
            //     this.setState({ leaveTablebtn: false })
            // }
            let cnt = data.ActiveSeats.Seat.length;
            let i = 0;
            for (i; i < cnt; i++) {
                if (data.ActiveSeats.Seat[i].attr.hasOwnProperty("isTimeForcedPaused")) {
                    if (data.ActiveSeats.Seat[i].attr.id === this.player.id && data.ActiveSeats.Seat[i].attr.isTimeForcedPaused === "true") {

                        this.setState({ manualPrizePoolshwow: true, showTourneyInfoBoard: false })
                    }
                    else if (data.ActiveSeats.Seat[i].attr.id === this.player.id && data.ActiveSeats.Seat[i].attr.isTimeForcedPaused === "false") {
                        this.setState({ manualPrizePoolshwow: false })
                    }
                }
                var leavebtn;
                if (data.ActiveSeats.Seat[i].hasOwnProperty("attr")) {
                    if (data.ActiveSeats.Seat[i].attr.id === this.player.id) {
                        if (data.ActiveSeats.Seat[i].attr.hasOwnProperty("timeLeft")) {
                            leavebtn = data.ActiveSeats.Seat[i].attr.timeLeft == "-1" ? false : data.ActiveSeats.Seat[i].attr.timeLeft == "0" ? false : true;
                        }
                    }
                }
            }
            // var leavebtn;
            // if (data.ActiveSeats.Seat[this.player.id].attr.hasOwnProperty("timeLeft")) {
            //     leavebtn = data.ActiveSeats.Seat[this.player.id].attr.timeLeft == "-1" ? false : data.ActiveSeats.Seat[this.player.id].attr.timeLeft == "0" ? false : true;
            // }
            this.setState({ leaveTablebtn: leavebtn })
        }

    }

    onPlayerAction(data) {
        let seats = this.state.seats;
        if (data.PlayerAction.hasOwnProperty("attr")) {
            if (data.PlayerAction.attr.hasOwnProperty("seat")) {
                let index = data.PlayerAction.attr.seat;
                this.stopTimer(index);
                this.stopCountDown(index);
                let options = this.state.options;
                if (data.PlayerAction.hasOwnProperty("SitOut")) {
                    // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}>: ${seats.Seat[index].name} left the table ` });
                    getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} left the table` });
                    if (Number(this.player.id) === Number(index)) {
                        this.gameState.status = "takenInactive";
                        options.showgamecontr = "hidden";
                        options.action = [{ name: "SitIn", amount: "" }];
                        options.cnt = 1;
                        options.showSlider = false;
                        options.show2x = false;
                        options.show3x = false;
                        options.show1by2 = false;
                        options.show1by3 = false;
                        options.show2by3 = false;
                        options.showpot = false;

                        options.showFold = false;
                        options.showCheck = false;
                        options.showBet = false;
                        options.showCall = false;
                        options.showRaise = false;
                        // this._tableNetwork.send("<SitOut/>");

                        let playerCards = [];

                        if (this.playerCards.length > 1) {
                            let cardsLength = this.playerCards.length;
                            for (let p = 0; p < cardsLength; p++) {
                                playerCards.push("xx")
                            }

                            let tab = document.getElementById(this.tableId);
                            try {
                                if (tab != null) {
                                    tab.innerHTML = this.getLastcards(playerCards);
                                }
                                this.playerCards = playerCards;
                            } catch (e) { console.error(e) }
                        }

                        this.setState({ leaveTablebtn: false });
                    }
                    this.setState({ options: options });

                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "SitOut",
                        amount: "",
                    });
                    setTimeout(() => {
                        if (Number(this.player.id) === Number(index)) {
                            if (this.gameState.status === 'readyToTake') {
                                let options = this.state.options;
                                options.action = []
                                options.quickAction = []
                                this.setState({ options: options });
                            }
                        }
                    }, 1000);
                }
                if (data.PlayerAction.hasOwnProperty("SitIn")) {
                    if (Number(this.player.id) === Number(index)) {
                        let options = this.state.options
                        options.action = [];
                    }
                    if (this.state.textvariable) {
                        this.seatsRef.current.onPlayerAction({
                            seat: index,
                            action: "SitIn",
                            amount: "",
                        });
                    }
                }
                if (data.PlayerAction.hasOwnProperty("UseTimeBank")) {
                    this.startTimer(index, Number(data.PlayerAction.UseTimeBank.attr.startTime), Number(data.PlayerAction.UseTimeBank.attr.time), "-1");
                    if (Number(index) === Number(this.player.id)) {
                        this.seatsRef.current.iniTimerSound(this.player.id)
                        this.startCountDown(index, data.PlayerAction.UseTimeBank.attr.startTime, data.PlayerAction.UseTimeBank.attr.time, this.tableId);
                    }
                }
                if (data.PlayerAction.hasOwnProperty("TimedOut")) {
                    // this.setGcActions(data.PlayerAction.attr.seat);
                    if (Number(data.PlayerAction.attr.seat) === Number(this.player.id)) {
                        this.setGcActions(data.PlayerAction.attr.seat);
                    }
                }
                if (data.PlayerAction.hasOwnProperty("PostSmallBlind")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "PostSmallBlind",
                        amount: data.PlayerAction.PostSmallBlind.attr.amount,
                    });
                    if (index === this.player.id) {

                        this.setState({ mychips: Number(this.state.mychips) - Number(data.PlayerAction.PostSmallBlind.attr.amount) })
                    }
                    // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> <span style = color:'red'>${seats.Seat[index].name}</span> Posts Small Blind ${Intl.NumberFormat('en-US').format(data.PlayerAction.PostSmallBlind.attr.amount)}` });
                    getShowDealerMessage() && this.setState({ infoChat: ` Dealer: <span style = color:'red'>${seats.Seat[index].name}</span> Posts Small Blind ${Intl.NumberFormat('en-US').format(data.PlayerAction.PostSmallBlind.attr.amount)}` });
                    if (data.PlayerAction.PostSmallBlind.attr.hasOwnProperty("dead")) {
                        // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Dead Blind ${data.PlayerAction.PostSmallBlind.attr.dead}` });
                        getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} Dead Blind ${data.PlayerAction.PostSmallBlind.attr.dead}` });
                    }
                }
                if (data.PlayerAction.hasOwnProperty("PostBigBlind")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "PostBigBlind",
                        amount: data.PlayerAction.PostBigBlind.attr.amount,
                    });
                    this.state.options.bigblindValue = data.PlayerAction.PostBigBlind.attr.amount;
                    if (index === this.player.id) {
                        this.setState({ mychips: Number(this.state.mychips) - Number(data.PlayerAction.PostBigBlind.attr.amount) })
                    }
                    // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Posts Big Blind ${Intl.NumberFormat('en-US').format(data.PlayerAction.PostBigBlind.attr.amount)}` });
                    getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} Posts Big Blind ${Intl.NumberFormat('en-US').format(data.PlayerAction.PostBigBlind.attr.amount)}` });
                    if (data.PlayerAction.PostBigBlind.attr.hasOwnProperty("dead")) {
                        // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Dead Blind ${data.PlayerAction.PostBigBlind.attr.dead}` });
                        getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} Dead Blind ${data.PlayerAction.PostBigBlind.attr.dead}` });
                    }
                }
                if (data.PlayerAction.hasOwnProperty("PostThirdBlind")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "PostThirdBlind",
                        amount: data.PlayerAction.PostThirdBlind.attr.amount,
                    });
                    if (index === this.player.id) {
                        this.setState({ mychips: Number(this.state.mychips) - Number(data.PlayerAction.PostThirdBlind.attr.amount) })
                    }
                    // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Posts Third Blind ${Intl.NumberFormat('en-US').format(data.PlayerAction.PostThirdBlind.attr.amount)}` });
                    getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} Posts Third Blind ${Intl.NumberFormat('en-US').format(data.PlayerAction.PostThirdBlind.attr.amount)}` });
                    if (data.PlayerAction.PostThirdBlind.attr.hasOwnProperty("dead")) {
                        // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Dead Blind ${data.PlayerAction.PostThirdBlind.attr.dead}` });
                        getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} Dead Blind ${data.PlayerAction.PostThirdBlind.attr.dead}` });
                    }
                }
                if (data.PlayerAction.hasOwnProperty("Fold")) {

                    if (Number(index) === Number(this.player.id)) {
                        let playerCards = [];
                        for (let p = 0; p < this.playerCards.length; p++) {
                            playerCards.push("xx")
                        }

                        let tab = document.getElementById(this.tableId);
                        try {
                            if (tab != null) {

                                tab.innerHTML = this.getLastcards(playerCards);
                            }
                            this.playerCards = playerCards;
                        } catch (e) { console.error(e) }
                    }

                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "Fold",
                        amount: "",
                    });
                    // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Folded ` });
                    getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} Folded` });
                }
                if (data.PlayerAction.hasOwnProperty("UncalledBet")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "UncalledBet",
                        amount: data.PlayerAction.UncalledBet.attr.amount,
                    });
                    if (index === this.player.id) {
                        this.setState({ mychips: Number(this.state.mychips) + Number(data.PlayerAction.UncalledBet.attr.amount) })
                    }
                    // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} gets Uncalled Bet amount <span style = color:#ff0000 > ${Intl.NumberFormat('en-US').format(data.PlayerAction.UncalledBet.attr.amount)}</span> back` });
                    getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} gets Uncalled Bet amount <span style = color:#ff0000 > ${Intl.NumberFormat('en-US').format(data.PlayerAction.UncalledBet.attr.amount)}</span> back` });
                }
                if (data.PlayerAction.hasOwnProperty("PostAnte")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "PostAnte",
                        amount: data.PlayerAction.PostAnte.attr.amount,
                    });
                    if (index === this.player.id) {
                        this.setState({ mychips: Number(this.state.mychips) - Number(data.PlayerAction.PostAnte.attr.amount) })
                    }
                }
                if (data.PlayerAction.hasOwnProperty("Check")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "Check",
                        amount: "",
                    });

                    getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} Checked ` });
                    // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Checked ` });
                }
                if (data.PlayerAction.hasOwnProperty("Raise")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "Raise",
                        amount: data.PlayerAction.Raise.attr.amount,
                    });
                    if (index === this.player.id) {
                        this.setState({ mychips: Number(this.state.mychips) - Number(data.PlayerAction.Raise.attr.amount) })
                    }
                    // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Raised To  <span style = color:#fed626 >${Intl.NumberFormat('en-US').format(data.PlayerAction.Raise.attr.amount)}</span>` });
                    getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} Raised To <span style = color:#fed626 > ${Intl.NumberFormat('en-US').format(data.PlayerAction.Raise.attr.amount)}</span>` });
                }
                if (data.PlayerAction.hasOwnProperty("Call")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "Call",
                        amount: data.PlayerAction.Call.attr.amount,
                    });
                    if (index === this.player.id) {
                        this.setState({ mychips: Number(this.state.mychips) - Number(data.PlayerAction.Call.attr.amount) })
                    }
                    // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Called  <span style = color:#fed626 >${Intl.NumberFormat('en-US').format(data.PlayerAction.Call.attr.amount)}</span>` });
                    getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} Called <span style = color:#fed626 > ${Intl.NumberFormat('en-US').format(data.PlayerAction.Call.attr.amount)}</span>` });
                }
                if (data.PlayerAction.hasOwnProperty("Bet")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "Bet",
                        amount: data.PlayerAction.Bet.attr.amount,
                    });
                    if (index === this.player.id) {
                        this.setState({ mychips: Number(this.state.mychips) - Number(data.PlayerAction.Bet.attr.amount) })
                    }

                    // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Betting  ${Intl.NumberFormat('en-US').format(data.PlayerAction.Bet.attr.amount)}` });
                    getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} Betting ${Intl.NumberFormat('en-US').format(data.PlayerAction.Bet.attr.amount)}` });
                }
                if (data.PlayerAction.hasOwnProperty("RunItTwice")) {
                    if (data.PlayerAction.RunItTwice.attr.accept === "true") {
                        this.setState({ callRitTwice: true })
                        let index = data.PlayerAction.attr.seat;
                        this.seatsRef.current.onPlayerAction({
                            seat: index,
                            action: "RunItTwice",
                            amount: "",
                        });

                        // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} accepted <span style = color:#009933 >Run It Twice</span>` });
                        getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} accepted <span style = color:#009933 > Run It Twice </span>` });
                    }
                    if (data.PlayerAction.RunItTwice.attr.accept === "false") {
                        this.setState({ callRitOnce: true })

                        let index = data.PlayerAction.attr.seat;
                        this.seatsRef.current.onPlayerAction({
                            seat: index,
                            action: "RunItOnce",
                            amount: "",
                        });
                        // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} accepted <span style = color:#ff0000 >Run It Once</span>` });
                        getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} accepted <span style = color:#ff0000 > Run It Once </span>` });
                    }
                    // setTimeout(() => {
                    //     this.setState({ callRitOnce: false, callRitTwice: false })
                    // }, 3000)
                    // console.log(data.PlayerAction.attr.seat, this.player.id)

                    if (data.PlayerAction.attr.seat === this.player.id) {
                        let options = this.state.options;
                        if (options.action.length !== 0) {
                            if (options.action[0].name === "Run It Twice" && options.action[1].name === "Run It Once") {
                                this.setGcActions(data.PlayerAction.attr.seat);
                            }
                        }
                    }
                }

            }
        }
        this.setState({ seats: seats });

        if (data.PlayerAction.hasOwnProperty("Show")) {
            console.log("Show", data)
            let seat = data.PlayerAction.attr.seat;
            this.seatsRef.current.showCards(Number(seat), { Cards: data.PlayerAction.Show.Cards });


            this.seatsRef.current.MyCombination(data.PlayerAction)

        }
    }

    onNewPlayer(data) {
        // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>onNewPlayer<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        // console.log(data);
        // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>onNewPlayer<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        if (data.NewPlayer.hasOwnProperty("PlayerInfo")) {
            let seats = this.state.seats;
            let index = data.NewPlayer.attr.seat;
            let options = this.state.options;
            if (data.NewPlayer.attr.me === "true") {
                this.player.name = data.NewPlayer.PlayerInfo.attr.nickname;
                this.player.id = data.NewPlayer.attr.seat;
                options.showChecks = true;
                this.setState({ options: options, mySeatId: data.NewPlayer?.attr.seat });
            }
            // else {
            //     this.player.name = "";
            //     this.player.id = data.NewPlayer.attr.seat;
            // }
            if (data.NewPlayer.hasOwnProperty("PlayerInfo")) this.players[data.NewPlayer.PlayerInfo.attr.nickname] = data.NewPlayer.attr.seat;
            this.seatsRef.current.onNewPlayer(
                {
                    name: data.NewPlayer.PlayerInfo.attr.nickname,
                    // name: "Take Seat",
                    // name: "Seating...",
                    // chips: data.NewPlayer.PlayerInfo.hasOwnProperty("Chips") ? data.NewPlayer.PlayerInfo.Chips.attr["stack-size"] : 0,
                    chips: "",
                    status: "readyToTake",
                    seat: data.NewPlayer.attr.seat,
                    me: this.player
                },
                this.player
            );
            seats.Seat[index].name = data.NewPlayer.PlayerInfo.attr.nickname;
            this.setState({ seats: seats });
            // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} joined table` });
            getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} joined table` });
            this.activeSeatCount++;
            if (this.activeSeatCount >= Number(this.state.seatCnt)) {
                this.setState({ disableJW: false });
            } else {
                this.setState({ disableJW: true });
            }
        } else {
            if (data.NewPlayer.hasOwnProperty("attr")) {
                let seats = this.state.seats;
                let index = data.NewPlayer.attr.seat;
                if (data.NewPlayer.attr.hasOwnProperty("available")) {
                    // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} left the table` });
                    getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} left the table` });
                    delete this.players[seats.Seat[index].name];
                    seats.Seat[index].name = "Take Seat";
                    this.setState({ seats: seats });
                    if (data.NewPlayer.attr.available == "false") {
                        // this.seatsRef.current?.onNewPlayer({
                        //     name: (this.state.textvariable == false ? "" : "Open Seat"),
                        //     // name: (this.state.textvariable == false ? "Take Seat" : "Open Seat"),
                        //     chips: "",
                        //     status: (this.state.textvariable == false ? "takenInactive" : "onlyMe"),
                        //     // status: (this.state.textvariable == false ? "readyToTake" : "onlyMe"),
                        //     seat: index,
                        //     me: this.player
                        // });
                        this.setState({ leaveTablebtn: false });
                        // this._tableNetwork.send(`<GetGameState/>`);
                    } else {
                        this.seatsRef.current.onNewPlayer({
                            name: (this.state.textvariable == false ? "Take Seat" : "Open Seat"),
                            chips: "",
                            status: (this.state.textvariable == false ? "readyToTake" : "onlyMe"),
                            seat: index,
                            me: this.player
                        });
                        let options = this.state.options;
                        options.action = [];
                        setTimeout(() => {
                            this._tableNetwork.send(`<GetGameState/>`);
                        }, 5000);
                    }
                    this.activeSeatCount--;
                    if (this.activeSeatCount >= Number(this.state.seatCnt)) {
                        this.setState({ disableJW: false });
                    } else {
                        this.setState({ disableJW: true });
                    }
                    // if (this.player.id === index) {
                    //     let options = this.state.options;
                    //     options.action = [];
                    //     this.setState({ options: options });
                    // }
                }
            }
        }
    }

    onNewWaitingPlayer(data) {
        console.log("====================onNewWaitingPlayer======================");
        let waitList = this.state.waitList;
        this.setState({ loader: false });
        if (data.NewWaitingPlayer.hasOwnProperty("PlayerInfo")) {
            if (data.NewWaitingPlayer.attr.me === "true") {
                this.setState({
                    btns: {
                        disableJoinBtn: true,
                        disableRemovBtn: false
                    }
                })
            }
            waitList.list.push({ id: data.NewWaitingPlayer.attr.id, name: data.NewWaitingPlayer.PlayerInfo.attr.nickname })
            this.setState({ waitList: waitList });

        } else {
            if (Array.isArray(data.NewWaitingPlayer)) {
                for (let i = 0; i < data.NewWaitingPlayer.length; i++) {
                    if (data.NewWaitingPlayer[i].attr.me === "true") {
                        this.setState({
                            btns: {
                                disableJoinBtn: !this.state.btns.disableJoinBtn,
                                disableRemovBtn: !this.state.btns.disableRemovBtn
                            }
                        })
                    }
                }
            } else {
                if (data.NewWaitingPlayer.attr.me === "true") {
                    this.setState({
                        btns: {
                            disableJoinBtn: !this.state.btns.disableJoinBtn,
                            disableRemovBtn: !this.state.btns.disableRemovBtn
                        }
                    })
                }

            }
            waitList.list = [];
            this._tableNetwork.send('<GetGameState/>');
        }
    }

    isGetingResponse(responseType) {
        this.setState({ isGetingResponse: responseType });
        this.serverResponseTime = setTimeout(() => {
            if (this.state.isGetingResponse === "ExchangeMoney") {
                let alert = { ...this.state.alert };
                alert.lineOne = "Server is not responding to the exchange request.";
                this.setState({ alert: alert, showAlert: true, showBuyChips: false });
            }
        }, 3000);
    }


    onGetTakeSeat(data, requestType) {
        if (data || requestType === "take_seat") {
            let mySeatId = (data !== "" ? data.TakeSeat.attr.seat : this.state.mySeatId);
            console.log(mySeatId)
            this._tableNetwork.send(`<TakeSeat seat='${mySeatId}'/>`);
        } else if (requestType === "rebuy_chips") {
            this._tableNetwork.send('<ReBuy/>');
        }
    }
    onChipsRebuy(data) {
        if (data.ChipsRebuy.hasOwnProperty("attr")) {
            if (data.ChipsRebuy.attr.hasOwnProperty("seat")) {
                let seats = this.state.seats;
                let index = data.ChipsRebuy.attr.seat;
                // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} added <span style = color:#ff0000>${Intl.NumberFormat('en-US').format(data.ChipsRebuy.attr.amount)}</span> to the table ` });
                getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${seats.Seat[index].name} added <span style = color:#ff0000> ${Intl.NumberFormat('en-US').format(data.ChipsRebuy.attr.amount)} </span> to the table ` });

                this.setState({ seats: seats });
                this.seatsRef.current.onChipsRebuy({ seat: data.ChipsRebuy.attr.seat, amount: data.ChipsRebuy.attr.amount });
                this.setPopUpActions("hideReBuyChips");
                if (Number(index) === Number(this.player.id) && this.TableType != "SINGLE_TABLE") {
                    this.setState({ welcomeText: "Your rebuy will add chips for the next hand !" });
                    setTimeout(() => {
                        this.setState({ welcomeText: "" });
                    }, 8000)

                }
                this._tableNetwork.send(`<GetGameState/>`);
            }
        }
    }

    onNewHand(data) {
        this.setState({ showTimerBreak: false, showBreakAlert: false, showWaitForRebuy: false, checkTableBrekMsg: false, gameStateIsUpdated: false, tournamentIsOnBreak: false, addonData: "" });
        this.state.waitRebuyAlert.show = false;
        this.setState({ showcombpercent: false, waitRebuyAlert: { show: false } });
        clearTimeout(this.breaktime)
        let tipInfo = this.state.tipInfo;
        // let remaining = this.state.cDtimer.value;
        if (!this.state_autoPost || !this.state_autoMuck) {
            this.setState({ showCheckAlert: true });
        }
        if (data.NewHand.hasOwnProperty("attr")) {
            if (data.NewHand.attr.hasOwnProperty("number")) {
                getShowDealerMessage() && this.setState({ infoChat: `==========<span style = color:'red'> ${Intl.NumberFormat('en-US').format(data.NewHand.attr.number)}</span>==========` });
                tipInfo.CH = data.NewHand.attr.number;
            }
            if (data.NewHand.attr.hasOwnProperty("dealer")) {
                this.setState({ dealerSeat: data.NewHand.attr.dealer });
                this.seatsRef.current.onDealer(this.state.seatCnt, data.NewHand.attr.dealer);
                try {
                    // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${this.state.seats.Seat[data.NewHand.attr.dealer].name} dealing cards` });
                    getShowDealerMessage() && this.setState({ infoChat: ` Dealer: ${this.state.seats.Seat[data.NewHand.attr.dealer].name} dealing cards` });
                } catch (e) { console.error(e) }

            }
            this.setState({ nametextdealerid: data.NewHand.attr.dealer, JackpotPayout: { HAND_WINNER: false, BAD_BEAT: false, amount: 0 }, });
            this.setState({ tipInfo: tipInfo });
            this.setState({ showAddonAlert: false });

            // <---------------------------------------------------Manual prize pool start----------------------------------->
            if (data.NewHand.attr.enableManualDistribution === "true") {
                this.setState({ manualPrizePoolshwow: true, manualDistributionType: data.NewHand.attr.manualDistributionType, showTourneyInfoBoard: false })

            } else if (data.NewHand.attr.enableManualDistribution === "false") {
                this.setState({ manualPrizePoolshwow: false })
            }
            // <---------------------------------------------------Manual prize pool end----------------------------------->
        }

        // <-------------------------------------------hide  stack and hide name for declared "GetGameState"-->start------------------------>
        this._tableNetwork.send('<GetGameState/>');
        // <-------------------------------------------hide  stack and hide name for declared "GetGameState"--> end------------------------>
    }

    onDealer(data) {
        console.log("dealer data  ", data);
        if (data.Dealer.hasOwnProperty("attr")) {
            if (data.Dealer.attr.hasOwnProperty("number")) {
                this.seatsRef.current.onDealer(this.state.seatCnt, data.Dealer.attr.number);
                this.setState({ dealerSeat: data.Dealer.attr.number });
                // this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> <span style = color:#ff0000>${this.state.seats.Seat[data.Dealer.attr.number].name}</span> Dealing the Cards ` });
                this.setState({ infoChat: ` Dealer: <span style = color:#ff0000> ${this.state.seats.Seat[data.Dealer.attr.number].name} </span> Dealing the Cards ` });
            }
        }
        else {
            // this.seatsRef.current.onDealer(this.state.seatCnt, undefined);
        }
    }

    handleCallback(data) {
        let options = this.state.options;
        options.valuepot = data;
        this.setState({ options: options });
    }
    callRitTwo = (value, checked) => {
        this.setState({ rittwicestatus: checked })
        if (checked) {
            this._tableNetwork.send(`<AutoAcceptRIT accept="true"/>`);
        } else {
            this._tableNetwork.send(`<AutoAcceptRIT accept="false"/>`);
        }
        this.seatsRef.current.enableTwoX(checked);
    }

    onActiveChange(data) {
        let options = { ...this.state.options };
        if (Array.isArray(data.ActiveChange)) {
            let i = 0,
                cnt = data.ActiveChange.length;
            options.action = [];
            for (i; i < cnt; i++) {
                if (data.ActiveChange[i].hasOwnProperty("Actions")) {
                    if (data.ActiveChange[i].Actions.hasOwnProperty("RunItTwice")) {
                        if (this.state.rittwicestatus) {
                            this._tableNetwork.send(`<RunItTwice accept="true"/>`);
                        }

                        else {
                            if (Number(data.ActiveChange[i].attr.seat) === Number(this.player.id)) {
                                this.startTimer(data.ActiveChange[i].attr.seat, Number(data.ActiveChange[i].attr.startTime), Number(data.ActiveChange[i].attr.time), 0);
                                options.action.push({ name: "Run It Twice", amount: "" });
                                options.action.push({ name: "Run It Once", amount: "" });
                                options.showFold = false;
                                options.showCheck = false;
                                options.showBet = false;
                                options.showCall = false;
                                options.showRaise = false;
                                options.RunITTwice = false;
                            }
                            setTimeout(() => {

                                this.setState({ options: options });
                            }, 20)

                        }

                    }
                }
            }
        }
        if (data.ActiveChange.hasOwnProperty("attr")) {
            if (data.ActiveChange.attr.hasOwnProperty("seat")) {
                this.startTimer(data.ActiveChange.attr.seat, Number(data.ActiveChange.attr.startTime), Number(data.ActiveChange.attr.time), Number(data.ActiveChange.attr.timeBank));
                if (data.ActiveChange.attr.seat === this.player.id) {
                    console.log(`=====================My Action on ${this.tableId} ======================`);
                    options.showQuickBets = false;
                    options.showgamecontr = "visible";
                    options.showFold = false;
                    options.showCheck = false;
                    options.showBet = false;
                    options.showCall = false;
                    options.showRaise = false;

                    if (data.ActiveChange.hasOwnProperty("Actions")) {
                        let actions = Object.keys(data.ActiveChange.Actions);
                        let cnt = actions.length,
                            i = 0;
                        options.cnt = cnt;
                        options.seatId = data.ActiveChange.attr.seat;
                        if (data.ActiveChange.Actions.hasOwnProperty("Bet") || data.ActiveChange.Actions.hasOwnProperty("Raise")) {
                            options.showSlider = true;
                        } else {
                            options.showSlider = false;
                        }
                        options.action = [];
                        console.log(data.ActiveChange);

                        for (i; i < cnt; i++) {
                            if (data.ActiveChange.Actions[actions[i]].hasOwnProperty("attr")) {
                                if (data.ActiveChange.Actions[actions[i]].attr.hasOwnProperty("amount")) {
                                    options.action.push({ name: actions[i], amount: data.ActiveChange.Actions[actions[i]].attr.amount });
                                } else if (data.ActiveChange.Actions[actions[i]].attr.hasOwnProperty("max")) {
                                    options.rangeMax = data.ActiveChange.Actions[actions[i]].attr.max;
                                    // console.log("Allin",data.ActiveChange.Seats.Seat[this.player.id].PlayerInfo.Chips.attr["stack-size"])
                                    console.log("Allin", data.ActiveChange[this.player.id])

                                    if (data.ActiveChange.Actions[actions[i]].attr.hasOwnProperty("min")) {
                                        options.rangeMin = data.ActiveChange.Actions[actions[i]].attr.min;
                                        options.action.push({ name: actions[i], amount: data.ActiveChange.Actions[actions[i]].attr.min });
                                        options.RunITTwice = true;
                                    }
                                } else {
                                    options.rangeMax = 0;
                                    options.rangeMin = 0;
                                }
                            } else {
                                if (actions[i] !== "RunItTwice") {
                                    options.action.push({ name: actions[i], amount: "" });
                                    options.RunITTwice = true;
                                } else {
                                    options.action.push({ name: "Run It Twice", amount: "" });
                                    options.action.push({ name: "Run It Once", amount: "" });
                                    options.RunITTwice = false;
                                }
                            }
                        }
                        if (Number(options.rangeMin) === Number(options.rangeMax)) {
                            options.showSlider = false;
                            options.show2x = false;
                            options.show3x = false;
                            options.show1by2 = false;
                            options.show1by3 = false;
                            options.show2by3 = false;
                            options.showpot = false;
                        } else {
                            let num1 = Number(options.rangeMin) * 2;
                            let num2 = Number(options.rangeMin) * 3;
                            // let num3 = Math.floor(Number(options.valuepot) / 2);
                            // let num4 = Math.floor(Number(options.valuepot) / 3);
                            // let num5 = Math.floor((2 * Number(options.valuepot)) / 3);
                            let num3 = (Number(options.valuepot) / 2).toFixed(2);
                            let num4 = (Number(options.valuepot) / 3).toFixed(2);
                            let num5 = ((2 * Number(options.valuepot)) / 3).toFixed(2);

                            if (num1 < options.rangeMax) {
                                options.show2x = true;
                                options.value2x = num1;
                            } else {
                                options.show2x = false;
                            }
                            if (num2 < options.rangeMax) {
                                options.show3x = true;
                                options.value3x = num2;
                            } else {
                                options.show3x = false;
                            }
                            if (num3 < options.rangeMax && num3 !== 0 && num3 > options.rangeMin && num3 < options.rangeMax) {
                                options.show1by2 = true;
                                options.value1by2 = num3;
                            } else {
                                options.show1by2 = false;
                            }
                            if (num4 < options.rangeMax && num4 !== 0 && num4 > options.rangeMin && num4 < options.rangeMax) {
                                options.show1by3 = true;
                                options.value1by3 = num4;
                            } else {
                                options.show1by3 = false;
                            }
                            if (num5 < options.rangeMax && num5 !== 0 && num5 > options.rangeMin && num5 < options.rangeMax) {
                                options.show2by3 = true;
                                options.value2by3 = num5;
                            } else {
                                options.show2by3 = false;
                            }
                            if (options.valuepot < options.rangeMax && options.valuepot !== 0 && options.valuepot > options.rangeMin && options.valuepot < options.rangeMax) {
                                options.showpot = true;
                                options.valuepot = options.valuepot;
                            } else {
                                options.showpot = false;
                            }
                            options.showFold = false;
                            options.showCheck = false;
                            options.showBet = false;
                            options.showCall = false;
                            options.showRaise = false;
                        }
                        // let tab = window.parent.document.getElementsByClassName(`tableid0=${this.tableId}`)[0];
                        // if (tab && tab.dataset.isactive == "false") {
                        //     tab.style.animation = "loadImgs 0.5s infinite";
                        //     tab.style.background = "aqua";
                        //     // let id = tab.id;
                        // tab.innerHTML = this.getLastcards(this.playerCards);
                        // }

                        // let cTab = this.isTourney ? null : window.parent.document.getElementById(`c-tables-tab`);
                        // // console.log("====>> Cash tables tab: ", cTab, cTab.dataset.isactive);
                        // if (cTab && cTab.dataset.isactive == "true") {
                        //     cTab.style.animation = "loadImgs 0.5s infinite";
                        //     cTab.style.background = "aqua";
                        //     cTab.style.color = "black";
                        // }

                        let tab = document.getElementById(this.tableId);
                        if (tab && tab.dataset.isactive == "false") {
                            //     tab.style.animation = "loadImgs 0.5s infinite";
                            //     tab.style.background = "aqua";
                            //     // let id = tab.id;
                            tab.innerHTML = this.getLastcards(this.playerCards);
                        }
                        // let cTab = document.getElementById(`c-tables-tab`);
                        // console.log("====>> Cash tables tab: ", cTab, cTab.dataset.isactive);
                        // if (cTab && cTab.dataset.name == "c-tables") {
                        //     cTab.style.animation = "loadImgs 0.5s infinite";
                        //     cTab.style.background = "aqua";
                        //     cTab.style.color = "black";
                        // }

                        // let cTab = this.isTourney ? null : window.parent.document.getElementById(`c-tables-tab`);
                        // // console.log("====>> Cash tables tab: ", cTab, cTab.dataset.isactive);
                        // if (cTab && cTab.dataset.isactive == "true") {
                        //     cTab.style.animation = "loadImgs 0.5s infinite";
                        //     cTab.style.background = "aqua";
                        //     cTab.style.color = "black";
                        // }

                        setTimeout(() => {
                            this.setState({ options: options });
                        }, 20);
                    }
                } else {

                    if (data.ActiveChange.hasOwnProperty("Actions")) {

                        if (data.ActiveChange.Actions.hasOwnProperty("Call") && data.ActiveChange.Actions.hasOwnProperty("Raise")) {
                            let obj = { "Call Any": "", "Raise Any": "" };
                            Object.assign(data.ActiveChange.Actions, obj);
                        } else if (data.ActiveChange.Actions.hasOwnProperty("Check") && data.ActiveChange.Actions.hasOwnProperty("Raise")) {
                            let obj = { "Check/Fold": "" };
                            Object.assign(data.ActiveChange.Actions, obj);
                        } else if (data.ActiveChange.Actions.hasOwnProperty("Check") && data.ActiveChange.Actions.hasOwnProperty("Bet")) {
                            let obj = { "Check/Fold": "", "Call Any": "", "Raise Any": "" };
                            Object.assign(data.ActiveChange.Actions, obj);
                        }
                        let options = this.state.options;
                        let actions = Object.keys(data.ActiveChange.Actions);
                        options.showQuickBets = true;
                        let cnt = actions.length,
                            j = 0;
                        options.cnt = cnt;
                        options.quickAction = [];
                        for (j; j < cnt; j++) {
                            if (data.ActiveChange.Actions[actions[j]].hasOwnProperty("attr")) {
                                if (data.ActiveChange.Actions[actions[j]].attr.hasOwnProperty("amount")) {
                                    // options.quickAction.push({ name: actions[j], amount: data.ActiveChange.Actions[actions[j]].attr.amount });
                                    options.quickAction.push({ name: actions[j], amount: UM.changeAmtLabel(Number(data.ActiveChange.Actions[actions[j]].attr.amount)) });
                                } else if (data.ActiveChange.Actions[actions[j]].attr.hasOwnProperty("max")) {
                                    options.rangeMax = data.ActiveChange.Actions[actions[j]].attr.max;
                                    if (data.ActiveChange.Actions[actions[j]].attr.hasOwnProperty("min")) {
                                        options.rangeMin = 0;
                                        options.rangeMin = data.ActiveChange.Actions[actions[j]].attr.min;
                                        // options.quickAction.push({ name: actions[j], amount: data.ActiveChange.Actions[actions[j]].attr.min });
                                        options.quickAction.push({ name: actions[j], amount: UM.changeAmtLabel(Number(data.ActiveChange.Actions[actions[j]].attr.min)) });
                                    }
                                } else {
                                    options.rangeMax = 0;
                                    options.rangeMin = 0;
                                }
                            } else {
                                options.quickAction.push({ name: actions[j], amount: "" });
                            }
                        }
                        setTimeout(() => {
                            this.setState({ options: options });
                        }, 20)


                        if (data.ActiveChange.Actions.hasOwnProperty("Fold")) {
                            options.showFold = true;
                        }
                        if (data.ActiveChange.Actions.hasOwnProperty("Check")) {
                            options.showCheck = true;
                        }
                        if (data.ActiveChange.Actions.hasOwnProperty("Bet")) {
                            options.showBet = true;
                        }
                        if (data.ActiveChange.Actions.hasOwnProperty("Call")) {
                            options.showCall = true;
                        }
                        if (data.ActiveChange.Actions.hasOwnProperty("Raise")) {
                            options.showRaise = true;
                        }
                    } else {
                        options.showFold = false;
                        options.showCheck = false;
                        options.showBet = false;
                        options.showCall = false;
                        options.showRaise = false;
                    }
                    options.showSlider = false;
                    options.show2x = false;
                    options.show3x = false;
                    options.show1by2 = false;
                    options.show1by3 = false;
                    options.show2by3 = false;
                    options.showpot = false;


                    // options.action = []
                    options.showgamecontr = "hidden";
                    this.setState({ options: options });
                    console.log("games8", options)
                }
            }
        }
    };

    getLastcards(cards) {
        if (cards.length) {
            return cards.reduce((ac, card) => {
                return (ac += `<img className="tab-card" width = 15px height = 24px src=chatCards/${card}.png />`);
            }, "");
        } else {
            // return isTabCards ? `<span>${id}</span>` : "";
            return `<span></span>`;
        }
    }

    async onDetermineDealer(data) {
        this.setState({ showBreakAlert: false });
        this.setState({ showWaitForRebuy: false });
        this.setState({ waitRebuyAlert: { show: false, time: 0, name: "" } });

        await this.seatsRef.current.onDetermineDealer(data);
    }

    async onDealingCards(data) {
        // console.log(">>> dealing player cards: ", data);
        this.cards = [];
        this.playerCards = [];
        this.setState({ showBreakAlert: false });
        this.seatsRef.current.onDealingCards(data);
        if (data.DealingCards.hasOwnProperty("Seat")) {
            let i = 0,
                cnt = data.DealingCards.Seat.length;
            for (i; i < cnt; i++) {
                let index = data.DealingCards.Seat[i].attr.id;
                if (data.DealingCards.Seat[i].hasOwnProperty("Cards")) {
                    if (data.DealingCards.Seat[i].Cards.hasOwnProperty("Card")) {
                        let j = 0,
                            cnt2 = data.DealingCards.Seat[i].Cards.Card.length;
                        // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> Dealing Player Cards ` });
                        getShowDealerMessage() && this.setState({ infoChat: ` Dealer: Dealing Player Cards ` });
                        if (Number(this.player.id) === Number(index)) {
                            for (j; j < cnt2; j++) {
                                let card = fileName.name !== "Riverpoker" ? data.DealingCards.Seat[i].Cards.Card[j]["#text"] : this.decryptCards(data.DealingCards.Seat[i].Cards.Card[j]["#text"]) == '' ? "xx" : this.decryptCards(data.DealingCards.Seat[i].Cards.Card[j]["#text"]);
                                this.playerCards.push(card)
                            }
                        }

                    }
                }
            }

            let tab = document.getElementById(this.tableId);
            try {
                if (tab != null) {
                    tab.innerHTML = this.getLastcards(this.playerCards);
                }
                // this.playerCards = this.playerCards;
            } catch (e) { console.error(e.message) }

        }
    }

    decryptCards(card) {
        var sessionData = JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_sid'`));
        var encryptDecrypt = new window.EncryptDecrypt(128, 2, "566e4a61fd3220031fa17ebd846c8ec0", "c4c7712d6f62c4f8c40dd2248a029a8a");
        if (card) {
            return encryptDecrypt.decrypt(`${sessionData.sid}`, card);
        }
        return "xx";
    }

    onDealingFlop(data) {
        let ritFlop = this.state.ritFlop;
        if (data.DealingFlop.hasOwnProperty("Cards")) {
            if (data.DealingFlop.Cards.hasOwnProperty("Card")) {
                let i = 0,
                    cnt = data.DealingFlop.Cards.Card.length;
                // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> Dealing Flop Cards ` });
                getShowDealerMessage() && this.setState({ infoChat: ` Dealer: Dealing Flop Cards ` });
                for (i; i < cnt; i++) {
                    switch (i) {
                        case 0:
                            this.boardCardsRef.current.addCards("flopZero", data.DealingFlop.Cards.Card[i]["#text"], 0);
                            ritFlop.cardOne = data.DealingFlop.Cards.Card[i]["#text"];
                            break;
                        case 1:
                            this.boardCardsRef.current.addCards("flopOne", data.DealingFlop.Cards.Card[i]["#text"], 150);
                            ritFlop.cardTwo = data.DealingFlop.Cards.Card[i]["#text"];
                            break;
                        case 2:
                            this.boardCardsRef.current.addCards("flopTwo", data.DealingFlop.Cards.Card[i]["#text"], 300);
                            ritFlop.cardThree = data.DealingFlop.Cards.Card[i]["#text"];
                            break;
                        default:
                            break;
                    }
                    // this.cards_table = this.cards_table + "  " + data.DealingFlop.Cards.Card[i]["#text"];
                    this.cards.push(data.DealingFlop.Cards.Card[i]["#text"]);
                }
            }
            this.setState({ ritFlop: ritFlop });
            getShowDealerMessage() && this.setState({ infoChat: this.getLastcards(this.cards) });
        }
    }

    onDealingTurn(data) {
        let ritFlop = this.state.ritFlop;
        if (data.DealingTurn.hasOwnProperty("Cards")) {
            if (data.DealingTurn.Cards.hasOwnProperty("Card")) {
                // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> Dealing Turn Card ` });
                getShowDealerMessage() && this.setState({ infoChat: ` Dealer: Dealing Turn Card ` });
                this.boardCardsRef.current.addCards("turn", data.DealingTurn.Cards.Card["#text"], 0);
                // this.cards_table = this.cards_table + "  " + data.DealingTurn.Cards.Card["#text"];
                ritFlop.cardTurn = data.DealingTurn.Cards.Card["#text"];
                this.cards.push(data.DealingTurn.Cards.Card["#text"]);
            }
            getShowDealerMessage() && this.setState({ infoChat: this.getLastcards(this.cards) });
        }
    }

    onDealingRiver(data) {
        let ritFlop = this.state.ritFlop;
        if (data.DealingRiver.hasOwnProperty("Cards")) {
            if (data.DealingRiver.Cards.hasOwnProperty("Card")) {
                // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> Dealing River Card ` });
                getShowDealerMessage() && this.setState({ infoChat: ` Dealer: Dealing River Card ` });
                this.boardCardsRef.current.addCards("river", data.DealingRiver.Cards.Card["#text"], 0);
                ritFlop.cardRiver = data.DealingRiver.Cards.Card["#text"];
                // this.cards_table = this.cards_table + "  " + data.DealingRiver.Cards.Card["#text"];
                this.cards.push(data.DealingRiver.Cards.Card["#text"]);
            }
            getShowDealerMessage() && this.setState({ infoChat: this.getLastcards(this.cards) });
        }
    }

    onCombinationChange(data) {
        console.log("onCombinationChange", data)
        if (data.CombinationChange.hasOwnProperty("attr")) {
            if (data.CombinationChange.attr.hasOwnProperty("seat")) {
                if (this.player.id === data.CombinationChange.attr.seat) {
                    this.setState({ playerCombination: data.CombinationChange.attr.strength });
                    if (data.CombinationChange.attr.hasOwnProperty("winProbability")) {
                        this.setState({ winStrength: data.CombinationChange.attr.winProbability });
                        this.setState({ showcombpercent: true });
                    } else {
                        this.setState({ winStrength: "" });
                        this.setState({ showcombpercent: false });
                    }
                } else {
                    this.seatsRef.current.onCombinationChange(data);
                }
            }
        }
    }
    onCombinationChangeALL(data) {
        console.log("onCombinationChangeALL", data)
        if (data.CombinationChange.hasOwnProperty("attr")) {
            if (data.CombinationChange.attr.hasOwnProperty("seat")) {
                this.seatsRef.current.onCombinationChangeALL(data);
            }
        }
    }

    onDealingRitFlop(data) {
        let ritFlop = this.state.ritFlop;
        if (data.DealingRitFlop.hasOwnProperty("RitCards")) {
            if (data.DealingRitFlop.RitCards.hasOwnProperty("Card")) {
                let i = 0,
                    cnt = data.DealingRitFlop.RitCards.Card.length;
                // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> Dealing RIT Flop Cards ` });
                getShowDealerMessage() && this.setState({ infoChat: ` Dealer: Dealing RIT Flop Cards ` });
                for (i; i < cnt; i++) {
                    // for (i; i < cnt; i++) {
                    switch (i) {
                        case 0:
                            if (ritFlop.cardOne !== data.DealingRitFlop.RitCards.Card[i]["#text"]) {
                                this.ritBoardCardsRef.current.addCards("flopZero", data.DealingRitFlop.RitCards.Card[i]["#text"], 0);
                            } else {
                                return;
                            }

                            break;
                        case 1:
                            if (ritFlop.cardTwo !== data.DealingRitFlop.RitCards.Card[i]["#text"]) {
                                this.ritBoardCardsRef.current.addCards("flopOne", data.DealingRitFlop.RitCards.Card[i]["#text"], 150);
                            } else {
                                return;
                            }
                            break;
                        case 2:
                            if (ritFlop.cardThree !== data.DealingRitFlop.RitCards.Card[i]["#text"]) {
                                this.ritBoardCardsRef.current.addCards("flopTwo", data.DealingRitFlop.RitCards.Card[i]["#text"], 300);
                            } else {
                                return;
                            }
                            break;
                        default:
                            break;
                    }
                    // this.cards_table = this.cards_table + "  " + data.DealingRitFlop.RitCards.Card[i]["#text"];
                    this.cards.push(data.DealingRitFlop.RitCards.Card[i]["#text"]);
                }
                // }
                getShowDealerMessage() && this.setState({ infoChat: this.getLastcards(this.cards) });
            }
        }
    }
    onDealingRitRiver(data) {
        let ritFlop = this.state.ritFlop;
        if (data.DealingRitRiver.hasOwnProperty("RitCards")) {
            if (data.DealingRitRiver.RitCards.hasOwnProperty("Card")) {
                // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> Dealing River Card ` });
                getShowDealerMessage() && this.setState({ infoChat: ` Dealer: Dealing River Card ` });
                if (ritFlop.cardRiver !== data.DealingRitRiver.RitCards.Card["#text"]) {
                    this.ritBoardCardsRef.current.addCards("river", data.DealingRitRiver.RitCards.Card["#text"], 0);
                }
                // this.cards_table = this.cards_table + "  " + data.DealingRitRiver.RitCards.Card["#text"];
                this.cards.push(data.DealingRitRiver.RitCards.Card["#text"]);
            }
            getShowDealerMessage() && this.setState({ infoChat: this.getLastcards(this.cards) });
        }
    }

    onDealingRitTurn(data) {
        let ritFlop = this.state.ritFlop;
        if (data.DealingRitTurn.hasOwnProperty("RitCards")) {
            if (data.DealingRitTurn.RitCards.hasOwnProperty("Card")) {
                // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> Dealing RIT Turn Card ` });
                getShowDealerMessage() && this.setState({ infoChat: ` Dealer: Dealing RIT Turn Card ` });
                if (ritFlop.cardTurn !== data.DealingRitTurn.RitCards.Card["#text"]) {
                    this.ritBoardCardsRef.current.addCards("turn", data.DealingRitTurn.RitCards.Card["#text"], 0);
                }
                // this.cards_table = this.cards_table + "  " + data.DealingRitTurn.RitCards.Card["#text"];
                this.cards.push(data.DealingRitTurn.RitCards.Card["#text"]);
            }
            getShowDealerMessage() && this.setState({ infoChat: this.getLastcards(this.cards) });
        }
    }

    onRitCombinationChange(data) {
        console.log("onRitCombinationChange", data)
        let cnt = data.RitCombinationChange.length;
        this.seatsRef.current.RitCombinationChange(data);
        for (var i = 0; i < cnt; i++) {
            if (data.RitCombinationChange[i].hasOwnProperty("attr")) {
                if (data.RitCombinationChange[i].attr.hasOwnProperty("seat")) {
                    if (this.player.id === data.RitCombinationChange[i].attr.seat) {
                        this.setState({ playerCombination: data.RitCombinationChange[i].attr.strength });
                        if (data.RitCombinationChange[i].attr.hasOwnProperty("winProbability")) {
                            this.setState({ winStrength: data.RitCombinationChange[i].attr.winProbability });
                            this.setState({ showcombpercent: true });
                        } else {
                            this.setState({ winStrength: "" });
                            this.setState({ showcombpercent: false });
                        }
                    }
                }
            }
        }
    }

    onPotsChange(data) {
        this.seatsRef.current.onPotsChange(data);
    }

    onRakeChange(data) {
        this.seatsRef.current.onRakeCut(data);
    }

    onWinner(data) {
        console.log("onWinner   ", this.state.callRitTwice);
        setTimeout(() => {
            this.seatsRef.current.onWinner(this.player.id, data);
        }, this.state.callRitTwice ? 1500 : 0);
        let seats = this.state.seats;
        let combination, amt, id, potIndex;

        if (data.Winner.hasOwnProperty("attr")) {
            if (data.Winner.attr.hasOwnProperty("combination")) {
                combination = data.Winner.attr.combination;
            }
            if (data.Winner.attr.hasOwnProperty("amount")) {
                amt = data.Winner.attr.amount;
            }
            if (data.Winner.attr.hasOwnProperty("seat")) {
                id = data.Winner.attr.seat;
            }
            if (data.Winner.attr.hasOwnProperty("pot")) {
                potIndex = data.Winner.attr.pot;
            }
        }

        if (combination !== undefined) {
            // this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> <span style = color:#ff6600> ${seats.Seat[id].name} won </span>  <span style = color:#fed626> ${Intl.NumberFormat('en-US').format(amt)}</span><span style = color:#ff6600> from main pot with</span> <span style = color:#fed626>${combination}</span>` });
            this.setState({ infoChat: ` Dealer: ${" "} <span style = color:#ff6600> ${seats.Seat[id].name} won </span> ${" "}  <span style = color:#fed626> ${Intl.NumberFormat('en-US').format(amt)}</span> ${" "}<span style = color:#ff6600> from main pot with </span> <span style = color:#fed626> ${combination} </span>` });
        } else {
            // this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}><span style = color:#ff6600> ${seats.Seat[id].name} won </span> <span style = color:#fed626> ${Intl.NumberFormat('en-US').format(amt)} </span><span style = color:#ff6600>from main pot </span>` });
            // this.setState({ infoChat: ` Dealer: ${" "} <span style = color:#ff6600> ${seats.Seat[id].name} won </span> ${" "} <span style = color:#fed626> ${Intl.NumberFormat('en-US').format(amt)} </span> ${" "} <span style = color:#ff6600>from main pot </span>` });
            this.setState({
                infoChat: `Dealer: <span style="color:#ff6600">${seats.Seat[id].name} won</span> 
                           <span style="color:#fed626">${Intl.NumberFormat('en-US').format(amt)}</span> 
                           <span style="color:#ff6600">from main pot</span>`
            });

        }
        if (data.Winner.hasOwnProperty("Board")) {
            this.boardCardsRef.current.showWinningCombination(data.Winner.Board.Card, this.state.boardCardXSpace);
        }
        // this.setGcActions(this.player.id)
    }

    onGetSessionStatistics(data) {
        let played, won, bets, winBets, time, buyIn, showDown;
        if (data.SessionStatistics.hasOwnProperty("Hands")) {
            played = UM.numberWithCommas(data.SessionStatistics.Hands.attr.total);
            won = UM.numberWithCommas(data.SessionStatistics.Hands.attr.won);
        }
        if (data.SessionStatistics.hasOwnProperty("attr")) {
            bets = UM.numberWithCommas(data.SessionStatistics.attr.bets);
            winBets = UM.numberWithCommas(data.SessionStatistics.attr.wins);
            time = new Date(parseInt(data.SessionStatistics.attr.sessionStartTime)).toLocaleString();
            buyIn = UM.numberWithCommas(data.SessionStatistics.attr.buyIn);
        }
        if (data.SessionStatistics.hasOwnProperty("Showdown")) {
            showDown = UM.numberWithCommas(data.SessionStatistics.Showdown.attr.total);
        }

        this.setState({
            tipStats: {
                played: played,
                won: won,
                bets: bets,
                winBets: winBets,
                time: time,
                buyIn: buyIn,
                showDown: showDown,
            },
        });
    }

    onReservedChipsChange(data) {
        if (data.ReservedChipsChange.hasOwnProperty("attr")) {
            // getShowDealerMessage() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> <span style = color:#ff0000>${Intl.NumberFormat('en-US').format(data.ReservedChipsChange.attr.amount)}</span> will be added to ${this.player.name} in the next hand` });
            getShowDealerMessage() && this.setState({ infoChat: ` Dealer: <span style = color:#ff0000>${Intl.NumberFormat('en-US').format(data.ReservedChipsChange.attr.amount)}</span> will be added to ${this.player.name} in the next hand` });
            if (data.ReservedChipsChange.attr.amount > 0) {
                this.setState({ nexthand: data.ReservedChipsChange.attr.amount })
                this.setState({ nexthandshow: false })
                setInterval(() => {
                    this.setState({ nexthandshow: true })
                }, 4000)
            }
        }
    }

    onWaitingForRebuy(data) {
        let waitForRebuy = this.state.waitForRebuy;
        if (data.WaitingForRebuy.hasOwnProperty("Seat")) {
            if (data.WaitingForRebuy.Seat.hasOwnProperty("attr")) {
                if (data.WaitingForRebuy.Seat.attr.hasOwnProperty("id")) {
                    let index = data.WaitingForRebuy.Seat.attr.id;
                    if (data.WaitingForRebuy.hasOwnProperty("attr")) {
                        waitForRebuy.time = data.WaitingForRebuy.attr.time;
                        if (Number(this.player.id) === Number(index) && this.state.textvariable) {
                            if (Number(this.player.id) === Number(index)) {
                                switch (this.state.addrebuysetting) {
                                    case "show":
                                        this.setState({ showWaitForRebuy: true });
                                        break;
                                    case "hide":
                                        this._tableNetwork.send("<ReBuy/>");
                                        // this.setState({ nexthandshow: false, showWaitForRebuy: false });
                                        // this.setState({ nexthand: "successfully add rebuy chips " });
                                        this.setState({ nexthandshow_t: false, showWaitForRebuy: false });
                                        this.setState({ nexthand_t: `Successfully you can add ${Number(this.state.waitForRebuy.chips).toLocaleString("en-US")} at the cost of ${Number(this.state.waitForRebuy.cost).toLocaleString("en-US")}` });
                                        setInterval(() => {
                                            this.setState({ nexthandshow_t: true });
                                        }, 10000);
                                        break;
                                    case "show2x":
                                        this.setState({ showWaitForRebuy: true });
                                        break;
                                    case "hide2x":
                                        this._tableNetwork.send('<ReBuy number="2" />');
                                        // this.setState({ nexthandshow: false, showWaitForRebuy: false });
                                        // this.setState({ nexthand: "successfully add rebuy 2x chips " });
                                        this.setState({ nexthandshow_t: false, showWaitForRebuy: false });
                                        this.setState({ nexthand_t: `Successfully you can add ${(Number(this.state.waitForRebuy.chips) * 2).toLocaleString("en-US")} at the cost of ${(Number(this.state.waitForRebuy.cost) * 2).toLocaleString("en-US")}` });
                                        setInterval(() => {
                                            this.setState({ nexthandshow_t: true });
                                        }, 10000);
                                        break;
                                    default:
                                        this.setState({ showWaitForRebuy: true });
                                        break;
                                }
                            }

                            this.setState({ showTourneyInfoBoard: false });
                            this.setState({ waitForRebuy: waitForRebuy });
                        } else {
                            this.setState({ waitRebuyAlert: { show: true, time: data.WaitingForRebuy.attr.time, name: "" }, showTourneyInfoBoard: false });
                        }
                    }
                }
            }
        }
    }
    onBreakTime(data) {
        const d = new Date();
        let tOne = data.breakTime;
        let tTwo = Math.abs(Number(Date.parse(d)) - Number(tOne)) / 1000;
        let secOne = Math.trunc(tTwo % 60);
        let minOne = Math.trunc(tTwo / 60);
        // let relax = `${minOne} min ${secOne} sec`;

        let breakalert = this.state.breakalert;
        breakalert.lineOne = "tournament begins in";
        breakalert.timeOne = Date.now();
        breakalert.timeTwo = +(minOne * 60000) + +(secOne * 1000);

        this.setState({ breakalert: breakalert });
        this.setState({ showBreakAlert: true, showTourneyInfoBoard: false });
    };

    onTournamentInfoChange(data) {
        let waitForRebuy = this.state.waitForRebuy;
        let tourneyInfoBoard = this.state.tourneyInfoBoard;
        if (data.TournamentInfoChange.hasOwnProperty("TournamentInfo")) {
            if (data.TournamentInfoChange.TournamentInfo.hasOwnProperty("attr")) {
                if (data.TournamentInfoChange.TournamentInfo.attr.status === "COMPLETED") {
                    clearTimeout(this.breaktime);
                    this.setState({ welcomeText: "Tournament Completed" });
                    this.seatsRef.current.clearTheTableSeats(0);
                    this.props.TableHandler("closeTourneyTable", { id: this.tableId });
                    this.breaktime = setTimeout(() => {
                        this._tableNetwork.send("<LeaveTable/>");
                        this.setPopUpActions("hideExitAlert");
                        this.setState({ showTplayerRankAlert: false });
                    }, 5000)
                }
                if (data.TournamentInfoChange.TournamentInfo.attr.status === "PAUSED") {
                    this.setState({ welcomeText: data.TournamentInfoChange.TournamentInfo.attr.statusDescription });
                }
            }
            if (data.TournamentInfoChange.TournamentInfo.hasOwnProperty("Rebuy")) {
                waitForRebuy.count = data.TournamentInfoChange.TournamentInfo.Rebuy.attr.count;
                waitForRebuy.chips = data.TournamentInfoChange.TournamentInfo.Rebuy.attr.chips;
                waitForRebuy.cost = data.TournamentInfoChange.TournamentInfo.Rebuy.attr.cost;
            }
            this.setState({ waitForRebuy: waitForRebuy });

            let TournamentRebuys = this.state.TournamentRebuy
            if (data.TournamentInfoChange.TournamentInfo.hasOwnProperty("Rebuy")) {
                TournamentRebuys.Popup = true;
                TournamentRebuys.Rebuybtn = true
                TournamentRebuys.count = data.TournamentInfoChange.TournamentInfo.Rebuy.attr.count;
                TournamentRebuys.cost = data.TournamentInfoChange.TournamentInfo.Rebuy.attr.cost;
                TournamentRebuys.fee = data.TournamentInfoChange.TournamentInfo.Rebuy.attr.fee;
                TournamentRebuys.chips = data.TournamentInfoChange.TournamentInfo.Rebuy.attr.chips;
            } else {
                TournamentRebuys.Popup = false;
                this.setState({ showTournamentRebuy: false })
            }
            if (data.TournamentInfoChange.TournamentInfo.hasOwnProperty("Addon")) {
                TournamentRebuys.Rebuybtn = false
                TournamentRebuys.count = data.TournamentInfoChange.TournamentInfo.Addon.attr.count;
                TournamentRebuys.cost = data.TournamentInfoChange.TournamentInfo.Addon.attr.cost;
                TournamentRebuys.fee = data.TournamentInfoChange.TournamentInfo.Addon.attr.fee;
                TournamentRebuys.chips = data.TournamentInfoChange.TournamentInfo.Addon.attr.chips;
            }
            this.setState({ TournamentRebuy: TournamentRebuys })
            // let TournamentRebuys=this.state.TournamentRebuy
            // if(data.GameState.TournamentInfo.hasOwnProperty("Rebuy")&&this.state.showTournamentRebuy){
            //     TournamentRebuys.Popup=true;
            //     TournamentRebuys.count= data.GameState.TournamentInfo.Rebuy.attr.count;
            //     TournamentRebuys.cost= data.GameState.TournamentInfo.Rebuy.attr.cost;
            //     TournamentRebuys.fee= data.GameState.TournamentInfo.Rebuy.attr.fee;
            //     TournamentRebuys.chips= data.GameState.TournamentInfo.Rebuy.attr.chips;
            // }else{
            //     TournamentRebuys.Popup=false;
            //     this.setState({showTournamentRebuy:false})
            // }
            // this.setState({TournamentRebuy:TournamentRebuys})

            if (data.TournamentInfoChange.TournamentInfo.hasOwnProperty("CurrentLevel")) {
                tourneyInfoBoard.cStakes = UM.numberWithCommas(data.TournamentInfoChange.TournamentInfo.CurrentLevel.attr.lowStake) + "/" + UM.numberWithCommas(data.TournamentInfoChange.TournamentInfo.CurrentLevel.attr.highStake);
                tourneyInfoBoard.cLevel = data.TournamentInfoChange.TournamentInfo.CurrentLevel.attr.number;
            }
            if (data.TournamentInfoChange.TournamentInfo.hasOwnProperty("NextLevel")) {
                tourneyInfoBoard.nLevel = data.TournamentInfoChange.TournamentInfo.NextLevel.attr.number;
                tourneyInfoBoard.nStakes = UM.numberWithCommas(data.TournamentInfoChange.TournamentInfo.NextLevel.attr.lowStake) + "/" + UM.numberWithCommas(data.TournamentInfoChange.TournamentInfo.NextLevel.attr.highStake);
                this.setState({ tourneyInfoBoard: tourneyInfoBoard });
            }
            if (data.TournamentInfoChange.TournamentInfo.hasOwnProperty("Break")) {
                // this.setState({ showBreakAlert: false });
                let t = data.TournamentInfoChange.TournamentInfo.Break.attr.periodFrom;
                // let t2 = Math.abs(Number(Date.now()) - Number(t)) / 1000;
                let t2 = Math.abs(Date.now() - new Date(t).getTime()) / 1000;

                let sec = Math.trunc(t2 % 60);
                let min = Math.trunc(t2 / 60);
                tourneyInfoBoard.breakTime = `${min} min ${sec} sec`;
                // console.log(`${min} min ${sec} sec`)
                this.setState({ tourneyInfoBoard: tourneyInfoBoard });
            }

            if (this.state.textvariable) {
                if (data.TournamentInfoChange.TournamentInfo.hasOwnProperty("Rebuy")) {
                    waitForRebuy.count = data.TournamentInfoChange.TournamentInfo.Rebuy.attr.count;
                    waitForRebuy.chips = data.TournamentInfoChange.TournamentInfo.Rebuy.attr.chips;
                    waitForRebuy.cost = data.TournamentInfoChange.TournamentInfo.Rebuy.attr.cost;
                }
                this.setState({ waitForRebuy: waitForRebuy });

                if (data.TournamentInfoChange.TournamentInfo.hasOwnProperty("Addon")) {
                    if (Number(data.TournamentInfoChange.TournamentInfo.Addon.attr.count) > 0) {

                        // if (this.player.id) {
                        switch (this.state.addonsetting) {
                            case "hide":
                                this._tableNetwork.send('<ReBuy/>');
                                this.setState({ showAddonAlert: false });
                                break;
                            case "show":
                                this.setState({ addonData: `You can add ${UM.changeAmtLabel(data.TournamentInfoChange.TournamentInfo.Addon.attr.chips)} at the cost of ${UM.changeAmtLabel(data.TournamentInfoChange.TournamentInfo.Addon.attr.cost)}` })
                                this.setState({ showAddonAlert: true });
                                break;
                            default:
                                break;
                        }
                        if (Number(data.TournamentInfoChange.TournamentInfo.Addon.attr.count) <= 0) {
                            this.setState({ showAddonAlert: false });
                        }
                        // }
                    }
                    this.setState({ addonData: `You can add ${UM.changeAmtLabel(data.TournamentInfoChange.TournamentInfo.Addon.attr.chips)} at the cost of ${UM.changeAmtLabel(data.TournamentInfoChange.TournamentInfo.Addon.attr.cost)}` })
                    this.setState({ showTourneyInfoBoard: false });
                } else {
                    this.setState({ showAddonAlert: false });
                }
            }
        }
    }
    onKnockoutPayouts(data) {
        this.setState({ knoutdetailsboolean: true, knoutdetails: data })
    }

    onTournamentPlayerRanked(data) {
        let tplayerRankAlert = this.state.tplayerRankAlert;
        // this.props.TableHandler("closeTourneyTable", { id: this.tableId });
        if (Array.isArray(data.TournamentPlayerRanked)) {
            let i = 0,
                cnt = data.TournamentPlayerRanked.length;
            for (i; i < cnt; i++) {
                if (data.TournamentPlayerRanked[i].hasOwnProperty("attr")) {
                    let nickName = data.TournamentPlayerRanked[i].attr.nickname;
                    if (nickName === this.player.name) {
                        // tplayerRankAlert.lineOne = `You took the ${Number(data.TournamentPlayerRanked[i].attr.placeTo).toLocaleString("en-US")} place`;
                        // tplayerRankAlert.lineTwo = `amount: ${Number(data.TournamentPlayerRanked[i].attr.cashPayout).toLocaleString("en-US")}`;
                        tplayerRankAlert.lineOne = `You took the ${data.TournamentPlayerRanked[i].attr.placeTo} place.`;
                        tplayerRankAlert.lineTwo = `prize amount is ${UM.numberWithCommas(data.TournamentPlayerRanked[i].attr.cashPayout)}.`;
                        this.setState({ tplayerRankAlert: tplayerRankAlert });
                        this.setState({ showTplayerRankAlert: true, showTourneyInfoBoard: false });
                        // setTimeout(() => {
                        //     this.setPopUpActions("hideTplayerAlert");
                        // }, 4000);
                    }
                    if (this.state.knoutdetailsboolean) {
                        if (Array.isArray(this.state.knoutdetails.KnockoutPayouts.KnockoutPayout)) {
                            if (data.TournamentPlayerRanked[i].hasOwnProperty("attr")) {
                                if (this.state.knoutdetails.KnockoutPayouts.KnockoutPayout[i] !== undefined) {
                                    if (this.state.knoutdetails.KnockoutPayouts.KnockoutPayout[i].hasOwnProperty("attr")) {
                                        if (Number(this.state.knoutdetails.KnockoutPayouts.KnockoutPayout[i].attr.busted) === Number(data.TournamentPlayerRanked[i].attr.seat)) {
                                            let hidename = data.TournamentPlayerRanked[i].attr.nickname
                                            let tshowKnoutbustedAlert = this.state.tshowKnoutbustedAlert;
                                            if (Number(this.state.knoutdetails.KnockoutPayouts.KnockoutPayout[i].attr.seat) === Number(this.player.id)) {
                                                // alert("you have been award ARS "+this.state.knoutdetails.KnockoutPayouts.KnockoutPayout.attr.amount+"for busted player is "+hidename)
                                                tshowKnoutbustedAlert.lineOne = `You have been award ${fileName.name === "Riverpoker" ? 'CHP' : 'ARS'}  ${Number(this.state.knoutdetails.KnockoutPayouts.KnockoutPayout[i].attr.amount).toLocaleString("en-US")} for busted player is ${hidename}`;
                                                // tplayerRankAlert.lineTwo = `amount: ${data.TournamentPlayerRanked[i].attr.cashPayout}`;
                                                this.setState({ tshowKnoutbustedAlert: tshowKnoutbustedAlert });
                                                this.setState({ showTplayerRankAlert: false });
                                                this.setState({ showKnoutbustedAlert: true, showTourneyInfoBoard: false });
                                                setTimeout(() => {
                                                    this.setState({ showKnoutbustedAlert: false });
                                                    this._tableNetwork.send('<GetGameState/>');
                                                }, 5000)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if (Number(this.state.knoutdetails.KnockoutPayouts.KnockoutPayout.attr.busted) === Number(data.TournamentPlayerRanked[i].attr.seat)) {
                                let hidename = data.TournamentPlayerRanked[i].attr.nickname;
                                let tshowKnoutbustedAlert = this.state.tshowKnoutbustedAlert;
                                if (Number(this.state.knoutdetails.KnockoutPayouts.KnockoutPayout.attr.seat) === Number(this.player.id)) {
                                    // alert("you have been award ARS "+this.state.knoutdetails.KnockoutPayouts.KnockoutPayout.attr.amount+"for busted player is "+hidename)
                                    tshowKnoutbustedAlert.lineOne = `You have been award ${fileName.name === "Riverpoker" ? 'CHP' : 'ARS'} ${Number(this.state.knoutdetails.KnockoutPayouts.KnockoutPayout.attr.amount).toLocaleString("en-US")} for busted player is ${hidename}`;
                                    // tplayerRankAlert.lineTwo = `amount: ${data.TournamentPlayerRanked[i].attr.cashPayout}`;
                                    this.setState({ tshowKnoutbustedAlert: tshowKnoutbustedAlert });
                                    this.setState({ showTplayerRankAlert: false });
                                    this.setState({ showKnoutbustedAlert: true, showTourneyInfoBoard: false });
                                    setTimeout(() => {
                                        this.setState({ showKnoutbustedAlert: false });
                                        this._tableNetwork.send('<GetGameState/>');
                                    }, 5000)
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (data.TournamentPlayerRanked.hasOwnProperty("attr")) {
                let nickName = data.TournamentPlayerRanked.attr.nickname;
                if (nickName === this.player.name) {
                    // tplayerRankAlert.lineOne = `You took the ${data.TournamentPlayerRanked.attr.placeTo} place`;
                    // tplayerRankAlert.lineTwo = `amount: ${Number(data.TournamentPlayerRanked.attr.cashPayout).toLocaleString("en-US")}`;
                    tplayerRankAlert.lineOne = `You took the ${data.TournamentPlayerRanked.attr.placeTo} place.`;
                    tplayerRankAlert.lineTwo = `prize amount is ${Number(data.TournamentPlayerRanked.attr.cashPayout).toLocaleString("en-US")}.`;
                    this.setState({ tplayerRankAlert: tplayerRankAlert });
                    this.setState({ showTplayerRankAlert: true, showTourneyInfoBoard: false });
                    // setTimeout(() => {
                    //     this._tableNetwork.send("<CloseTable/>");
                    // }, 5000);
                    // setTimeout(() => {
                    //     this.setPopUpActions("hideTplayerAlert");
                    // }, 4000);
                }
            }
        }



        if (this.state.knoutdetailsboolean) {
            if (Number(this.state.knoutdetails.KnockoutPayouts.KnockoutPayout?.attr?.seat) === Number(this.player.id)) {

                if (Number(this.state.knoutdetails.KnockoutPayouts.KnockoutPayout?.attr?.busted) === Number(data.TournamentPlayerRanked?.attr?.seat)) {
                    let hidename = data.TournamentPlayerRanked.attr.nickname;
                    let tshowKnoutbustedAlert = this.state.tshowKnoutbustedAlert;
                    // alert("you have been award ARS "+this.state.knoutdetails.KnockoutPayouts.KnockoutPayout.attr.amount+"for busted player is "+hidename)
                    tshowKnoutbustedAlert.lineOne = `You have been award ${fileName.name === "Riverpoker" ? 'CHP' : 'ARS'} ${Number(this.state.knoutdetails.KnockoutPayouts.KnockoutPayout.attr.amount).toLocaleString("en-US")} for busted player is ${hidename}`;
                    // tplayerRankAlert.lineTwo = `amount: ${data.TournamentPlayerRanked[i].attr.cashPayout}`;
                    this.setState({ tshowKnoutbustedAlert: tshowKnoutbustedAlert });
                    this.setState({ showTplayerRankAlert: false });
                    this.setState({ showKnoutbustedAlert: true, showTourneyInfoBoard: false });

                    setTimeout(() => {
                        this.setState({ showKnoutbustedAlert: false });
                        this._tableNetwork.send('<GetGameState/>');
                    }, 10000)
                }

            }
        }
    }

    onChatMessage(data) {
        // console.log("chat message: ", data);
        if (data.ChatMessage.attr.level === "PLAYER") {
            let id = this.players[data.ChatMessage.attr.sender];
            getShowChatBalloon() && this.seatsRef?.current?.onChatMessage(data.ChatMessage["#text"], Number(id));
            // getShowPlayerChat() && this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> <span style = color:#ff0000>${data.ChatMessage.attr.sender}</span> ${data.ChatMessage["#text"]}` });
            getShowPlayerChat() && this.setState({ infoChat: ` Dealer: <span style = color:#ff0000>${data.ChatMessage.attr.sender}</span> ${data.ChatMessage["#text"]}` });
        }

        if (data.ChatMessage.hasOwnProperty("attr")) {
            if (data.ChatMessage.attr.level === "INFO") {
                try {
                    if (String(data.ChatMessage["#text"]) === "Congratulations! You are on final table" && this.state.textvariable) {
                        this.setState({ nexthandshow_t: false, nexthand_t: data.ChatMessage["#text"] })
                        setTimeout(() => {
                            this.setState({ nexthandshow_t: true, nexthand_t: "" })
                        }, 3000)
                    }
                    var matches = data.ChatMessage["#text"].match(/[0-9]+/g)
                    // console.log(matches[0], "<--                    --->", matches[1])
                    if ((Number(matches[0])) > 0 && (Number(matches[1])) >= 0) {
                        this.setState({ showTimerBreak: true });
                        let timeseconds = (((Number(matches[0])) * 60) + (Number(matches[1])))
                        this.myRef.current.childMethod(timeseconds)




                        let sec = Math.trunc(timeseconds % 60);
                        let min = Math.trunc(timeseconds / 60);
                        this.setState({ AddonBreak: { mins: min, secs: sec } })



                        // this.breaktime = setTimeout(() => {
                        //     clearTimeout(this.breaktime)
                        //     this.setState({ showTimerBreak: false })
                        // },
                        //     (timeseconds) * 1000);
                    } else if (Number(matches[0]) > 0) {
                        this.setState({ showTimerBreak: true })
                        let timeseconds = (Number(matches[0]))


                        let sec = Math.trunc(timeseconds % 60);
                        let min = Math.trunc(timeseconds / 60);
                        this.setState({ AddonBreak: { mins: min, secs: sec } })


                        this.myRef.current.childMethod(timeseconds)
                        // this.breaktime = setTimeout(() => {
                        //     this.setState({ showTimerBreak: false })
                        //     clearTimeout(this.breaktime)
                        // }, (timeseconds) * 1000);
                    }

                    let breakalert = this.state.breakalert;
                    breakalert.lineOne = "tournament is on Break";
                    breakalert.timeOne = Date.now();
                    breakalert.timeTwo = Number(matches[0]) * 1000;
                    this.setState({ breakalert: breakalert });
                    this.setState({ showBreakAlert: false, showTourneyInfoBoard: false });
                    this.setState({ showTourneyInfoBoard: false });
                } catch (error) {
                    console.log(error)
                }
                // this.setState({ showTimerBreak: true })
                // var matches = data.ChatMessage["#text"].match(/[0-9]+/g)
                // console.log("timer" + data.ChatMessage["#text"])
                // getShowPlayerChat() && this.setState({ infoChat: `[${this.time}] <img src = ${dIcon}> ${data.ChatMessage["#text"]}` });
                getShowPlayerChat() && this.setState({ infoChat: ` Dealer: ${data.ChatMessage["#text"]}` });
                // this.setState({ welcomeText: data.ChatMessage["#text"] });
            }

        }
    }

    checkTableBrek(state) {
        // let breakalert = this.state.breakalert;
        // if (this._tableNetwork && state[0]?.id === this.tableId) {
        // if (!this.state.showAddonAlert && !this.state.showTimerBreak && this.playerCards[0] === "xx" && breakalert.lineOne === "") {
        // if (!this.state.showAddonAlert && !this.state.showTimerBreak && !this.playerCards.length) {

        // if (state[0]?.id === this.tableId) {
        //     console.log(this.state.gameStateIsUpdated, !this.state.showTimerBreak, this.state.tournamentIsOnBreak, this.playerCards[0] === "xx", this.playerCards.length)
        //     // this.setState({ tournamentIsOnBreak: true });
        //     if (!this.state.showTimerBreak && !this.state.showAddonAlert && this.playerCards[0] === "xx") {
        //         breakalert.lineOne = "Starting next level...";
        //         this.setState({ breakalert: breakalert, showBreakAlert: true, checkTableBrekMsg: true });
        //     }
        // }
        // }
        // }
        // }

        // this.setState({ tournamentIsOnBreak: true });
        // if (this.state.gameStateIsUpdated) {
        //     breakalert.lineOne = "Starting next level...";
        //     this.setState({ breakalert: breakalert, showBreakAlert: true, checkTableBrekMsg: true });
        // }
    }

    onGetBadBeatJackpot(data) {
        this.setState({ bbj: data.BadBeatJackpot.attr.amount });
    }
    // onJackpotPayout(data){
    //     console.log(data)
    // }


    onJackpotPayout(data) {
        console.log("Received Data:", data);

        const playerSeat = String(this.player.id);
        const jackpotWinners = data.JackpotPayout.JackpotWinner;
        if (Array.isArray(jackpotWinners)) {
            console.log(jackpotWinners)

            for (let i = 0; i < jackpotWinners.length; i++) {
                let winner = jackpotWinners[i];
                console.log(winner)

                if (winner.attr.seat === playerSeat) {

                    this.setState(prevState => ({
                        JackpotPayout: {
                            ...prevState.JackpotPayout,
                            amount: winner.attr.jackpotWinAmount
                        }
                    }));
                    setTimeout(() => {
                        this.setState(prevState => ({
                            JackpotPayout: {
                                ...prevState.JackpotPayout,
                                amount: 0
                            }
                        }));

                    }, 10000)

                    if (winner.attr.type === "HAND_WINNER") {
                        this.setState(prevState => ({
                            JackpotPayout: {
                                ...prevState.JackpotPayout,
                                HAND_WINNER: true,
                            }
                        }));

                        setTimeout(() => {
                            this.setState(prevState => ({
                                JackpotPayout: {
                                    ...prevState.JackpotPayout,
                                    HAND_WINNER: false,
                                }
                            }));
                        }, 10000);
                    }

                    if (winner.attr.type === "BAD_BEAT") {
                        this.setState(prevState => ({
                            JackpotPayout: {
                                ...prevState.JackpotPayout,
                                BAD_BEAT: true,
                            }
                        }));
                        setTimeout(() => {
                            this.setState(prevState => ({
                                JackpotPayout: {
                                    ...prevState.JackpotPayout,
                                    BAD_BEAT: false,
                                }
                            }));
                        }, 10000);
                    }
                }
            }
        }
    }


    onEndHand(data) {
        var playerCards = [];
        let tab = document.getElementById(this.tableId);
        for (let i = 0; i < this.playerCards.length; i++) {
            playerCards.push("xx");
        }

        try {
            if (tab != null) {
                tab.innerHTML = this.getLastcards(playerCards);
            }
            this.playerCards = playerCards;
        } catch (e) { console.log(e) }

        this.seatsRef.current.noTablePot();
        this.seatsRef.current.onEndHand();
        clearTimeout(this.serverResponseTime);
        this.setState({ onMoneyExchangeInfo: {}, isGetingResponse: "" });
        this.boardCardsRef.current.removeCards();
        this.ritBoardCardsRef.current.removeCards();
        // this.cards_table = "";
        this.cards = [];
        this.setState({ playerCombination: "" });
        getShowDealerMessage() && this.setState({ infoChat: `==========End Of The Hand==========` });
        getShowDealerMessage() && this.setState({ infoChat: `                                   ` });
        this.setState({ showcombpercent: false });
        // this.setState({ callRitOnce: false, callRitTwice: false, JackpotPayout: { HAND_WINNER: false, BAD_BEAT: false }, })

        // this.setGcActions(this.player.id);
        // ----------------------------bomb start-------------------------------------
        if (data.EndHand.hasOwnProperty("attr")) {
            if (data.EndHand.attr.isNextHandBombPot === "true") {
                this.setState({ bombpotanimation: true, showTourneyInfoBoard: false })
                setTimeout(() => {
                    this.setState({ bombpotanimation: false })
                }, 2600);
            } else {
                this.setState({ bombpotanimation: false })
            }
        }
        // ----------------------------bomb end-------------------------------------
        Emitter.emit("clearQuickBetOptions");
    }

    hidaAni() {
        this.setState({ showAniStage: false })
    }


    // getBackgroundTimer(time) {
    //     let timerInterval;
    //     let timeLeft = time;
    //     console.log("====================================  ", time);

    //     const pathElement = document.getElementById(this.tableId);
    //     if (pathElement) {
    //         let span1 = pathElement.querySelector('span');
    //         if (span1) {
    //             // Remove the span if it exists
    //             pathElement.removeChild(span1);
    //         }
    //     }

    //     startTimer();
    //     let span = document.createElement('span');
    //     span.style.width = "20px";
    //     span.style.height = "20px";
    //     function startTimer() {
    //         timerInterval = setInterval(() => {
    //             timeLeft -= 1;
    //             // console.log("timeLeft", timeLeft)
    //             span.textContent = timeLeft;
    //             if (timeLeft <= 1) {
    //                 clearInterval(timerInterval);
    //             }
    //         }, 1000);
    //     }
    //     span.className = 'timeLeftSpan';
    //     if (pathElement) {
    //         pathElement.appendChild(span);
    //     }
    // }



    startTimer(id, startTime, duration, timeBank) {
        this.stopTimer(id);

        let offset2 = duration > 1000 ? duration - 1000 : duration - 20;
        let min = startTime;
        let max = startTime + offset2;
        this.seatsRef.current.startTimer(this.player.id, id, min, max, offset2, timeBank);

        if (Number(this.player.id) === Number(id)) {
            let remaining = Math.round(duration / 1000);
            this.getBackgroundTimer(remaining);

            if (this.countDownTimer1) clearInterval(this.countDownTimer1);
            this.countDownTimer1 = setInterval(() => {
                if (remaining > 0) {
                    remaining -= 1;
                } else {
                    clearInterval(this.countDownTimer1);
                    this.countDownTimer1 = null;
                }
            }, 1000);
        }
    }

    stopTimer(id) {
        if (this.countDownTimer1) {
            clearInterval(this.countDownTimer1);
            this.countDownTimer1 = null;
        }
        if (this.backgroundTimer) {
            clearInterval(this.backgroundTimer);
            this.backgroundTimer = null;
        }

        this.seatsRef.current.stopTimer(id);

        const pathElement = document.getElementById(this.tableId);
        if (pathElement) {
            let span = pathElement.querySelector('span');
            if (span) {
                pathElement.removeChild(span);
            }
        }
    }

    getBackgroundTimer(time) {
        if (this.backgroundTimer) clearInterval(this.backgroundTimer);

        let timeLeft = time;
        console.log("Timer Started with: ", timeLeft);

        console.log("==================== " + time + " " + this.tableId + " ====================")

        const pathElement = document.getElementById(this.tableId);
        // console.log(pathElement)
        if (!pathElement) return;
        let span = pathElement.querySelector('span');
        // if (pathElement) {
        if (!span) {
            span = document.createElement('span');
            span.className = 'timeLeftSpan';
            span.style.width = "20px";
            span.style.height = "20px";
            span.textContent = "Test";

            if (pathElement) {
                requestAnimationFrame(() => {
                    pathElement.appendChild(span);
                    console.log("Span appended in next frame:", pathElement.children);
                });
            }
        }

        span.textContent = timeLeft;

        this.backgroundTimer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft -= 1;
                span.textContent = timeLeft;
            } else {
                clearInterval(this.backgroundTimer);
                this.backgroundTimer = null;
            }
        }, 1000);
    }



    startCountDown(id, startTime, duration, tableId) {
        let remaining = Math.round(duration / 1000);

        // if (fileName.name === "Leader_bet" && Screen.getDeviceType().name == "Mobile") {
        // this.getBackgroundTimer(remaining);
        this.countDownTimer = setInterval(() => {
            if (remaining > 0) {
                this.setState({ cDtimer: { show: true, value: remaining } });
                remaining = remaining - 1;
            } else {
                this.stopCountDown(id);
                if (this.player.id === id) {
                    this._tableNetwork.send("<TimedOut/>");
                    this.setGcActions(id);
                }
            }
        }, 1000);

        // } else {
        //     console.log("remaining Time >>>", remaining)

        // }
    }



    stopCountDown(id) {
        if (this.countDownTimer !== undefined) {
            clearInterval(this.countDownTimer);
            this.setState({ cDtimer: { show: false, value: "" } });
            // let tab = document.getElementById(this.tableId);

        }

    }

    onGetAlert(data) {
        // console.log(this.gameState)
        if (data.Alert === "You are already at seat") {
            if (this.gameState.status === "onlyMe") {
                this.seatsRef.current.AlreadySeated(this.player.id);
            }
        } else {
            let message = this.state.TournamentAlertData;
            let alert = this.state.infopanelalert;
            message.lineOne = data.Alert;
            alert.lineOne = data.Alert;
            this.setState({ infopanelalert: alert, TournamentAlertData: message });
            this.setState({ showTournamentAlert: true, showTournamentRebuy: false });
            if (data.Alert === "Table is already closed") {
                let data = {
                    id: this.tableData.tableId,
                }
                setTimeout(() => {
                    this.setState({ showTournamentAlert: false });
                    this.props.closeTTable(data);
                    this._tableNetwork.send("<LeaveTable/>");
                    this.clearTheTable();
                }, 500);
            }
        }
    }

    onGetError(data) {
        // console.log("error data: ", data);
        if (data.Error.hasOwnProperty("attr")) {
            let alert = this.state.alert;
            console.log("*****************************erorrrr from table*******************************");
            switch (data.Error.attr.code) {
                case "022":
                    this.setState({ showPvtTableAlert: true, showTourneyInfoBoard: false });
                    break;
                case "023":
                    this.setState({ privateTableAlertText: "Opps! Wrong Password" });
                    this.setState({ showPvtTableAlert: true, showTourneyInfoBoard: false });
                    break;
                case "003":
                    // alert.lineOne = "Something Wrong With Connection Please close it manually";
                    alert.lineOne = "Invalid request";
                    this.setState({ alert: alert });
                    this.setState({ showAlert: true, showTourneyInfoBoard: false });
                    break;
                case "040":
                    alert.lineOne = "websocket connection error";
                    alert.lineTwo = " try relaoding your game window";
                    this.setState({ alert: alert });
                    this.setState({ showAlert: true, showTourneyInfoBoard: false });
                    break;
                case "027":
                    alert.lineOne = data.Error.attr.description;
                    this.setState({ alert: alert });
                    this.setState({ showAlert: true, showTourneyInfoBoard: false });
                    break;
                case "034":
                    this.onGetCloseTable();
                    break;
                default:
                    alert.lineOne = data.Error.attr.description;
                    this.setState({ alert: alert });
                    this.setState({ showAlert: true, showTourneyInfoBoard: false });
                    break;
            }
            if (data.Error.attr.description === "Table is already closed") {
                let data = {
                    id: this.tableData.tableId,
                }
                setTimeout(() => {
                    this.setState({ showAlert: false });
                    this.props.closeTTable(data);
                    this.props.showLobby();
                    this._tableNetwork.send("<LeaveTable/>");
                    this.clearTheTable();
                }, 500);
            }
        }
    }

    onBuddyAdded(data) {
        let alert = this.state.alert;
        if (data.BuddyAdded.hasOwnProperty("PlayerInfo")) {
            alert.lineOne = `${data.BuddyAdded.PlayerInfo.attr.nickname} added as your buddy`;
            alert.lineTwo = "👍";
        }
        this.setState({ alert: alert, showAlert: true, showTourneyInfoBoard: false });
    }

    setPopUpActions(action) {
        switch (action) {
            case "hideBuyChips":
                // this._tableNetwork.send(`<SitIn/>`);
                // this.setGcActions(this.state.options.seatId);
                this.setState({ showBuyChips: false, isGetingResponse: "" });
                clearTimeout(this.serverResponseTime);
                this.setState({
                    balance: {
                        available: 0,
                        min: 0,
                        max: 0,
                        time: 0,
                        runTimer: false,
                    },
                });
                if (this.state.options.action.length < 2) {
                    this.setGcActions(this.player.id);
                }
                break;
            case "hideBuyChips1":
                this.setState({ showBuyChips: false, isGetingResponse: "" });
                clearTimeout(this.serverResponseTime);
                this.Once_Call_buyIN_popup = false
                break;
            case "hideReBuyChips":
                this.setState({ showWaitForRebuy: false });
                this.setState({ waitRebuyAlert: { show: false, time: 0, name: "" } });

                break;
            case "hideChipsRebuyAlert":
                this.setState({ showChipsRebuyAlert: false });
                break;
            case "hideAddonAlert":
                this.setState({ showAddonAlert: false });
                break;
            case "hideReBuyChipsAlert":
                this.setState({ waitRebuyAlert: { show: false, time: 0, name: "" } });
                break;
            case "hideAlert":
                let alert = { ...this.state.alert }
                alert.lineOne = "";
                alert.lineTwo = "";
                this.setState({ alert: alert, showAlert: false });
                if (this.state.alert.lineOne === "Table is already closed") {
                    let data = {
                        id: this.tableData.tableId,
                    }
                    setTimeout(() => {
                        this.props.closeTTable(data);
                        this._tableNetwork.send("<LeaveTable/>");
                        this.clearTheTable();
                    }, 500);
                }
                break;
            case "exit_yes":
                // if(navigator.app.exitApp){
                //     alert("It is There")
                // }
                this.props.TableHandler("exitApp", true);
                setTimeout(() => {
                    this.setState({ alert: { lineOne: "", lineTwo: "", }, showAlert: false });
                    // setTimeout(() => {
                    //     sessionStorage.clear();
                    //     this.props.TableHandler("exitApp", false);
                    //     navigator.app.exitApp();
                    // }, 100);
                    setTimeout(() => {
                        // const { ipcRenderer } = window.require('electron');
                        // sessionStorage.clear();
                        // this.props.TableHandler("exitApp", false);
                        // ipcRenderer.send('exit-app');
                        this.handleExit();
                    }, 100);
                }, 2000);
                break;
            case "hideExitAlert":
                this.setState({ showExitAlert: false });
                break;
            case "hideAlertone":
                this.setState({ showBreakAlert: false });
                break;
            case "hideTplayerAlert":
                this.setState({ showTplayerRankAlert: false });
                // this.props.TourneyHandler("closeTTable_openTourneyLobby", 't-tables');
                setTimeout(() => {
                    Emitter.emit('closeTourneyTableEmit');
                    this._tableNetwork.send("<LeaveTable/>");
                }, 3000);
                break;
            case "hideTournamentRebuy":

                // this.setState({ welcomeText: "Your rebuy will add chips for the next hand !" });
                // setTimeout(() => {
                //     this.setState({ welcomeText: "" });
                // }, 5000)


                this.setState(prevState => ({
                    TournamentRebuy: {
                        ...prevState.TournamentRebuy,
                        Popup: false
                    }
                }));
                this.setState({ showTournamentRebuy: false });
                break;
            case "hideTournamentAlert":
                this.setState({ showTournamentAlert: false });
                break;
            case "hideTourneyInfoBoard":
                this.setState({ showTourneyInfoBoard: false });
                break;
            case "showKnoutbustedAlert":
                this.setState({ showKnoutbustedAlert: false });
                break;
            case "hidePvtAlert":
                this.setState({ privateTableAlertText: "" });
                this.setState({ showPvtTableAlert: false });
                break;
            case "hideThemes":
                this.setState({ showOptions: false });
                break;
            case "hideInvitePlayers":
                this.setState({ showInvitePlayer: false });
                break;
            case "hideManualpoolPrizeAlert":
                this.setState({ manualPrizePoolshwow: false });
                break;
            default:
                break;
        }
    }

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

    setMenuActions(action, data) {
        switch (action) {
            case "BuyChips":
                this.setState({ showBuyChips: true, showTourneyInfoBoard: false });
                break;
            case "Themes":
                this.setState({ showOptions: true, showTourneyInfoBoard: false });
                break;
            case "InvitePlayer":
                this.setState({ showInvitePlayer: true, showTourneyInfoBoard: false });
                break;
            case "openExitAlert":
                this.setState({
                    alert: {
                        lineOne: "Are You Sure",
                        lineTwo: "Want to exit...!",
                    },
                    showAlert: true
                });
                // this.setState({ showAlert: true, showTourneyInfoBoard: false });
                break;
            case "openExitTableAlert":
                this.setState({ showExitAlert: true });
                break;
            case "Lobby":
                window.open("", "SooperPokerMainLobby").focus();
                break;
            case "LeftMenu":
                this.props.TourneyHandler("gotoMyTable", data);
                this.setState({ leftmenu: true })
                break;
            case "HideLeftMenu":
                this.setState({ leftmenu: false })
                break;
            case "showTIP":
                this.setState({ showInfoPanel: true });
                break;
            case "showCheckBox":
                this.setState({ showCheckBox: "block" });
                break;
            case "hideCheckBox":
                this.setState({ showCheckBox: "none" });
                break;
            default:
                break;
        }
    }

    setGcActions(id) {

        let options = this.state.options;
        options.showSlider = false;
        options.action = [];
        options.quickAction = [];
        options.cnt = 0;
        options.rangeMax = 0;
        options.rangeMin = 0;
        options.showpot = false;


        setTimeout(() => {
            this.setState({ options: options });
        }, 20);

        if (id) {
            this.stopTimer(id);
            this.stopCountDown(id);
        }
    }

    setGcCheckActions(group, state) {
        switch (group) {
            case "AutoPost":
                this.state_autoPost = state;
                break;
            case "AutoMuck":
                this.state_autoMuck = state;
                break;
            case "closeCkeckAlert":
                this.setState({ showCheckAlert: false });
                this.setState({ showCheckAlertCount: state });
                break;
            case "AddOn":
                if (state) {
                    this.setState({ addonsetting: "hide" });
                } else {
                    this.setState({ addonsetting: "show" });
                }
                break;
            case "Rebuy":
                if (state) {
                    this.setState({ addrebuysetting: "hide" });
                } else {
                    this.setState({ addrebuysetting: "show" });
                }

                break;
            case "ReBuy2X":
                if (state) {
                    this.setState({ addrebuysetting: "hide2x" });
                } else {
                    this.setState({ addrebuysetting: "show2x" });
                }
                break;
            case "playerLevelInfo":
                // console.log(state)
                this.setState({ showTourneyInfoBoard: state });
                break;
            default:
                break;
        }
    }

    setThemes(group, data) {
        switch (group) {
            case "Table":
                this.props.setThemes(data);
                break;
            case "Cards":
                this.seatsRef.current.setCardStyle(data);
                this.boardCardsRef.current.setCardStyle(data.frontCard);
                this.ritBoardCardsRef.current.setCardStyle(data.frontCard);
                break;
            default:
                break;
        }
    }
    setThemesL(group, data) {
        switch (group) {
            case "Table":


                switch (data.carpetNo) {
                    case "carpet1":
                        this.setState({ BgState: { opacity: 1, background: "#000000", tableimage: this.state.BgState.tableimage } })
                        break;
                    case "carpet2":
                        this.setState({ BgState: { opacity: 1, background: "#000000", tableimage: this.state.BgState.tableimage } })
                        break;
                    case "carpet3":
                        this.setState({ BgState: { opacity: 1, background: "#000000", tableimage: this.state.BgState.tableimage } })
                        break;
                    case "carpet4":
                        this.setState({ BgState: { opacity: 1, background: "#000000", tableimage: this.state.BgState.tableimage } })
                        break;
                    case "carpet5":
                        this.setState({ BgState: { opacity: 1, background: "#000000", tableimage: this.state.BgState.tableimage } })
                        // this.setState({BgState: {opacity: 1,backgroundImage:`url(${Background1})`,tableimage: this.state.BgState.tableimage}})
                        break;
                    default:
                        break;

                }
                switch (data.tableNo) {
                    case "table1":
                        this.setState({ BgState: { opacity: 1, tableimage: table1 } })
                        break;
                    case "table2":
                        this.setState({ BgState: { opacity: 1, tableimage: table2 } })
                        break;
                    case "table3":
                        this.setState({ BgState: { opacity: 1, tableimage: table3 } })
                        break;
                    case "table4":
                        this.setState({ BgState: { opacity: 1, tableimage: table4 } })
                        break;
                    case "table5":
                        this.setState({ BgState: { opacity: 1, tableimage: table5 } })
                        break;
                    default:
                        break;

                }
                break;
            case "Cards":
                break;
            default:
                break;
        }

    }

    tableFooterHandler(value) {
        switch (value) {
            case "showTIP":
                this.setState({ showInfoPanel: true });
                break;
            case "showChatBox":
                this.setState({ showChatBox: true });
                break;
            case "hideTIP":
                let alert = this.state.infopanelalert;
                alert.lineOne = '';
                this.setState({ showInfoPanel: false, infopanelalert: alert });
                break;
            case "hideChatBox":
                this.setState({ showChatBox: false });
                break;
            case "showCheckBox":
                this.setState({ showCheckBox: "block" });
                break;
            case "hideCheckBox":
                this.setState({ showCheckBox: "none" });
                break;
            case "showMenu":
                this.setState({ showTableMenu: true });
                break;
            case "hideMenu":
                this.setState({ showTableMenu: false });
                break;
            case "showRebuyTournament":
                // this.setState({ showTournamentRebuy: true });
                this.setState({ showTournamentRebuy: this.state.TournamentRebuy.Popup });
                break;
            default:
                break;
        }
    }

    socketConnetionAlerts(state) {
        let alert = { ...this.state.alert };

        alert.lineOne = " ";
        alert.lineTwo = " ";
        this.setState({ showAlert: false });
        switch (state) {
            case "closed":
                alert.lineTwo = "Re-Connecting....!🤔";
                this.setState({ alert: alert, ReconnectionAlert: true, showTourneyInfoBoard: false });
                this.setState({ waitRebuyAlert: { show: false, time: 0, name: "" } });
                // this.setState({ showAlert: true }); 
                break;
            case "connected":
                alert.lineOne = "Socket Connection Estd.";
                alert.lineTwo = " ";
                this.setState({ alert: alert, ReconnectionAlert: false });
                // this.setState({ showAlert: false });
                // setTimeout(()=>{
                //     window.onfocus = function () {
                //     this._tableNetwork.send('<GetGameState/>');
                //     }
                // },1000)
                break;
            case "reconnected":
                this.setState({ alert: alert, ReconnectionAlert: false });
                // setTimeout(()=>{
                //     window.onfocus = function () {
                // this._tableNetwork.send('<GetGameState/>');
                //     }
                // },1000)
                break;
            default:
                break;
        }
    }
    onGetCloseTable(data) {
        console.log("===== clear the table======", this.tableData.tableId);
        this.setState({ infoChat: `ClearChat`, showTourneyInfoBoard: false });
        this._tableNetwork.close(false);
        if (data) {
            if (data.CloseTable === "") {
                this.setState({ tableLoded: false })
            } else if (data?.CloseTable?.attr.hasOwnProperty("nextTableId")) {
                this.setState({ reSeatingPop: true });
                this.props.TableHandler("PlayerReSeating");
                eventEmitter.emit("Tournament_Lobby_Reload");
            };
        };

        // console.log(this.TableType)
        // console.log(data);
        setTimeout(() => {
            this.clearTheTable();
            this.props.SaveIdmainlobby("remove", this.tableData.tableId)
            // this.props.TableHandler("closeCashTable", { id: this.tableData.tableId });
            this.props.TableHandler(this.TableType, { id: this.tableData.tableId }, this.props.id);
            console.log("====== table cleared. call for hiding");
        }, 1500);

    }
    TableOrLobbby(data) {
        // let remaining = this.state.cDtimer.value;

        if (data) {
            setTimeout(() => {
                let tab = document.getElementById(this.tableId);

                if (this.playerCards.length !== "" && tab != null) {
                    try {
                        tab.innerHTML = this.getLastcards(this.playerCards);
                    } catch (e) { console.error(e.message) }
                }
            }, 100)
        }

        this.seatsRef.current.UpadateSeatProperties();
    }

    clearTheTable() {
        this.rearrangeSeat = false;
        this.setState({ mychips: 0, addonData: "", reSeatingPop: false, showBreakAlert: false });
        this.watchNickname = false;
        this.watchstack = false
        this.Once_Call_buyIN_popup = true;
        this.seatsRef.current.clearTheTableSeats(0)
        this.boardCardsRef.current.removeCards();
        this.ritBoardCardsRef.current.removeCards();
        clearTimeout(this.breaktime)
        this.setGcActions(this.player.id);
        this.seatsRef.current.noTablePot();
        console.log("===== clear the table======", this.tableData.tableId);
        this.activeSeatCount = 0;
        this.isTourney = false;
        this.players = {};
        this.player = { name: "", id: "" };
        this.seatsRef.current.onDealer(this.state.seatCnt, undefined);
        let options = { ...this.state.options };
        options.showFold = false;
        options.showCheck = false;
        options.showBet = false;
        options.showCall = false;
        options.showRaise = false;
        options.showgamecontr = "hidden";
        options.RunITTwice = false;
        options.action = [];
        this.knock_Table = false;
        this.setState({ seatCnt: 0, options: options, knock_Table: false, textvariable: false, JackpotPayout: { HAND_WINNER: false, BAD_BEAT: false, amount: 0 }, });

        this.setState({ welcomeText: " " });
        this.setState({ isTimeForcedPaused: false, isTimeForcedPaused1: false })
        this.setState({ playerCombination: "" });
        this.setState({ showcombpercent: false });

        this.setState({ winStrength: "", tableLoded: false });
        this.setState({ leaveTablebtn: false })

        this.setState({ winStrength: "", tableLoded: false, showTourneyInfoBoard: false });

        this.setState({
            tipInfo: {
                name: "-",
                type: "-",
                stakes: "-",
                LH: "-",
                CH: "-",
            },
            tplayerRankAlert: {
                lineOne: "",
                lineTwo: "",
                time: null,
            },
            tshowKnoutbustedAlert: {
                lineOne: "",
                lineTwo: "",
            },
        })
        // console.clear()
        // clear the chat content
        // clear gc options
        // clear board/ rit board cards

    }
    // remaining_force(data) {
    //     return data
    // }
    // _______________________________________animation code Here Start_________________________________________________________
    TargetpositionId(e, dragdetails) {
        if (this.state.seats.Seat[e].name !== "" && dragdetails.index != null) {
            this.setState({ senderidboolean1: true })
            // this.seatsRef.current.TargetPositionId1(e, dragdetails)
            // this._tableNetwork.send(`<SendGiftAward giftId="${dragdetails.index}" giftName ="${dragdetails.name}" receiverName="${this.state.seats.Seat[e].name}" />`)
            this._tableNetwork.send(`<SendGiftAward giftId="${dragdetails.index}" name="Gift #3, Throw Mud" senderSeatNo="${this.player.id}" receiverSeatNo="${e}" receiverName="${this.state.seats.Seat[e].name}"  />`)

        }
    }
    async GiftAward(data) {
        await this.seatsRef.current.TargetPositionId1(data)
    }
    // GiftAward(data) {
    //     this.setState({
    //         dragdetails: {
    //             index: Number(data.data.attr.giftId),
    //             name: data.data.attr.giftName,
    //             senderidboolean: true
    //         }
    //     })
    //     this.setState({ senderidboolean1: false })
    //     let senderid = null
    //     let i = 0
    //     if (data.data.attr.receiverName === "Take Seat") {

    //     } else {
    //         for (i; i <= this.state.seats.Seat.length; i++) {
    //             try {
    //                 if (data.data.attr.sender === this.state.seats.Seat[i].name) {
    //                     senderid = i
    //                     this.setState({

    //                         senderid: i


    //                     })
    //                 } else if (this.state.seats.Seat[i].name === "") {
    //                     console.log("empty string")

    //                 }
    //                 if (this.state.seats.Seat[i].name === data.data.attr.receiverName) {

    //                     if (Number(this.player.id) !== i) {

    //                         this.seatsRef.current.TargetPositionId1(i, this.state.dragdetails)
    //                     } else {
    //                         console.log("reciver is to call animation start")
    //                         this.seatsRef.current.TargetPositionId1(i, this.state.dragdetails)

    //                     }
    //                 }
    //             } catch (e) { }

    //         }
    //     }

    // }

    // _______________________________________animation code Here end_________________________________________________________

    onGetAvatars(data) {
        // https://demo.rapoker.club/pokerh5/e38711ec8e764c4ff7c43f80fe0fd212
        // https://demo.rapoker.club/pokerh5/e38711ec8e764c4ff7c43f80fe0fd212

    }
    showSeatAlert(details) {
        let alert = { ...this.state.alert };
        alert.lineOne = details;
        this.setState({ alert: alert, showAlert: true })
    }

    SelectDevice(select) {
        // alert("hi")
        //    this.seatsRef.current.UpadateSeatProperties();
        // if(this.props.activeTable){
        // } 
        // if ((window.innerWidth > 769 && window.innerWidth < 992)) {
        //     this.setState({ showScreenRotationIndicater: true })
        // } else {
        //     this.setState({ showScreenRotationIndicater: false })
        //     // this.ScreenResize()
        // }
        switch (select) {
            case "mobile":
                // this.seatsRef.current.UpadateSeatProperties();
                break;
            case "tablet":
                // this.seatsRef.current.UpadateSeatProperties();
                break;
            case "desktop":
                // this.seatsRef.current.UpadateSeatProperties();
                break;
            default:
                // console.log(select);
                break;
        }

    }
    handlecheckBox(data) {
        if (document.getElementById("sitfornexthand") !== null) {
            document.getElementById("sitfornexthand").checked = data;
        }
    }
    handlefunctin = () => {
        this.setState({ boolean: !this.state.boolean, tenery: this.props.tenery })
        this.gameState = document.getElementById(this.props.id)

        if (this.state.boolean) {
            this.props.ActiveTable(this.props.id)
            // this.gameState.style.width = 1000 + "px"
            // this.gameState.style.height = 600 + "px"
            // this.gameState.style.width = window.innerWidth + "px"
            // this.gameState.style.height = window.innerHeight + "px"
            this.seatsRef.current.GridScreens(this.props.opentables, this.props.width, this.props.height, true);
        } else {
            this.seatsRef.current.GridScreens(this.props.opentables, this.props.width, this.props.height, false);
            // this.gameState.style.width = this.props.width + "px";

            // this.gameState.style.height = this.props.height + "px";
            // this.gameState.style.margin=0+"px"
            this.props.ActiveTable("gamebox")
        }
        //  this.seatsRef.current.GridScreens();


    }
    CloseTableRearrageGrid(opentables) {
        // if (opentables == 1) {
        //     this.seatsRef.current.GridScreens(opentables, this.props.width, this.props.height, true);
        // } else {
        // if (opentables === 2) {
        //     this.seatsRef.current.UpadateSeatProperties(opentables);
        // }
        // this.seatsRef.current.GridScreens(opentables, this.props.width, this.props.height, false);
        // }
    }
    // ScreenResize() {
    //     let grids = document.getElementById("grids" + this.props.id);
    //     grids.style.width = ((window.innerWidth - 5 * (this.props.opentables)) / ((this.props.opentables) == 1 ? 1 : (this.props.opentables) == 2 ? 2 : (this.props.opentables) == 3 ? 3 : (this.props.opentables) == 4 ? 2 : (this.props.opentables) == 5 ? 3 : (this.props.opentables) == 6 ? 3 : 3)) + "px";
    //     grids.style.height = ((window.innerHeight - 5 * (this.props.opentables)) / ((this.props.opentables) == 1 ? 1 : (this.props.opentables) == 2 ? 1 : (this.props.opentables) == 3 ? 2 : (this.props.opentables) == 4 ? 2 : (this.props.opentables) == 5 ? 2 : (this.props.opentables) == 6 ? 2 : 2)) + "px";
    //     // console.log(((window.innerWidth - 5 * (this.props.opentables)) / ((this.props.opentables) == 1 ? 1 : (this.props.opentables) == 2 ? 2 : (this.props.opentables) == 3 ? 3 : (this.props.opentables) == 4 ? 2 : (this.props.opentables) == 5 ? 3 : (this.props.opentables) == 6 ? 3 : 3)))
    //     this.seatsRef.current.GridScreens(this.props.opentables, this.props.width, this.props.height, false);
    //     if ((window.innerWidth > 769 && window.innerWidth < 992)) {
    //         this.setState({ showScreenRotationIndicater: true })
    //     } else {
    //         this.setState({ showScreenRotationIndicater: false })
    //     }
    // }
    showLoader(state) {
        this.setState({ tableLoded: state });
    }
    resizeScreen(state) {
        this.setState({ resizeScreen: state });
    }

    handleBreakEnd = () => {
        console.log("Break time ended, start next level!");
        // Perform next level logic here
        // clearTimeout(this.breaktime)
        // this.setState({ showTimerBreak: false })
    }
    chatHandler = (state) => {
        console.log("chat is focused :  ", state)
        this.setState({ chat_is_focused: state })
    }

    render() {

        return (
            <>
                {/* <-----------------------------------------------------------------------------------------RiverPoker LandScape start----------------------------------------------------------------------------------------> */}
                {/* {(this.config.URL_Environment.TableFeatures.selected == "F1") && */}
                <div className="check">
                    <div className="nexthand" style={this.messagestyle} hidden={this.state.nexthandshow}>
                        <p>Your rebuy of {UM.numberWithCommas(this.state.nexthand)} will be added to next hand </p>
                    </div>
                    <div className="nexthand" hidden={this.state.nexthandshow_t}>
                        <p> {this.state.nexthand_t} </p>
                    </div>
                    <div tabIndex={0} className="tableMain" id="tableMain" style={this.state.BgState1}>
                        {fileName.name !== "Leader_bet" &&
                            <div className="tabletop" >
                                {/* <div className="stline"></div> */}
                                {/* <div className="stline1"></div> */}
                            </div>
                        }
                        <div className="carpet"
                        // style={{backgroundImage: `url(${carpet})`}}
                        >
                            <h1 className="welcomeText">{this.state.welcomeText}</h1>
                            {/* <h1 className="welcomeText">{"Your rebuy will add chips for the next hand !"}</h1> */}
                            <div className="col-3 col-sm-5 col-md-4 col-lg-4 col-xl-3 col-xxl-2 leftmenu" style={{ position: "absolute" }}>
                                {this.state.leftmenu && <LeftMenu showLobby={this.props.showLobby} setAction={this.setMenuActions.bind(this)} leaveTablebtn={this.state.leaveTablebtn}></LeftMenu>}
                                {/* <LeftMenu setAction={this.setMenuActions.bind(this)} network={this._tableNetwork} leaveTablebtn={this.state.leaveTablebtn}></LeftMenu> */}
                                {/* <Rebuy network={this._tableNetwork} csschange={true}></Rebuy> */}
                                <RightMenu TableType={this.TableType} tableOriantationLandscape={this.props.stageProperties.deviceOrientation === "portrait" ? false : true} tableId={this.tableId} SelectDevice={this.SelectDevice.bind(this)} network={this._tableNetwork} action={this.tableFooterHandler.bind(this)} setAction={this.setMenuActions.bind(this)} leaveTablebtn={this.state.leaveTablebtn}></RightMenu>
                            </div>

                            {this.props.stageProperties.deviceOrientation === "portrait" ?
                                <> <Chat action={this.tableFooterHandler.bind(this)}></Chat> :

                                    <InfoPanelMobilePortrait chat={this.state.infoChat} info={this.state.tipInfo} doc={this.props.id}
                                        length={this.state.options.action.length}
                                        options={this.state.options.action}
                                        stats={this.state.tipStats} hideStats={this.state.showTipStats}
                                        network={this._tableNetwork} show={this.state.showChatBox ? "block" : "none"} resizeScreen={this.resizeScreen.bind(this)}
                                        waitList={this.state.waitList} disableJW={this.state.disableJW} btns={this.state.btns} action={this.tableFooterHandler.bind(this)}></InfoPanelMobilePortrait>
                                </>
                                :
                                <>
                                    {this.state.showInfoPanel &&
                                        <>
                                            <div className="popCover_1" onClick={() => this.tableFooterHandler("hideTIP")}>  </div>
                                            <div className="popup_1">
                                                <div className="popup_1_in" style={{ minHeight: '170px' }}>
                                                    <div className="head">
                                                        <span className="settingsSpan">
                                                            <span className="headerIconSpan emoji">
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#b79301">
                                                                    <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
                                                                </svg>
                                                            </span> Table Info & Statistics
                                                        </span>
                                                        <button className="close_1" onClick={() => this.tableFooterHandler("hideTIP")}> <img src={close_1} alt="" />   </button>
                                                    </div>
                                                    <div className="fd p_5">
                                                        <div className="">
                                                            <InfoPanelMobile chat={this.state.infoChat} info={this.state.tipInfo} doc={this.props.id}
                                                                length={this.state.options.action.length}
                                                                options={this.state.options.action}
                                                                stats={this.state.tipStats} hideStats={this.state.showTipStats}
                                                                network={this._tableNetwork} resizeScreen={this.resizeScreen.bind(this)}
                                                                waitList={this.state.waitList} disableJW={this.state.disableJW} btns={this.state.btns} action={this.tableFooterHandler.bind(this)}></InfoPanelMobile>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    <InfoPanel chat={this.state.infoChat} info={this.state.tipInfo} doc={this.props.id}
                                        length={this.state.options.action.length}
                                        options={this.state.options.action} chatHandler={this.chatHandler.bind(this)}
                                        stats={this.state.tipStats} hideStats={this.state.showTipStats}
                                        network={this._tableNetwork} show={(this.state.showInfoPanel && this.props.stageProperties.deviceOrientation !== "portrait")} resizeScreen={this.resizeScreen.bind(this)}
                                        waitList={this.state.waitList} disableJW={this.state.disableJW} btns={this.state.btns} action={this.tableFooterHandler.bind(this)}></InfoPanel>
                                </>
                            }

                            {(fileName.name !== "Riverpoker" && this.state.textvariable) &&
                                <div style={{ position: "fixed", bottom: "165px", left: "60px", zIndex: "5" }}>
                                    <img src={target} alt="target" onClick={() => { this.setState({ showAniStage: true }) }}></img>
                                </div>
                            }
                            <br />

                            {this.showTourneyInfoBoard && !this.state.showTourneyInfoBoard && fileName.name !== "Riverpoker" && (fileName.name === "Leader_bet" && Screen.getDeviceType().name !== "Mobile") && this.state.textvariable &&
                                <div className="autoRebuy fd">
                                    <div className={this.state.callRitOnce ? "glow-on-hover-rit" : "rit"}>
                                        <div className={this.state.callRitTwice ? "glow-on-hover-rio" : "rio"}>
                                            <div className="block">
                                                {/* <input id="ritCheckBox" style={{ zoom: Screen.getDeviceType().name === "Mobile" ? 1 : 1.5 }} className="checkBox" type="checkbox" name="Rebuy" defaultChecked={this.state.showTourneyInfoBoard} value="ritTwo" onClick={(event) => { this.setState({ showTourneyInfoBoard: event.target.checked }) }} /> */}
                                                <input
                                                    id="ritCheckBox"
                                                    style={{ zoom: Screen.getDeviceType().name === "Mobile" ? 1 : 1.5 }}
                                                    className="checkBox"
                                                    type="checkbox"
                                                    name="Rebuy"
                                                    checked={this.state.showTourneyInfoBoard}
                                                    value="ritTwo"
                                                    onChange={(event) => this.setState({ showTourneyInfoBoard: event.target.checked })}
                                                />

                                                <label htmlFor="WaitForBB" style={{ color: "#ffffff", fontSize: Screen.getDeviceType().name === "Mobile" ? "9px" : "15px" }}>
                                                    Level Info
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div>

                                {(this.state.textvariable || this.state.settingAccess) &&
                                    this.props.stageProperties.deviceOrientation === "portrait" ?
                                    <GameControllerPortrait options={this.state.options} gameType={this.gameType} showRitBox={this.state.showRitBox} myBalance={this.state.mySeatBalance} leaveTablebtn={this.state.leaveTablebtn} handlecheckBox={this.handlecheckBox.bind(this)} network={this._tableNetwork} setGc={this.setGcActions.bind(this)} settingsAddonNrebuy={this.state.settingsAddonNrebuy} setCheckGc={this.setGcCheckActions.bind(this)} showAlert={this.state.showCheckAlert} showCheckBox={this.state.showCheckBox} action={this.tableFooterHandler.bind(this)}></GameControllerPortrait>
                                    :
                                    <GameController
                                        doc={this.props.id}
                                        gameType={this.gameType}
                                        network={this._tableNetwork}
                                        mychips={this.state.mychips}
                                        options={this.state.options}
                                        showRitBox={this.state.showRitBox}
                                        setGc={this.setGcActions.bind(this)}
                                        showAlert={this.state.showCheckAlert}
                                        showCheckBox={this.state.showCheckBox}
                                        leaveTablebtn={this.state.leaveTablebtn}
                                        stageProperties={this.props.stageProperties}
                                        settingAccess={this.state.settingAccess}
                                        action={this.tableFooterHandler.bind(this)}
                                        setCheckGc={this.setGcCheckActions.bind(this)}
                                        handlecheckBox={this.handlecheckBox.bind(this)}
                                        settingsAddonNrebuy={this.state.settingsAddonNrebuy}>
                                    </GameController>
                                }
                            </div>



                            {/* <div className={Screen.getDeviceType().style.gameBox} style={{ padding: fileName.name === "Leader_bet" && '0px' }} id={this.props.id}> */}
                            <div className="gameBox1" style={{ padding: '0px', width: this.props.stageProperties.width, height: this.props.stageProperties.height }} id={this.props.id}>

                                <img src={this.props.stageProperties.deviceOrientation === "portrait" ? NewTable : NewTable1} className="backPixTable1" alt="" />

                                <Stage container={this.props.id}
                                    //  width={Screen.getDeviceType().width} height={Screen.getDeviceType().height}
                                    width={this.props.stageProperties.width} height={this.props.stageProperties.height}
                                    scaleX={this.props.stageProperties.deviceOrientation === "portrait" ? 1 : 2} scaleY={this.props.stageProperties.deviceOrientation === "portrait" ? 1 : 2}
                                // 
                                >

                                    {/* <BbjLabel></BbjLabel> */}

                                    <BoardCards ref={this.boardCardsRef}
                                        scale={this.state.boardCardPositions.cardScale}
                                        width={this.props.stageProperties.deviceOrientation === "portrait" ? this.props.stageProperties.width : this.props.stageProperties.width / 2}
                                        height={this.props.stageProperties.deviceOrientation === "portrait" ? this.props.stageProperties.height : this.props.stageProperties.height / 2}
                                        tableOriantationLandscape={this.props.stageProperties.deviceOrientation === "portrait" ? false : true} xPadding={this.state.boardCardXSpace}></BoardCards>
                                    <RitBoardCards ref={this.ritBoardCardsRef}
                                        scale={this.state.ritBoardCardPositions.cardScale}
                                        width={this.props.stageProperties.deviceOrientation === "portrait" ? this.props.stageProperties.width : this.props.stageProperties.width / 2}
                                        height={this.props.stageProperties.deviceOrientation === "portrait" ? this.props.stageProperties.height : this.props.stageProperties.height / 2}
                                        tableOriantationLandscape={this.props.stageProperties.deviceOrientation === "portrait" ? false : true} xPadding={this.state.boardCardXSpace}></RitBoardCards>
                                    <Seats senderid={this.state.senderid} resizeScreen={this.state.resizeScreen} dragdetails={this.state.dragdetails} showAniStage={this.state.showAniStage}
                                        hidaAni={this.hidaAni.bind(this)} TargetpositionId={this.TargetpositionId.bind(this)} senderidboolean1={this.state.senderidboolean1}
                                        knock_Table={this.knock_Table} cid={this.props.id} ref={this.seatsRef} parentCallback={this.handleCallback.bind(this)}
                                        seatCount={this.state.seatCnt} dealer={this.state.dealerSeat} network={this._tableNetwork} seatProperties={this.state.seatProperties}
                                        // stageWidth={Screen.getDeviceType().width} stageHeight={Screen.getDeviceType().height}
                                        stageProperties={this.props.stageProperties} chatIsFocused={this.state.chat_is_focused}
                                        playerAvatarsList={this.props.playerAvatarsList}
                                        originSeat={this.player.id} addonData={this.state.addonData}
                                        tableOriantationLandscape={this.props.stageProperties.deviceOrientation === "portrait" ? false : true}
                                        text={this.state.playerCombination} changetourno_sitandgo={this.state.changetourno_sitandgo} textTwo={this.state.winStrength} winpercent={this.state.showcombpercent}
                                        nametextdealerid={this.state.nametextdealerid}
                                        bigshowhide={this.state.showbigblind}
                                        BigBlindValue={this.BigBlindValue}
                                        showSeatAlert={this.showSeatAlert.bind(this)}
                                        changeOptionTournment={this.changeOptionTournment}
                                        bbj={this.state.bbj}
                                    ></Seats>
                                </Stage>
                            </div>
                            {this.state.bbj ? (
                                <div className="bbj-container-div" id={this.props.id}>
                                    <strong> BAD BEAT JACKPOT </strong>
                                    <span> {this.state.bbj} </span>
                                </div>
                            ) : null}


                            {(this.state.cDtimer.show && this.state.textvariable) && <CountDownTimer time={this.state.cDtimer.value} per={this.state.cDtimer.per}></CountDownTimer>}
                            {/* <Rebuy network={this._tableNetwork} csschange={true}></Rebuy> */}
                            {this.state.showTournamentRebuy && <TournamentRebuy data={this.state.TournamentRebuy} network={this._tableNetwork} setAction={this.setPopUpActions.bind(this)}></TournamentRebuy>}


                            {/* // {fileName.name === "Riverpoker" && */}
                            {/* {(fileName.name === "Riverpoker" && !this.state.showTipStats) && */}
                            {(!this.state.showTipStats) &&
                                <div className="join-waiting-container infoBtns" >
                                    <button className="button-71"
                                        style={{ display: (this.state.btns.disableJoinBtn || this.state.disableJW) ? 'none' : 'flex' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            console.log("======================Join==waiting==list from table Mian======================");
                                            this.setState({ loader: true });
                                            this._tableNetwork.send("<JoinWaitingList/>");
                                        }}
                                    >
                                        Join Waiting {this.state.loader && <span className="m_l_5 loader_3"></span>}
                                    </button>
                                    <button
                                        className="button-71 joined"
                                        style={{ display: (this.state.btns.disableRemovBtn || this.state.disableJW) ? 'none' : 'flex' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            console.log("======================leave==waiting==list from table Mian======================");
                                            this.setState({ loader: true });
                                            this._tableNetwork.send("<LeaveWaitingList/>");
                                        }}
                                    >
                                        Leave waiting {this.state.loader && <span className="m_l_5 loader_3"></span>}
                                    </button>
                                </div>}
                        </div>

                        {!this.state.tableLoded && <Spinner ></Spinner>}

                        {this.state.reSeatingPop && (<div className="popCover_1"> <div className="popup_2">
                            <span className="popup_2_in text_center"> Reseating. . . </span>
                        </div></div>)}
                        {/* {!this.state.tableLoded && <Loader></Loader>} */}
                        {this.state.bombpotanimation && <Bombpot></Bombpot>}
                        {this.state.showBuyChips && <BuyChips data={this.state.balance} playerBalance={this.props.playerBalance} isGetingResponse={this.isGetingResponse.bind(this)} showLoader={this.showLoader.bind(this)} onGetTakeSeat={this.onGetTakeSeat.bind(this)} network={this._tableNetwork} usdTable={this.state.usdTable} onMoneyExchangeInfo={this.state.onMoneyExchangeInfo} setAction={this.setPopUpActions.bind(this)}></BuyChips>}
                        {this.state.showWaitForRebuy && <WaitForRebuy data={this.state.waitForRebuy} network={this._tableNetwork} setAction={this.setPopUpActions.bind(this)}></WaitForRebuy>}
                        {this.state.waitRebuyAlert.show && <WaitRebuyAlert data={this.state.waitRebuyAlert} setAction={this.setPopUpActions.bind(this)}></WaitRebuyAlert>}
                        {this.state.showExitAlert && <ExitAlert setAction={this.setPopUpActions.bind(this)} network={this._tableNetwork}></ExitAlert>}
                        {this.state.showAlert && <Alert data={this.state.alert} setAction={this.setPopUpActions.bind(this)}></Alert>}
                        {this.state.showTournamentAlert && <RebuyTournamentAlert setAction={this.setPopUpActions.bind(this)} data={this.state.TournamentAlertData}></RebuyTournamentAlert>}

                        {this.state.ReconnectionAlert && <ReconnectionAlert data={this.state.alert} setAction={this.setPopUpActions.bind(this)}></ReconnectionAlert>}
                        {this.state.showTimerBreak && <Breaktime doc={this.props.id} onBreakEnd={this.handleBreakEnd} ref={this.myRef} breaktime1={this.state.breaktime1} setCondition={this.state.showAddonAlert}></Breaktime>}
                        {this.state.showBreakAlert && <BreakAlert data={this.state.breakalert} checkTableBrekMsg={this.state.checkTableBrekMsg} setAction={this.setPopUpActions.bind(this)}></BreakAlert>}
                        {this.state.showPvtTableAlert && <PrivateTableAlert data={this.state.privateTableAlertText} setAction={this.setPopUpActions.bind(this)} network={this._tableNetwork}></PrivateTableAlert>}
                        {(this.state.showKnoutbustedAlert && this.state.textvariable) && <ShowKnoutbustedAlert data={this.state.tshowKnoutbustedAlert} setAction={this.setPopUpActions.bind(this)}></ShowKnoutbustedAlert>}
                        {this.state.showTplayerRankAlert && <TourneyPlayerRanking data={this.state.tplayerRankAlert} setAction={this.setPopUpActions.bind(this)}></TourneyPlayerRanking>}
                        {this.state.showTourneyInfoBoard && <TourneyInfoBoard data={this.state.tourneyInfoBoard} setAction={this.setPopUpActions.bind(this)}></TourneyInfoBoard>}
                        {this.state.showOptions && <Options setAction={this.setPopUpActions.bind(this)} setThemes={this.setThemes.bind(this)}></Options>}
                        {this.state.showChipsRebuyAlert && <ChipsRebuyAlert data={this.state.chipsRebuyAlertData} setAction={this.setPopUpActions.bind(this)}></ChipsRebuyAlert>}

                        {this.state.showInvitePlayer && <InviteBuddies tableData={this.state.tableData} buddyData={this.state.buddyData} setAction={this.setPopUpActions.bind(this)} network={this._tableNetwork}></InviteBuddies>}

                        {this.state.JackpotPayout.amount > 0 &&
                            <div className="jackpotPayoutAmountCls">
                                <div className="sub_jackpotPayoutAmountCls">
                                    <article className="tableNameHeading">You have {this.state.JackpotPayout.amount} at this table on which the bad beat jackpot is hit</article>
                                </div>
                            </div>
                        }

                        {this.state.JackpotPayout.HAND_WINNER && <FallingChips></FallingChips>}
                        {this.state.JackpotPayout.BAD_BEAT &&
                            <div className="jackpotPayoutAmountCls" style={{ marginTop: "-40px" }}>
                                <img style={{ width: "50vw" }} src={jackpot} alt="" />
                            </div>
                        }

                        {(this.state.showAddonAlert && this.state.textvariable) &&
                            <div className="addonPopup" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "50px" }} onClick={() => { this.setState({ showTournamentRebuy: true }) }}>
                                <div className="sprite1" style={{ backgroundPositionY: "41px" }}></div >
                                <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "start" }}>
                                    <span className="pointer">Click here to add-on</span>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                        <span>Addon Break... Next level will start in  </span>
                                        <CountdownTimer1 initialMinutes={Number(this.state.AddonBreak.mins)} initialSeconds={Number(this.state.AddonBreak.secs)} />
                                    </div>
                                </div>
                            </div>
                        }

                        {this.state.showInvitePlayer && <InviteBuddies tableData={this.state.tableData} buddyData={this.state.buddyData} setAction={this.setPopUpActions.bind(this)} network={this._tableNetwork}></InviteBuddies>}
                        {(this.state.manualPrizePoolshwow && this.state.textvariable) && <PrizePoolAlert network={this._tableNetwork} setAction={this.setPopUpActions.bind(this)} manualDistributionType={this.state.manualDistributionType} ></PrizePoolAlert>}
                    </div >
                </div >

                {/* <-----------------------------------------------------------------------------------------RiverPoker LandScape end----------------------------------------------------------------------------------------> */}

            </>
        );
    }
}
