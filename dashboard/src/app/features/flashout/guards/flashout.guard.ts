import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { State, getCurrentEvent } from "../../../store/app.reducers";
import { filter, switchMap } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";

@Injectable()
export class FlashoutGuard implements CanActivate {
    private currentEvent$ = this.store$.pipe(select(getCurrentEvent));

    constructor(private store$: Store<State>, private router: Router) { }

    public canActivate(): Observable<boolean> {
        return this.currentEvent$.pipe(
            filter(x => x !== null),
            switchMap(event => {
                const now = new Date().toISOString();
                if (now > event.flashoutBeginDate && now < event.flashoutEndDate) {
                    return of(true);
                } else {
                    return fromPromise(this.router.navigate(["/home"]));
                }
            })
        );
    }
}
