const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

class Event {
    constructor() {
        this.myEmitter = new MyEmitter();
    }

    static get instance() {
        return this._instance || (this._instance = new this());
    }

    get emitter() {
        return this.myEmitter;
    }
}

module.exports = Event;