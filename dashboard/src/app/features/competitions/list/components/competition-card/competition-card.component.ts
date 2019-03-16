import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Competition } from "src/app/api/models/competition";
import { getCompetitionsLoading, State } from "../../store/competitions-list.reducer";
import { SubscribeToCompetition, ShowCompetitionInfo } from "../../store/competitions-list.actions";
import { Subscription } from "rxjs";
import { getRegisteredCompetitions } from "src/app/store/app.reducers";
import { Router } from "@angular/router";

@Component({
    selector: "app-competition-card",
    templateUrl: "./competition-card.template.html",
    styleUrls: ["./competition-card.style.scss"]
})
export class CompetitionCardComponent implements OnInit, OnDestroy {
    @Input()
    public competition: Competition;

    @Output()
    public info = new EventEmitter();

    loading$ = this.store$.pipe(select(getCompetitionsLoading));
    registeredCompetitions$ = this.store$.pipe(select(getRegisteredCompetitions));

    public result: boolean;
    public subscribed: boolean;
    public registered: boolean;

    private registeredSub$: Subscription;

    constructor(private store$: Store<State>, private router: Router) { }

    public isSubscribed() {
        this.subscribed = this.competition.activities.some(x => x.subscribed);
    }

    public ngOnInit() {
        this.result = false;
        this.isSubscribed();
        this.registeredSub$ = this.registeredCompetitions$.subscribe((competitions) => {
            this.registered = competitions && !!competitions.find(c => c._id === this.competition._id);
        });
    }

    public ngOnDestroy() {
        this.registeredSub$.unsubscribe();
    }

    public onShowInfo(competition: Competition) {
        if (this.registered) {
            this.router.navigate([`competition/${competition._id}`]);
        } else {
            this.store$.dispatch(new ShowCompetitionInfo({ competition }));
        }
    }

    public subscribe() {
        this.store$.dispatch(new SubscribeToCompetition(this.competition._id));
        this.result = true;
        this.subscribed = true;
    }
}
