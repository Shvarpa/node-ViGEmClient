import { vigemclient } from "./Client";
import { ViGEmTarget } from "./ViGEmTarget";
import { DS4_BUTTONS, DS4_SPECIAL_BUTTONS, VIGEM_ERRORS, handlePossibleError } from "./Common";
import { InputButton } from "./InputButton";
import { InputAxis } from "./InputAxis";
import { DS4ControllerReport } from "./DS4ControllerReport";
import { DS4Notification, DS4Lightbar } from "../Common/DS4Notification";
import { Controller, ConnectOpts } from "../Common/Controller";

export class DS4Controller extends ViGEmTarget implements Controller {
	report = new DS4ControllerReport();
	notification = new DS4Notification();
	button = Object.freeze(
		Object.fromEntries(
			Object.keys(DS4_BUTTONS)
				.concat(Object.keys(DS4_SPECIAL_BUTTONS))
				.concat("DPAD")
				.map((button) => [button, new InputButton(this, button)])
		)
	);
	axis = Object.freeze({
		LX: new InputAxis(this, "bThumbLX", { minIn: -1, maxIn: 1, minOut: 0, maxOut: 255 }),
		LY: new InputAxis(this, "bThumbLY", { minIn: -1, maxIn: 1, minOut: 255, maxOut: 0 }),
		RX: new InputAxis(this, "bThumbRX", { minIn: -1, maxIn: 1, minOut: 0, maxOut: 255 }),
		RY: new InputAxis(this, "bThumbRY", { minIn: -1, maxIn: 1, minOut: 255, maxOut: 0 }),
		LT: new InputAxis(this, "bTriggerL", { minIn: 0, maxIn: 1, minOut: 0, maxOut: 255 }),
		RT: new InputAxis(this, "bTriggerR", { minIn: 0, maxIn: 1, minOut: 0, maxOut: 255 }),
	});
	constructor(client) {
		super(client);
	}

	protected alloc() {
		return vigemclient.vigem_target_ds4_alloc();
	}

	connect(opts: ConnectOpts = {}): Error | undefined {
		let err = super.connect(opts);
		return err;
	}

	// private _registered = false;
	// register() {
	// 	if (this.connected && !this._registered) {
	// 		vigemclient.vigem_target_ds4_register_notification(this.client.handle, this.target, (data) => {
	// 			if (data.LargeMotor != this.notification.LargeMotor) {
	// 				this.emit("large motor", data.LargeMotor);
	// 			}

	// 			if (data.SmallMotor != this.notification.SmallMotor) {
	// 				this.emit("small motor", data.SmallMotor);
	// 			}

	// 			if (data.LargeMotor != this.notification.LargeMotor || data.SmallMotor != this.notification.SmallMotor) {
	// 				this.emit("vibration", { large: data.LargeMotor, small: data.SmallMotor });
	// 			}

	// 			if (!colorsEqual(data.LightbarColor, this.notification.LightbarColor)) {
	// 				this.emit("color change", data.LightbarColor);
	// 			}

	// 			this.notification.set(data);
	// 			this.emit("notification", data);
	// 		});
	// 		this._registered = true;
	// 	}
	// }

	// async unregister() {
	// 	if (this.connected && this._registered) {
	// 		vigemclient.vigem_target_ds4_unregister_notification(this.target);
	// 		this._registered = false;
	// 		return await new Promise((res,rej)=>{
	// 			setTimeout(()=>{res()},200);
	// 		})
	// 	}
	// }

	// disconnect(): Error | undefined {
	// 	this.unregister();
	// 	return super.disconnect();
	// }

	update() {
		this.checkConnection();
		return handlePossibleError(vigemclient.vigem_target_ds4_update(this.client.handle, this.target, this.report.freeze()));
	}
}

function colorsEqual(c1: DS4Lightbar, c2: DS4Lightbar) {
	return `${c1.Red}${c1.Green}${c1.Blue}` == `${c2.Red}${c2.Green}${c2.Blue}`;
}