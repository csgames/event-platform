import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { switchMap, map, catchError, withLatestFrom, filter, tap } from "rxjs/operators";
import { of } from "rxjs";
import { State, getActivities } from "./edit-activity.reducer";
import { ScheduleService } from "src/app/providers/schedule.service";
import { EventService } from "src/app/providers/event.service";
import { ActivityEditActionTypes, SaveActivityEdit, ActivityEditSaved, ActivityEditError, ActivitiesLoaded } from "./edit-activity.actions";
import { ActivityService } from "src/app/providers/activity.service";

@Injectable()
export class EditActivityEffects {
    constructor(private actions$: Actions,
                private store$: Store<State>,
                private scheduleService: ScheduleService,
                private toastrService: ToastrService,
                private translateService: TranslateService,
                private activityService: ActivityService) {}

    @Effect()
    saveActivity$ = this.actions$.pipe(
        ofType(ActivityEditActionTypes.SaveActivityEdit),
        switchMap((action: SaveActivityEdit) => {
            return this.activityService.updateActivity(action.payload.id, action.payload.dto).pipe(
                map(() => new ActivityEditSaved()),
                catchError(() => of(new ActivityEditError()))
            );
        })
    );

    @Effect()
    loadActivities$ = this.actions$.pipe(
        ofType(ActivityEditActionTypes.LoadActivities),
        switchMap(() => {
            return this.scheduleService.getActivitiesForEvent().pipe(
                map(activities => new ActivitiesLoaded(activities))
            );
        })
    );

    @Effect({ dispatch: false })
    activityEditSaved$ = this.actions$.pipe(
        ofType<ActivityEditSaved>(ActivityEditActionTypes.ActivityEditSaved),
        tap(() => {
            this.toastrService.success(this.translateService.instant("pages.activities.edit_activity_success"));
        })
    );
}
