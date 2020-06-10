import { ViGEmTarget } from "./ViGEmTarget";
import { InputButton } from "./InputButton";
import { InputAxis } from "./InputAxis";
import { DS4ControllerReport } from "./DS4ControllerReport";
import { Controller } from "./Types/Controller";
import { ConnectOpts } from "../ts/ViGEmTarget";
export declare class DS4Controller extends ViGEmTarget implements Controller {
    private notification;
    report: DS4ControllerReport;
    button: Readonly<{
        [k: string]: InputButton;
    }>;
    axis: Readonly<{
        LX: InputAxis;
        LY: InputAxis;
        RX: InputAxis;
        RY: InputAxis;
        LT: InputAxis;
        RT: InputAxis;
    }>;
    constructor(client: any);
    protected alloc(): any;
    connect(opts?: ConnectOpts): Error | undefined;
    update(): Error;
}
