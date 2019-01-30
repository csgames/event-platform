import { CanActivate } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { State } from "src/app/store/app.reducers";
import * as fromApp from '../../../store/app.reducers'
import { Injectable } from "@angular/core";

@Injectable()
export class NotRegisteredGuard implements CanActivate {
    attendee$ = this.store$.pipe(select(fromApp.getCurrentAttendee));

    constructor(private store$: Store<State>) { }

    async canActivate(): Promise<boolean> {
        const attendee = await this.attendee$.toPromise();
        console.log(attendee.registered)        
        return !attendee.registered;
    }
}