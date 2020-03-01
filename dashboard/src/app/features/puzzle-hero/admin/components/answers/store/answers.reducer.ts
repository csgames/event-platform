import * as fromApp from "../../../../../../store/app.reducers";
import { AnswerActions, AnswerActionTypes } from "./answers.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface AnswerState {
    loading: boolean;
    error: boolean;
    file: { type: string, url: string };
}

export const initialState: AnswerState = {
    loading: false,
    error: false,
    file: null
};

export interface State extends fromApp.State {
    answer: AnswerState;
}

export function reducer(state = initialState, action: AnswerActions) {
    switch (action.type) {
        case AnswerActionTypes.ResetState:
            return initialState;
        case AnswerActionTypes.LoadFile:
            return {
                ...state,
                loading: true,
                error: false
            };
        case AnswerActionTypes.FileLoaded:
            return {
                ...state,
                loading: false,
                file: action.file
            };
        case AnswerActionTypes.AcceptAnswer:
            return {
                ...state,
                loading: true
            };
        case AnswerActionTypes.AnswerAccepted:
            return {
                ...state,
                loading: false
            };
        case AnswerActionTypes.RefuseAnswer:
            return {
                ...state,
                loading: true
            };
        case AnswerActionTypes.AnswerRefused:
            return {
                ...state,
                loading: false
            };
    }

    return state;
}

export const getPuzzleHeroAnswerState = createFeatureSelector<State, AnswerState>("answer");

export const getPuzzleHeroAnswerLoading = createSelector(getPuzzleHeroAnswerState, (state: AnswerState) => state.loading);
export const getPuzzleHeroAnswerError = createSelector(getPuzzleHeroAnswerState, (state: AnswerState) => state.error);
export const getPuzzleHeroAnswerFile = createSelector(getPuzzleHeroAnswerState, (state: AnswerState) => state.file);
