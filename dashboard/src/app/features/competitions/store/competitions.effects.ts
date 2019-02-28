import { Injectable } from "@angular/core";
import { CompetitionsService } from "src/app/providers/competitions.service";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
    LoadCompetitions,
    CompetitionsActionTypes,
    CompetitionsLoaded,
    LoadCompetitionsError,
    LoadSubscribedCompetitions,
    SubscribedCompetitionsLoaded,
    SubscribeCompetition,
    LoadSubscribedCompetitionsError
} from "./competitions.actions";
import { switchMap, map, catchError, filter, tap } from "rxjs/operators";
import { of } from "rxjs";
import { GlobalError } from "src/app/store/app.actions";
import { Competition } from "src/app/api/models/competition";
import { SimpleModalService } from "ngx-simple-modal";

@Injectable()
export class CompetitionsEffects {
    constructor(private actions$: Actions,
        private competitionService: CompetitionsService,
        private modalService: SimpleModalService) { }

    @Effect()
    loadCompetitions$ = this.actions$.pipe(
        ofType<LoadCompetitions>(CompetitionsActionTypes.LoadCompetitions),
        switchMap(() => this.competitionService.getCompetitionsForEvent()
            .pipe(
                map((competitions) => new CompetitionsLoaded(competitions)),
                catchError(() => of(new LoadCompetitionsError()))
            )
        )
    );

    @Effect()
    LoadSubscribedCompetitions$ = this.actions$.pipe(
        ofType<LoadSubscribedCompetitions>(CompetitionsActionTypes.LoadSubscribedCompetitions),
        switchMap(() => this.competitionService.getSubscribedCompetitions()
            .pipe(
                map((competitions) => new SubscribedCompetitionsLoaded(competitions)),
                catchError(() => of(new LoadSubscribedCompetitionsError()))
            )
        )
    );

    // @Effect()
    // subscribedCompetitions$ = this.actions$.pipe(
    //     ofType<SubscribeCompetition>(CompetitionsActionTypes.SubscribeCompetition),
    //     tap((action: SubscribeCompetition) => this.competitionService.toggleCompetitionSubscribed(action.type)),
    //     map(() => new LoadSubscribedCompetitions())
    // );

}
