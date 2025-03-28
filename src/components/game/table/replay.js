import TableBase from "./tableBase";
import "../../../css/ui/table/tableMain.css";

import dIcon from "../../../assets/images/table/dealerIcon2.png";
import target from '../../../assets/images/table/target.png'
import { FastLayer, Stage } from "react-konva";
// import NewTable from "../../../assets/images/lobby/tableIcons/tableBg/NewTable.png";
// import NewTable1 from '../../../assets/images/tableandcarpet/table_1.png'
// import carpet from '../../../assets/images/tableandcarpet/carpet_1.png'
import { LeftMenu } from "../ui/table/leftMenu";
import { RightMenu } from "../ui/table/rightMenu";
import InfoPanel from "../ui/table/infoPanel/infoPanel";
import GameController from "../ui/table/gameController/gameController";
import { Seats } from "../ui/table/seats";
import BoardCards from "../ui/table/boardCards/boardCards";
import RitBoardCards from "../ui/table/boardCards/ritBordCards";
import { CountDownTimer } from "../ui/table/seat/cDtimer";

import Chat from "../ui/table/chat.js";
import Rebuy from "../ui/table/rebuy";


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
import InviteBuddies from "../ui/popUps/InviteBuddies";
import { Breaktime } from "../ui/table/sitandtournate";
import PrizePoolAlert from "../ui/popUps/PrizepoolAlert";
import ShowKnoutbustedAlert from "../ui/popUps/showKnoutbustedAlert";

import timerTick from "../../../assets/audio/timer.mp3";
import React from "react";
import UM from "../../utils/utilityMethods";
import Spinner from "../../utils/spinner";
import Bombpot from "../ui/popUps/bombpotAnimation";

import { t } from "i18next";


import Screen from '../../utils/screen.js'
import fileName from "../../../jsconfig.js";

import UM from "../../utils/utilityMethods";


export default class ReplayHistory extends TableBase {
    constructor(props) {
        super(props);
        this.state = {
            senderid: null,
            dragdetails: {
                index: null,
                name: '',

                senderidboolean: false
            },
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
            showRitBox: false,
            showAddonAlert: false,
            isTimeForcedPaused: false,
            isTimeForcedPaused1: false,
            timeForced: { isTimeForcedPaused: false, force_duration: 0 },
            bombpotanimation: false,
            welcomeText: "",
            tableLoded: false,
            nexthand: "",
            nexthandshow: true,

            nametextdealerid: "",
            addonsetting: "show",
            addrebuysetting: undefined,
            originSeat: null,
            showTimerBreak: false,
            BgState: {
                opacity: 1,
                background: "#000",
                tableimage: NewTable
            },
            BgState1: {
                opacity: 1,
                background: "#000",
                tableimage: NewTable,

                backgroundImage: `url(${carpet})`
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
            boardCardPositions: Screen.getDeviceType().boardCardPositions,
            boardCardXSpace: Screen.getDeviceType().boardCardXSpace,
            ritBoardCardPositions: Screen.getDeviceType().ritBoardCardPositions,
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
            disableJW: true,
            btns: {
                disableJoinBtn: false,
                disableRemovBtn: true,
            },
            showInfoPanel: "none",
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
                rangeMin: 0,
                rangeMax: 0,
                showChecks: true,
                bigblindValue: ""
            },
            showCheckBox: "none",
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
            seatProperties: Screen.getDeviceType().seatProperties,
            cardStyle: Screen.getDeviceType().cardStyle,
            stageWidth: 500,
            stageHeight: 880,
        };
        this.Once_Call_buyIN_popup = true;
        this.BigBlindValue = ''
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
        this.removeclassName = ''

        this.changeOptionTournment = false;

        this.showTourneyInfoBoard = false;
        this.knock_Table = false;
        this.stageWidth = 500;
        this.stageHeight = 880;
        this.TableType = '';
        this.watchstack = false;
        this.watchNickname = false;
        this.rearrangeSeat = false
    }


