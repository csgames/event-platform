import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { State, getCompetitionLoading, getCompetitionError, getCompetition } from "./store/competition.reducer";
import { LoadCompetition } from "./store/competition.actions";
import { Question } from "../../../../../api/models/question";

@Component({
    selector: "app-competition",
    templateUrl: "./competition.template.html",
    styleUrls: ["./competition.style.scss"]
})
export class CompetitionComponent implements OnInit {
    public competitionId$: Observable<string>;
    public competitionId: string;

    competition$ = this.store$.pipe(select(getCompetition));
    loading$ = this.store$.pipe(select(getCompetitionLoading));
    error$ = this.store$.pipe(select(getCompetitionError));


    private competitionSub$: Subscription;

    constructor(private store$: Store<State>,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.competitionId$ = this.activatedRoute.params.pipe(
            map(p => p["id"])
        );
        this.competitionSub$ = this.activatedRoute.params.subscribe(
            params => {
                this.competitionId = params["id"];
                this.store$.dispatch(new LoadCompetition(this.competitionId));
            }
        );
    }

    get answeredQuestions$(): Observable<Question[]> {
        return this.competition$.pipe(
            map(c => c && c.questions && (c.questions as Question[]).filter(q => q.isAnswered))
        );
    }

    get notAnsweredQuestions$(): Observable<Question[]> {
        return this.competition$.pipe(
            map(c => c && c.questions && (c.questions as Question[]).filter(q => !q.isAnswered))
        );
    }
}
