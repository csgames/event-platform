import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Competition } from "src/app/api/models/competition";
import { getLoading, getSubscribed, State } from "./store/competition-card.reducer";
import { SubscribeToCompetition, CheckIfSubscribedToCompetition, ResetStore, ShowCompetitionInfo } from "./store/competition-card.actions";
import { SimpleModalService } from "ngx-simple-modal";

@Component({
    selector: "app-competition-card",
    templateUrl: "./competition-card.template.html",
    styleUrls: ["./competition-card.style.scss"]
})
export class CompetitionCardComponent implements OnInit {
    @Input()
    public competition: Competition;

    @Output()
    public info = new EventEmitter();

    loading$ = this.store$.pipe(select(getLoading));
    subscribed$ = this.store$.pipe(select(getSubscribed));
    public result: boolean;

    constructor(private store$: Store<State>) { }

    public ngOnInit() {
        this.result = false;
        this.store$.dispatch(new ResetStore());
        this.store$.dispatch(new CheckIfSubscribedToCompetition(this.competition.activities[0]._id));
    }

    public onShowInfo(competition: Competition) {
        this.store$.dispatch(new ShowCompetitionInfo({competition}));
    }

    public subscribe() {
        this.store$.dispatch(new SubscribeToCompetition(this.competition._id));
        this.result = true;
    }
}
