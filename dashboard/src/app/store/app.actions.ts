import { Action } from "@ngrx/store";
import { Attendee } from "../api/models/attendee";
import { HttpErrorResponse } from "@angular/common/http";
import { Event } from "../api/models/event";
import { PuzzleHeroInfo } from "../api/models/puzzle-hero";
import { Competition } from "../api/models/competition";
import { NavigationTypes } from "./app.reducers";

export enum AppActionTypes {
    GlobalError = "[App] Global error",
    LoadCurrentAttendee = "[App] Load current attendee",
    CurrentAttendeeLoaded = "[App] Current attendee loaded",
    LoadEvents = "[App] Load events",
    EventsLoaded = "[App] Events loaded",
    AppLoaded = "[App] App loaded",
    SetCurrentEvent = "[App] Set current event",
    EditProfile = "[App] Edit profile",
    Logout = "[App] Logout",
    ChangeLanguage = "[App] Change language",
    ChangePassword = "[App] Change password",
    ViewTicket = "[App] View ticket",
    CheckUnseenNotification = "[App] Check unseen notification",
    HasUnseenNotification = "[App] Has unseen notification",
    AllNotificationsSeen = "[App] All notifications seen",
    InitializeMessaging = "[App] Initialize messaging",
    SetMessagingToken = "[App] Set messaging",
    SetupMessagingToken = "[App] Setup messaging token",
    GetPuzzleHeroInfo = "[App] Get puzzle hero info",
    UpdatePuzzleHeroStatus = "[App] Update puzzle hero status",
    LoadRegisteredCompetitions = "[App] Load Registered competitions",
    RegisteredCompetitionsLoaded = "[App] Registered competitions loaded",
    SetNavigation = "[App] Set navigation"
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

export class AppLoaded implements Action {
    readonly type = AppActionTypes.AppLoaded;
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

export class ViewTicket implements Action {
    readonly type = AppActionTypes.ViewTicket;
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

export class InitializeMessaging implements Action {
    readonly type = AppActionTypes.InitializeMessaging;
}

export class SetupMessagingToken implements Action {
    readonly type = AppActionTypes.SetupMessagingToken;

    constructor(public payload: string) {}
}

export class GetPuzzleHeroInfo implements Action {
    readonly type = AppActionTypes.GetPuzzleHeroInfo;
}

export class UpdatePuzzleHeroStatus implements Action {
    readonly type = AppActionTypes.UpdatePuzzleHeroStatus;

    constructor(public payload: PuzzleHeroInfo) {}
}

export class LoadRegisteredCompetitions {
    readonly type = AppActionTypes.LoadRegisteredCompetitions;
}

export class RegisteredCompetitionsLoaded {
    readonly type = AppActionTypes.RegisteredCompetitionsLoaded;

    constructor(public payload: Competition []) {}
}

export class SetNavigation {
    readonly type = AppActionTypes.SetNavigation;

    constructor(public payload: NavigationTypes) {}
}

export type AppActions =
    | GlobalError
    | Logout
    | LoadEvents
    | EventsLoaded
    | LoadCurrentAttendee
    | CurrentAttendeeLoaded
    | AppLoaded
    | SetCurrentEvent
    | EditProfile
    | ChangeLanguage
    | ChangePassword
    | ViewTicket
    | CheckUnseenNotification
    | HasUnseenNotification
    | AllNotificationsSeen
    | InitializeMessaging
    | SetupMessagingToken
    | GetPuzzleHeroInfo
    | UpdatePuzzleHeroStatus
    | LoadRegisteredCompetitions
    | RegisteredCompetitionsLoaded
    | SetNavigation;
