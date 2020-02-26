import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromApp from "../../../../../../store/app.reducers";
import { UpdateQuestionActions, UpdateQuestionActionTypes } from "./update-question.actions";

export interface UpdateQuestionState {
    loading: boolean;
    success: boolean;
    error: boolean;
}

export const initialState: UpdateQuestionState = {
    loading: false,
    success: false,
    error: false
};

export interface State extends fromApp.State {
    updateQuestion: UpdateQuestionState;
}

export function reducer(state = initialState, action: UpdateQuestionActions): UpdateQuestionState {
    switch (action.type) {
        case UpdateQuestionActionTypes.UpdateQuestion:
            return {
                ...state,
                loading: true
            };

        case UpdateQuestionActionTypes.QuestionUpdated:
            return {
                ...state,
                loading: false,
                success: true
            };

        case UpdateQuestionActionTypes.UpdateQuestionError:
            return {
                ...state,
                loading: false
            };

        case UpdateQuestionActionTypes.ResetStore:
            return initialState;
    }

    return state;
}

export const getUpdateQuestionState = createFeatureSelector<State, UpdateQuestionState>("updateQuestion");

export const getUpdateQuestionLoading = createSelector(
    getUpdateQuestionState,
    (state: UpdateQuestionState) => state.loading
);

export const getUpdateQuestionError = createSelector(
    getUpdateQuestionState,
    (state: UpdateQuestionState) => state.error
);

export const getUpdateQuestionSuccess = createSelector(
    getUpdateQuestionState,
    (state: UpdateQuestionState) => state.success
);

