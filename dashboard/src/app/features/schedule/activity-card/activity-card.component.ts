import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Activity } from "../../../api/models/activity";
import { select, Store } from "@ngrx/store";
import { State } from "../store/schedule.reducer";
import { getCurrentAttendee } from "../../../store/app.reducers";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
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

    public currentAttendee$ = this.store$.pipe(select(getCurrentAttendee));

    public get subscribed(): Observable<boolean> {
        return this.currentAttendee$.pipe(map(attendee => {
            if (!attendee) {
                return false;
            }

            return this.activity.subscribers.some(x => x === attendee._id);
        }));
    }

    public get lang(): string {
        return this.translateService.getDefaultLang();
    }

    constructor(private store$: Store<State>,
                private translateService: TranslateService) {}

    public ngOnInit() {}
}
