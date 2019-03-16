import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { SimpleModalService } from "ngx-simple-modal";
import { ToastrService } from "ngx-toastr";
import { of } from "rxjs";
import { catchError, filter, map, switchMap, tap } from "rxjs/operators";
import { Competition } from "../../../../api/models/competition";
import { CompetitionsService } from "../../../../providers/competitions.service";
import { EventService } from "../../../../providers/event.service";
import { ScheduleService } from "../../../../providers/schedule.service";
import { GlobalError } from "../../../../store/app.actions";
import { CompetitionEditComponent } from "../components/competition-edit/competition-edit.component";
import {
    ActivitiesLoaded, CompetitionsAdminActionTypes, CompetitionsAdminLoaded, CreateCompetition, CreateCompetitionSuccess, DirectorsLoaded,
    EditCompetition, LoadCompetitionsAdmin
} from "./competition-admin.actions";

@Injectable()
export class CompetitionAdminEffects {
    constructor(private actions$: Actions,
                private scheduleService: ScheduleService,
                private competitionService: CompetitionsService,
                private eventService: EventService,
                private toastrService: ToastrService,
                private translateService: TranslateService,
                private modalService: SimpleModalService) {
    }

    @Effect()
    loadCompetitions$ = this.actions$.pipe(
        ofType<LoadCompetitionsAdmin>(CompetitionsAdminActionTypes.LoadCompetitionsAdmin),
        switchMap(() => this.competitionService.getCompetitionsForEvent()
            .pipe(
                map((competitions: Competition[]) => new CompetitionsAdminLoaded(competitions))
            )
        )
    );

    @Effect()
    loadActivities$ = this.actions$.pipe(
        ofType(CompetitionsAdminActionTypes.LoadActivities),
        switchMap(() => {
            return this.scheduleService.getActivitiesForEvent().pipe(
                map(activities => new ActivitiesLoaded(activities))
            );
        })
    );

    @Effect()
    loadDirectors$ = this.actions$.pipe(
        ofType(CompetitionsAdminActionTypes.LoadDirectors),
        switchMap(() => {
            return this.eventService.getDirectors().pipe(
                map(directors => new DirectorsLoaded(directors))
            );
        })
    );

    @Effect()
    addCompetitions$ = this.actions$.pipe(
        ofType(CompetitionsAdminActionTypes.CreateCompetition),
        switchMap((action: CreateCompetition) => {
            return this.competitionService.create(action.payload).pipe(
                switchMap(() => [new CreateCompetitionSuccess(), new LoadCompetitionsAdmin()]),
                catchError((err) => of(new GlobalError(err)))
            );
        })
    );

    @Effect({ dispatch: false })
    competitionsAdded$ = this.actions$.pipe(
        ofType(CompetitionsAdminActionTypes.CreateCompetitionSuccess),
        tap(() => {
            this.toastrService.success(this.translateService.instant("pages.competition.create_competition_success"));
        })
    );

    @Effect()
    editCompetition$ = this.actions$.pipe(
        ofType(CompetitionsAdminActionTypes.EditCompetition),
        switchMap((action: EditCompetition) => {
            return this.modalService.addModal(CompetitionEditComponent, { competition: action.payload }).pipe(
                filter((x) => x),
                map(() => new LoadCompetitionsAdmin()),
                catchError(err => of(new GlobalError(err)))
            );
        })
    );
}
