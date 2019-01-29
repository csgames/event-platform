import { ControlHandler } from "../handler/control.handler";
import { ControlConfigModel } from "../models/control-config.model";
import { PropertyDecoratorType } from "./type";

export function Control(config?: ControlConfigModel): PropertyDecorator {
    return ControlHandler.setup(PropertyDecoratorType.Control, config);
}
