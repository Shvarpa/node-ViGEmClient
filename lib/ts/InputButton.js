"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputButton = void 0;
class InputButton {
    constructor(_parent, _name) {
        this._parent = _parent;
        this._name = _name;
    }
    get name() {
        return this._name;
    }
    get parent() {
        return this._parent;
    }
    get value() {
        return this._parent.report.getButtonValue(this.name);
    }
    setValue(value) {
        this.parent.report.updateButton(this.name, value);
    }
}
exports.InputButton = InputButton;
//# sourceMappingURL=InputButton.js.map