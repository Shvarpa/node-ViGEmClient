/// <reference types="node" />
import { EventEmitter } from "events";
import { ViGEmClient } from "./ViGEmClient";
export interface ConnectOpts {
    vendorID?: string;
    productID?: string;
}
export declare class ViGEmTarget extends EventEmitter {
    protected client: ViGEmClient;
    private _connected;
    protected target: any;
    constructor(client: ViGEmClient);
    get connected(): boolean;
    get vendorID(): any;
    get productID(): any;
    get index(): any;
    get type(): any;
    get attached(): any;
    protected alloc(): void;
    protected checkConnection(): void;
    connect(opts?: ConnectOpts): Error;
    disconnect(): Error;
    update(): void;
}
