import { Action } from "@ngrx/store";
import { ForgetDto } from "../../../api/dto/auth";

export enum ForgetActionTypes {
    PerformForget = "[Forget] Perform Forget",
    ForgetSuccess = "[Forget] Forget success",
    ForgetFailure = "[Forget] Forget failure",
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
