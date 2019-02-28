import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
    AddTeam,
    LoadSchools,
    LoadTeams,
    LoadTeamsFailure,
    SchoolsLoaded,
    TeamEditActionTypes,
    TeamsLoaded
} from "./team-edit.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { EventService } from "../../../../providers/event.service";
import { State } from "../../../../store/app.reducers";
import { Store } from "@ngrx/store";
import { Team } from "../../../../api/models/team";
import { of } from "rxjs";
import { SchoolService } from "../../../../providers/school.service";
import { School } from "../../../../api/models/school";
import { GlobalError } from "../../../../store/app.actions";
import { RegisterService } from "../../../../providers/register.service";
import { Registration } from "../../../../api/models/registration";

@Injectable()
export class TeamEditEffects {

    constructor(private actions$: Actions,
                private store$: Store<State>,
                private registerService: RegisterService,
                private schoolService: SchoolService,
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

    @Effect()
    loadSchools$ = this.actions$.pipe(
        ofType<LoadSchools>(TeamEditActionTypes.LoadSchools),
        switchMap(() =>
            this.schoolService.getAllSchools().pipe(
                map((schools: School[]) => new SchoolsLoaded(schools)),
                catchError((e) => of(new GlobalError(e)))
            )
        )
    );

    @Effect()
    addTeam$ = this.actions$.pipe(
        ofType<AddTeam>(TeamEditActionTypes.AddTeam),
        switchMap((action: AddTeam) =>
            this.registerService.createRegistration(action.addTeamDto).pipe(
                map((registration: Registration) => new LoadTeams()),
                catchError((e) => of(new GlobalError(e)))
            )
        )
    );
}
