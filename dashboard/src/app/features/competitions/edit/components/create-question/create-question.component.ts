import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Question } from "../../../../../api/models/question";
import { QuestionFormDto } from "../../../../../components/question-form/dto/question-form.dto";
import { QuestionFormComponent } from "../../../../../components/question-form/question-form.component";
import { select, Store } from "@ngrx/store";
import { getCreateQuestionLoading, getCreateQuestionSuccess, State } from "./store/create-question.reducer";
import { CreateQuestion, ResetStore } from "./store/create-question.actions";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export interface CreateQuestionData {
    competitionId: string;
}

@Component({
    selector: "app-create-question",
    templateUrl: "create-question.template.html"
})
export class CreateQuestionComponent extends SimpleModalComponent<CreateQuestionData, void> implements OnInit, OnDestroy, CreateQuestionData {
    @ViewChild(QuestionFormComponent)
    private form: QuestionFormComponent;

    public loading$ = this.store$.pipe(select(getCreateQuestionLoading));
    public success$ = this.store$.pipe(select(getCreateQuestionSuccess));

    public questionFormDto: QuestionFormDto = new QuestionFormDto();
    public competitionId: string;

    private unsubscribeAll$ = new Subject();

    constructor(private store$: Store<State>) {
        super();
    }

    ngOnInit() {
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

        this.store$.dispatch(new CreateQuestion({
            competitionId: this.competitionId,
            question: this.questionFormDto as Question
        }));
    }
}
