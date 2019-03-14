import * as fromApp from "../../../../../store/app.reducers";
import { FlashoutSettingsActionTypes, FlashoutsSettingsActions } from "./flashout-settings.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface FlashoutSettingsState {
    loading: boolean;
    error: boolean;
    success: boolean;
}

export const initialState: FlashoutSettingsState = {
    loading: false,
    error: false,
    success: false
};

export interface State extends fromApp.State {
    flashoutSettings: FlashoutSettingsState;
}

export function reducer(state = initialState, action: FlashoutsSettingsActions): FlashoutSettingsState {
    switch (action.type) {
        case FlashoutSettingsActionTypes.ResetState:
            return initialState;
        case FlashoutSettingsActionTypes.SaveSettings:
            return {
                ...state,
                loading: true,
                error: false
            };
        case FlashoutSettingsActionTypes.SaveSettingsSuccess:
            return {
                ...state,
                loading: false,
                success: true,
                error: false
            };
        case FlashoutSettingsActionTypes.SaveSettingsError:
            return {
                ...state,
                success: false,
                error: true,
                loading: false
            };
    }

    return state;
}

export const getFlashoutSettingsState = createFeatureSelector<State, FlashoutSettingsState>("flashoutSettings");

export const getFlashoutSettingsLoading = createSelector(getFlashoutSettingsState, (state: FlashoutSettingsState) => state.loading);
export const getFlashoutSettingsError = createSelector(getFlashoutSettingsState, (state: FlashoutSettingsState) => state.error);
export const getFlashoutSettingsSucess = createSelector(getFlashoutSettingsState, (state: FlashoutSettingsState) => state.success);
