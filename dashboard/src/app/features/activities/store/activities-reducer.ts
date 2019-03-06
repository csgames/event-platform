import * as fromApp from "src/app/store/app.reducers";
import { ActivitiesAction, ActivitiesActionTypes } from "./activities-actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface ActivitiesState {
    loading: boolean;
    success: boolean;
}

const initialState: ActivitiesState = {
    loading: false,
    success: false
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
            }
        case ActivitiesActionTypes.ActivityAdded:
            return {
                ...state,
                loading: false,
                success: true
            }
        default:
            return state;
    }
}

export const getActivitiesState = createFeatureSelector<State, ActivitiesState>("activities");

export const getLoading = createSelector(getActivitiesState, (state: ActivitiesState) => state.loading);

export const getSuccess = createSelector(getActivitiesState, (state: ActivitiesState) => state.success);
