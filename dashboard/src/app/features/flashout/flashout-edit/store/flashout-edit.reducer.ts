import { Flashout } from "src/app/api/models/flashout";
import { School } from "src/app/api/models/school";
import * as fromApp from "../../../../store/app.reducers";
import { FlashoutEditActions, FlashoutEditActionTypes } from "./flashout-edit.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface FlashoutEditState {
    loading: boolean;
    addLoading: boolean;
    flashouts: Flashout[];
    schools: School[];
}

export const initialState: FlashoutEditState = {
    loading: false,
    addLoading: false,
    flashouts: [],
    schools: []
};

export interface State extends fromApp.State {
    flashoutEdit: FlashoutEditState;
}

export function reducer(state = initialState, action: FlashoutEditActions): FlashoutEditState {
    switch (action.type) {
        case FlashoutEditActionTypes.LoadFlashouts:
            return {
                ...state,
                addLoading: false,
                loading: true
            };
        case FlashoutEditActionTypes.FlashoutsLoaded:
            return {
                ...state,
                loading: false,
                addLoading: false,
                flashouts: action.flashouts
            };
        case FlashoutEditActionTypes.SchoolsLoaded:
            return {
                ...state,
                schools: action.schools
            };
        case FlashoutEditActionTypes.AddFlashout:
            return {
                ...state,
                addLoading: true
            };
        default:
            return state;
    }
}

export const getFlashoutEditState = createFeatureSelector<State, FlashoutEditState>("flashoutEdit");

export const getFlashouts = createSelector(getFlashoutEditState, (state: FlashoutEditState) => state.flashouts);
export const getSchools = createSelector(getFlashoutEditState, (state: FlashoutEditState) => state.schools);
export const getLoading = createSelector(getFlashoutEditState, (state: FlashoutEditState) => state.loading);
export const getAddLoading = createSelector(getFlashoutEditState, (state: FlashoutEditState) => state.addLoading);
