import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { Sponsors } from "../../../../api/models/sponsors";
import { UpdateSponsorInfoComponent } from "../update-sponsor-info/update-sponsor-info.component";
import { UpdateSponsorPositionningComponent } from "../update-sponsor-positionning/update-sponsor-positionning.component";
import { InfoSponsorComponent } from "../info-sponsor/info-sponsor.component";
import { SimpleModalService } from "ngx-simple-modal";
import { SponsorTier } from "../../models/sponsor-tier";
import { PopoverDirective } from "ngx-bootstrap/popover";

@Component({
    selector: "app-sponsor-tile",
    templateUrl: "sponsor-tile.template.html"
})
export class SponsorTileComponent implements OnInit {
    @ViewChild(PopoverDirective, { static: true })
    popover: PopoverDirective;

    @Input()
    showAdmin = false;

    @Input()
    sponsor: Sponsors;

    @Input()
    tier: SponsorTier;

    @Output()
    clickSponsor = new EventEmitter<Sponsors>();

    constructor(private modalService: SimpleModalService) { }

    ngOnInit() { }

    public onEditInfo(sponsor: Sponsors) {
        this.modalService.addModal(UpdateSponsorInfoComponent, { sponsor });
        this.popover.hide();
    }

    public onEditPadding(sponsor: Sponsors) {
        const tierName = this.tier.name.charAt(0).toUpperCase() + this.tier.name.slice(1);
        this.modalService.addModal(UpdateSponsorPositionningComponent, {
            sponsor,
            tier: tierName
        });
        this.popover.hide();
    }

    public onInfo(sponsor: Sponsors) {
        this.modalService.addModal(InfoSponsorComponent, { sponsor });
        this.popover.hide();
    }

    getStyle(sponsor: Sponsors) {
        return {
            "padding-left": `${sponsor.web.padding[0]}px`,
            "padding-top": `${sponsor.web.padding[1]}px`,
            "padding-right": `${sponsor.web.padding[2]}px`,
            "padding-bottom": `${sponsor.web.padding[3]}px`,
            "width": "100%"
        };
    }
}
