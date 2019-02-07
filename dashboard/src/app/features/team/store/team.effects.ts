import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TeamService } from "src/app/providers/team.service";
import {
    LoadTeam,
    TeamActionTypes,
    LoadTeamSuccess,
    LoadTeamFailure,
    UpdateTeamName,
    AddTeamMember,
    AddTeamGodparent,
    AddMemberFailure
} from "./team.actions";
import { exhaustMap, map, catchError, withLatestFrom, switchMap, tap } from "rxjs/operators";
import { Team } from "src/app/api/models/team";
import { of } from "rxjs";
import { GlobalError } from "src/app/store/app.actions";
import { Store, select, Action } from "@ngrx/store";
import { State, getCurrentTeam } from "./team.reducer";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class TeamEffects {
    constructor(private teamService: TeamService,
                private actions$: Actions,
                private store$: Store<State>,
                private translateService: TranslateService,
                private toastr: ToastrService) { }

    @Effect()
    loadTeam$ = this.actions$.pipe(
        ofType<LoadTeam>(TeamActionTypes.LoadTeam),
        switchMap(() =>
            this.teamService.getTeam().pipe(
                map((team: Team) => new LoadTeamSuccess(team)),
                catchError(() => of(new LoadTeamFailure()))
        ))
    );

    @Effect()
    updateTeamName$ = this.actions$.pipe(
        ofType<UpdateTeamName>(TeamActionTypes.UpdateTeamName),
        withLatestFrom(this.store$.pipe(select(getCurrentTeam))),
        switchMap(([action, team]: [UpdateTeamName, Team]) =>
            this.teamService.updateTeamName(action.newTeamName, team._id).pipe(
                map(() => new LoadTeam()),
                catchError((error: Error) => of(new GlobalError(error)))
        ))
    );

    @Effect()
    addTeamMember$ = this.actions$.pipe(
        ofType<AddTeamMember>(TeamActionTypes.AddTeamMember),
        withLatestFrom(this.store$.pipe(select(getCurrentTeam))),
        switchMap(([action, team]: [AddTeamMember, Team]) =>
            this.teamService.addTeamMember(action.payload, team.name, "attendee").pipe(
                map(() => new LoadTeam()),
                catchError(err => {
                    if (err.status === 400) {
                        return of(new AddMemberFailure(err.error) as Action);
                    }
                    return of(new GlobalError(err) as Action);
                })
            ))
    );

    @Effect()
    addTeamGodparent$ = this.actions$.pipe(
        ofType<AddTeamGodparent>(TeamActionTypes.AddTeamGodparent),
        withLatestFrom(this.store$.pipe(select(getCurrentTeam))),
        exhaustMap(([action, team]: [AddTeamGodparent, Team]) =>
            this.teamService.addTeamGodparent(action.payload, team.name, "godparent").pipe(
                map(() => new LoadTeam()),
                catchError(err => {
                    if (err.status === 400) {
                        return of(new AddMemberFailure(err.error) as Action);
                    }
                    return of(new GlobalError(err) as Action);
                })
            ))
    );

    @Effect({ dispatch: false})
    addMemberFailure$ = this.actions$.pipe(
        ofType<AddMemberFailure>(TeamActionTypes.AddMemberFailure),
        tap((action: AddMemberFailure) => {
            const title = this.translateService.instant("components.toast.add_member_failure");
            this.toastr.error(action.err.message, title);
        })
    );
}
