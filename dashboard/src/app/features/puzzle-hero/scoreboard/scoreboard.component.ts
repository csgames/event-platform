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
import * as io from "socket.io-client";
import { environment } from "../../../../environments/environment";

@Component({
    selector: "scoreboard",
    templateUrl: "scoreboard.template.html",
    styleUrls: ["./scoreboard.style.scss"]
})
export class ScoreboardComponent implements OnInit {

    loading$ = this.store$.pipe(select(getScoreboardLoading));
    error$ = this.store$.pipe(select(getScoreboardError));
    scores$ = this.store$.pipe(select(getScoreboardScores));
    selectedTeamIds$ = this.store$.pipe(select(getScoreboardSelectedTeamIds));

    scoreGraphLoading$ = this.store$.pipe(select(getScoreboardScoreGraphLoading));
    teamsSeries$ = this.store$.pipe(select(getScoreboardTeamsSeries));

    constructor(private store$: Store<State>) {
    }

    ngOnInit() {
        this.store$.dispatch(new LoadScores());
        const socket = io.connect(environment.GATEWAY_URL, {
            path: "/v1/socket/socket.io"
        });
        socket.on("scoreboard_update", () => {
            this.store$.dispatch(new LoadScores());
            console.log("TEST");
        });
    }

    selectedTeamsChange(teams: string[]) {
        this.store$.dispatch(new SelectTeams(teams));
    }
}
