import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { map, withLatestFrom } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import * as fromApp from "../../../../../store/app.reducers";
import { getPuzzleHeroInfo } from "../../../../../store/app.reducers";
import { getRegisteredCompetitions } from "../../../../../store/app.reducers";
import { State } from "../../../../../store/app.reducers";
import { Router } from "@angular/router";
import { BaseSideNavComponent } from "../base-side-nav/base-side-nav.component";

@Component({
    selector: "app-event-settings-side-nav",
    templateUrl: "event-settings-side-nav.template.html"
})
export class EventSettingsSideNavComponent extends BaseSideNavComponent {
    currentEvent$ = this.store$.pipe(select(fromApp.getCurrentEvent));

    constructor(private store$: Store<State>, router: Router) {
        super(router);
    }

    clickBack() {
        this.router.navigate(["/"]);
    }
}
