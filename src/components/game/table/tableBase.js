import React from "react";
import Network from "../../network/network";
import PingProducer from "../../network/pingProducer";
import TimerSynchronizer from "../../network/timerSynchronizer";
// import DateUtils from "../../utils/dateUtils";
// import { Emitter } from "../../utils/eventEmitter";

export default class TableBase extends React.Component {
    constructor(props) {
        super(props);

        this.tableMOunted = false;
        this.tableData = {};
        this.reconnectcount = 0;
        //....> move the following into table close event

        // this._flag = window.addEventListener("beforeunload", function (e) {
        //     e.preventDefault();

        //     // e.returnValue = 'Are You Sure? You Want To Close The Table ';
        //     let openTables = JSON.parse(localStorage.getItem("sooperPokerOpenTables"));
        //     for (let i = 0; i < openTables.length; i++) {
        //         if (openTables[i] === props.tableInfo.tableId) {
        //             // delete openTables[i];
        //             openTables.splice(i, 1);
        //         }
        //     }
        //     localStorage.setItem("sooperPokerOpenTables", JSON.stringify(openTables));
        //     e.currentTarget.close();
        // });
    }

    componentDidMount() {
        this.tableMOunted = true;
    }


    initNetwork(tableData) {
        // console.log(tableData)
        this.tableData = { ...tableData };
        console.log("======== called for initiating the table with: ", tableData);

        this._tableNetwork = new Network();
        // this.socketName = this.props.tableInfo.tableId;
        this.socketName = tableData.tableId;
        this._tableNetwork.initNetwork(this.socketName, this.eventCallback());

        this._pingProducer = new PingProducer(this._tableNetwork);
        this._timerSyhchronizer = new TimerSynchronizer(this._tableNetwork);
        // this._dateUtils = new DateUtils();// not using atm
    }
    eventCallback() {
        return {
            open: this.onConnectionEstablished.bind(this),
            message: this.onReceivingData.bind(this),
            close: this.onConnectionClosed.bind(this),
            error: this.onConnectionError.bind(this),
            reConnect: this.onReConnection.bind(this),
        };
    }
    onConnectionEstablished() {
        console.log(`===========Table Socket Connection Estd for ${this.tableData.tableId}============`);
        // console.log("from Table base ready to send pings");
        this.enterTable();

        this._pingProducer.start();
        this._timerSyhchronizer.start();
        this.socketConnetionAlerts("connected");
    }
    onConnectionError() {
        console.log("=========== Table Connection error");
    }
    onReConnection() {
        this.reconnectcount++;
        console.log(`================Re Connected ${this.tableData.tableId}==============`);
        this.socketConnetionAlerts("reconnected");
        this.enterTable();
        this._pingProducer.start();
        this._timerSyhchronizer.start();
        // this.initRecurring();
    }
    //sending
    enterTable() {
        // console.log("the table data: ", this.tableData);
        if (this.tableData.tourneyId) {
            this._tableNetwork.send("<EnterTable client='HTML' tableId='" + this.tableData.tableId + "' tournamentId='" + this.tableData.tourneyId + "' sessionId='" + this.tableData.sid + "'/>");
        } else {
            this._tableNetwork.send("<EnterTable client='HTML' tableId='" + this.tableData.tableId + "' sessionId='" + this.tableData.sid + "'/>");
        }
    }
    getInitialState() {
        this.joinTable();
        this._tableNetwork.send("<GetPlayerInfo/>");
        this._tableNetwork.send(`<AutoRebuy when="0" addTo="0" />`);
        this._tableNetwork.send(`<GetAvatars/>`);
        this.initRecurring();
    }
    joinTable() {
        this._tableNetwork.send("<JoinTable/>");
    }

