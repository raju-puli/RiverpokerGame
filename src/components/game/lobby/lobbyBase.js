import React from "react";
import Network from "../../network/network";
import PingProducer from "../../network/pingProducer";
import TimerSynchronizer from "../../network/timerSynchronizer";
import DateUtils from "../../utils/dateUtils";
// import { Emitter } from "../../utils/eventEmitter";

export default class LobbyBase extends React.Component {
    constructor(props) {
        super(props);

        this.lobbyNetworkReady = false;
        this.isSeatMe = false;

        // localStorage.setItem("sooperPokerOpenTables", JSON.stringify([]));
        this.sWidth = window.screen.width;
        this.sHeight = window.screen.height;

        this.tableWidth = this.sWidth;
        this.tableHeight = this.sHeight;
    }

    componentDidMount() {
        this.initNetwork();
    }

    initNetwork() {
        this._lobbyNetwork = new Network();
        this.socketName = "Lobby";
        this._lobbyNetwork.initNetwork(this.socketName, this.eventCallback());

        this._pingProducer = new PingProducer(this._lobbyNetwork);
        this._timerSyhchronizer = new TimerSynchronizer(this._lobbyNetwork);
        this._dateUtils = new DateUtils();

        // Emitter.on(this._lobbyNetwork.ConnectionEstd + "_" + this.socketName, this.onConnectionEstablished.bind(this));
        // Emitter.on(this._lobbyNetwork.OnReceivingData + "_" + this.socketName, this.onReceivingData.bind(this));
        // Emitter.on(this._lobbyNetwork.ConnectionClosed + "_" + this.socketName, this.onConnectionClosed.bind(this));
        // Emitter.on(this._lobbyNetwork.ReConnectionEstd + "_" + this.socketName, this.onReConnection.bind(this));
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
        let name = "POKER";
        this._lobbyNetwork.send("<EnterLobby name='" + name + "' sessionId='" + this.props.data.sid + "' />");
        this._pingProducer.start();
        this._timerSyhchronizer.start();
    }
    onConnectionError() {
        console.log("=========== connection error");
    }
    onReConnection() {
        let name = "POKER";
        this.onConnectionClosed();
        this._lobbyNetwork.send("<EnterLobby name='" + name + "' sessionId='" + this.props.data.sid + "' />");
        this._pingProducer.start();
        this._timerSyhchronizer.start();
    }

    onConnectionClosed() {
        this._pingProducer.stop();
        this._timerSyhchronizer.stop();
        clearInterval(this.getTablesInt);
        clearInterval(this.getPlayerInfoInt);
        clearInterval(this.getServerInfoInt);
        clearInterval(this.getServerTimeInt);
        clearInterval(this.getBBJint);
    }
    onReceivingData(data) {
        this._pingProducer.onAsynchData(data);
        this._timerSyhchronizer.onAsynchData(data);
        if (data.hasOwnProperty("LobbyInfo")) {
            this.onLobbyInfo({ LobbyInfo: data.LobbyInfo });
        }
        if (data.hasOwnProperty("ServerInfo")) {
            this.onServerInfo({ ServerInfo: data.ServerInfo });
        }
        if (data.hasOwnProperty("ServerTime")) {
            this.onServerTime({ ServerTime: data.ServerTime });
        }
        if (data.hasOwnProperty("PlayerInfo")) {
            this.onPlayerInfo({ PlayerInfo: data.PlayerInfo });
        }
        if (data.hasOwnProperty("Avatars")) {
            // console.log(data.Avatars)
            this.onGetavtarList({ Avatars: data.Avatars });
        }
        if (data.hasOwnProperty("SingleTables")) {
            this.onGetTables({ SingleTables: data.SingleTables });
            this.lobbyNetworkReady = true;
        }
        if (data.hasOwnProperty("TableDetails")) {
            this.onGetTableDetails({ TableDetails: data.TableDetails });
        }
        if (data.hasOwnProperty("BadBeatJackpotPayout")) {
            this.onBadBeatJackpotPayout(data);
        }
        if (data.hasOwnProperty("Error")) {
            // console.log(data.Error);
            if (data.Error.attr.code === "040") {
                this.initNetwork();
            } else {
                this.onGetError({ Error: data.Error });
            }
        }
        if (data.hasOwnProperty("ConnectionReplaced")) {
            this.onGetError({ Error: "ConnectionReplaced" });
            // this._lobbyNetwork.close();
        }

        if (data.hasOwnProperty("PlayerJoinedWaitingList")) {
            this.onPlayerJoinedWaitingList({ PlayerJoinedWaitingList: data.PlayerJoinedWaitingList })
        }
        if (data.hasOwnProperty("OpenTable")) {
            console.log(data.OpenTable)
            this.onOpenTable({ OpenTable: data.OpenTable });
        }
        if (data.hasOwnProperty("Tournaments")) {
            this.onGetTournaments({ Tournaments: data.Tournaments });
        }
        if (data.hasOwnProperty("OpenTournamentLobby")) {
            this.onOpenTournamentLobby({ OpenTournamentLobby: data.OpenTournamentLobby });
        }
        if (data.hasOwnProperty("TournamentPlayerRegistered")) {
            this.onTournamentPlayerRegistered({ TournamentPlayerRegistered: data.TournamentPlayerRegistered });
        }
        if (data.hasOwnProperty("TournamentPlayerUnregistered")) {
            this.onTournamentPlayerUnregistered({ TournamentPlayerUnregistered: data.TournamentPlayerUnregistered });
        }
        if (data.hasOwnProperty("NewsList")) {
            this.onGetNews(data);
        }
        if (data.hasOwnProperty("DpSetting")) {
            this.onGetDPsettings(data);
        }
        if (data.hasOwnProperty("PlayerLevelInfo")) {
            this.onGetPlayerLevelInfo(data);
        }
        if (data.hasOwnProperty("MyTables")) {
            this.onGetMyTable(data);
        }
        if (data.hasOwnProperty("MyTournaments")) {
            this.onGetMyTournaments(data);
        }
        if (data.hasOwnProperty("PlayerSearchResult")) {
            this.onGetPlayerSearchResult(data);
        }
        if (data.hasOwnProperty("BadBeatJackpot")) {
            this.onGetBadBeatJackpot({ BadBeatJackpot: data.BadBeatJackpot });
        }
        if (data.hasOwnProperty("Buddies")) {
            this.onGetBuddies(data);
        }
        if (data.hasOwnProperty("AcceptInvitation")) {
            this.onAcceptInvitation(data);
        }
        if (data.hasOwnProperty("BuddyRemoved")) {
            this.onBuddyRemoved(data);
        }
    }
    onLobbyInfo(data) {
        this._lobbyNetwork.send(`<GetBuddies/>`);
        this._lobbyNetwork.send(`<GetPlayerInfo/>`);
        this._lobbyNetwork.send("<GetMyTables/>");
        this._lobbyNetwork.send("<GetNewsList/>");
        this._lobbyNetwork.send("<GetMyTournaments/>");
        this._lobbyNetwork.send(`<GetServerInfo/>`);
        this._lobbyNetwork.send(`<GetBadBeatJackpot/>`);
        this._lobbyNetwork.send(`<GetAvatars/>`);
        this._lobbyNetwork.send(`<GetAvatar network="rp1" id="1-3b5"/>`);
        this.getTables();
        this.lobbyNetworkReady = true;
        this.getTablesRecurring();
        this.initRecurring();
    }