    componentDidMount() {
        // this.cardsDataInterval = setInterval(() => {
        //     let tab = document.getElementById(this.tableId);
        //     if (tab !== null) {
        //         if (this.playerCards.length != 0) {
        //             tab.innerHTML = this.getLastcards(this.playerCards);
        //         }
        //     }
        // }, 1000);
        // this.onGetTableDetails('fsf')

        let tableInfo = {
            "success": true,
            "values": [
                {
                    "roundInfo": [
                        {
                            "gameRoundDataInfos": [
                                {
                                    "gameRoundId": 986604,
                                    "roundStep": 1,
                                    "stepDate": "Mon Jan 22 15:45:15 IST 2024"
                                }
                            ],
                            "gameRoundInfo": {
                                "compPoints": 0.0,
                                "finishDate": "Mon Jan 22 15:45:15 IST 2024",
                                "jackpotFee": 0.0,
                                "num": 20019,
                                "players": 2,
                                "pot": 40.0,
                                "rake": 2.0,
                                "startDate": "Mon Jan 22 15:40:34 IST 2024",
                                "stepCount": 1,
                                "tableId": 986553
                            },
                            "playerRoundDataInfos": [
                                {
                                    "balance": 0.0,
                                    "bet": 20.0,
                                    "payout": 180.0,
                                    "playerRoundId": 986605,
                                    "roundStep": 1,
                                    "stepDate": "Mon Jan 22 15:45:15 IST 2024"
                                }
                            ],
                            "playerRoundInfo": {
                                "balance": 180.0,
                                "bet": 20.0,
                                "bonusBet": 0.0,
                                "compPoints": 0.0,
                                "convertedJackpotFee": 0.0,
                                "finishDate": "Mon Jan 22 15:45:15 IST 2024",
                                "gameRoundId": 986604,
                                "id": 986605,
                                "jackpotFee": 0.0,
                                "jackpotPayout": 0.0,
                                "num": 1,
                                "payout": 0.0,
                                "rake": 1.0,
                                "sessionId": 986559,
                                "startDate": "Mon Jan 22 15:40:34 IST 2024",
                                "stepCount": 1
                            }
                        }
                    ],
                    "sessionInfo": {
                        "bets": 20,
                        "bonusBets": 0,
                        "bonusBuyIn": 0,
                        "buyIn": 200.0,
                        "casinoRevenue": 1.0,
                        "compPoints": 0.0,
                        "convertedJackpotFee": 0,
                        "detalization": "Full",
                        "finishDate": "Mon Jan 22 17:00:32 IST 2024",
                        "gameId": 948,
                        "jackpotFee": 0,
                        "jackpotPayout": 0,
                        "payouts": 0.0,
                        "playerId": 5417,
                        "playersInfo": [
                            {
                                "bot": false,
                                "cards": [
                                    "Qc Th"
                                ],
                                "commonData": [
                                    [
                                        "SB: 10.00 (1)"
                                    ],
                                    [
                                        "Call: 10.00 (3)"
                                    ],
                                    [
                                        "Check (6)"
                                    ],
                                    [
                                        "Check (8)"
                                    ],
                                    [
                                        "Check (10)"
                                    ]
                                ],
                                "dealer": true,
                                "name": "3.TP001",
                                "nickName": "TP001",
                                "numPhases": 5,
                                "numSeat": 2,
                                "showCards": true
                            },
                            {
                                "bot": false,
                                "cards": [
                                    "4c As"
                                ],
                                "commonData": [
                                    [
                                        "BB: 20.00 (2)"
                                    ],
                                    [
                                        "Check (4)"
                                    ],
                                    [
                                        "Check (5)"
                                    ],
                                    [
                                        "Check (7)"
                                    ],
                                    [
                                        "Check (9)"
                                    ]
                                ],
                                "dealer": false,
                                "name": "1.TP002",
                                "nickName": "TP002",
                                "numPhases": 5,
                                "numSeat": 0,
                                "showCards": true
                            }
                        ],
                        "potByPhase": {
                            "potsSum": 40
                        },
                        "referenceId": 986560,
                        "roundInfo": {
                            "highStake": 20,
                            "smallBlind": 10,
                            "bigBlind": 20,
                            "lowStake": 10
                        },
                        "roundsCount": 1,
                        "startDate": "Mon Jan 22 15:39:19 IST 2024",
                        "status": "Finished",
                        "tableData": {
                            "flop": "8c 7c 6s",
                            "river": "5c",
                            "turn": "6c"
                        },
                        "tableId": 986553
                    },
                    "tableInfo": {
                        "casinoRevenue": 2.0,
                        "finishDate": "Mon Jan 22 17:23:11 IST 2024",
                        "gameId": 948,
                        "name": "Forced RIT1 #2",
                        "referenceId": 986551,
                        "roundsCount": 1,
                        "startDate": "Mon Jan 22 15:39:08 IST 2024",
                        "tableId": "418-89"
                    }
                }
            ]
        }

        console.log(tableInfo)
        console.log(tableInfo.values)
        console.log(tableInfo.values[0])
        console.log(tableInfo.values[0]["tableInfo"])
        setTimeout(() => {
            this.tableDetails(tableInfo.values[0])
            setTimeout(() => {
                this.onChipsRebuy(tableInfo.values[0])
                setTimeout(() => {
                    this.updateGameData()
                    setTimeout(() => {
                        this.onDealingCards()
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.cardsDataInterval);
    }
    tableDetails(data) {
        console.log(data)
        console.log("step 1")
        this.TableType = 'SINGLE_TABLE';
        this.changeOptionTournment = true;
        this.tableName = data.tableInfo.name;
        window.name = data.tableInfo.tableId;
        this.tableId = data.tableInfo.tableId;
        // this.stakes = 10 / 20 // stakes-low / stakes-high
        this.stakes = `${data.sessionInfo.roundInfo.lowStake} / ${data.sessionInfo.roundInfo.highStake}`
        // this.BigBlindValue = 20 // stakes-high
        this.BigBlindValue = data.sessionInfo.roundInfo.bigBlind // stakes-high

        let seats = this.state.seats;
        let cnt = '2'; // how many seats
        this.setState({ seatCnt: cnt });
        let i = 0; // index = 0
        for (i; i < cnt; i++) {
            if (data.sessionInfo.playersInfo[i]) {
                // seats.Seat[i].name = data.TableDetails.SingleTable.Seats.Seat[i].PlayerInfo.attr.nickname;
                // seats.Seat[i].name = 'Raj1';
                seats.Seat[i].name = data.sessionInfo.playersInfo[i].nickName;
                // this.players['Raj1'] = i;
                this.players[data.sessionInfo.playersInfo[i].nickName] = i;
            } else {
                seats.Seat[i].name = "Take Seat";
            }
        }
        this.setState({ seats: seats });

        // If jackpot
        this.setState({ showBBJ: true }); // else false

        // Limit
        let type = "TEXAS_HOLDEM" + "_" + "NO_LIMIT";
        this.gameType = UM.GameName(type);


        // Statistics
        let tableData = {
            name: this.tableName,
            game: this.gameType,
            stakes: this.stakes,
            pf: '0', // players-per-2nd-round
            tID: this.tableId //or,
        };
        this.setState({ tableData: tableData });


        // runTwice
        // if (data.runTwice) {
        //     this.setState({ showRitBox: true })
        // } else {
        //     this.setState({ showRitBox: false })
        // }
        this.showTourneyInfoBoard = false;

        // common settings
        this.setState({ showAlert: false, tableLoded: true });

        // table data
        let tab = document.getElementById(this.tableId);
        let playerCards = []
        for (let i = 0; i < UM.cardsLength(type); i++) {
            playerCards.push("xx");
        }
        try {
            tab.innerHTML = this.getLastcards(playerCards);
        } catch (e) { console.log(e) }
        this.playerCards = playerCards;
    }

    updateGameData(data) {
        console.log(data)
        console.log("step 3")
        this.timerSynchroniser = '10:00 am'; // timerSynchroniser;
        this.setState({ playerCombination: "" });

        // set game data
        this.setState({
            tipInfo: {
                name: this.tableName, type: this.gameType, stakes: this.stakes, CH: '143276' // hand number or data.GameState.attr.hand
            }
        });

        // set seats data
        let SeatsData = {
            dealer: "1", me: "1", number: "6"
        }
        this.seatsRef.current.CallTimeTableDetails(SeatsData);
        // this.seatsRef.current.CallTimeTableDetails(data.GameState.Seats);

        // If me true
        this.player.id = 'Raj1';
        this.seatsRef.current.thisPlayerid(this.player.id);
        this.player.name = 'Raj1' // Nick Name;
        this.setState({ textvariable: true })

        // set rit
        // if (data.enableTwoX === "false") {
        //     this.seatsRef.current.enableTwoX(false)
        //     this.CheckRitBox = false;
        //     this.setState({ CheckRitBox: false })
        // }
        // if (data.enableTwoX === "true") {
        //     this.seatsRef.current.enableTwoX(true)
        //     this.setState({ CheckRitBox: true })
        //     this.CheckRitBox = true;
        // }
        this.setState({
            btns: {
                disableJoinBtn: true,
                disableRemovBtn: true
            }
        })

        // If me false
        this.setState({ textvariable: false })

        // dealer
        // if (data.dealer) {
        //     this.setState({
        //         dealerSeat: '3' // dealer no
        //     });
        //     let cnt = '6';
        //     this.seatsRef.current.onDealer(cnt, '3');
        // }
        this.setState({
            dealerSeat: '1' // dealer no
        });
        // let cnt = '6';
        this.seatsRef.current.onDealer(2, 1);

        // set seats
        let seats = this.state.seats;
        let cnt = 6; // how many seats
        let i = 0;
        this.gameState_seat = [];
        for (i; i < cnt; i++) {
            // if (data.Combination) {
            // this.setState({ playerCombination: data.GameState.Seats.Seat[i].Combination.attr.strength });
            // }  // try after all set
            // if (data.PlayerInfo) {
            this.gameState = {
                // name: (data.hideName == "true" ? "????" : this.state.textvariable ? 'Raj1' : this.watchNickname ? "????" : 'Raj1'),
                name: 'Raj1',
                // chips: (data.hideStack == "true" ? "####" : '12345'),
                chips: 12345,
                status: "takenActive",
                seat: 1,
                action: "",
                // knockoutBounty: "KOB  " + ((Number(data.knockOutFee)) + Number(data.Seat[i].PlayerInfo.attr.knockOutAmount)),
                knockoutBounty: "KOB  " + ((Number(111)) + Number(2)),
                // enableTwoX: (data.enableTwoX === "true" ? true : false),
                me: this.player
            }

            // if (data.Chips) {
            // if (data.Seat[i].PlayerInfo.Chips.attr.hasOwnProperty("bet")) {
            //     if (Number(data.Seat[i].PlayerInfo.Chips.attr.bet) !== 0) {
            // this.seatsRef.current.updateGameState_onSeatPots(i, data.Seat[i].PlayerInfo.Chips.attr.bet);
            // if (this.state.seats.Seat[0]) {
            this.seatsRef.current.updateGameState_onSeatPots(1, 15);
            // }
            //     }
            // }
            // }
            let options = this.state.options;

            seats.Seat[i].name = 'Raj1';
            // if (this.player.id === data.GameState.Seats.Seat[i].attr.id) {
            options.showChecks = true;
            this.setState({ options: options });
            // }
            // if (Number(this.player.id) === Number(data.GameState.Seats.Seat[i].attr.id)) {
            // this.setState({ rittwicestatus: data.GameState.Seats.Seat[i].PlayerInfo.attr.enableTwoX === "true" ? true : false })
            this.activeSeatCount++;
            // } else {
            // if (data.GameState.hasOwnProperty("TournamentInfo")) {
            //     this.gameState = {
            //         name: (this.state.textvariable === true ? "Open Seat" : ""),
            //         chips: "",
            //         status: (this.state.textvariable === true ? "onlyMe" : "takenInactive"),
            //         seat: i,
            //         action: "",
            //     };
            //     seats.Seat[i].name = (this.state.textvariable === true ? "" : "Take Seat")
            // } else {
            // this.gameState = {
            //     name: (this.state.textvariable === true ? "Open Seat" : "Take Seat"),
            //     chips: "",
            //     status: (this.state.textvariable === true ? "onlyMe" : "readyToTake"),
            //     seat: i,
            //     action: "",
            // };
            // seats.Seat[i].name = (this.state.textvariable === true ? "" : "Take Seat")
            // }
            // }
            // }
        }
    }

    updateGamestate(data, timerSynchroniser) {
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

        if (data.GameState.hasOwnProperty("Seats")) {
            this.seatsRef.current.CallTimeTableDetails(data.GameState.Seats);
            if (data.GameState.Seats.hasOwnProperty("attr")) {
                // let seats = this.state.seats;
                let cnt = data.GameState.Seats.attr.number
                // i = 0;
                if (data.GameState.Seats.attr.hasOwnProperty("me")) {
                    this.player.id = data.GameState.Seats.attr.me;
                    this.seatsRef.current.thisPlayerid(this.player.id);
                    this.player.name = data.GameState.Seats.Seat[this.player.id].PlayerInfo.attr.nickname;
                    this.setState({ textvariable: true })
                    if (data.GameState.Seats.Seat[this.player.id].PlayerInfo.attr.enableTwoX === "false") {
                        this.seatsRef.current.enableTwoX(false)
                        this.CheckRitBox = false;
                        this.setState({ CheckRitBox: false })
                    }
                    if (data.GameState.Seats.Seat[this.player.id].PlayerInfo.attr.enableTwoX === "true") {
                        this.seatsRef.current.enableTwoX(true)
                        this.setState({ CheckRitBox: true })
                        this.CheckRitBox = true;
                    }
                    this.setState({
                        btns: {
                            disableJoinBtn: true,
                            disableRemovBtn: true
                        }
                    })

                } else {
                    this.setState({ textvariable: false })
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
                    if (data.GameState.Seats.Seat[i].hasOwnProperty("PlayerInfo")) {
                        this.gameState = {
                            name: (data.GameState.Seats.Seat[i].PlayerInfo.attr.hideName == "true" ? "????" : this.state.textvariable ? data.GameState.Seats.Seat[i].PlayerInfo.attr.nickname : this.watchNickname ? "????" : data.GameState.Seats.Seat[i].PlayerInfo.attr.nickname),
                            chips: (data.GameState.Seats.Seat[i].PlayerInfo.attr.hideStack == "true" ? "####" : this.state.textvariable ? data.GameState.Seats.Seat[i].PlayerInfo.hasOwnProperty("Chips") ? data.GameState.Seats.Seat[i].PlayerInfo.Chips.attr["stack-size"] : 0 : this.watchstack ? "####" : data.GameState.Seats.Seat[i].PlayerInfo.hasOwnProperty("Chips") ? data.GameState.Seats.Seat[i].PlayerInfo.Chips.attr["stack-size"] : 0),
                            status: "takenActive",
                            seat: i,
                            action: "",
                            knockoutBounty: "KOB  " + ((Number(data.GameState.Seats.Seat[i].PlayerInfo.attr.knockOutFee)) + Number(data.GameState.Seats.Seat[i].PlayerInfo.attr.knockOutAmount)),
                            enableTwoX: (data.GameState.Seats.Seat[i].PlayerInfo.attr.enableTwoX === "true" ? true : false),
                            NoofBB: data.GameState.Seats.Seat[i].attr.hasOwnProperty("noOfBB") ? data.GameState.Seats.Seat[i].attr.noOfBB : "",
                            me: this.player
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
                            let time
                            try {
                                time = (Number(data.GameState.Seats.Seat[i].Timer.attr?.time) - Number(data.Message.GameState.Seats.Seat[i].Timer.attr?.elapsed)) / 1000;
                                let balanceObj = {
                                    available: data.GameState.Seats.Seat[i].Timer.BuyChips?.attr?.available,
                                    min: data.GameState.Seats.Seat[i].Timer.BuyChips.attr?.min,
                                    max: data.GameState.Seats.Seat[i].Timer.BuyChips.attr?.max,
                                    time: time,
                                    runTimer: true,
                                };
                                this.setState({ balance: balanceObj, showBuyChips: true, showTourneyInfoBoard: false });
                                console.log("showBuyChips1")
                            } catch (e) { console.log(e) }
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
                    if (this.rearrangeSeat && this.state.textvariable) {
                        this.seatsRef.current.RearrageSeat(this.gameState);
                    }
                    if (this.state.textvariable) {

                        this.rearrangeSeat = false;
                    } else {

                        this.rearrangeSeat = true;
                    }

                    if (data.GameState.Seats.Seat[i].hasOwnProperty("Cards")) {
                        this.cards = [];
                        this.playerCards = [];
                        this.playerCards1 = [];
                        if (Number(this.player.id) === Number(i)) {
                            for (let j = 0; j < data.GameState.Seats.Seat[i].Cards.Card.length; j++) {
                                let card = fileName.name !== "Riverpoker" ? data.GameState.Seats.Seat[i].Cards.Card[j]['#text'] : this.decryptCards(data.GameState.Seats.Seat[i].Cards.Card[j]['#text']) == '' ? "xx" : this.decryptCards(data.GameState.Seats.Seat[i].Cards.Card[j]['#text']);
                                this.cards.push(card);
                                this.playerCards1.push(card)
                            }
                            let tab = document.getElementById(this.tableId);
                            try {
                                tab.innerHTML = this.getLastcards(this.playerCards1);
                                this.playerCards = this.playerCards1;
                            } catch (e) { console.log(e) }
                            this.setState({ infoChat: this.getLastcards(this.cards) });
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
            this.state.welcomeText = "";
            let waitForRebuy = this.state.waitForRebuy;
            let tourneyInfoBoard = this.state.tourneyInfoBoard;

            if (data.GameState.TournamentInfo.hasOwnProperty("Break")) {
                this.setState({ showBreakAlert: false });
                let t = data.GameState.TournamentInfo.Break.attr.periodFrom;
                let t2 = Math.abs(Number(Date.now()) - Number(t)) / 1000;
                let sec = Math.trunc(t2 % 60);
                let min = Math.trunc(t2 / 60);
                tourneyInfoBoard.breakTime = `${min} min ${sec} sec`;
                this.setState({ tourneyInfoBoard: tourneyInfoBoard });
            }
            if (data.GameState.TournamentInfo.hasOwnProperty("CurrentLevel")) {
                tourneyInfoBoard.cStakes = data.GameState.TournamentInfo.CurrentLevel.attr.lowStake + "/" + data.GameState.TournamentInfo.CurrentLevel.attr.highStake;
                tourneyInfoBoard.cLevel = data.GameState.TournamentInfo.CurrentLevel.attr.number;
            }
            if (data.GameState.TournamentInfo.hasOwnProperty("NextLevel")) {
                tourneyInfoBoard.nLevel = data.GameState.TournamentInfo.NextLevel.attr.number;
                tourneyInfoBoard.nStakes = data.GameState.TournamentInfo.NextLevel.attr.lowStake + "/" + data.GameState.TournamentInfo.NextLevel.attr.highStake;
                this.setState({ tourneyInfoBoard: tourneyInfoBoard });
            }
            if (data.GameState.TournamentInfo.hasOwnProperty("attr")) {
                if (data.GameState.TournamentInfo.attr.status === "COMPLETED") {
                    this.setState({ welcomeText: "Tournament Completed" });
                }
            }

            if (this.player.id) {
                if (data.GameState.TournamentInfo.hasOwnProperty("Rebuy")) {
                    waitForRebuy.count = data.GameState.TournamentInfo.Rebuy.attr.count;
                    waitForRebuy.chips = data.GameState.TournamentInfo.Rebuy.attr.chips;
                    waitForRebuy.cost = data.GameState.TournamentInfo.Rebuy.attr.cost;
                }
                this.setState({ waitForRebuy: waitForRebuy });

                if (data.GameState.TournamentInfo.hasOwnProperty("Addon")) {
                    if (Number(data.GameState.TournamentInfo.Addon.attr.count) > 0) {
                        // if (Number(this.player.id) === Number(data.GameState.TournamentInfo.Active.attr.seat)) {
                        switch (this.state.addonsetting) {
                            case "hide":
                                this._tableNetwork.send('<ReBuy/>');
                                this.setState({ showAddonAlert: false });
                                break;
                            case "show":
                                this.setState({ addonData: `You can add ${Number(data.GameState.TournamentInfo.Addon.attr.chips).toLocaleString("en-US")} at the cost of ${Number(data.GameState.TournamentInfo.Addon.attr.cost).toLocaleString("en-US")}` })
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
        this.setState({ buddyData: "Raj" });
    }



    onGetPlayerInfo(data) {
        if (data.PlayerInfo.hasOwnProperty("attr")) {
            let player = data.PlayerInfo.attr.nickname;
            this.windowTitle = "User: " + player + " || " + this.tableName + " || " + this.gameType + " " + this.stakes;
            document.getElementsByTagName("title")[0].innerHTML = this.windowTitle;
        }
    }


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
        var AvailableBalance = data.BalanceInfo.attr.available.split(".")[0];
        var MinBalance = data.BalanceInfo.attr.min.split(".")[0];
        var MaxBalance = data.BalanceInfo.attr.max.split(".")[0];

        let newAvlBal = UM.changeAmtLabel(AvailableBalance);
        let newMinBal = UM.changeAmtLabel(MinBalance);
        let newMaxBal = UM.changeAmtLabel(MaxBalance);


        let balanceObj = {
            available: AvailableBalance,
            min: MinBalance,
            max: MaxBalance,
            // newAvlBal: newAvlBal,
            newAvlBal: ((typeof newAvlBal === "string" ? (newAvlBal.includes('.') ? `${UM.numberWithCommas(newAvlBal.substring(0, newAvlBal.length - 1).split(".")[0])}.${UM.numberWithCommas(newAvlBal.substring(0, newAvlBal.length - 1).split(".")[1])}${newAvlBal.charAt(newAvlBal.length - 1)}` : `${UM.numberWithCommas(newAvlBal.substring(0, newAvlBal.length - 1))}${newAvlBal.charAt(newAvlBal.length - 1)}`) : newAvlBal)),
            // newMinBal: newMinBal,
            newMinBal: ((typeof newMinBal === "string" ? (newMinBal.includes('.') ? `${UM.numberWithCommas(newMinBal.substring(0, newMinBal.length - 1).split(".")[0])}.${UM.numberWithCommas(newMinBal.substring(0, newMinBal.length - 1).split(".")[1])}${newMinBal.charAt(newMinBal.length - 1)}` : `${UM.numberWithCommas(newMinBal.substring(0, newMinBal.length - 1))}${newMinBal.charAt(newMinBal.length - 1)}`) : newMinBal)),
            // newMaxBal: newMaxBal,
            newMaxBal: ((typeof newMaxBal === "string" ? (newMaxBal.includes('.') ? `${UM.numberWithCommas(newMaxBal.substring(0, newMaxBal.length - 1).split(".")[0])}.${UM.numberWithCommas(newMaxBal.substring(0, newMaxBal.length - 1).split(".")[1])}${newMaxBal.charAt(newMaxBal.length - 1)}` : `${UM.numberWithCommas(newMaxBal.substring(0, newMaxBal.length - 1))}${newMaxBal.charAt(newMaxBal.length - 1)}`) : newMaxBal)),
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
        this.setState({ showBuyChips: true, showInfoPanel: "none", showTourneyInfoBoard: false });
    }

    onGetServerTime(data) {
        this.time = new Date(parseInt(data.ServerTime.attr.time)).toLocaleTimeString();
        let time = new Date(parseInt(data.ServerTime.attr.time));
        this.serverTime = data.ServerTime.attr.time;
        this.setState({ time: `${time.getHours()}: ${time.getMinutes()}` });
    }

    onActiveSeats(data) {
        this.seatsRef.current.onAciveSeats(data);
        this.seatsRef.current.CallTimeTableDetails(data.ActiveSeats);
        if (data.ActiveSeats.hasOwnProperty("Seat")) {
            this.activeSeatCount = Number(data.ActiveSeats.Seat.length);
            console.log(data)
            let cnt = data.ActiveSeats.Seat.length
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

            }
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
                    this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}>: ${seats.Seat[index].name} left the table ` });
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
                        if (this.playerCards1.length > 1) {
                            let cardsLength = this.playerCards1.length;
                            for (let p = 0; p < cardsLength; p++) {
                                playerCards.push("xx")
                            }
                            let tab = document.getElementById(this.tableId);
                            try {
                                tab.innerHTML = this.getLastcards(playerCards);
                                this.playerCards = playerCards;
                            } catch (e) { console.log(e) }
                        }

                    }
                    this.setState({ options: options });


                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "SitOut",
                        amount: "",
                    });
                    setTimeout(() => {
                        if (this.player.id === index) {
                            if (this.gameState.status === 'readyToTake') {
                                let options = this.state.options;
                                options.action = []
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

                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "SitIn",
                        amount: "",
                    });
                }
                if (data.PlayerAction.hasOwnProperty("UseTimeBank")) {
                    this.startTimer(index, Number(data.PlayerAction.UseTimeBank.attr.startTime), Number(data.PlayerAction.UseTimeBank.attr.time), 0);
                    if (Number(index) === Number(this.player.id)) {
                        this.seatsRef.current.iniTimerSound(this.player.id)
                        this.startCountDown(index, data.PlayerAction.UseTimeBank.attr.startTime, data.PlayerAction.UseTimeBank.attr.time, this.tableId);
                    }
                }
                if (data.PlayerAction.hasOwnProperty("TimedOut")) {
                    this.setGcActions(data.PlayerAction.attr.seat);
                }
                if (data.PlayerAction.hasOwnProperty("PostSmallBlind")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "PostSmallBlind",
                        amount: data.PlayerAction.PostSmallBlind.attr.amount,
                    });
                    this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> <span style = color:'red'>${seats.Seat[index].name}</span> Posts Small Blind ${Intl.NumberFormat('en-US').format(data.PlayerAction.PostSmallBlind.attr.amount)}` });
                    if (data.PlayerAction.PostSmallBlind.attr.hasOwnProperty("dead")) {
                        this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Dead Blind ${data.PlayerAction.PostSmallBlind.attr.dead}` });
                    }
                }
                if (data.PlayerAction.hasOwnProperty("PostBigBlind")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "PostBigBlind",
                        amount: data.PlayerAction.PostBigBlind.attr.amount,
                    });
                    this.state.options.bigblindValue = data.PlayerAction.PostBigBlind.attr.amount;
                    this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Posts Big Blind ${Intl.NumberFormat('en-US').format(data.PlayerAction.PostBigBlind.attr.amount)}` });
                    if (data.PlayerAction.PostBigBlind.attr.hasOwnProperty("dead")) {
                        this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Dead Blind ${data.PlayerAction.PostBigBlind.attr.dead}` });
                    }
                }
                if (data.PlayerAction.hasOwnProperty("PostThirdBlind")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "PostThirdBlind",
                        amount: data.PlayerAction.PostThirdBlind.attr.amount,
                    });
                    this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Posts Third Blind ${Intl.NumberFormat('en-US').format(data.PlayerAction.PostThirdBlind.attr.amount)}` });
                    if (data.PlayerAction.PostThirdBlind.attr.hasOwnProperty("dead")) {
                        this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Dead Blind ${data.PlayerAction.PostThirdBlind.attr.dead}` });
                    }
                }
                if (data.PlayerAction.hasOwnProperty("Fold")) {
                    if (Number(index) === Number(this.player.id)) {
                        let playerCards = [];
                        for (let p = 0; p < this.playerCards1.length; p++) {
                            playerCards.push("xx")
                        }
                        let tab = document.getElementById(this.tableId);
                        try {
                            tab.innerHTML = this.getLastcards(playerCards);
                            this.playerCards = playerCards;
                        } catch (e) { console.log(e) }
                    }
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "Fold",
                        amount: "",
                    });
                    this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Folded ` });
                }
                if (data.PlayerAction.hasOwnProperty("UncalledBet")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "UncalledBet",
                        amount: data.PlayerAction.UncalledBet.attr.amount,
                    });
                    this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} gets Uncalled Bet amount <span style = color:#ff0000 > ${Intl.NumberFormat('en-US').format(data.PlayerAction.UncalledBet.attr.amount)}</span> back` });
                }
                if (data.PlayerAction.hasOwnProperty("PostAnte")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "PostAnte",
                        amount: data.PlayerAction.PostAnte.attr.amount,
                    });
                }
                if (data.PlayerAction.hasOwnProperty("Check")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "Check",
                        amount: "",
                    });
                    this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Checked ` });
                }
                if (data.PlayerAction.hasOwnProperty("Raise")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "Raise",
                        amount: data.PlayerAction.Raise.attr.amount,
                    });
                    this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Raised To  ${Intl.NumberFormat('en-US').format(data.PlayerAction.Raise.attr.amount)}` });
                }
                if (data.PlayerAction.hasOwnProperty("Call")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "Call",
                        amount: data.PlayerAction.Call.attr.amount,
                    });
                    this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Called  ${Intl.NumberFormat('en-US').format(data.PlayerAction.Call.attr.amount)}` });
                }
                if (data.PlayerAction.hasOwnProperty("Bet")) {
                    this.seatsRef.current.onPlayerAction({
                        seat: index,
                        action: "Bet",
                        amount: data.PlayerAction.Bet.attr.amount,
                    });
                    this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} Betting  ${Intl.NumberFormat('en-US').format(data.PlayerAction.Bet.attr.amount)}` });
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

