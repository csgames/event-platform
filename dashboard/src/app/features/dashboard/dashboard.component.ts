import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { EditProfile, SetCurrentEvent, ChangePassword, EditAccount } from "../../store/app.actions";
import { getCurrentEvent, getEvents, getLoading, State } from "../../store/app.reducers";
import { select, Store } from "@ngrx/store";
import { Event } from "../../api/models/event";

@Component({
    selector: "app-dashboard",
    templateUrl: "dashboard.template.html",
    styleUrls: ["./dashboard.style.scss"]
})

export class DashboardComponent implements OnInit, OnDestroy {

    events$ = this.store$.pipe(select(getEvents));
    currentEvent$ = this.store$.pipe(select(getCurrentEvent));
    loading$ = this.store$.pipe(select(getLoading));

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    constructor(private breakpointObserver: BreakpointObserver, private store$: Store<State>) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    changeCurrentEvent(event: Event) {
        this.store$.dispatch(new SetCurrentEvent(event));
    }

    editProfile() {
        this.store$.dispatch(new EditProfile());
    }

    changePassword() {
        this.store$.dispatch(new ChangePassword());
    }

    editAccount() {
        this.store$.dispatch(new EditAccount());
    }
}
