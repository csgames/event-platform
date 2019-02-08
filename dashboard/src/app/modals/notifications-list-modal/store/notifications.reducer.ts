import { AppNotification } from "../../../api/models/notification";
import * as fromApp from "src/app/store/app.reducers";
import { NotificationActionTypes, NotificationsActions } from "./notifications.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface NotificationsState {
    notifications: AppNotification[];
    loading: boolean;
}

const initialState: NotificationsState = {
    notifications: [],
    loading: false
}

export interface State extends fromApp.State {
    notifications: NotificationsState;
}

export function reducer(state = initialState, action: NotificationsActions): NotificationsState {
    switch (action.type) {
        case NotificationActionTypes.LoadNotifications:
            return {
                ...state,
                loading: true
            }
        case NotificationActionTypes.NotificationsLoaded:
            return {
                ...state,
                loading: false,
                notifications: action.notificatons
            }
        default:
            return state;
    }
}

export const getNotificationsState = createFeatureSelector<State, NotificationsState>("notifications");

export const getNotifications = createSelector(getNotificationsState, (state: NotificationsState) => state.notifications);

export const getNotificationsLoading = createSelector(getNotificationsState, (state: NotificationsState) => state.loading);
