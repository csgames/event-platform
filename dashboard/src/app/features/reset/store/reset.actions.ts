import { Action } from "@ngrx/store";
import { ResetDto, ValidateDto } from "src/app/api/dto/auth";

export enum ResetActionTypes {
    PerformReset = "[Reset] Perform Reset",
    ResetSuccess = "[Reset] Reset success",
    ResetFailure = "[Reset] Reset failure",
    PerformValidate = "[Reset] Perform Validate",
    ValidateFailure = "[Reset] Validate failure",
    ValidateSuccess = "[Reset] Validate success"
}

export class PerformReset implements Action {
    readonly type = ResetActionTypes.PerformReset;

    constructor(public payload: ResetDto) {}
}

export class ResetFailure implements Action {
    readonly type = ResetActionTypes.ResetFailure;
}

export class ResetSuccess implements Action {
    readonly type = ResetActionTypes.ResetSuccess;
}

export class PerformValidate implements Action {
    readonly type = ResetActionTypes.PerformValidate;

    constructor(public payload: ValidateDto) {}
}

export class ValidateFailure implements Action {
    readonly type = ResetActionTypes.ValidateFailure;
}

export class ValidateSuccess implements Action {
    readonly type = ResetActionTypes.ValidateSuccess;
}

export type ResetActions =
    | PerformReset
    | ResetSuccess
    | ResetFailure
    | PerformValidate
    | ValidateFailure
    | ValidateSuccess;
