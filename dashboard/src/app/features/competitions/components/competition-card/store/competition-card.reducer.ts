import * as fromApp from "../../../../../store/app.reducers";
import { CompetitionCardActions, CompetitionCardActionTypes } from "./competition-card.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CompetitionCardState {
    loading: boolean;
    subscriptions: { [id: string]: boolean };
}

const initialState: CompetitionCardState = {
    loading: false,
    subscriptions: {}
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
                subscriptions: {
                    ...state.subscriptions,
                    [ action.activityId ]: true
                },
                loading: false
            };
        case CompetitionCardActionTypes.NotSubscribedToCompetition:
            return {
                ...state,
                subscriptions: {
                    ...state.subscriptions,
                    [ action.activityId ]: false
                },
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

export const isSubscribed = (activityId: string) => createSelector(
    getCompetitionCardState, 
    (state: CompetitionCardState) => state.subscriptions[activityId]
);
export const getLoading = createSelector(getCompetitionCardState, (state: CompetitionCardState) => state.loading);
