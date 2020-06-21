"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViGEmTarget = void 0;
const Client_1 = require("./Client");
const events_1 = require("events");
const Common_1 = require("./Common");
const NotConnectedError = () => new Error("Target is not connected");
class ViGEmTarget extends events_1.EventEmitter {
    constructor(client) {
        super();
        this.client = client;
        this._connected = false;
        this.target = null;
    }
    get connected() {
        return this._connected;
    }
    get vendorID() {
        this.checkConnection();
        return Client_1.vigemclient.vigem_target_get_vid(this.target);
    }
    get productID() {
        this.checkConnection();
        return Client_1.vigemclient.vigem_target_get_pid(this.target);
    }
    get index() {
        this.checkConnection();
        return Client_1.vigemclient.vigem_target_get_index(this.target);
    }
    get type() {
        this.checkConnection();
        return Client_1.vigemclient.vigem_target_get_type(this.target);
    }
    get attached() {
        if (!this.connected)
            return false;
        return Client_1.vigemclient.vigem_target_is_attached(this.target);
    }
    alloc() {
        throw new Error("Method not implemented");
    }
    checkConnection() {
        if (!this.connected)
            throw NotConnectedError();
    }
    connect(opts = {}) {
        let client = this.client.handle;
        let target = this.alloc();
        if ("vendorID" in opts)
            Client_1.vigemclient.vigem_target_set_vid(target, opts.vendorID);
        if ("productID" in opts)
            Client_1.vigemclient.vigem_target_set_pid(target, opts.productID);
        let error = Common_1.handlePossibleError(Client_1.vigemclient.vigem_target_add(client, target));
        if (!error) {
            this._connected = true;
            this.target = target;
        }
        else {
            this._connected = false;
            this.target = null;
        }
        return error;
    }
    disconnect() {
        this.checkConnection();
        let client = this.client.handle;
        let error = Common_1.handlePossibleError(Client_1.vigemclient.vigem_target_remove(client, this.target));
        if (!error) {
            this._connected = false;
            this.target = null; // finalizer takes care of the clean up
        }
        return error;
    }
    update() {
        throw new Error("Method not implemented");
    }
}
exports.ViGEmTarget = ViGEmTarget;
//# sourceMappingURL=ViGEmTarget.js.map