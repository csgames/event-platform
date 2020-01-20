import { Validators } from "@angular/forms";
import "reflect-metadata";
import { CONTROL, CONTROLS } from "../constant";
import { PropertyDecoratorType } from "../decorators/type";
import { ControlConfigModel } from "../models/control-config.model";
import { ControlModel } from "../models/control.model";
import { FormGeneratorScanner } from "../scanner";
import { TypeHandler } from "./type.handler";
import { matches } from "../validators/matches-control.validator";

export class ControlHandler {
    private static scanner: FormGeneratorScanner = new FormGeneratorScanner();
    private static decorators: { [type: number]: TypeHandler } = {
        [PropertyDecoratorType.Control]: ControlHandler.setupControl,
        [PropertyDecoratorType.Required]: ControlHandler.setupRequired,
        [PropertyDecoratorType.Email]: ControlHandler.setupEmail,
        [PropertyDecoratorType.Min]: ControlHandler.setupMin,
        [PropertyDecoratorType.Max]: ControlHandler.setupMax,
        [PropertyDecoratorType.MinLength]: ControlHandler.setupMinLength,
        [PropertyDecoratorType.MaxLength]: ControlHandler.setupMaxLength,
        [PropertyDecoratorType.MatchesControl]: ControlHandler.setupMatchesControl,
        [PropertyDecoratorType.MatchesPattern]: ControlHandler.setupMatchesPattern
    };

    public static setup(type: PropertyDecoratorType, data?: any) {
        return (target: object, propertyKey: string) => {
            let control: ControlModel = Reflect.getMetadata(CONTROL.replace("{name}", propertyKey), target);
            if (!control) {
                const controlType = Reflect.getMetadata("design:type", target, propertyKey);
                const children = Reflect.getMetadata(CONTROLS, controlType.prototype);
                control = {
                    name: propertyKey,
                    key: propertyKey,
                    type: controlType.name,
                    validators: [],
                    children: children
                };
            }
            this.decorators[type](control, target, propertyKey, data);
            Reflect.defineMetadata(CONTROL.replace("{name}", propertyKey), control, target);
        };
    }

    private static setupControl(control: ControlModel, target: object, propertyKey: string, data?: ControlConfigModel) {
        if (data) {
            control.name = data.name ? data.name : propertyKey;
            control.defaultValue = data.defaultValue;

            if (data.childrenClass) {
                control.children = ControlHandler.scanner.getControls(data.childrenClass);
            }
        }
        const controls: ControlModel[] = Reflect.getMetadata(CONTROLS, target) || [];
        controls.push(control);
        Reflect.defineMetadata(CONTROLS, controls, target);
    }

    private static setupRequired(control: ControlModel, target: object, propertyKey: string, data?: any) {
        control.validators.push(Validators.required);
    }

    private static setupEmail(control: ControlModel, target: object, propertyKey: string, data?: any) {
        control.validators.push(Validators.email);
    }

    private static setupMin(control: ControlModel, target: object, propertyKey: string, data?: any) {
        control.validators.push(Validators.minLength(data));
    }

    private static setupMax(control: ControlModel, target: object, propertyKey: string, data?: any) {
        control.validators.push(Validators.maxLength(data));
    }

    private static setupMinLength(control: ControlModel, target: object, propertyKey: string, data?: any) {
        control.validators.push(Validators.minLength(data));
    }

    private static setupMaxLength(control: ControlModel, target: object, propertyKey: string, data?: any) {
        control.validators.push(Validators.maxLength(data));
    }

    private static setupMatchesControl(control: ControlModel, target: object, propertyKey: string, data?: any) {
        control.validators.push(matches(data));
    }

    private static setupMatchesPattern(control: ControlModel, target: object, propertyKey: string, data?: any) {
        control.validators.push(Validators.pattern(data));
    }
}
