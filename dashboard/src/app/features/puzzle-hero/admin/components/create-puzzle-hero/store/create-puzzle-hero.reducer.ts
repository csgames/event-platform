import * as fromApp from "../../../../../../store/app.reducers";
import { CreatePuzzleActions, CreatePuzzleActionTypes } from "./create-puzzle-hero.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CreatePuzzleState {
    loading: boolean;
    error: boolean;
    success: boolean;
}

export const initialState: CreatePuzzleState = {
    loading: false,
    error: false,
    success: false
};

export interface State extends fromApp.State {
    puzzleHeroCreatePuzzle: CreatePuzzleState;
}

export function reducer(state = initialState, action: CreatePuzzleActions) {
    switch (action.type) {
        case CreatePuzzleActionTypes.ResetState:
            return initialState;
        case CreatePuzzleActionTypes.CreatePuzzle:
            return {
                ...state,
                loading: true,
                error: false,
                success: false
            };
        case CreatePuzzleActionTypes.CreatePuzzleSuccess:
            return {
                ...state,
                loading: false,
                success: true,
                error: false
            };
        case CreatePuzzleActionTypes.CreatePuzzleError:
            return {
                ...state,
                loading: false,
                error: true
            };
    }

    return state;
}

export const getPuzzleHeroCreatePuzzleState = createFeatureSelector<State, CreatePuzzleState>("puzzleHeroCreatePuzzle");

export const getPuzzleHeroCreatePuzzleLoading = createSelector(getPuzzleHeroCreatePuzzleState, (state: CreatePuzzleState) => state.loading);
export const getPuzzleHeroCreatePuzzleError = createSelector(getPuzzleHeroCreatePuzzleState, (state: CreatePuzzleState) => state.error);
export const getPuzzleHeroCreatePuzzleSuccess = createSelector(getPuzzleHeroCreatePuzzleState, (state: CreatePuzzleState) => state.success);
