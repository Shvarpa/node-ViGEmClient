"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X360ControllerReport = void 0;
const Common_1 = require("./Common");
class X360ControllerReport {
    constructor() {
        this.wButtons = 0;
        this.bLeftTrigger = 0;
        this.bRightTrigger = 0;
        this.sThumbLX = 0;
        this.sThumbLY = 0;
        this.sThumbRX = 0;
        this.sThumbRY = 0;
    }
    updateButton(name, value) {
        if (typeof value == "boolean") {
            this.wButtons = Common_1.set(this.wButtons, Common_1.XUSB_BUTTON[name], value);
        }
    }
    setButtons(value) {
        this.wButtons = value;
    }
    updateAxis(name, value) {
        this[name] = value;
    }
    updateDpad(value) {
        let state = typeof value == "number" ? value : Common_1.axisToDpad(value);
        this.wButtons &= ~0xf; // reset dpad
        this.wButtons |= state;
    }
    getButtonValue(name) {
        return Common_1.ispressed(this.wButtons, Common_1.XUSB_BUTTON[name]);
    }
    getAxisValue(name) {
        return this[name];
    }
    getDpadValue() {
        return (this.wButtons & 0xf);
    }
    freeze() {
        return Object.freeze({
            wButtons: this.wButtons,
            bLeftTrigger: this.bLeftTrigger,
            bRightTrigger: this.bRightTrigger,
            sThumbLX: this.sThumbLX,
            sThumbLY: this.sThumbLY,
            sThumbRX: this.sThumbRX,
            sThumbRY: this.sThumbRY,
        });
    }
}
exports.X360ControllerReport = X360ControllerReport;
//# sourceMappingURL=X360ControllerReport.js.map