import { Injectable } from "@angular/core";
import { NotificationService } from "src/app/providers/notification.service";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { LoadNotifications, NotificationActionTypes, NotificationsLoaded, MarkNotificationsAsSeen, NotificationsMarked } from "./notifications.actions";
import { switchMap, map, catchError, filter } from "rxjs/operators";
import { Notification } from "../../../api/models/notification";
import { GlobalError } from "src/app/store/app.actions";
import { of } from "rxjs";
import { Action } from "@ngrx/store";
import { AttendeeService } from "src/app/features/dashboard/modals/profile-setting/providers/attendee.service";

@Injectable()
export class NotificationsEffects {
    constructor(private actions$: Actions,
                private notificationsService: NotificationService,
                private attendeeService: AttendeeService) { }

    @Effect()
    loadNotifications$ = this.actions$.pipe(
        ofType<LoadNotifications>(NotificationActionTypes.LoadNotifications),
        switchMap(() => {
            return this.notificationsService.loadNotifications().pipe(
                map((notifications: Notification[]) => new NotificationsLoaded(notifications)),
                catchError((err) => of(new GlobalError(err)))
            );
        })
    );

    @Effect()
    notificationsLoaded$ = this.actions$.pipe(
        ofType<NotificationsLoaded>(NotificationActionTypes.NotificationsLoaded),
        filter((action) => action.notificatons.some(n => !n.seen)),
        switchMap((action) => {
            const actions: Action[] = [];
            for (const n of action.notificatons) {
                if (!n.seen) actions.push(new MarkNotificationsAsSeen(n._id));
            }
            return actions;
        })
    );

    @Effect()
    markNotification$ = this.actions$.pipe(
        ofType<MarkNotificationsAsSeen>(NotificationActionTypes.MarkNotificationsAsSeen),
        switchMap((action) => {
            return this.attendeeService.markNotificationAsSeen(action.id).pipe(
                map(() => new NotificationsMarked()),
                catchError((err) => of(new GlobalError(err)))
            );
        })
    );
}