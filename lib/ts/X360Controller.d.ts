import { ViGEmTarget } from "./ViGEmTarget";
import { InputButton } from "./InputButton";
import { InputAxis } from "./InputAxis";
import { X360ControllerReport } from "./X360ControllerReport";
import { Controller, ConnectOpts } from "../Types/Controller";
import { Four } from "../Types/Numbers";
export declare class X360Controller extends ViGEmTarget implements Controller {
    report: X360ControllerReport;
    axis: Readonly<{
        LX: InputAxis;
        LY: InputAxis;
        RX: InputAxis;
        RY: InputAxis;
        LT: InputAxis;
        RT: InputAxis;
    }>;
    button: Readonly<{
        [k: string]: InputButton;
    }>;
    private notification;
    constructor(client: any);
    get userIndex(): Four;
    protected alloc(): any;
    connect(opts?: ConnectOpts): Error;
    update(): Error;
}
