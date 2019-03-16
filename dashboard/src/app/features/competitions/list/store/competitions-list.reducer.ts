import { Competition } from "src/app/api/models/competition";
import * as fromApp from "src/app/store/app.reducers";
import { CompetitionsListActions, CompetitionsListActionTypes } from "./competitions-list.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CompetitionsState {
    competitions: Competition[];
    loading: boolean;
    error: boolean;
}

export interface State extends fromApp.State {
    competitionsList: CompetitionsState;
}

const initialState: CompetitionsState = {
    competitions: [],
    loading: false,
    error: false
};

export function reducer(state = initialState, action: CompetitionsListActions): CompetitionsState {
    switch (action.type) {
        case CompetitionsListActionTypes.LoadCompetitions:
            return {
                ...state,
                loading: true
            };
        case CompetitionsListActionTypes.CompetitionsLoaded:
            return {
                ...state,
                loading: false,
                competitions: action.competitions
            };
        case CompetitionsListActionTypes.LoadCompetitionsError:
            return {
                ...state,
                loading: false,
                competitions: [],
                error: true
            };
        case CompetitionsListActionTypes.SubscribeToCompetition:
            return {
                ...state,
                loading: true
            };
        case CompetitionsListActionTypes.SubscriptionError:
            return {
                ...state,
                loading: false
            };
        case CompetitionsListActionTypes.ResetStore:
            return initialState;
    }

    return state;
}

export const getCompetitionsState = createFeatureSelector<State, CompetitionsState>("competitionsList");
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

