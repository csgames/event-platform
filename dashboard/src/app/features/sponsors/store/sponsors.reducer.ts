import { Sponsors } from "src/app/api/models/sponsors";
import * as fromApp from "src/app/store/app.reducers";
import { SponsorsActions, SponsorsActionTypes } from "./sponsors.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface SponsorsState {
    sponsors: { [id: string] : Sponsors[] };
    loading: boolean;
}

const initialState: SponsorsState = {
    sponsors: {},
    loading: false
};

export interface State extends fromApp.State {
    sponsors: SponsorsState;
}

export function reducer(state = initialState, action: SponsorsActions): SponsorsState {
    switch (action.type) {
        case SponsorsActionTypes.LoadSponsors:
            return {
                ...state,
                loading: true
            };
        case SponsorsActionTypes.SponsorsLoaded:
            return {
                ...state,
                loading: false,
                sponsors: action.sponsors
            }
        default:
            return state;
    }
}

export const getSponsorsState = createFeatureSelector<State, SponsorsState>("sponsors");

export const getSponsors = createSelector(getSponsorsState, (state: SponsorsState) => state.sponsors);

export const getSponsorsLoading = createSelector(getSponsorsState, (state: SponsorsState) => state.loading);