    onGetBadBeatJackpot(data) { }
    onGetBuddies(data) { }
    onAcceptInvitation(data) { }
    onBuddyRemoved(data) { }
    onServerInfo(data) { }
    onServerTime(data) { }
    onPlayerInfo(data) { }
    onGetavtarList(data) { }
    onGetTables(data) { }
    onGetTournaments(data) { }
    onGetTableDetails(data) { }
    onGetError(data) { }
    onGetNews(data) { }
    onGetDPsettings(data) { }
    onGetPlayerLevelInfo(data) { }
    onGetMyTable(data) { }
    onGetMyTournaments(data) { }
    onGetPlayerSearchResult(data) { }
    onTournamentPlayerRegistered(data) { }
    onTournamentPlayerUnregistered(data) { }
    onPlayerJoinedWaitingList(data) { }
    onOpenTable(data) {
        // console.log("open table data to capture table name");
        // let openTables = JSON.parse(localStorage.getItem("sooperPokerOpenTables"));
        // if (openTables.includes(`${data.OpenTable.attr.id}`) === false) {
        //   openTables.push(data.OpenTable.attr.id);
        //   localStorage.setItem("sooperPokerOpenTables", JSON.stringify(openTables));
        //   if (this.isSeatMe) {
        //     this.isSeatMe = false;
        //     let value = { sid: this.props.data.sid, tourneyId: undefined, isSeatMe: true };
        //     let tablewindow = window.open(`${window.location}`, `tableid0=${data.OpenTable.attr.id}`,
        //       `width=${this.tableWidth},height=${this.tableHeight},
        //        status=no,toolbar=no,titlebar=no,location=no,resizable=false,scrollbars=no`);
        //     tablewindow.sessionStorage.setItem(data.OpenTable.attr.id, JSON.stringify(value));
        //   } else {
        //   }
        // } else {
        //   console.log("already table opened")
        // }
    }

    onOpenTournamentLobby(data) {
        // let value;
        // if (data.OpenTournamentLobby.attr.hasOwnProperty("tableId")) {
        //     value = { sid: this.props.data.sid, tableId: data.OpenTournamentLobby.attr.tableId };
        // } else {
        //     value = { sid: this.props.data.sid, tableId: undefined };
        // }
    }

    getTables() {
        this.getTableRequest = '<GetSingleTables id="' + this._dateUtils.getUniqueIdentifier() + '" modes="CASH" games="TEXAS_HOLDEM | OMAHA | OMAHA_FIVE_CARDS | OMAHA_SIX_CARDS | OMAHA_HIGH_LOW" />';
        this._lobbyNetwork.send(this.getTableRequest);
    }
    updateGetTableRequest(data) {
        this.getTableRequest = data;
    }
    getTablesRecurring() {
        this.getTablesInt = setInterval(() => {
            this._lobbyNetwork.send(this.getTableRequest);
        }, 15000);
    }

    initRecurring() {
        this.getPlayerInfoInt = setInterval(() => {
            this._lobbyNetwork.send("<GetPlayerInfo/>");
            this._lobbyNetwork.send("<GetNewsList/>");
            // this._lobbyNetwork.send("<GetMyTables/>");
        }, 10000);

        this.getServerInfoInt = setInterval(() => {
            this._lobbyNetwork.send("<GetServerInfo/>");
        }, 8000);
        this.getServerTimeInt = setInterval(() => {
            this._lobbyNetwork.send("<GetServerTime/>");
        }, 10000);
        this.getBBJint = setInterval(() => {
            this._lobbyNetwork.send(`<GetBadBeatJackpot/>`);
        }, 60000);
    }
}