    onConnectionClosed(data, isReconnect) {
        this._pingProducer.stop();
        this._timerSyhchronizer.stop();
        clearInterval(this.getPlayerInfoInt);
        clearInterval(this.getServerTimeInt);


        if (isReconnect) {
            // if (data.code !== 1000&&!data.wasClean) {
            this.socketConnetionAlerts("closed");
            // alert("closed")
            console.log("previous websocket killed and new websockett is created")
            //   }
            // this.socketConnetionAlerts("closed");
            // initiate reconnection
        }
    }
    initRecurring() {
        this.getPlayerInfoInt = setInterval(() => {
            this._tableNetwork.send("<GetPlayerInfo/>");
        }, 60000);

        this.getServerTimeInt = setInterval(() => {
            this._tableNetwork.send("<GetServerTime/>");
        }, 10000);
    }
    socketConnetionAlerts(state) { }
    //reception
    onReceivingData(data) {
        this._pingProducer.onAsynchData(data);
        this._timerSyhchronizer.onAsynchData(data);
        if (data.hasOwnProperty("TableDetails")) {
            this.onGetTableDetails({ TableDetails: data.TableDetails });
            this.getInitialState();
        }
        if (data.hasOwnProperty("ServerTime")) {
            this.onGetServerTime({ ServerTime: data.ServerTime });
        }
        if (data.hasOwnProperty("Error")) {
            this.onGetError({ Error: data.Error });
        }
        if (data.hasOwnProperty("BuddyAdded")) {
            this.onBuddyAdded(data);
        }
        if (data.hasOwnProperty("Message")) {
            this.parseData(data.Message);
        }
        if (data.hasOwnProperty("PlayerInfo")) {
            this.onGetPlayerInfo({ PlayerInfo: data.PlayerInfo });
        }
        if (data.hasOwnProperty("Avatars")) {
            this.onGetAvatars({ PlayerInfo: data.Avatars });
            // console.log(data)
            // window.location.hash=data.Avatars.Avatar.attr.hash
        }
        if (data.hasOwnProperty("BalanceInfo")) {
            this.onGetBalanceInfo({ BalanceInfo: data.BalanceInfo });
            console.log("BalanceInfo---->", data.BalanceInfo)
        }
        if (data.hasOwnProperty("Alert")) {
            this.onGetAlert(data);
        }
        if (data.hasOwnProperty("CloseTable")) {
            this.onGetCloseTable(data);
        }
        if (data.hasOwnProperty("Changes")) {
            if (data.Changes.hasOwnProperty("TournamentPlayerRanked")) {
                this.onTournamentPlayerRanked({ TournamentPlayerRanked: data.Changes.TournamentPlayerRanked });
            }
        }
        if (data.hasOwnProperty("MoneyExchangeInfo")) {
            this.onMoneyExchangeInfo({ MoneyExchangeInfo: data.MoneyExchangeInfo });
        }
    }

