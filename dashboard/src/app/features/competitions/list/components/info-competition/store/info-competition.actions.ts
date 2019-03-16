import { Action } from "@ngrx/store";

export enum InfoCompetitionActionTypes {
    ResetState = "[Info competition] Reset state",
    ValidatePassword = "[Info competition] Validate password",
    ValidatePasswordSuccess = "[Info competition] Validate password success",
    ValidatePasswordFailure = "[Info competition] Validate password failure",
}

export class ResetState implements Action {
    readonly type = InfoCompetitionActionTypes.ResetState;
}

export class ValidatePassword implements Action {
    readonly type = InfoCompetitionActionTypes.ValidatePassword;

    constructor(public competitionId: string, public password: string) {}
}

export class ValidatePasswordSuccess implements Action {
    readonly type = InfoCompetitionActionTypes.ValidatePasswordSuccess;

    constructor(public competitionId: string) {}
}

export class ValidatePasswordFailure implements Action {
    readonly type = InfoCompetitionActionTypes.ValidatePasswordFailure;
}

export type InfoCompetitionActions =
    | ResetState
    | ValidatePasswordSuccess
    | ValidatePasswordFailure
    | ValidatePassword;
