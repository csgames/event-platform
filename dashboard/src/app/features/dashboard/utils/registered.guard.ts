import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { State } from "src/app/store/app.reducers";
import * as fromApp from '../../../store/app.reducers'

@Injectable()
export class RegisteredGuard implements CanActivate {
    attendee$ = this.store$.pipe(select(fromApp.getCurrentAttendee));

    constructor(private store$: Store<State>,
                private router: Router) { }

    async canActivate(): Promise<boolean> {
        const attendee = await this.attendee$.toPromise();
        return attendee.registered;
    }
}