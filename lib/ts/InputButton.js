System.register([], function (exports_1, context_1) {
    "use strict";
    var InputButton;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            InputButton = class InputButton {
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
            };
            exports_1("InputButton", InputButton);
        }
    };
});
//# sourceMappingURL=InputButton.js.map