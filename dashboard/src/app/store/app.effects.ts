import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { AuthenticationService } from "../providers/authentication.service";
import { AppActionTypes, CurrentAttendeeLoaded, GlobalError, LoadCurrentAttendee, Logout } from "./app.actions";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AttendeeService } from "../providers/attendee.service";
import { Attendee } from "../api/models/attendee";
import { of } from "rxjs";

@Injectable()
export class AppEffects {

    constructor(
        private actions$: Actions,
        private authenticationService: AuthenticationService,
        private attendeeService: AttendeeService,
        private router: Router
    ) {}

    @Effect({ dispatch: false })
    logout$ = this.actions$.pipe(
        ofType<Logout>(AppActionTypes.Logout),
        exhaustMap(() => {
            return this.authenticationService.logout().pipe(
                tap(() => {
                    this.router.navigate(["/login"]);
                })
            );
        })
    );

    // @Effect({ dispatch: false })
    // globalError$ = this.actions$.pipe(
    //     ofType<GlobalError>(AppActionTypes.GlobalError),
    //     tap((globalError: GlobalError) => {}
    //         // this.toastrService.error(globalError.payload.message, "Error", {
    //         //     closeButton: true,
    //         //     progressBar: true,
    //         //     positionClass: "toast-top-right",
    //         //     timeOut: 10000
    //         // })
    //     )
    // );

    @Effect()
    loadCurrentAttendee$ = this.actions$.pipe(
        ofType<LoadCurrentAttendee>(AppActionTypes.LoadCurrentAttendee),
        exhaustMap(() => {
            return this.attendeeService.getAttendeeInfo().pipe(
                map((a: Attendee) => new CurrentAttendeeLoaded(a)),
                catchError((e) => of(new GlobalError(e)))
            );
        })
    );

}
