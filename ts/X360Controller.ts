const vigemclient = require("../build/Release/vigemclient");
import { ViGEmTarget, ConnectOpts } from "./ViGEmTarget";
import { XUSB_BUTTON, VIGEM_ERRORS, handlePossibleError } from "./Common";
import { InputButton } from "./InputButton";
import { InputAxis } from "./InputAxis";
import { X360ControllerReport } from "./X360ControllerReport";
import { X360Notification } from "./Types/X360Notification";
import { Controller } from "./Types/Controller";

export class X360Controller extends ViGEmTarget implements Controller {
	report = new X360ControllerReport();
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
	private notification = new X360Notification();
	constructor(client) {
		super(client);
	}

	get userIndex() {
		this.checkConnection();
		return vigemclient.vigem_target_x360_get_user_index(this.client._handle, this.target);
	}

	protected alloc() {
		return vigemclient.vigem_target_x360_alloc();
	}

	connect(opts: ConnectOpts = {}) {
		let err = super.connect(opts);

		if (!err) {
			vigemclient.vigem_target_x360_register_notification(this.client._handle, this.target, (data) => {
				if (data.LargeMotor != this.notification.LargeMotor) {
					this.emit("large motor", data.LargeMotor);
				}

				if (data.SmallMotor != this.notification.SmallMotor) {
					this.emit("small motor", data.SmallMotor);
				}

				if (data.LargeMotor != this.notification.LargeMotor || data.SmallMotor != this.notification.SmallMotor) {
					this.emit("vibration", { large: data.LargeMotor, small: data.SmallMotor });
				}

				if (data.LedNumber != this.notification.LedNumber) {
					this.emit("led change", data.LedNumber);
				}

				this.notification = data;
				this.emit("notification", data);
			});
		}

		return err;
	}

	update() {
		this.checkConnection();
		return handlePossibleError(vigemclient.vigem_target_x360_update(this.client._handle, this.target, this.report.freeze()));
	}
}
