import { Action } from "@ngrx/store";
import { Score } from "../models/score";
import { TeamSeries } from "../models/team-series";

export enum ScoreboardActionTypes {
    LoadScores = "[Puzzle Hero Scoreboard] Load scores",
    ScoresLoaded = "[Puzzle Hero Scoreboard] Scores loaded",
    LoadScoresError = "[Puzzle Hero Scoreboard] Load scores error",

    SelectTeams = "[Puzzle Hero Scoreboard] Select teams",
    LoadTeamsSeries = "[Puzzle Hero Scoreboard] Load teams series",
    TeamsSeriesLoaded = "[Puzzle Hero Scoreboard] Teams series loaded"
}

export class LoadScores implements Action {
    readonly type = ScoreboardActionTypes.LoadScores;
}

export class ScoresLoaded implements Action {
    readonly type = ScoreboardActionTypes.ScoresLoaded;

    constructor(public scores: Score[]) {}
}

export class LoadScoresError implements Action {
    readonly type = ScoreboardActionTypes.LoadScoresError;
}

export class SelectTeams implements Action {
    readonly type = ScoreboardActionTypes.SelectTeams;

    constructor(public selectedTeams: string[]) {}
}

export class LoadTeamsSeries implements Action {
    readonly type = ScoreboardActionTypes.LoadTeamsSeries;

    constructor(public teamsIds: string[]) {}
}

export class TeamsSeriesLoaded implements Action {
    readonly type = ScoreboardActionTypes.TeamsSeriesLoaded;

    constructor(public teamsSeries: TeamSeries[]) {}
}

export type ScoreboardActions =
    | LoadTeamsSeries
    | TeamsSeriesLoaded
    | SelectTeams
    | LoadScores
    | ScoresLoaded
    | LoadScoresError;
