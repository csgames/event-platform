import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { PuzzleHeroService } from "../../../../providers/puzzle-hero.service";
import {
    LoadScores,
    LoadScoresError,
    LoadTeamsSeries,
    ScoreboardActionTypes,
    ScoresLoaded,
    SelectTeams,
    TeamsSeriesLoaded
} from "./scoreboard.actions";
import { catchError, debounceTime, filter, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { GlobalError } from "../../../../store/app.actions";
import { TeamSeries } from "../../../../api/models/puzzle-hero";

@Injectable()
export class ScoreboardEffects {
    constructor(private actions$: Actions, private puzzleHeroService: PuzzleHeroService) {}

    @Effect()
    loadScores$ = this.actions$.pipe(
        ofType<LoadScores>(ScoreboardActionTypes.LoadScores),
        switchMap(() => this.puzzleHeroService.getScores()
            .pipe(
                map(s => new ScoresLoaded(s)),
                catchError(() => of(new LoadScoresError()))
            )
        )
    );

    @Effect()
    scoresLoaded$ = this.actions$.pipe(
        ofType<ScoresLoaded>(ScoreboardActionTypes.ScoresLoaded),
        map((action: ScoresLoaded) => new SelectTeams(action.scores.slice(0, 10).map(s => s.teamId)))
    );

    @Effect()
    selectTeams$ = this.actions$.pipe(
        ofType<SelectTeams>(ScoreboardActionTypes.SelectTeams),
        debounceTime(500),
        filter((action: SelectTeams) => action.selectedTeams.length > 0),
        map((action: SelectTeams) => new LoadTeamsSeries(action.selectedTeams))
    );

    @Effect()
    loadTeamsSeries$ = this.actions$.pipe(
        ofType<LoadTeamsSeries>(ScoreboardActionTypes.LoadTeamsSeries),
        switchMap((action: LoadTeamsSeries) => this.puzzleHeroService.getTeamsSeries(action.teamsIds)
            .pipe(
                map((ts: TeamSeries[]) => new TeamsSeriesLoaded(ts)),
                catchError((err) => of(new GlobalError(err)))
            )
        )
    );
}
