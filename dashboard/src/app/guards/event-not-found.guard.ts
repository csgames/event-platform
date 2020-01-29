import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { getEvents, State } from "../store/app.reducers";

@Injectable()
export class EventNotFoundGuard implements CanActivate {
    private events$ = this.store$.select(getEvents);

    constructor(
        private store$: Store<State>,
        private router: Router
    ) {}

    public canActivate(): Observable<boolean> {
        return this.events$.pipe(
            map(x => !!x && !x.length),
            tap((found) => {
                if (!found) {
                    this.router.navigate(["/"]);
                }
            })
        );
    }
}
