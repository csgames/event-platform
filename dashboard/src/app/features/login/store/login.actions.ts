import { Action } from "@ngrx/store";
import { LoginDto } from "../../../api/dto/auth";

export enum LoginActionTypes {
    PerformLogin = "[Login] Perform login",
    LoginSuccess = "[Login] Login success",
    LoginFailure = "[Login] Login failure",
    ResetError = "[Login] Reset error",
    ResetStore = "[Login] Reset store"
}

export class PerformLogin implements Action {
    readonly type = LoginActionTypes.PerformLogin;

    constructor(public payload: LoginDto) {}
}

export class LoginFailure implements Action {
    readonly type = LoginActionTypes.LoginFailure;
}

export class LoginSuccess implements Action {
    readonly type = LoginActionTypes.LoginSuccess;
}

export class ResetError implements Action {
    readonly type = LoginActionTypes.ResetError;
}

export class ResetStore implements Action {
    readonly type = LoginActionTypes.ResetStore;
}


export type LoginActions =
    | PerformLogin
    | LoginSuccess
    | LoginFailure
    | ResetError
    | ResetStore;
