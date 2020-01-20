import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromApp from "src/app/store/app.reducers";
import { Attendee } from "../../../api/models/attendee";
import { AttendeesActions, AttendeesActionTypes } from "./attendees.actions";

export interface AttendeesState {
    attendees: Attendee[];
    loading: boolean;
}

const initialState: AttendeesState = {
    attendees: null,
    loading: false
};

export interface State extends fromApp.State {
    attendees: AttendeesState;
}

export function reducer(state = initialState, action: AttendeesActions): AttendeesState {
    switch (action.type) {
        case AttendeesActionTypes.LoadAttendees:
        case AttendeesActionTypes.DownloadCsv:
        case AttendeesActionTypes.DownloadXlsx:
        case AttendeesActionTypes.DownloadResume:
        case AttendeesActionTypes.DownloadAllResume:
            return {
                ...state,
                loading: true
            };
        case AttendeesActionTypes.AttendeesLoaded:
            return {
                ...state,
                loading: false,
                attendees: action.payload
            };
        case AttendeesActionTypes.CsvDownloaded:
        case AttendeesActionTypes.XlsxDownloaded:
        case AttendeesActionTypes.ResumeDownloaded:
        case AttendeesActionTypes.AllResumeDownloaded:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export const getSponsorsState = createFeatureSelector<State, AttendeesState>("attendees");

export const getAttendees = createSelector(getSponsorsState, (state: AttendeesState) => state.attendees);
export const getLoading = createSelector(getSponsorsState, (state: AttendeesState) => state.loading);
