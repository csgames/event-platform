import * as fromApp from "src/app/store/app.reducers";
import { OnboardingActions, OnboardingActionTypes } from "./onboarding.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface OnboardingState {
    error: boolean;
    loading: boolean;
}

const initialState: OnboardingState = {
    error: false,
    loading: false
};

export interface State extends fromApp.State {
    onboarding: OnboardingState;
}

export function reducer(state = initialState, action: OnboardingActions): OnboardingState {
    switch (action.type) {
        case OnboardingActionTypes.UpdateAttendee:
            return {
                ...state,
                loading: true
            };
        case OnboardingActionTypes.UpdateSuccess:
            return {
                ...state,
                error: false,
                loading: false
            };
        case OnboardingActionTypes.UpdateFailure:
            return {
                ...state,
                error: true,
                loading: false
            }
        default:
            return state;
    }
}

export const getOnboardingState = createFeatureSelector<State, OnboardingState>("onboarding");

export const getOnboardingLoading = createSelector(getOnboardingState, (state: OnboardingState) => state.loading);

export const getOnboardingError = createSelector(getOnboardingState, (state: OnboardingState) => state.error);
