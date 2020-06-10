import { X360Buttons, X360Axis, Axis } from "./Common";
import { Report } from "./Types/Report";
import { Nibble } from "./Types/Numbers";
export declare class X360ControllerReport implements Report {
    wButtons: number;
    bLeftTrigger: number;
    bRightTrigger: number;
    sThumbLX: number;
    sThumbLY: number;
    sThumbRX: number;
    sThumbRY: number;
    updateButton(name: X360Buttons, value: boolean | Nibble | Axis): void;
    setButtons(value: number): void;
    setDpad(value: Nibble | Axis): void;
    updateAxis(name: X360Axis, value: number): void;
    getButtonValue(name: X360Buttons): boolean | Axis;
    getAxisValue(name: X360Axis): number;
    freeze(): Readonly<{
        wButtons: number;
        bLeftTrigger: number;
        bRightTrigger: number;
        sThumbLX: number;
        sThumbLY: number;
        sThumbRX: number;
        sThumbRY: number;
    }>;
}
