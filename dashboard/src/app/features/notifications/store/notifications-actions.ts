import { Action } from "@ngrx/store";
import { Activity } from "src/app/api/models/activity";

export enum AdminNotificationsActionTypes {
    SendSms = "[Notifications] Send sms",
    SendPush = "[Notifications] Send push",
    NotificationSent = "[Notifications] notification sent",
    NotificationError = "[Notifications] notification error",
    LoadActivities = "[Notifications] Load activities",
    ActivitiesLoaded = "[Notifications] Activities loaded"
}

export class SendSms implements Action {
    readonly type = AdminNotificationsActionTypes.SendSms

    constructor(public message: string) { }
}

export class NotificationSent implements Action {
    readonly type = AdminNotificationsActionTypes.NotificationSent;
}

export class SendPush implements Action {
    readonly type = AdminNotificationsActionTypes.SendPush;

    constructor(
        public title: string,
        public body: string,
        public activity: Activity
    ) { }
}

export class NotificationError implements Action {
    readonly type = AdminNotificationsActionTypes.NotificationError;

    constructor(public error: any) { }
}

export class LoadActivities implements Action {
    readonly type = AdminNotificationsActionTypes.LoadActivities;
}

export class ActivitiesLoaded implements Action {
    readonly type = AdminNotificationsActionTypes.ActivitiesLoaded;

    constructor(public activities: Activity[]) { }
}

export type AdminNotificationsAction =
    | SendSms
    | NotificationSent
    | SendPush
    | NotificationError
    | LoadActivities
    | ActivitiesLoaded;
