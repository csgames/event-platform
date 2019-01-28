import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TeamService } from "src/app/providers/team.service";
import { LoadTeam, TeamActionTypes, LoadTeamSuccess, LoadTeamFailure, UpdateTeamName, AddTeamMember } from "./team.actions";
import { exhaustMap, map, catchError } from "rxjs/operators";
import { Team } from "src/app/api/models/team";
import { of } from "rxjs";
import { GlobalError } from "src/app/store/app.actions";

@Injectable()
export class TeamEffects {
    constructor(private teamService: TeamService, private actions$: Actions) {

    }

    @Effect()
    loadTeam$ = this.actions$.pipe(
        ofType<LoadTeam>(TeamActionTypes.LoadTeam),
        exhaustMap(() => this.teamService.getTeam().pipe(
            map((team: Team) => new LoadTeamSuccess(team)),
            catchError(() => of(new LoadTeamFailure()))
        ))
    );

    @Effect()
    updateTeamName$ = this.actions$.pipe(
        ofType<UpdateTeamName>(TeamActionTypes.UpdateTeamName),
        exhaustMap((action: UpdateTeamName) => this.teamService.updateTeamName(action.newTeamName).pipe(
            map(() => new LoadTeam()),
            catchError((error: Error) => of(new GlobalError(error)))
        ))
    );

    @Effect()
    addTeamMember$ = this.actions$.pipe(
        ofType<AddTeamMember>(TeamActionTypes.AddTeamMember),
        exhaustMap((action: AddTeamMember) => this.teamService.addTeamMember(action.payload).pipe(
            map(() => new LoadTeam()),
            catchError((error: Error) => of(new GlobalError(error)))
        ))
    );

}
