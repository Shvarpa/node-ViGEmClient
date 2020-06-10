import {
	DS4_BUTTONS,
	DS4_SPECIAL_BUTTONS,
	set,
	ispressed,
	DS4Axis,
	DS4Buttons,
	DS4Dpad,
	DS4Special,
	isSpecial,
	isDS4Dpad,
	DS4_DPAD_FIX,
	axisToDpad,
	Axis,
	REVERSE_DS4_DPAD_FIX,
	DPAD_VALUE,
	DS4_DPAD_VALUES,
} from "./Common";
import { Report } from "./Types/Report";
import { Nibble } from "./Types/Numbers";

export class DS4ControllerReport implements Report {
	wButtons: number = 0;
	bThumbLX: number = 0;
	bThumbLY: number = 0;
	bThumbRX: number = 0;
	bThumbRY: number = 0;
	bTriggerL: number = 0;
	bTriggerR: number = 0;
	bSpecial: number = 0;

	updateButton(name: DS4Buttons | DS4Special | DS4Dpad, value: boolean | Nibble | Axis) {
		if (isDS4Dpad(name) || typeof value != "boolean") {
			if (typeof value != "boolean") this.setDpad(value);
		} else {
			if (isSpecial(name)) this.updateDS4Special(name, value);
			else this.updateDS4Buttons(name, value);
		}
	}

	setButtons(value: number) {
		this.wButtons = value;
	}

	private updateDS4Buttons(name: DS4Buttons, value: boolean) {
		this.wButtons = set(this.wButtons, DS4_BUTTONS[name], value);
	}

	private updateDS4Special(name: DS4Special, value: boolean) {
		this.bSpecial = set(this.bSpecial, DS4_SPECIAL_BUTTONS[name], value);
	}

	private setDpad(value: Nibble | Axis) {
		let state = typeof value == "number" ? value : axisToDpad(value);
		this.wButtons &= ~0xf; // reset dpad
		this.wButtons |= DS4_DPAD_FIX[state];
	}

	private getDpadState(): Nibble {
		// console.log(this.wButtons & 0xf, DS4_DPAD_VALUES[this.wButtons & 0xf]);
		return REVERSE_DS4_DPAD_FIX[this.wButtons & 0xf];
	}

	updateAxis(name: DS4Axis, value: number) {
		this[name] = value;
	}

	getButtonValue(name: DS4Buttons | DS4Special | DS4Dpad) {
		if (isSpecial(name)) return ispressed(this.bSpecial, DS4_SPECIAL_BUTTONS[name]);
		else if (isDS4Dpad(name)) {
			if (name == "DPAD") return DPAD_VALUE[this.getDpadState()];
			else return DS4_DPAD_VALUES[this.wButtons & 0xf] == name;
		} else return ispressed(this.wButtons, DS4_BUTTONS[name]);
	}

	getAxisValue(name: DS4Axis) {
		return this[name];
	}

	freeze() {
		return Object.freeze({
			wButtons: this.wButtons,
			bThumbLX: this.bThumbLX,
			bThumbLY: this.bThumbLY,
			bThumbRX: this.bThumbRX,
			bThumbRY: this.bThumbRY,
			bTriggerL: this.bTriggerL,
			bTriggerR: this.bTriggerR,
			bSpecial: this.bSpecial,
		});
	}
}
