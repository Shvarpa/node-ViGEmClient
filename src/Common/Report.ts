import { Nibble } from "./Numbers";
import { Axis } from "../ts/Common";

export interface Report {
	setButtons(value: number);
	updateButton(name: string, value: boolean);
	updateAxis(name: string, value: number);
	updateDpad(value: Nibble | Axis);
	getButtonValue(name: string);
	getAxisValue(name: string);
	getDpadValue();
	freeze(): Object;
}
