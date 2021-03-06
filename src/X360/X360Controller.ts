import { vigemclient } from "../ts/Client";
import { ViGEmTarget } from "../ts/ViGEmTarget";
import { XUSB_BUTTON, VIGEM_ERRORS, handlePossibleError } from "../ts/Utils";
import { InputButton } from "../Inputs/InputButton";
import { InputAxis } from "../Inputs/InputAxis";
import { X360ControllerReport } from "./X360ControllerReport";
import { X360Notification } from "./X360Notification";
import { Controller, ConnectOpts } from "../Common/Controller";
import { Four } from "../Common/Numbers";
import { InputDpad } from "../Inputs/InputDpad";

export class X360Controller extends ViGEmTarget implements Controller {
	constructor(client) {
		super(client);
	}

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
	button = Object.freeze(Object.fromEntries(Object.keys(XUSB_BUTTON).map((button) => [button, new InputButton(this, button)])));
	dpad = new InputDpad(this);

	get DPAD() {
		return this.dpad;
	}

	protected alloc() {
		return vigemclient.vigem_target_x360_alloc();
	}

	connect(opts: ConnectOpts = {}) {
		let err = super.connect(opts);
		if (!err) {
			vigemclient.vigem_target_x360_register_notification(this.client.handle, this.target, (data) => {
				this.notification.set(data);
				this.emit("notification", this.notification.freeze());
			});
		}
		return err;
	}

	disconnect() {
		this.checkConnection();
		vigemclient.vigem_target_x360_unregister_notification(this.target);
		return super.disconnect();
	}

	get userIndex(): Four {
		this.checkConnection();
		return vigemclient.vigem_target_x360_get_user_index(this.client.handle, this.target);
	}

	update() {
		this.checkConnection();
		return handlePossibleError(vigemclient.vigem_target_x360_update(this.client.handle, this.target, this.report.freeze()));
	}
}
