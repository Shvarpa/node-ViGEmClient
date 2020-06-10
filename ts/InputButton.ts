import { Controller } from "./Types/Controller";

export class InputButton {
	constructor(private _parent: Controller,private _name: string) {}

	get name() {
		return this._name;
	}

	get parent() {
		return this._parent;
	}

	get value() {
		return this._parent.report.getButtonValue(this.name);
	}

	setValue(value) {
		this.parent.report.updateButton(this.name, value);
	}
}