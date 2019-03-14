import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { CompetitionsService } from "src/app/providers/competitions.service";
import { SaveCompetitionEdit, CompetitionEditActionTypes, CompetitionEditSaved, CompetitionEditError } from "./competition-edit.actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class CompetitionEditEffects {
    constructor(private actions$: Actions,
                private competitionService: CompetitionsService) {}
    
    @Effect()
    saveCompetition$ = this.actions$.pipe(
        ofType(CompetitionEditActionTypes.SaveCompetitionEdit),
        switchMap((action: SaveCompetitionEdit) => {
            return this.competitionService.updateCompetition(action.competitionId).pipe(
                map(() => new CompetitionEditSaved()),
                catchError(() => of(new CompetitionEditError()))
            );
        })
    );
}
