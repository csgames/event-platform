import { Component, OnDestroy, OnInit, ViewChild, Input } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Activity } from "src/app/api/models/activity";
import { TranslateService } from "@ngx-translate/core";

export interface InfoActivityModal {
    activity: Activity;
    time: string;
}

@Component({
    selector: "app-info-activity-modal",
    templateUrl: "info-activity.template.html",
    styleUrls: ["info-activity.style.scss"]
})
export class InfoActivityComponent extends SimpleModalComponent<InfoActivityModal, void> implements OnInit, OnDestroy {
    
    public activity: Activity;
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
        if (this.activity.details[this.lang].length > this.MAX_CHAR_DESCRIPTION ) {
            return "modal-lg";
        }
        return "modal-md";
    }

}
