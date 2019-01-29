import { Action } from "@ngrx/store";
import { ForgetDto } from "../../../api/dto/auth";

export enum ForgetActionTypes {
    PerformForget = "[Login] Perform Forget",
    ForgetSuccess = "[Login] Forget success",
    ForgetFailure = "[Login] Forget failure",
}

export class PerformForget implements Action {
    readonly type = ForgetActionTypes.PerformForget;

    constructor(public payload: ForgetDto) {}
}

export class ForgetFailure implements Action {
    readonly type = ForgetActionTypes.ForgetFailure;
}

export class ForgetSuccess implements Action {
    readonly type = ForgetActionTypes.ForgetSuccess;
}

export type ForgetActions =
    | PerformForget
    | ForgetSuccess
    | ForgetFailure;
