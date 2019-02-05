import { Action } from "@ngrx/store";
import { ChangePasswordDto } from "../dto/change-password.dto";

export enum ChangePasswordActionTypes {
    PerformChangePassword = "[ChangePassword] Change password",
    PasswordChanged = "[ChangePassword] Password changed",
    ResetStore = "[ChangePassword] Reset store",
    ChangePasswordFailure = "[ChangePassword] Change password failure"
}

export class PerformChangePassword implements Action {
    readonly type = ChangePasswordActionTypes.PerformChangePassword;

    constructor(public payload: ChangePasswordDto) { }
}

export class PasswordChanged implements Action {
    readonly type = ChangePasswordActionTypes.PasswordChanged;
}

export class ResetStore implements Action {
    readonly type = ChangePasswordActionTypes.ResetStore;
}

export class ChangePasswordFailure implements Action {
    readonly type = ChangePasswordActionTypes.ChangePasswordFailure;
}

export type ChangePasswordActions =
    | PerformChangePassword
    | PasswordChanged
    | ResetStore
    | ChangePasswordFailure;