    parseData(data) {
        if (data.hasOwnProperty("GameState")) {
            let gamedata = data.GameState;

            this.updateGamestate({ GameState: gamedata }, this._timerSyhchronizer);

            if (data.GameState.hasOwnProperty("BadBeatJackpot")) {
                this.onGetBadBeatJackpot({ BadBeatJackpot: gamedata.BadBeatJackpot });
            }
            if (gamedata.hasOwnProperty("TournamentInfo")) {
                console.log(gamedata.TournamentInfo)
                if (gamedata.TournamentInfo.hasOwnProperty("NextLevel")) {
                    if (gamedata.TournamentInfo.attr.status === "SEATING") {
                        this.onBreakTime({ breakTime: gamedata.TournamentInfo.attr.startTime });
                    }
                }
            }
        }
        if (data.hasOwnProperty("WaitingList")) {
            this.onWaitingList({ WaitingList: data.WaitingList });
        }
        // if(data.Changes.hasOwnProperty("CombinationChange")){
        //   this.winProb({combChange:data.Changes.CombinationChange})
        // }
        if (data.hasOwnProperty("Changes")) {
            if (data.Changes.hasOwnProperty("NewPlayer")) {
                this.onNewPlayerArray({ NewPlayer: data.Changes.NewPlayer });
            }
            if (data.Changes.hasOwnProperty("TakeSeat")) {
                this.onGetTakeSeat({ TakeSeat: data.Changes.TakeSeat });
            }
            if (data.Changes.hasOwnProperty("NewWaitingPlayer")) {
                this.onNewWaitingPlayer({ NewWaitingPlayer: data.Changes.NewWaitingPlayer });
            }

            if (data.Changes.hasOwnProperty("ChipsRebuy")) {
                this.onChipsRebuyArray({ ChipsRebuy: data.Changes.ChipsRebuy });
            }
            if (data.Changes.hasOwnProperty("Dealer")) {
                this.onDealer({ Dealer: data.Changes.Dealer });
            }
            if (data.Changes.hasOwnProperty("HistoryIdChange")) {
                this.onHistoryId({ HistoryIdChange: data.Changes.HistoryIdChange });
            }
            if (data.Changes.hasOwnProperty("SessionStatistics")) {
                this.onSessionStatistics({ SessionStatistics: data.Changes.SessionStatistics });
            }
            if (data.Changes.hasOwnProperty("ActiveSeats")) {
                this.onActiveSeats({ ActiveSeats: data.Changes.ActiveSeats });
            }
            if (data.Changes.hasOwnProperty("NewHand")) {
                this.onNewHand({ NewHand: data.Changes.NewHand });
            }

            if (data.Changes.hasOwnProperty("ActiveChange")) {
                setTimeout(() => {
                    this.onActiveChange({ ActiveChange: data.Changes.ActiveChange });
                }, 100);
            }

            if (data.Changes.hasOwnProperty("PlayerAction")) {
                this.onPlayerActionArray({ PlayerAction: data.Changes.PlayerAction });
            }
            if (data.Changes.hasOwnProperty("DetermineDealer")) {
                this.onDetermineDealer({ DetermineDealer: data.Changes.DetermineDealer });
                console.log("=================DetermineDealer==================", data.Changes.DetermineDealer);
            }
            if (data.Changes.hasOwnProperty("BadBeatJackpot")) {
                // data.Changes.BadBeatJackpot
                this.onBadBeatJackpot({ BadBeatJackpot: data.Changes.BadBeatJackpot });
            }
            if (data.Changes.hasOwnProperty("JackpotPayout")) {
                // data.Changes.BadBeatJackpot
                this.onJackpotPayout({ JackpotPayout: data.Changes.JackpotPayout });
            }
            if (data.Changes.hasOwnProperty("DealingCards")) {
                this.onDealingCards({ DealingCards: data.Changes.DealingCards });
                console.log(">>>>>>>>>Cards: ", data.Changes.DealingCards);
            }
            if (data.Changes.hasOwnProperty("PotsChange")) {
                setTimeout(() => {
                    this.onPotsChangeArray({ PotsChange: data.Changes.PotsChange });
                }, 20);
            }
            if (data.Changes.hasOwnProperty("RakeChange")) {
                console.log(">>>>>>>>>Rake data: ", data.Changes.RakeChange)
                setTimeout(() => {
                    this.onRakeChange({ RakeChange: data.Changes.RakeChange });
                }, 10);
            }
            if (data.Changes.hasOwnProperty("DealingFlop")) {
                this.onDealingFlop({ DealingFlop: data.Changes.DealingFlop });
                console.log(">>>>>>>>>flops data: ", data.Changes.DealingFlop);
            }
            if (data.Changes.hasOwnProperty("DealingTurn")) {
                this.onDealingTurn({ DealingTurn: data.Changes.DealingTurn });
                console.log(">>>>>>>>>turn data: ", data.Changes.DealingTurn);

            }
            if (data.Changes.hasOwnProperty("DealingRiver")) {
                this.onDealingRiver({ DealingRiver: data.Changes.DealingRiver });
                console.log(">>>>>>>>>river data: ", data.Changes.DealingRiver);
            }
            if (data.Changes.hasOwnProperty("CombinationChange")) {
                this.onCombinationChangeArray({ CombinationChange: data.Changes.CombinationChange });
            }
            if (data.Changes.hasOwnProperty("Winners")) {
                // if (data.Changes.Winners.hasOwnProperty("Winner")) {
                //   this.onWinners({ Winner: data.Changes.Winners.Winner });
                // }
                if (Array.isArray(data.Changes.Winners)) {
                    let i = 0,
                        cnt = data.Changes.Winners.length;
                    for (i; i < cnt; i++) {
                        if (data.Changes.Winners[i].hasOwnProperty("Winner")) this.onWinners({ Winner: data.Changes.Winners[i].Winner });
                    }
                } else {
                    this.onWinners({ Winner: data.Changes.Winners.Winner });
                }
            }
            if (data.Changes.hasOwnProperty("EndHand")) {
                this.onEndHand({ EndHand: data.Changes.EndHand });
            }
            if (data.Changes.hasOwnProperty("DealingRitFlop")) {
                this.onDealingRitFlop({ DealingRitFlop: data.Changes.DealingRitFlop });
            }
            if (data.Changes.hasOwnProperty("DealingRitTurn")) {
                this.onDealingRitTurn({ DealingRitTurn: data.Changes.DealingRitTurn });
            }
            if (data.Changes.hasOwnProperty("DealingRitRiver")) {
                this.onDealingRitRiver({ DealingRitRiver: data.Changes.DealingRitRiver });
            }
            if (data.Changes.hasOwnProperty("RitCombinationChange")) {
                this.onRitCombinationChange({ RitCombinationChange: data.Changes.RitCombinationChange });
            }
            if (data.Changes.hasOwnProperty("ChatMessage")) {
                this.onChatMessage({ ChatMessage: data.Changes.ChatMessage });
            }
            if (data.Changes.hasOwnProperty("ReservedChipsChange")) {
                this.onReservedChipsChange({ ReservedChipsChange: data.Changes.ReservedChipsChange });
            }
            if (data.Changes.hasOwnProperty("WaitingList")) {
                this.onWaitingList({ WaitingList: data.WaitingList });
            }
            if (data.Changes.hasOwnProperty("JackpotFeeChange")) {
                this.onJackpotFeeChange({ JackpotFeeChange: data.Changes.JackpotFeeChange });
            }
            if (data.Changes.hasOwnProperty("WaitingForRebuy")) {
                this.onWaitingForRebuy({ WaitingForRebuy: data.Changes.WaitingForRebuy });
            }
            if (data.Changes.hasOwnProperty("TournamentInfoChange")) {
                this.onTournamentInfoChange({ TournamentInfoChange: data.Changes.TournamentInfoChange });
            }
            if (data.Changes.hasOwnProperty("KnockoutPayouts")) {
                this.onKnockoutPayouts({ KnockoutPayouts: data.Changes.KnockoutPayouts })

            }
            if (data.Changes.hasOwnProperty("TournamentPlayerRanked")) {
                this.onTournamentPlayerRanked({ TournamentPlayerRanked: data.Changes.TournamentPlayerRanked });
            }
            if (data.Changes.hasOwnProperty("SessionStatistics")) {
                this.onGetSessionStatistics({ SessionStatistics: data.Changes.SessionStatistics });
            }
            if (data.Changes.hasOwnProperty("NewGameState")) {
            }
            if (data.Changes.hasOwnProperty("GiftAward")) {
                setTimeout(() => {
                    this.GiftAward({ data: data.Changes.GiftAward })
                }, 100)

            }


            // if(data.Changes.hasOwnProperty("HistoryIdChange")){

            // }
        }
    }

