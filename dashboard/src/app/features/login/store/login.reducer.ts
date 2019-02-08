import * as fromApp from "../../../store/app.reducers";
import { LoginActions, LoginActionTypes } from "./login.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface LoginState {
    loading: boolean;
    error: boolean;
}

const initialState: LoginState = {
    loading: false,
    error: false
};

export interface State extends fromApp.State {
    login: LoginState;
}

export function reducer(state = initialState, action: LoginActions): LoginState {
    switch (action.type) {
        case LoginActionTypes.PerformLogin:
            return {
                ...state,
                loading: true
            };
        case LoginActionTypes.LoginFailure:
            return {
                ...state,
                loading: false,
                error: true
            };
        case LoginActionTypes.LoginSuccess:
            return {
                ...state,
                error: false
            };
        case LoginActionTypes.ResetError:
            return {
                ...state,
                error: false
            };
        case LoginActionTypes.ResetStore:
            return {
                ...initialState
            };
        default:
            return state;
    }
}

export const getLoginState = createFeatureSelector<State, LoginState>("login");

export const getLoginLoading = createSelector(getLoginState, (state: LoginState) => state.loading);

export const getLoginError = createSelector(getLoginState, (state: LoginState) => state.error);
