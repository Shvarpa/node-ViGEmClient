"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputDpad = void 0;
class InputDpad {
    constructor(_parent) {
        this._parent = _parent;
    }
    get parent() {
        return this._parent;
    }
    get value() {
        return this._parent.report.getDpadValue();
    }
    setValue(value) {
        this.parent.report.updateDpad(value);
    }
}
exports.InputDpad = InputDpad;
//# sourceMappingURL=InputDpad.js.map