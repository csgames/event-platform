import { Component, Input, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, withLatestFrom } from "rxjs/operators";
import { getPuzzleHeroInfo, State } from "src/app/store/app.reducers";
import * as fromApp from "src/app/store/app.reducers";
import { Router } from "@angular/router";

@Component({
    selector: "app-side-nav",
    templateUrl: "side-nav.template.html",
    styleUrls: ["./side-nav.style.scss"]
})

export class SideNavComponent implements OnInit {
    attendee$ = this.store$.pipe(select(fromApp.getCurrentAttendee));
    currentEvent$ = this.store$.pipe(select(fromApp.getCurrentEvent));
    puzzleHeroInfo$ = this.store$.pipe(select(getPuzzleHeroInfo));

    get puzzleHeroOpen$(): Observable<boolean> {
        return this.puzzleHeroInfo$.pipe(
            withLatestFrom(this.attendee$),
            map(([info, attendee]) => info.open || attendee && (attendee.role === "admin" || attendee.role === "super-admin"))
        );
    }

    get scoreboardOpen$(): Observable<boolean> {
        return this.puzzleHeroInfo$.pipe(
            withLatestFrom(this.attendee$),
            map(([info, attendee]) => info.scoreboardOpen || attendee && (attendee.role === "admin" || attendee.role === "super-admin"))
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

    @Input()
    loading = false;

    constructor(private store$: Store<State>, private router: Router) { }

    ngOnInit() {}

    isActive(route: string) {
        return this.router.isActive(route, false);
    }
}
