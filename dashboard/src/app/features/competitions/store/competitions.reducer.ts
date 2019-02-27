import { Competition } from "src/app/api/models/competition";
import * as fromApp from "src/app/store/app.reducers";
import { CompetitionsActions, CompetitionsActionTypes } from "./competitions.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CompetitionsState {
    competitions: Competition[];
    subscribedCompetitions: string [];
    loading: boolean;
    error: boolean;
}

export interface State extends fromApp.State {
    competitions: CompetitionsState;
}

const initialState: CompetitionsState = {
    competitions: [],
    subscribedCompetitions: [],
    loading: false,
    error: false
};

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
        case CompetitionsActionTypes.LoadCompetitionsError:
            return {
                ...state,
                loading: false,
                competitions: [],
                error: true
            };
        case CompetitionsActionTypes.SubscribedCompetitionsLoaded:
            return {
                ...state,
                subscribedCompetitions: action.subscribedCompetitions
            };
        default:
            return state;
    }
}

export const getCompetitionsState = createFeatureSelector<State, CompetitionsState>("competitions");
export const getCompetitions = createSelector(getCompetitionsState, (state: CompetitionsState) => state.competitions);

export const getCompetitionsLoading = createSelector(getCompetitionsState, (state: CompetitionsState) => state.loading);
export const getCompetitionsError = createSelector(getCompetitionsState, (state: CompetitionsState) => state.error);
