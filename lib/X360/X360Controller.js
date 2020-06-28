"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X360Controller = void 0;
const Client_1 = require("../ts/Client");
const ViGEmTarget_1 = require("../ts/ViGEmTarget");
const Utils_1 = require("../ts/Utils");
const InputButton_1 = require("../Inputs/InputButton");
const InputAxis_1 = require("../Inputs/InputAxis");
const X360ControllerReport_1 = require("./X360ControllerReport");
const X360Notification_1 = require("./X360Notification");
const InputDpad_1 = require("../Inputs/InputDpad");
class X360Controller extends ViGEmTarget_1.ViGEmTarget {
    constructor(client) {
        super(client);
        this.report = new X360ControllerReport_1.X360ControllerReport();
        this.notification = new X360Notification_1.X360Notification();
        this.axis = Object.freeze({
            LX: new InputAxis_1.InputAxis(this, "sThumbLX", { minIn: -1, maxIn: 1, minOut: -32768, maxOut: 32767 }),
            LY: new InputAxis_1.InputAxis(this, "sThumbLY", { minIn: -1, maxIn: 1, minOut: -32768, maxOut: 32767 }),
            RX: new InputAxis_1.InputAxis(this, "sThumbRX", { minIn: -1, maxIn: 1, minOut: -32768, maxOut: 32767 }),
            RY: new InputAxis_1.InputAxis(this, "sThumbRY", { minIn: -1, maxIn: 1, minOut: -32768, maxOut: 32767 }),
            LT: new InputAxis_1.InputAxis(this, "bLeftTrigger", { minIn: 0, maxIn: 1, minOut: 0, maxOut: 255 }),
            RT: new InputAxis_1.InputAxis(this, "bRightTrigger", { minIn: 0, maxIn: 1, minOut: 0, maxOut: 255 }),
        });
        this.button = Object.freeze(Object.fromEntries(Object.keys(Utils_1.XUSB_BUTTON).map((button) => [button, new InputButton_1.InputButton(this, button)])));
        this.dpad = new InputDpad_1.InputDpad(this);
    }
    get DPAD() {
        return this.dpad;
    }
    alloc() {
        return Client_1.vigemclient.vigem_target_x360_alloc();
    }
    connect(opts = {}) {
        let err = super.connect(opts);
        if (!err) {
            Client_1.vigemclient.vigem_target_x360_register_notification(this.client.handle, this.target, (data) => {
                this.notification.set(data);
                this.emit("notification", this.notification.freeze());
            });
        }
        return err;
    }
    disconnect() {
        this.checkConnection();
        Client_1.vigemclient.vigem_target_x360_unregister_notification(this.target);
        return super.disconnect();
    }
    get userIndex() {
        this.checkConnection();
        return Client_1.vigemclient.vigem_target_x360_get_user_index(this.client.handle, this.target);
    }
    update() {
        this.checkConnection();
        return Utils_1.handlePossibleError(Client_1.vigemclient.vigem_target_x360_update(this.client.handle, this.target, this.report.freeze()));
    }
}
exports.X360Controller = X360Controller;
//# sourceMappingURL=X360Controller.js.map