import { Component, OnInit, OnDestroy } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Store, select } from "@ngrx/store";
import { State, getNotifications, getNotificationsLoading } from "./store/notifications.reducer";
import { Subscription } from "rxjs";
import { AttendeeNotification } from "../../api/models/notification";
import { LoadNotifications } from "./store/notifications.actions";
import { not } from "rxjs/internal-compatibility";
import { Activity } from "../../api/models/activity";

@Component({
    selector: "app-notifications-list-modal",
    templateUrl: "notifications-list-modal.template.html",
    styleUrls: ["notifications-list-modal.style.scss"]
})

export class NotificationsListModalComponent extends SimpleModalComponent<void, void> implements OnInit, OnDestroy {
    notifications$ = this.store$.pipe(select(getNotifications));
    loading$ = this.store$.pipe(select(getNotificationsLoading));

    private notificationSub$: Subscription;
    public notifications: AttendeeNotification[];

    constructor(private store$: Store<State>) {
        super();
    }

    ngOnInit() {
        this.store$.dispatch(new LoadNotifications());
        this.notificationSub$ = this.notifications$.subscribe((notifications) => {
            if (!notifications) { return; }
            this.notifications = notifications.sort((a, b) => a.notification.timestamp > b.notification.timestamp ? -1 : 1);
        });
    }

    ngOnDestroy() {
        this.notificationSub$.unsubscribe();
    }

    getIcon(notification: Notification): string {
        if (!notification.data) {
            return "";
        }
        switch (notification.data.type) {
            case "event":
                return "fal fa-calendar-check text-danger";
            case "activity":
                const activity = JSON.parse(notification.data.activity);
                if (activity.type === "competition") {
                    return "fal fa-trophy text-primary";
                } else if (activity.type === "food") {
                    return "fal fa-utensils text-primary";
                } else {
                    return "fal fa-calendar text-primary";
                }
        }
        return "";
    }

    getActivityName(notification: Notification): { [lang: string]: string } {
        if (!notification.data || !notification.data.activity || notification.data.type !== "activity") {
            return null;
        }
        const activity: Activity = JSON.parse(notification.data.activity);
        return activity.name;
    }

    close() {
        document.querySelector(".modal-right-side.fade").classList.add("slideOutRight");
        return new Promise((resolve => {
            setTimeout(() => {
                resolve();
                super.close();
            }, 400);
        }));
    }
}
