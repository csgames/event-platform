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
    EditProfile = "[App] Edit profile",
    Logout = "[App] Logout",
    ChangeLanguage = "[App] Change language",
    ChangePassword = "[App] Change password",
    EditAccount = "[App] Edit account",
    CheckUnseenNotification = "[App] Check unseen notification",
    HasUnseenNotification = "[App] Has unseen notification",
    AllNotificationsSeen = "[App] All notifications seen"
}

export class ChangeLanguage implements Action {
    readonly type = AppActionTypes.ChangeLanguage;

    constructor(public payload: string) {}
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

export class EditProfile implements Action {
    readonly type = AppActionTypes.EditProfile;
}

export class Logout implements Action {
    readonly type = AppActionTypes.Logout;
}

export class ChangePassword implements Action {
    readonly type = AppActionTypes.ChangePassword;
}

export class EditAccount implements Action {
    readonly type = AppActionTypes.EditAccount;
}

export class CheckUnseenNotification implements Action {
    readonly type = AppActionTypes.CheckUnseenNotification;
}

export class HasUnseenNotification implements Action {
    readonly type = AppActionTypes.HasUnseenNotification;
}

export class AllNotificationsSeen implements Action {
    readonly type = AppActionTypes.AllNotificationsSeen;
}

export type AppActions =
    | GlobalError
    | Logout
    | LoadEvents
    | EventsLoaded
    | LoadCurrentAttendee
    | CurrentAttendeeLoaded
    | SetCurrentEvent
    | EditProfile
    | LoadCurrentAttendee
    | ChangeLanguage
    | ChangePassword
    | EditAccount
    | CheckUnseenNotification
    | HasUnseenNotification
    | AllNotificationsSeen;
