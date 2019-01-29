import { ControlHandler } from "../handler/control.handler";
import { PropertyDecoratorType } from "./type";

export function Max(max: number): PropertyDecorator {
    return ControlHandler.setup(PropertyDecoratorType.Max, max);
}
