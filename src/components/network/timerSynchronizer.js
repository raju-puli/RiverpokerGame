// import { Emitter } from "../utils/eventEmitter";

export default class TimerSynchronizer {
    constructor(network) {
        this._serverTimeOffset = 0;
        this._timeUTCOffset = 0;
        this._zeroServerTime = 0;
        this._zeroRunningTime = 0;
        this.SEND_INTERVAL = 30000;
        this._send = setTimeout(this.sendEventHandler.bind(this), this.SEND_INTERVAL);
        this._run = false;

        this._network = network;
        // this._network.emitter.on(this._network.ASYNCH_DATA, this.onAsynchData.bind(this));
        // Emitter.on(this._network.OnReceivingData, this.onAsynchData.bind(this));
    }
    onAsynchData(event) {
        let responseName = Object.keys(event)[0];
        if (event !== null && responseName.toString() === "ServerTime") {

            this.setServerTime(Number(event.ServerTime.attr.time));
            this._timeUTCOffset = Number(event.ServerTime.attr.timeUTCOffset);

            if (this._run) {
                this._send = setTimeout(this.sendEventHandler.bind(this), this.SEND_INTERVAL);
            }
        }
    }
    
    start() {
        if (!this._run) {
            this._run = true;
            this.sendEventHandler();
        }
    }
    stop() {
        if (this._run) {
            this._run = false;
            if (this._send)
                clearTimeout(this._send);
        }
    }
    setServerTime(time) {
        // this._serverTimeOffset = time - new Date().getTime();
        this._serverTimeOffset = time;

        this._zeroServerTime = time;
        this._zeroRunningTime = this.getTime();
    }
    sendEventHandler() {
        if (this._run) {
            this._network.send("<GetServerTime/>");
        }
    }

    getServerTimeOffset() {
        return this._serverTimeOffset;
    }

    getRemainingTime(serverTime) {
        return serverTime - this.getServerTime();
    }

    getServerTime() {
        var offset = this.getTime() - this._zeroRunningTime;
        return this._zeroServerTime + offset;
    }
    getZeroServerTime() {
        return this._zeroServerTime;
    }

    getUTCOffset() {
        return this._timeUTCOffset;
    }

    getTimeUTCOffsetTime(time) {
        var date = new Date();
        date.setTime(time);
        //format to GMT time
        date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        date.setTime(date.getTime() + this.getUTCOffset());
        return date.getTime();
    }



    getTime() {        
        // return app.getTime();
    }
    get run() {
        return this._run;
    }
}