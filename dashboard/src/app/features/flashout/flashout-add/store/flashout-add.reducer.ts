import { Flashout } from "src/app/api/models/flashout";
import { School } from "src/app/api/models/school";
import * as fromApp from "../../../../store/app.reducers";
import { FlashoutAddActions, FlashoutAddActionTypes } from "./flashout-add.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface FlashoutAddState {
    loading: boolean;
    flashouts: Flashout[],
    schools: School[]
}

export const initialState: FlashoutAddState = {
    loading: false,
    flashouts: [],
    schools: []
}

export interface State extends fromApp.State {
    flashoutAdd: FlashoutAddState;
}

export function reducer(state = initialState, action: FlashoutAddActions): FlashoutAddState {
    switch(action.type) {
        case FlashoutAddActionTypes.LoadFlashouts:
            return {
                ...state,
                loading: true,
                flashouts: []
            }
        case FlashoutAddActionTypes.FlashoutsLoaded:
            return {
                ...state,
                loading: false,
                flashouts: action.flashouts
            }
        case FlashoutAddActionTypes.SchoolsLoaded:
            return {
                ...state,
                schools: action.schools
            };
        case FlashoutAddActionTypes.AddFlashout:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export const getFlashoutAddState = createFeatureSelector<State, FlashoutAddState>("flashoutAdd");

export const getFlashouts = createSelector(getFlashoutAddState, (state: FlashoutAddState) => state.flashouts);
export const getSchools = createSelector(getFlashoutAddState, (state: FlashoutAddState) => state.schools);
export const getLoading = createSelector(getFlashoutAddState, (state: FlashoutAddState) => state.loading);
