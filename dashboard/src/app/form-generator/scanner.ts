import "reflect-metadata";
import { ControlModel } from "./models/control.model";
import { CONTROLS } from "./constant";

export class FormGeneratorScanner {
    public getControls(model: any): ControlModel[] {
        return Reflect.getMetadata(CONTROLS, model.prototype);
    }
}
