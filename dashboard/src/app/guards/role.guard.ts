import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducers";
import { State } from "../store/app.reducers";
import { Observable } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class RoleGuard implements CanActivate {
    attendee$ = this.store$.pipe(select(fromApp.getCurrentAttendee));

    constructor(private store$: Store<State>,
                private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const roles = route.data["roles"] as string[];
        const redirect = route.data["redirect"] as string;
        return this.attendee$.pipe(
            filter(a => !!a),
            map(a => roles.includes(a.role)),
            tap((matchesRole) => {
                if (!matchesRole) {
                    this.router.navigate([redirect]);
                }
            })
        );
    }
}
