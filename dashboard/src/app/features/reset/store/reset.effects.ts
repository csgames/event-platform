import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { PasswordService } from "src/app/providers/password.service";
import { ToastrService } from "ngx-toastr";
import { ResetFailure, ResetActionTypes, PerformReset, ResetSuccess, PerformValidate, ValidateFailure, ValidateSuccess } from "./reset.actions";
import { tap, exhaustMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class ResetEffects {
    constructor(
        private actions$: Actions,
        private passwordService: PasswordService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    @Effect()
    reset$ = this.actions$.pipe(
        ofType<PerformReset>(ResetActionTypes.PerformReset),
        exhaustMap((action: PerformReset) =>
            this.passwordService.reset(action.payload.uuid, action.payload.password).pipe(
                map(() => new ResetSuccess()),
                catchError(() => of(new ResetFailure()))
            )
        )
    );

    @Effect()
    validate$ = this.actions$.pipe(
        ofType<PerformValidate>(ResetActionTypes.PerformValidate),
        exhaustMap((action: PerformValidate) => 
            this.passwordService.validate(action.payload.uuid).pipe(
                map(() => new ValidateSuccess()),
                catchError(() => of(new ValidateFailure()))
            )
        )
    );

    @Effect({ dispatch: false })
    resetSuccess$ = this.actions$.pipe(
        ofType<ResetSuccess>(ResetActionTypes.ResetSuccess),
        tap(() => this.router.navigate(['/login']))
    );

    @Effect({ dispatch: false })
    resetFail$ = this.actions$.pipe(
        ofType<ResetFailure>(ResetActionTypes.ResetFailure),
        tap(() => this.toastr.error('An error occured while updating the password.'))
    );
}