import { Actions, Effect, ofType } from "@ngrx/effects";
import { CompetitionsService } from "src/app/providers/competitions.service";
import { Injectable } from "@angular/core";
import {
    CompetitionActionTypes,
    LoadCompetition,
    CompetitionLoaded,
    LoadCompetitionError,
    UpdateQuestionAnswer, QuestionAnswerUpdated, UpdateQuestionAnswerError
} from "./competition.actions";
import { switchMap, map, catchError, tap, withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { getCompetition, State } from "./competition.reducer";
import { select, Store } from "@ngrx/store";
import { Competition } from "../../../../../api/models/competition";

@Injectable()
export class CompetitionEffects {
    constructor(private actions$: Actions, private store$: Store<State>,
                private competitionService: CompetitionsService, private toastrService: ToastrService,
                private translateService: TranslateService) {}

    @Effect()
    loadCompetition$ = this.actions$.pipe(
        ofType<LoadCompetition>(CompetitionActionTypes.LoadCompetition),
        switchMap((action: LoadCompetition) => this.competitionService.getInfoForCompetition(action.competitionId)
            .pipe(
                map((competition) => new CompetitionLoaded(competition)),
                catchError(() => of(new LoadCompetitionError()))
            )
        )
    );

    @Effect()
    updateQuestionAnswer$ = this.actions$.pipe(
        ofType<UpdateQuestionAnswer>(CompetitionActionTypes.UpdateQuestionAnswer),
        switchMap((action: UpdateQuestionAnswer) =>
            this.competitionService.validateQuestion(action.competitionId, action.questionId, action.questionAnswerDto)
                .pipe(
                    map(() => new QuestionAnswerUpdated()),
                    catchError(() => of(new UpdateQuestionAnswerError(action.questionId)))
                )
        )
    );

    @Effect()
    questionAnswerUpdated$ = this.actions$.pipe(
        ofType<QuestionAnswerUpdated>(CompetitionActionTypes.QuestionAnswerUpdated),
        withLatestFrom(this.store$.pipe(select(getCompetition))),
        tap(() => this.toastrService.success("", this.translateService.instant("pages.question.good_answer"))),
        map(([action, competition]: [QuestionAnswerUpdated, Competition]) => new LoadCompetition(competition._id))
    );
}
