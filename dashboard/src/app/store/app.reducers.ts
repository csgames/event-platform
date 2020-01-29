import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { Attendee } from "../api/models/attendee";
import { Event } from "../api/models/event";
import { PuzzleHeroInfo } from "../api/models/puzzle-hero";
import { AppActions, AppActionTypes } from "./app.actions";
import { Competition } from "../api/models/competition";

export interface GlobalState {
    currentAttendee: Attendee;
    events: Event[];
    currentEvent: Event;
    loading: boolean;
    language: string;
    unseen: boolean;
    puzzleHeroInfo: PuzzleHeroInfo;
    registeredCompetitions: Competition[];
}

export interface State {
    global: GlobalState;
}

export const appReducers: ActionReducerMap<State> = {
    global: globalReducer
};

export const initialState: GlobalState = {
    currentAttendee: null,
    events: [],
    currentEvent: null,
    loading: true,
    language: null,
    unseen: false,
    puzzleHeroInfo: null,
    registeredCompetitions: []
};

export function globalReducer(state = initialState, action: AppActions): GlobalState {
    switch (action.type) {
        case AppActionTypes.ChangeLanguage:
            return {
                ...state,
                language: action.payload
            };
        case AppActionTypes.CurrentAttendeeLoaded:
            return {
                ...state,
                currentAttendee: action.payload
            };
        case AppActionTypes.Logout:
            return {
                ...state,
                currentAttendee: null
            };
        case AppActionTypes.LoadEvents:
            return {
                ...state,
                loading: true
            };
        case AppActionTypes.EventsLoaded:
            return {
                ...state,
                events: action.events || []
            };
        case AppActionTypes.AppLoaded:
            return {
                ...state,
                loading: false
            };
        case AppActionTypes.SetCurrentEvent:
            return {
                ...state,
                currentEvent: action.event,
                loading: true
            };
        case AppActionTypes.CheckUnseenNotification:
            return {
                ...state,
            };
        case AppActionTypes.HasUnseenNotification:
            return {
                ...state,
                unseen: true
            };
        case AppActionTypes.AllNotificationsSeen:
            return {
                ...state,
                unseen: false
            };
        case AppActionTypes.UpdatePuzzleHeroStatus:
            return {
                ...state,
                puzzleHeroInfo: action.payload
            };
        case AppActionTypes.LoadRegisteredCompetitions:
            return {
                ...state,
                loading: true
            };
        case AppActionTypes.RegisteredCompetitionsLoaded:
            return {
                ...state,
                loading: false,
                registeredCompetitions: action.payload
            };
    }
    return state;
}

export const appMetaReducers: MetaReducer<State>[] = !environment.production
    ? []
    : [];

export const getGlobalState = createFeatureSelector<State, GlobalState>("global");

export const getLoading = createSelector(getGlobalState, (state: GlobalState) => state.loading);

export const getCurrentAttendee = createSelector(
    getGlobalState,
    (state: GlobalState) => state.currentAttendee
);

export const getEvents = createSelector(getGlobalState, (state: GlobalState) => state.events);

export const getCurrentEvent = createSelector(getGlobalState, (state: GlobalState) => state.currentEvent);

export const getCurrentLanguage = createSelector(getGlobalState, (state: GlobalState) => state.language);

export const getUnseen = createSelector(getGlobalState, (state: GlobalState) => state.unseen);

export const getPuzzleHeroInfo = createSelector(getGlobalState, (state: GlobalState) => state.puzzleHeroInfo);

export const getRegisteredCompetitions = createSelector(getGlobalState, (state: GlobalState) => state.registeredCompetitions);
