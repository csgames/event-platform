import { ControlHandler } from "../handler/control.handler";
import { PropertyDecoratorType } from "./type";

export function MatchesControl(controlName: string): PropertyDecorator {
    return ControlHandler.setup(PropertyDecoratorType.MatchesControl, controlName);
}
