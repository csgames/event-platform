import { CompetitionAdminActions, CompetitionsAdminActionTypes } from "./competition-admin.actions";
import * as fromApp from "../../../../store/app.reducers";
import { Activity } from "../../../../api/models/activity";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CompetitionAdminState {
    loading: boolean;
    activities: Activity[];
}

export interface State extends fromApp.State {
    competitionAdmin: CompetitionAdminState;
}

export const initialState: CompetitionAdminState = {
    loading: false,
    activities: []
};

export function reducer(state = initialState, action: CompetitionAdminActions): CompetitionAdminState {
    switch (action.type) {
        case CompetitionsAdminActionTypes.LoadCompetitionsAdmin:
            return state;
        case CompetitionsAdminActionTypes.LoadActivities:
            return {
                ...state,
                loading: true
            };
        case CompetitionsAdminActionTypes.ActivitiesLoaded:
            return {
                ...state,
                activities: action.payload
            };
        default:
            return state;
    }
}

export const getCompetitionAdminState = createFeatureSelector<State, CompetitionAdminState>("competitionAdmin");

export const getLoading = createSelector(getCompetitionAdminState, (state: CompetitionAdminState) => state.loading);
export const getActivities = createSelector(getCompetitionAdminState, (state: CompetitionAdminState) => state.activities
    .filter(x => x.type === "competition"));
