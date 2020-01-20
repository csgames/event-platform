import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromApp from "../../../../../store/app.reducers";
import { EditActivityActions, ActivityEditActionTypes } from "./edit-activity.actions";
import { Activity } from "src/app/api/models/activity";

export interface ActivityEditState {
    activities: Activity[];
    loading: boolean;
    success: boolean;
    error: boolean;
}

export interface State extends fromApp.State {
    editActivity: ActivityEditState;
}

export const initialState: ActivityEditState = {
    activities: null,
    loading: false,
    success: false,
    error: false
};

export function reducer(state = initialState, action: EditActivityActions): ActivityEditState {
    switch (action.type) {
        case ActivityEditActionTypes.LoadActivities:
            return {
                ...state,
                loading: true
            };
        case ActivityEditActionTypes.ActivitiesLoaded:
            return {
                ...state,
                loading: false,
                activities: action.activities
            };
        case ActivityEditActionTypes.SaveActivityEdit:
            return {
                ...state,
                loading: true
            };
        case ActivityEditActionTypes.ActivityEditSaved:
            return {
                ...state,
                loading: false,
                success: true
            };
        case ActivityEditActionTypes.ResetStore:
            return initialState;
        default:
            return state;
    }
}

export const getActivityEditState = createFeatureSelector<State, ActivityEditState>("editActivity");

export const getActivityEditLoading = createSelector(getActivityEditState, (state: ActivityEditState) => state.loading);
export const getActivityEditError = createSelector(getActivityEditState, (state: ActivityEditState) => state.error);
export const getActivityEditSuccess = createSelector(getActivityEditState, (state: ActivityEditState) => state.success);
export const getActivities = createSelector(getActivityEditState, (state: ActivityEditState) => state.activities);
