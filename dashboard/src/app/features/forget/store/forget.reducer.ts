import * as fromApp from "../../../store/app.reducers";
import { ForgetActions, ForgetActionTypes } from "./forget.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface ForgetState {
    loading: boolean;
    error: boolean;
}

const initialState: ForgetState = {
    loading: false,
    error: false
};

export interface State extends fromApp.State {
    forget: ForgetState;
}

export function reducer(state = initialState, action: ForgetActions): ForgetState {
    switch (action.type) {
        case ForgetActionTypes.PerformForget:
            return {
                ...state,
                loading: true
            };
        case ForgetActionTypes.ForgetFailure:
            return {
                ...state,
                loading: false,
                error: true
            };
        case ForgetActionTypes.ForgetSuccess:
            return {
                ...state,
                loading: false,
                error: false
            };
        default:
            return state;
    }
}

export const getForgetState = createFeatureSelector<State, ForgetState>("forget");

export const getForgetLoading = createSelector(getForgetState, (state: ForgetState) => state.loading);

export const getForgetError = createSelector(getForgetState, (state: ForgetState) => state.error);
