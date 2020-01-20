import { CanActivate, Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { State } from "src/app/store/app.reducers";
import * as fromApp from "../../../store/app.reducers";
import { Injectable } from "@angular/core";
import { filter, map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class NotRegisteredGuard implements CanActivate {
    attendee$ = this.store$.pipe(select(fromApp.getCurrentAttendee));

    constructor(private store$: Store<State>, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.attendee$.pipe(
            filter(a => !!a),
            tap((a) => {
                if (a.registered) {
                    this.router.navigate(["/team"]);
                }
            }),
            map(a => !a.registered)
        );
    }
}
