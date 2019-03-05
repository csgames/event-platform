import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { NotificationService } from "src/app/providers/notification.service";
import { SendSms, AdminNotificationsActionTypes, NotificationSent, NotificationError, SendPush, LoadActivities, ActivitiesLoaded } from "./notifications-actions";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ScheduleService } from "src/app/providers/schedule.service";
import { GlobalError } from "src/app/store/app.actions";

@Injectable()
export class AdminNotificationsEffects {
    constructor(private actions$: Actions,
                private notificationsService: NotificationService,
                private scheduleService: ScheduleService,
                private toastr: ToastrService) { }

    @Effect()
    sendSms$ = this.actions$.pipe(
        ofType<SendSms>(AdminNotificationsActionTypes.SendSms),
        switchMap((action: SendSms) =>
            this.notificationsService.sendSms(action.message).pipe(
                map(() => new NotificationSent()),
                catchError((err) => of(new NotificationError(err.error)))
            )
        )
    );

    @Effect()
    sendPush$ = this.actions$.pipe(
        ofType<SendPush>(AdminNotificationsActionTypes.SendPush),
        switchMap((action: SendPush) => {
            if (action.activity.name.en === "Event") {
                return this.notificationsService.sendPushToEvent(action.title, action.body).pipe(
                    map(() => new NotificationSent()),
                    catchError((err) =>  of(new NotificationError(err.error)))
                )
            } else {
                return this.notificationsService.sendPushToActivity(action.title, action.body, action.activity._id).pipe(
                    map(() => new NotificationSent()),
                    catchError((err) =>  of(new NotificationError(err.error)))
                )
            }
        })
    );

    @Effect({ dispatch: false })
    error$ = this.actions$.pipe(
        ofType<NotificationError>(AdminNotificationsActionTypes.NotificationError),
        tap((action: NotificationError) => {
            this.toastr.error(action.error.message, "Error", {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-right",
                timeOut: 10000
            });
        })
    );

    @Effect()
    loadActivities$ = this.actions$.pipe(
        ofType<LoadActivities>(AdminNotificationsActionTypes.LoadActivities),
        switchMap(() => {
            return this.scheduleService.getActivitiesForEvent().pipe(
                map(activities => new ActivitiesLoaded(activities)),
                catchError(err => of(new GlobalError(err)))
            );
        })
    );
}