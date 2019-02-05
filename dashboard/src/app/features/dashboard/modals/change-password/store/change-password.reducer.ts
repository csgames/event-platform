import * as fromApp from "../../../../../store/app.reducers";
import { ChangePasswordActions, ChangePasswordActionTypes } from "./change-password.actions";
import { createFeatureSelector, select, createSelector } from "@ngrx/store";
import { GlobalState } from "../../../../../store/app.reducers";

export interface ChangePasswordState {
    loading: boolean;
    closing: boolean;
    error: boolean
}

const initialState: ChangePasswordState = {
    loading: false,
    closing: false,
    error: false
}

export interface State extends fromApp.State {
    changePassword: ChangePasswordState;
}

export function reducer(state = initialState, action: ChangePasswordActions): ChangePasswordState {
    switch(action.type) {
        case ChangePasswordActionTypes.PerformChangePassword:
            return {
                ...state,
                loading: true
            }
        case ChangePasswordActionTypes.PasswordChanged:
            return {
                ...state,
                loading: false,
                closing: true,
                error: false
            }
        case ChangePasswordActionTypes.ChangePasswordFailure:
            return {
                ...state,
                loading: false,
                closing: false,
                error: true
            }
        case ChangePasswordActionTypes.ResetStore:
            return initialState
    }
    return state;
}

export const getChangePasswordState = createFeatureSelector<State, ChangePasswordState>("changePassword");
export const getGlobalState = createFeatureSelector<State, GlobalState>("global");

export const getLoading = (state: ChangePasswordState) => state.loading;
export const getClosing = (state: ChangePasswordState) => state.closing;
export const getError = (state: ChangePasswordState) => state.error;

export const selectChangePassword = (selector: (state: ChangePasswordState) => any) =>
    select(
        createSelector(
            getChangePasswordState,
            selector
        )
    );
