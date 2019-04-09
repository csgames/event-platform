import * as fromApp from "../../../../../../store/app.reducers";
import { EditTeamInfoActions, EditTeamInfoActionTypes } from "./edit-team-info.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Sponsors } from "../../../../../../api/models/sponsors";
import { School } from "../../../../../../api/models/school";

export interface EditTeamInfoState {
    loading: boolean;
    sponsors: Sponsors[];
    schools: School[];
}

export const initialState: EditTeamInfoState = {
    loading: false,
    sponsors: [],
    schools: []
};

export interface State extends fromApp.State {
    editTeamInfo: EditTeamInfoState;
}

export function reducer(state = initialState, action: EditTeamInfoActions) {
    switch (action.type) {
        case EditTeamInfoActionTypes.SchoolsLoaded:
            return {
                ...state,
                schools: action.schools
            };
        case EditTeamInfoActionTypes.SponsorsLoaded:
            return {
                ...state,
                sponsors: action.sponsors
            };
        case EditTeamInfoActionTypes.UpdateTeam:
            return {
                ...state,
                loading: true
            };
        case EditTeamInfoActionTypes.TeamUpdated:
            return {
                ...state,
                loading: false
            };
    }

    return state;
}

export const getEditTeamInfoState = createFeatureSelector<State, EditTeamInfoState>("editTeamInfo");

export const getEditTeamInfoLoading = createSelector(getEditTeamInfoState, (state: EditTeamInfoState) => state.loading);
export const getSchools = createSelector(getEditTeamInfoState, (state: EditTeamInfoState) => state.schools);
export const getSponsors = createSelector(getEditTeamInfoState, (state: EditTeamInfoState) => state.sponsors);
