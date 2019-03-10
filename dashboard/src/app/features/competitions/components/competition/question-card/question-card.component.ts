import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { QuestionGraphNodes, QuestionTypes } from "src/app/api/models/competition";
import { getLoading, State } from "../../competition-card/store/competition-card.reducer";
import { ResetStore } from "../../competition-card/store/competition-card.actions";

@Component({
    selector: "app-question-card",
    templateUrl: "./question-card.template.html",
    styleUrls: ["./question-card.style.scss"]
})
export class QuestionCardComponent implements OnInit {
    @Input()
    public question: QuestionGraphNodes;

    @Output()
    public info = new EventEmitter();

    loading$ = this.store$.pipe(select(getLoading));
    public result: boolean;

    constructor(private store$: Store<State>) { }

    public ngOnInit() {
        this.result = false;
        this.store$.dispatch(new ResetStore());
    }

    get icon(): string {
        switch (this.question.question.type) {
            case QuestionTypes.Crypto:
                return "fa-key";
            case QuestionTypes.Gaming:
                return "fa-gamepad";
            case QuestionTypes.Scavender:
                return "fa-camera-alt";
            case QuestionTypes.Upload:
                return "fa-upload";
        }
        return "";
    }
}
