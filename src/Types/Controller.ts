import { Report } from "./Report";
import { Four } from "./Numbers";
export type VendorID = string;
export type ProductID = string;
export type ControllerType = "Xbox360Wired" | "XboxOneWired" | "DualShock4Wired";
export interface ConnectOpts {
	vendorID?: string;
	productID?: string;
}

export interface Controller {
	report: Report;
	readonly connected: boolean;
	readonly vendorID: VendorID;
	readonly productID: ProductID;
	readonly index: number;
	readonly type: ControllerType;
	connect(opts: ConnectOpts): Error | undefined;
	disconnect(): Error | undefined;
	readonly userIndex?: Four;
}
