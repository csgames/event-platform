import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State } from "src/app/store/app.reducers";
import * as fromApp from "src/app/store/app.reducers";
import { Router } from "@angular/router";

@Component({
    selector: "app-side-nav",
    templateUrl: "side-nav.template.html",
    styleUrls: ["./side-nav.style.scss"]
})

export class SideNavComponent implements OnInit {
    attendee$ = this.store$.pipe(select(fromApp.getCurrentAttendee));

    constructor(private store$: Store<State>,
                private router: Router) { }

    ngOnInit() {
        this.attendee$.subscribe((a) => {
            if (a && !a.registered) {
                this.router.navigate(['/onboarding']);
            }
            if (a && a.registered) {
                this.router.navigate(['/team']);
            }
        })
    }
}
