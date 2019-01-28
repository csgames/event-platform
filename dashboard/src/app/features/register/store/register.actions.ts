import { Action } from "@ngrx/store";

export enum RegisterActionTypes {
    LoadRegistration = "[Register] Load registration",
    RegistrationLoaded = "[Register] Registration loaded",
    RegistrationError = "[Regiser] Registration error"
}

export class LoadRegistration implements Action {
    readonly type = RegisterActionTypes.LoadRegistration;

    constructor(public uuid: string) {}
}

export class RegistrationLoaded implements Action {
    readonly type = RegisterActionTypes.RegistrationLoaded;

    constructor(public registrationInfo: any) {}
}

export class RegistrationError implements Action {
    readonly type = RegisterActionTypes.RegistrationError;
}

export type RegisterActions =
    | RegistrationLoaded
    | RegistrationError
    | LoadRegistration;
