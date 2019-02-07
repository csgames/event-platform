import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TeamService } from "src/app/providers/team.service";
import {
    LoadTeam, TeamViewActionTypes, LoadTeamSuccess, LoadTeamFailure, UpdateTeamName, AddTeamMember,
    AddTeamGodparent
} from "./team-view.actions";
import { exhaustMap, map, catchError, withLatestFrom, switchMap, concatMap } from "rxjs/operators";
import { Team } from "src/app/api/models/team";
import { of } from "rxjs";
import { GlobalError } from "src/app/store/app.actions";
import { Store, select } from "@ngrx/store";
import { State, getCurrentTeam } from "./team-view.reducer";

@Injectable()
export class TeamViewEffects {
    constructor(private teamService: TeamService,
                private actions$: Actions,
                private store$: Store<State>) { }

    @Effect()
    loadTeam$ = this.actions$.pipe(
        ofType<LoadTeam>(TeamViewActionTypes.LoadTeam),
        switchMap((action: LoadTeam) =>
            action.teamId ?
                this.teamService.getTeamById(action.teamId).pipe(
                    map((team: Team) => new LoadTeamSuccess(team)),
                    catchError(() => of(new LoadTeamFailure()))
                ) :
                this.teamService.getTeam().pipe(
                    map((team: Team) => new LoadTeamSuccess(team)),
                    catchError(() => of(new LoadTeamFailure()))
                )
        )
    );

    @Effect()
    updateTeamName$ = this.actions$.pipe(
        ofType<UpdateTeamName>(TeamViewActionTypes.UpdateTeamName),
        withLatestFrom(this.store$.pipe(select(getCurrentTeam))),
        switchMap(([action, team]: [UpdateTeamName, Team]) =>
            this.teamService.updateTeamName(action.newTeamName, team._id).pipe(
                map(() => new LoadTeam()),
                catchError((error: Error) => of(new GlobalError(error)))
            ))
    );

    @Effect()
    addTeamMember$ = this.actions$.pipe(
        ofType<AddTeamMember>(TeamViewActionTypes.AddTeamMember),
        withLatestFrom(this.store$.pipe(select(getCurrentTeam))),
        switchMap(([action, team]: [AddTeamMember, Team]) =>
            this.teamService.addTeamMember(action.payload, team.name, "attendee").pipe(
                map(() => new LoadTeam()),
                catchError((error: Error) => of(new GlobalError(error)))
            ))
    );

    @Effect()
    addTeamGodparent$ = this.actions$.pipe(
        ofType<AddTeamGodparent>(TeamViewActionTypes.AddTeamGodparent),
        withLatestFrom(this.store$.pipe(select(getCurrentTeam))),
        switchMap(([action, team]: [AddTeamGodparent, Team]) =>
            this.teamService.addTeamGodparent(action.payload, team.name, "godparent").pipe(
                map(() => new LoadTeam()),
                catchError((error: Error) => of(new GlobalError(error)))
            ))
    );

}
