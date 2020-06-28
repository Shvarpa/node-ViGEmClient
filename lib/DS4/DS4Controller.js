"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DS4Controller = void 0;
const Client_1 = require("../ts/Client");
const ViGEmTarget_1 = require("../ts/ViGEmTarget");
const Utils_1 = require("../ts/Utils");
const InputButton_1 = require("../Inputs/InputButton");
const InputAxis_1 = require("../Inputs/InputAxis");
const DS4ControllerReport_1 = require("./DS4ControllerReport");
const DS4Notification_1 = require("./DS4Notification");
const InputDpad_1 = require("../Inputs/InputDpad");
class DS4Controller extends ViGEmTarget_1.ViGEmTarget {
    constructor(client) {
        super(client);
        this.report = new DS4ControllerReport_1.DS4ControllerReport();
        this.notification = new DS4Notification_1.DS4Notification();
        this.button = Object.freeze(Object.fromEntries(Object.keys(Utils_1.DS4_BUTTONS)
            .concat(Object.keys(Utils_1.DS4_SPECIAL_BUTTONS))
            .map((button) => [button, new InputButton_1.InputButton(this, button)])));
        this.axis = Object.freeze({
            LX: new InputAxis_1.InputAxis(this, "bThumbLX", { minIn: -1, maxIn: 1, minOut: 0, maxOut: 255 }),
            LY: new InputAxis_1.InputAxis(this, "bThumbLY", { minIn: -1, maxIn: 1, minOut: 255, maxOut: 0 }),
            RX: new InputAxis_1.InputAxis(this, "bThumbRX", { minIn: -1, maxIn: 1, minOut: 0, maxOut: 255 }),
            RY: new InputAxis_1.InputAxis(this, "bThumbRY", { minIn: -1, maxIn: 1, minOut: 255, maxOut: 0 }),
            LT: new InputAxis_1.InputAxis(this, "bTriggerL", { minIn: 0, maxIn: 1, minOut: 0, maxOut: 255 }),
            RT: new InputAxis_1.InputAxis(this, "bTriggerR", { minIn: 0, maxIn: 1, minOut: 0, maxOut: 255 }),
        });
        this.dpad = new InputDpad_1.InputDpad(this);
    }
    get DPAD() {
        return this.dpad;
    }
    alloc() {
        return Client_1.vigemclient.vigem_target_ds4_alloc();
    }
    connect(opts = {}) {
        let err = super.connect(opts);
        if (!err) {
            Client_1.vigemclient.vigem_target_ds4_register_notification(this.client.handle, this.target, (data) => {
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
    update() {
        this.checkConnection();
        return Utils_1.handlePossibleError(Client_1.vigemclient.vigem_target_ds4_update(this.client.handle, this.target, this.report.freeze()));
    }
}
exports.DS4Controller = DS4Controller;
function colorsEqual(c1, c2) {
    return `${c1.Red}${c1.Green}${c1.Blue}` == `${c2.Red}${c2.Green}${c2.Blue}`;
}
//# sourceMappingURL=DS4Controller.js.map