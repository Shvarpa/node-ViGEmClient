import { Byte } from "./Numbers";
import { Notification } from "./Notification";
export class DS4Lightbar {
	Red?: Byte = null;
	Green?: Byte = null;
	Blue?: Byte = null;
}

export class DS4Notification implements Notification {
	LargeMotor?: Byte = null;
	SmallMotor?: Byte = null;
	LightbarColor?: DS4Lightbar;
	freeze() {
		return Object.freeze({
			LargeMotor: this.LargeMotor,
			SmallMotor: this.SmallMotor,
			LightbarColor: this.LightbarColor,
		})
	}
	set(data: any) {		
		this.LargeMotor = data.LargeMotor;
		this.SmallMotor = data.SmallMotor;
		this.LightbarColor = data.LightbarColor;
	}
}
