import * as fromApp from "../../../../store/app.reducers";
import { ScoreboardActions, ScoreboardActionTypes } from "./scoreboard.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Score, TeamSeries } from "../../../../api/models/puzzle-hero";

export interface ScoreboardState {
    scores: Score[];
    loading: boolean;
    error: boolean;

    selectedTeamIds: string[];
    teamsSeries: TeamSeries[];
    scoreGraphLoading: boolean;
}

export const initialState: ScoreboardState = {
    scores: [],
    loading: false,
    error: false,

    selectedTeamIds: [],
    teamsSeries: [],
    scoreGraphLoading: false
};

export interface State extends fromApp.State {
    puzzleHeroScoreboard: ScoreboardState;
}

export function reducer(state = initialState, action: ScoreboardActions): ScoreboardState {
    switch (action.type) {
        case ScoreboardActionTypes.LoadScores:
            return {
                ...state,
                loading: true
            };

        case ScoreboardActionTypes.ScoresLoaded:
            return {
                ...state,
                scores: action.scores,
                loading: false,
                error: false
            };

        case ScoreboardActionTypes.LoadScoresError:
            return {
                ...state,
                loading: false,
                error: true,
                scores: []
            };

        case ScoreboardActionTypes.SelectTeams:
            return {
                ...state,
                selectedTeamIds: action.selectedTeams
            };

        case ScoreboardActionTypes.LoadTeamsSeries:
            return {
                ...state,
                scoreGraphLoading: true
            };

        case ScoreboardActionTypes.TeamsSeriesLoaded:
            return {
                ...state,
                scoreGraphLoading: false,
                teamsSeries: action.teamsSeries
            };
    }

    return state;
}

export const getScoreboardState = createFeatureSelector<State, ScoreboardState>("puzzleHeroScoreboard");

export const getScoreboardLoading = createSelector(getScoreboardState, (state: ScoreboardState) => state.loading);
export const getScoreboardScores = createSelector(getScoreboardState, (state: ScoreboardState) => state.scores);
export const getScoreboardError = createSelector(getScoreboardState, (state: ScoreboardState) => state.error);

export const getScoreboardSelectedTeamIds = createSelector(getScoreboardState, (state: ScoreboardState) => state.selectedTeamIds);
export const getScoreboardTeamsSeries = createSelector(getScoreboardState, (state: ScoreboardState) => state.teamsSeries);
export const getScoreboardScoreGraphLoading = createSelector(getScoreboardState, (state: ScoreboardState) => state.scoreGraphLoading);

