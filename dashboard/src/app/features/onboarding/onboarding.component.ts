import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { State } from "../../store/app.reducers";

@Component({
    selector: "app-onboarding",
    templateUrl: "onboarding.template.html",
    styleUrls: ["onboarding.style.scss"]
})
export class OnboardingComponent implements OnInit {
    currentAttendee$ = this.store$.pipe(select(fromApp.getCurrentAttendee));

    constructor(private store$: Store<State>) {}

    ngOnInit() {}

    onSaveInfo() {}
}