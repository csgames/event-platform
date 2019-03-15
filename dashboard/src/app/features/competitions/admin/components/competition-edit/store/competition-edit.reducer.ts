import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Activity } from "../../../../../../api/models/activity";
import { Attendee } from "../../../../../../api/models/attendee";
import * as fromApp from "../../../../../../store/app.reducers";
import { CompetitionEditActions, CompetitionEditActionTypes } from "./competition-edit.actions";

export interface CompetitionEditState {
    activities: Activity[];
    directors: Attendee[];
    loading: boolean;
    success: boolean;
    error: boolean;
}

export interface State extends fromApp.State {
    competitionEdit: CompetitionEditState;
}

export const initialState: CompetitionEditState = {
    activities: null,
    directors: null,
    loading: false,
    success: false,
    error: false
};

export function reducer(state = initialState, action: CompetitionEditActions): CompetitionEditState {
    switch (action.type) {
        case CompetitionEditActionTypes.LoadActivities:
        case CompetitionEditActionTypes.LoadDirectors:
            return {
                ...state,
                loading: true
            };
        case CompetitionEditActionTypes.ActivitiesLoaded:
            return {
                ...state,
                activities: action.payload
            };
        case CompetitionEditActionTypes.DirectorsLoaded:
            return {
                ...state,
                directors: action.payload
            };
        case CompetitionEditActionTypes.ModalLoaded:
            return {
                ...state,
                loading: false
            };
        case CompetitionEditActionTypes.SaveCompetitionEdit:
            return {
                ...state,
                loading: true
            };
        case CompetitionEditActionTypes.CompetitionEditSaved:
            return {
                ...state,
                loading: false,
                success: true
            };
        case CompetitionEditActionTypes.ResetStore:
            return initialState;
        default:
            return state;
    }
}

export const getCompetitionEditState = createFeatureSelector<State, CompetitionEditState>("competitionEdit");

export const getCompetitionEditLoading = createSelector(getCompetitionEditState, (state: CompetitionEditState) => state.loading);
export const getCompetitionEditError = createSelector(getCompetitionEditState, (state: CompetitionEditState) => state.error);
export const getCompetitionEditSuccess = createSelector(getCompetitionEditState, (state: CompetitionEditState) => state.success);
export const getActivities = createSelector(getCompetitionEditState, (state: CompetitionEditState) => state.activities ? state.activities
    .filter(x => x.type === "competition") : []);
export const getDirectors = createSelector(getCompetitionEditState, (state: CompetitionEditState) => state.directors || []);
