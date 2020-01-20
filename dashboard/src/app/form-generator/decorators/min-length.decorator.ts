import { ControlHandler } from "../handler/control.handler";
import { PropertyDecoratorType } from "./type";

export function MinLength(min: number): PropertyDecorator {
    return ControlHandler.setup(PropertyDecoratorType.MinLength, min);
}
