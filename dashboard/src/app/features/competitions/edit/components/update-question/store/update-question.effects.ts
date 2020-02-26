import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { CompetitionsService } from "../../../../../../providers/competitions.service";
import { QuestionUpdated, UpdateQuestion, UpdateQuestionActionTypes, UpdateQuestionError } from "./update-question.actions";

@Injectable()
export class UpdateCompetitionEffects {
    constructor(private actions$: Actions, private competitionsService: CompetitionsService, private toastrService: ToastrService,
                private translateService: TranslateService) {}

    @Effect()
    updateQuestion$ = this.actions$.pipe(
        ofType<UpdateQuestion>(UpdateQuestionActionTypes.UpdateQuestion),
        switchMap((action: UpdateQuestion) =>
            this.competitionsService.updateQuestion(action.payload.competitionId, action.payload.question._id, action.payload.question)
                .pipe(
                    map(() => new QuestionUpdated(action.payload.question)),
                    catchError(() => of(new UpdateQuestionError()))
                )
        )
    );

    @Effect({ dispatch: false })
    updateQuestionError$ = this.actions$.pipe(
        ofType<UpdateQuestionError>(UpdateQuestionActionTypes.UpdateQuestionError),
        tap(() => this.toastrService.error("", this.translateService.instant("pages.competition.edit.update_question_error")))
    );
}
