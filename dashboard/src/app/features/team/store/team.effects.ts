import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TeamService } from "src/app/providers/team.service";
import { LoadTeam, TeamActionTypes, LoadTeamSuccess, LoadTeamFailure, UpdateTeamName, AddTeamMember } from "./team.actions";
import { exhaustMap, map, catchError, withLatestFrom, switchMap } from "rxjs/operators";
import { Team } from "src/app/api/models/team";
import { of } from "rxjs";
import { GlobalError } from "src/app/store/app.actions";
import { Store, select } from "@ngrx/store";
import { State, getCurrentTeam } from "./team.reducer";

@Injectable()
export class TeamEffects {
    constructor(private teamService: TeamService, private actions$: Actions, private store$: Store<State>) {

    }

    @Effect()
    loadTeam$ = this.actions$.pipe(
        ofType<LoadTeam>(TeamActionTypes.LoadTeam),
        switchMap(() => this.teamService.getTeam().pipe(
            map((team: Team) => new LoadTeamSuccess(team)),
            catchError(() => of(new LoadTeamFailure()))
        ))
    );

    @Effect()
    updateTeamName$ = this.actions$.pipe(
        ofType<UpdateTeamName>(TeamActionTypes.UpdateTeamName),
        withLatestFrom(this.store$.pipe(select(getCurrentTeam))),
        exhaustMap(([action, team]: [UpdateTeamName, Team]) => this.teamService.updateTeamName(action.newTeamName, team._id).pipe(
            map(() => new LoadTeam()),
            catchError((error: Error) => of(new GlobalError(error)))
        ))
    );

    @Effect()
    addTeamMember$ = this.actions$.pipe(
        ofType<AddTeamMember>(TeamActionTypes.AddTeamMember),
        withLatestFrom(this.store$.pipe(select(getCurrentTeam))),
        exhaustMap(([action, team]: [AddTeamMember, Team]) => this.teamService.addTeamMember(action.payload.newAttendee, team.name, 
            action.payload.role).pipe(
            map(() => new LoadTeam()),
            catchError((error: Error) => of(new GlobalError(error)))
        ))
    );

}
