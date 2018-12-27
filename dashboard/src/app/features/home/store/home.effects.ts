import { Injectable } from "@angular/core";
import { HomeService } from "../providers/home.service";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { HomeActionTypes, LoadTeams, LoadTeamsFailure, LoadTeamsSuccess } from "./home.actions";
import { catchError, exhaustMap, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class HomeEffects {
    constructor(private actions$: Actions, private homeService: HomeService) {}

    @Effect()
    loadTeams$ = this.actions$.pipe(
        ofType<LoadTeams>(HomeActionTypes.LoadTeams),
        exhaustMap(() => {
            return this.homeService.fetchTeams().pipe(
                map(teams => {
                    return new LoadTeamsSuccess(teams);
                }),
                catchError(() => of(new LoadTeamsFailure()))
            );
        })
    );
}
