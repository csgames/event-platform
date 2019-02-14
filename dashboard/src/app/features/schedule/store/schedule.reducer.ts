import { Activity } from "src/app/api/models/activity";
import * as fromApp from "src/app/store/app.reducers";
import { ScheduleActions, ScheduleActionTypes } from "./schedule.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface ScheduleState {
    activities: Activity[];
    loading: boolean;
}

const initialState: ScheduleState = {
    activities: [],
    loading: false
};

export interface State extends fromApp.State {
    schedule: ScheduleState;
}

export function reducer(state = initialState, action: ScheduleActions): ScheduleState {
    switch (action.type) {
        case ScheduleActionTypes.LoadActivities:
            return {
                ...state,
                loading: true
            };
        case ScheduleActionTypes.ActivitiesLoaded:
            return {
                ...state,
                loading: false,
                activities: action.activities
            };
        default:
            return state;
    }
}

export const getScheduleState = createFeatureSelector<State, ScheduleState>("schedule");

export const getActivities = createSelector(getScheduleState, (state: ScheduleState) => state.activities);

export const getScheduleLoading = createSelector(getScheduleState, (state: ScheduleState) => state.loading);
