import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { getEvents, State } from "../store/app.reducers";
import { Event } from "../api/models/event";

@Injectable()
export class EventFoundGuard implements CanActivate {
    private events$ = this.store$.select(getEvents);

    constructor(
        private store$: Store<State>,
        private router: Router
    ) {}

    public canActivate(): Observable<boolean> {
        return this.events$.pipe(
            map((events: Event[]) => {
                if (events?.length === 0 && !localStorage.getItem("CURRENT_EVENT")) {
                    this.router.navigate(["/event/404"]);
                    return false;
                }
                return true;
            })
        );
    }
}
