System.register(["./Common", "./X360Controller", "./DS4Controller"], function (exports_1, context_1) {
    "use strict";
    var vigemclient, Common_1, X360Controller_1, DS4Controller_1, ViGEmClient;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Common_1_1) {
                Common_1 = Common_1_1;
            },
            function (X360Controller_1_1) {
                X360Controller_1 = X360Controller_1_1;
            },
            function (DS4Controller_1_1) {
                DS4Controller_1 = DS4Controller_1_1;
            }
        ],
        execute: function () {
            vigemclient = require("../build/Release/vigemclient");
            ViGEmClient = class ViGEmClient {
                constructor() {
                    this.connected = false;
                }
                get handle() {
                    return this._handle;
                }
                connect() {
                    this._handle = vigemclient.vigem_alloc();
                    let error = Common_1.handlePossibleError(vigemclient.vigem_connect(this._handle));
                    this.connected = !error;
                    return error;
                }
                createX360Controller() {
                    if (!this.connected)
                        throw new Error("Not connected");
                    return new X360Controller_1.X360Controller(this);
                }
                createDS4Controller() {
                    if (!this.connected)
                        throw new Error("Not connected");
                    return new DS4Controller_1.DS4Controller(this);
                }
            };
            exports_1("ViGEmClient", ViGEmClient);
        }
    };
});
//# sourceMappingURL=ViGEmClient.js.map