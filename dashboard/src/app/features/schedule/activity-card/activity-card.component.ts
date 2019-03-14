import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Activity } from "../../../api/models/activity";
import { Store } from "@ngrx/store";
import { State } from "../store/schedule.reducer";
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

    constructor(private store$: Store<State>, private translateService: TranslateService) {}

    public get lang(): string {
        return this.translateService.getDefaultLang();
    }

    public ngOnInit() {}
}
