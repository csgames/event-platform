import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Sponsors } from "../../../api/models/sponsors";
import { SponsorTier } from "../models/sponsor-tier";

@Component({
    selector: "app-sponsor-tier",
    templateUrl: "./sponsor-tier.template.html",
    styleUrls: ["./sponsor-tier.style.scss"]
})
export class SponsorTierComponent {
    @Input()
    public tier: SponsorTier;

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

    constructor() {
    }

    public getStyle(sponsors: Sponsors) {
        return {
            "padding-left": `${sponsors.web.padding[0]}px`,
            "padding-top": `${sponsors.web.padding[1]}px`,
            "padding-right": `${sponsors.web.padding[2]}px`,
            "padding-bottom": `${sponsors.web.padding[3]}px`,
            "width": "100%"
        };
    }
}
