import { Competition } from "src/app/api/models/competition";
import * as fromApp from "src/app/store/app.reducers";
import { CompetitionsActions, CompetitionsActionTypes } from "./competitions.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CompetitionsState {
    competitions: Competition[];
    loading: boolean;
    error: boolean;
}

export interface State extends fromApp.State {
    competitions: CompetitionsState;
}

const initialState: CompetitionsState = {
    competitions: [],
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
        case CompetitionsActionTypes.SubscribeToCompetition:
            return {
                ...state,
                loading: true
            };
        case CompetitionsActionTypes.SubscriptionError:
            return {
                ...state,
                loading: false
            };
        case CompetitionsActionTypes.ResetStore:
            return initialState;
    }

    return state;
}

export const getCompetitionsState = createFeatureSelector<State, CompetitionsState>("competitions");
export const getCompetitions = createSelector(getCompetitionsState, (state: CompetitionsState) => state.competitions);

export const getCompetitionsLoading = createSelector(getCompetitionsState, (state: CompetitionsState) => state.loading);
export const getCompetitionsError = createSelector(getCompetitionsState, (state: CompetitionsState) => state.error);

export const getSubscribedCompetitions = createSelector(getCompetitionsState,
    (state: CompetitionsState) => state.competitions.filter((competition) => competition.activities
        .some((activity) => activity.subscribed)
    )
);

export const getNotSubscribedCompetitions = createSelector(getCompetitionsState,
    (state: CompetitionsState) => state.competitions.filter((competition) => competition.activities
        .some((activity) => !activity.subscribed)
    )
);

