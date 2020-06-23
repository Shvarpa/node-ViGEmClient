import { Controller } from "../Common/Controller";
import { Nibble } from "../Common/Numbers";
import { Axis } from "./Common";

export class InputDpad {
	constructor(private _parent: Controller) {}

	get parent() {
		return this._parent;
	}

	get value() {
		return this._parent.report.getDpadValue();
	}

	setValue(value: Nibble | Axis) {
		this.parent.report.updateDpad(value);
	}
}