    onGetTableDetails(data) { }
    onGetServerTime(data) { }
    onGetError(data) { }
    onBuddyAdded(data) { }
    onGetAlert(data) { }
    onMoneyExchangeInfo(data) { }
    updateGamestate(data, timerSynchroniser) { }
    // onWaitingList(data){}
    // winProb(data){}
    onBreakTime(data) { }
    onGetBadBeatJackpot(data) { }
    onGetPlayerInfo(data) { }
    onGetAvatars(data) { }
    onGetBalanceInfo(data) { }
    onBadBeatJackpot(data) { }
    onNewPlayerArray(data) {
        if (Array.isArray(data.NewPlayer)) {
            let i = 0,
                cnt = data.NewPlayer.length;
            for (i; i < cnt; i++) {
                this.onNewPlayer({ NewPlayer: data.NewPlayer[i] });
            }
        } else {
            this.onNewPlayer(data);
        }
    }
    onNewPlayer(data) { }
    onGetTakeSeat(data) { }
    onNewWaitingPlayer(data) { }
    onChipsRebuyArray(data) {
        console.log("onChipsRebuyArray", data)
        if (Array.isArray(data.ChipsRebuy)) {
            let i = 0,
                cnt = data.ChipsRebuy.length;
            for (i; i < cnt; i++) {
                this.onChipsRebuy({ ChipsRebuy: data.ChipsRebuy[i] });
            }
        } else {

            this.onChipsRebuy(data);
        }
    }

