import * as fromApp from "../../../store/app.reducers";
import { CreateEventModalActions, CreateEventModalActionTypes } from "./create-event-modal.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CreateEventModalState {
    loading: boolean;
    error: boolean;
    success: boolean;
}

export const initialState: CreateEventModalState = {
    loading: false,
    error: false,
    success: false
};

export interface State extends fromApp.State {
    createEventModal: CreateEventModalState;
}

export function reducer(state = initialState, action: CreateEventModalActions) {

    switch (action.type) {
        case CreateEventModalActionTypes.CreateEventSuccess:
            return {
                ...state,
                loading: false,
                success: true
            };
        case CreateEventModalActionTypes.CreateEventError:
            return {
                ...state,
                loading: false,
                error: true
            };
        case CreateEventModalActionTypes.CreateEvent:
            return {
                ...state,
                loading: true,
                error: false
            };
        case CreateEventModalActionTypes.ResetState:
            return initialState;
    }

    return state;
}

export const getCreateEventModalState = createFeatureSelector<State, CreateEventModalState>("createEventModal");

export const getCreateEventModalLoading = createSelector(getCreateEventModalState, state => state.loading);
export const getCreateEventModalError = createSelector(getCreateEventModalState, state => state.error);
export const getCreateEventModalSuccess = createSelector(getCreateEventModalState, state => state.loading);
