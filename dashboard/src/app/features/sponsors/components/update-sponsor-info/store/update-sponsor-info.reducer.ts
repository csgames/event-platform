import * as fromApp from "../../../../../store/app.reducers";
import { UpdateSponsorInfoActions, UpdateSponsorInfoActionTypes } from "./update-sponsor-info.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface UpdateSponsorInfoState {
    loading: boolean;
    success: boolean;
}

export const initialState: UpdateSponsorInfoState = {
    loading: false,
    success: false
};

export interface State extends fromApp.State {
    updateSponsorInfo: UpdateSponsorInfoState;
}

export function reducer(state = initialState, action: UpdateSponsorInfoActions): UpdateSponsorInfoState {
    switch (action.type) {
        case UpdateSponsorInfoActionTypes.ResetState:
            return initialState;
        case UpdateSponsorInfoActionTypes.UpdateSponsorInfo:
            return {
                ...state,
                loading: true,
                success: false
            };
        case UpdateSponsorInfoActionTypes.UpdateSponsorInfoSuccess:
            return {
                ...state,
                loading: false,
                success: true
            };
    }

    return state;
}

export const getUpdateSponsorInfoState = createFeatureSelector<State, UpdateSponsorInfoState>("updateSponsorInfo");

export const getLoading = createSelector(getUpdateSponsorInfoState, (state: UpdateSponsorInfoState) => state.loading);
export const getSuccess = createSelector(getUpdateSponsorInfoState, (state: UpdateSponsorInfoState) => state.success);
