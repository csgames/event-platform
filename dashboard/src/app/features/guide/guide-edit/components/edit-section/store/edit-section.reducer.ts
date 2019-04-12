import * as fromApp from "../../../../../../store/app.reducers";
import { EditSectionActions, EditSectionActionTypes } from "./edit-section.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface EditSectionState {
    loading: boolean;
    error: boolean;
    success: boolean;
}

export const initialState: EditSectionState = {
    loading: false,
    error: false,
    success: false
};

export interface State extends fromApp.State {
    guideEditSection: EditSectionState;
}

export function reducer(state = initialState, action: EditSectionActions) {
    switch (action.type) {
        case EditSectionActionTypes.ResetState:
            return initialState;
        case EditSectionActionTypes.EditSection:
            return {
                ...state,
                loading: true,
                error: false,
                success: false
            };
        case EditSectionActionTypes.EditSectionSuccess:
            return {
                ...state,
                loading: false,
                success: true,
                error: false
            };
        case EditSectionActionTypes.EditSectionError:
            return {
                ...state,
                loading: false,
                error: true
            };
    }

    return state;
}

export const getGuideEditSectionState = createFeatureSelector<State, EditSectionState>("guideEditSection");

export const getGuideEditSectionLoading = createSelector(getGuideEditSectionState, (state: EditSectionState) => state.loading);
export const getGuideEditSectionError = createSelector(getGuideEditSectionState, (state: EditSectionState) => state.error);
export const getGuideEditSectionSuccess = createSelector(getGuideEditSectionState, (state: EditSectionState) => state.success);
