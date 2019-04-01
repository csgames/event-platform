import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Competition } from "src/app/api/models/competition";
import { ResetStore } from "../../../store/competitions-list.actions";
import { FormBuilder, FormControl } from "@angular/forms";
import { UpdateQuestionAnswer } from "../store/competition.actions";
import { getCompetition, getCompetitionQuestionsValidationError, State } from "../store/competition.reducer";
import { Subscription } from "rxjs";
import { InputTypes, Question, QuestionTypes } from "../../../../../../api/models/question";

@Component({
    selector: "app-question-card",
    templateUrl: "./question-card.template.html",
    styleUrls: ["./question-card.style.scss"]
})

export class QuestionCardComponent implements OnInit, OnDestroy {
    @Input()
    public question: Question;

    @Output()
    public info = new EventEmitter();

    competition$ = this.store$.pipe(select(getCompetition));
    questionsValidationError$ = this.store$.pipe(select(getCompetitionQuestionsValidationError));

    public result: boolean;
    public file: FormControl;
    public answer: string;

    public isOpen = false;
    public error = false;
    public validationError = false;

    private competition: Competition;
    private competitionSub$: Subscription;
    private questionsValidationErrorSub$: Subscription;

    constructor(private store$: Store<State>, private formBuilder: FormBuilder) { }

    public ngOnInit() {
        this.result = false;
        this.file = this.formBuilder.control(null);
        this.store$.dispatch(new ResetStore());

        this.competitionSub$ = this.competition$.subscribe(competition => {
            this.competition = competition;
        });

        this.questionsValidationErrorSub$ = this.questionsValidationError$.subscribe(q => {
            this.validationError = !!q[this.question._id];
        });
    }

    public ngOnDestroy() {
        this.competitionSub$.unsubscribe();
        this.questionsValidationErrorSub$.unsubscribe();
    }

    public onOpen() {
        this.isOpen = !this.isOpen;
    }

    get icon(): string {
        switch (this.question.type) {
            case QuestionTypes.Crypto:
                return "fal fa-key";
            case QuestionTypes.Gaming:
                return "fal fa-gamepad";
            case QuestionTypes.Scavenger:
                return "fal fa-camera-alt";
            case QuestionTypes.Upload:
                return "fal fa-upload";
        }
        return "";
    }

    validate() {
        switch (this.question.inputType) {
            case InputTypes.Upload:
                if (!this.file.value) {
                    this.error = true;
                    return;
                } else {
                    this.error = false;
                }
                this.store$.dispatch(new UpdateQuestionAnswer(this.competition._id, this.question._id, {
                    file: this.file.value.data,
                    upload: true
                }));
                break;

            case InputTypes.String:
            case InputTypes.Code:
                if (!this.answer) {
                    this.error = true;
                    return;
                } else {
                    this.error = false;
                }
                this.store$.dispatch(new UpdateQuestionAnswer(this.competition._id, this.question._id, {
                    answer: this.answer
                }));
                break;
        }
    }
}
