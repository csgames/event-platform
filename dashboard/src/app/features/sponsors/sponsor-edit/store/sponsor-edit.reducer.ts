import { Sponsors } from "src/app/api/models/sponsors";
import * as fromApp from "../../../../store/app.reducers";
import { SponsorEditActions, SponsorEditActionTypes } from "./sponsor-edit.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface SponsorEditState {
    loading: boolean;
    addLoading: boolean;
    sponsors: { [tier: string]: Sponsors[] };
}

export const initialState: SponsorEditState = {
    loading: false,
    addLoading: false,
    sponsors: {}
};

export interface State extends fromApp.State {
    sponsorEdit: SponsorEditState;
}

export function reducer(state = initialState, action: SponsorEditActions): SponsorEditState {
    switch(action.type) {
        case SponsorEditActionTypes.LoadSponsors:
            return {
                ...state,
                addLoading: false,
                loading: true
            };
        case SponsorEditActionTypes.SponsorsLoaded:
            return {
                ...state,
                loading: false,
                addLoading: false,
                sponsors: action.sponsors
            };
        case SponsorEditActionTypes.AddSponsor:
            return {
                ...state,
                addLoading: true
            }
        default:
            return state;
    }
}

export const getSponsorEditState = createFeatureSelector<State, SponsorEditState>("sponsorEdit");

export const getSponsors = createSelector(getSponsorEditState, (state: SponsorEditState) => state.sponsors);
export const getLoading = createSelector(getSponsorEditState, (state: SponsorEditState) => state.loading);
export const getAddLoading = createSelector(getSponsorEditState, (state: SponsorEditState) => state.addLoading);
