import { Byte } from "./Numbers";

export class DS4Lightbar {
	Red?: Byte = null;
	Green?: Byte = null;
	Blue?: Byte = null;
}

export class DS4Notification {
	LargeMotor?: Byte = null;
	SmallMotor?: Byte = null;
	LightbarColor?: DS4Lightbar;
}
