import { Nibble, Nine } from "../Types/Numbers";

export type X360Dpad = "DPAD" | "DPAD_UP" | "DPAD_DOWN" | "DPAD_LEFT" | "DPAD_RIGHT";
export type X360Buttons = X360Dpad | "START" | "BACK" | "LEFT_THUMB" | "RIGHT_THUMB" | "LEFT_SHOULDER" | "RIGHT_SHOULDER" | "GUIDE" | "A" | "B" | "X" | "Y";
export type X360Axis = "bLeftTrigger" | "bRightTrigger" | "sThumbLX" | "sThumbLY" | "sThumbRX" | "sThumbRY";

export const XUSB_BUTTON = Object.freeze({
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

export type DS4Buttons = "THUMB_RIGHT" | "THUMB_LEFT" | "OPTIONS" | "SHARE" | "TRIGGER_RIGHT" | "TRIGGER_LEFT" | "SHOULDER_RIGHT" | "SHOULDER_LEFT" | "TRIANGLE" | "CIRCLE" | "CROSS" | "SQUARE";
export type DS4Special = "SPECIAL_PS" | "SPECIAL_TOUCHPAD";
export type DS4Axis = "wButtons" | "bThumbLX" | "bThumbLY" | "bThumbRX" | "bThumbRY" | "bTriggerL" | "bTriggerR" | "bSpecial";
export type DS4Dpad = "DPAD" | "DPAD_NONE" | "DPAD_NORTHWEST" | "DPAD_WEST" | "DPAD_SOUTHWEST" | "DPAD_SOUTH" | "DPAD_SOUTHEAST" | "DPAD_EAST" | "DPAD_NORTHEAST" | "DPAD_NORTH";

export const isX360Dpad = (name: string): name is X360Dpad => name.startsWith("DPAD");
export const isDS4Dpad = (name: string): name is DS4Dpad => name.startsWith("DPAD");
export const isSpecial = (name: string): name is DS4Special => name.startsWith("SPECIAL");

export const DS4_BUTTONS = Object.freeze({
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

export const DS4_SPECIAL_BUTTONS = Object.freeze({
	SPECIAL_PS: 1 << 0,
	SPECIAL_TOUCHPAD: 1 << 1,
});

export const DS4_DPAD_DIRECTIONS = Object.freeze({
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

export const DS4_DPAD_VALUES = Object.fromEntries(Object.entries(DS4_DPAD_DIRECTIONS).map(([k, v]) => [v, k])) as { [key: number]: DS4Dpad };

export const DS4_DPAD_FIX: { [state in Nibble]: Nine } = [8, 0, 4, 8, 6, 7, 5, 6, 2, 1, 3, 2, 8, 0, 4, 8];
// export const REVERSE_DS4_DPAD_FIX = Object.fromEntries(Object.entries(DS4_DPAD_FIX).map(([k, v]) => [v, k])) as { [state in Nine]?: Nibble };
export const REVERSE_DS4_DPAD_FIX: { [state in Nine]: Nibble } = [1, 9, 8, 10, 2, 6, 4, 5, 0];

// export const DS4_DPAD_NAME = ([x, y]: [number, number], threshold: number = 0.5): DS4Dpad => {
// 	const horz = x < -1 * threshold ? "WEST" : x > threshold ? "EAST" : "";
// 	const vert = y < -1 * threshold ? "SOUTH" : y > threshold ? "NORTH" : "";
// 	return `DPAD_${horz == "" && vert == "" ? "NONE" : vert + horz}` as DS4Dpad;
// };

export const DPAD_VALUE: { [state in Nibble]: Axis } = [
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

// export const DS4_DPAD_VALUE = (name: DS4Dpad): [number, number] => {
// 	const x = name.includes("WEST") ? -1 : name.includes("EAST") ? 1 : 0;
// 	const y = name.includes("SOUTH") ? -1 : name.includes("NORTH") ? 1 : 0;
// 	return name.includes("NONE") ? [0, 0] : [x, y];
// };

export type VIGEMErrors =
	| "VIGEM_ERROR_NONE"
	| "VIGEM_ERROR_BUS_NOT_FOUND"
	| "VIGEM_ERROR_NO_FREE_SLOT"
	| "VIGEM_ERROR_INVALID_TARGET"
	| "VIGEM_ERROR_REMOVAL_FAILED"
	| "VIGEM_ERROR_ALREADY_CONNECTED"
	| "VIGEM_ERROR_TARGET_UNINITIALIZED"
	| "VIGEM_ERROR_TARGET_NOT_PLUGGED_IN"
	| "VIGEM_ERROR_BUS_VERSION_MISMATCH"
	| "VIGEM_ERROR_BUS_ACCESS_FAILED"
	| "VIGEM_ERROR_CALLBACK_ALREADY_REGISTERED"
	| "VIGEM_ERROR_CALLBACK_NOT_FOUND"
	| "VIGEM_ERROR_BUS_ALREADY_CONNECTED"
	| "VIGEM_ERROR_BUS_INVALID_HANDLE"
	| "VIGEM_ERROR_XUSB_USERINDEX_OUT_OF_RANGE";

export type VIGEMErrorCodes =
	| 0x20000000
	| 0xe0000001
	| 0xe0000002
	| 0xe0000003
	| 0xe0000004
	| 0xe0000005
	| 0xe0000006
	| 0xe0000007
	| 0xe0000008
	| 0xe0000009
	| 0xe0000010
	| 0xe0000011
	| 0xe0000012
	| 0xe0000013
	| 0xe0000014;

export const VIGEM_ERRORS = Object.freeze({
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

export const handlePossibleError = (error: VIGEMErrorCodes) => (VIGEM_ERRORS[error] != "VIGEM_ERROR_NONE" ? new Error(VIGEM_ERRORS[error]) : undefined);

export const press = (buttons: number, location: number): number => (buttons |= location);
export const unpress = (buttons: number, location: number): number => (buttons &= ~location);
export const ispressed = (buttons: number, location: number): boolean => (buttons & location) > 0;
export const set = (buttons: number, location: number, value: boolean) => (value ? press : unpress)(buttons, location);

export type Axis = [number, number];
export const axisToDpad = ([x, y]: Axis, threshold = 0.5) => (y >= threshold ? 1 : y <= -1 * threshold ? 2 : 0) | (x >= threshold ? 8 : x <= -1 * threshold ? 4 : 0);
