import { Component, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";

@Component({
    selector: "app-notifications-list-modal",
    templateUrl: "notifications-list-modal.template.html"
})

export class NotificationsListModalComponent extends SimpleModalComponent<void, void> implements OnInit {
    constructor() {
        super();
    }

    ngOnInit() { }

    close() {
        document.querySelector(".modal.fade").classList.add("slideOutRight");
        return new Promise((resolve => {
            setTimeout(() => {
                resolve();
                super.close();
            }, 400);
        }));
    }
}
