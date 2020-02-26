import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { CompetitionsService } from "../../../../../../providers/competitions.service";
import { CreateQuestion, CreateQuestionActionTypes, CreateQuestionError, QuestionCreated } from "./create-question.actions";

@Injectable()
export class CreateCompetitionEffects {
    constructor(private actions$: Actions, private competitionsService: CompetitionsService, private toastrService: ToastrService,
                private translateService: TranslateService) {}

    @Effect()
    createQuestion$ = this.actions$.pipe(
        ofType<CreateQuestion>(CreateQuestionActionTypes.CreateQuestion),
        switchMap((action: CreateQuestion) => {
            return this.competitionsService.createQuestion(action.payload.competitionId, action.payload.question)
                .pipe(
                    map((r) => new QuestionCreated({
                        ...r,
                        question: {
                            _id: r.question as any,
                            ...action.payload.question
                        }
                    })),
                    catchError(() => of(new CreateQuestionError()))
                );
        })
    );

    @Effect({ dispatch: false })
    createQuestionError$ = this.actions$.pipe(
        ofType<CreateQuestionError>(CreateQuestionActionTypes.CreateQuestionError),
        tap(() => this.toastrService.error("", this.translateService.instant("pages.competition.edit.add_question_error")))
    );
}
