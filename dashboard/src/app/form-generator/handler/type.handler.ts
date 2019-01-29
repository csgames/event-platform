import { ControlModel } from "../models/control.model";

export type TypeHandler = (control: ControlModel, target: object, propertyKey: string, data?: any) => void;
