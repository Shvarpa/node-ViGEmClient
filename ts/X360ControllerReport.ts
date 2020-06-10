import { XUSB_BUTTON, X360Buttons, X360Axis, set, ispressed, Axis, axisToDpad, DPAD_VALUE } from "./Common";
import { Report } from "./Types/Report";
import { Nibble } from "./Types/Numbers";

export class X360ControllerReport implements Report {
	wButtons: number = 0;
	bLeftTrigger: number = 0;
	bRightTrigger: number = 0;
	sThumbLX: number = 0;
	sThumbLY: number = 0;
	sThumbRX: number = 0;
	sThumbRY: number = 0;

	updateButton(name: X360Buttons, value: boolean | Nibble | Axis) {
		if (name == "DPAD") {
			if (typeof value != "boolean") this.setDpad(value);
		} else if (typeof value == "boolean") {
			this.wButtons = set(this.wButtons, XUSB_BUTTON[name], value);
		}
	}

	setButtons(value: number) {
		this.wButtons = value;
	}

	setDpad(value: Nibble | Axis) {
		let state = typeof value == "number" ? value : axisToDpad(value);
		this.wButtons &= ~0xf; // reset dpad
		this.wButtons |= state;
	}

	updateAxis(name: X360Axis, value: number) {
		this[name] = value;
	}

	getButtonValue(name: X360Buttons) {
		if (name == "DPAD") return DPAD_VALUE[(this.wButtons & 0xf) as Nibble];
		else return ispressed(this.wButtons, XUSB_BUTTON[name]);
	}

	getAxisValue(name: X360Axis) {
		return this[name];
	}

	freeze() {
		return Object.freeze({
			wButtons: this.wButtons,
			bLeftTrigger: this.bLeftTrigger,
			bRightTrigger: this.bRightTrigger,
			sThumbLX: this.sThumbLX,
			sThumbLY: this.sThumbLY,
			sThumbRX: this.sThumbRX,
			sThumbRY: this.sThumbRY,
		});
	}
}
