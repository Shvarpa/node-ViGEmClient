import { Controller } from "../Common/Controller";

export interface InputSpec {
	maxIn: number;
	minIn: number;
	maxOut: number;
	minOut: number;
}

export class InputAxis {
	constructor(private _parent: Controller, private _name: string, private _spec: InputSpec) {}

	get name() {
		return this._name;
	}

	get parent() {
		return this._parent;
	}

	get value() {
		return this._parent.report.getAxisValue(this.name);
	}

	get minValue() {
		return this._spec.minIn;
	}

	get maxValue() {
		return this._spec.maxIn;
	}

	setValue(value: number) {
		value = clamp(value, this.minValue, this.maxValue);
		value = rangeMap(value, this._spec);
		this.parent.report.updateAxis(this.name, value);
	}
}

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

function rangeMap(value: number, spec: InputSpec) {
	let inRange = spec.maxIn - spec.minIn;
	let outRange = spec.maxOut - spec.minOut;

	return spec.minOut + outRange * ((value - spec.minIn) / inRange);
}
