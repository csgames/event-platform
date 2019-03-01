import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";
import { filter, switchMap, withLatestFrom } from "rxjs/operators";
import { getCurrentAttendee, getPuzzleHeroInfo, State } from "../../../store/app.reducers";
import { PuzzleHeroInfo } from "../../../api/models/puzzle-hero";
import { Attendee } from "../../../api/models/attendee";

@Injectable()
export class PuzzleHeroGuard implements CanActivate {
    private puzzleHeroInfo$ = this.store$.pipe(select(getPuzzleHeroInfo));
    private currentAttendee$ = this.store$.pipe(select(getCurrentAttendee));

    constructor(private store$: Store<State>, private router: Router) {}

    public canActivate(): Observable<boolean> {
        return this.puzzleHeroInfo$.pipe(
            filter(x => x !== null),
            withLatestFrom(this.currentAttendee$),
            switchMap(([info, attendee]: [PuzzleHeroInfo, Attendee]) => {
                if (info.open || attendee.role === "admin") {
                    return of(true);
                } else {
                    return fromPromise(this.router.navigate(["/home"]));
                }
            })
        );
    }
}
