import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { SubscriptionService } from "../providers/subscription.service";
import { CheckIfSubscribedToActivity, InfoActivityActionTypes, SubscribedToActivity, NotSubscribedToActivity, SubscribeToActivity, SubscriptionError } from "./info-activity.actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class InfoActivityEffects {
    constructor(private action$: Actions,
                private subscriptionService: SubscriptionService) {}

    @Effect()
    checkSubscription$ = this.action$.pipe(
        ofType<CheckIfSubscribedToActivity>(InfoActivityActionTypes.CheckIfSubscribedToActivity),
        switchMap((action: CheckIfSubscribedToActivity) => {
            return this.subscriptionService.checkIfSubscribed(action.subscription).pipe(
                map(() => new SubscribedToActivity()),
                catchError(() => of(new NotSubscribedToActivity()))
            );
        })
    );

    @Effect()
    subscribe$ = this.action$.pipe(
        ofType<SubscribeToActivity>(InfoActivityActionTypes.SubscribeToActivity),
        switchMap((action: SubscribeToActivity) => {
            return this.subscriptionService.addSubscription(action.subscription).pipe(
                map(() => new SubscribedToActivity()),
                catchError(() => of(new SubscriptionError()))
            );
        })
    );
}