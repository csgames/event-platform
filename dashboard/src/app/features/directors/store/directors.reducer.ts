import * as fromApp from "src/app/store/app.reducers";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Attendee } from "../../../api/models/attendee";
import { DirectorsActions, DirectorsActionTypes } from "./directors.actions";

export interface DirectorsState {
    attendees: Attendee[];
    loading: boolean;
}

const initialState: DirectorsState = {
    attendees: null,
    loading: false
};

export interface State extends fromApp.State {
    directors: DirectorsState;
}

export function reducer(state = initialState, action: DirectorsActions): DirectorsState {
    switch (action.type) {
        case DirectorsActionTypes.LoadDirectors:
            return {
                ...state,
                loading: true
            };
        case DirectorsActionTypes.DirectorsLoaded:
            return {
                ...state,
                loading: false,
                attendees: action.payload
            };
        case DirectorsActionTypes.AddDirector:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

export const getSponsorsState = createFeatureSelector<State, DirectorsState>("directors");

export const getAttendees = createSelector(getSponsorsState, (state: DirectorsState) => state.attendees);
export const getLoading = createSelector(getSponsorsState, (state: DirectorsState) => state.loading);
