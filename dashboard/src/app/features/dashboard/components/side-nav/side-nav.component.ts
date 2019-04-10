import { Component, Input, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, withLatestFrom } from "rxjs/operators";
import * as fromApp from "src/app/store/app.reducers";
import { getPuzzleHeroInfo, getRegisteredCompetitions, State } from "src/app/store/app.reducers";
import { Router } from "@angular/router";
import { SimpleModalService } from "ngx-simple-modal";
import { EditEventModalComponent } from "../../../../modals/edit-event-modal/edit-event-modal.component";

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

    @Input()
    loading = false;

    constructor(private store$: Store<State>, private router: Router, private dialogService: SimpleModalService) { }

    ngOnInit() { }

    isActive(route: string | string[]) {
        if (typeof route === "string") {
            return this.router.isActive(route, false);
        }

        return route.some(x => this.router.isActive(x, false));
    }

    clickEditEvent() {
        this.dialogService.addModal(EditEventModalComponent);
    }
}
