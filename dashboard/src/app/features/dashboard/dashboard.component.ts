import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { LoadCurrentAttendee } from "../../store/app.actions";
import { State } from "../../store/app.reducers";
import { Store } from "@ngrx/store";

@Component({
    selector: "app-dashboard",
    templateUrl: "dashboard.template.html",
    styleUrls: ["./dashboard.style.scss"]
})

export class DashboardComponent implements OnInit {

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    constructor(private breakpointObserver: BreakpointObserver, private store$: Store<State>) {
        this.store$.dispatch(new LoadCurrentAttendee());
    }

    ngOnInit() {
    }
}
