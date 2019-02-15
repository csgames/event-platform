import { Injectable } from "@angular/core";
import { ScheduleService } from "src/app/providers/schedule.service";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { LoadActivities, ScheduleActionTypes, ActivitiesLoaded, ShowActivityInfo } from "./schedule.actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { GlobalError } from "src/app/store/app.actions";
import { SimpleModalService } from "ngx-simple-modal";
import { InfoActivityComponent } from "../info-activity/info-activity.component";

@Injectable()
export class ScheduleEffects {
    constructor(private actions$: Actions,
                private scheduleService: ScheduleService,
                private modalService: SimpleModalService) { }

    @Effect()
    loadActivities$ = this.actions$.pipe(
        ofType<LoadActivities>(ScheduleActionTypes.LoadActivities),
        switchMap(() => {
            return this.scheduleService.getActivitiesForEvent().pipe(
                map(activities => new ActivitiesLoaded(activities)),
                catchError(err => of(new GlobalError(err)))
            );
        })
    );

    @Effect()
    showActivityInfo$ = this.actions$.pipe(
        ofType<ShowActivityInfo>(ScheduleActionTypes.ShowActivityInfo),
        switchMap((action: ShowActivityInfo) => {
            return this.modalService.addModal(InfoActivityComponent, action.payload).pipe(
                map(() => new LoadActivities()),
                catchError(err => of(new GlobalError(err)))
            );
        })
    );
}
