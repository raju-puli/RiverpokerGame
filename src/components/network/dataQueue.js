export default class DataQueue{
    constructor(callBack){
        this._callBack = callBack;
        this._queue = [];
        this._executed = false;
        this._delay = 0;

    }
    destructor() {
        this._executed = false;
        this._queue = [];
        this._delay = 0;
    }
    queueClear() {
        this._queue = [];
    }
    append(items){
        if(this._queue.length === 0){
            this._queue = this._queue.concat(items);
            this.execute();
        }else{
            this._queue = this._queue.concat(items);
        }
    }
    process() {
        if (this._executed) {
            this._executed = false;
            this.execute();
        }
    }
    execute() {
        if(!this._executed && this._queue.length > 0){
            this._executed = true;
            //TODO set delay for execute function;
            this.executeEventHandler();
        }
     }
     executeEventHandler(){
        if (this._callBack != null && this._queue.length > 0){
            this._callBack(this._queue.shift());
        }
    }
    get delay(){
        return this._delay;
    }
    set delay(value){
        this._delay = value;
    }
}