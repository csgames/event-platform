import { Component, OnDestroy, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { TranslateService } from "@ngx-translate/core";
import { Competition } from "src/app/api/models/competition";

export interface InfoCompetitionModal {
    competition: Competition;
    time: string;
}

@Component({
    selector: "app-info-competition-modal",
    templateUrl: "info-competition.template.html",
    styleUrls: ["info-competition.style.scss"]
})
export class InfoCompetitionComponent extends SimpleModalComponent<InfoCompetitionModal, boolean>
        implements InfoCompetitionModal, OnInit, OnDestroy {
    public competition: Competition;
    public time: string;
    public MAX_CHAR_DESCRIPTION = 1000;
    public password: string;

    constructor(private translateService: TranslateService) {
        super();
    }

    public ngOnInit() {
        this.result = false;
    }

    public onClose() {
        this.close();
    }

    public get lang(): string {
        return this.translateService.getDefaultLang();
    }

}
