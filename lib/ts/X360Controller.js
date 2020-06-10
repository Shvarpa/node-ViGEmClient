System.register(["./ViGEmTarget", "./Common", "./InputButton", "./InputAxis", "./X360ControllerReport", "./Types/X360Notification"], function (exports_1, context_1) {
    "use strict";
    var vigemclient, ViGEmTarget_1, Common_1, InputButton_1, InputAxis_1, X360ControllerReport_1, X360Notification_1, X360Controller;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ViGEmTarget_1_1) {
                ViGEmTarget_1 = ViGEmTarget_1_1;
            },
            function (Common_1_1) {
                Common_1 = Common_1_1;
            },
            function (InputButton_1_1) {
                InputButton_1 = InputButton_1_1;
            },
            function (InputAxis_1_1) {
                InputAxis_1 = InputAxis_1_1;
            },
            function (X360ControllerReport_1_1) {
                X360ControllerReport_1 = X360ControllerReport_1_1;
            },
            function (X360Notification_1_1) {
                X360Notification_1 = X360Notification_1_1;
            }
        ],
        execute: function () {
            vigemclient = require("../build/Release/vigemclient");
            X360Controller = class X360Controller extends ViGEmTarget_1.ViGEmTarget {
                constructor(client) {
                    super(client);
                    this.report = new X360ControllerReport_1.X360ControllerReport();
                    this.axis = Object.freeze({
                        LX: new InputAxis_1.InputAxis(this, "sThumbLX", { minIn: -1, maxIn: 1, minOut: -32768, maxOut: 32767 }),
                        LY: new InputAxis_1.InputAxis(this, "sThumbLY", { minIn: -1, maxIn: 1, minOut: -32768, maxOut: 32767 }),
                        RX: new InputAxis_1.InputAxis(this, "sThumbRX", { minIn: -1, maxIn: 1, minOut: -32768, maxOut: 32767 }),
                        RY: new InputAxis_1.InputAxis(this, "sThumbRY", { minIn: -1, maxIn: 1, minOut: -32768, maxOut: 32767 }),
                        LT: new InputAxis_1.InputAxis(this, "bLeftTrigger", { minIn: 0, maxIn: 1, minOut: 0, maxOut: 255 }),
                        RT: new InputAxis_1.InputAxis(this, "bRightTrigger", { minIn: 0, maxIn: 1, minOut: 0, maxOut: 255 }),
                    });
                    this.button = Object.freeze(Object.fromEntries(Object.keys(Common_1.XUSB_BUTTON)
                        .concat("DPAD")
                        .map((button) => [button, new InputButton_1.InputButton(this, button)])));
                    this.notification = new X360Notification_1.X360Notification();
                }
                get userIndex() {
                    this.checkConnection();
                    return vigemclient.vigem_target_x360_get_user_index(this.client.handle, this.target);
                }
                alloc() {
                    return vigemclient.vigem_target_x360_alloc();
                }
                connect(opts = {}) {
                    let err = super.connect(opts);
                    if (!err) {
                        vigemclient.vigem_target_x360_register_notification(this.client.handle, this.target, (data) => {
                            if (data.LargeMotor != this.notification.LargeMotor) {
                                this.emit("large motor", data.LargeMotor);
                            }
                            if (data.SmallMotor != this.notification.SmallMotor) {
                                this.emit("small motor", data.SmallMotor);
                            }
                            if (data.LargeMotor != this.notification.LargeMotor || data.SmallMotor != this.notification.SmallMotor) {
                                this.emit("vibration", { large: data.LargeMotor, small: data.SmallMotor });
                            }
                            if (data.LedNumber != this.notification.LedNumber) {
                                this.emit("led change", data.LedNumber);
                            }
                            this.notification = data;
                            this.emit("notification", data);
                        });
                    }
                    return err;
                }
                update() {
                    this.checkConnection();
                    return Common_1.handlePossibleError(vigemclient.vigem_target_x360_update(this.client.handle, this.target, this.report.freeze()));
                }
            };
            exports_1("X360Controller", X360Controller);
        }
    };
});
//# sourceMappingURL=X360Controller.js.map