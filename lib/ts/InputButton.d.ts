import { Controller } from "../Types/Controller";
export declare class InputButton {
    private _parent;
    private _name;
    constructor(_parent: Controller, _name: string);
    get name(): string;
    get parent(): Controller;
    get value(): any;
    setValue(value: any): void;
}
