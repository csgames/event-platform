import { Component, OnDestroy, OnInit, ViewChild, Input } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Activity } from "src/app/api/models/activity";
import { TranslateService } from "@ngx-translate/core";
import { Store, select } from "@ngrx/store";
import { State, getSubscribed } from "./store/info-activity.reducer";
import { getCurrentAttendee } from "src/app/store/app.reducers";
import { Attendee } from "src/app/api/models/attendee";
import { Subscription } from "rxjs";
import { CheckIfSubscribedToActivity, SubscribeToActivity, ResetStore } from "./store/info-activity.actions";

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

    currentAttendee$ = this.store$.pipe(select(getCurrentAttendee));
    subscribed$ = this.store$.pipe(select(getSubscribed));

    private attendee: Attendee;
    private attendeeSub$: Subscription;

    constructor(private translateService: TranslateService,
                private store$: Store<State>) {
        super();
    }

    public ngOnInit() {
        this.attendeeSub$ = this.currentAttendee$.subscribe((attendee) => {
            this.attendee = attendee;
            this.store$.dispatch(new CheckIfSubscribedToActivity({
                attendeeId: this.attendee._id,
                activityId: this.activity._id
            }));
        });
    }

    public subscribe() {
        if (this.attendee) {
            this.store$.dispatch(new SubscribeToActivity({
                attendeeId: this.attendee._id,
                activityId: this.activity._id
            }));
        }
    }

    public onClose() {
        this.close();
        setTimeout(() => this.store$.dispatch(new ResetStore()), 1000);
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
