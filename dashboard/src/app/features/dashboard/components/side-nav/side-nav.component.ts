import { Component, Input, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { getPuzzleHeroInfo, State, getRegisteredCompetitions } from "src/app/store/app.reducers";
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
    registeredCompetitions$ = this.store$.pipe(select(getRegisteredCompetitions));

    get puzzleHeroOpen$(): Observable<boolean> {
        return this.puzzleHeroInfo$.pipe(
            map(info => info.open)
        );
    }

    get scoreboardOpen$(): Observable<boolean> {
        return this.puzzleHeroInfo$.pipe(
            map(info => info.scoreboardOpen)
        );
    }

    @Input()
    loading = false;

    constructor(private store$: Store<State>, private router: Router) { }

    ngOnInit() { }

    isActive(route: string) {
        return this.router.isActive(route, false);
    }
}
