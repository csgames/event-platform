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
        case OnboardingActionTypes.OnboardAttendee:
            return {
                ...state,
                loading: true
            };
        case OnboardingActionTypes.OnboardSuccess:
            return {
                ...state,
                error: false
            };
        case OnboardingActionTypes.OnboardFailure:
            return {
                ...state,
                error: true,
                loading: false
            };
        case OnboardingActionTypes.DownloadCv:
            return {
                ...state,
                loading: true
            };
        case OnboardingActionTypes.CvDownloaded:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export const getOnboardingState = createFeatureSelector<State, OnboardingState>("onboarding");
export const getLoading = createSelector(getOnboardingState, (state: OnboardingState) => state.loading);
export const getError = createSelector(getOnboardingState, (state: OnboardingState) => state.error);
