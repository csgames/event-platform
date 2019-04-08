import * as fromApp from "../../../../../store/app.reducers";
import { UpdateSponsorPositionningActionTypes, UpdateSponsorPositionningActions } from "./update-sponsor-positionning.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface UpdateSponsorPositionningState {
    loading: boolean;
    success: boolean;
}

export const initialState: UpdateSponsorPositionningState = {
    loading: false,
    success: false
};

export interface State extends fromApp.State {
    updateSponsorPositionning: UpdateSponsorPositionningState;
}

export function reducer(state = initialState, action: UpdateSponsorPositionningActions): UpdateSponsorPositionningState {
    switch (action.type) {
        case UpdateSponsorPositionningActionTypes.ResetState:
            return initialState;
        case UpdateSponsorPositionningActionTypes.UpdatePositionning:
            return {
                ...state,
                loading: true,
                success: false
            };
        case UpdateSponsorPositionningActionTypes.UpdatePositionningSuccess:
            return {
                ...state,
                loading: false,
                success: true
            };
    }

    return state;
}

export const getUpdateSponsorPositionningState = createFeatureSelector<State, UpdateSponsorPositionningState>("updateSponsorPositionning");

export const getLoading = createSelector(getUpdateSponsorPositionningState, (state: UpdateSponsorPositionningState) => state.loading);
export const getSucces = createSelector(getUpdateSponsorPositionningState, (state: UpdateSponsorPositionningState) => state.success);
