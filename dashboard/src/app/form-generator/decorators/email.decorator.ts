import { ControlHandler } from "../handler/control.handler";
import { PropertyDecoratorType } from "./type";

export function Email(): PropertyDecorator {
    return ControlHandler.setup(PropertyDecoratorType.Email);
}
