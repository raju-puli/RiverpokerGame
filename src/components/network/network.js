import XMLParser from "../utils/xmlParser";
import Config from "../../config";

// const excludedRequests = [
//     '<GetPlayerInfo/>',
//     '<GetMyTables/>',
//     '<GetServerTime/>',
//     '<GetBadBeatJackpot/>',
//     '<GetPlayers/>',
//     '<Ping/>',
//     '<GetServerInfo/>'
// ];

export default class Network {
    constructor() {
        this.socketName = "";
        this.count = 0;
        this.state_firstConnection = true;
        this.queue = [];
        this.count_reconnect = 0;
        this.reConnect = true;
    }

    initNetwork(socketName, callBack) {
        const config = new Config();
        this.callBack = callBack;
        this.socketName = socketName;
        this.url = config.URL_Environment.webSocket.socketUrl;
        this._xmlParser = new XMLParser();
        this.connection();
    }

    connection() {
        this.count_reconnect++;
        const connectRandom = Math.floor(Math.random() * 200) + 1;

        if (this.count_reconnect < 6) {
            setTimeout(() => {
                if (this._connection) {
                    this.cleanupListeners(this._connection);
                }
                console.log(`===========connecting to socket============ Attempt ${this.count_reconnect}`);

                this._connection = new WebSocket(this.url);
                this._connection.addEventListener("open", this.connectEventHandler.bind(this));
                this._connection.addEventListener("close", this.closeEventHandler.bind(this));
                this._connection.addEventListener("error", this.errorEventHandler.bind(this));
                this._connection.addEventListener("message", this.dataEventHandler.bind(this));
            }, 1000 * this.count_reconnect ** 2 + connectRandom);
        } else {
            alert.lineOne = "Unable to connect";
            alert.lineTwo = "Please relogin 🤔";
            console.log("Clearing storage and reloading the window.");
            setTimeout(() => {
                sessionStorage.clear();
                window.location.reload();
            }, 3000);
        }
    }

    close(reConnect) {
        this.reConnect = reConnect;
        this.cleanupListeners(this._connection);
    }

    cleanupListeners(connectionObj) {
        if (connectionObj) {
            connectionObj.removeEventListener("open", this.connectEventHandler.bind(this));
            connectionObj.removeEventListener("close", this.closeEventHandler.bind(this));
            connectionObj.removeEventListener("error", this.errorEventHandler.bind(this));
            connectionObj.removeEventListener("message", this.dataEventHandler.bind(this));
            connectionObj.close();
        }
    }

    connectEventHandler(event) {
        if (this.state_firstConnection) {
            this.state_firstConnection = false;
            this.callBack["open"](event);
        } else {
            this.callBack["reConnect"](event);
        }
    }

    closeEventHandler(event) {
        console.log("===========Connection Closed===========");
        this.callBack["close"](event, this.reConnect);

        if (this.reConnect) {
            setTimeout(() => {
                this.connection();
            }, 2000);
        }
    }

    errorEventHandler(event) {
        if (this._connection.readyState !== WebSocket.OPEN) {
            console.log("Reconnecting after error...");
            this.callBack["error"](event);
        }
    }

    dataEventHandler(event) {
        this.count_reconnect = 0;
        this.queue.push(event);

        setTimeout(() => {
            const first = this.queue.shift();
            this.parseIntoJSON(first);
        }, 100);
    }

    parseIntoJSON(event) {
        if (event.data) {
            const jsonData = this._xmlParser.parseXML(event.data);
            this.callBack["message"](jsonData);
        }
    }

    send(request) {
        if (this._connection && this._connection.readyState === WebSocket.OPEN) {
            this._connection.send(request?.toString());
        } else {
            console.log(`========== ${this.socketName} socket is not open ==========`);
        }
    }
}
