import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ForgetActionTypes, ForgetFailure, ForgetSuccess, PerformForget } from "./forget.actions";
import { catchError, map, tap, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { PasswordService } from "src/app/providers/password.service";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class ForgetEffects {
    constructor(
        private actions$: Actions,
        private passwordService: PasswordService,
        private toastr: ToastrService,
        private translateService: TranslateService
    ) {}

    @Effect()
    forget$ = this.actions$.pipe(
        ofType<PerformForget>(ForgetActionTypes.PerformForget),
        switchMap((action: PerformForget) =>
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
            const text = this.translateService.instant("components.toast.email_success");
            this.toastr.success(text);
        })
    );

    @Effect({ dispatch: false })
    resetFail$ = this.actions$.pipe(
        ofType<ForgetFailure>(ForgetActionTypes.ForgetFailure),
        tap(() => {
            const text = this.translateService.instant("components.toast.email_failed");
            this.toastr.error(text);
        })
    );    
}
