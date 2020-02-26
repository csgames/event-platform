import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Question } from "../../../../../api/models/question";
import { QuestionFormDto } from "../../../../../components/question-form/dto/question-form.dto";
import { QuestionFormComponent } from "../../../../../components/question-form/question-form.component";
import { select, Store } from "@ngrx/store";
import { getUpdateQuestionLoading, getUpdateQuestionSuccess, State } from "./store/update-question.reducer";
import { ResetStore, UpdateQuestion } from "./store/update-question.actions";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

interface UpdateQuestionModal {
    competitionId: string;
    question: Question;
}

@Component({
    selector: "app-update-question",
    templateUrl: "./update-question.template.html",
    styleUrls: ["./update-question.style.scss"]
})
export class UpdateQuestionComponent extends SimpleModalComponent<UpdateQuestionModal, Question> implements OnInit, OnDestroy {
    @ViewChild(QuestionFormComponent)
    private form: QuestionFormComponent;

    public loading$ = this.store$.pipe(select(getUpdateQuestionLoading));
    public success$ = this.store$.pipe(select(getUpdateQuestionSuccess));
    public competitionId: string;
    public question: Question;
    public questionFormDto: QuestionFormDto;

    private unsubscribeAll$ = new Subject();

    constructor(private store$: Store<State>) {
        super();
    }

    ngOnInit() {
        this.questionFormDto = {
            ...this.question
        };
        this.success$.pipe(takeUntil(this.unsubscribeAll$)).subscribe(success => {
            if (success) {
                this.close();
            }
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.store$.dispatch(new ResetStore());
        this.unsubscribeAll$.next();
    }

    onClose() {
        this.close();
    }

    clickSave() {
        if (!this.form.validate()) {
            return;
        }

        this.store$.dispatch(new UpdateQuestion({
            competitionId: this.competitionId,
            question: {
                ...this.questionFormDto,
                _id: this.question._id
            } as Question
        }));
    }
}
