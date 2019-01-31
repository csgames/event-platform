import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { State } from "src/app/store/app.reducers";
import * as fromApp from "../../../store/app.reducers";
import { Observable } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

@Injectable()
export class RegisteredGuard implements CanActivate {
    attendee$ = this.store$.pipe(select(fromApp.getCurrentAttendee));

    constructor(private store$: Store<State>,
                private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.attendee$.pipe(
            filter(a => !!a),
            tap((a) => {
                if (!a.registered) {
                    this.router.navigate(["/onboarding"]);
                }
            }),
            map(a => a.registered)
        );
    }
}
