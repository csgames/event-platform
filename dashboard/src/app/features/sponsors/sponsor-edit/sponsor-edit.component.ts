import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getLoading, getSponsors, State } from "./store/sponsor-edit.reducer";
import { LoadSponsors } from "./store/sponsor-edit.actions";
import { Observable } from "rxjs";
import { SponsorTier } from "../models/sponsor-tier";
import { map } from "rxjs/operators";

@Component({
    selector: "app-sponsor-edit",
    templateUrl: "sponsor-edit.template.html",
    styleUrls: ["./sponsor-edit.style.scss"]
})
export class SponsorEditComponent implements OnInit {
    sponsors$ = this.store$.pipe(select(getSponsors));
    loading$ = this.store$.pipe(select(getLoading));

    public get platinumTier$(): Observable<SponsorTier> {
        return this.sponsors$
            .pipe(
                map((s) => (s && {
                    name: "platinum",
                    sponsors: s["Platinum"],
                    maxInLine: 1,
                    size: 50,
                    gap: 0
                }))
            );
    }

    public get goldTier$(): Observable<SponsorTier> {
        return this.sponsors$
            .pipe(
                map((s) => (s && {
                    name: "gold",
                    sponsors: s["Gold"],
                    maxInLine: 2,
                    size: 40,
                    gap: 60
                }))
            );
    }

    public get silverTier$(): Observable<SponsorTier> {
        return this.sponsors$
            .pipe(
                map((s) => (s && {
                    name: "silver",
                    sponsors: s["Silver"],
                    maxInLine: 3,
                    size: 25,
                    gap: 100
                }))
            );
    }

    public get bronzeTier$(): Observable<SponsorTier> {
        return this.sponsors$
            .pipe(
                map((s) => (s && {
                    name: "bronze",
                    sponsors: s["Bronze"],
                    maxInLine: 4,
                    size: 24,
                    gap: 120
                }))
            );
    }

    constructor(private store$: Store<State>) {}

    public ngOnInit() {
        this.store$.dispatch(new LoadSponsors());
    }
}
