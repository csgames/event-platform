import { Component, OnDestroy, OnInit } from "@angular/core";
import {
    getScoreboardError,
    getScoreboardLoading, getScoreboardScoreGraphLoading,
    getScoreboardScores,
    getScoreboardSelectedTeamIds, getScoreboardTeamsSeries,
    State
} from "./store/scoreboard.reducer";
import { select, Store } from "@ngrx/store";
import { LoadScores, SelectTeams } from "./store/scoreboard.actions";
import { PuzzleHeroService } from "../../../providers/puzzle-hero.service";
import { Subscription } from "rxjs";

@Component({
    selector: "scoreboard",
    templateUrl: "scoreboard.template.html",
    styleUrls: ["./scoreboard.style.scss"]
})
export class ScoreboardComponent implements OnInit, OnDestroy {

    loading$ = this.store$.pipe(select(getScoreboardLoading));
    error$ = this.store$.pipe(select(getScoreboardError));
    scores$ = this.store$.pipe(select(getScoreboardScores));
    selectedTeamIds$ = this.store$.pipe(select(getScoreboardSelectedTeamIds));

    scoreGraphLoading$ = this.store$.pipe(select(getScoreboardScoreGraphLoading));
    teamsSeries$ = this.store$.pipe(select(getScoreboardTeamsSeries));

    private scoreboardUpdateSubscription$: Subscription;

    constructor(private store$: Store<State>, private puzzleHeroService: PuzzleHeroService) {}

    ngOnInit() {
        this.store$.dispatch(new LoadScores());

        this.scoreboardUpdateSubscription$ = this.puzzleHeroService.scoreboardUpdate$.subscribe(() => {
            this.store$.dispatch(new LoadScores(false));
        });
    }

    ngOnDestroy(): void {
        this.scoreboardUpdateSubscription$.unsubscribe();
    }

    selectedTeamsChange(teams: string[]) {
        this.store$.dispatch(new SelectTeams(teams));
    }
}
