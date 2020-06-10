import { DS4Axis, DS4Buttons, DS4Dpad, DS4Special, Axis } from "./Common";
import { Report } from "./Types/Report";
import { Nibble } from "./Types/Numbers";
export declare class DS4ControllerReport implements Report {
    wButtons: number;
    bThumbLX: number;
    bThumbLY: number;
    bThumbRX: number;
    bThumbRY: number;
    bTriggerL: number;
    bTriggerR: number;
    bSpecial: number;
    updateButton(name: DS4Buttons | DS4Special | DS4Dpad, value: boolean | Nibble | Axis): void;
    setButtons(value: number): void;
    private updateDS4Buttons;
    private updateDS4Special;
    private setDpad;
    private getDpadState;
    updateAxis(name: DS4Axis, value: number): void;
    getButtonValue(name: DS4Buttons | DS4Special | DS4Dpad): boolean | Axis;
    getAxisValue(name: DS4Axis): number;
    freeze(): Readonly<{
        wButtons: number;
        bThumbLX: number;
        bThumbLY: number;
        bThumbRX: number;
        bThumbRY: number;
        bTriggerL: number;
        bTriggerR: number;
        bSpecial: number;
    }>;
}
