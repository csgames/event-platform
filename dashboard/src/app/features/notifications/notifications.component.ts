import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { getLoading, getSuccess, State, getActivities } from "./store/notifications.reducer";
import { SendSms, SendPush, LoadActivities } from "./store/notifications-actions";
import { Activity } from "src/app/api/models/activity";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-admin-notifications",
    templateUrl: "notifications.template.html",
    styleUrls: ["notifications.style.scss"]
})
export class NotificationsComponent implements OnInit, OnDestroy {
    activities$ = this.store$.pipe(select(getActivities));
    loading$ = this.store$.pipe(select(getLoading));
    success$ = this.store$.pipe(select(getSuccess));
    
    private activities: Activity[];
    public activity: Activity;
    private activitiesSub$: Subscription;

    public sms = "";
    public title = "";
    public body = "";

    constructor(private store$: Store<State>,
                private toastr: ToastrService) { }

    public ngOnInit() {
        this.store$.dispatch(new LoadActivities());
        this.activitiesSub$ = this.activities$.subscribe((activities) => {
            if (!activities) { return; }
            this.activities = activities;
            this.activities.unshift({
                name: {
                    en: "Event",
                    fr: "Event"
                }
            } as Activity);
        });

        this.success$.subscribe((success) => {
            if (success) {
                this.sms = "";
                this.title = "";
                this.body = "";
                this.activity = undefined;
                this.toastr.success('Sucess');
            }
        });
    }

    public ngOnDestroy() {
        this.activitiesSub$.unsubscribe();
    }

    public sendSms() {
        if (this.sms === "") { return; }

        this.store$.dispatch(new SendSms(this.sms));
    }

    public sendPush() {
        if (this.title === "" || this.body === "" || !this.activity) { return; }

        this.store$.dispatch(new SendPush(this.title, this.body, this.activity));
    }
}