import { Action } from "@ngrx/store";
import { Attendee } from "../api/models/attendee";
import { HttpErrorResponse } from "@angular/common/http";
import { Event } from "../api/models/event";

export enum AppActionTypes {
    GlobalError = "[App] Global error",
    LoadCurrentAttendee = "[App] Load current attendee",
    CurrentAttendeeLoaded = "[App] Current attendee loaded",
    LoadEvents = "[App] Load events",
    EventsLoaded = "[App] Events loaded",
    SetCurrentEvent = "[App] Set current event",
    Logout = "[App] Logout"
}

export class GlobalError implements Action {
    readonly type = AppActionTypes.GlobalError;

    constructor(public payload: Error | HttpErrorResponse) {}
}

export class LoadCurrentAttendee implements Action {
    readonly type = AppActionTypes.LoadCurrentAttendee;
}

export class CurrentAttendeeLoaded implements Action {
    readonly type = AppActionTypes.CurrentAttendeeLoaded;

    constructor(public payload: Attendee) {}
}

export class LoadEvents implements Action {
    readonly type = AppActionTypes.LoadEvents;
}

export class EventsLoaded implements Action {
    readonly type = AppActionTypes.EventsLoaded;

    constructor(public events: Event[]) {}
}

export class SetCurrentEvent implements Action {
    readonly type = AppActionTypes.SetCurrentEvent;

    constructor(public event: Event) {}
}

export class Logout implements Action {
    readonly type = AppActionTypes.Logout;
}

export type AppActions =
    | GlobalError
    | Logout
    | LoadEvents
    | EventsLoaded
    | LoadCurrentAttendee
    | CurrentAttendeeLoaded
    | SetCurrentEvent
    | LoadCurrentAttendee;
