import { Component, OnInit, OnDestroy } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Store, select } from "@ngrx/store";
import { State, getNotifications } from "./store/notifications.reducer";
import { Subscription } from "rxjs";
import { AppNotification } from "../../api/models/notification";
import { LoadNotifications } from "./store/notifications.actions";

@Component({
    selector: "app-notifications-list-modal",
    templateUrl: "notifications-list-modal.template.html",
    styleUrls: ["notifications-list-modal.style.scss"]
})

export class NotificationsListModalComponent extends SimpleModalComponent<void, void> implements OnInit, OnDestroy {
    notifications$ = this.store$.pipe(select(getNotifications));

    private notificationSub$: Subscription;
    public notifications: AppNotification[];

    constructor(private store$: Store<State>) {
        super();
    }

    ngOnInit() {
        this.store$.dispatch(new LoadNotifications());
        this.notificationSub$ = this.notifications$.subscribe((notifications) => {
            if (!notifications) { return; }
            this.notifications = notifications.sort((a, b) => a.date > b.date ? -1 : 1);
        });
    }

    ngOnDestroy() {
        this.notificationSub$.unsubscribe();
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
