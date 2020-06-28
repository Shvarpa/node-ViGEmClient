import { Byte } from "../Common/Numbers";
import { Notification } from "../Common/Notification";
export class X360Notification implements Notification {
	LargeMotor?: Byte = undefined;
	SmallMotor?: Byte = undefined;
	LedNumber?: Byte = undefined;
	freeze() {
		return Object.freeze({
			LargeMotor: this.LargeMotor,
			SmallMotor: this.SmallMotor,
			LedNumber: this.LedNumber,
		});
	}
	set(data: any) {
		this.LargeMotor = data.LargeMotor;
		this.SmallMotor = data.SmallMotor;
		this.LedNumber = data.LedNumber;
	}
}
