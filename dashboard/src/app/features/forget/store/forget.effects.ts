import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ForgetActionTypes, ForgetFailure, ForgetSuccess, PerformForget } from "./forget.actions";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { of } from "rxjs";
import { PasswordService } from "src/app/providers/password.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ForgetEffects {
    constructor(
        private actions$: Actions,
        private passwordService: PasswordService,
        private toastr: ToastrService
    ) {}

    @Effect()
    forget$ = this.actions$.pipe(
        ofType<PerformForget>(ForgetActionTypes.PerformForget),
        exhaustMap((action: PerformForget) =>
            this.passwordService.forget(action.payload.email).pipe(
                map(() => new ForgetSuccess()),
                catchError(() => of(new ForgetFailure()))
            )
        )
    );

    @Effect({ dispatch: false })
    resetSuccess$ = this.actions$.pipe(
        ofType<ForgetSuccess>(ForgetActionTypes.ForgetSuccess),
        tap(() => {
            this.toastr.success('Successfully sent the email to the user.');
        })
    );

    @Effect({ dispatch: false })
    resetFail$ = this.actions$.pipe(
        ofType<ForgetFailure>(ForgetActionTypes.ForgetFailure),
        tap(() => {
            this.toastr.error('An error occured while sending the reset password email.');
        })
    );    
}
