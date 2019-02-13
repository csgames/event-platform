import * as fromApp from "../../../store/app.reducers";
import { GuideActions, GuideActionTypes } from "./guide.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EventGuide } from "src/app/api/models/guide";

export interface GuideState {
    loading: boolean;
    guide: EventGuide;
}

const initialState: GuideState = {
    loading: false,
    guide: null
}

export interface State extends fromApp.State {
    guide: GuideState;
}

export function reducer(state = initialState, action: GuideActions): GuideState {
    switch(action.type) {
        case GuideActionTypes.GuideLoaded:
            return {
                ...state,
                guide: action.guide,
                loading: false
            };
        case GuideActionTypes.LoadGuide:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export const getGuideState = createFeatureSelector<State, GuideState>('guide');

export const getGuideLoading = createSelector(getGuideState, (state: GuideState) => state.loading);

export const getGuide = createSelector(getGuideState, (state: GuideState) => state.guide);

