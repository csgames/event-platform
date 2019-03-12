import { Competition } from "src/app/api/models/competition";
import * as fromApp from "src/app/store/app.reducers";
import { CompetitionActions, CompetitionActionTypes } from "./competition.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CompetitionState {
    currentCompetition: Competition;
    loading: boolean;
    error: boolean;
}

export interface State extends fromApp.State {
    competition: CompetitionState;
}

const initialState: CompetitionState = {
    currentCompetition: null,
    loading: false,
    error: false
};

export function reducer(state = initialState, action: CompetitionActions): CompetitionState {
    switch (action.type) {
        case CompetitionActionTypes.LoadCompetition:
            return {
                ...state,
                loading: true,
                error: false
            };
        case CompetitionActionTypes.CompetitionLoaded:
            return {
                ...state,
                loading: false,
                currentCompetition: action.competition
            };
        case CompetitionActionTypes.LoadCompetitionError:
            return {
                ...state,
                loading: false,
                error: true
            };
    }

    return state;
}

export const getCompetitionState = createFeatureSelector<State, CompetitionState>("competition");
export const getCompetition = createSelector(getCompetitionState, (state: CompetitionState) => state.currentCompetition);

export const getCompetitionLoading = createSelector(getCompetitionState, (state: CompetitionState) => state.loading);
export const getCompetitionError = createSelector(getCompetitionState, (state: CompetitionState) => state.error);
