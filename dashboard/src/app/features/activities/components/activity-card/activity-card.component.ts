import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Activity } from "src/app/api/models/activity";
import { ActivityUtils } from "src/app/utils/activity.utils";

@Component({
    selector: "app-activity-card",
    templateUrl: "./activity-card.template.html",
    styleUrls: ["./activity-card.style.scss"]
})
export class ActivityCardComponent {
    @Input()
    public activity: Activity;

    @Output()
    public edit = new EventEmitter();

    constructor() { }

    get icon(): string {
        return ActivityUtils.getActivityTypeIconClass(this.activity.type);
    }
}
