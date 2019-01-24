import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ApiService } from "../../../api/api.service";
import { Router } from "@angular/router";
import { LoginActionTypes, LoginFailure, LoginSuccess, PerformLogin } from "./login.actions";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { Login } from "../../../api/definitions/auth";
import { of } from "rxjs";

@Injectable()
export class LoginEffects {
    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private router: Router
    ) {}

    @Effect()
    login$ = this.actions$.pipe(
        ofType<PerformLogin>(LoginActionTypes.PerformLogin),
        exhaustMap((action: PerformLogin) =>
            this.apiService.auth.login(action.payload).pipe(
                map((loginResult: Login) => new LoginSuccess()),
                catchError(() => of(new LoginFailure()))
            )
        )
    );

    @Effect()
    loginSuccess$ = this.actions$.pipe(
        ofType<LoginSuccess>(LoginActionTypes.LoginSuccess),
        tap(() => {
            this.router.navigate(["/dashboard"]);
        }),
        // map(() => new LoadCurrentPerson())
    );
}
