import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SimpleModalService } from "ngx-simple-modal";
import { NotificationsListModalComponent } from "../../../../modals/notifications-list-modal/notifications-list-modal.component";

@Component({
    selector: "app-top-nav",
    templateUrl: "top-nav.template.html",
    styleUrls: ["./top-nav.style.scss"]
})

export class TopNavComponent implements OnInit {

    @Input()
    public showToggleSideNav = false;

    @Output()
    public toggleSideNav = new EventEmitter<boolean>();

    private _toggleSideNav = false;

    constructor(private modalService: SimpleModalService) { }

    ngOnInit() { }

    clickNotificationsButton() {
        this.modalService.addModal(NotificationsListModalComponent);
    }

    clickToggleSideNav() {
        this._toggleSideNav = !this._toggleSideNav;
        this.toggleSideNav.emit(this._toggleSideNav);
    }
}
