import React from "react";
import Screen from "../../utils/screen";
import NewTable from "../../../assets/images/table/replaybuttons/NewTable.png";
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

export default class TesingReplay extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        // console.log(apiResponse)
        console.log(this.props.data)
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
            showbigblind: {
                show: false,
                bigblindvalue: 0,
            },
            seats: {
                Seat: [
                    {
                        name: "",
                        id: 0
                    },
                    {
                        name: "",
                        id: 1
                    },
                    {
                        name: "",
                        id: 2
                    },
                    {
                        name: "",
                        id: 3
                    },
                    {
                        name: "",
                        id: 4
                    },
                    {
                        name: "",
                        id: 5
                    },
                    {
                        name: "",
                        id: 6
                    },
                    {
                        name: "",
                        id: 7
                    },
                    {
                        name: "",
                        id: 8
                    },
                    {
                        name: "",
                        id: 9
                    },
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
            ritCards: ""
        };
        this.knock_Table = false;
        this.player = { name: "", id: "" };
        this.players = {};
        this.BigBlindValue = '';
        this.seatsRef = React.createRef();
        this.boardCardsRef = React.createRef();
        this.ritBoardCardsRef = React.createRef();
    };
    componentDidMount() {
        console.log("API-response  >>", this.props.data);
        this.tableData(this.props.data);
    };

    tableData(data) {
        console.log("tableData  >>", data.tableDetails);
        this.setState({ seatCnt: data.tableDetails.seats });
        this.tableId = data.tableDetails.tableId;
        this.onNewPlayerTime = setTimeout(() => {
            this.onNewPlayer(data);
        }, 1000);
    };

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
                        this.seatsRef.current.updateGameState(this.gameState);
                        this.seatsRef.current.onDealerReplay(cnt, data.playersInfo[a].isDealer === "true" && data.playersInfo[a].seatId);
                        if (a === data.playersInfo.length - 1) {
                            this.onDealingSB_BBTime = setTimeout(() => {
                                // this.onDealingSB_BB(data);
                                this.onDealingEvents(data);
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

    onDealingEvents(data) {
        console.log(data)
        const allEvents = data.Events;
        const playerActions = allEvents.map(e => {
            return {
                game: e
            };
        }).filter(e => e.round !== null);

        playerActions.sort((a, b) => {
            return a.actionIndex - b.actionIndex;
        });
        // let completedIterations = 0;
        console.log(playerActions)

        playerActions.forEach((actionDetails, index) => {
            // console.log(actionDetails)
            setTimeout(() => {
                console.log(actionDetails.game)
                if (actionDetails.game.hasOwnProperty("actions")) {
                    const keys = Object.keys(actionDetails.game.actions);
                    const actions = actionDetails.game.actions;
                    for (let i = 0; i < keys.length; i++) {
                        const a = keys[i];
                        setTimeout(() => {
                            this.seatsRef.current.onPlayerAction({
                                seat: actions[a].seatId,
                                action: actions[a].action === "SB" ? "PostSmallBlind" :
                                    actions[a].action === "BB" ? "PostBigBlind" :
                                        actions[a].action === "TB" ? "PostThirdBlind" :
                                            actions[a].action,
                                amount: actions[a].amount !== undefined ? actions[a].amount : ""
                            });
                        }, i * 2000);
                    }
                }
                console.log(">>>>>>>>>>>  ", actionDetails.game, "  <<<<<<<<<<<<<");
                // switch (actionDetails.game) {
                //     case "playerCards":
                //         this.onDealingPlayerCards(actionDetails.game);
                //         break;
                //     case "PotsChange":
                //         setTimeout(() => {
                //             this.onPotsChange(actionDetails.game);
                //         }, 2000);
                //         break;
                //     case "flopCards":
                //         this.onDealingFlop(actionDetails.game);
                //         break;
                //     case "turnCard":
                //         this.onDealingTurn(actionDetails.game);
                //         break;
                //     case "riverCard":
                //         this.onDealingRiver(actionDetails.game);
                //         break;
                //     case "Winner":
                //         this.onWinner(actionDetails.game);
                //         break;
                //     default:
                //         console.log(actionDetails.game)
                //         break;
                // }

                if (actionDetails.game.hasOwnProperty("playerCards")) {
                    this.onDealingPlayerCards(actionDetails.game);
                }
                if (actionDetails.game.hasOwnProperty("PotsChange")) {
                    setTimeout(() => {
                        this.onPotsChange(actionDetails.game);
                    }, 2000);
                }
                if (actionDetails.game.hasOwnProperty("flopCards")) {
                    this.onDealingFlop(actionDetails.game);
                }
                if (actionDetails.game.hasOwnProperty("turnCard")) {
                    this.onDealingTurn(actionDetails.game);
                }
                if (actionDetails.game.hasOwnProperty("riverCard")) {
                    this.onDealingRiver(actionDetails.game);
                }
                // if (actionDetails.game.hasOwnProperty("ritCards")) {
                //     this.onDealingRiver(actionDetails.game);
                // }
                if (actionDetails.game.hasOwnProperty("Winner")) {
                    this.onWinner(actionDetails.game);
                }
            }, index * 8000);

        });
    }


    onDealingSB_BB(data) {
        console.log("onDealingSB_BB >> ", data)
        const players = data.playersInfo;
        const playerFirstActions = players.map(player => {
            const firstActionKey = Object.keys(player.actions)[0];
            const firstActionIndex = parseInt(firstActionKey);
            return {
                playerName: player.name,
                seatId: player.seatId,
                actionIndex: firstActionIndex,
                amount: player.actions[firstActionKey].amount !== undefined ? player.actions[firstActionKey].amount : ""
            };
        });

        playerFirstActions.sort((a, b) => {
            return a.actionIndex - b.actionIndex;
        });

        let completedIterations = 0;

        playerFirstActions.forEach((actionDetails, index) => {
            setTimeout(() => {
                const player = players.find(player => player.name === actionDetails.playerName);
                const firstAction = player.actions[actionDetails.actionIndex];

                this.seatsRef.current.onPlayerAction({
                    seat: actionDetails.seatId,
                    action: firstAction.action === "SB" ? "PostSmallBlind" :
                        firstAction.action === "BB" ? "PostBigBlind" :
                            firstAction.action === "TB" ? "PostThirdBlind" :
                                firstAction.action,
                    amount: actionDetails.amount !== undefined ? actionDetails.amount : ""
                })

                completedIterations++;
                if (completedIterations === data.playersInfo.length) {
                    console.log("---------First Action Completed-----------");
                    this.onDealingPlayerCards(data, 1);
                }
            }, index * 2000);
        });
    };

    onDealingPlayerCards(data) {
        // console.log("dealing cards  >> ", data);
        console.log("dealing cards  >> ", data.playersInfo);
        // let nextAcionIndex = this.state.nextAcionIndex;
        this.seatsRef.current.onDealingCardsReplay(data.playersInfo, this.state.seatCnt);
        // const cards = {}
        // Object.assign(cards, data);
        // console.log(cards)
        // console.log(this.state.seatCnt)
        // this.seatsRef.current.onDealingCardsReplay(cards, this.state.seatCnt);

        // this.setState({ nextAcionIndex: nextAcionIndex + (num + 1) })
        // setTimeout(() => {
        //     this.onDealingExtraActions(data);
        // }, 2000);
    };



    onDealingExtraActions(data) {
        console.log("onDealingActions >> ", data.playersInfo);
        let lockraiseIndex = this.state.lockraiseIndex;
        let nextAcionIndex = this.state.nextAcionIndex;
        let multAcion = this.state.multAcion;
        console.log(multAcion)
        console.log("---------------------------  ", this.state.nextAcionIndex)
        const players = data.playersInfo;
        const playerSecondActions = players.map(player => {
            const actionKeys = Object.keys(player.actions);
            const secondActionKey = actionKeys.length > 1 ? actionKeys[nextAcionIndex] : null;
            const secondActionIndex = secondActionKey ? parseInt(secondActionKey) : null;
            return {
                playerName: player.name,
                seatId: player.seatId,
                actionIndex: secondActionIndex
            };
        }).filter(actionDetails => actionDetails.actionIndex !== null);

        playerSecondActions.sort((a, b) => {
            return a.actionIndex - b.actionIndex;
        });
        let completedIterations = 0;
        let raiseIndex = 0;
        console.log(playerSecondActions)

        playerSecondActions.forEach((actionDetails, index) => {
            setTimeout(() => {
                const player = players.find(player => player.name === actionDetails.playerName);
                const secondAction = player.actions[actionDetails.actionIndex];

                this.seatsRef.current.onPlayerAction({
                    seat: actionDetails.seatId,
                    action: secondAction.action === "SB" ? "PostSmallBlind" :
                        secondAction.action === "BB" ? "PostBigBlind" :
                            secondAction.action === "TB" ? "PostThirdBlind" :
                                secondAction.action,
                    amount: (secondAction.amount !== undefined ? secondAction.amount : "")
                });
                if (index > 0) {
                    if (lockraiseIndex) {
                        raiseIndex++
                        console.log(index)
                        if (secondAction.action === "Raise") {
                            console.log("Index of the first raise action:", raiseIndex);
                            this.setState({ multAcion: raiseIndex })
                            this.setState({ lockraiseIndex: false })
                        }
                    }
                }
                completedIterations++;
                if (completedIterations === playerSecondActions.length) {
                    console.log("---------Second Action Completed-----------");
                    if (this.state.multAcion !== -1) {
                        setTimeout(() => {
                            this.onDealingRaise(data, this.state.multAcion);
                        }, 2000);
                    } else {
                        // this.setState({ nextAcionIndex: nextAcionIndex + 1 });
                        console.log("flopCards > ", this.state.flopCards)
                        console.log("turnCard > ", this.state.turnCard)
                        console.log("riverCard > ", this.state.riverCard)

                        if (this.state.flopCards !== "") {
                            setTimeout(() => {
                                this.setState({ flopCards: "" });
                                this.onDealingTurn(data);
                            }, 2000);
                        } else if (this.state.turnCard !== "") {
                            setTimeout(() => {
                                this.setState({ turnCard: "" });
                                this.onDealingRiver(data);
                            }, 2000);
                        } else if (this.state.riverCard !== "") {
                            setTimeout(() => {
                                this.setState({ riverCard: "" });
                                this.onWinner(data);
                            }, 2000);
                        } else if (this.state.flopCards === "" && this.state.turnCard === "" && this.state.riverCard === "") {
                            setTimeout(() => {
                                this.onPotsChange(data, nextAcionIndex);
                            }, 2000);
                        } else {
                            console.log(" Not matched any of the above conditions ")
                        }
                    }
                }
            }, index * 3000);
        });
    }


    onDealingRaise(data, num) {
        console.log(num)
        let lockraiseIndex = this.state.lockraiseIndex;
        let nextAcionIndex = this.state.nextAcionIndex;
        this.setState({ multAcion: -1 })
        this.setState({ lockraiseIndex: true })
        const players = data.playersInfo;
        const playerSecondActions = players.map(player => {
            const actionKeys = Object.keys(player.actions);
            const secondActionKey = actionKeys.length > 1 ? actionKeys[num] : null;
            const secondActionIndex = secondActionKey ? parseInt(secondActionKey) : null;
            return {
                playerName: player.name,
                seatId: player.seatId,
                actionIndex: secondActionIndex
            };
        }).filter(actionDetails => actionDetails.actionIndex !== null);

        playerSecondActions.sort((a, b) => {
            return a.actionIndex - b.actionIndex;
        });

        let completedIterations = 0;
        let raiseIndex = 0;
        const numRounds = 0;

        console.log(playerSecondActions)
        playerSecondActions.forEach((actionDetails, index) => {
            setTimeout(() => {
                const player = players.find(player => player.name === actionDetails.playerName);
                const secondAction = player.actions[actionDetails.actionIndex];
                if (completedIterations <= numRounds) {
                    this.seatsRef.current.onPlayerAction({
                        seat: actionDetails.seatId,
                        action: secondAction.action === "SB" ? "PostSmallBlind" :
                            secondAction.action === "BB" ? "PostBigBlind" :
                                secondAction.action === "TB" ? "PostThirdBlind" :
                                    secondAction.action,
                        amount: (secondAction.amount !== undefined ? secondAction.amount : "")
                    });
                    console.log(player.actions[actionDetails.actionIndex])
                    delete player.actions[actionDetails.actionIndex];
                    if (lockraiseIndex) {
                        raiseIndex++
                        if (secondAction.action === "Raise") {
                            console.log("Index of the first raise action:", raiseIndex);
                            this.setState({ multAcion: raiseIndex })
                            this.setState({ lockraiseIndex: false })
                        }
                    }

                    console.log("---------3rd Action Completed-----------");
                    if (completedIterations === numRounds) {
                        if (this.state.multAcion !== -1) {
                            this.onDealingRaise(data, this.state.multAcion);
                        } else {
                            // this.setState({ nextAcionIndex: nextAcionIndex + 1 });
                            setTimeout(() => {
                                this.onPotsChange(data, nextAcionIndex);
                            }, 2000);
                        }
                    }
                    completedIterations++;
                }
            }, index * 3000);
        });
    }


    onPotsChange(data, num) {
        // console.log("onPotsChange  >>  ", data.gameRoundInfo.PotsChange)
        // this.seatsRef.current.onPotsChange(data.gameRoundInfo);
        console.log("onPotsChange  >>  ", data)
        this.seatsRef.current.onPotsChange(data);
        this.onRakeChangeTime = setTimeout(() => {
            this.onRakeChange(data, num);
        }, 500);
    };

    onRakeChange(data, num) {
        // console.log("onRakeChange  >>  ", data.gameRoundInfo.RakeChange)
        // this.seatsRef.current.onRakeCut(data.gameRoundInfo);
        console.log("onRakeChange  >>  ", data.RakeChange)
        this.seatsRef.current.onRakeCut(data);
        // this.onDealingFlopTime = setTimeout(() => {
        //     this.onDealingFlop(data, num);
        // }, 500);
    };

    onDealingFlop(data, num) {
        // console.log("onDealingFlop  >>  ", data.DealingBoardCards.flop);
        // var getFlopCards = (data.DealingBoardCards.flop).split(" ");
        console.log("onDealingFlop  >>  ", data);
        var getFlopCards = (data.flopCards).split(" ");
        let ritFlop = this.state.ritFlop;
        let i = 0,
            cnt = getFlopCards.length;
        for (i; i < cnt; i++) {
            switch (i) {
                case 0:
                    this.boardCardsRef.current.addCards("flopZero", getFlopCards[i], 0);
                    ritFlop.cardOne = getFlopCards[i];
                    break;
                case 1:
                    this.boardCardsRef.current.addCards("flopOne", getFlopCards[i], 150);
                    ritFlop.cardTwo = getFlopCards[i];
                    break;
                case 2:
                    this.boardCardsRef.current.addCards("flopTwo", getFlopCards[i], 300);
                    ritFlop.cardThree = getFlopCards[i];
                    break;
                default:
                    break;
            }
            // this.setState({ ritFlop: ritFlop });
            // if (Number(cnt) === (Number(i) + 1)) {
            //     let nextAcionIndex = this.state.nextAcionIndex;
            //     this.setState({ nextAcionIndex: nextAcionIndex + 1 });
            //     this.setState({ flopCards: data.DealingBoardCards.flop });
            //     setTimeout(() => {
            //         this.onDealingExtraActions(data, nextAcionIndex)
            //     }, 2000);
            // }
        }
    };


    onDealingTurn(data) {
        // console.log("onDealingTurn  >>  ", data.DealingBoardCards.turn[0].card);
        console.log("onDealingTurn  >>  ", data.turnCard);
        this.setState({ flopCards: "" });
        console.log(this.state.flopCards)
        // alert("flopCards")
        let ritFlop = this.state.ritFlop;
        // this.boardCardsRef.current.addCards("turn", data.DealingBoardCards.turn[0].card, 0);
        // ritFlop.cardTurn = data.DealingBoardCards.turn[0].card;
        this.boardCardsRef.current.addCards("turn", data.turnCard, 0);
        ritFlop.cardTurn = data.turnCard;

        // let nextAcionIndex = this.state.nextAcionIndex;
        // this.setState({ nextAcionIndex: nextAcionIndex + 1 });
        // this.setState({ turnCard: data.DealingBoardCards.turn[0].card });
        // this.setState({ turnCard: data.urnCard });
        // setTimeout(() => {
        //     this.onDealingExtraActions(data, nextAcionIndex)
        // }, 2000);
    };

    onDealingRiver(data) {
        // console.log("onDealingRiver  >>  ", data.DealingBoardCards.river[0].card);
        console.log("onDealingRiver  >>  ", data.riverCard);
        this.setState({ turnCard: "" });
        console.log(this.state.turnCard)
        // alert("turnCard")
        let ritFlop = this.state.ritFlop;
        // this.boardCardsRef.current.addCards("river", data.DealingBoardCards.river[0].card, 0);
        // ritFlop.cardTurn = data.DealingBoardCards.river[0].card;
        this.boardCardsRef.current.addCards("river", data.riverCard, 0);
        ritFlop.cardTurn = data.riverCard;

        // setTimeout(() => {
        //     this.setState({ riverCard: "" });
        //     this.onWinner(data);
        // }, 2000);


        // let nextAcionIndex = this.state.nextAcionIndex;
        // this.setState({ nextAcionIndex: nextAcionIndex + 1 });
        // // this.setState({ riverCard: data.DealingBoardCards.river[0].card });
        // this.setState({ riverCard: data.riverCard });
        // setTimeout(() => {
        //     this.onDealingExtraActions(data, nextAcionIndex)
        // }, 2000);
    };



    onWinner(data) {
        // console.log("onWinner  >> ", data.Winner)
        console.log("onWinner  >> ", data)
        this.seatsRef.current.onWinner(this.player.id, data);
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
    }

    componentWillUnmount() {
        console.log("clear alll")
    };

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

    }


    render() {
        return (
            <React.Fragment>
                <>
                    <div className="exitBtn">
                        <button type="button" onClick={this.closeReplayTable.bind(this)}>x</button>
                    </div>
                    <div className={Screen.getDeviceType().style.gameBox} id={this.props.id} style={{ transform: 'scale(0.72)' }}>
                        <img src={Screen.getDeviceType().name === "Mobile" ? NewTable : NewTable1} className={Screen.getDeviceType().style.image} alt="" />
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
                </>
            </React.Fragment>
        );
    };
};