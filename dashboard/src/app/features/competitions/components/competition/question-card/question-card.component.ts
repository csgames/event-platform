import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Question } from "src/app/api/models/competition";
import { getLoading, State } from "../../competition-card/store/competition-card.reducer";
import { ResetStore } from "../../competition-card/store/competition-card.actions";

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
    public result: boolean;

    constructor(private store$: Store<State>) { }

    public ngOnInit() {
        this.result = false;
        this.store$.dispatch(new ResetStore());
    }
}
