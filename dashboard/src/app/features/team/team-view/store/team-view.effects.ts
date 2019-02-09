import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TeamService } from "src/app/providers/team.service";
import {
    LoadTeam,
    TeamViewActionTypes,
    LoadTeamSuccess,
    LoadTeamFailure,
    UpdateTeamName,
    AddTeamMember,
    AddTeamGodparent,
    AddMemberFailure,
    UpdateTeamNameFailure
} from "./team-view.actions";
import { map, catchError, withLatestFrom, switchMap, concatMap, tap } from "rxjs/operators";
import { Team } from "src/app/api/models/team";
import { of } from "rxjs";
import { GlobalError } from "src/app/store/app.actions";
import { Store, select, Action } from "@ngrx/store";
import { State, getCurrentTeam } from "./team-view.reducer";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { getCurrentAttendee } from "../../../../store/app.reducers";
import { Attendee } from "../../../../api/models/attendee";

@Injectable()
export class TeamViewEffects {
    constructor(private teamService: TeamService,
                private actions$: Actions,
                private store$: Store<State>,
                private translateService: TranslateService,
                private toastr: ToastrService) { }

    @Effect()
    loadTeam$ = this.actions$.pipe(
        ofType<LoadTeam>(TeamViewActionTypes.LoadTeam),
        withLatestFrom(this.store$.pipe(select(getCurrentAttendee)), this.store$.pipe(select(getCurrentTeam))),
        switchMap(([action, attendee, currentTeam]: [LoadTeam, Attendee, Team]) =>
            attendee.role === "admin" ?
                this.teamService.getTeamById(action.teamId || currentTeam._id).pipe(
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
                catchError(err => {
                    if (err.status === 400) {
                        return of(new UpdateTeamNameFailure(err.error) as Action);
                    }
                    return of(new GlobalError(err) as Action);
                })
            ))
    );

    @Effect()
    addTeamMember$ = this.actions$.pipe(
        ofType<AddTeamMember>(TeamViewActionTypes.AddTeamMember),
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
        ofType<AddTeamGodparent>(TeamViewActionTypes.AddTeamGodparent),
        withLatestFrom(this.store$.pipe(select(getCurrentTeam))),
        switchMap(([action, team]: [AddTeamGodparent, Team]) =>
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

    @Effect({ dispatch: false })
    addMemberFailure$ = this.actions$.pipe(
        ofType<AddMemberFailure>(TeamViewActionTypes.AddMemberFailure),
        tap((action: AddMemberFailure) => {
            const title = this.translateService.instant("components.toast.add_member_failure");
            this.toastr.error(action.err.message, title);
        })
    );

    @Effect({ dispatch: false })
    updateTeamNameFailure = this.actions$.pipe(
        ofType<UpdateTeamNameFailure>(TeamViewActionTypes.UpdateTeamNameFailure),
        tap((action: UpdateTeamNameFailure) => {
            const title = this.translateService.instant("components.toast.update_team_name_failure");
            this.toastr.error(action.err.message, title);
        })
    );

}
