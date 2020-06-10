System.register(["./Common"], function (exports_1, context_1) {
    "use strict";
    var Common_1, DS4ControllerReport;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Common_1_1) {
                Common_1 = Common_1_1;
            }
        ],
        execute: function () {
            DS4ControllerReport = class DS4ControllerReport {
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
                    if (Common_1.isDS4Dpad(name) || typeof value != "boolean") {
                        if (typeof value != "boolean")
                            this.setDpad(value);
                    }
                    else {
                        if (Common_1.isSpecial(name))
                            this.updateDS4Special(name, value);
                        else
                            this.updateDS4Buttons(name, value);
                    }
                }
                setButtons(value) {
                    this.wButtons = value;
                }
                updateDS4Buttons(name, value) {
                    this.wButtons = Common_1.set(this.wButtons, Common_1.DS4_BUTTONS[name], value);
                }
                updateDS4Special(name, value) {
                    this.bSpecial = Common_1.set(this.bSpecial, Common_1.DS4_SPECIAL_BUTTONS[name], value);
                }
                setDpad(value) {
                    let state = typeof value == "number" ? value : Common_1.axisToDpad(value);
                    this.wButtons &= ~0xf; // reset dpad
                    this.wButtons |= Common_1.DS4_DPAD_FIX[state];
                }
                getDpadState() {
                    // console.log(this.wButtons & 0xf, DS4_DPAD_VALUES[this.wButtons & 0xf]);
                    return Common_1.REVERSE_DS4_DPAD_FIX[this.wButtons & 0xf];
                }
                updateAxis(name, value) {
                    this[name] = value;
                }
                getButtonValue(name) {
                    if (Common_1.isSpecial(name))
                        return Common_1.ispressed(this.bSpecial, Common_1.DS4_SPECIAL_BUTTONS[name]);
                    else if (Common_1.isDS4Dpad(name)) {
                        if (name == "DPAD")
                            return Common_1.DPAD_VALUE[this.getDpadState()];
                        else
                            return Common_1.DS4_DPAD_VALUES[this.wButtons & 0xf] == name;
                    }
                    else
                        return Common_1.ispressed(this.wButtons, Common_1.DS4_BUTTONS[name]);
                }
                getAxisValue(name) {
                    return this[name];
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
            };
            exports_1("DS4ControllerReport", DS4ControllerReport);
        }
    };
});
//# sourceMappingURL=DS4ControllerReport.js.map