"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DS4Controller = void 0;
const Client_1 = require("./Client");
const ViGEmTarget_1 = require("./ViGEmTarget");
const Common_1 = require("./Common");
const InputButton_1 = require("./InputButton");
const InputAxis_1 = require("./InputAxis");
const DS4ControllerReport_1 = require("./DS4ControllerReport");
const DS4Notification_1 = require("../Types/DS4Notification");
class DS4Controller extends ViGEmTarget_1.ViGEmTarget {
    constructor(client) {
        super(client);
        this.notification = new DS4Notification_1.DS4Notification();
        this.report = new DS4ControllerReport_1.DS4ControllerReport();
        this.button = Object.freeze(Object.fromEntries(Object.keys(Common_1.DS4_BUTTONS)
            .concat(Object.keys(Common_1.DS4_SPECIAL_BUTTONS))
            .concat("DPAD")
            .map((button) => [button, new InputButton_1.InputButton(this, button)])));
        this.axis = Object.freeze({
            LX: new InputAxis_1.InputAxis(this, "bThumbLX", { minIn: -1, maxIn: 1, minOut: 0, maxOut: 255 }),
            LY: new InputAxis_1.InputAxis(this, "bThumbLY", { minIn: -1, maxIn: 1, minOut: 255, maxOut: 0 }),
            RX: new InputAxis_1.InputAxis(this, "bThumbRX", { minIn: -1, maxIn: 1, minOut: 0, maxOut: 255 }),
            RY: new InputAxis_1.InputAxis(this, "bThumbRY", { minIn: -1, maxIn: 1, minOut: 255, maxOut: 0 }),
            LT: new InputAxis_1.InputAxis(this, "bTriggerL", { minIn: 0, maxIn: 1, minOut: 0, maxOut: 255 }),
            RT: new InputAxis_1.InputAxis(this, "bTriggerR", { minIn: 0, maxIn: 1, minOut: 0, maxOut: 255 }),
        });
    }
    alloc() {
        return Client_1.vigemclient.vigem_target_ds4_alloc();
    }
    connect(opts = {}) {
        let err = super.connect(opts);
        if (!err) {
            Client_1.vigemclient.vigem_target_ds4_register_notification(this.client.handle, this.target, (data) => {
                if (data.LargeMotor != this.notification.LargeMotor) {
                    this.emit("large motor", data.LargeMotor);
                }
                if (data.SmallMotor != this.notification.SmallMotor) {
                    this.emit("small motor", data.SmallMotor);
                }
                if (data.LargeMotor != this.notification.LargeMotor || data.SmallMotor != this.notification.SmallMotor) {
                    this.emit("vibration", { large: data.LargeMotor, small: data.SmallMotor });
                }
                if (!colorsEqual(data.LightbarColor, this.notification.LightbarColor)) {
                    this.emit("color change", data.LightbarColor);
                }
                this.notification = data;
                this.emit("notification", data);
            });
        }
        return err;
    }
    update() {
        this.checkConnection();
        let client = this.client.handle;
        let error = Common_1.handlePossibleError(Client_1.vigemclient.vigem_target_ds4_update(client, this.target, this.report.freeze()));
        return error;
    }
}
exports.DS4Controller = DS4Controller;
function colorsEqual(c1, c2) {
    return `${c1.Red}${c1.Green}${c1.Blue}` == `${c2.Red}${c2.Green}${c2.Blue}`;
}
//# sourceMappingURL=DS4Controller.js.map