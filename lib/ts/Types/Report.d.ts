export interface Report {
    setButtons(value: number): any;
    updateButton(name: string, value: any): any;
    updateAxis(name: string, value: number): any;
    getButtonValue(name: string): any;
    getAxisValue(name: string): any;
    freeze(): Object;
}