                        this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} accepted <span style = color:#ff0000 >Run It Twice</span>` });
                    }
                    if (data.PlayerAction.RunItTwice.attr.accept === "false") {
                        this.setState({ callRitOnce: true })

                        let index = data.PlayerAction.attr.seat;
                        this.seatsRef.current.onPlayerAction({
                            seat: index,
                            action: "RunItOnce",
                            amount: "",
                        });

                        this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} accepted <span style = color:#ff0000 >Run It Once</span>` });
                    }
                    setTimeout(() => {
                        this.setState({ callRitOnce: false, callRitTwice: false })
                    }, 3000)
                }
            }
        }
        this.setState({ seats: seats });

        if (data.PlayerAction.hasOwnProperty("Show")) {
            let seat = data.PlayerAction.attr.seat;
            this.seatsRef.current.showCards(Number(seat), { Cards: data.PlayerAction.Show.Cards });
        }
    }

    onNewPlayer(data) {
        if (data.NewPlayer.hasOwnProperty("PlayerInfo")) {
            let seats = this.state.seats;
            let index = data.NewPlayer.attr.seat;
            let options = this.state.options;
            if (data.NewPlayer.attr.me === "true") {
                this.player.name = data.NewPlayer.PlayerInfo.attr.nickname;
                this.player.id = data.NewPlayer.attr.seat;
                options.showChecks = true;
                this.setState({ options: options });
            }
            if (data.NewPlayer.hasOwnProperty("PlayerInfo")) this.players[data.NewPlayer.PlayerInfo.attr.nickname] = data.NewPlayer.attr.seat;
            this.seatsRef.current.onNewPlayer(
                {
                    name: data.NewPlayer.PlayerInfo.attr.nickname,
                    chips: data.NewPlayer.PlayerInfo.hasOwnProperty("Chips") ? data.NewPlayer.PlayerInfo.Chips.attr["stack-size"] : 0,
                    status: "takenActive",
                    seat: data.NewPlayer.attr.seat,
                    me: this.player
                },
                this.player
            );
            seats.Seat[index].name = data.NewPlayer.PlayerInfo.attr.nickname;
            this.setState({ seats: seats });
            this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} joined table` });
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
                    this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} left the table` });
                    delete this.players[seats.Seat[index].name];
                    seats.Seat[index].name = "Take Seat";
                    this.setState({ seats: seats });
                    if (data.NewPlayer.attr.available == "false") {
                        this.seatsRef.current.onNewPlayer({
                            name: (this.state.textvariable == false ? "Take Seat" : "Open Seat"),
                            chips: "",
                            status: (this.state.textvariable == false ? "readyToTake" : "onlyMe"),
                            seat: index,
                            me: this.player
                        });
                    } else {
                        let options = this.state.options;
                        options.action = [];
                        this._tableNetwork.send(`<GetGameState/>`);
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
        console.log("==========================================")
        console.log(data)
        let waitList = this.state.waitList;
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

    onGetTakeSeat(data) {
        this._tableNetwork.send(`<TakeSeat seat='${data.TakeSeat.attr.seat}'/>`);
    }

    onChipsRebuy(data) {
        console.log(data)
        console.log(data.sessionInfo)
        let d = data.sessionInfo.playersInfo.map(data => data.numSeat)
        console.log(d)
        console.log("step 2")
        if (data) { // seat no
            let seats = this.state.seats;
            // let index = data.ChipsRebuy.attr.seat;
            let index = 1;
            // this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[index].name} added <span style = color:#ff0000>${Intl.NumberFormat('en-US').format(data.ChipsRebuy.attr.amount)}</span> to the table ` });

            this.setState({ seats: seats });
            // this.seatsRef.current.onChipsRebuy({ seat: data.ChipsRebuy.attr.seat, amount: data.ChipsRebuy.attr.amount });
            this.seatsRef.current.onChipsRebuy({ seat: 1, amount: 200 });
            // this.setPopUpActions("hideReBuyChips");
            // this._tableNetwork.send(`<GetGameState/>`);
        }
    }

    onNewHand(data) {
        this.setState({ showcombpercent: false, waitRebuyAlert: { show: false } });
        let tipInfo = this.state.tipInfo;
        let remaining = this.state.cDtimer.value
        if (!this.state_autoPost || !this.state_autoMuck) {
            this.setState({ showCheckAlert: true });
        }
        if (data.NewHand.hasOwnProperty("attr")) {
            if (data.NewHand.attr.hasOwnProperty("number")) {
                this.setState({ infoChat: `==========<span style = color:'red'> ${Intl.NumberFormat('en-US').format(data.NewHand.attr.number)}</span>==========` });
                tipInfo.CH = data.NewHand.attr.number;
            }
            if (data.NewHand.attr.hasOwnProperty("dealer")) {
                this.setState({ dealerSeat: data.NewHand.attr.dealer });
                this.seatsRef.current.onDealer(this.state.seatCnt, data.NewHand.attr.dealer);
                try {

                    this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${this.state.seats.Seat[data.NewHand.attr.dealer].name} dealing cards` });
                } catch (e) { console.log(e) }

            }
            this.setState({ nametextdealerid: data.NewHand.attr.dealer });
            this.setState({ welcomeText: "", tipInfo: tipInfo });
            this.setState({ showAddonAlert: false });
            console.log(data)
            // <---------------------------------------------------Manual prize pool start----------------------------------->
            if (data.NewHand.attr.enableManualDistribution === "true") {
                this.setState({ manualPrizePoolshwow: true, manualDistributionType: data.NewHand.attr.manualDistributionType, showTourneyInfoBoard: false })

            } else if (data.NewHand.attr.enableManualDistribution === "false") {
                this.setState({ manualPrizePoolshwow: false })
            }
            // <---------------------------------------------------Manual prize pool end----------------------------------->
        }
        try {
            if (this.state.textvariable) {
                let tab1 = document.getElementById(this.tableId);
                tab1.classList.add(`timeractive${remaining.toFixed(0)}`)
                this.removeclassName = `timeractive${remaining.toFixed(0)}`
            }
        } catch (e) { console.log(e) }
        // <-------------------------------------------hide  stack and hide name for declared "GetGameState"-->start------------------------>
        this._tableNetwork.send('<GetGameState/>');
        // <-------------------------------------------hide  stack and hide name for declared "GetGameState"--> end------------------------>
    }

    onDealer(data) {
        if (data.Dealer.hasOwnProperty("attr")) {
            if (data.Dealer.attr.hasOwnProperty("number")) {
                this.seatsRef.current.onDealer(this.state.seatCnt, data.Dealer.attr.number);
                this.setState({ dealerSeat: data.Dealer.attr.number });
                this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> <span style = color:#ff0000>${this.state.seats.Seat[data.Dealer.attr.number].name}</span> Dealing the Cards ` });
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
                            }
                            this.setState({ options: options });
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

                        for (i; i < cnt; i++) {
                            if (data.ActiveChange.Actions[actions[i]].hasOwnProperty("attr")) {
                                if (data.ActiveChange.Actions[actions[i]].attr.hasOwnProperty("amount")) {
                                    options.action.push({ name: actions[i], amount: data.ActiveChange.Actions[actions[i]].attr.amount });
                                } else if (data.ActiveChange.Actions[actions[i]].attr.hasOwnProperty("max")) {
                                    options.rangeMax = data.ActiveChange.Actions[actions[i]].attr.max;
                                    if (data.ActiveChange.Actions[actions[i]].attr.hasOwnProperty("min")) {
                                        options.rangeMin = data.ActiveChange.Actions[actions[i]].attr.min;
                                        options.action.push({ name: actions[i], amount: data.ActiveChange.Actions[actions[i]].attr.min });
                                    }
                                } else {
                                    options.rangeMax = 0;
                                    options.rangeMin = 0;
                                }
                            } else {
                                if (actions[i] !== "RunItTwice") {

                                    options.action.push({ name: actions[i], amount: "" });
                                } else {
                                    options.action.push({ name: "Run It Twice", amount: "" });
                                    options.action.push({ name: "Run It Once", amount: "" });
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
                            let num3 = Math.floor(Number(options.valuepot) / 2);
                            let num4 = Math.floor(Number(options.valuepot) / 3);
                            let num5 = Math.floor((2 * Number(options.valuepot)) / 3);
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
                        //     tab.innerHTML = this.getLastcards(this.playerCards);
                        // }

                        // let cTab = this.isTourney ? null : window.parent.document.getElementById(`c-tables-tab`);
                        // // console.log("====>> Cash tables tab: ", cTab, cTab.dataset.isactive);
                        // if (cTab && cTab.dataset.isactive == "true") {
                        //     cTab.style.animation = "loadImgs 0.5s infinite";
                        //     cTab.style.background = "aqua";
                        //     cTab.style.color = "black";
                        // }

                        // let tab = document.getElementById(this.tableId);
                        // if (tab && tab.dataset.isactive == "false") {
                        //     tab.style.animation = "loadImgs 0.5s infinite";
                        //     tab.style.background = "aqua";
                        //     // let id = tab.id;
                        //     tab.innerHTML = this.getLastcards(this.playerCards);
                        // }
                        let cTab = document.getElementById(`c-tables-tab`);
                        // console.log("====>> Cash tables tab: ", cTab, cTab.dataset.isactive);
                        if (cTab && cTab.dataset.name == "c-tables") {
                            cTab.style.animation = "loadImgs 0.5s infinite";
                            cTab.style.background = "aqua";
                            cTab.style.color = "black";
                        }

                        // let cTab = this.isTourney ? null : window.parent.document.getElementById(`c-tables-tab`);
                        // // console.log("====>> Cash tables tab: ", cTab, cTab.dataset.isactive);
                        // if (cTab && cTab.dataset.isactive == "true") {
                        //     cTab.style.animation = "loadImgs 0.5s infinite";
                        //     cTab.style.background = "aqua";
                        //     cTab.style.color = "black";
                        // }

                        // setTimeout(() => {
                        this.setState({ options: options });
                        // }, 20);
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
                                    options.quickAction.push({ name: actions[j], amount: data.ActiveChange.Actions[actions[j]].attr.amount });
                                } else if (data.ActiveChange.Actions[actions[j]].attr.hasOwnProperty("max")) {
                                    options.rangeMax = data.ActiveChange.Actions[actions[j]].attr.max;
                                    if (data.ActiveChange.Actions[actions[j]].attr.hasOwnProperty("min")) {
                                        options.rangeMin = 0;
                                        options.rangeMin = data.ActiveChange.Actions[actions[j]].attr.min;
                                        options.quickAction.push({ name: actions[j], amount: data.ActiveChange.Actions[actions[j]].attr.min });
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
                }
            }
        }
    }
    getLastcards(cards) {
        if (cards.length) {
            return cards.reduce((ac, card) => {
                return (ac += `<img className="tab-card" width = 15px height = 21px src=chatCards/${card}.png />`);
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
        console.log(">>> dealing player cards: ", data);
        console.log("step 4")
        this.cards = [];
        this.playerCards = [];
        this.playerCards1 = [];
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
                        this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> Dealing Player Cards ` });
                        if (Number(this.player.id) === Number(index)) {
                            for (j; j < cnt2; j++) {
                                let card = fileName.name !== "Riverpoker" ? data.DealingCards.Seat[i].Cards.Card[j]["#text"] : this.decryptCards(data.DealingCards.Seat[i].Cards.Card[j]["#text"]) == '' ? "xx" : this.decryptCards(data.DealingCards.Seat[i].Cards.Card[j]["#text"]);
                                this.playerCards1.push(card)
                            }
                        }

                    }
                }
            }

        }
        let tab = document.getElementById(this.tableId);
        try {
            tab.innerHTML = this.getLastcards(this.playerCards1);
            this.playerCards = this.playerCards1;
        } catch (e) { console.log(e) }
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
                this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> Dealing Flop Cards ` });
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
            this.setState({ infoChat: this.getLastcards(this.cards) });
        }
    }

    onDealingTurn(data) {
        let ritFlop = this.state.ritFlop;
        if (data.DealingTurn.hasOwnProperty("Cards")) {
            if (data.DealingTurn.Cards.hasOwnProperty("Card")) {
                this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> Dealing Turn Card ` });
                this.boardCardsRef.current.addCards("turn", data.DealingTurn.Cards.Card["#text"], 0);
                // this.cards_table = this.cards_table + "  " + data.DealingTurn.Cards.Card["#text"];
                ritFlop.cardTurn = data.DealingTurn.Cards.Card["#text"];
                this.cards.push(data.DealingTurn.Cards.Card["#text"]);
            }
            this.setState({ infoChat: this.getLastcards(this.cards) });
        }
    }

    onDealingRiver(data) {
        let ritFlop = this.state.ritFlop;
        if (data.DealingRiver.hasOwnProperty("Cards")) {
            if (data.DealingRiver.Cards.hasOwnProperty("Card")) {
                this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> Dealing River Card ` });
                this.boardCardsRef.current.addCards("river", data.DealingRiver.Cards.Card["#text"], 0);
                ritFlop.cardRiver = data.DealingRiver.Cards.Card["#text"];
                // this.cards_table = this.cards_table + "  " + data.DealingRiver.Cards.Card["#text"];
                this.cards.push(data.DealingRiver.Cards.Card["#text"]);
            }
            this.setState({ infoChat: this.getLastcards(this.cards) });
        }
    }

    onCombinationChange(data) {
        if (data.CombinationChange.hasOwnProperty("attr")) {
            if (data.CombinationChange.attr.hasOwnProperty("seat")) {
                if (this.player.id === data.CombinationChange.attr.seat) {
                    this.setState({ playerCombination: data.CombinationChange.attr.strength });
                    if (data.CombinationChange.attr.hasOwnProperty("winProbability")) {
                        this.setState({ winStrength: data.CombinationChange.attr.winProbability });
                        this.setState({ showcombpercent: true });
                    } else {
                        this.setState({ winStrength: " " });
                        this.setState({ showcombpercent: false });
                    }
                } else {
                    this.seatsRef.current.onCombinationChange(data);
                }
            }
        }
    }

    onDealingRitFlop(data) {
        let ritFlop = this.state.ritFlop;
        if (data.DealingRitFlop.hasOwnProperty("RitCards")) {
            if (data.DealingRitFlop.RitCards.hasOwnProperty("Card")) {
                let i = 0,
                    cnt = data.DealingRitFlop.RitCards.Card.length;
                this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> Dealing RIT Flop Cards ` });
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
                this.setState({ infoChat: this.getLastcards(this.cards) });
            }
        }
    }
    onDealingRitRiver(data) {
        let ritFlop = this.state.ritFlop;
        if (data.DealingRitRiver.hasOwnProperty("RitCards")) {
            if (data.DealingRitRiver.RitCards.hasOwnProperty("Card")) {
                this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> Dealing River Card ` });
                if (ritFlop.cardRiver !== data.DealingRitRiver.RitCards.Card["#text"]) {

                    this.ritBoardCardsRef.current.addCards("river", data.DealingRitRiver.RitCards.Card["#text"], 0);
                }
                // this.cards_table = this.cards_table + "  " + data.DealingRitRiver.RitCards.Card["#text"];
                this.cards.push(data.DealingRitRiver.RitCards.Card["#text"]);
            }
            this.setState({ infoChat: this.getLastcards(this.cards) });
        }
    }

    onDealingRitTurn(data) {
        let ritFlop = this.state.ritFlop;
        if (data.DealingRitTurn.hasOwnProperty("RitCards")) {
            if (data.DealingRitTurn.RitCards.hasOwnProperty("Card")) {
                this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> Dealing RIT Turn Card ` });
                if (ritFlop.cardTurn !== data.DealingRitTurn.RitCards.Card["#text"]) {

                    this.ritBoardCardsRef.current.addCards("turn", data.DealingRitTurn.RitCards.Card["#text"], 0);
                }
                // this.cards_table = this.cards_table + "  " + data.DealingRitTurn.RitCards.Card["#text"];
                this.cards.push(data.DealingRitTurn.RitCards.Card["#text"]);
            }
            this.setState({ infoChat: this.getLastcards(this.cards) });
        }
    }

    onRitCombinationChange(data) {
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
                            this.setState({ winStrength: " " });
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
        this.seatsRef.current.onWinner(this.player.id, data);
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
            this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[id].name} won <span style = color:#ff0000> ${Intl.NumberFormat('en-US').format(amt)}</span> from main pot with <span style = color:#045c08>${combination}</span>` });
        } else {
            this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> ${seats.Seat[id].name} won ${Intl.NumberFormat('en-US').format(amt)} from main pot ` });
        }
        if (data.Winner.hasOwnProperty("Board")) {
            this.boardCardsRef.current.showWinningCombination(data.Winner.Board.Card, this.state.boardCardXSpace);
        }
        this.setGcActions(this.player.id)
    }

    onGetSessionStatistics(data) {
        let played, won, bets, winBets, time, buyIn, showDown;
        if (data.SessionStatistics.hasOwnProperty("Hands")) {
            played = data.SessionStatistics.Hands.attr.total;
            won = data.SessionStatistics.Hands.attr.won;
        }
        if (data.SessionStatistics.hasOwnProperty("attr")) {
            bets = data.SessionStatistics.attr.bets;
            winBets = data.SessionStatistics.attr.wins;
            time = new Date(parseInt(data.SessionStatistics.attr.sessionStartTime)).toLocaleString();
            buyIn = data.SessionStatistics.attr.buyIn;
        }
        if (data.SessionStatistics.hasOwnProperty("Showdown")) {
            showDown = data.SessionStatistics.Showdown.attr.total;
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
            this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> <span style = color:#ff0000>${Intl.NumberFormat('en-US').format(data.ReservedChipsChange.attr.amount)}</span> will be added to ${this.player.name} in the next hand` });
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
                            // if (Number(this.player.id) === Number(index) ) {
                            // switch (this.state.addrebuysetting) {
                            //     case "show":
                            //         this.setState({ showWaitForRebuy: true });
                            //         break;
                            //     case "hide":
                            //         this._tableNetwork.send("<ReBuy/>");
                            //         this.setState({ nexthandshow: false });
                            //         this.setState({ nexthand: "successfully add rebuy chips " });
                            //         setInterval(() => {
                            //             this.setState({ nexthandshow: true });
                            //         }, 10000);
                            //         break;
                            //     case "show2x":
                            //         this.setState({ showWaitForRebuy: true });
                            //         break;
                            //     case "hide2x":
                            //         this._tableNetwork.send('<ReBuy number="2" />');
                            //         this.setState({ nexthandshow: false });
                            //         this.setState({ nexthand: "successfully add rebuy 2x chips " });
                            //         setInterval(() => {
                            //             this.setState({ nexthandshow: true });
                            //         }, 10000);
                            //         break;
                            // }

                            this.setState({ showWaitForRebuy: true, showTourneyInfoBoard: false });
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
        let relax = `${minOne} min ${secOne} sec`;
        console.log(relax)
        let breakalert = this.state.breakalert;
        breakalert.lineOne = "tournament begins in";
        breakalert.timeOne = Date.now();
        breakalert.timeTwo = +(minOne * 60000) + +(secOne * 1000);

        this.setState({ breakalert: breakalert });
        this.setState({ showBreakAlert: true, showTourneyInfoBoard: false });
    }
    onTournamentInfoChange(data) {
        let waitForRebuy = this.state.waitForRebuy;
        let tourneyInfoBoard = this.state.tourneyInfoBoard;
        if (data.TournamentInfoChange.hasOwnProperty("TournamentInfo")) {
            if (data.TournamentInfoChange.TournamentInfo.hasOwnProperty("attr")) {
                if (data.TournamentInfoChange.TournamentInfo.attr.status === "COMPLETED") {
                    this.setState({ welcomeText: "Tournament Completed" });
                    this.seatsRef.current.clearTheTableSeats(0);
                }
            }
            if (data.TournamentInfoChange.TournamentInfo.hasOwnProperty("Rebuy")) {
                waitForRebuy.count = data.TournamentInfoChange.TournamentInfo.Rebuy.attr.count;
                waitForRebuy.chips = data.TournamentInfoChange.TournamentInfo.Rebuy.attr.chips;
                waitForRebuy.cost = data.TournamentInfoChange.TournamentInfo.Rebuy.attr.cost;
            }
            this.setState({ waitForRebuy: waitForRebuy });

            if (data.TournamentInfoChange.TournamentInfo.hasOwnProperty("CurrentLevel")) {
                tourneyInfoBoard.cStakes = data.TournamentInfoChange.TournamentInfo.CurrentLevel.attr.lowStake + "/" + data.TournamentInfoChange.TournamentInfo.CurrentLevel.attr.highStake;
                tourneyInfoBoard.cLevel = data.TournamentInfoChange.TournamentInfo.CurrentLevel.attr.number;
            }
            if (data.TournamentInfoChange.TournamentInfo.hasOwnProperty("NextLevel")) {
                tourneyInfoBoard.nLevel = data.TournamentInfoChange.TournamentInfo.NextLevel.attr.number;
                tourneyInfoBoard.nStakes = data.TournamentInfoChange.TournamentInfo.NextLevel.attr.lowStake + "/" + data.TournamentInfoChange.TournamentInfo.NextLevel.attr.highStake;
                this.setState({ tourneyInfoBoard: tourneyInfoBoard });
            }
            if (data.TournamentInfoChange.TournamentInfo.hasOwnProperty("Break")) {
                this.setState({ showBreakAlert: false });
                let t = data.TournamentInfoChange.TournamentInfo.Break.attr.periodFrom;
                let t2 = Math.abs(Number(Date.now()) - Number(t)) / 1000;

                let sec = Math.trunc(t2 % 60);
                let min = Math.trunc(t2 / 60);
                tourneyInfoBoard.breakTime = `${min} min ${sec} sec`;

                this.setState({ tourneyInfoBoard: tourneyInfoBoard });
            }

            if (this.player.id) {
                if (data.TournamentInfoChange.TournamentInfo.hasOwnProperty("Rebuy")) {
                    waitForRebuy.count = data.TournamentInfoChange.TournamentInfo.Rebuy.attr.count;
                    waitForRebuy.chips = data.TournamentInfoChange.TournamentInfo.Rebuy.attr.chips;
                    waitForRebuy.cost = data.TournamentInfoChange.TournamentInfo.Rebuy.attr.cost;
                }
                this.setState({ waitForRebuy: waitForRebuy });

                if (data.TournamentInfoChange.TournamentInfo.hasOwnProperty("Addon")) {
                    if (Number(data.TournamentInfoChange.TournamentInfo.Addon.attr.count) > 0) {
                        console.log(data)
                        // if (this.player.id) {
                        switch (this.state.addonsetting) {
                            case "hide":
                                this._tableNetwork.send('<ReBuy/>');
                                this.setState({ showAddonAlert: false });
                                break;
                            case "show":
                                this.setState({ addonData: `You can add ${Number(data.TournamentInfoChange.TournamentInfo.Addon.attr.chips).toLocaleString("en-US")} at the cost of ${Number(data.TournamentInfoChange.TournamentInfo.Addon.attr.cost).toLocaleString("en-US")}` })
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
                    this.setState({ addonData: `You can add ${Number(data.TournamentInfoChange.TournamentInfo.Addon.attr.chips).toLocaleString("en-US")} at the cost of ${Number(data.TournamentInfoChange.TournamentInfo.Addon.attr.cost).toLocaleString("en-US")}` })
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
        if (Array.isArray(data.TournamentPlayerRanked)) {
            let i = 0,
                cnt = data.TournamentPlayerRanked.length;
            for (i; i < cnt; i++) {
                if (data.TournamentPlayerRanked[i].hasOwnProperty("attr")) {
                    let nickName = data.TournamentPlayerRanked[i].attr.nickname;
                    if (nickName === this.player.name) {
                        tplayerRankAlert.lineOne = `You took the ${Number(data.TournamentPlayerRanked[i].attr.placeTo).toLocaleString("en-US")} place`;
                        tplayerRankAlert.lineTwo = `amount: ${Number(data.TournamentPlayerRanked[i].attr.cashPayout).toLocaleString("en-US")}`;
                        this.setState({ tplayerRankAlert: tplayerRankAlert });
                        this.setState({ showTplayerRankAlert: true, showTourneyInfoBoard: false });
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
                    tplayerRankAlert.lineOne = `You took the ${data.TournamentPlayerRanked.attr.placeTo} place`;
                    tplayerRankAlert.lineTwo = `amount: ${Number(data.TournamentPlayerRanked.attr.cashPayout).toLocaleString("en-US")}`;
                    this.setState({ tplayerRankAlert: tplayerRankAlert });
                    this.setState({ showTplayerRankAlert: true, showTourneyInfoBoard: false });
                    // setTimeout(() => {
                    //     this._tableNetwork.send("<CloseTable/>");
                    // }, 5000);

                }
            }
        }
        if (this.state.knoutdetailsboolean) {
            if (Number(this.state.knoutdetails.KnockoutPayouts.KnockoutPayout.attr.seat) === Number(this.player.id)) {

                if (Number(this.state.knoutdetails.KnockoutPayouts.KnockoutPayout.attr.busted) === Number(data.TournamentPlayerRanked.attr.seat)) {
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

                    }, 10000)
                }

            }
        }
    }

    onChatMessage(data) {
        console.log("chat message: ", data);
        if (data.ChatMessage.attr.level === "PLAYER") {
            let id = this.players[data.ChatMessage.attr.sender];
            this.seatsRef.current.onChatMessage(data.ChatMessage["#text"], Number(id));
            this.setState({ infoChat: ` [${this.time}] <img src = ${dIcon}> <span style = color:#ff0000>${data.ChatMessage.attr.sender}</span> ${data.ChatMessage["#text"]}` });
        }

        if (data.ChatMessage.hasOwnProperty("attr")) {
            if (data.ChatMessage.attr.level === "INFO") {
                try {
                    console.log(data.ChatMessage["#text"])

                    var matches = data.ChatMessage["#text"].match(/[0-9]+/g)
                    // console.log(matches[0], "<--                    --->", matches[1])
                    if ((Number(matches[0])) > 0 && (Number(matches[1])) >= 0) {
                        this.setState({ showTimerBreak: true })
                        let timeseconds = (((Number(matches[0])) * 60) + (Number(matches[1])))
                        this.myRef.current.childMethod(timeseconds)
                        setTimeout(() => {
                            this.setState({ showTimerBreak: false })
                        },
                            (timeseconds) * 1000);
                    } else if (Number(matches[0]) > 0) {
                        this.setState({ showTimerBreak: true })
                        let timeseconds = (Number(matches[0]))
                        this.myRef.current.childMethod(timeseconds)
                        setTimeout(() => {
                            this.setState({ showTimerBreak: false })
                        },
                            (timeseconds) * 1000);
                    }

                    let breakalert = this.state.breakalert;
                    breakalert.lineOne = "tournament is on Break";
                    breakalert.timeOne = Date.now();
                    breakalert.timeTwo = Number(matches[0]) * 1000;
                    this.setState({ breakalert: breakalert });
                    this.setState({ showBreakAlert: true, showTourneyInfoBoard: false });
                } catch (error) {
                    console.log(error)
                }
                // this.setState({ showTimerBreak: true })
                // var matches = data.ChatMessage["#text"].match(/[0-9]+/g)
                console.log("timer" + data.ChatMessage["#text"])
                this.setState({ infoChat: `[${this.time}] <img src = ${dIcon}> ${data.ChatMessage["#text"]}` });
                // this.setState({ welcomeText: data.ChatMessage["#text"] });
            }

        }
    }

    onGetBadBeatJackpot(data) {
        this.setState({ bbj: data.BadBeatJackpot.attr.amount });
    }

    onEndHand(data) {
        // console.clear()
        // this.playerCards = [];
        var playerCards = [];
        let tab = document.getElementById(this.tableId);

        let tab1 = document.getElementById(this.tableId);
        try {
            if (this.state.textvariable) { tab1.classList.remove(this.removeclassName) }
        } catch (e) { console.log(e) }

        for (let i = 0; i < this.playerCards.length; i++) {
            playerCards.push("xx");
        }
        try {
            tab.innerHTML = this.getLastcards(playerCards);
            this.playerCards = playerCards;
        } catch (e) { console.log(e) }
        this.seatsRef.current.noTablePot();
        this.seatsRef.current.onEndHand();
        this.boardCardsRef.current.removeCards();
        this.ritBoardCardsRef.current.removeCards();
        // this.cards_table = "";
        this.cards = [];
        this.setState({ playerCombination: "" });
        this.setState({ infoChat: `==========End Of The Hand==========` });
        this.setState({ infoChat: `                                   ` });
        this.setState({ showcombpercent: false });
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
    }

    roundToTwo(num) {
        return +(Math.round(num + "e+2") + "e-2");
    }
    hidaAni() {
        this.setState({ showAniStage: false })
    }

    startTimer(id, startTime, duration, timeBank) {
        this.stopTimer(id);
        // let offset = duration - Math.abs(this.serverTime - startTime) - 20;
        let offset2 = duration > 5000 ? duration - 5000 : duration - 20;
        let min = startTime;
        let max = startTime + offset2;
        this.seatsRef.current.startTimer(this.player.id, id, min, max, offset2);
    }

    stopTimer(id) {
        this.seatsRef.current.stopTimer(id);
    }

    startCountDown(id, startTime, duration, tableId) {
        let remaining = Math.round(duration / 1000);

        // this.blinkTab()
        console.log("remaining Time >>>", remaining)
        if (remaining > 0) {
            let tab1 = document.getElementById(this.tableId)
            try {
                if (this.state.textvariable) {
                    tab1.classList.add(`timeractive${remaining.toFixed(0)}`)
                    this.removeclassName = `timeractive${remaining.toFixed(0)}`
                }
            } catch (e) { console.log(e) }
        }

        this.countDownTimer = setInterval(() => {
            if (remaining > 0) {
                this.setState({ cDtimer: { show: true, value: remaining } });
                remaining = remaining - 1;
                // let tab = window.parent.document.getElementsByClassName(`tableid0=${tableId}`)[0];
                let tab = document.getElementById(this.tableId);
                if (tab !== undefined) {
                    if (tab) {
                        tab.style.animation = 'loadImgs 0.5s infinite';
                        tab.style.background = 'aqua';
                    }
                }
            } else {

                this.stopCountDown(id);
                // let tab = window.parent.document.getElementsByClassName(`tableid0=${tableId}`)[0];
                let tab = document.getElementById(this.tableId);
                let tab1 = document.getElementById(this.tableId);
                if (tab !== undefined) {
                    if (tab) {
                        // tab1.classList.remove(this.removeclassName)
                        tab.style.animation = '';
                        tab.style.background = '#dfb276';
                    }
                    if (this.removeclassName != "") {

                        if (this.state.textvariable) { tab1.classList.remove(this.removeclassName) }
                    }
                }
                if (this.player.id === id) {
                    this._tableNetwork.send("<TimedOut/>");
                    this.setGcActions(id);
                } else {

                }
            }
        }, 1000);
    }



    stopCountDown(id) {
        if (this.countDownTimer !== undefined) {
            clearInterval(this.countDownTimer);
            this.setState({ cDtimer: { show: false, value: "" } });
            let tab = document.getElementById(this.tableId);
            let tab1 = document.getElementById(this.tableId);
            if (tab !== undefined) {
                if (tab) {
                    tab.style.animation = '';
                    tab.style.background = '#dfb276';
                }
                if (this.removeclassName != "") {
                    try {

                        if (this.state.textvariable) { tab1.classList.remove(this.removeclassName) }
                    } catch (e) { console.log(e) }
                }
            }
        }

    }

    onGetAlert(data) {
        if (data.Alert === "You are already at seat") {
            this.seatsRef.current.AlreadySeated(this.player.id);
        } else {
            let alert = this.state.infopanelalert;
            alert.lineOne = data.Alert;
            this.setState({ infopanelalert: alert });
            // this.setState({ showAlert: true });
        }
    }

    onGetError(data) {
        console.log("error data: ", data);
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
                default:
                    alert.lineOne = data.Error.attr.description;
                    this.setState({ alert: alert });
                    this.setState({ showAlert: true, showTourneyInfoBoard: false });
                    break;
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
                // this.setGcActions(this.state.options.seatId)
                this.setState({ showBuyChips: false });
                this.setState({
                    balance: {
                        available: 0,
                        min: 0,
                        max: 0,
                        time: 0,
                        runTimer: false,
                    },
                });

                break;
            case "hideBuyChips1":
                this.setState({ showBuyChips: false });
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
                        this.props.closeTTable(data)
                        this.clearTheTable()
                    }, 500);
                }
                break;
            case "hideExitAlert":
                this.setState({ showExitAlert: false });
                break;
            case "hideAlertone":
                this.setState({ showBreakAlert: false });
                break;
            case "hideTplayerAlert":
                this.setState({ showTplayerRankAlert: false });
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
                this.setState({ manualPrizePoolshwow: false })
                break;
            default:
                break;
        }
    }

    setMenuActions(action) {
        switch (action) {
            case "BuyChips":
                this.setState({ showBuyChips: true, showTourneyInfoBoard: false });
                console.log("showBuyChips3")
                break;
            case "Themes":
                this.setState({ showOptions: true, showTourneyInfoBoard: false });
                break;
            case "InvitePlayer":
                this.setState({ showInvitePlayer: true, showTourneyInfoBoard: false });
                break;
            case "openExitAlert":
                this.setState({ showExitAlert: true, showTourneyInfoBoard: false });
                break;
            case "Lobby":
                window.open("", "SooperPokerMainLobby").focus();
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
            case "Addon":
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
        console.log(data)
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
                this.setState({ showInfoPanel: "block" });
                break;
            case "hideTIP":
                let alert = this.state.infopanelalert;
                alert.lineOne = '';
                this.setState({ showInfoPanel: "none", infopanelalert: alert });
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
        this.setState({ tableLoded: false, showTourneyInfoBoard: false })
        console.log("===== clear the table======", this.tableData.tableId);
        this._tableNetwork.close(false);
        this.clearTheTable();
        setTimeout(() => {
            this.props.SaveIdmainlobby("remove", this.tableData.tableId)
            this.props.TableHandler("closeCashTable", { id: this.tableData.tableId });
            this.props.TableHandler(this.TableType, { id: this.tableData.tableId });
            console.log("====== table cleared. call for hiding");

        }, 1500);
    }
    TableOrLobbby(data) {
        // console.log(this.tableId)
        // console.log(this.playerCards)
        // console.log(this.state.cDtimer)
        let remaining = this.state.cDtimer.value
        if (data) {
            setTimeout(() => {
                let tab = document.getElementById(this.tableId);
                let tab1 = document.getElementById(this.tableId);
                if (this.playerCards.length != 0) {

                    tab.innerHTML = this.getLastcards(this.playerCards);
                }
                try {

                    if (this.state.textvariable) { this.removeclassName = `timeractive${remaining.toFixed(0)}` }
                } catch (e) { console.log(e) }

                if (remaining > 1) {
                    if (this.state.textvariable) { tab1.classList.add(`timeractive${remaining.toFixed(0)}`) }
                }
                console.log("TableOrLobbby", data)
            }, 100)
        }
        // else {
        // clearTimeout(this.TableOrLobbby)
        // }
        this.seatsRef.current.UpadateSeatProperties();
    }

    clearTheTable() {
        this.rearrangeSeat = false;

        this.watchNickname = false;
        this.watchstack = false
        this.Once_Call_buyIN_popup = true;
        this.seatsRef.current.clearTheTableSeats(0)
        this.boardCardsRef.current.removeCards();
        this.ritBoardCardsRef.current.removeCards();
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
        options.action = [];
        this.knock_Table = false;
        this.setState({ seatCnt: 0, options: options, knock_Table: false, textvariable: false });

        this.setState({ welcomeText: " " });
        this.setState({ isTimeForcedPaused: false, isTimeForcedPaused1: false })
        this.setState({ playerCombination: "" });
        this.setState({ showcombpercent: false });

        this.setState({ winStrength: " ", tableLoded: false });
        this.removeclassName = ''
        this.setState({ winStrength: " ", tableLoded: false, showTourneyInfoBoard: false });
        let tab1 = document.getElementById(this.tableId)
        if (this.removeclassName != "") {
            try {
                if (this.state.textvariable) { tab1.classList.remove(this.removeclassName) }
            } catch (e) { console.log(e) }
        }
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
        console.log(this.props.activeTable)
        //    this.seatsRef.current.UpadateSeatProperties();
        // if(this.props.activeTable){
        // }
        console.log(select)
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


        }

    }
    handlecheckBox(data) {
        if (document.getElementById("sitfornexthand") !== null) {
            document.getElementById("sitfornexthand").checked = data;
        }
    }

    render() {

        return (
            <div className="check">
                <div className="nexthand" hidden={this.state.nexthandshow}>
                    <p>Your rebuy of {this.state.nexthand} will be added to next hand </p>
                </div>
                <div tabIndex={0} className="tableMain bg_new_1" id="tableMain" style={this.state.BgState1}>
                    <div className="tabletop" >
                        {/* <div className="stline"></div> */}
                        {/* <div className="stline1"></div> */}
                    </div>
                    <div className="carpet"
                    // style={{backgroundImage: `url(${carpet})`}}
                    >
                        <h1 className="welcomeText">{this.state.welcomeText}</h1>
                        {this.state.showTimerBreak && <Breaktime ref={this.myRef} breaktime1={this.state.breaktime1} setCondition={this.state.showAddonAlert}></Breaktime>}
                        {/* {this.state.isTimeForcedPaused && <CountdownForce ref={this.timeforceRef} timerdetails={this.state.timeForced}></CountdownForce>} */}
                        {/* {this.state.isTimeForcedPaused1 && <CountdownForce1 timerdetails={this.state.timeForced}></CountdownForce1>} */}
                        {/* {this.state.isTimeForcedPaused && <CountdownForce timerdetails={this.state.timeForced}></CountdownForce>} */}
                        {/* <CountdownForce remaining_force={this.remaining_force.bind(this)} ref={this.timeforceRef}></CountdownForce> */}
                        <LeftMenu setAction={this.setMenuActions.bind(this)} network={this._tableNetwork}></LeftMenu>
                        <RightMenu SelectDevice={this.SelectDevice.bind(this)} network={this._tableNetwork} action={this.tableFooterHandler.bind(this)} setAction={this.setMenuActions.bind(this)}></RightMenu>
                        {/* <Combination top={this.state.combinationStyle} text={this.state.playerCombination} textTwo={this.state.winStrength} winpercent={this.state.showcombpercent}></Combination> */}

                        <InfoPanel chat={this.state.infoChat} info={this.state.tipInfo}
                            stats={this.state.tipStats}
                            network={this._tableNetwork} show={this.state.showInfoPanel}
                            waitList={this.state.waitList} disableJW={this.state.disableJW} btns={this.state.btns} action={this.tableFooterHandler.bind(this)}></InfoPanel>
                        {fileName.name !== "Riverpoker" && this.state.textvariable &&
                            <div style={{ position: "absolute", bottom: "23%", left: "2%", zIndex: "5" }}>
                                {/* <button onClick={() => { this.setState({ showAniStage: true }) }}>show </button> */}
                                <img src={target} alt="target" onClick={() => { this.setState({ showAniStage: true }) }}></img>
                                {/* <img src='https://demo.rapoker.club/pokerh5/e38711ec8e764c4ff7c43f80fe0fd212.png'></img> */}
                            </div>
                        }
                        <br />
                        {this.showTourneyInfoBoard && !this.state.showTourneyInfoBoard && fileName.name !== "Riverpoker" && this.state.textvariable &&
                            <div className="autoRebuy fd">
                                <div className={this.state.callRitOnce ? "glow-on-hover-rit" : "rit"}>
                                    <div className={this.state.callRitTwice ? "glow-on-hover-rio" : "rio"}>
                                        <div className="block">
                                            {/* <input id="ritCheckBox" className="checkBox" type="checkbox" name="Rebuy" defaultChecked={this.state.showTourneyInfoBoard} value="ritTwo" onClick={(event) => { this.setState({ showTourneyInfoBoard: event.target.checked }) }} /> */}
                                            <input
                                                id="ritCheckBox"
                                                className="checkBox"
                                                type="checkbox"
                                                name="Rebuy"
                                                checked={this.state.showTourneyInfoBoard}
                                                value="ritTwo"
                                                onChange={(event) => this.setState({ showTourneyInfoBoard: event.target.checked })}
                                            />


                                            <label htmlFor="WaitForBB" style={{ color: "#ffffff", fontSize: "9px" }}>
                                                {/* {t("RUN 2X")} */}
                                                Level Info
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        <div>


                            {this.state.textvariable &&
                                <GameController options={this.state.options} handlecheckBox={this.handlecheckBox.bind(this)} network={this._tableNetwork} setGc={this.setGcActions.bind(this)} setCheckGc={this.setGcCheckActions.bind(this)} showAlert={this.state.showCheckAlert} showCheckBox={this.state.showCheckBox} action={this.tableFooterHandler.bind(this)}></GameController>
                            }
                        </div>
                        <div className={Screen.getDeviceType().style.gameBox} id={this.props.id}>
                            {/* <img src={this.state.BgState.tableimage} className="backPixTable" aria-label="" /> */}
                            {/* <img src={Screen.getDeviceType().name="Mobile"?NewTable:Screen.getDeviceType().name="Tablet"?NewTable:NewTable1} className={Screen.getDeviceType().style.image} alt="" /> */}
                            <img src={Screen.getDeviceType().name === "Mobile" ? NewTable : NewTable1} className={Screen.getDeviceType().style.image} alt="" />
                            {/* <img src={Screen.getDeviceType().image} className={Screen.getDeviceType().style.image} alt="" /> */}
                            {/* <Stage container={this.props.id} width={this.state.stageWidth} height={this.state.stageHeight}> */}
                            <Stage container={this.props.id} width={Screen.getDeviceType().width} height={Screen.getDeviceType().height}>
                                {/* <Stage container={this.props.id} stageWidth={this.state.stageWidth} stageHeight={this.state.stageHeight}> */}
                                <BoardCards ref={this.boardCardsRef} scale={this.state.boardCardPositions.cardScale} xPadding={this.state.boardCardXSpace}></BoardCards>
                                <RitBoardCards ref={this.ritBoardCardsRef} scale={this.state.ritBoardCardPositions.cardScale} xPadding={this.state.boardCardXSpace}></RitBoardCards>
                                <Seats senderid={this.state.senderid} dragdetails={this.state.dragdetails} showAniStage={this.state.showAniStage}
                                    hidaAni={this.hidaAni.bind(this)} TargetpositionId={this.TargetpositionId.bind(this)} senderidboolean1={this.state.senderidboolean1}
                                    knock_Table={this.knock_Table} cid={this.props.id} ref={this.seatsRef} parentCallback={this.handleCallback.bind(this)}
                                    seatCount={this.state.seatCnt} dealer={this.state.dealerSeat} network={this._tableNetwork} seatProperties={this.state.seatProperties}
                                    stageWidth={Screen.getDeviceType().width} stageHeight={Screen.getDeviceType().height}
                                    // stageWidth={this.state.stageWidth} stageHeight={this.state.stageHeight} 
                                    originSeat={this.player.id}
                                    text={this.state.playerCombination} textTwo={this.state.winStrength} winpercent={this.state.showcombpercent}
                                    nametextdealerid={this.state.nametextdealerid}
                                    bigshowhide={this.state.showbigblind}
                                    BigBlindValue={this.BigBlindValue}
                                    showSeatAlert={this.showSeatAlert.bind(this)}
                                    changeOptionTournment={this.changeOptionTournment}
                                ></Seats>
                            </Stage>
                        </div>
                        {(this.state.cDtimer.show && this.state.textvariable) && <CountDownTimer time={this.state.cDtimer.value} per={this.state.cDtimer.per}></CountDownTimer>}
                        <Rebuy network={this._tableNetwork}></Rebuy>
                        <Chat action={this.tableFooterHandler.bind(this)}></Chat>
                    </div>

                    {!this.state.tableLoded && <Spinner ></Spinner>}
                    {this.state.bombpotanimation && <Bombpot></Bombpot>}
                    {this.state.showBuyChips && <BuyChips data={this.state.balance} network={this._tableNetwork} setAction={this.setPopUpActions.bind(this)}></BuyChips>}
                    {this.state.showWaitForRebuy && <WaitForRebuy data={this.state.waitForRebuy} network={this._tableNetwork} setAction={this.setPopUpActions.bind(this)}></WaitForRebuy>}
                    {this.state.waitRebuyAlert.show && <WaitRebuyAlert data={this.state.waitRebuyAlert} setAction={this.setPopUpActions.bind(this)}></WaitRebuyAlert>}
                    {this.state.showExitAlert && <ExitAlert setAction={this.setPopUpActions.bind(this)} network={this._tableNetwork}></ExitAlert>}
                    {this.state.showAlert && <Alert data={this.state.alert} setAction={this.setPopUpActions.bind(this)}></Alert>}
                    {this.state.ReconnectionAlert && <ReconnectionAlert data={this.state.alert} setAction={this.setPopUpActions.bind(this)}></ReconnectionAlert>}
                    {this.state.showBreakAlert && <BreakAlert data={this.state.breakalert} setAction={this.setPopUpActions.bind(this)}></BreakAlert>}
                    {this.state.showPvtTableAlert && <PrivateTableAlert data={this.state.privateTableAlertText} setAction={this.setPopUpActions.bind(this)} network={this._tableNetwork}></PrivateTableAlert>}
                    {(this.state.showKnoutbustedAlert && this.state.textvariable) && <ShowKnoutbustedAlert data={this.state.tshowKnoutbustedAlert} setAction={this.setPopUpActions.bind(this)}></ShowKnoutbustedAlert>}
                    {this.state.showTplayerRankAlert && <TourneyPlayerRanking data={this.state.tplayerRankAlert} setAction={this.setPopUpActions.bind(this)}></TourneyPlayerRanking>}
                    {this.state.showTourneyInfoBoard && <TourneyInfoBoard data={this.state.tourneyInfoBoard} setAction={this.setPopUpActions.bind(this)}></TourneyInfoBoard>}
                    {this.state.showOptions && <Options setAction={this.setPopUpActions.bind(this)} setThemes={this.setThemes.bind(this)}></Options>}
                    {this.state.showChipsRebuyAlert && <ChipsRebuyAlert data={this.state.chipsRebuyAlertData} setAction={this.setPopUpActions.bind(this)}></ChipsRebuyAlert>}
                    {/* {this.state.showAddonAlert && <AddonAlert data={this.state.addonData} setAction={this.setPopUpActions.bind(this)} network={this._tableNetwork}></AddonAlert>} */}
                    {this.state.showInvitePlayer && <InviteBuddies tableData={this.state.tableData} buddyData={this.state.buddyData} setAction={this.setPopUpActions.bind(this)} network={this._tableNetwork}></InviteBuddies>}
                    {/* {(this.state.manualPrizePoolshwow && this.state.textvariable) && <PrizePoolAlert network={this._tableNetwork} setAction={this.setPopUpActions.bind(this)} manualDistributionType={this.state.manualDistributionType} ></PrizePoolAlert>} */}
                    {
                        (this.state.showAddonAlert && this.state.textvariable) &&
                        <div className="addonPopup">
                            <div className="addonSubPop">
                                <div className="fd text_center p_10 addonMessage">
                                    {this.state.addonData} <br></br>
                                    Do You Want To Add Chips Now?
                                </div>
                                <button className="addonButton" onClick={(e) => {
                                    e.preventDefault();
                                    this._tableNetwork.send('<ReBuy/>');
                                    this.setPopUpActions("hideAddonAlert");
                                }}>Click Here to Add</button>
                            </div>
                        </div>
                    }
                    {/* {(this.state.showAddonAlert && this.state.textvariable) && <AddonAlert data={this.state.addonData} setAction={this.setPopUpActions.bind(this)} network={this._tableNetwork}></AddonAlert>} */}
                    {this.state.showInvitePlayer && <InviteBuddies tableData={this.state.tableData} buddyData={this.state.buddyData} setAction={this.setPopUpActions.bind(this)} network={this._tableNetwork}></InviteBuddies>}
                    {(this.state.manualPrizePoolshwow && this.state.textvariable) && <PrizePoolAlert network={this._tableNetwork} setAction={this.setPopUpActions.bind(this)} manualDistributionType={this.state.manualDistributionType} ></PrizePoolAlert>}

                    {/* {(!this.state.tableLoded ||this.state.bombpotanimation||this.state.showBuyChips||this.state.manualPrizePoolshwow||this.state.showInvitePlayer||this.state.showTplayerRankAlert
    ||this.state.showKnoutbustedAlert||this.state.showPvtTableAlert||this.state.showBreakAlert||this.state.ReconnectionAlert||this.state.showAlert||this.state.showExitAlert
    ||this.state.waitRebuyAlert.show||this.state.showWaitForRebuy)} */}

                </div >

                {/* <div style={{ position: "fixed", bottom: "5px", left: "5px", zIndex: 100 }}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("dela player cards");
                            this.onDealingCards({ DealingCards: pcc });
                        }}
                    >
                        ...pc...
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("dela bfc cards");
                            this.onDealingFlop({ DealingFlop: fc });
                        }}
                    >
                        ..BFC..
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("dela rbfc cards");
                            this.onDealingRitFlop({ DealingRitFlop: rfc });
                        }}
                    >
                        ..RBFC..
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("dela btc cards");
                            this.onDealingRitTurn({ DealingRitTurn: rtc });
                        }}
                    >
                        ..BTC..
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("dela brc cards");
                            this.onDealingRitRiver({ DealingRitRiver: rrc });
                        }}
                    >
                        ..BRC..
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("clear table");
                            this.onEndHand();
                        }}
                    >
                        ..End..
                    </button>
                </div>*/}
            </div >
        );
    }
}
