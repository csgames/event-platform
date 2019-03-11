import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Competition } from "src/app/api/models/competition";
import { getLoading, isSubscribed, State } from "./store/competition-card.reducer";
import { SubscribeToCompetition, CheckIfSubscribedToCompetition, ResetStore, ShowCompetitionInfo } from "./store/competition-card.actions";
import idx from "idx";
import { Observable } from "rxjs";

@Component({
    selector: "app-competition-card",
    templateUrl: "./competition-card.template.html",
    styleUrls: ["./competition-card.style.scss"]
})
export class CompetitionCardComponent implements OnInit, OnChanges {
    @Input()
    public competition: Competition;

    @Output()
    public info = new EventEmitter();

    loading$ = this.store$.pipe(select(getLoading));
    public result: boolean;
    private subscribed: boolean;

    constructor(private store$: Store<State>) { }

    public isSubscribed() {
        this.subscribed = this.competition.activities.some(x => x.subscribed);
    }

    public ngOnInit() {
        this.result = false;
        this.store$.dispatch(new ResetStore());
        this.isSubscribed();
    }

    public ngOnChanges() {
        this.ngOnInit();
    }

    public onShowInfo(competition: Competition) {
        this.store$.dispatch(new ShowCompetitionInfo({competition}));
    }

    public subscribe() {
        this.store$.dispatch(new SubscribeToCompetition(this.competition._id));
        this.result = true;
        this.subscribed = true;
    }
}
