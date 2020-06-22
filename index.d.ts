import vigemclient from "./src/ts/Client";

export as namespace ViGEm;

export { Axis, DS4Axis, DS4Buttons, DS4Dpad, DS4Special, VIGEMErrorCodes, VIGEMErrors, X360Axis, X360Buttons, X360Dpad } from "./src/ts/Common";
export { DS4Controller } from "./src/ts/DS4Controller";
export { DS4ControllerReport } from "./src/ts/DS4ControllerReport";
export { InputAxis } from "./src/ts/InputAxis";
export { InputButton } from "./src/ts/InputButton";
export { ConnectOpts, Controller, ControllerType, ProductID, VendorID } from "./src/Common/Controller";
export { DS4Lightbar, DS4Notification } from "./src/Common/DS4Notification";
export { Byte, Four, Nibble, Nine } from "./src/Common/Numbers";
export { Report } from "./src/Common/Report";
export { X360Notification } from "./src/Common/X360Notification";
export { ViGEmClient } from "./src/ts/ViGEmClient";
export { ViGEmTarget } from "./src/ts/ViGEmTarget";
export { X360Controller } from "./src/ts/X360Controller";
export { X360ControllerReport } from "./src/ts/X360ControllerReport";
export default ViGEmClient;