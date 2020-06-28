export as namespace ViGEm;

export { Axis, DS4Axis, DS4Buttons, DS4Dpad, DS4Special, VIGEMErrorCodes, VIGEMErrors, X360Axis, X360Buttons, X360Dpad } from "./src/ts/Utils";
export { X360Controller } from "./src/X360/X360Controller";
export { X360ControllerReport } from "./src/X360/X360ControllerReport";
export { X360Notification } from "./src/X360/X360Notification";
export { DS4Controller } from "./src/DS4/DS4Controller";
export { DS4ControllerReport } from "./src/DS4/DS4ControllerReport";
export { DS4Lightbar, DS4Notification } from "./src/DS4/DS4Notification";
export { InputAxis } from "./src/Inputs/InputAxis";
export { InputButton } from "./src/Inputs/InputButton";
export { InputDpad } from "./src/Inputs/InputDpad";
export { ConnectOpts, Controller, ControllerType, ProductID, VendorID } from "./src/Common/Controller";
export { Byte, Four, Nibble, Nine } from "./src/Common/Numbers";
export { Report } from "./src/Common/Report";
export { ViGEmClient } from "./src/ts/ViGEmClient";
export { ViGEmTarget } from "./src/ts/ViGEmTarget";
