import { Competition } from "src/app/api/models/competition";
import * as fromApp from "src/app/store/app.reducers";
import { CompetitionsActions, CompetitionsActionTypes } from "./competitions.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CompetitionsState {
    competitions: Competition[];
    loading: boolean;
}

const initialState: CompetitionsState = {
    competitions: [],
    loading: false
};

export interface State extends fromApp.State {
    competitions: CompetitionsState;
}

export function reducer(state = initialState, action: CompetitionsActions): CompetitionsState {
    switch (action.type) {
        case CompetitionsActionTypes.LoadCompetitions:
            return {
                ...state,
                loading: true
            };
        case CompetitionsActionTypes.CompetitionsLoaded:
            return {
                ...state,
                loading: false,
                competitions: action.competitions
            };
        default:
            return state;
    }
}

export const getCompetitionsState = createFeatureSelector<State, CompetitionsState>("competitions");

export const getCompetitions = createSelector(getCompetitionsState, (state: CompetitionsState) => state.competitions);

export const getCompetitionsLoading = createSelector(getCompetitionsState, (state: CompetitionsState) => state.loading);
