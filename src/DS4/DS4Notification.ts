import { Byte } from "../Common/Numbers";
import { Notification } from "../Common/Notification";
export class DS4Lightbar {
	Red?: Byte = null;
	Green?: Byte = null;
	Blue?: Byte = null;
}

export class DS4Notification implements Notification {
	LargeMotor?: Byte = null;
	SmallMotor?: Byte = null;
	LightbarColor?: DS4Lightbar = {};
	freeze() {
		return Object.freeze({
			LargeMotor: this.LargeMotor,
			SmallMotor: this.SmallMotor,
			LightbarColor: {
				Red: this.LightbarColor.Red,
				Green: this.LightbarColor.Green,
				Blue: this.LightbarColor.Blue,
			},
		});
	}
	set(data: any) {
		this.LargeMotor = data.LargeMotor;
		this.SmallMotor = data.SmallMotor;
		this.LightbarColor = {
			Red: data.LightbarColor.Red,
			Green: data.LightbarColor.Green,
			Blue: data.LightbarColor.Blue,
		};
	}
}