    onDealer(data) { }
    onActiveSeats(data) { }
    onHistoryId(data) { }
    onSessionStatistics(data) { }
    onNewHand(data) { }
    onPlayerActionArray(data) {
        // console.log(data)
        if (Array.isArray(data.PlayerAction)) {
            let i = 0,
                cnt = data.PlayerAction.length;
            for (i; i < cnt; i++) {
                this.onPlayerAction({ PlayerAction: data.PlayerAction[i] });
            }
        } else {
            this.onPlayerAction(data);
        }
    }
    onPlayerAction(data) { }
    onActiveChange(data) { }
    onEndHand(data) { }
    onChatMessage(data) { }
    onDealingCards(data) { }
    onDetermineDealer(data) {
        console.log("on determine dealer table base ", data);
    }
    onPotsChange(data) { }
    onRakeChange(data) { }
    onDealingFlop(data) { }
    onDealingTurn(data) { }
    onDealingRiver(data) { }
    // onWinnersArray(data) {
    //     if (Array.isArray(data.Winner)) {
    //         let i = 0,
    //             cnt = data.Winner.length;
    //         for (i; i < cnt; i++) {
    //             setTimeout(() => {
    //                 this.onWinners({ Winner: data.Winner[i] });
    //             }, 20 * i)
    //         }
    //     } else {
    //         this.onWinners(data);
    //     }
    // }
    onWinnersArray(data) {
        if (Array.isArray(data.Winner)) {
            for (var i = 0; i < data.Winner.length; i++) {
                ((index) => {
                    setTimeout(() => {
                        this.onWinners({ Winner: data.Winner[index] });
                    }, 20 * index);
                })(i);
            }
        } else {
            this.onWinners(data);
        }
    }

    onWinners(data) {
        if (Array.isArray(data.Winner)) {
            let i = 0,
                cnt = data.Winner.length;
            for (i; i < cnt; i++) {
                this.onWinner({ Winner: data.Winner[i] });
            }
        } else {
            this.onWinner(data);
        }
    }
    onWinner(data) { }
    onCombinationChangeArray(data) {
        if (Array.isArray(data.CombinationChange)) {
            let i = 0,
                cnt = data.CombinationChange.length;
            for (i; i < cnt; i++) {
                // this.onCombinationChange({ CombinationChange: data.CombinationChange[i] });
                this.onCombinationChangeALL({ CombinationChange: data.CombinationChange[i] });
            }
        } else {
            this.onCombinationChange(data);
        }
    }
    onPotsChangeArray(data) {
        if (Array.isArray(data.PotsChange)) {
            let i = 0,
                cnt = data.PotsChange.length;
            for (i; i < cnt; i++) {
                this.onPotsChange({ PotsChange: data.PotsChange[i] });
            }
        } else {
            this.onPotsChange(data);
        }
    }

    onCombinationChange(data) { }
    onReservedChipsChange(data) { }
    onJackpotFeeChange(data) { }
    onWaitingList(data) { }
    onDealingRitFlop(data) { }
    onDealingRitRiver(data) { }
    onDealingRitTurn(data) { }
    onRitCombinationChange(data) { }
    onTournamentInfoChange(data) { }
    onWaitingForRebuy(data) { }
    onTournamentPlayerRanked(data) { }
    onGetSessionStatistics(data) { }
    GiftAward(data) { }
    onKnockoutPayouts(data) { }

    onGetCloseTable(data) {
        // let openTables = JSON.parse(localStorage.getItem("sooperPokerOpenTables"));
        // for (let i = 0; i < openTables.length; i++) {
        //     if (openTables[i] === this.tableData.tableId) {
        //         openTables.splice(i, 1);
        //     }
        // }
        // localStorage.setItem("sooperPokerOpenTables", JSON.stringify(openTables));
        // window.frameElement.remove();
    }
}
