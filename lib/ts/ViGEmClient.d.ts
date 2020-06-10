import { X360Controller } from "./X360Controller";
import { DS4Controller } from "./DS4Controller";
export declare class ViGEmClient {
    private _handle;
    private connected;
    get handle(): any;
    connect(): Error;
    createX360Controller(): X360Controller;
    createDS4Controller(): DS4Controller;
}
