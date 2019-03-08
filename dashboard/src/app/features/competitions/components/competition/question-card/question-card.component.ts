import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Competition, Question } from "src/app/api/models/competition";
import { getLoading, isSubscribed, State } from "../../competition-card/store/competition-card.reducer";
import { SubscribeToCompetition, 
         CheckIfSubscribedToCompetition, 
         ResetStore, 
         ShowCompetitionInfo } from "../../competition-card/store/competition-card.actions";
import { SimpleModalService } from "ngx-simple-modal";

@Component({
    selector: "app-question-card",
    templateUrl: "./question-card.template.html",
    styleUrls: ["./question-card.style.scss"]
})
export class QuestionCardComponent implements OnInit {
    @Input()
    public question: Question;

    @Output()
    public info = new EventEmitter();

    loading$ = this.store$.pipe(select(getLoading));
    // subscribed$ = this.store$.pipe(select(isSubscribed));
    public result: boolean;

    constructor(private store$: Store<State>) { }

    public ngOnInit() {
        this.result = false;
        this.store$.dispatch(new ResetStore());
    }

    public onShowInfo(competition: Competition) {
        this.store$.dispatch(new ShowCompetitionInfo({competition}));
    }

    public subscribe() {
        this.result = true;
    }
}
