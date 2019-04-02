import * as fromApp from "../../../../../../store/app.reducers";
import { CompetitionSettingsActions, CompetitionSettingsActionTypes } from "./competition-settings.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CompetitionSettingsState {
    loading: boolean;
    error: boolean;
    success: boolean;
}

export const initialState: CompetitionSettingsState = {
    loading: false,
    error: false,
    success: false
};

export interface State extends fromApp.State {
    competitionSettings: CompetitionSettingsState;
}

export function reducer(state = initialState, action: CompetitionSettingsActions): CompetitionSettingsState {
    switch (action.type) {
        case CompetitionSettingsActionTypes.ResetCompetitionSettingsState:
            return initialState;
        case CompetitionSettingsActionTypes.SaveCompetitionSettings:
            return {
                ...state,
                loading: true,
                error: false
            };
        case CompetitionSettingsActionTypes.SaveCompetitionSettingsSuccess:
            return {
                ...state,
                loading: false,
                success: true,
                error: false
            };
        case CompetitionSettingsActionTypes.SaveCompetitionSettingsError:
            return {
                ...state,
                success: false,
                error: true,
                loading: false
            };
    }
    return state;
}

export const getCompetitionSettingsState = createFeatureSelector<State, CompetitionSettingsState>("competitionSettings");

export const getCompetitionSettingsLoading =
    createSelector(getCompetitionSettingsState, (state: CompetitionSettingsState) => state.loading);
export const getCompetitionSettingsError =
    createSelector(getCompetitionSettingsState, (state: CompetitionSettingsState) => state.error);
export const getCompetitionSettingsSucess =
    createSelector(getCompetitionSettingsState, (state: CompetitionSettingsState) => state.success);
