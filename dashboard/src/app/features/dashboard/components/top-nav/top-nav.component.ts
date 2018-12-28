import { Component, OnInit } from "@angular/core";
import { SimpleModalService } from "ngx-simple-modal";
import { NotificationsListModalComponent } from "../../../../modals/notifications-list-modal/notifications-list-modal.component";

@Component({
    selector: "app-top-nav",
    templateUrl: "top-nav.template.html",
    styleUrls: ["./top-nav.style.scss"]
})

export class TopNavComponent implements OnInit {
    constructor(private modalService: SimpleModalService) { }

    ngOnInit() { }

    clickNotificationsButton() {
        this.modalService.addModal(NotificationsListModalComponent);
    }
}
