import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { LoadCurrentAttendee, LoadEvents } from "../../store/app.actions";
import { getCurrentEvent, getEvents, State } from "../../store/app.reducers";
import { select, Store } from "@ngrx/store";

@Component({
    selector: "app-dashboard",
    templateUrl: "dashboard.template.html",
    styleUrls: ["./dashboard.style.scss"]
})

export class DashboardComponent implements OnInit, OnDestroy {

    events$ = this.store$.pipe(select(getEvents));
    currentEvent$ = this.store$.pipe(select(getCurrentEvent));

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    constructor(private breakpointObserver: BreakpointObserver, private store$: Store<State>) {
        this.store$.dispatch(new LoadEvents());
        this.store$.dispatch(new LoadCurrentAttendee());
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}
