import * as fromApp from "src/app/store/app.reducers";
import { ActivitiesAction, ActivitiesActionTypes } from "./activities-actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Activity } from "src/app/api/models/activity";
import { Action } from "rxjs/internal/scheduler/Action";

export interface ActivitiesState {
    loading: boolean;
    success: boolean;
    error: boolean;
    activities: Activity[];
}

const initialState: ActivitiesState = {
    loading: false,
    success: false,
    activities: [],
    error: false
};

export interface State extends fromApp.State {
    activities: ActivitiesState;
}

export function reducer(state = initialState, action: ActivitiesAction): ActivitiesState {
    switch (action.type) {
        case ActivitiesActionTypes.AddActivity:
            return {
                ...state,
                loading: true
            };
        case ActivitiesActionTypes.ActivityAdded:
            return {
                ...state,
                loading: false,
                success: true
            };
        case ActivitiesActionTypes.LoadActivities: 
            return {
                ...state,
                loading: true
            };
        case ActivitiesActionTypes.ActivitiesLoaded:
            return {
                ...state,
                loading: false,
                activities: action.activities
            };
        case ActivitiesActionTypes.ActivitiesError:
            return {
                ...state,
                loading: false,
                activities: [],
                error: false
            };
        default:
            return state;
    }
}

export const getActivitiesState = createFeatureSelector<State, ActivitiesState>("activities");

export const getLoading = createSelector(getActivitiesState, (state: ActivitiesState) => state.loading);

export const getSuccess = createSelector(getActivitiesState, (state: ActivitiesState) => state.success);

export const getActivities = createSelector(getActivitiesState, (state: ActivitiesState) => state.activities);

export const getActivitiesError = createSelector(getActivitiesState, (state: ActivitiesState) => state.error);
