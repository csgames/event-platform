import * as fromApp from "../../../../store/app.reducers";
import { GuideEditActions, GuideEditActionTypes } from "./guide-edit.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EventGuide } from "src/app/api/models/guide";

export interface GuideEditState {
    loading: boolean;
    guide: EventGuide;
}

const initialState: GuideEditState = {
    loading: false,
    guide: null
};

export interface State extends fromApp.State {
    guideEdit: GuideEditState;
}

export function reducer(state = initialState, action: GuideEditActions): GuideEditState {
    switch (action.type) {
        case GuideEditActionTypes.GuideEditLoaded:
            return {
                ...state,
                guide: action.guide,
                loading: false
            };
        case GuideEditActionTypes.LoadGuideEdit:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

export const getGuideState = createFeatureSelector<State, GuideEditState>("guideEdit");

export const getGuideLoading = createSelector(getGuideState, (state: GuideEditState) => state.loading);

export const getGuide = createSelector(getGuideState, (state: GuideEditState) => state.guide);
