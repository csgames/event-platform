import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { RegisterService } from "../../../providers/register.service";
import {
    LoadRegistration,
    PerformRegistration, PerformRegistrationError,
    PerformRegistrationSuccess,
    RegisterActionTypes,
    RegistrationError,
    RegistrationLoaded
} from "./register.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Registration } from "../../../api/models/registration";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class RegisterEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private registerService: RegisterService) {}

    @Effect()
    loadRegistrationInfo$ = this.actions$.pipe(
        ofType<LoadRegistration>(RegisterActionTypes.LoadRegistration),
        switchMap((action: LoadRegistration) => {
            return this.registerService.getRegistrationInfo(action.uuid).pipe(
                map((registrationInfo: Registration) => new RegistrationLoaded(registrationInfo)),
                catchError(() => of(new RegistrationError()))
            );
        })
    );

    @Effect()
    performRegistration$ = this.actions$.pipe(
        ofType<PerformRegistration>(RegisterActionTypes.PerformRegistration),
        switchMap((action: PerformRegistration) => {
            return this.registerService.registerAttendee(action.payload.uuid, action.payload.userFormDto).pipe(
                map(() => new PerformRegistrationSuccess()),
                catchError(() => of(new PerformRegistrationError()))
            );
        })
    );

    @Effect({ dispatch: false })
    performRegistrationSuccess$ = this.actions$.pipe(
        ofType<PerformRegistrationSuccess>(RegisterActionTypes.PerformRegistrationSuccess),
        tap(() => this.router.navigate(["/login"]))
    );
}
