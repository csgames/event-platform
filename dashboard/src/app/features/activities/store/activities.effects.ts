import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ScheduleService } from "src/app/providers/schedule.service";
import { AddActivity, 
         ActivitiesActionTypes, 
         ActivityAdded, 
         ActivitiesLoaded, 
         ActivitiesError, 
         EditActivity, 
         LoadActivities } from "./activities.actions";
import { switchMap, map, catchError, filter } from "rxjs/operators";
import { of } from "rxjs";
import { GlobalError } from "src/app/store/app.actions";
import { EditActivityComponent } from "../components/edit-activity/edit-activity.component";
import { SimpleModalService } from "ngx-simple-modal";

@Injectable()
export class ActivitiesEffects {
    constructor(private actions$: Actions,
                private scheduleService: ScheduleService,
                private modalService: SimpleModalService) { }

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

    @Effect()
    loadActivities$ = this.actions$.pipe(
        ofType(ActivitiesActionTypes.LoadActivities, ActivitiesActionTypes.ActivityAdded),
        switchMap(() => {
            return this.scheduleService.getActivitiesForEvent().pipe(
                map(activities => new ActivitiesLoaded(activities)),
                catchError(() => of(new ActivitiesError())
            ));
        })
    );

    @Effect()
    editActivity$ = this.actions$.pipe(
        ofType(ActivitiesActionTypes.EditActivity),
        switchMap((action: EditActivity) => {
            return this.modalService.addModal(EditActivityComponent, { activity: action.activity }).pipe(
                filter((x) => !!x),
                map(() => new LoadActivities()),
                catchError(err => of(new GlobalError(err)))
            );
        })
    );
} 
