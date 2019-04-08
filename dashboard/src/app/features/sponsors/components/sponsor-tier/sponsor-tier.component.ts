import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { Sponsors } from "../../../../api/models/sponsors";
import { SponsorTier } from "../../models/sponsor-tier";
import { SponsorFormComponent } from "../sponsor-form/sponsor-form.component";
import { Store } from "@ngrx/store";
import { State } from "../../sponsor-edit/store/sponsor-edit.reducer";
import { AddSponsor } from "../../sponsor-edit/store/sponsor-edit.actions";
import { SponsorInfoDto } from "../sponsor-form/dto/sponsor-info.dto";

@Component({
    selector: "app-sponsor-tier",
    templateUrl: "./sponsor-tier.template.html",
    styleUrls: ["./sponsor-tier.style.scss"]
})
export class SponsorTierComponent {
    @ViewChild(SponsorFormComponent)
    private form: SponsorFormComponent;

    public showCreateSponsorCard = false;
    public dto = new SponsorInfoDto();

    @Input()
    public tier: SponsorTier;
    @Input()
    public showAdd = false;

    @Output()
    public info = new EventEmitter<Sponsors>();

    public get sponsors(): Sponsors[][] {
        const sponsors = [];
        let i = 0;
        let row = [];
        for (const sponsor of this.tier.sponsors) {
            row.push(sponsor);
            if (++i % this.tier.maxInLine === 0) {
                sponsors.push(row);
                row = [];
                i = 0;
            }
        }
        if (row.length) {
            sponsors.push(row);
        }

        return sponsors;
    }

    public get flex(): string {
        return `0 0 ${this.tier.size}%`;
    }

    public get gap(): string {
        return `${this.tier.gap}px`;
    }

    constructor(private store$: Store<State>) {}

    public getStyle(sponsors: Sponsors) {
        return {
            "padding-left": `${sponsors.web.padding[0]}px`,
            "padding-top": `${sponsors.web.padding[1]}px`,
            "padding-right": `${sponsors.web.padding[2]}px`,
            "padding-bottom": `${sponsors.web.padding[3]}px`,
            "width": "100%"
        };
    }
    
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
