import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { SubscriptionService } from "../providers/subscription.service";
import {
    CheckIfSubscribedToActivity,
    InfoActivityActionTypes,
    SubscribedToActivity,
    NotSubscribedToActivity,
    SubscribeToActivity,
    SubscriptionError
} from "./info-activity.actions";
import { State } from "./info-activity.reducer";
import { switchMap, map, catchError, withLatestFrom, delay } from "rxjs/operators";
import { of } from "rxjs";
import { Store, select } from "@ngrx/store";
import { getCurrentAttendee } from "src/app/store/app.reducers";
import { Attendee } from "src/app/api/models/attendee";

@Injectable()
export class InfoActivityEffects {
    constructor(private action$: Actions,
                private subscriptionService: SubscriptionService,
                private store$: Store<State>) {}

    @Effect()
    checkSubscription$ = this.action$.pipe(
        ofType<CheckIfSubscribedToActivity>(InfoActivityActionTypes.CheckIfSubscribedToActivity),
        withLatestFrom(this.store$.pipe(select(getCurrentAttendee))),
        switchMap(([action, attendee]: [CheckIfSubscribedToActivity, Attendee]) => {
            return this.subscriptionService.checkIfSubscribed({
                attendeeId: attendee._id,
                activityId: action.activityId
            }).pipe(
                map(() => new SubscribedToActivity()),
                catchError(() => of(new NotSubscribedToActivity()))
            );
        })
    );

    @Effect()
    subscribe$ = this.action$.pipe(
        ofType<SubscribeToActivity>(InfoActivityActionTypes.SubscribeToActivity),
        withLatestFrom(this.store$.pipe(select(getCurrentAttendee))),
        switchMap(([action, attendee]: [SubscribeToActivity, Attendee]) => {
            return this.subscriptionService.addSubscription({
                attendeeId: attendee._id,
                activityId: action.activityId
            }).pipe(
                map(() => new SubscribedToActivity()),
                catchError(() => of(new SubscriptionError()))
            );
        })
    );
}
