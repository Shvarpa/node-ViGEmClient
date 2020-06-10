import { Nibble, Nine } from "./Types/Numbers";
export declare type X360Dpad = "DPAD" | "DPAD_UP" | "DPAD_DOWN" | "DPAD_LEFT" | "DPAD_RIGHT";
export declare type X360Buttons = X360Dpad | "START" | "BACK" | "LEFT_THUMB" | "RIGHT_THUMB" | "LEFT_SHOULDER" | "RIGHT_SHOULDER" | "GUIDE" | "A" | "B" | "X" | "Y";
export declare type X360Axis = "bLeftTrigger" | "bRightTrigger" | "sThumbLX" | "sThumbLY" | "sThumbRX" | "sThumbRY";
export declare const XUSB_BUTTON: Readonly<{
    DPAD_UP: number;
    DPAD_DOWN: number;
    DPAD_LEFT: number;
    DPAD_RIGHT: number;
    START: number;
    BACK: number;
    LEFT_THUMB: number;
    RIGHT_THUMB: number;
    LEFT_SHOULDER: number;
    RIGHT_SHOULDER: number;
    GUIDE: number;
    A: number;
    B: number;
    X: number;
    Y: number;
}>;
export declare type DS4Buttons = "THUMB_RIGHT" | "THUMB_LEFT" | "OPTIONS" | "SHARE" | "TRIGGER_RIGHT" | "TRIGGER_LEFT" | "SHOULDER_RIGHT" | "SHOULDER_LEFT" | "TRIANGLE" | "CIRCLE" | "CROSS" | "SQUARE";
export declare type DS4Special = "SPECIAL_PS" | "SPECIAL_TOUCHPAD";
export declare type DS4Axis = "wButtons" | "bThumbLX" | "bThumbLY" | "bThumbRX" | "bThumbRY" | "bTriggerL" | "bTriggerR" | "bSpecial";
export declare type DS4Dpad = "DPAD" | "DPAD_NONE" | "DPAD_NORTHWEST" | "DPAD_WEST" | "DPAD_SOUTHWEST" | "DPAD_SOUTH" | "DPAD_SOUTHEAST" | "DPAD_EAST" | "DPAD_NORTHEAST" | "DPAD_NORTH";
export declare const isX360Dpad: (name: string) => name is X360Dpad;
export declare const isDS4Dpad: (name: string) => name is DS4Dpad;
export declare const isSpecial: (name: string) => name is DS4Special;
export declare const DS4_BUTTONS: Readonly<{
    THUMB_RIGHT: number;
    THUMB_LEFT: number;
    OPTIONS: number;
    SHARE: number;
    TRIGGER_RIGHT: number;
    TRIGGER_LEFT: number;
    SHOULDER_RIGHT: number;
    SHOULDER_LEFT: number;
    TRIANGLE: number;
    CIRCLE: number;
    CROSS: number;
    SQUARE: number;
}>;
export declare const DS4_SPECIAL_BUTTONS: Readonly<{
    SPECIAL_PS: number;
    SPECIAL_TOUCHPAD: number;
}>;
export declare const DS4_DPAD_DIRECTIONS: Readonly<{
    DPAD_NONE: number;
    DPAD_NORTHWEST: number;
    DPAD_WEST: number;
    DPAD_SOUTHWEST: number;
    DPAD_SOUTH: number;
    DPAD_SOUTHEAST: number;
    DPAD_EAST: number;
    DPAD_NORTHEAST: number;
    DPAD_NORTH: number;
}>;
export declare const DS4_DPAD_VALUES: {
    [key: number]: DS4Dpad;
};
export declare const DS4_DPAD_FIX: {
    [state in Nibble]: Nine;
};
export declare const REVERSE_DS4_DPAD_FIX: {
    [state in Nine]: Nibble;
};
export declare const DPAD_VALUE: {
    [state in Nibble]: Axis;
};
export declare type VIGEMErrors = "VIGEM_ERROR_NONE" | "VIGEM_ERROR_BUS_NOT_FOUND" | "VIGEM_ERROR_NO_FREE_SLOT" | "VIGEM_ERROR_INVALID_TARGET" | "VIGEM_ERROR_REMOVAL_FAILED" | "VIGEM_ERROR_ALREADY_CONNECTED" | "VIGEM_ERROR_TARGET_UNINITIALIZED" | "VIGEM_ERROR_TARGET_NOT_PLUGGED_IN" | "VIGEM_ERROR_BUS_VERSION_MISMATCH" | "VIGEM_ERROR_BUS_ACCESS_FAILED" | "VIGEM_ERROR_CALLBACK_ALREADY_REGISTERED" | "VIGEM_ERROR_CALLBACK_NOT_FOUND" | "VIGEM_ERROR_BUS_ALREADY_CONNECTED" | "VIGEM_ERROR_BUS_INVALID_HANDLE" | "VIGEM_ERROR_XUSB_USERINDEX_OUT_OF_RANGE";
export declare type VIGEMErrorCodes = 0x20000000 | 0xe0000001 | 0xe0000002 | 0xe0000003 | 0xe0000004 | 0xe0000005 | 0xe0000006 | 0xe0000007 | 0xe0000008 | 0xe0000009 | 0xe0000010 | 0xe0000011 | 0xe0000012 | 0xe0000013 | 0xe0000014;
export declare const VIGEM_ERRORS: Readonly<{
    536870912: string;
    3758096385: string;
    3758096386: string;
    3758096387: string;
    3758096388: string;
    3758096389: string;
    3758096390: string;
    3758096391: string;
    3758096392: string;
    3758096393: string;
    3758096400: string;
    3758096401: string;
    3758096402: string;
    3758096403: string;
    3758096404: string;
}>;
export declare const handlePossibleError: (error: VIGEMErrorCodes) => Error;
export declare const press: (buttons: number, location: number) => number;
export declare const unpress: (buttons: number, location: number) => number;
export declare const ispressed: (buttons: number, location: number) => boolean;
export declare const set: (buttons: number, location: number, value: boolean) => number;
export declare type Axis = [number, number];
export declare const axisToDpad: ([x, y]: Axis, threshold?: number) => number;
