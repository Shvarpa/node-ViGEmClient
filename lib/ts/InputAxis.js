System.register([], function (exports_1, context_1) {
    "use strict";
    var InputAxis;
    var __moduleName = context_1 && context_1.id;
    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }
    function rangeMap(value, spec) {
        let inRange = spec.maxIn - spec.minIn;
        let outRange = spec.maxOut - spec.minOut;
        return spec.minOut + outRange * ((value - spec.minIn) / inRange);
    }
    return {
        setters: [],
        execute: function () {
            InputAxis = class InputAxis {
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
            };
            exports_1("InputAxis", InputAxis);
        }
    };
});
//# sourceMappingURL=InputAxis.js.map