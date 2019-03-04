import * as fromApp from "../../../../../store/app.reducers";
import { CompetitionCardActions, CompetitionCardActionTypes } from "./competition-card.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CompetitionCardState {
    loading: boolean;
    subscribed: boolean;
}

const initialState: CompetitionCardState = {
    loading: false,
    subscribed: false
};

export interface State extends fromApp.State {
    competitionCard: CompetitionCardState;
}

export function reducer(state = initialState, action: CompetitionCardActions): CompetitionCardState {
    switch (action.type) {
        case CompetitionCardActionTypes.CheckIfSubscribedToCompetition:
            return {
                ...state,
                loading: true
            };
        case CompetitionCardActionTypes.SubscribeToCompetition:
            return {
                ...state,
                loading: true
            };
        case CompetitionCardActionTypes.SubscribedToCompetition:
            return {
                ...state,
                subscribed: true,
                loading: false
            };
        case CompetitionCardActionTypes.NotSubscribedToCompetition:
            return {
                ...state,
                subscribed: false,
                loading: false
            };
        case CompetitionCardActionTypes.SubscriptionError:
            return {
                ...state,
                loading: false
            };
        case CompetitionCardActionTypes.ResetStore:
            return initialState;
        default:
            return state;
    }
}

export const getCompetitionCardState = createFeatureSelector<State, CompetitionCardState>("competitionCard");

export const getSubscribed = createSelector(getCompetitionCardState, (state: CompetitionCardState) => state.subscribed);
export const getLoading = createSelector(getCompetitionCardState, (state: CompetitionCardState) => state.loading);
