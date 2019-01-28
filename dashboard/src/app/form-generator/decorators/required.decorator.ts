import { ControlHandler } from "../handler/control.handler";
import { PropertyDecoratorType } from "./type";

export function Required(): PropertyDecorator {
    return ControlHandler.setup(PropertyDecoratorType.Required);
}
