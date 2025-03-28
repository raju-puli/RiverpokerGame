import Network from "./network";
// import {Emitter} from "../utils/eventEmitter";

export default class PingProducer {
    constructor(network) {
        if (network) {
            this._network = network;
            this._receive = setTimeout(this.errorEventHandler.bind(this), 30000); //60
            this._send = setTimeout(this.sendEventHandler.bind(this), 20000);//30
            this._run = false;

            if (this._network instanceof Network) {

            }
            // Emitter.on(this._network.OnReceivingData, this.onAsynchData.bind(this));
        }

    }
    onAsynchData(event) {
        var responseName = Object.keys(event)[0];
        if (event != null && responseName.toString() === "Ping") {
            if (this._receive) {
                clearTimeout(this._receive);
            }
            if (this._send) {
                clearTimeout(this._send);
            }
            if (this._run) {
                this._send = setTimeout(this.sendEventHandler.bind(this), 20000); //30s
            }
        }
    }
    sendEventHandler() {
        this._network.send("<Ping/>");
        if (this._receive) {
            clearTimeout(this._receive);
        }
        this._receive = setTimeout(this.errorEventHandler.bind(this), 30000); //60s
    }
    errorEventHandler() {
        
    }
    get run() {
        return this._run;
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
            if (this._receive)
                clearTimeout(this._receive);
        }
    }
}