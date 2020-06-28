"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.axisToDpad = exports.set = exports.ispressed = exports.unpress = exports.press = exports.handlePossibleError = exports.negate32Bit = exports.VIGEM_ERRORS = exports.DPAD_VALUE = exports.REVERSE_DS4_DPAD_FIX = exports.DS4_DPAD_FIX = exports.DS4_DPAD_VALUES = exports.DS4_DPAD_DIRECTIONS = exports.DS4_SPECIAL_BUTTONS = exports.DS4_BUTTONS = exports.isSpecial = exports.isDS4Dpad = exports.isX360Dpad = exports.XUSB_BUTTON = void 0;
exports.XUSB_BUTTON = Object.freeze({
    DPAD_UP: 0x0001,
    DPAD_DOWN: 0x0002,
    DPAD_LEFT: 0x0004,
    DPAD_RIGHT: 0x0008,
    START: 0x0010,
    BACK: 0x0020,
    LEFT_THUMB: 0x0040,
    RIGHT_THUMB: 0x0080,
    LEFT_SHOULDER: 0x0100,
    RIGHT_SHOULDER: 0x0200,
    GUIDE: 0x0400,
    A: 0x1000,
    B: 0x2000,
    X: 0x4000,
    Y: 0x8000,
});
exports.isX360Dpad = (name) => name.startsWith("DPAD");
exports.isDS4Dpad = (name) => name.startsWith("DPAD");
exports.isSpecial = (name) => name.startsWith("SPECIAL");
exports.DS4_BUTTONS = Object.freeze({
    THUMB_RIGHT: 1 << 15,
    THUMB_LEFT: 1 << 14,
    OPTIONS: 1 << 13,
    SHARE: 1 << 12,
    TRIGGER_RIGHT: 1 << 11,
    TRIGGER_LEFT: 1 << 10,
    SHOULDER_RIGHT: 1 << 9,
    SHOULDER_LEFT: 1 << 8,
    TRIANGLE: 1 << 7,
    CIRCLE: 1 << 6,
    CROSS: 1 << 5,
    SQUARE: 1 << 4,
});
exports.DS4_SPECIAL_BUTTONS = Object.freeze({
    SPECIAL_PS: 1 << 0,
    SPECIAL_TOUCHPAD: 1 << 1,
});
exports.DS4_DPAD_DIRECTIONS = Object.freeze({
    DPAD_NONE: 0x8,
    DPAD_NORTHWEST: 0x7,
    DPAD_WEST: 0x6,
    DPAD_SOUTHWEST: 0x5,
    DPAD_SOUTH: 0x4,
    DPAD_SOUTHEAST: 0x3,
    DPAD_EAST: 0x2,
    DPAD_NORTHEAST: 0x1,
    DPAD_NORTH: 0x0,
});
exports.DS4_DPAD_VALUES = Object.fromEntries(Object.entries(exports.DS4_DPAD_DIRECTIONS).map(([k, v]) => [v, k]));
exports.DS4_DPAD_FIX = [8, 0, 4, 8, 6, 7, 5, 6, 2, 1, 3, 2, 8, 0, 4, 8];
// export const REVERSE_DS4_DPAD_FIX = Object.fromEntries(Object.entries(DS4_DPAD_FIX).map(([k, v]) => [v, k])) as { [state in Nine]?: Nibble };
exports.REVERSE_DS4_DPAD_FIX = [1, 9, 8, 10, 2, 6, 4, 5, 0];
// export const DS4_DPAD_NAME = ([x, y]: [number, number], threshold: number = 0.5): DS4Dpad => {
// 	const horz = x < -1 * threshold ? "WEST" : x > threshold ? "EAST" : "";
// 	const vert = y < -1 * threshold ? "SOUTH" : y > threshold ? "NORTH" : "";
// 	return `DPAD_${horz == "" && vert == "" ? "NONE" : vert + horz}` as DS4Dpad;
// };
exports.DPAD_VALUE = [
    [0, 0],
    [0, 1],
    [0, -1],
    [0, 0],
    [-1, 0],
    [-1, 1],
    [-1, -1],
    [-1, 0],
    [1, 0],
    [1, 1],
    [1, -1],
    [1, 0],
    [0, 0],
    [0, 1],
    [0, -1],
    [0, 0],
];
exports.VIGEM_ERRORS = Object.freeze({
    0x20000000: "VIGEM_ERROR_NONE",
    0xe0000001: "VIGEM_ERROR_BUS_NOT_FOUND",
    0xe0000002: "VIGEM_ERROR_NO_FREE_SLOT",
    0xe0000003: "VIGEM_ERROR_INVALID_TARGET",
    0xe0000004: "VIGEM_ERROR_REMOVAL_FAILED",
    0xe0000005: "VIGEM_ERROR_ALREADY_CONNECTED",
    0xe0000006: "VIGEM_ERROR_TARGET_UNINITIALIZED",
    0xe0000007: "VIGEM_ERROR_TARGET_NOT_PLUGGED_IN",
    0xe0000008: "VIGEM_ERROR_BUS_VERSION_MISMATCH",
    0xe0000009: "VIGEM_ERROR_BUS_ACCESS_FAILED",
    0xe0000010: "VIGEM_ERROR_CALLBACK_ALREADY_REGISTERED",
    0xe0000011: "VIGEM_ERROR_CALLBACK_NOT_FOUND",
    0xe0000012: "VIGEM_ERROR_BUS_ALREADY_CONNECTED",
    0xe0000013: "VIGEM_ERROR_BUS_INVALID_HANDLE",
    0xe0000014: "VIGEM_ERROR_XUSB_USERINDEX_OUT_OF_RANGE",
});
exports.negate32Bit = (number) => Uint32Array.from([number])[0];
exports.handlePossibleError = (error) => {
    let code = exports.negate32Bit(error);
    return exports.VIGEM_ERRORS[code] != "VIGEM_ERROR_NONE" ? new Error(exports.VIGEM_ERRORS[code]) : undefined;
};
exports.press = (buttons, location) => (buttons |= location);
exports.unpress = (buttons, location) => (buttons &= ~location);
exports.ispressed = (buttons, location) => (buttons & location) > 0;
exports.set = (buttons, location, value) => (value ? exports.press : exports.unpress)(buttons, location);
exports.axisToDpad = ([x, y], threshold = 0.5) => (y >= threshold ? 1 : y <= -1 * threshold ? 2 : 0) | (x >= threshold ? 8 : x <= -1 * threshold ? 4 : 0);
//# sourceMappingURL=Utils.js.map