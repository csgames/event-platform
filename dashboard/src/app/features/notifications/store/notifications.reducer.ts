import * as fromApp from "src/app/store/app.reducers";
import { AdminNotificationsActionTypes, AdminNotificationsAction } from "./notifications-actions";
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Activity } from "src/app/api/models/activity";

export interface AdminNotificationsState {
    loading: boolean;
    success: boolean;
    activities: Activity[];
}

const initialState: AdminNotificationsState = {
    loading: false,
    success: false,
    activities: []
};

export interface State extends fromApp.State {
    adminNotifications: AdminNotificationsState;
}

export function reducer(state = initialState, action: AdminNotificationsAction): AdminNotificationsState {
    switch (action.type) {
        case AdminNotificationsActionTypes.SendSms:
            return {
                ...state,
                loading: true
            };
        case AdminNotificationsActionTypes.NotificationSent:
            return {
                ...state,
                loading: false,
                success: true
            };
        case AdminNotificationsActionTypes.SendPush:
            return {
                ...state,
                loading: true
            };
        case AdminNotificationsActionTypes.NotificationError:
            return {
                ...state,
                loading: false,
                success: false
            };
        case AdminNotificationsActionTypes.LoadActivities:
            return {
                ...state,
                loading: true
            };
        case AdminNotificationsActionTypes.ActivitiesLoaded:
            return {
                ...state,
                loading: false,
                activities: action.activities
            };
        default:
            return state;
    }
}

export const getAdminNotificationsState = createFeatureSelector<State, AdminNotificationsState>("adminNotifications");

export const getLoading = createSelector(getAdminNotificationsState, (state: AdminNotificationsState) => state.loading);

export const getSuccess = createSelector(getAdminNotificationsState, (state: AdminNotificationsState) => state.success);

export const getActivities = createSelector(getAdminNotificationsState, (state: AdminNotificationsState) => state.activities);
