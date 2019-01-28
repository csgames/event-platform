import { ControlHandler } from "../handler/control.handler";
import { PropertyDecoratorType } from "./type";

export function MatchesPattern(pattern: string | RegExp): PropertyDecorator {
    return ControlHandler.setup(PropertyDecoratorType.MatchesPattern, pattern);
}
