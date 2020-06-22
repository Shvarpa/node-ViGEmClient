import { vigemclient } from "./Client";
import { ViGEmTarget } from "./ViGEmTarget";
import { XUSB_BUTTON, VIGEM_ERRORS, handlePossibleError } from "./Common";
import { InputButton } from "./InputButton";
import { InputAxis } from "./InputAxis";
import { X360ControllerReport } from "./X360ControllerReport";
import { X360Notification } from "../Common/X360Notification";
import { Controller, ConnectOpts } from "../Common/Controller";
import { Four } from "../Common/Numbers";

export class X360Controller extends ViGEmTarget implements Controller {
	report = new X360ControllerReport();
	notification = new X360Notification();
	axis = Object.freeze({
		LX: new InputAxis(this, "sThumbLX", { minIn: -1, maxIn: 1, minOut: -32768, maxOut: 32767 }),
		LY: new InputAxis(this, "sThumbLY", { minIn: -1, maxIn: 1, minOut: -32768, maxOut: 32767 }),
		RX: new InputAxis(this, "sThumbRX", { minIn: -1, maxIn: 1, minOut: -32768, maxOut: 32767 }),
		RY: new InputAxis(this, "sThumbRY", { minIn: -1, maxIn: 1, minOut: -32768, maxOut: 32767 }),
		LT: new InputAxis(this, "bLeftTrigger", { minIn: 0, maxIn: 1, minOut: 0, maxOut: 255 }),
		RT: new InputAxis(this, "bRightTrigger", { minIn: 0, maxIn: 1, minOut: 0, maxOut: 255 }),
	});
	button = Object.freeze(
		Object.fromEntries(
			Object.keys(XUSB_BUTTON)
				.concat("DPAD")
				.map((button) => [button, new InputButton(this, button)])
		)
	);
	constructor(client) {
		super(client);
	}

	protected alloc() {
		return vigemclient.vigem_target_x360_alloc();
	}

	connect(opts: ConnectOpts = {}) {
		let err = super.connect(opts);
		return err;
	}

	// private _registered = false;
	// register() {
	// 	if (this.connected && !this._registered) {
	// 		vigemclient.vigem_target_x360_register_notification(this.client.handle, this.target, (data) => {
	// 			if (data.LargeMotor != this.notification.LargeMotor) {
	// 				this.emit("large motor", data.LargeMotor);
	// 			}

	// 			if (data.SmallMotor != this.notification.SmallMotor) {
	// 				this.emit("small motor", data.SmallMotor);
	// 			}

	// 			if (data.LargeMotor != this.notification.LargeMotor || data.SmallMotor != this.notification.SmallMotor) {
	// 				this.emit("vibration", { large: data.LargeMotor, small: data.SmallMotor });
	// 			}

	// 			if (data.LedNumber != this.notification.LedNumber) {
	// 				this.emit("led change", data.LedNumber);
	// 			}

	// 			this.notification.set(data);
	// 			this.emit("notification", data);
	// 		});
	// 		this._registered = true;
	// 	}
	// }

	// async unregister() {
	// 	if (this.connected && this._registered) {
	// 		vigemclient.vigem_target_x360_unregister_notification(this.target);
	// 		this._registered = false;
	// 		return await new Promise((res, rej) => {
	// 			setTimeout(() => {
	// 				res();
	// 			}, 1000);
	// 		});
	// 	}
	// }

	// disconnect(): Error | undefined {
	// 	// this.unregister();
	// 	return super.disconnect();
	// }

	get userIndex(): Four {
		this.checkConnection();
		return vigemclient.vigem_target_x360_get_user_index(this.client.handle, this.target);
	}

	update() {
		this.checkConnection();
		return handlePossibleError(vigemclient.vigem_target_x360_update(this.client.handle, this.target, this.report.freeze()));
	}
}
