"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DS4ControllerReport = void 0;
const Utils_1 = require("../ts/Utils");
class DS4ControllerReport {
    constructor() {
        this.wButtons = 0;
        this.bThumbLX = 0;
        this.bThumbLY = 0;
        this.bThumbRX = 0;
        this.bThumbRY = 0;
        this.bTriggerL = 0;
        this.bTriggerR = 0;
        this.bSpecial = 0;
    }
    updateButton(name, value) {
        if (Utils_1.isSpecial(name))
            this.updateDS4Special(name, value);
        else
            this.updateDS4Buttons(name, value);
    }
    setButtons(value) {
        this.wButtons = value;
    }
    updateDS4Buttons(name, value) {
        this.wButtons = Utils_1.set(this.wButtons, Utils_1.DS4_BUTTONS[name], value);
    }
    updateDS4Special(name, value) {
        this.bSpecial = Utils_1.set(this.bSpecial, Utils_1.DS4_SPECIAL_BUTTONS[name], value);
    }
    updateAxis(name, value) {
        this[name] = value;
    }
    updateDpad(value) {
        let state = typeof value == "number" ? value : Utils_1.axisToDpad(value);
        this.wButtons &= ~0xf; // reset dpad
        this.wButtons |= Utils_1.DS4_DPAD_FIX[state];
    }
    getButtonValue(name) {
        if (Utils_1.isSpecial(name))
            return Utils_1.ispressed(this.bSpecial, Utils_1.DS4_SPECIAL_BUTTONS[name]);
        else if (Utils_1.isDS4Dpad(name))
            return Utils_1.DS4_DPAD_VALUES[this.wButtons & 0xf] == name;
        else
            return Utils_1.ispressed(this.wButtons, Utils_1.DS4_BUTTONS[name]);
    }
    getAxisValue(name) {
        return this[name];
    }
    getDpadValue() {
        return Utils_1.REVERSE_DS4_DPAD_FIX[this.wButtons & 0xf];
    }
    freeze() {
        return Object.freeze({
            wButtons: this.wButtons,
            bThumbLX: this.bThumbLX,
            bThumbLY: this.bThumbLY,
            bThumbRX: this.bThumbRX,
            bThumbRY: this.bThumbRY,
            bTriggerL: this.bTriggerL,
            bTriggerR: this.bTriggerR,
            bSpecial: this.bSpecial,
        });
    }
}
exports.DS4ControllerReport = DS4ControllerReport;
//# sourceMappingURL=DS4ControllerReport.js.map