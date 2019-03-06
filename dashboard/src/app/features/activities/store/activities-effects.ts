import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ScheduleService } from "src/app/providers/schedule.service";
import { AddActivity, ActivitiesActionTypes, ActivityAdded } from "./activities-actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { GlobalError } from "src/app/store/app.actions";

@Injectable()
export class ActivitiesEffects {
    constructor(private actions$: Actions,
                private scheduleService: ScheduleService) { }

    @Effect()
    createActivity$ = this.actions$.pipe(
        ofType<AddActivity>(ActivitiesActionTypes.AddActivity),
        switchMap((action: AddActivity) => 
            this.scheduleService.createActivity(action.activity).pipe(
                map(() => new ActivityAdded()),
                catchError((err) => of(new GlobalError(err)))
            )
        )
    );
} 
