import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { LoadTeams, LoadTeamsFailure, TeamEditActionTypes, TeamsLoaded } from "./team-edit.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { EventService } from "../../../../providers/event.service";
import { State } from "../../../../store/app.reducers";
import { Store } from "@ngrx/store";
import { Team } from "../../../../api/models/team";
import { of } from "rxjs";

@Injectable()
export class TeamEditEffects {

    constructor(private actions$: Actions,
                private store$: Store<State>,
                private eventService: EventService) {}

    @Effect()
    loadTeams$ = this.actions$.pipe(
        ofType<LoadTeams>(TeamEditActionTypes.LoadTeams),
        switchMap(() =>
            this.eventService.getTeams().pipe(
                map((teams: Team[]) => new TeamsLoaded(teams)),
                catchError(() => of(new LoadTeamsFailure()))
            )
        )
    );
}
