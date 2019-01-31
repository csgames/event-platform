import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State, getSponsors, getSponsorsLoading } from "./store/sponsors.reducer";
import { LoadSponsors } from "./store/sponsors.actions";
import { Subscription } from "rxjs";
import { Sponsors } from "src/app/api/models/sponsors";

@Component({
    selector: "app-sponsors",
    templateUrl: "sponsors.template.html",
    styleUrls: ["sponsors.style.scss"]
})
export class SponsorsComponent implements OnInit, OnDestroy {
    sponsors$ = this.store$.pipe(select(getSponsors));
    loading$ = this.store$.pipe(select(getSponsorsLoading));

    public platinum: Sponsors[];
    public gold: Sponsors[];
    public silver: Sponsors[];
    public bronze: Sponsors[];
    private sponsorsSub: Subscription;

    constructor(private store$: Store<State>) {}

    public async ngOnInit() {
        this.store$.dispatch(new LoadSponsors());
        this.sponsorsSub = this.sponsors$.subscribe((sponsors) => {
            if (!sponsors) return;
            if (sponsors['Platinum']) this.platinum = sponsors['Platinum'];
            if (sponsors['Gold']) this.gold = sponsors['Gold'];
            if (sponsors['Silver']) this.silver = sponsors['Silver'];
            if (sponsors['Bronze']) this.bronze = sponsors['Bronze'];
        });
    }

    public ngOnDestroy() {
        this.sponsorsSub.unsubscribe();
    }
}