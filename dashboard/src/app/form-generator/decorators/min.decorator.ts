import { ControlHandler } from "../handler/control.handler";
import { PropertyDecoratorType } from "./type";

export function Min(min: number): PropertyDecorator {
    return ControlHandler.setup(PropertyDecoratorType.Min, min);
}
