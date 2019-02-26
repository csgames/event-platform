import { Injectable } from "@angular/core";
import { CompetitionsService } from "src/app/providers/competitions.service";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { LoadCompetitions, CompetitionsActionTypes, CompetitionsLoaded } from "./competitions.actions";
import { switchMap, map, catchError, filter } from "rxjs/operators";
import { of } from "rxjs";
import { GlobalError } from "src/app/store/app.actions";
import { Competition } from "src/app/api/models/competition";

@Injectable()
export class CompetitionsEffects {
    constructor(private actions$: Actions,
                private competitionService: CompetitionsService) { }

    // @Effect()
    // loadCompetitions$ = this.actions$.pipe(
    //     ofType<LoadCompetitions>(CompetitionsActionTypes.LoadCompetitions),
    //     switchMap(() => {
    //         return this.competitionService.getCompetitionsForEvent().pipe(
    //             map((competitions => new CompetitionsLoaded(competitions)),
    //             catchError(err => of(new GlobalError(err)))
    //         ));
    //     })
    // );
}
