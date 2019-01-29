import * as fromApp from "../../../store/app.reducers";
import { ResetActions, ResetActionTypes } from "./reset.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface ResetState {
    loading: boolean;
    resetError: boolean;
    validateError: boolean;
}

const initialState: ResetState = {
    loading: false,
    resetError: false,
    validateError: false
}

export interface State extends fromApp.State {
    reset: ResetState;
}

export function reducer(state = initialState, action: ResetActions): ResetState {
    switch(action.type) {
        case ResetActionTypes.PerformReset:
            return {
                ...state,
                loading: true
            };
        case ResetActionTypes.PerformValidate:
            return {
                ...state,
                loading: true
            };
        case ResetActionTypes.ResetFailure:
            return {
                ...state,
                loading: false,
                resetError: true
            }
        case ResetActionTypes.ResetSuccess:
            return {
                ...state,
                loading: false,
                resetError: false
            };
        case ResetActionTypes.ValidateFailure:
            return {
                ...state,
                loading: false,
                validateError: true
            };
        default:
            return state;
    }
}

export const getResetState = createFeatureSelector<State, ResetState>('reset');

export const getResetLoading = createSelector(getResetState, (state: ResetState) => state.loading);

export const getResetError = createSelector(getResetState, (state: ResetState) => state.resetError);

export const getValidateError = createSelector(getResetState, (state: ResetState) => state.validateError);