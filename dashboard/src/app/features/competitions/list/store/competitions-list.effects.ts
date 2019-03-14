import { Injectable } from "@angular/core";
import { CompetitionsService } from "src/app/providers/competitions.service";
import { SubscriptionService } from "../components/competition-card/providers/subscription.service";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
    LoadCompetitions,
    CompetitionsListActionTypes,
    CompetitionsLoaded,
    CheckIfSubscribedToCompetition,
    SubscribedToCompetition,
    NotSubscribedToCompetition,
    SubscribeToCompetition,
    SubscriptionError,
    ShowCompetitionInfo
} from "./competitions-list.actions";
import { switchMap, map, catchError, withLatestFrom, filter, concatMap } from "rxjs/operators";
import { of } from "rxjs";
import { Store, select } from "@ngrx/store";
import { getCurrentAttendee } from "src/app/store/app.reducers";
import { Attendee } from "src/app/api/models/attendee";
import { SimpleModalService } from "ngx-simple-modal";
import { InfoCompetitionComponent } from "../components/info-competition/info-competition.component";
import { GlobalError } from "src/app/store/app.actions";
import { State } from "./competitions-list.reducer";
import { Competition } from "src/app/api/models/competition";

@Injectable()
export class CompetitionsListEffects {
    constructor(private actions$: Actions,
                private competitionService: CompetitionsService,
                private subscriptionService: SubscriptionService,
                private store$: Store<State>,
                private modalService: SimpleModalService) { }

    @Effect()
    loadCompetitions$ = this.actions$.pipe(
        ofType<LoadCompetitions>(CompetitionsListActionTypes.LoadCompetitions),
        switchMap(() => this.competitionService.getCompetitionsForEvent()
            .pipe(
                map((competitions: Competition[]) => new CompetitionsLoaded(competitions))
            )
        )
    );

    @Effect()
    checkSubscription$ = this.actions$.pipe(
        ofType<CheckIfSubscribedToCompetition>(CompetitionsListActionTypes.CheckIfSubscribedToCompetition),
        withLatestFrom(this.store$.pipe(select(getCurrentAttendee))),
        concatMap(([action, attendee]: [CheckIfSubscribedToCompetition, Attendee]) => {
            return this.subscriptionService.checkIfSubscribed({
                attendeeId: attendee._id,
                activityId: action.activityId
            }).pipe(
                map(() => new SubscribedToCompetition(action.activityId)),
                catchError(() => of(new NotSubscribedToCompetition(action.activityId)))
            );
        })
    );

    @Effect()
    subscribe$ = this.actions$.pipe(
        ofType<SubscribeToCompetition>(CompetitionsListActionTypes.SubscribeToCompetition),
        withLatestFrom(this.store$.pipe(select(getCurrentAttendee))),
        switchMap(([action, attendee]: [SubscribeToCompetition, Attendee]) => {
            return this.subscriptionService.addSubscription({
                attendeeId: attendee._id,
                competitionId: action.competitionId
            }).pipe(
                map(() => new LoadCompetitions()),
                catchError(() => of(new SubscriptionError()))
            );
        })
    );

    @Effect()
    showCompetitionInfo$ = this.actions$.pipe(
        ofType<ShowCompetitionInfo>(CompetitionsListActionTypes.ShowCompetitionInfo),
        switchMap((action: ShowCompetitionInfo) => {
            return this.modalService.addModal(InfoCompetitionComponent, action.payload).pipe(
                filter((x) => x),
                map(() => new LoadCompetitions()),
                catchError(err => of(new GlobalError(err)))
            );
        })
    );
}
