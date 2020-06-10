System.register([], function (exports_1, context_1) {
    "use strict";
    var DS4Lightbar, DS4Notification;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DS4Lightbar = class DS4Lightbar {
                constructor() {
                    this.Red = null;
                    this.Green = null;
                    this.Blue = null;
                }
            };
            exports_1("DS4Lightbar", DS4Lightbar);
            DS4Notification = class DS4Notification {
                constructor() {
                    this.LargeMotor = null;
                    this.SmallMotor = null;
                }
            };
            exports_1("DS4Notification", DS4Notification);
        }
    };
});
//# sourceMappingURL=DS4Notification.js.map