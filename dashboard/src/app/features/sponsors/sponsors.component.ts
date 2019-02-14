import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { SponsorTier } from "./models/sponsor-tier";
import { State, getSponsors, getSponsorsLoading } from "./store/sponsors.reducer";
import { LoadSponsors } from "./store/sponsors.actions";
import { Subscription } from "rxjs";
import { Sponsors } from "src/app/api/models/sponsors";
import { SimpleModalComponent, SimpleModalService } from "ngx-simple-modal";
import { InfoSponsorComponent } from "./info-sponsor/info-sponsor.component";

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

    public get platinumTier(): SponsorTier {
        return {
            name: "platinum",
            sponsors: this.platinum,
            maxInLine: 1,
            size: 50,
            gap: 0
        };
    }

    public get goldTier(): SponsorTier {
        return {
            name: "gold",
            sponsors: this.gold,
            maxInLine: 2,
            size: 40,
            gap: 60
        };
    }

    public get silverTier(): SponsorTier {
        return {
            name: "silver",
            sponsors: this.silver,
            maxInLine: 3,
            size: 25,
            gap: 100
        };
    }

    public get bronzeTier(): SponsorTier {
        return {
            name: "bronze",
            sponsors: this.bronze,
            maxInLine: 4,
            size: 24,
            gap: 120
        };
    }

    constructor(private store$: Store<State>, private modalService: SimpleModalService) {}

    public async ngOnInit() {
        this.store$.dispatch(new LoadSponsors());
        this.sponsorsSub = this.sponsors$.subscribe((sponsors) => {
            if (!sponsors) { return; }
            if (sponsors["Platinum"]) { this.platinum = sponsors["Platinum"]; }
            if (sponsors["Gold"]) { this.gold = sponsors["Gold"]; }
            if (sponsors["Silver"]) { this.silver = sponsors["Silver"]; }
            if (sponsors["Bronze"]) { this.bronze = sponsors["Bronze"]; }
        });
    }

    public ngOnDestroy() {
        this.sponsorsSub.unsubscribe();
    }

    public onShowInfo(sponsor: Sponsors) {
        this.modalService.addModal(InfoSponsorComponent, {sponsor});
    }
}
