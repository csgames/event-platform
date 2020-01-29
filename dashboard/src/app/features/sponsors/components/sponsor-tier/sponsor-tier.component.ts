import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { Sponsors } from "../../../../api/models/sponsors";
import { SponsorTier } from "../../models/sponsor-tier";
import { SponsorFormComponent } from "../sponsor-form/sponsor-form.component";
import { select, Store } from "@ngrx/store";
import { getAddLoading, State } from "../../sponsor-edit/store/sponsor-edit.reducer";
import { AddSponsor } from "../../sponsor-edit/store/sponsor-edit.actions";
import { SponsorInfoDto } from "../sponsor-form/dto/sponsor-info.dto";

@Component({
    selector: "app-sponsor-tier",
    templateUrl: "./sponsor-tier.template.html",
    styleUrls: ["./sponsor-tier.style.scss"]
})
export class SponsorTierComponent {
    @ViewChild(SponsorFormComponent, { static: true })
    private form: SponsorFormComponent;

    public addLoading$ = this.store$.pipe(select(getAddLoading));

    public showCreateSponsorCard = false;
    public dto = new SponsorInfoDto();

    public _tier: SponsorTier;

    @Input()
    public set tier(tier: SponsorTier) {
        if (!tier || !tier.sponsors || this.sponsors.length) { return; }
        this._tier = tier;
        let i = 0;
        let row = [];
        for (const sponsor of tier.sponsors) {
            row.push(sponsor);
            if (++i % tier.maxInLine === 0) {
                this.sponsors.push(row);
                row = [];
                i = 0;
            }
        }
        if (row.length) {
            this.sponsors.push(row);
        }
    }

    public get tier(): SponsorTier {
        return this._tier;
    }

    @Input()
    public showAdd = false;

    @Output()
    public info = new EventEmitter<Sponsors>();

    public sponsors: Sponsors[][] = [];

    public get flex(): string {
        return `0 0 ${this.tier.size}%`;
    }

    public get gap(): string {
        return `${this.tier.gap}px`;
    }

    constructor(private store$: Store<State>) {}

    public clickAdd() {
        this.showCreateSponsorCard = true;
    }

    public onCancel() {
        this.dto = new SponsorInfoDto();
        this.showCreateSponsorCard = false;
    }

    public onAdd() {
        if (this.form.validate()) {
            const tierName = this.tier.name.charAt(0).toUpperCase() + this.tier.name.slice(1);
            this.store$.dispatch(new AddSponsor(this.dto, tierName));
            this.dto = new SponsorInfoDto();
            this.showCreateSponsorCard = false;
        }
    }
}
