import { Sponsors } from "src/app/api/models/sponsors";
import * as fromApp from "src/app/store/app.reducers";
import { SponsorsViewActions, SponsorsViewActionTypes } from "./sponsors-view.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface SponsorsViewState {
    sponsors: { [tier: string]: Sponsors[] };
    loading: boolean;
}

const initialState: SponsorsViewState = {
    sponsors: {},
    loading: false
};

export interface State extends fromApp.State {
    sponsors: SponsorsViewState;
}

export function reducer(state = initialState, action: SponsorsViewActions): SponsorsViewState {
    switch (action.type) {
        case SponsorsViewActionTypes.LoadSponsors:
            return {
                ...state,
                loading: true
            };
        case SponsorsViewActionTypes.SponsorsLoaded:
            return {
                ...state,
                loading: false,
                sponsors: action.sponsors
            };
        default:
            return state;
    }
}

export const getSponsorsViewState = createFeatureSelector<State, SponsorsViewState>("sponsors");

export const getSponsors = createSelector(getSponsorsViewState, (state: SponsorsViewState) => state.sponsors);

export const getSponsorsLoading = createSelector(getSponsorsViewState, (state: SponsorsViewState) => state.loading);
