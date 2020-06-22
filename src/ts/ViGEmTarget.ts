import { vigemclient } from "./Client";
import { EventEmitter } from "events";
import { VIGEM_ERRORS, handlePossibleError } from "./Common";
import { ViGEmClient } from "./ViGEmClient";
import { ConnectOpts } from "../Common/Controller";

const NotConnectedError = () => new Error("Target is not connected");

export class ViGEmTarget extends EventEmitter {
	private _connected: boolean = false;
	protected target: any = null;

	constructor(protected client: ViGEmClient) {
		super();
	}

	get connected() {
		return this._connected;
	}

	get vendorID() {
		this.checkConnection();
		return vigemclient.vigem_target_get_vid(this.target);
	}

	get productID() {
		this.checkConnection();
		return vigemclient.vigem_target_get_pid(this.target);
	}

	get index(): number {
		this.checkConnection();
		return vigemclient.vigem_target_get_index(this.target);
	}

	get type() {
		this.checkConnection();
		return vigemclient.vigem_target_get_type(this.target);
	}

	get attached(): boolean {
		if (!this.connected) return false;
		return vigemclient.vigem_target_is_attached(this.target);
	}

	protected alloc() {
		throw new Error("Method not implemented");
	}

	protected checkConnection() {
		if (!this.connected) throw NotConnectedError();
	}

	connect(opts: ConnectOpts = {}) {
		let client = this.client.handle;

		let target = this.alloc();

		if ("vendorID" in opts) vigemclient.vigem_target_set_vid(target, opts.vendorID);
		if ("productID" in opts) vigemclient.vigem_target_set_pid(target, opts.productID);

		let error = handlePossibleError(vigemclient.vigem_target_add(client, target));

		if (!error) {			
			this._connected = true;
			this.target = target;
		} else {
			this._connected = false;
			this.target = null;
		}

		return error;
	}

	disconnect() {
		this.checkConnection();
		let client = this.client.handle;
		let error = handlePossibleError(vigemclient.vigem_target_remove(client, this.target));

		if (!error) {
			this._connected = false;
			this.target = null; // finalizer takes care of the clean up
		}

		return error;
	}

	update() {
		throw new Error("Method not implemented");
	}
}
