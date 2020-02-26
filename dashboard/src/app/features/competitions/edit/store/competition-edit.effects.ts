import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { CompetitionsService } from "../../../../providers/competitions.service";
import {
    CompetitionEditActionTypes,
    CompetitionLoaded, CompetitionResultsLoaded,
    DownloadUploadedSubmissions,
    LoadCompetition,
    LoadCompetitionError, LoadCompetitionResults, LoadCompetitionResultsError,
    OpenCreateQuestionModal, OpenSettingsModal,
    OpenUpdateQuestionModal,
    CompetitionSaved,
    SaveCompetition, SaveCompetitionError
} from "./competition-edit.actions";
import { catchError, filter, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Competition } from "../../../../api/models/competition";
import { of } from "rxjs";
import { SimpleModalService } from "ngx-simple-modal";
import { getCompetitionEditCompetition, State } from "./competition-edit.reducer";
import { select, Store } from "@ngrx/store";
import { UpdateQuestionComponent } from "../components/update-question/update-question.component";
import { CreateQuestionComponent, CreateQuestionData } from "../components/create-question/create-question.component";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { EditCompetitionComponent } from "../../admin/components/edit-competition/edit-competition.component";
import { Event } from "../../../../api/models/event";
import { getCurrentEvent } from "../../../../store/app.reducers";
import { CreateQuestionActionTypes, QuestionCreated } from "../components/create-question/store/create-question.actions";
import { QuestionUpdated, UpdateQuestionActionTypes } from "../components/update-question/store/update-question.actions";

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

    @Effect({ dispatch: false })
    openUpdateQuestionModal$ = this.actions$.pipe(
        ofType<OpenUpdateQuestionModal>(CompetitionEditActionTypes.OpenUpdateQuestionModal),
        withLatestFrom(this.store$.pipe(select(getCompetitionEditCompetition))),
        tap(([action, competition]: [OpenUpdateQuestionModal, Competition]) =>
            this.modalService.addModal(UpdateQuestionComponent, { question: action.question, competitionId:  competition._id })
        )
    );

    @Effect()
    updateQuestionSuccess$ = this.actions$.pipe(
        ofType<QuestionUpdated>(UpdateQuestionActionTypes.QuestionUpdated),
        withLatestFrom(this.store$.pipe(select(getCompetitionEditCompetition))),
        map(([, competition]: [QuestionUpdated, Competition]) => new LoadCompetition(competition._id))
    );

    @Effect({ dispatch: false })
    openCreateQuestionModal$ = this.actions$.pipe(
        ofType<OpenCreateQuestionModal>(CompetitionEditActionTypes.OpenCreateQuestionModal),
        withLatestFrom(this.store$.pipe(select(getCompetitionEditCompetition))),
        tap(([, competition]: [OpenCreateQuestionModal, Competition]) =>
            this.modalService.addModal<CreateQuestionData, void>(CreateQuestionComponent, { competitionId: competition._id })
        )
    );

    @Effect()
    createQuestionSuccess$ = this.actions$.pipe(
        ofType<QuestionCreated>(CreateQuestionActionTypes.QuestionCreated),
        withLatestFrom(this.store$.pipe(select(getCompetitionEditCompetition))),
        map(([, competition]: [QuestionCreated, Competition]) => new LoadCompetition(competition._id))
    );

    @Effect()
    saveCompetition$ = this.actions$.pipe(
        ofType<SaveCompetition>(CompetitionEditActionTypes.SaveCompetition),
        withLatestFrom(this.store$.pipe(select(getCompetitionEditCompetition))),
        switchMap(([action, competition]: [SaveCompetition, Competition]) =>
            this.competitionsService.updateCompetition(competition._id, { ...action.payload })
                .pipe(
                    map(() => new CompetitionSaved()),
                    catchError(() => of(new SaveCompetitionError()))
                )
        )
    );

    @Effect()
    competitionSaved$ = this.actions$.pipe(
        ofType<CompetitionSaved>(CompetitionEditActionTypes.QuestionsAndDescriptionSaved),
        withLatestFrom(this.store$.pipe(select(getCompetitionEditCompetition))),
        tap(() => this.toastrService.success("", this.translateService.instant("pages.competition.edit.save_success"))),
        map(([_, competition]: [CompetitionSaved, Competition]) => new LoadCompetition(competition._id))
    );

    @Effect({ dispatch: false })
    saveCompetitionError$ = this.actions$.pipe(
        ofType<SaveCompetitionError>(CompetitionEditActionTypes.SaveCompetitionError),
        tap(() => this.toastrService.error("", this.translateService.instant("pages.competition.edit.save_error")))
    );

    @Effect()
    openSettingsModal$ = this.actions$.pipe(
        ofType<OpenSettingsModal>(CompetitionEditActionTypes.OpenSettingsModal),
        withLatestFrom(this.store$.pipe(select(getCompetitionEditCompetition))),
        switchMap(([action, competition]: [OpenSettingsModal, Competition]) => {
            return this.modalService.addModal(EditCompetitionComponent, { competition: action.competition })
                .pipe(
                    filter(x => !!x),
                    map(() => new LoadCompetition(competition._id))
                );
        })
    );

    @Effect()
    loadCompetitionResults$ = this.actions$.pipe(
        ofType<LoadCompetitionResults>(CompetitionEditActionTypes.LoadCompetitionResults),
        switchMap((action: LoadCompetitionResults) => this.competitionsService.getCompetitionResult(action.competitionId)
            .pipe(
                map((competitionResults) => new CompetitionResultsLoaded(competitionResults)),
                catchError(() => of(new LoadCompetitionResultsError()))
            )
        )
    );

    @Effect({ dispatch: false })
    loadCompetitionResultsError$ = this.actions$.pipe(
        ofType<LoadCompetitionResultsError>(CompetitionEditActionTypes.LoadCompetitionResultsError),
        tap(() => this.toastrService.error("", this.translateService.instant("pages.competition.edit.load_results_error")))
    );

    @Effect({ dispatch: false })
    downloadUploadedSubmissions$ = this.actions$.pipe(
        ofType<DownloadUploadedSubmissions>(CompetitionEditActionTypes.DownloadUploadedSubmissions),
        withLatestFrom(this.store$.pipe(select(getCurrentEvent))),
        switchMap(([action, event]: [DownloadUploadedSubmissions, Event]) =>
            this.competitionsService.getQuestionResult(event._id, action.payload.competitionId, action.payload.question._id)
        )
    );
}
