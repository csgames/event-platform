import { RegisterActions, RegisterActionTypes } from "./register.actions";
import { Registration } from "../../../api/models/registration";
import * as fromApp from "../../../store/app.reducers";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface RegisterState {
    loading: boolean;
    error: boolean;
    registration: Registration;
}

export const initialState: RegisterState = {
    loading: false,
    error: false,
    registration: null
};

export interface State extends fromApp.State {
    register: RegisterState;
}

export function reducer(state = initialState, action: RegisterActions): RegisterState {
    switch (action.type) {
        case RegisterActionTypes.LoadRegistration:
            return {
                ...state,
                loading: true,
                error: false
            };
        case RegisterActionTypes.RegistrationLoaded:
            return {
                ...state,
                registration: action.registrationInfo,
                error: false
            };
        case RegisterActionTypes.RegistrationError:
            return {
                ...state,
                error: true
            };

    }
    return state;
}

export const getRegisterState = createFeatureSelector<State, RegisterState>("register");

export const getRegisterLoading = createSelector(getRegisterState, (state: RegisterState) => state.loading);

export const getRegisterError = createSelector(getRegisterState, (state: RegisterState) => state.error);

export const getRegisterRegistrationInfo = createSelector(getRegisterState, (state: RegisterState) => state.registration);
