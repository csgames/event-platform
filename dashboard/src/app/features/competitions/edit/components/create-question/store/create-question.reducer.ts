import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromApp from "../../../../../../store/app.reducers";
import { CreateQuestionActions, CreateQuestionActionTypes } from "./create-question.actions";

export interface CreateQuestionState {
    loading: boolean;
    success: boolean;
    error: boolean;
}

export const initialState: CreateQuestionState = {
    loading: false,
    success: false,
    error: false
};

export interface State extends fromApp.State {
    createQuestion: CreateQuestionState;
}

export function reducer(state = initialState, action: CreateQuestionActions): CreateQuestionState {
    switch (action.type) {
        case CreateQuestionActionTypes.CreateQuestion:
            return {
                ...state,
                loading: true
            };

        case CreateQuestionActionTypes.QuestionCreated:
            return {
                ...state,
                loading: false,
                success: true
            };

        case CreateQuestionActionTypes.CreateQuestionError:
            return {
                ...state,
                loading: false
            };

        case CreateQuestionActionTypes.ResetStore:
            return initialState;
    }

    return state;
}

export const getCreateQuestionState = createFeatureSelector<State, CreateQuestionState>("createQuestion");

export const getCreateQuestionLoading = createSelector(
    getCreateQuestionState,
    (state: CreateQuestionState) => state.loading
);

export const getCreateQuestionError = createSelector(
    getCreateQuestionState,
    (state: CreateQuestionState) => state.error
);

export const getCreateQuestionSuccess = createSelector(
    getCreateQuestionState,
    (state: CreateQuestionState) => state.success
);

