import React from "react";
import Screen from "../../utils/screen";
// import NewTable from "../../../assets/images/lobby/tableIcons/tableBg/NewTable.png";
// import NewTable from "../../../assets/images/table/replaybuttons/graytable_lb.png";
import NewTable1 from '../../../assets/images/tableandcarpet/table_1.png'
import { Stage } from "react-konva";
import { Seats } from "../ui/table/seats";
import BoardCards from "../ui/table/boardCards/boardCards";
import RitBoardCards from "../ui/table/boardCards/ritBordCards";
// import apiResponse from "../../../HistoryReplay.json";
// import apiResponse from "../../../HistoryReplay-New.json";
import "../../../css/ui/table/historyReplay.css";
import play_left from "../../../assets/images/table/replaybuttons/play_left.svg";
import info from "../../../assets/images/table/replaybuttons/info.png";
import play_right from "../../../assets/images/table/replaybuttons/play_right.svg";
import backword from "../../../assets/images/table/replaybuttons/backword.png"
import play_backword from "../../../assets/images/table/replaybuttons/play_backword.png";
import play from "../../../assets/images/table/replaybuttons/play.svg";
import pause from "../../../assets/images/table/replaybuttons/pause.png";
import play_forword from "../../../assets/images/table/replaybuttons/play_forword.png";
import forword from "../../../assets/images/table/replaybuttons/forword.png";

const ACTION_TYPES = {
    NO_ACTION: "NoAction",
    RAISE: "Raise",
    BT: "Bet",
    SB: "SB",
    BB: "BB",
    TB: "TB",
    FD: "Fold",
};

