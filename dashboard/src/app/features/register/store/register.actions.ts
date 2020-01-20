import { Action } from "@ngrx/store";
import { UserFormDto } from "../../../components/user-form/dto/user-form.dto";

export enum RegisterActionTypes {
    LoadRegistration = "[Register] Load registration",
    RegistrationLoaded = "[Register] Registration loaded",
    RegistrationError = "[Regiser] Registration error",
    PerformRegistration = "[Register] Perform registration",
    PerformRegistrationSuccess = "[Register] Perform registration success",
    PerformRegistrationError = "[Register] Perform registration error"
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

export class PerformRegistration implements Action {
    readonly type = RegisterActionTypes.PerformRegistration;

    constructor(public payload: { uuid: string, userFormDto: UserFormDto }) {}
}

export class PerformRegistrationSuccess implements Action {
    readonly type = RegisterActionTypes.PerformRegistrationSuccess;
}

export class PerformRegistrationError implements Action {
    readonly type = RegisterActionTypes.PerformRegistrationError;
}

export type RegisterActions =
    | RegistrationLoaded
    | RegistrationError
    | PerformRegistration
    | PerformRegistrationSuccess
    | PerformRegistrationError
    | LoadRegistration;
