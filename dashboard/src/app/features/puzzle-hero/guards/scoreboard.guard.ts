import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";
import { filter, switchMap } from "rxjs/operators";
import { getPuzzleHeroInfo, State } from "../../../store/app.reducers";

@Injectable()
export class ScoreboardGuard implements CanActivate {
    private puzzleHeroInfo$ = this.store$.pipe(select(getPuzzleHeroInfo));

    constructor(private store$: Store<State>, private router: Router) {}

    public canActivate(): Observable<boolean> {
        return this.puzzleHeroInfo$.pipe(
            filter(x => x !== null),
            switchMap(info => {
                if (info.scoreboardOpen) {
                    return of(true);
                } else {
                    return fromPromise(this.router.navigate(["/puzzle-hero/tracks"]));
                }
            })
        );
    }
}
