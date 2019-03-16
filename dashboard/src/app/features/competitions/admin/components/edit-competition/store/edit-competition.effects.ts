import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { CompetitionsService } from "src/app/providers/competitions.service";
import { Activity } from "../../../../../../api/models/activity";
import { Attendee } from "../../../../../../api/models/attendee";
import { EventService } from "../../../../../../providers/event.service";
import { ScheduleService } from "../../../../../../providers/schedule.service";
import {
    SaveCompetitionEdit, CompetitionEditActionTypes, CompetitionEditSaved, CompetitionEditError, ModalLoaded, ActivitiesLoaded,
    DirectorsLoaded
} from "./edit-competition.actions";
import { switchMap, map, catchError, withLatestFrom, filter, tap } from "rxjs/operators";
import { of } from "rxjs";
import { getActivities, getDirectors, State } from "./edit-competition.reducer";

@Injectable()
export class EditCompetitionEffects {
    constructor(private actions$: Actions,
                private store$: Store<State>,
                private scheduleService: ScheduleService,
                private competitionService: CompetitionsService,
                private eventService: EventService,
                private toastrService: ToastrService,
                private translateService: TranslateService) {}

    @Effect()
    saveCompetition$ = this.actions$.pipe(
        ofType(CompetitionEditActionTypes.SaveCompetitionEdit),
        switchMap((action: SaveCompetitionEdit) => {
            return this.competitionService.updateCompetition(action.payload.id, action.payload.dto).pipe(
                map(() => new CompetitionEditSaved()),
                catchError(() => of(new CompetitionEditError()))
            );
        })
    );

    @Effect()
    loadActivities$ = this.actions$.pipe(
        ofType(CompetitionEditActionTypes.LoadActivities),
        switchMap(() => {
            return this.scheduleService.getActivitiesForEvent().pipe(
                map(activities => new ActivitiesLoaded(activities))
            );
        })
    );

    @Effect()
    loadDirectors$ = this.actions$.pipe(
        ofType(CompetitionEditActionTypes.LoadDirectors),
        switchMap(() => {
            return this.eventService.getDirectors().pipe(
                map(directors => new DirectorsLoaded(directors))
            );
        })
    );

    @Effect()
    modalLoaded$ = this.actions$.pipe(
        ofType(CompetitionEditActionTypes.ActivitiesLoaded, CompetitionEditActionTypes.DirectorsLoaded),
        withLatestFrom(this.store$.pipe(select(getActivities)), this.store$.pipe(select(getDirectors))),
        filter(([action, activities, directors]: [any, Activity[], Attendee[]]) => {
            const data = [activities, directors];
            return data.filter(x => x).length === data.length;
        }),
        map(() => new ModalLoaded())
    );

    @Effect({ dispatch: false })
    competitionEditSaved$ = this.actions$.pipe(
        ofType<CompetitionEditSaved>(CompetitionEditActionTypes.CompetitionEditSaved),
        tap(() => {
            this.toastrService.success(this.translateService.instant("pages.competition.admin.edit_competition_success"));
        })
    );
}
