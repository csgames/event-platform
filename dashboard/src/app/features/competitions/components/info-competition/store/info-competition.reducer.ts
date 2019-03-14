import * as fromApp from "../../../../../store/app.reducers";
import { InfoCompetitionActions, InfoCompetitionActionTypes } from "./info-competition.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface InfoCompetitionState {
    loading: boolean;
    error: boolean;
    success: boolean;
}

export const initialState: InfoCompetitionState = {
    loading: false,
    error: false,
    success: false
};

export interface State extends fromApp.State {
    infoCompetition: InfoCompetitionState;
}

export function reducer(state = initialState, action: InfoCompetitionActions): InfoCompetitionState {
    switch (action.type) {
        case InfoCompetitionActionTypes.ResetState:
            return initialState;
        case InfoCompetitionActionTypes.ValidatePassword:
            return {
                ...state,
                loading: true,
                error: false
            };

        case InfoCompetitionActionTypes.ValidatePasswordSuccess:
            return {
                ...state,
                loading: false,
                success: true,
                error: false
            };

        case InfoCompetitionActionTypes.ValidatePasswordFailure:
            return {
                ...state,
                loading: false,
                success: false,
                error: true
            };
    }

    return state;
}

export const getInfoCompetitionState = createFeatureSelector<State, InfoCompetitionState>("infoCompetition");

export const getInfoCompetitionSuccess = createSelector(getInfoCompetitionState, (state: InfoCompetitionState) => state && state.success);
export const getInfoCompetitionLoading = createSelector(getInfoCompetitionState, (state: InfoCompetitionState) => state && state.loading);
export const getInfoCompetitionError = createSelector(getInfoCompetitionState, (state: InfoCompetitionState) => state && state.error);
