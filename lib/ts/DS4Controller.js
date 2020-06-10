System.register(["./ViGEmTarget", "./common", "./InputButton", "./InputAxis", "./DS4ControllerReport", "./Types/DS4Notification"], function (exports_1, context_1) {
    "use strict";
    var vigemclient, ViGEmTarget_1, common_1, InputButton_1, InputAxis_1, DS4ControllerReport_1, DS4Notification_1, DS4Controller;
    var __moduleName = context_1 && context_1.id;
    function colorsEqual(c1, c2) {
        return `${c1.Red}${c1.Green}${c1.Blue}` == `${c2.Red}${c2.Green}${c2.Blue}`;
    }
    return {
        setters: [
            function (ViGEmTarget_1_1) {
                ViGEmTarget_1 = ViGEmTarget_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (InputButton_1_1) {
                InputButton_1 = InputButton_1_1;
            },
            function (InputAxis_1_1) {
                InputAxis_1 = InputAxis_1_1;
            },
            function (DS4ControllerReport_1_1) {
                DS4ControllerReport_1 = DS4ControllerReport_1_1;
            },
            function (DS4Notification_1_1) {
                DS4Notification_1 = DS4Notification_1_1;
            }
        ],
        execute: function () {
            vigemclient = require("../build/Release/vigemclient");
            DS4Controller = class DS4Controller extends ViGEmTarget_1.ViGEmTarget {
                constructor(client) {
                    super(client);
                    this.notification = new DS4Notification_1.DS4Notification();
                    this.report = new DS4ControllerReport_1.DS4ControllerReport();
                    this.button = Object.freeze(Object.fromEntries(Object.keys(common_1.DS4_BUTTONS)
                        .concat(Object.keys(common_1.DS4_SPECIAL_BUTTONS))
                        .concat("DPAD")
                        .map((button) => [button, new InputButton_1.InputButton(this, button)])));
                    this.axis = Object.freeze({
                        LX: new InputAxis_1.InputAxis(this, "bThumbLX", { minIn: -1, maxIn: 1, minOut: 0, maxOut: 255 }),
                        LY: new InputAxis_1.InputAxis(this, "bThumbLY", { minIn: -1, maxIn: 1, minOut: 255, maxOut: 0 }),
                        RX: new InputAxis_1.InputAxis(this, "bThumbRX", { minIn: -1, maxIn: 1, minOut: 0, maxOut: 255 }),
                        RY: new InputAxis_1.InputAxis(this, "bThumbRY", { minIn: -1, maxIn: 1, minOut: 255, maxOut: 0 }),
                        LT: new InputAxis_1.InputAxis(this, "bTriggerL", { minIn: 0, maxIn: 1, minOut: 0, maxOut: 255 }),
                        RT: new InputAxis_1.InputAxis(this, "bTriggerR", { minIn: 0, maxIn: 1, minOut: 0, maxOut: 255 }),
                    });
                }
                alloc() {
                    return vigemclient.vigem_target_ds4_alloc();
                }
                connect(opts = {}) {
                    let err = super.connect(opts);
                    if (!err) {
                        vigemclient.vigem_target_ds4_register_notification(this.client.handle, this.target, (data) => {
                            if (data.LargeMotor != this.notification.LargeMotor) {
                                this.emit("large motor", data.LargeMotor);
                            }
                            if (data.SmallMotor != this.notification.SmallMotor) {
                                this.emit("small motor", data.SmallMotor);
                            }
                            if (data.LargeMotor != this.notification.LargeMotor || data.SmallMotor != this.notification.SmallMotor) {
                                this.emit("vibration", { large: data.LargeMotor, small: data.SmallMotor });
                            }
                            if (!colorsEqual(data.LightbarColor, this.notification.LightbarColor)) {
                                this.emit("color change", data.LightbarColor);
                            }
                            this.notification = data;
                            this.emit("notification", data);
                        });
                    }
                    return err;
                }
                update() {
                    this.checkConnection();
                    let client = this.client.handle;
                    let error = common_1.handlePossibleError(vigemclient.vigem_target_ds4_update(client, this.target, this.report.freeze()));
                    return error;
                }
            };
            exports_1("DS4Controller", DS4Controller);
        }
    };
});
//# sourceMappingURL=DS4Controller.js.map