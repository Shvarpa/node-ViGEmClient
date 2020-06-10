import { Controller } from "./Types/Controller";
export interface InputSpec {
    maxIn: number;
    minIn: number;
    maxOut: number;
    minOut: number;
}
export declare class InputAxis {
    private _parent;
    private _name;
    private _spec;
    constructor(_parent: Controller, _name: string, _spec: InputSpec);
    get name(): string;
    get parent(): Controller;
    get value(): any;
    get minValue(): number;
    get maxValue(): number;
    setValue(value: number): void;
}
