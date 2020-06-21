export interface Report {
	setButtons(value: number);
	updateButton(name: string, value);
	updateAxis(name: string, value: number);
	getButtonValue(name: string);
   getAxisValue(name: string);
   freeze(): Object;
}
