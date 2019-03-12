import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { QuestionGraphNodes, QuestionTypes } from "src/app/api/models/competition";
import { getCompetitionsLoading, State } from "../../../store/competitions.reducer";
import { ResetStore } from "../../../store/competitions.actions";
import { UppyFile } from "@uppy/core";
import { FormControl, FormBuilder } from "@angular/forms";

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

    loading$ = this.store$.pipe(select(getCompetitionsLoading));
    public result: boolean;
    public file: FormControl;

    constructor(private store$: Store<State>, private formBuilder: FormBuilder) { }

    public ngOnInit() {
        this.result = false;
        this.file = this.formBuilder.control(null);
        this.store$.dispatch(new ResetStore());
    }

    get icon(): string {
        switch (this.question.question.type) {
            case QuestionTypes.Crypto:
                return "fal fa-key";
            case QuestionTypes.Gaming:
                return "fal fa-gamepad";
            case QuestionTypes.Scavender:
                return "fal fa-camera-alt";
            case QuestionTypes.Upload:
                return "fal fa-upload";
        }
        return "";
    }
}
