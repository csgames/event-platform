import { Flashout } from "src/app/api/models/flashout";
import * as fromApp from "src/app/store/app.reducers";
import { FlashoutActions, FlashoutActionTypes } from "./flashout.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface FlashoutState {
    flashouts: Flashout[];
    loading: boolean;
}

const initialState: FlashoutState = {
    flashouts: [],
    loading: false
};

export interface State extends fromApp.State {
    flashout: FlashoutState;
}

export function reducer(state = initialState, action: FlashoutActions): FlashoutState {
    switch (action.type) {
        case FlashoutActionTypes.LoadFlashouts:
            return {
                ...state,
                loading: true
            };
        case FlashoutActionTypes.FlashoutsLoaded:
            return {
                ...state,
                loading: false,
                flashouts: action.flashouts
            };
        case FlashoutActionTypes.VoteFlashouts:
            return {
                ...state,
                loading: true
            };
        case FlashoutActionTypes.FlashoutsVoted:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export const getFlashoutState = createFeatureSelector<State, FlashoutState>("flashout");

export const getFlashouts = createSelector(getFlashoutState, (state: FlashoutState) => state.flashouts);

export const getFlashoutLoading = createSelector(getFlashoutState, (state: FlashoutState) => state.loading);
