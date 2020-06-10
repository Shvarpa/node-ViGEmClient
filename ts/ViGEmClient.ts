const vigemclient = require("../build/Release/vigemclient");
import { VIGEM_ERRORS, handlePossibleError } from "./Common";

import { X360Controller } from "./X360Controller";
import { DS4Controller } from "./DS4Controller";

export class ViGEmClient {
	constructor(private _handle = null, private connected = false) {}

	get handle() {
		return this._handle;
	}

	connect() {
		this._handle = vigemclient.vigem_alloc();
		let error = handlePossibleError(vigemclient.vigem_connect(this._handle));
		this.connected = !error;
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
