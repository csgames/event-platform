import * as fromApp from "../../../../store/app.reducers";
import { InfoActivityActions, InfoActivityActionTypes } from "./info-activity.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface InfoActivityState {
    loading: boolean;
    subscribed: boolean;
}

const initialState: InfoActivityState = {
    loading: false,
    subscribed: false
};

export interface State extends fromApp.State {
    infoActivity: InfoActivityState;
}

export function reducer(state = initialState, action: InfoActivityActions): InfoActivityState {
    switch (action.type) {
        case InfoActivityActionTypes.CheckIfSubscribedToActivity:
            return {
                ...state
            };
        case InfoActivityActionTypes.SubscribeToActivity:
            return {
                ...state,
                loading: true
            };
        case InfoActivityActionTypes.SubscribedToActivity:
            return {
                ...state,
                subscribed: true,
                loading: false
            };
        case InfoActivityActionTypes.SubscriptionError:
            return {
                ...state,
                loading: false
            };
        case InfoActivityActionTypes.ResetStore:
            return initialState;
        default:
            return state;
    }
}

export const getInfoActivityState = createFeatureSelector<State, InfoActivityState>("infoActivity");

export const getSubscribed = createSelector(getInfoActivityState, (state: InfoActivityState) => state.subscribed);
export const getLoading = createSelector(getInfoActivityState, (state: InfoActivityState) => state.loading);
