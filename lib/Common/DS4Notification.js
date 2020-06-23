"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DS4Notification = exports.DS4Lightbar = void 0;
class DS4Lightbar {
    constructor() {
        this.Red = null;
        this.Green = null;
        this.Blue = null;
    }
}
exports.DS4Lightbar = DS4Lightbar;
class DS4Notification {
    constructor() {
        this.LargeMotor = null;
        this.SmallMotor = null;
    }
    freeze() {
        return Object.freeze({
            LargeMotor: this.LargeMotor,
            SmallMotor: this.SmallMotor,
            LightbarColor: this.LightbarColor,
        });
    }
    set(data) {
        this.LargeMotor = data.LargeMotor;
        this.SmallMotor = data.SmallMotor;
        this.LightbarColor = data.LightbarColor;
    }
}
exports.DS4Notification = DS4Notification;
//# sourceMappingURL=DS4Notification.js.map