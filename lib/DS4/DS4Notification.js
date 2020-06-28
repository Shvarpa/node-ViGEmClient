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
        this.LightbarColor = {};
    }
    freeze() {
        return Object.freeze({
            LargeMotor: this.LargeMotor,
            SmallMotor: this.SmallMotor,
            LightbarColor: {
                Red: this.LightbarColor.Red,
                Green: this.LightbarColor.Green,
                Blue: this.LightbarColor.Blue,
            },
        });
    }
    set(data) {
        this.LargeMotor = data.LargeMotor;
        this.SmallMotor = data.SmallMotor;
        this.LightbarColor = {
            Red: data.LightbarColor.Red,
            Green: data.LightbarColor.Green,
            Blue: data.LightbarColor.Blue,
        };
    }
}
exports.DS4Notification = DS4Notification;
//# sourceMappingURL=DS4Notification.js.map