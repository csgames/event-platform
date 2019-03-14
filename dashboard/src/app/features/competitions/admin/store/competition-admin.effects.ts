import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ScheduleService } from "../../../../providers/schedule.service";
import { CompetitionsService } from "../../../../providers/competitions.service";
import {
    ActivitiesLoaded,
    CompetitionsAdminActionTypes,
    CompetitionsAdminLoaded,
    LoadCompetitionsAdmin
} from "./competition-admin.actions";
import { map, switchMap } from "rxjs/operators";
import { Competition } from "../../../../api/models/competition";

@Injectable()
export class CompetitionAdminEffects {
    constructor(private actions$: Actions,
                private scheduleService: ScheduleService,
                private competitionService: CompetitionsService) {
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
}
