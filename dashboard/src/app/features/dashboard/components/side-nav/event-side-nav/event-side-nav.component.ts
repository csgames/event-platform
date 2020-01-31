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
    selector: "app-event-side-nav",
    templateUrl: "event-side-nav.template.html"
})
export class EventSideNavComponent extends BaseSideNavComponent {
    attendee$ = this.store$.pipe(select(fromApp.getCurrentAttendee));
    currentEvent$ = this.store$.pipe(select(fromApp.getCurrentEvent));
    puzzleHeroInfo$ = this.store$.pipe(select(getPuzzleHeroInfo));
    registeredCompetitions$ = this.store$.pipe(select(getRegisteredCompetitions));

    get puzzleHeroOpen$(): Observable<boolean> {
        return this.puzzleHeroInfo$.pipe(
            withLatestFrom(this.attendee$),
            map(([info, attendee]) => info && info.open || attendee && (attendee.role === "admin" || attendee.role === "super-admin"))
        );
    }

    get scoreboardOpen$(): Observable<boolean> {
        return this.puzzleHeroInfo$.pipe(
            withLatestFrom(this.attendee$),
            map(([info, attendee]) => info && info.scoreboardOpen || attendee &&
                (attendee.role === "admin" || attendee.role === "super-admin"))
        );
    }

    get flashoutOpen$(): Observable<boolean> {
        return this.currentEvent$.pipe(
            map(e => {
                const now = new Date().toISOString();
                return now > e.flashoutBeginDate && now < e.flashoutEndDate;
            })
        );
    }

    constructor(private store$: Store<State>, router: Router) {
        super(router);
    }

    clickSettings() {
        this.router.navigate(["/event/setting"]);
    }
}
