import { Component, OnDestroy, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Sponsors } from "src/app/api/models/sponsors";
import { TranslateService } from "@ngx-translate/core";

export interface InfoSponsorModal {
    sponsor: Sponsors;
}

@Component({
    selector: "app-info-sponsor-modal",
    templateUrl: "info-sponsor.template.html",
    styleUrls: ["info-sponsor.style.scss"]
})
export class InfoSponsorComponent extends SimpleModalComponent<InfoSponsorModal, void> implements OnInit, OnDestroy {
    
    public sponsor: Sponsors;
    public MAX_CHAR_DESCRIPTION = 1000;

    constructor(private translateService: TranslateService) {
        super();
    }

    public ngOnInit() {

    }

    public onClose() {
        this.close();
    }

    public get lang(): string {
        return this.translateService.getDefaultLang();
    }

    public get modalClass(): string {
        if (this.sponsor.description[this.lang].length > this.MAX_CHAR_DESCRIPTION ) {
            return "modal-lg";
        }
        return "modal-md";
    }

}
