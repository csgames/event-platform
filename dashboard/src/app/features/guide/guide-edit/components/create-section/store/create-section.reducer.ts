import * as fromApp from "../../../../../../store/app.reducers";
import { CreateSectionActions, CreateSectionActionTypes } from "./create-section.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CreateSectionState {
    loading: boolean;
    error: boolean;
    success: boolean;
}

export const initialState: CreateSectionState = {
    loading: false,
    error: false,
    success: false
};

export interface State extends fromApp.State {
    guideCreateSection: CreateSectionState;
}

export function reducer(state = initialState, action: CreateSectionActions) {
    switch (action.type) {
        case CreateSectionActionTypes.ResetState:
            return initialState;
        case CreateSectionActionTypes.CreateSection:
            return {
                ...state,
                loading: true,
                error: false,
                success: false
            };
        case CreateSectionActionTypes.CreateSectionSuccess:
            return {
                ...state,
                loading: false,
                success: true,
                error: false
            };
        case CreateSectionActionTypes.CreateSectionError:
            return {
                ...state,
                loading: false,
                error: true
            };
    }

    return state;
}

export const getGuideCreateSectionState = createFeatureSelector<State, CreateSectionState>("guideCreateSection");

export const getGuideCreateSectionLoading = createSelector(getGuideCreateSectionState, (state: CreateSectionState) => state.loading);
export const getGuideCreateSectionError = createSelector(getGuideCreateSectionState, (state: CreateSectionState) => state.error);
export const getGuideCreateSectionSuccess = createSelector(getGuideCreateSectionState, (state: CreateSectionState) => state.success);
