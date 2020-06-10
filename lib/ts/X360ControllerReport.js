System.register(["./Common"], function (exports_1, context_1) {
    "use strict";
    var Common_1, X360ControllerReport;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Common_1_1) {
                Common_1 = Common_1_1;
            }
        ],
        execute: function () {
            X360ControllerReport = class X360ControllerReport {
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
                    if (name == "DPAD") {
                        if (typeof value != "boolean")
                            this.setDpad(value);
                    }
                    else if (typeof value == "boolean") {
                        this.wButtons = Common_1.set(this.wButtons, Common_1.XUSB_BUTTON[name], value);
                    }
                }
                setButtons(value) {
                    this.wButtons = value;
                }
                setDpad(value) {
                    let state = typeof value == "number" ? value : Common_1.axisToDpad(value);
                    this.wButtons &= ~0xf; // reset dpad
                    this.wButtons |= state;
                }
                updateAxis(name, value) {
                    this[name] = value;
                }
                getButtonValue(name) {
                    if (name == "DPAD")
                        return Common_1.DPAD_VALUE[(this.wButtons & 0xf)];
                    else
                        return Common_1.ispressed(this.wButtons, Common_1.XUSB_BUTTON[name]);
                }
                getAxisValue(name) {
                    return this[name];
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
            };
            exports_1("X360ControllerReport", X360ControllerReport);
        }
    };
});
//# sourceMappingURL=X360ControllerReport.js.map