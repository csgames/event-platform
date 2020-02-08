import * as fromApp from "../../../../store/app.reducers";
import { EventSettingsActions, EditEventModalActionTypes } from "./event-settings.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface EventSettingsState {
    loading: boolean;
    error: boolean;
    success: boolean;
}

export const initialState: EventSettingsState = {
    loading: false,
    error: false,
    success: false
};

export interface State extends fromApp.State {
    eventSettings: EventSettingsState;
}

export function reducer(state = initialState, action: EventSettingsActions) {

    switch (action.type) {
        case EditEventModalActionTypes.EditEventSuccess:
            return {
                ...state,
                loading: false,
                success: true
            };
        case EditEventModalActionTypes.EditEventError:
            return {
                ...state,
                loading: false,
                error: true
            };
        case EditEventModalActionTypes.EditEvent:
            return {
                ...state,
                loading: true,
                error: false
            };
        case EditEventModalActionTypes.ResetState:
            return initialState;
    }

    return state;
}

export const getEditEventModalState = createFeatureSelector<State, EventSettingsState>("eventSettings");

export const getEditEventModalLoading = createSelector(getEditEventModalState, state => state.loading);
export const getEditEventModalError = createSelector(getEditEventModalState, state => state.error);
export const getEditEventModalSuccess = createSelector(getEditEventModalState, state => state.loading);
