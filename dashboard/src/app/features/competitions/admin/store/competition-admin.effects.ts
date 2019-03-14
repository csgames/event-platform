import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ActivitiesLoaded, CompetitionsAdminActionTypes } from "./competition-admin.actions";
import { map, switchMap } from "rxjs/operators";
import { ScheduleService } from "../../../../providers/schedule.service";

@Injectable()
export class CompetitionAdminEffects {
    constructor(private actions$: Actions,
                private scheduleService: ScheduleService) {
    }

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
