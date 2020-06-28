"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViGEmClient = void 0;
const Client_1 = require("./Client");
const Utils_1 = require("./Utils");
const X360Controller_1 = require("../X360/X360Controller");
const DS4Controller_1 = require("../DS4/DS4Controller");
class ViGEmClient {
    constructor() {
        this._connected = false;
    }
    get connected() {
        return this._connected;
    }
    get handle() {
        return this._handle;
    }
    connect() {
        this._handle = Client_1.vigemclient.vigem_alloc();
        let error = Utils_1.handlePossibleError(Client_1.vigemclient.vigem_connect(this._handle));
        this._connected = !error;
        return error;
    }
    createX360Controller() {
        if (!this.connected)
            throw new Error("Not connected");
        return new X360Controller_1.X360Controller(this);
    }
    createDS4Controller() {
        if (!this.connected)
            throw new Error("Not connected");
        return new DS4Controller_1.DS4Controller(this);
    }
}
exports.ViGEmClient = ViGEmClient;
//# sourceMappingURL=ViGEmClient.js.map