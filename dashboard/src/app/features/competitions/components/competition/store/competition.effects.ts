import { Actions, Effect, ofType } from "@ngrx/effects";
import { CompetitionsService } from "src/app/providers/competitions.service";
import { Injectable } from "@angular/core";
import { CompetitionActionTypes, LoadCompetition, CompetitionLoaded, LoadCompetitionError } from "./competition.actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class CompetitionEffects {
    constructor(private actions$: Actions,
                private competitionService: CompetitionsService) {}
    
    @Effect()
    loadCompetition$ = this.actions$.pipe(
        ofType<LoadCompetition>(CompetitionActionTypes.LoadCompetition),
        switchMap((action: LoadCompetition) => this.competitionService.getInfoForCompetition(action.competitionId)
            .pipe(
                map((competition) => new CompetitionLoaded(competition)),
                catchError(() => of(new LoadCompetitionError()))
            )
        )
    );
    
}
