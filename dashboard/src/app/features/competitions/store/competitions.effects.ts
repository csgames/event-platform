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
    SubscribeCompetition
} from "./competitions.actions";
import { switchMap, map, catchError, filter, tap } from "rxjs/operators";
import { of } from "rxjs";
import { GlobalError } from "src/app/store/app.actions";
import { Competition } from "src/app/api/models/competition";
import { SimpleModalService } from "ngx-simple-modal";

@Injectable()
export class CompetitionsEffects {
    constructor(private actions$: Actions,
                private competitionService: CompetitionsService) { }

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
    loadSubscribedCompetitions$ = this.actions$.pipe(
        ofType<LoadSubscribedCompetitions>(CompetitionsActionTypes.LoadSubscribedCompetitions),
        map(() => new SubscribedCompetitionsLoaded(this.competitionService.getSubscribedCompetitions()))
    );

    @Effect()
    subscribeCompetition$ = this.actions$.pipe(
        ofType<SubscribeCompetition>(CompetitionsActionTypes.SubscribeCompetition),
        tap((action: SubscribeCompetition) => this.competitionService.toggleCompetitionSubscribed(action.competition)),
        map(() => new LoadSubscribedCompetitions())
    );

}
