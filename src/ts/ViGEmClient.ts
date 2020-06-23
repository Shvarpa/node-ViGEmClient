import { vigemclient } from "./Client";
import { VIGEM_ERRORS, handlePossibleError } from "./Common";
import { X360Controller } from "./X360Controller";
import { DS4Controller } from "./DS4Controller";

export class ViGEmClient {
	private _handle;
	private _connected = false;

	get connected() {
		return this._connected;
	}

	get handle() {
		return this._handle;
	}

	connect() {
		this._handle = vigemclient.vigem_alloc();
		let error = handlePossibleError(vigemclient.vigem_connect(this._handle));
		this._connected = !error;
		return error;
	}

	createX360Controller() {
		if (!this.connected) throw new Error("Not connected");
		return new X360Controller(this);
	}

	createDS4Controller() {
		if (!this.connected) throw new Error("Not connected");
		return new DS4Controller(this);
	}
}