export default class HandhistoryReplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardCardPositions: Screen.getDeviceType().boardCardPositions,
            boardCardXSpace: Screen.getDeviceType().boardCardXSpace,
            ritBoardCardPositions: Screen.getDeviceType().ritBoardCardPositions,
            seatCnt: 0,
            dealerSeat: "-1",
            seatProperties: Screen.getDeviceType().seatProperties,
            playerCombination: "",
            winStrength: "",
            showcombpercent: false,
            nametextdealerid: "",
            foldPlayer: 0,
            raiseActions: 0,
            allbliendsAmountSame: false,
            showbigblind: {
                show: false,
                bigblindvalue: 0,
            },
            seats: {
                Seat: [
                    { name: "", id: 0 },
                    { name: "", id: 1 },
                    { name: "", id: 2 },
                    { name: "", id: 3 },
                    { name: "", id: 4 },
                    { name: "", id: 5 },
                    { name: "", id: 6 },
                    { name: "", id: 7 },
                    { name: "", id: 8 },
                    { name: "", id: 9 },
                ],
                cnt: 0,
            },
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
            ritFlop: {
                cardOne: "",
                cardTwo: "",
                cardThree: "",
                cardTurn: "",
                cardRiver: "",
            },
            playButtonImg: play,
            multAcion: -1,
            nextAcionIndex: -1,
            lockraiseIndex: true,
            flopCards: "",
            turnCard: "",
            riverCard: "",
            ritCards: "",
            startFrom: 0,
            Pot: [],
            playerData: []
        };

        this.knock_Table = false;
        this.player = { name: "", id: "" };
        this.players = {};
        this.BigBlindValue = '';
        this.tableId = null;
        this.gameState = null;
        this.seatsRef = React.createRef();
        this.boardCardsRef = React.createRef();
        this.ritBoardCardsRef = React.createRef();
    };


    componentDidMount() {
        console.log("API-response  >>", this.props.data);
        this.tableData(this.props.data);
        this.setState({ foldPlayer: 0 });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data || prevProps.from !== this.props.from) {
            this.onDealingEvents(this.props.data, this.props.from);
        }
    }

    componentWillUnmount() {
        console.log("clear all");
        clearTimeout(this.onNewPlayerTime);
        clearTimeout(this.onDealingSB_BBTime);
        clearTimeout(this.onPotsChangeTime);
        clearTimeout(this.onRakeChangeTime);
        clearTimeout(this.onDealingFlopTime);
        clearTimeout(this.onEndHandTime);
    }

    tableData(data) {
        console.log("tableData  >>", data.tableDetails);
        this.setState({ seatCnt: data.tableDetails[0].seats });
        this.tableId = data.tableDetails[0].tableId;
        this.onNewPlayerTime = setTimeout(() => {
            this.onNewPlayer(data);
            // this.testMethod(data);
        }, 1000);
    }


    testMethod(data) {
        let actions = data.events;
        console.log(actions);

        // Calculate the number of "NoAction" entries
        let noActionCount = actions.filter(action => action.action === "NoAction").length;
        console.log(noActionCount);
        console.log(data.playersInfo.length);

        // Initial loop count
        let totalIterations = data.playersInfo.length + noActionCount;

        let raiseFound = false; // Flag to check if any "Raise" action is found
        let sbAmount = null;
        let bbAmount = null;

        // Loop with dynamic adjustments
        for (let i = 0; i < totalIterations; i++) {
            console.log(`Loop iteration: ${i + 1}`);

            // Perform operations within the bounds of the actions array
            if (i < actions.length) {
                let currentAction = actions[i];
                if (currentAction) {
                    console.log(currentAction);

                    // Check for "SB" and "BB" actions and store their amounts
                    if (currentAction.action === "SB") {
                        sbAmount = currentAction.amount;
                    }
                    if (currentAction.action === "BB") {
                        bbAmount = currentAction.amount;
                    }

                    // Check for "Raise" or "Bet" actions and adjust totalIterations
                    if (currentAction.action === "Raise" || currentAction.action === "Bet") {
                        totalIterations += data.playersInfo.length;
                        raiseFound = true; // Set flag to true if "Raise" is found
                    }
                } else {
                    console.log("Action is undefined.");
                }
            } else {
                console.log("No more actions in the array.");
            }
        }

        // Check if SB and BB amounts are the same
        const sbAndBbSame = sbAmount !== null && bbAmount !== null && sbAmount === bbAmount;

        // Add one extra iteration if no "Raise" action was found and SB/BB amounts are not the same
        if (!raiseFound && !sbAndBbSame) {
            console.log("No 'Raise' action found and 'SB' and 'BB' amounts are not the same. Adding one extra loop iteration.");
            totalIterations += 1; // Increment totalIterations by one for the extra iteration

            // Perform the extra iteration
            if (totalIterations <= actions.length) {
                let currentAction = actions[totalIterations - 1];
                if (currentAction) {
                    console.log(`Extra Loop iteration: ${totalIterations}`);
                    console.log(currentAction);
                    // Perform any additional operations for the extra iteration here
                }
            } else {
                console.log("No more actions in the array for extra iteration.");
            }
        } else {
            console.log("Either 'Raise' action was found or 'SB' and 'BB' amounts are the same. No extra loop iteration needed.");
        }
    }






    onNewPlayer(data) {
        console.log("onNewPlayer  >>", data.playersInfo)
        let cnt = this.state.seatCnt,
            i = 0;
        for (i; i < cnt; i++) {
            for (let a = 0; a < data.playersInfo.length; a++) {
                this.player = { name: data.playersInfo[a].name, id: data.playersInfo[a].seatId };
                if (this.state.seats.Seat[i].id === data.playersInfo[a].seatId) {
                    this.state.seats.Seat[i].name = data.playersInfo[a].name;
                    setTimeout(() => {
                        console.log(data.playersInfo[a].name)
                        this.gameState = {
                            name: data.playersInfo[a].name,
                            chips: data.playersInfo[a].totalBalanceOnSeat,
                            status: "takenActive",
                            seat: data.playersInfo[a].seatId,
                            action: "",
                            // knockoutBounty: "KOB  " + ((Number(data.GameState.Seats.Seat[i].PlayerInfo.attr.knockOutFee)) + Number(data.GameState.Seats.Seat[i].PlayerInfo.attr.knockOutAmount)),
                            // enableTwoX: (data.GameState.Seats.Seat[i].PlayerInfo.attr.enableTwoX === "true" ? true : false),
                            // NoofBB: data.GameState.Seats.Seat[i].attr.hasOwnProperty("noOfBB") ? data.GameState.Seats.Seat[i].attr.noOfBB : "",
                            me: this.player
                        };
                        try {
                            this.seatsRef.current.updateGameState(this.gameState);
                        } catch (e) { console.log(e) }
                        this.seatsRef.current.onDealerReplay(cnt, data.playersInfo[a].dealer === true && data.playersInfo[a].seatId);
                        if (a === data.playersInfo.length - 1) {
                            this.onDealingSB_BBTime = setTimeout(() => {
                                this.onDealingEvents(data);
                                // this.onDealingSB_BB(data);
                            }, 500);
                        }
                    }, a * 500);
                } else {
                    this.gameState = {
                        name: "Open Seat",
                        chips: "",
                        status: "onlyMe",
                        seat: this.state.seats.Seat[i].name === "" && this.state.seats.Seat[i].id,
                        action: "",
                        // knockoutBounty: "KOB  " + ((Number(data.GameState.Seats.Seat[i].PlayerInfo.attr.knockOutFee)) + Number(data.GameState.Seats.Seat[i].PlayerInfo.attr.knockOutAmount)),
                        // enableTwoX: (data.GameState.Seats.Seat[i].PlayerInfo.attr.enableTwoX === "true" ? true : false),
                        // NoofBB: data.GameState.Seats.Seat[i].attr.hasOwnProperty("noOfBB") ? data.GameState.Seats.Seat[i].attr.noOfBB : "",
                        me: this.player
                    };
                }
                if (this.state.seats.Seat[i].name === "") {
                    this.seatsRef.current.updateGameState(this.gameState);
                }
            }
        }
    };
    onDealingPlayerCards(data) {
        console.log("dealing cards  >> ", data);
        this.seatsRef.current.onDealingCardsReplay(data.playersInfo, this.state.seatCnt);
    };


    getAction = (action) => {
        switch (action) {
            case ACTION_TYPES.NO_ACTION: return "";
            case ACTION_TYPES.SB: return "PostSmallBlind";
            case ACTION_TYPES.BB: return "PostBigBlind";
            case ACTION_TYPES.TB: return "PostThirdBlind";
            default: return action;
        }
    }

    onDealingEvents(data, num, next) {
        console.log("onDealingEvents >>  ", data, num, next);

        let foldPlayer = this.state.foldPlayer;
        this.onDealingPlayerCards(data);
        const Events = data.events;
        let index = num === undefined ? 0 : num;
        let betAction = false;
        let raiseAction = false;
        let cnt = num === undefined ? data.playersInfo.length : num + (data.playersInfo.length - foldPlayer);
        console.log(cnt)

        if (index < Events.length) {
            console.log(Events)
            for (let i = index; i < Events.length && cnt >= i; i++) {
                const event = Events[i];
                if (event.action === "NoAction") {
                    cnt++;
                    continue;
                }
                if (event.action === "Fold") {
                    foldPlayer += 1;
                    if (raiseAction) {
                        cnt -= 1;
                    }
                    this.setState({ foldPlayer });
                }
                if (Events[i].action === "SB" && Events[i + 1].action === "BB") {
                    if (Events[i].amount === Events[i + 1].amount) {
                        cnt -= 1;
                        this.setState({ allbliendsAmountSame: true });
                    }
                }

                if (event.action === "Bet") {
                    betAction = true;
                    cnt += (data.playersInfo.length) - foldPlayer;
                }
                if (event.action === "Raise") {
                    raiseAction = true;
                    if (betAction) {
                        cnt = 1;
                    } else {
                        cnt += (data.playersInfo.length) - foldPlayer;
                    }
                }
                // console.log(i, cnt)
                setTimeout(() => {
                    this.seatsRef.current.onPlayerAction({
                        seat: event.seatId,
                        action: this.getAction(event.action),
                        amount: event.amount || ""
                    });
                    console.log(i, cnt, event.action, "betAction ", betAction, next, foldPlayer)

                    if (event.amount !== undefined && event.amount !== "0") {
                        this.state.Pot.push(event);
                    }

                    if (i === cnt) {
                        switch (next) {
                            case undefined:
                                this.onPotsChange(data, cnt, next, foldPlayer);
                                break;
                            case "turn":
                                this.state.Pot.length === 0 ? this.onDealingTurn(data, cnt, next) : this.onPotsChange(data, cnt, next);
                                break;
                            case "river":
                                this.state.Pot.length === 0 ? this.onDealingRiver(data, cnt, next) : this.onPotsChange(data, cnt, next);
                                break;
                            case "winner":
                                this.onWinner(data);
                                break;
                        }
                    }
                }, (i - index) * 2000);
            }
        } else {
            switch (next) {
                case undefined:
                    this.onPotsChange(data, cnt, foldPlayer);
                    break;
                case "turn":
                    this.onDealingTurn(data, cnt);
                    break;
                case "river":
                    this.onDealingRiver(data, cnt);
                    break;
                case "winner":
                    this.onWinner(data);
                    break;
            }
        }
    }



    onPotsChange(data, num, next, foldPlayer) {
        console.log("Pot value >>  ", data, num, next, foldPlayer)
        let pot = this.state.Pot
        let body = {
            "PotsChange": {
                "Pot": []
            }
        }

        for (let i = 0; i < pot.length; i++) {
            body.PotsChange.Pot.push({
                "attr": {
                    "pot": "0",
                    "change": pot[i].amount,
                    "seat": pot[i].seatId
                }
            })
        }
        console.log(body)
        this.seatsRef.current.onPotsChange(body);
        this.onRakeChangeTime = setTimeout(() => {
            this.onRakeChange(data, num, next, foldPlayer);
        }, 1000);
    };

    onRakeChange(data, num, next, foldPlayer) {
        console.log("onRakeChange  >>  ", data, num, next, foldPlayer);
        let index = 0;
        index++
        let body = {
            "RakeChange": {
                "Rake": {
                    "attr": {
                        "pot": "0",
                        "change": data.potByPhase[index].rakeSum
                    }
                }
            }
        }
        this.seatsRef.current.onRakeCut(body);
        switch (next) {
            case undefined:
                this.onDealingFlopTime = setTimeout(() => {
                    this.onDealingFlop(data, num, next, foldPlayer);
                }, 500);
                break;
            case "turn":
                this.onDealingFlopTime = setTimeout(() => {
                    this.onDealingTurn(data, num, next, foldPlayer);
                }, 500);
                break;
            case "river":
                this.onDealingFlopTime = setTimeout(() => {
                    this.onDealingRiver(data, num, next, foldPlayer);
                }, 500);
                break;
            case "winner":
                this.onDealingFlopTime = setTimeout(() => {
                    this.onWinner(data, num, next, foldPlayer);
                }, 500);
                break;
            default:
                console.log(next);
                break;
        }
    };

    onDealingMiddleActions(data, num, next, foldPlayer) {
        console.log("onDealingMiddleActions  ", data);

        let cnt = data.playersInfo.length;
        let raiseActions = this.state.raiseActions;
        let actionIndex = num + (cnt - foldPlayer);
        let allbliendsAmountSame = this.state.allbliendsAmountSame;

        console.log(num, cnt, foldPlayer, actionIndex, data.events.length, next, raiseActions);

        let betActionIndex = 0;
        let raiActionIndex = 0;
        let betAction = false;
        let raiseAction = false;

        const events = data.events;
        let Index = 1;

        if (actionIndex <= data.events.length) {
            for (let i = num + Index; i < actionIndex + Index; i++) {
                console.log(events[i]);

                if (events[i].action === "Fold") {
                    foldPlayer += 1;
                    if (allbliendsAmountSame) {
                        raiActionIndex--;
                        betActionIndex--;
                    }
                    this.setState({ foldPlayer: foldPlayer });
                }

                if (events[i].action === "Bet") {
                    betAction = true;
                    console.log(betActionIndex)
                    actionIndex += (allbliendsAmountSame ? (betActionIndex - foldPlayer) : betActionIndex);
                    // actionIndex += betActionIndex;
                }
                if (events[i].action === "Raise") {
                    raiseAction = true;
                    console.log(raiActionIndex)
                    actionIndex += (allbliendsAmountSame ? (raiActionIndex - foldPlayer) : raiActionIndex);
                    // actionIndex += raiActionIndex;
                }

                if (!betAction) {
                    betActionIndex++;
                }
                if (!raiseAction) {
                    raiActionIndex++;
                }

                setTimeout(() => {
                    this.seatsRef.current.onPlayerAction({
                        seat: events[i].seatId,
                        action: this.getAction(events[i].action),
                        amount: events[i].amount || ""
                    });

                    if (events[i].amount !== undefined && events[i].amount !== "0") {
                        this.state.Pot.push(events[i]);
                    }

                    console.log(i, actionIndex);

                    if (i === actionIndex) {
                        console.log(next);
                        console.log(this.state.Pot);
                        switch (next) {
                            case "turn":
                                this.state.Pot.length === 0 ? this.onDealingTurn(data, actionIndex, next, foldPlayer) : this.onPotsChange(data, actionIndex, next, foldPlayer);
                                break;
                            case "river":
                                this.state.Pot.length === 0 ? this.onDealingRiver(data, actionIndex, next, foldPlayer) : this.onPotsChange(data, actionIndex, next, foldPlayer);
                                break;
                            case "winner":
                                this.state.Pot.length === 0 ? this.onWinner(data) : this.onPotsChange(data, actionIndex, next, foldPlayer);
                                break;
                            default:
                                break;
                        }
                    }

                }, (i - num + Index) * 2000);
            }
        } else {
            switch (next) {
                case "turn":
                    this.state.Pot.length === 0 ? this.onDealingTurn(data, actionIndex, next, foldPlayer) : this.onPotsChange(data, actionIndex, next, foldPlayer);
                    break;
                case "river":
                    this.state.Pot.length === 0 ? this.onDealingRiver(data, actionIndex, next, foldPlayer) : this.onPotsChange(data, actionIndex, next, foldPlayer);
                    break;
                case "winner":
                    this.state.Pot.length === 0 ? this.onWinner(data) : this.onPotsChange(data, actionIndex, next, foldPlayer);
                    break;
                default:
                    break;
            }
        }
    }


    // onDealingMiddleActions(data, num, next, foldPlayer) {
    //     console.log(data, num, next, foldPlayer);
    //     let cnt = data.playersInfo.length;

    //     let actionIndex = (num + (cnt - foldPlayer));

    //     console.log(cnt, foldPlayer, actionIndex, data.events.length, next)
    //     let betActionIndex = 0;
    //     let raiActionIndex = 0;
    //     let betAction = false;
    //     let raiseAction = false;
    //     const events = data.events;
    //     let Index = 1;
    //     for (let i = num + Index; i < actionIndex + Index; i++) {
    //         console.log(events[i]);
    //         if (events[i].action === "Fold") {
    //             foldPlayer += 1;
    //             this.setState({ foldPlayer: foldPlayer });
    //         }
    //         if (events[i].action === "Bet") {
    //             betAction = true;
    //             console.log(betActionIndex);
    //             num += betActionIndex;
    //             actionIndex += betActionIndex;
    //         }
    //         if (events[i].action === "Raise") {
    //             if (betAction) {
    //                 raiseAction = true;
    //                 console.log(raiActionIndex);
    //                 num += raiActionIndex;
    //                 actionIndex += raiActionIndex;
    //             } else {
    //                 raiseAction = true;
    //                 console.log(raiActionIndex);
    //                 num += raiActionIndex;
    //                 actionIndex += raiActionIndex;
    //             }
    //         }
    //         if (!raiseAction) {
    //             raiActionIndex++;
    //         }
    //         if (!betAction) {
    //             betActionIndex++;
    //         }

    //         setTimeout(() => {
    //             this.seatsRef.current.onPlayerAction({
    //                 seat: events[i].seatId,
    //                 action: this.getAction(events[i].action),
    //                 amount: events[i].amount || ""
    //             });
    //             if (events[i].amount !== undefined && events[i].amount !== "0") {
    //                 this.state.Pot.push(events[i]);
    //             }
    //             console.log(i, actionIndex);
    //             if (i === actionIndex) {
    //                 console.log(next)
    //                 console.log(this.state.Pot)
    //                 switch (next) {
    //                     case "turn":
    //                         this.state.Pot.length === 0 ? this.onDealingTurn(data, actionIndex, next, foldPlayer) : this.onPotsChange(data, actionIndex, next, foldPlayer);
    //                         break;
    //                     case "river":
    //                         this.state.Pot.length === 0 ? this.onDealingRiver(data, actionIndex, next, foldPlayer) : this.onPotsChange(data, actionIndex, next, foldPlayer);
    //                         break;
    //                     case "winner":
    //                         this.state.Pot.length === 0 ? this.onWinner(data) : this.onPotsChange(data, actionIndex, next, foldPlayer);
    //                         break;
    //                     default:
    //                         break;
    //                 }
    //             }
    //             console.log(i - num + Index)
    //             console.log((i - num + Index) * 2000)
    //         }, (i - num + Index) * 2000);

    //     }
    // }

    onDealingFlop(data, num, next, foldPlayer) {
        console.log("onDealingFlop  >>  ", data, num, next, foldPlayer);
        const getFlopCards = data.tableCards[0].flop.split(" ");
        let ritFlop = this.state.ritFlop;
        this.setState({ Pot: [] });
        getFlopCards.forEach((card, index) => {
            this.addFlopCard(index, card, ritFlop);
            if (index === getFlopCards.length - 1) {
                setTimeout(() => {
                    // this.onDealingEvents(data, num, "turn");
                    this.onDealingMiddleActions(data, num, "turn", foldPlayer);
                }, 2000);
            }
        });
        console.log("-------------- onDealingFlop --------------")
    }

    addFlopCard(index, card, ritFlop) {
        const positions = ["flopZero", "flopOne", "flopTwo"];
        const delays = [0, 150, 300];
        this.boardCardsRef.current.addCards(positions[index], card, delays[index]);
        ritFlop[`card${index + 1}`] = card;
        console.log("-------------- addFlopCard --------------");
    }

    onDealingTurn(data, num, next, foldPlayer) {
        console.log("onDealingTurn  >>  ", data, num, next, foldPlayer);
        const turnCard = data.tableCards[0].turn
        this.setState({ flopCards: "" });
        let ritFlop = this.state.ritFlop;
        this.boardCardsRef.current.addCards("turn", turnCard, 0);
        ritFlop.cardTurn = turnCard;
        this.setState({ Pot: [] });
        setTimeout(() => {
            // this.onDealingEvents(data, num + 1, "river");
            this.onDealingMiddleActions(data, num, "river", foldPlayer);
            console.log("-------------- addTurnCard --------------");
        }, 2000);
    };

    onDealingRiver(data, num, next, foldPlayer) {
        console.log("onDealingRiver  >>  ", data, num, next, foldPlayer);
        const riverCard = data.tableCards[0].river
        this.setState({ turnCard: "" });
        let ritFlop = this.state.ritFlop;
        this.boardCardsRef.current.addCards("river", riverCard, 0);
        ritFlop.cardTurn = riverCard;
        this.setState({ Pot: [] });
        setTimeout(() => {
            // this.onDealingEvents(data, num + 1, "winner");
            this.onDealingMiddleActions(data, num, "winner", foldPlayer);
            console.log("-------------- addRiverCard --------------");
        }, 2000);
    };


    onWinner(data) {
        console.log("onWinner  >> ", data)
        let body = {
            "Winner": {
                "attr": {
                    "seat": data.winner[0].seatId,
                    "amount": data.winner[0].amount,
                    "pot": "0"
                }
            }
        }

        this.setState({ Pot: [] });
        this.seatsRef.current.onWinner(this.player.id, body);
        // let combination, amt, id, potIndex;

        // if (data.Winner.hasOwnProperty("attr")) {
        //     if (data.Winner.attr.hasOwnProperty("combination")) {
        //         combination = data.Winner.attr.combination;
        //     }
        //     if (data.Winner.attr.hasOwnProperty("amount")) {
        //         amt = data.Winner.attr.amount;
        //     }
        //     if (data.Winner.attr.hasOwnProperty("seat")) {
        //         id = data.Winner.attr.seat;
        //     }
        //     if (data.Winner.attr.hasOwnProperty("pot")) {
        //         potIndex = data.Winner.attr.pot;
        //     }
        // }

        this.onEndHandTime = setTimeout(() => {
            this.onEndHand()
        }, 2000);
    };
    onEndHand() {
        setTimeout(() => {
            this.seatsRef.current.noTablePot();
            this.seatsRef.current.onEndHand();
        }, 200);
        setTimeout(() => {
            this.boardCardsRef.current.removeCards();
            this.ritBoardCardsRef.current.removeCards();
        }, 400);
        this.setState({ playerCombination: "" });
        this.setState({ infoChat: `==========End Of The Hand==========` });
        this.setState({ showcombpercent: false });
        this.setState({ foldPlayer: 0, allbliendsAmountSame: false });
    }


    handleCallback(data) {
        let options = this.state.options;
        options.valuepot = data;
        this.setState({ options: options });
    };
    playButton(e) {
        this.setState({ playButtonImg: this.state.playButtonImg === play ? pause : play })
        // console.log("onEndHandTime  > ", this.onEndHandTime)
        // console.log("onWinnerTime  > ", this.onWinnerTime)
        // console.log("nexActions3Time  > ", this.nexActions3Time)
        // console.log("onDealingRiverTime  > ", this.onDealingRiverTime)
        // console.log("nexActions2Time  > ", this.nexActions2Time)
        // console.log("onDealingTurnTime >  ", this.onDealingTurnTime)
        // console.log("nexActions1Time >  ", this.nexActions1Time)
        // console.log("onDealingFlopTime >  ", this.onDealingFlopTime)
        // console.log("onRakeChangeTime >  ", this.onRakeChangeTime)
        // console.log("onPotsChangeTime >  ", this.onPotsChangeTime)
        // console.log("onDealingPlayerCardsTime >  ", this.onDealingPlayerCardsTime)
        // console.log("onPlayerActionTime >  ", this.onPlayerActionTime)
        // console.log("onDealingSB_BBTime >  ", this.onDealingSB_BBTime)
        // console.log("onNewPlayerTime >  ", this.onNewPlayerTime)

        // if (this.state.playButtonImg === play) {
        //     console.log("onNewPlayerTime pause >  ", this.onNewPlayerTime)

        //     this.onNewPlayerTime.pause();
        // } else {
        //     console.log("onNewPlayerTime resume >  ", this.onNewPlayerTime)
        //     this.onNewPlayerTime.resume();
        // };
    }
    closeReplayTable = () => {
        this.props.closeReplayTable()
        this.setState({ foldPlayer: 0 });
    }


    render() {
        return (
            <React.Fragment>
                <div className="historyReplay-container">
                    <div className="top-container">
                        <p>Game : <span className="clr_4"> {this.props.data.tableDetails[0].game}</span></p>
                        <p>Table Id : <span className="clr_4">{this.props.data.tableDetails[0].tableId} </span></p>
                        <p>Reference Id : <span className="clr_4">{this.props.data.tableDetails[0].referenceId}</span></p>
                    </div>
                    <div className="exitBtn">
                        <button type="button" onClick={this.closeReplayTable.bind(this)}>x</button>
                    </div>
                    <div className={Screen.getDeviceType().style.gameBox} id={this.props.id} style={{ transform: 'scale(0.72)' }}>
                        {/* <img src={Screen.getDeviceType().name == "Mobile" ? NewTable : NewTable1} className={Screen.getDeviceType().style.image} alt="" /> */}
                        <Stage container={this.props.id} width={Screen.getDeviceType().width} height={Screen.getDeviceType().height}>
                            <BoardCards ref={this.boardCardsRef} scale={this.state.boardCardPositions.cardScale} xPadding={this.state.boardCardXSpace}></BoardCards>
                            <RitBoardCards ref={this.ritBoardCardsRef} scale={this.state.ritBoardCardPositions.cardScale} xPadding={this.state.boardCardXSpace}></RitBoardCards>
                            <Seats ref={this.seatsRef} knock_Table={this.knock_Table} cid={this.props.id} parentCallback={this.handleCallback.bind(this)}
                                seatCount={this.state.seatCnt} dealer={this.state.dealerSeat} seatProperties={this.state.seatProperties}
                                stageWidth={Screen.getDeviceType().width} stageHeight={Screen.getDeviceType().height}
                                originSeat={this.player.id}
                                text={this.state.playerCombination} textTwo={this.state.winStrength} winpercent={this.state.showcombpercent}
                                nametextdealerid={this.state.nametextdealerid}
                                bigshowhide={this.state.showbigblind}
                                BigBlindValue={this.BigBlindValue}
                            ></Seats>
                        </Stage>
                    </div>
                    <div className="cover">
                        <div className={Screen.getDeviceType().name !== "Desktop" ? 'playOptionsMain' : 'playOptionsMainDesktop'}>
                            <div className={Screen.getDeviceType().name !== "Desktop" ? 'buttonsContainer' : 'buttonsContainerDesktop'} >
                                <button type="button" className="playforword_playBackword">
                                    <img src={play_left} alt="" />
                                </button>
                                <button type="button" className="info">
                                    <img src={info} alt="" />
                                </button>
                                <button type="button" className="playforword_playBackword">
                                    <img src={play_right} alt="" />
                                </button>
                            </div>
                            <div className={Screen.getDeviceType().name !== "Desktop" ? 'buttonsContainer' : 'buttonsContainerDesktop'} >
                                <button type="button" className="playforword_playBackword">
                                    <img src={backword} alt="" />
                                </button>
                                <button type="button" className="playforword_playBackword">
                                    <img src={play_backword} alt="" />
                                </button>
                                <button type="button" onClick={(e) => this.playButton(e)}>
                                    <img src={this.state.playButtonImg} alt="" style={{ width: Screen.getDeviceType().name !== "Desktop" ? '20vw' : '7vw' }} />
                                </button>
                                <button type="button" className="playforword_playBackword">
                                    <img src={play_forword} alt="" />
                                </button>
                                <button type="button" className="playforword_playBackword">
                                    <img src={forword} alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    };
};