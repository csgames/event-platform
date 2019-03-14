import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { CompetitionsService } from "src/app/providers/competitions.service";
import { Store } from "@ngrx/store";
import { State } from "../store/competition-admin.reducer";
import { LoadCompetitionsAdmin, CompetitionsAdminActionTypes, CompetitionsAdminLoaded } from "./competition-admin.actions";
import { switchMap, map } from "rxjs/operators";
import { Competition } from "src/app/api/models/competition";

@Injectable()
export class CompetitionAdminEffects {
  constructor(private actions$: Actions,
              private competitionService: CompetitionsService,
              private store$: Store<State>) { }

  @Effect()
  loadCompetitions$ = this.actions$.pipe(
    ofType<LoadCompetitionsAdmin>(CompetitionsAdminActionTypes.LoadCompetitionsAdmin),
    switchMap(() => this.competitionService.getCompetitionsForEvent()
            .pipe(
                map((competitions: Competition[]) => new CompetitionsAdminLoaded(competitions))
            )
        )
  );
}
