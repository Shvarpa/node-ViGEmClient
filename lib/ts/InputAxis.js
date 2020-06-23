"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputAxis = void 0;
class InputAxis {
    constructor(_parent, _name, _spec) {
        this._parent = _parent;
        this._name = _name;
        this._spec = _spec;
    }
    get name() {
        return this._name;
    }
    get parent() {
        return this._parent;
    }
    get value() {
        return this._parent.report.getAxisValue(this.name);
    }
    get minValue() {
        return this._spec.minIn;
    }
    get maxValue() {
        return this._spec.maxIn;
    }
    setValue(value) {
        value = clamp(value, this.minValue, this.maxValue);
        value = rangeMap(value, this._spec);
        this.parent.report.updateAxis(this.name, value);
    }
}
exports.InputAxis = InputAxis;
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
function rangeMap(value, spec) {
    let inRange = spec.maxIn - spec.minIn;
    let outRange = spec.maxOut - spec.minOut;
    return spec.minOut + outRange * ((value - spec.minIn) / inRange);
}
//# sourceMappingURL=InputAxis.js.map