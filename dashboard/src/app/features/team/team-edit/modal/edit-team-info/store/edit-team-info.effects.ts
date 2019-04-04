import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { EditTeamInfoActionTypes, TeamUpdated, UpdateTeam } from "./edit-team-info.actions";
import { Store } from "@ngrx/store";
import { State } from "./edit-team-info.reducer";
import { TeamService } from "../../../../../../providers/team.service";

@Injectable()
export class EditTeamInfoEffects {
    constructor(private actions$: Actions, private store$: Store<State>, private teamService: TeamService) {}

    @Effect()
    updateTeam$ = this.actions$.pipe(
        ofType(EditTeamInfoActionTypes.UpdateTeam),
        switchMap((action: UpdateTeam) => {
            return this.teamService.updateTeam(action.payload.id, action.payload.team).pipe(
                map(() => new TeamUpdated())
            );
        })
    );
}
