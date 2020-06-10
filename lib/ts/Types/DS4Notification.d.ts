import { Byte } from "./Numbers";
export declare class DS4Lightbar {
    Red?: Byte;
    Green?: Byte;
    Blue?: Byte;
}
export declare class DS4Notification {
    LargeMotor?: Byte;
    SmallMotor?: Byte;
    LightbarColor?: DS4Lightbar;
}
