"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X360Controller = void 0;
const Client_1 = require("./Client");
const ViGEmTarget_1 = require("./ViGEmTarget");
const Common_1 = require("./Common");
const InputButton_1 = require("./InputButton");
const InputAxis_1 = require("./InputAxis");
const X360ControllerReport_1 = require("./X360ControllerReport");
const X360Notification_1 = require("../Common/X360Notification");
const InputDpad_1 = require("./InputDpad");
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
        this.button = Object.freeze(Object.fromEntries(Object.keys(Common_1.XUSB_BUTTON).map((button) => [button, new InputButton_1.InputButton(this, button)])));
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
                if (data.LargeMotor != this.notification.LargeMotor) {
                    this.emit("large motor", data.LargeMotor);
                }
                if (data.SmallMotor != this.notification.SmallMotor) {
                    this.emit("small motor", data.SmallMotor);
                }
                if (data.LargeMotor != this.notification.LargeMotor || data.SmallMotor != this.notification.SmallMotor) {
                    this.emit("vibration", { large: data.LargeMotor, small: data.SmallMotor });
                }
                if (data.LedNumber != this.notification.LedNumber) {
                    this.emit("led change", data.LedNumber);
                }
                this.notification.set(data);
                this.emit("notification", data);
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
        return Common_1.handlePossibleError(Client_1.vigemclient.vigem_target_x360_update(this.client.handle, this.target, this.report.freeze()));
    }
}
exports.X360Controller = X360Controller;
//# sourceMappingURL=X360Controller.js.map