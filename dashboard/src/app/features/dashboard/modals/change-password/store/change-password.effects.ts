import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { ChangePasswordActionTypes, PerformChangePassword, PasswordChanged, ChangePasswordFailure } from "./change-password.actions";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { UserService } from "../providers/user.service";
import { AttendeeUpdated } from "../../profile-setting/store/profile-setting.actions";
import { GlobalError } from "src/app/store/app.actions";
import { of } from "rxjs";

@Injectable()
export class ChangePasswordEffects {
    constructor(private actions$: Actions,
                private userService: UserService,
                private translateService: TranslateService,
                private toastrService: ToastrService) { }

    @Effect()
    changePassword$ = this.actions$.pipe(
        ofType<PerformChangePassword>(ChangePasswordActionTypes.PerformChangePassword),
        switchMap((action: PerformChangePassword) => {
            return this.userService.changePassword(action.payload).pipe(
                map(() => new PasswordChanged()),
                catchError(() => of(new ChangePasswordFailure()))
            );
        })
    );

    @Effect({ dispatch: false })
    passwordChanged$ = this.actions$.pipe(
        ofType<PasswordChanged>(ChangePasswordActionTypes.PasswordChanged),
        tap(() => {
            const text = this.translateService.instant("components.toast.password_success");
            this.toastrService.success(text);
        })
    );

    @Effect({ dispatch: false })
    changeFail$ = this.actions$.pipe(
        ofType<ChangePasswordFailure>(ChangePasswordActionTypes.ChangePasswordFailure),
        tap(() => {
            const text = this.translateService.instant("components.toast.password_failure");
            this.toastrService.error(text);
        })
    );
}