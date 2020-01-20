import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Activity } from "../../../api/models/activity";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-activity-card",
    templateUrl: "./activity-card.template.html",
    styleUrls: ["./activity-card.style.scss"]
})
export class ActivityCardComponent implements OnInit {
    @Input()
    public activity: Activity;
    @Input()
    time: string;

    @Output()
    public info = new EventEmitter();

    constructor(private translateService: TranslateService) { }

    public ngOnInit() { }

    public get lang(): string {
        return this.translateService.getDefaultLang();
    }
}
