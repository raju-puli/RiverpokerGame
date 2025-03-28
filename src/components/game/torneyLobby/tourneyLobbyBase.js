import React from "react";
import Network from "../../network/network";
import PingProducer from "../../network/pingProducer";
import TimerSynchronizer from "../../network/timerSynchronizer";
import DateUtils from "../../utils/dateUtils";

export default class TourneyLobbyBase extends React.Component {
    constructor(props) {
        super(props);
        this.TourneylobbyNetworkReady = false;
        // console.log("tourney lobby base props are");
        this.first = true;
        this.tourneyData = {};
    }
    componentDidMount() {
        console.log("=== t lobby mounted");
        // this.initNetwork();
    }
    initNetwork(tourneyData) {
        this.tourneyData = tourneyData;
        this._tourneyNetwork = new Network();
        this.socketName = this.tourneyData.tourneyId;
        this._tourneyNetwork.initNetwork(this.socketName, this.eventCallback());

        this._pingProducer = new PingProducer(this._tourneyNetwork);
        this._timerSyhchronizer = new TimerSynchronizer(this._tourneyNetwork);
        this._dateUtils = new DateUtils();
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
        console.log("=========== tourneyLobby Socket Connection Open============");
        this._tourneyNetwork.send("<EnterTournamentLobby id='" + this.tourneyData.tourneyId + "' sessionId='" + this.tourneyData.sid + "' />");
        this._pingProducer.start();
        this._timerSyhchronizer.start();
    }

    onConnectionError() {
        console.log("=========== T Lobby Connection error");
    }
    onReConnection() {
        this._tourneyNetwork.send("<EnterTournamentLobby id='" + this.tourneyData.tourneyId + "' sessionId='" + this.tourneyData.sid + "' />");
        try {
            this._pingProducer.stop();
        } catch (e) { console.log(e) }
        try {
            this._timerSyhchronizer.stop();
        } catch (e) { console.log(e) }
        this._pingProducer.start();
        this._timerSyhchronizer.start();
    }
    onConnectionClosed() {
        // this.clearTourneyLobby()
        this._pingProducer.stop();
        this._timerSyhchronizer.stop();
        clearInterval(this.getTdetailsInt);
        clearInterval(this.getPlayersInterval);
        clearInterval(this.getScheduleInterval);
    }
    onReceivingData(data) {
        this._pingProducer.onAsynchData(data);
        this._timerSyhchronizer.onAsynchData(data);
        if (data.hasOwnProperty("TournamentDetails")) {
            this.onGetTournamentDetails({ TournamentDetails: data.TournamentDetails });
        }

        if (data.hasOwnProperty("ServerInfo")) {
            this.onServerInfo({ ServerInfo: data.ServerInfo });
        }
        if (data.hasOwnProperty("PlayerInfo")) {
            this.onPlayerInfo({ PlayerInfo: data.PlayerInfo });
        }
        if (data.hasOwnProperty("Players")) {
            this.onGetPlayers({ Players: data.Players });
        }
        if (data.hasOwnProperty("Tables")) {
            this.onGetTables({ Tables: data.Tables });
        }
        if (data.hasOwnProperty("Schedule")) {
            this.onGetSchedule({ Schedule: data.Schedule });
        }

        if (data.hasOwnProperty("Error")) {
            this.onGetError({ Error: data.Error });
        }

        if (data.hasOwnProperty("TournamentPlayerRegistered")) {
            this.onTournamentPlayerRegistered({ TournamentPlayerRegistered: data.TournamentPlayerRegistered });
        }
        if (data.hasOwnProperty("TournamentPlayerUnregistered")) {
            this.onTournamentPlayerUnregistered({ TournamentPlayerUnregistered: data.TournamentPlayerUnregistered });
        }
        if (data.hasOwnProperty("TableDetails")) {
            this.onGetTableDetails({ TableDetails: data.TableDetails });
        }
        if (data.hasOwnProperty("OpenTournamentTable")) {
            this.onGetOpenTournamentTable({ OpenTournamentTable: data.OpenTournamentTable });
        }
        if (data.hasOwnProperty("ConnectionReplaced")) {
            this.onGetConnectionReplaced({ ConnectionReplaced: data.ConnectionReplaced });
        }
        // if(data.hasOwnProperty("LobbyInfo")){
        //     this.onLobbyInfo({LobbyInfo:data.LobbyInfo})
        // }
        // if(data.hasOwnProperty("LobbyInfo")){
        //     this.onLobbyInfo({LobbyInfo:data.LobbyInfo})
        // }
        // if(data.hasOwnProperty("LobbyInfo")){
        //     this.onLobbyInfo({LobbyInfo:data.LobbyInfo})
        // }
    }
    onGetTournamentDetails(data) {
        if (this.first) {
            this.first = false;
            this.tableId = this.tourneyData.tableId;
            this.openTable();
            setTimeout(() => {
                this.initTourneyLobby(data);
            }, 500);

            this.fetchLiveData();
        } else {
            this.initTourneyLobby(data);
        }
        this._tourneyNetwork.send("<GetPlayerInfo/>");
        this._tourneyNetwork.send("<GetPlayers/>");
        this._tourneyNetwork.send("<GetTables/>");
        this._tourneyNetwork.send("<GetSchedule/>");
        this._tourneyNetwork.send("<GetTableDetails/>");
        // this._tourneyNetwork.send("<GetTournamentInfoChange/>");

    }
    onGetOpenTournamentTable(data) {
        // let value = { sid: this.tourneyData.sid, tourneyId: this.tourneyData.tourneyId };
    }
    openTable() {
        let tableType = "TOURNAMENT_TABLE";

        if (this.tourneyData.tableId) {
            this._tourneyNetwork.send("<OpenTable id='" + this.tourneyData.tableId + "' type='" + tableType + "'/>");
            this.tableId = undefined;
        }
    }
    initTourneyLobby(data) {
        // this._tourneyNetwork.send("<GetSchedule/>");
    }
    onServerInfo(data) { }
    onPlayerInfo(data) { }
    onGetError(data) { }
    onGetPlayers(data) { }
    onGetTables(data) { }
    onGetConnectionReplaced(data) { }
    onGetSchedule(data) { }
    onGetTableDetails(data) { }
    onTournamentPlayerRegistered(data) { }
    onTournamentPlayerUnregistered(data) { }
    fetchLiveData() {
        // this._tourneyNetwork.send("<GetPlayerInfo/>");
        this.getTdetailsInt = setInterval(() => {
            this._tourneyNetwork.send("<GetTables/>");
        }, 10000);

        this.getPlayersInterval = setInterval(() => {
            this._tourneyNetwork.send("<GetPlayers/>");
        }, 5000);

        this.getScheduleInterval = setInterval(() => {
            this._tourneyNetwork.send("<GetSchedule/>");
        }, 3000);
    }
}
