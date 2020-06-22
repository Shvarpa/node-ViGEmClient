import { Byte } from "./Numbers";

export interface Notification {
	freeze(): Object;
	set(data: any);
	LargeMotor?: Byte;
	SmallMotor?: Byte;
}
