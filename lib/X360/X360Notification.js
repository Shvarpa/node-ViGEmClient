"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X360Notification = void 0;
class X360Notification {
    constructor() {
        this.LargeMotor = undefined;
        this.SmallMotor = undefined;
        this.LedNumber = undefined;
    }
    freeze() {
        return Object.freeze({
            LargeMotor: this.LargeMotor,
            SmallMotor: this.SmallMotor,
            LedNumber: this.LedNumber,
        });
    }
    set(data) {
        this.LargeMotor = data.LargeMotor;
        this.SmallMotor = data.SmallMotor;
        this.LedNumber = data.LedNumber;
    }
}
exports.X360Notification = X360Notification;
//# sourceMappingURL=X360Notification.js.map