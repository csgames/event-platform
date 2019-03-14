import { CompetitionAdminActions, CompetitionsAdminActionTypes } from "./competition-admin.actions";
import * as fromApp from "src/app/store/app.reducers";
import { Competition } from "../../../../api/models/competition";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Activity } from "../../../../api/models/activity";

export interface CompetitionsAdminState {
    competitions: Competition[];
    activities: Activity[];
    loading: boolean;
    error: boolean;
}

export interface State extends fromApp.State {
    competitionsAdmin: CompetitionsAdminState;
}

export const initialState: CompetitionsAdminState = {
    competitions: [],
    activities: [],
    loading: false,
    error: false
};

export function reducer(state = initialState, action: CompetitionAdminActions): CompetitionsAdminState {
    switch (action.type) {
        case CompetitionsAdminActionTypes.LoadCompetitionsAdmin:
            return {
                ...state,
                loading: true
            };
        case CompetitionsAdminActionTypes.CompetitionsAdminLoaded:
            return {
                ...state,
                loading: false,
                competitions: action.competitions
            };
        case CompetitionsAdminActionTypes.CompetitionsAdminError:
            return {
                ...state,
                loading: false,
                competitions: [],
                error: true
            };

        default:
            return state;
    }
}

export const getCompetitionsAdminState = createFeatureSelector<State, CompetitionsAdminState>("competitionsAdmin");

export const getCompetitionsAdmin = createSelector(getCompetitionsAdminState, (state: CompetitionsAdminState) => state.competitions);
export const getCompetitionsAdminLoading = createSelector(getCompetitionsAdminState, (state: CompetitionsAdminState) => state.loading);
export const getCompetitionsAdminError = createSelector(getCompetitionsAdminState, (state: CompetitionsAdminState) => state.error);
export const getActivities = createSelector(getCompetitionsAdminState, (state: CompetitionsAdminState) => state.activities
    .filter(x => x.type === "competition"));
