import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { CompetitionsService } from "../../../../providers/competitions.service";
import {
    CompetitionEditActionTypes,
    CompetitionLoaded,
    CreateQuestion,
    CreateQuestionError,
    LoadCompetition,
    LoadCompetitionError,
    OpenCreateQuestionModal,
    OpenUpdateQuestionModal,
    QuestionCreated,
    QuestionsAndDescriptionSaved,
    QuestionUpdated,
    SaveQuestionsAndDescription, SaveQuestionsAndDescriptionError,
    UpdateQuestion,
    UpdateQuestionError
} from "./competition-edit.actions";
import { catchError, filter, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Competition } from "../../../../api/models/competition";
import { of } from "rxjs";
import { SimpleModalService } from "ngx-simple-modal";
import { Question } from "../../../../api/models/question";
import { getCompetitionEditCompetition, State } from "./competition-edit.reducer";
import { select, Store } from "@ngrx/store";
import { UpdateQuestionComponent } from "../components/update-question/update-question.component";
import { CreateQuestionComponent } from "../components/create-question/create-question.component";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class CompetitionEditEffects {
    constructor(private actions$: Actions, private competitionsService: CompetitionsService, private store$: Store<State>,
                private modalService: SimpleModalService, private toastrService: ToastrService,
                private translateService: TranslateService) {}

    @Effect()
    loadCompetition$ = this.actions$.pipe(
        ofType<LoadCompetition>(CompetitionEditActionTypes.LoadCompetition),
        switchMap((action: LoadCompetition) => this.competitionsService.getInfoForCompetition(action.id)
            .pipe(
                map((competition: Competition) => new CompetitionLoaded(competition)),
                catchError(() => of(new LoadCompetitionError()))
            )
        )
    );

    @Effect()
    openUpdateQuestionModal$ = this.actions$.pipe(
        ofType<OpenUpdateQuestionModal>(CompetitionEditActionTypes.OpenUpdateQuestionModal),
        switchMap((action: OpenUpdateQuestionModal) =>
            this.modalService.addModal(UpdateQuestionComponent, { question: action.question })
                .pipe(
                    filter(r => !!r),
                    map((question: Question) => new UpdateQuestion(question))
                )
        )
    );

    @Effect()
    updateQuestion$ = this.actions$.pipe(
        ofType<UpdateQuestion>(CompetitionEditActionTypes.UpdateQuestion),
        withLatestFrom(this.store$.pipe(select(getCompetitionEditCompetition))),
        switchMap(([action, competition]: [UpdateQuestion, Competition]) => {
            return this.competitionsService.updateQuestion(competition._id, action.question._id, action.question)
                .pipe(
                    map(() => new QuestionUpdated(action.question)),
                    catchError(() => of(new UpdateQuestionError()))
                );
        })
    );

    @Effect({ dispatch: false })
    updateQuestionError$ = this.actions$.pipe(
        ofType<UpdateQuestionError>(CompetitionEditActionTypes.UpdateQuestionError),
        tap(() => this.toastrService.error("", this.translateService.instant("pages.competition.edit.update_question_error")))
    );

    @Effect()
    openCreateQuestionModal$ = this.actions$.pipe(
        ofType<OpenCreateQuestionModal>(CompetitionEditActionTypes.OpenCreateQuestionModal),
        switchMap(() =>
            this.modalService.addModal(CreateQuestionComponent)
                .pipe(
                    filter(r => !!r),
                    map((question: Question) => new CreateQuestion(question))
                )
        )
    );

    @Effect()
    createQuestion$ = this.actions$.pipe(
        ofType<CreateQuestion>(CompetitionEditActionTypes.CreateQuestion),
        withLatestFrom(this.store$.pipe(select(getCompetitionEditCompetition))),
        switchMap(([action, competition]: [CreateQuestion, Competition]) => {
            return this.competitionsService.createQuestion(competition._id, action.question)
                .pipe(
                    map((r) => new QuestionCreated({
                        ...r,
                        question: action.question
                    })),
                    catchError(() => of(new CreateQuestionError()))
                );
        })
    );

    @Effect({ dispatch: false })
    createQuestionError$ = this.actions$.pipe(
        ofType<CreateQuestionError>(CompetitionEditActionTypes.CreateQuestionError),
        tap(() => this.toastrService.error("", this.translateService.instant("pages.competition.edit.add_question_error")))
    );

    @Effect()
    saveQuestionsAndDescription$ = this.actions$.pipe(
        ofType<SaveQuestionsAndDescription>(CompetitionEditActionTypes.SaveQuestionsAndDescription),
        withLatestFrom(this.store$.pipe(select(getCompetitionEditCompetition))),
        switchMap(([action, competition]: [SaveQuestionsAndDescription, Competition]) =>
            this.competitionsService.update(competition._id, { ...action.payload })
                .pipe(
                    map(() => new QuestionsAndDescriptionSaved()),
                    catchError(() => of(new SaveQuestionsAndDescriptionError()))
                )
        )
    );

    @Effect()
    questionsAndDescriptionSaved$ = this.actions$.pipe(
        ofType<QuestionsAndDescriptionSaved>(CompetitionEditActionTypes.QuestionsAndDescriptionSaved),
        withLatestFrom(this.store$.pipe(select(getCompetitionEditCompetition))),
        tap(() => this.toastrService.success("", this.translateService.instant("pages.competition.edit.save_success"))),
        map(([_, competition]: [QuestionsAndDescriptionSaved, Competition]) => new LoadCompetition(competition._id))
    );

    @Effect({ dispatch: false })
    saveQuestionsAndDescriptionError$ = this.actions$.pipe(
        ofType<SaveQuestionsAndDescriptionError>(CompetitionEditActionTypes.SaveQuestionsAndDescriptionError),
        tap(() => this.toastrService.error("", this.translateService.instant("pages.competition.edit.save_error")))
    );
}
