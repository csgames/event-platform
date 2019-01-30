import { ActionReducerMap, createFeatureSelector, createSelector, select } from "@ngrx/store";
import { ProfileSettingActions, ProfileSettingActionTypes } from "./profile-setting.actions";
import * as fromApp from "../../../../../store/app.reducers";
import { GlobalState } from "../../../../../store/app.reducers";

export interface ProfileSettingGlobalState {
    loading: boolean;
    saving: boolean;
}

export interface ProfileSettingState {
    global: ProfileSettingGlobalState;
}

export interface State extends fromApp.State {
    profileSetting: ProfileSettingState;
}

export const reducers: ActionReducerMap<ProfileSettingState> = {
    global: profileSettingGlobalReducerReducer
};

export const initialState: ProfileSettingGlobalState = {
    loading: false,
    saving: false
};

export function profileSettingGlobalReducerReducer(state = initialState, action: ProfileSettingActions): ProfileSettingGlobalState {
    switch (action.type) {
        case ProfileSettingActionTypes.LoadModal:
            return {
                ...state,
                loading: true
            };
        case ProfileSettingActionTypes.DownloadCv:
            return {
                ...state,
                loading: true
            };
        case ProfileSettingActionTypes.CvDownloaded:
            return {
                ...state,
                loading: false
            };
        case ProfileSettingActionTypes.UpdateAttendee:
            return {
                ...state,
                saving: true
            };
        case ProfileSettingActionTypes.AttendeeUpdated:
            return {
                ...state,
                saving: false
            };
    }
    return state;
}

export const getProfileSettingState = createFeatureSelector<State, ProfileSettingState>("profileSetting");
export const getGlobalState = createFeatureSelector<State, GlobalState>("global");
export const getProfileSettingGlobalState = createSelector(
    getProfileSettingState,
    (state: ProfileSettingState) => state.global
);

export const getLoading = (state: ProfileSettingGlobalState) => state.loading;
export const getSaving = (state: ProfileSettingGlobalState) => state.saving;
export const getCurrentAttendee = (state: GlobalState) => state.currentAttendee;

export const selectProfileSettingGlobal = (selector: (state: ProfileSettingGlobalState) => any) =>
    select(
        createSelector(
            getProfileSettingGlobalState,
            selector
        )
    );
export const selectGlobal = (selector: (state: GlobalState) => any) =>
    select(
        createSelector(
            getGlobalState,
            selector
        )
    );

