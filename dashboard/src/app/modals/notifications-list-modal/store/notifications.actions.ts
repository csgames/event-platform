import { Action } from "@ngrx/store";
import { Notification } from "../../../api/models/notification";

export enum NotificationActionTypes {
    LoadNotifications = "[Notification] Load notifications",
    NotificationsLoaded = "[Notification] Notifications loaded",
    MarkNotificationsAsSeen = "[Notification] Mark notifications as seen",
    NotificationsMarked = "[Notification] Notifications marked"
}

export class LoadNotifications implements Action {
    readonly type = NotificationActionTypes.LoadNotifications;
}

export class NotificationsLoaded implements Action {
    readonly type = NotificationActionTypes.NotificationsLoaded;

    constructor(public notificatons: Notification[]) { }
}

export class MarkNotificationsAsSeen implements Action {
    readonly type = NotificationActionTypes.MarkNotificationsAsSeen;

    constructor(public id: string) { }
}

export class NotificationsMarked implements Action {
    readonly type = NotificationActionTypes.NotificationsMarked;
}

export type NotificationsActions =
    | LoadNotifications
    | NotificationsLoaded
    | MarkNotificationsAsSeen
    | NotificationsMarked;
