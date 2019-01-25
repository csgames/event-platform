import { Action } from "@ngrx/store";
import { Attendee } from "../api/models/attendee";
import { HttpErrorResponse } from "@angular/common/http";

export enum AppActionTypes {
    GlobalError = "[App] Global error",
    LoadCurrentAttendee = "[App] Load current attendee",
    CurrentAttendeeLoaded = "[App] Current attendee loaded",
    Logout = "[App] Logout"
}

export class GlobalError implements Action {
    readonly type = AppActionTypes.GlobalError;

    constructor(public payload: Error | HttpErrorResponse) {
    }
}

export class LoadCurrentAttendee implements Action {
    readonly type = AppActionTypes.LoadCurrentAttendee;
}

export class CurrentAttendeeLoaded implements Action {
    readonly type = AppActionTypes.CurrentAttendeeLoaded;

    constructor(public payload: Attendee) {}
}

export class Logout implements Action {
    readonly type = AppActionTypes.Logout;
}

export type AppActions =
    | GlobalError
    | Logout
    | LoadCurrentAttendee
    | CurrentAttendeeLoaded
    | LoadCurrentAttendee;
