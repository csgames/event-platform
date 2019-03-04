import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { SubscriptionService } from "../providers/subscription.service";
import {
    CheckIfSubscribedToCompetition,
    CompetitionCardActionTypes,
    SubscribedToCompetition,
    NotSubscribedToCompetition,
    SubscribeToCompetition,
    SubscriptionError,
    ShowCompetitionInfo
} from "./competition-card.actions";
import { State } from "./competition-card.reducer";
import { switchMap, map, catchError, withLatestFrom, delay, filter } from "rxjs/operators";
import { of } from "rxjs";
import { Store, select } from "@ngrx/store";
import { getCurrentAttendee } from "src/app/store/app.reducers";
import { Attendee } from "src/app/api/models/attendee";
import { SimpleModalService } from "ngx-simple-modal";
import { InfoCompetitionComponent } from "../../info-competition/info-competition.component";
import { LoadCompetitions } from "../../../store/competitions.actions";
import { GlobalError } from "src/app/store/app.actions";

@Injectable()
export class CompetitionCardEffects {
    constructor(private action$: Actions,
                private subscriptionService: SubscriptionService,
                private store$: Store<State>,
                private modalService: SimpleModalService) {}

    @Effect()
    checkSubscription$ = this.action$.pipe(
        ofType<CheckIfSubscribedToCompetition>(CompetitionCardActionTypes.CheckIfSubscribedToCompetition),
        withLatestFrom(this.store$.pipe(select(getCurrentAttendee))),
        switchMap(([action, attendee]: [CheckIfSubscribedToCompetition, Attendee]) => {
            return this.subscriptionService.checkIfSubscribed({
                attendeeId: attendee._id,
                activityId: action.activityId
            }).pipe(
                map(() => new SubscribedToCompetition()),
                catchError(() => of(new NotSubscribedToCompetition()))
            );
        })
    );

    @Effect()
    subscribe$ = this.action$.pipe(
        ofType<SubscribeToCompetition>(CompetitionCardActionTypes.SubscribeToCompetition),
        withLatestFrom(this.store$.pipe(select(getCurrentAttendee))),
        switchMap(([action, attendee]: [SubscribeToCompetition, Attendee]) => {
            return this.subscriptionService.addSubscription({
                attendeeId: attendee._id,
                competitionId: action.competitionId
            }).pipe(
                map(() => new SubscribedToCompetition()),
                catchError(() => of(new SubscriptionError()))
            );
        })
    );

    @Effect()
    showCompetitionInfo$ = this.action$.pipe(
        ofType<ShowCompetitionInfo>(CompetitionCardActionTypes.ShowCompetitionInfo),
        switchMap((action: ShowCompetitionInfo) => {
            return this.modalService.addModal(InfoCompetitionComponent, action.payload).pipe(
                filter((x) => x),
                map(() => new LoadCompetitions()),
                catchError(err => of(new GlobalError(err)))
            );
        })
    );
}
