import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { RegisterService } from "../../../providers/register.service";
import { LoadRegistration, RegisterActionTypes, RegistrationError, RegistrationLoaded } from "./register.actions";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { Registration } from "../../../api/models/registration";
import { of } from "rxjs";

@Injectable()
export class RegisterEffects {
    constructor(
        private actions$: Actions,
        private registerService: RegisterService) {}

    @Effect()
    loadRegistrationInfo$ = this.actions$.pipe(
        ofType<LoadRegistration>(RegisterActionTypes.LoadRegistration),
        exhaustMap((action: LoadRegistration) => {
            return this.registerService.getRegistrationInfo(action.uuid).pipe(
                map((registrationInfo: Registration) => new RegistrationLoaded(registrationInfo)),
                catchError(() => of(new RegistrationError()))
            );
        })
    );
}
