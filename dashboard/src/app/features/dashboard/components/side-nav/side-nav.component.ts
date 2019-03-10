import { Component, Input, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { getPuzzleHeroInfo, State, getSubscribedCompetitions } from "src/app/store/app.reducers";
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
    // subscribedCompetitions$ = this.store$.pipe(select(getSubscribedCompetitions));
    subscribedCompetitions: Array <{
        id: string,
        name: string
    }>;

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

    ngOnInit() {
        this.subscribedCompetitions = [
            {
                id: "5c7750f24aa59638aa4a2f2a",
                name: "Competition #1"
            },
            {
                id: "5c786c9d613ec53f4e761d72",
                name: "Competition #2"
            }
        ];
    }

    isActive(route: string) {
        return this.router.isActive(route, false);
    }
}
