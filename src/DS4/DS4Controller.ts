import { vigemclient } from "../ts/Client";
import { ViGEmTarget } from "../ts/ViGEmTarget";
import { DS4_BUTTONS, DS4_SPECIAL_BUTTONS, VIGEM_ERRORS, handlePossibleError } from "../ts/Utils";
import { InputButton } from "../Inputs/InputButton";
import { InputAxis } from "../Inputs/InputAxis";
import { DS4ControllerReport } from "./DS4ControllerReport";
import { DS4Notification, DS4Lightbar } from "./DS4Notification";
import { Controller, ConnectOpts } from "../Common/Controller";
import { InputDpad } from "../Inputs/InputDpad";

export class DS4Controller extends ViGEmTarget implements Controller {
	constructor(client) {
		super(client);
	}

	report = new DS4ControllerReport();
	notification = new DS4Notification();
	button = Object.freeze(
		Object.fromEntries(
			Object.keys(DS4_BUTTONS)
				.concat(Object.keys(DS4_SPECIAL_BUTTONS))
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
	dpad = new InputDpad(this);

	get DPAD() {
		return this.dpad;
	}

	protected alloc() {
		return vigemclient.vigem_target_ds4_alloc();
	}

	connect(opts: ConnectOpts = {}): Error | undefined {
		let err = super.connect(opts);
		if (!err) {
			vigemclient.vigem_target_ds4_register_notification(this.client.handle, this.target, (data) => {
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

	update() {
		this.checkConnection();
		return handlePossibleError(vigemclient.vigem_target_ds4_update(this.client.handle, this.target, this.report.freeze()));
	}
}

function colorsEqual(c1: DS4Lightbar, c2: DS4Lightbar) {
	return `${c1.Red}${c1.Green}${c1.Blue}` == `${c2.Red}${c2.Green}${c2.Blue}`;
}
