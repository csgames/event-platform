import { ControlHandler } from "../handler/control.handler";
import { PropertyDecoratorType } from "./type";

export function MaxLength(max: number): PropertyDecorator {
    return ControlHandler.setup(PropertyDecoratorType.MaxLength, max);
}
