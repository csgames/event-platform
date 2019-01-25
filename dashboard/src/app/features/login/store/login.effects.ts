import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { LoginActionTypes, LoginFailure, LoginSuccess, PerformLogin } from "./login.actions";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { of } from "rxjs";
import { AuthenticationService } from "../../../providers/authentication.service";

@Injectable()
export class LoginEffects {
    constructor(
        private actions$: Actions,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}

    @Effect()
    login$ = this.actions$.pipe(
        ofType<PerformLogin>(LoginActionTypes.PerformLogin),
        exhaustMap((action: PerformLogin) =>
            this.authenticationService.login(action.payload).pipe(
                map(() => new LoginSuccess()),
                catchError(() => of(new LoginFailure()))
            )
        )
    );

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$.pipe(
        ofType<LoginSuccess>(LoginActionTypes.LoginSuccess),
        tap(() => {
            this.router.navigate(["/dashboard"]);
        })
    );
}
